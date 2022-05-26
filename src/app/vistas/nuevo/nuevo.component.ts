import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators,FormArray } from '@angular/forms';
import { PacienteI } from '../../modelos/paciente.interface';
import { Router,ActivatedRoute } from '@angular/router';
import {ResponseI} from '../../modelos/response.interface';
import { ApiService } from '../../servicios/api/api.service';
import { AlertasService } from '../../servicios/alertas/alertas.service';
import { observable } from 'rxjs';
@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {
  nuevoForm = new FormGroup({   
    pacienteid: new FormControl(''),
    dni: new FormControl(''),
    nombre: new FormControl(''),
    direccion: new FormControl(''),
    codigop: new FormControl(''),
    telefono: new FormControl(''),
    genero: new FormControl(''),    
    fechaNacimiento: new FormControl(''),
    correo: new FormControl(''),
    token: new FormControl(''),    
  });

  constructor(private activeRouter:ActivatedRoute, private route:Router, private api:ApiService, private alertas:AlertasService) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    this.nuevoForm.patchValue({
      'token' : token
    });
  }
  
  postForm(form:PacienteI){
    console.log(form);
    this.api.postPaciente(form).subscribe(data =>{
      let Respuesta: ResponseI = data;
      if(Respuesta.status == 'Ok'){
        this.alertas.showSuccess('Datos Ingresados con exito','Hecho');
        this.route.navigate(['dashboard']);
      }else{
        this.alertas.showErrors(Respuesta.result.error_msg,'Error');
      }
    })
  }
  SalirPost(){
    this.route.navigate(['dashboard'])

  }
}
