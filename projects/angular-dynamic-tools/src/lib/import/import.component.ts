import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {

  @Input() title: string = 'Importar Archivo'; // Título dinámico
  @Input() description: string = 'Por favor, sube tu archivo en el formato adecuado.'; // Descripción dinámica
  @Input() helpText: string = '¿No sabes en qué formato subir el archivo? '; // Texto de ayuda dinámico
  @Input() exampleUrl: string = ''; // URL de ejemplo dinámica

  @Output() upload = new EventEmitter<any>(); // Evento de subida de archivo

  importForm: FormGroup;
  selectedFile: File | null = null; // Aquí guardamos el archivo seleccionado

  constructor(private fb: FormBuilder) {
    this.importForm = this.fb.group({});
  }

  ngOnInit() {}

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0]; // Almacenamos el archivo seleccionado
  }

  submit() {
    if (this.selectedFile) {
      // Emitimos el archivo seleccionado en el evento 'upload'
      this.upload.emit(this.selectedFile);
    } else {
      console.error('No se ha seleccionado ningún archivo');
    }
  }
}
