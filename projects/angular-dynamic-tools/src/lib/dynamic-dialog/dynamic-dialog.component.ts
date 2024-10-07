import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Inject,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  templateUrl: './dynamic-dialog.component.html',
})
export class DynamicDialogComponent implements AfterViewInit {
  @ViewChild('container', {read: ViewContainerRef}) container!: ViewContainerRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private dialogRef: MatDialogRef<DynamicDialogComponent>,
    private changeDetectorRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.data.childComponent);
      const componentRef = this.container.createComponent(componentFactory);
      const componentInstance: any = componentRef.instance;
      // Hay que asegurarse de que los valores de inputData coinciden exactamente con los @Input del componente hijo
      Object.assign(componentInstance, this.data.inputData); // Asignar los valores de inputData a las propiedades @Input() correspondientes

      // Suscribirse a los eventos @Output() del componente generado dinámicamente
      this.subscribeToOutputEvents(componentInstance);

      this.changeDetectorRef.detectChanges();
    }, 0);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  private subscribeToOutputEvents(componentInstance: any): void {
    const outputProps = Object.keys(componentInstance).filter(prop => componentInstance[prop] instanceof EventEmitter);
    outputProps.forEach(prop => {
      const outputEvent = componentInstance[prop] as EventEmitter<any>;
      outputEvent.subscribe((eventData: any) => {
        // Handle the @Output() event received
        // console.log('Received '+prop+' output event from dynamic component:', eventData);
        this.dialogRef.close({event: prop, data: eventData});
      });
    });
  }
}
