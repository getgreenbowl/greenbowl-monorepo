import { Injectable, Injector, Inject } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  GB_NOTIFICATION_CONFIG_TOKEN,
  GbNotificationConfig,
  GbNotificationData,
} from './notification-config';
import { NotificationComponent } from './notification.component';
import { GbNotificationRef } from './notification-ref';

@Injectable({
  providedIn: 'root',
})
export class GbNotification {
  private currentlyRendered = new Map<
    string | number,
    { notificationRef: GbNotificationRef; position: any }
  >();

  constructor(
    private overlay: Overlay,
    @Inject(GB_NOTIFICATION_CONFIG_TOKEN)
    private notificationConfig: GbNotificationConfig
  ) {}

  error(data: GbNotificationData) {
    this.show({ ...data, type: 'error' });
  }

  warning(data: GbNotificationData) {
    this.show({ ...data, type: 'warning' });
  }

  info(data: GbNotificationData) {
    this.show({ ...data, type: 'info' });
  }

  success(data: GbNotificationData) {
    this.show({ ...data, type: 'success' });
  }

  loading(data: GbNotificationData) {
    this.show({ ...data, type: 'loading' });
  }

  show(data: GbNotificationData) {
    if (data.id && this.currentlyRendered.has(data.id)) {
      return;
    }
    const positionStrategy = this.getPositionStrategy();
    const overlayRef = this.overlay.create({ positionStrategy });
    const notificationRef = new GbNotificationRef(overlayRef);
    if (data.id) {
      this.currentlyRendered.set(data.id, {
        notificationRef,
        position: positionStrategy,
      });
    }
    // this.lastNotification = notificationRef;

    const injector = this.getInjector(data, notificationRef);
    const notificationPortal = new ComponentPortal(
      NotificationComponent,
      null,
      injector
    );

    overlayRef.attach(notificationPortal);

    return notificationRef;
  }

  closeAll() {
    for (const value of this.currentlyRendered.values()) {
      value.notificationRef.close();
    }
    this.currentlyRendered.clear();
  }

  removeID(id: any) {
    this.currentlyRendered.delete(id);
  }

  updateToast(data: GbNotificationData) {
    if (!data.id) {
      return;
    }
    const toast = this.currentlyRendered.get(data.id);
    if (!toast) {
      return;
    }
    const positionStrategy = toast.position;

    toast.notificationRef.close();
    const overlayRef = this.overlay.create({ positionStrategy });

    const notificationRef = new GbNotificationRef(overlayRef);
    if (data.id) {
      this.currentlyRendered.set(data.id, {
        notificationRef,
        position: positionStrategy,
      });
    }
    // this.lastNotification = notificationRef;

    const injector = this.getInjector(data, notificationRef);
    const notificationPortal = new ComponentPortal(
      NotificationComponent,
      null,
      injector
    );

    overlayRef.attach(notificationPortal);

    return notificationRef;
  }

  private getPositionStrategy() {
    return this.overlay
      .position()
      .global()
      .bottom(`${(this.currentlyRendered.size || 1 - 1) * 60 + 20}px`)
      .right(this.notificationConfig.position?.right + 'px');
  }

  private getInjector(
    data: GbNotificationData,
    notificationRef: GbNotificationRef
  ) {
    const tokens = new WeakMap();

    tokens.set(GbNotificationData, data);
    tokens.set(GbNotificationRef, notificationRef);

    return Injector.create({
      providers: [
        { provide: GbNotificationData, useValue: data },
        { provide: GbNotificationRef, useValue: notificationRef },
      ],
    });
  }
}
