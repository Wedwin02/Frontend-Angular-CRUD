import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor( private Toast:ToastrService) { }


  showSuccess(texto: string | any,titulo: string | any){
    this.Toast.success(texto,titulo);
  }
  showErrors(texto: string | any,titulo: string | any){
    this.Toast.error(texto,titulo);
  }
}
