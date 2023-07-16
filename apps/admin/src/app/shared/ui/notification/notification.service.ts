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
  private lastNotification!: GbNotificationRef;
  private currentlyRendered = new Map();

  constructor(
    private overlay: Overlay,
    @Inject(GB_NOTIFICATION_CONFIG_TOKEN)
    private notificationConfig: GbNotificationConfig
  ) {}

  show(data: GbNotificationData) {
    if (data.id && this.currentlyRendered.has(data.id)) {
      return;
    }
    this.currentlyRendered.set(data.id, data.id);
    const positionStrategy = this.getPositionStrategy();
    const overlayRef = this.overlay.create({ positionStrategy });

    const notificationRef = new GbNotificationRef(overlayRef);
    this.lastNotification = notificationRef;

    const injector = this.getInjector(data, notificationRef);
    const notificationPortal = new ComponentPortal(
      NotificationComponent,
      null,
      injector
    );

    overlayRef.attach(notificationPortal);

    return notificationRef;
  }

  removeID(id: any) {
    this.currentlyRendered.delete(id);
  }

  getPositionStrategy() {
    return this.overlay
      .position()
      .global()
      .bottom(`${(this.currentlyRendered.size - 1) * 60 + 20}px`)
      .right(this.notificationConfig.position?.right + 'px');
  }

  getInjector(data: GbNotificationData, notificationRef: GbNotificationRef) {
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
