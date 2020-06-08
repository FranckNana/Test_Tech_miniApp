import { Component, OnInit } from '@angular/core';
import { DataService } from '../Services/data.service';
import { Data } from '../data';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm }   from '@angular/forms';

@Component({
  selector: 'app-mini-app-accueil',
  templateUrl: './mini-app-accueil.component.html',
  styleUrls: ['./mini-app-accueil.component.css']
})
export class MiniAppAccueilComponent implements OnInit {

  isList: boolean = false;
  isPresent: boolean;
  isactif: boolean = false;
  isLastFile: boolean = false;
  noLastFile: boolean;

  dataset: Data[];
  resdataSubcription: Subscription;

  serchData: Data;
  lastItem: Data;
  
  constructor(private dataService: DataService,
              private router: Router) { }

  ngOnInit() {
    this.resdataSubcription = this.dataService.resdataSubject.subscribe(
      (data: Data[]) => {
        this.dataset = data; 
      }
    );
    this.dataService.getDataFromjson();

    this.lastItem = this.dataService.getLastItem();

    this.isList = this.dataService.isList;

    this.noLastFile = this.dataService.noLastFile;
  }

  printList(){
    this.isList = true;
  }

  onViewSingleData(data: Data){
    localStorage.setItem("dataId", data._id.$oid);
    this.router.navigate(['/miniAppAccueil','single-data',data._id.$oid]);
  }

  printLastFile(){
    this.isLastFile = true;
  }

  croissant(){
    this.dataset = this.dataService.triCroissant(this.dataset);
  }

  deCroissant(){
    this.dataset = this.dataService.triDecroissant(this.dataset);
  }

  onSubmit(form: NgForm) {
    const name = form.value['search'];
    this.serchData = this.dataService.searchItemByname(name);
    if(this.serchData!=null){
      this.isPresent=true;
      this.onViewSingleData(this.serchData);
    }
    else{
      this.isPresent=false;
      this.isactif=true;
    }
    
  }

  ngOnDestroy(){
    this.resdataSubcription.unsubscribe();
  }


}

