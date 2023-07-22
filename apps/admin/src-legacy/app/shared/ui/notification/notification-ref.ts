import { OverlayRef } from '@angular/cdk/overlay';

export class GbNotificationRef {
    constructor(private readonly overlay: OverlayRef) {}

    close() {
        this.overlay.dispose();
    }

    isVisible() {
        return this.overlay && this.overlay.overlayElement;
    }

    getPosition() {
        return this.overlay.overlayElement.getBoundingClientRect();
    }
}
