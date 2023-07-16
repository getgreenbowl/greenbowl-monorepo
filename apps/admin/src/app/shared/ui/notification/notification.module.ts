import { ModuleWithProviders, NgModule } from '@angular/core';
import {  NgIf } from '@angular/common';
import { NotificationComponent } from './notification.component';
import { OverlayModule } from '@angular/cdk/overlay';
import {
  defaultGbNotificationConfig,
  GB_NOTIFICATION_CONFIG_TOKEN,
} from './notification-config';

@NgModule({
  declarations: [NotificationComponent],
  imports: [NgIf, OverlayModule],
  exports: [NotificationComponent],
})
export class GbNotificationModule {
  public static forRoot(
    config = defaultGbNotificationConfig
  ): ModuleWithProviders<GbNotificationModule> {
    return {
      ngModule: GbNotificationModule,
      providers: [
        {
          provide: GB_NOTIFICATION_CONFIG_TOKEN,
          useValue: { ...defaultGbNotificationConfig, ...config },
        },
      ],
    };
  }
}
