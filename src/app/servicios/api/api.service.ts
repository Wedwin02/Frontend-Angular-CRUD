import { Injectable } from '@angular/core';
import {LoginI} from '../../modelos/login.interface';
import {ResponseI} from'../../modelos/response.interface';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { ListaPacientesI } from '../../modelos/listapacientes.interface';
import { PacienteI } from '../../modelos/paciente.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string = "http://api.test/";
  

  constructor(private http:HttpClient) { }

    loginByEmail(form: LoginI ): Observable<ResponseI> {
      let direccion = this.url + "auth";
      return this.http.post<ResponseI>(direccion,form);
    }
    
    getAllPatients(page:number): Observable<ListaPacientesI[]>{
      let direccion = this.url + "pacientes?page=" + page;
        return this.http.get<ListaPacientesI[]>(direccion);

    }
    getSinglePatients(id:number):Observable<PacienteI>{
      let direccion= this.url + "pacientes?id=" + id;
      return this.http.get<PacienteI>(direccion);
    }

    putPaciente(form:PacienteI):Observable<ResponseI>{
      let direcccion = this.url +"pacientes";      
      return this.http.put<ResponseI>(direcccion,form);

    }

    deletePaciente(form:PacienteI):Observable<ResponseI>{
      let direcccion = this.url +"pacientes";
      let Option = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        body: form
      }
      return this.http.delete<ResponseI>(direcccion,Option);
    }
    postPaciente(form:PacienteI):Observable<ResponseI>{
      let direcccion = this.url +"pacientes";
      return this.http.post<ResponseI>(direcccion,form);
    }
  
}


