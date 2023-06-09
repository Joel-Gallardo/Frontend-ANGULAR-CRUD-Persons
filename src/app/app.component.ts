import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadosService } from './services/estados/estados.service';
import { PaisesService } from './services/paises/paises.service';
import { PersonaService } from './services/persona/persona.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
})
export class AppComponent implements OnInit {
  personaForm!: FormGroup;
  paises: any;
  estados: any;

  constructor(
    public fb: FormBuilder,
    public estadoService: EstadosService,
    public paisesServices: PaisesService,
    public personaService: PersonaService
  ) { }

  ngOnInit(): void {
    this.personaForm = this.fb.group({
      nombre: [ '', Validators.required ],
      apellido: [ '', Validators.required ],
      edad: [ '', Validators.required ],
      pais: [ '', Validators.required ],
      estado: [ '', Validators.required ]
    });

    this.paisesServices.getAllPaises().subscribe(
      (resp) => {
        this.paises = resp
      },
      (error) => {
        console.error(error);
      }
    );

  }

  guardar(): void { }

  cargarEstadosPorPaisId(event: number) {
    this.estadoService.getAllEstadosByPais(event).subscribe(resp => {
      this.estados = resp;
    },
      error => {
        console.error(error)
      }
    )
  }
}
