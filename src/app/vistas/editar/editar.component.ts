import { Component, OnInit, ɵLocaleDataIndex } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { PacienteI } from '../../modelos/paciente.interface'; 
import { ApiService } from '../../servicios/api/api.service';
import { FormGroup,FormControl, Validators,FormArray } from '@angular/forms';
import {ResponseI} from '../../modelos/response.interface';
import { AlertasService } from '../../servicios/alertas/alertas.service';
@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  constructor(private activeRouter:ActivatedRoute, private route:Router, private api:ApiService, private alertas:AlertasService) { }
 
  pacient : PacienteI | any ;
  paciente : PacienteI | any ;

  editarForm = new FormGroup({   
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

  ngOnInit(): void {
    let PacienteId = this.activeRouter.snapshot.paramMap.get('id');    
    let token = this.getToken();   
    
  this.api.getSinglePatients(Number(PacienteId)).subscribe(data => {  

    this.pacient = data;
  
    for (var i = 0; i < this.pacient.length; i++){ 

       this.paciente = this.pacient[0];      
       this.editarForm.setValue({
        'pacienteid': PacienteId,
         'token': token,
         'dni': this.paciente.DNI,
         'nombre': this.paciente.Nombre,
         'direccion': this.paciente.Direccion,
         'codigop': this.paciente.CodigoPostal,
         'telefono': this.paciente.Telefono,
         'genero': this.paciente.Genero,
         'fechaNacimiento':this.paciente.FechaNacimiento,
        'correo': this.paciente.Correo,
        
       })  
    }   
    })
  }

  getToken(){
    return localStorage.getItem('token');
  }
  //Metodo para editar
  postForm(form:PacienteI){
    this.api.putPaciente(form).subscribe(data =>{
      let Respuesta: ResponseI = data;
      if(Respuesta.status == 'Ok'){
        this.alertas.showSuccess('Datos actualizados con exito','Hecho');
        this.route.navigate(['dashboard']);
      }else{
        this.alertas.showErrors(Respuesta.result.error_msg,'Error');
      }
    })
  }
  //Metodo para Eliminar
  EliminarPost(){
    let datos:PacienteI = this.editarForm.value;
    this.api.deletePaciente(datos).subscribe(data =>{
      let Respuesta: ResponseI = data;
      if(Respuesta.status == 'Ok'){
        this.alertas.showSuccess('Datos eliminados con exito','Hecho');
        this.route.navigate(['dashboard']);
      }else{
        this.alertas.showErrors(Respuesta.result.error_msg,'Error');
      }
    })
  }
  SalirPost(){
    this.route.navigate(['dashboard']);
  }

}
