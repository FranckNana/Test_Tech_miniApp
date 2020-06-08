import { Component, OnInit } from '@angular/core';
import { DataService } from '../Services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Data } from '../data';

@Component({
  selector: 'app-single-data',
  templateUrl: './single-data.component.html',
  styleUrls: ['./single-data.component.css']
})
export class SingleDataComponent implements OnInit {

  dataset: Data[];
  data: Data;
  
  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.data = this.dataService.getSingleDataById(id);
  }

  onBack(){
    if(this.router.navigate(['/single-data','miniAppAccueil'])){
      this.dataService.isList= true;
      this.dataService.noLastFile=false;
    }
  }

}
