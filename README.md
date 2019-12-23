## Ionic 4 Draggable Directive

##### Download hammerjs
```
npm install hammerjs@^2.0.8
```
##### Import hammerjs
in your ``main.ts`` add
````
......
import 'hammerjs';
......
````
in your ``app.module.ts``
````
.....
import { KuflabDragDirective } from './directives/kuflab-drag.directive';
.....

@NgModule({
    declarations: [AppComponent, KuflabDragDirective],
    .....
    exports: [KuflabDragDirective]
})
````
##### Use It
```
<ion-fab vertical="bottom" horizontal="end" slot="fixed" kuflabDrag>
</ion-fab>
```
