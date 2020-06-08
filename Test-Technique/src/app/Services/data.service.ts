import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Data } from '../data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  isList; boolean = false;
  noLastFile: boolean = true;

  data: Data[] = [];
  resdataSubject = new Subject<Data[]>();

  emitResdataSubject() {
    this.resdataSubject.next(this.data);
  }

  constructor(private http: HttpClient) { }

  getDataFromjson(){

    const url: string = "/assets/data/dataset-example.json";

    return new Promise(
      (resolve, reject) => {
        this.http.get<Data[]>(url).subscribe(
          (response) => {
            resolve(this.data=response);
            this.emitResdataSubject();
          },
          (error) => {
            console.log('erreur de recupération de données' + error);
            reject(error);
          }
        );
      });

  }
 
  getSingleDataById(id: string){
    for (let i = 0; i < this.data.length; i++) {
      const o = this.data[i];
      if(o._id.$oid===id) {
        return o;
      }
    }
    return null;
  }

  getLastItem(){
    const itemId = localStorage.getItem("dataId");
    for (let i = 0; i < this.data.length; i++) {
      const o = this.data[i];
      if(o._id.$oid===itemId) {
        return o;
      }
    }
    return null;

  }


  triCroissant(data:Data[]){
    for (let i = 0; i < this.data.length; i++){
      for (let j = i+1; j < this.data.length; j++){ 
        const v1 = parseFloat(data[i].unit_cost.substring(1,data[i].unit_cost.length-1));
        const v2 = parseFloat(data[j].unit_cost.substring(1,data[j].unit_cost.length-1)); 
        if( v1 > v2){
          const obj = data[i];
          data[i] = data[j];
          data[j]= obj;
        }
      } 
    } 
    return data;
  }

  triDecroissant(data:Data[]){
    for (let i = 0; i < this.data.length; i++){
      for (let j = i+1; j < this.data.length; j++){ 
        const v1 = parseFloat(data[i].unit_cost.substring(1,data[i].unit_cost.length-1));
        const v2 = parseFloat(data[j].unit_cost.substring(1,data[j].unit_cost.length-1)); 
        if( v1 < v2){
          const obj = data[i];
          data[i] = data[j];
          data[j]= obj;
        }
      } 
    } 
    return data;
  }

  searchItemByname(name: string){
    for (let i = 0; i < this.data.length; i++) {
      const o = this.data[i];
      if(o.product_name.toLowerCase().includes(name.toLowerCase())==true) {
        return o;
      }
    }
    return null;
  }
  
}


