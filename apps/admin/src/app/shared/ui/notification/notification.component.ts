import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import {
  GbNotificationData,
  GB_NOTIFICATION_CONFIG_TOKEN,
  GbNotificationConfig,
} from './notification-config';
import { GbNotificationRef } from './notification-ref';
import {
  GbNotificationAnimations,
  GbNotificationAnimationState,
} from './notification.animation';
import { GbNotification } from './notification.service';

@Component({
  selector: 'gb-notification',
  templateUrl: './notification.component.html',
  animations: [GbNotificationAnimations.fadeNotification],
})
export class NotificationComponent implements OnInit, OnDestroy {
  animationState: GbNotificationAnimationState = 'default';

  private intervalId!: number | any;

  constructor(
    readonly data: GbNotificationData,
    readonly ref: GbNotificationRef,
    @Inject(GB_NOTIFICATION_CONFIG_TOKEN)
    public notificationConfig: GbNotificationConfig,
    private notifService: GbNotification
  ) {
    //
    // Extend data with defalt notification config
    this.data = { ...this.notificationConfig, ...this.data };
  }

  ngOnInit() {
    //
    // Set autoclose
    if (this.data.autoClose === true)
      this.intervalId = setTimeout(
        () => (this.animationState = 'closing'),
        this.data.autoCloseTimeout
      );
  }

  ngOnDestroy() {
    //
    // Clear autoclose
    if (this.data.autoClose === true) clearTimeout(this.intervalId);
  }

  close() {
    if (this.data.id) {
      this.notifService.removeID(this.data.id);
    }
    this.ref.close();
  }

  onFadeFinished(event: AnimationEvent) {
    const { toState } = event;
    const isFadeOut = (toState as GbNotificationAnimationState) === 'closing';
    const itFinished = this.animationState === 'closing';

    if (isFadeOut && itFinished) {
      this.close();
    }
  }
}
