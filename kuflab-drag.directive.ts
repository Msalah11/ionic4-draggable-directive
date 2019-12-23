import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';
import { DomController, Platform } from '@ionic/angular';

@Directive({
    selector: '[kuflabDrag]'
})
export class KuflabDragDirective implements OnInit {
    // tslint:disable-next-line:no-input-rename
    @Input('startLeft') startLeft: any; @Input('startTop') startTop: any;

    constructor(public element: ElementRef, public renderer: Renderer2, public domCtrl: DomController,
                public plt: Platform) {}

    ngOnInit() {
        this.renderer.setStyle(this.element.nativeElement, 'position', 'absolute');
        this.renderer.setStyle(this.element.nativeElement, 'left', this.startLeft + 'px');
        this.renderer.setStyle(this.element.nativeElement, 'top', this.startTop + 'px');

        const hammer = new window['Hammer'](this.element.nativeElement);
        hammer.get('pan').set({ direction: window['Hammer'].DIRECTION_ALL });

        hammer.on('pan', (ev) => {
            this.handlePan(ev);
        });
    }

    handlePan(ev) {
        const newLeft = ev.center.x;
        const newTop = ev.center.y;
        const deviceWidth = this.plt.width() - 60;
        const deviceHeight = this.plt.height() - 60;

        if (this.between(newLeft, 1, deviceWidth)) {
            this.domCtrl.write(() => {
                this.renderer.setStyle(this.element.nativeElement, 'left', newLeft + 'px');
            });
        }

        if (this.between(newTop, 1, deviceHeight)) {
            this.domCtrl.write(() => {
                this.renderer.setStyle(this.element.nativeElement, 'top', newTop + 'px');
            });
        }
    }

    between(x, min, max) {
        return x >= min && x <= max;
    }
}
