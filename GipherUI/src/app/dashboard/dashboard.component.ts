import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  searchTerm = new FormControl();
  searchForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private routerService: RouterService) {
    this.searchForm = this.formBuilder.group({
      searchTerm:['', [Validators.required]],
    })
  }

  searchSubmit() {
    if(this.searchForm.value.searchTerm != "") {
      //console.log(this.searchForm.value.searchTerm);
      this.routerService.routeToSearch(this.searchForm.value.searchTerm);
    }
  }
}
