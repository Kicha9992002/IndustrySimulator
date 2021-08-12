import { Component, ComponentFactoryResolver, EventEmitter, Input, Output } from "@angular/core";

import { PlaceholderDirective } from "../placeholder.directive";

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent {
    @Input() message: string;
    @Output() close = new EventEmitter<void>();

    onClose() {
        this.close.emit();
    }

    public static showErrorAlert(message: string, componentFactoryResolver: ComponentFactoryResolver, alertHost: PlaceholderDirective) {
      const alertComponentFactory = componentFactoryResolver.resolveComponentFactory(AlertComponent);
      
      const hostViewContainerRef = alertHost.viewContainerRef;
      hostViewContainerRef.clear();
  
      const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
      componentRef.instance.message = message;
      let closeSub = componentRef.instance.close.subscribe(() => {
        closeSub.unsubscribe();
        hostViewContainerRef.clear();
      });
    }
}