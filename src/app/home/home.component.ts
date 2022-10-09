import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
  }

  createNewSudoku() {

  }

  check() {

  }

  solveHalf() {

  }
  
  solve() {
    
  }

  open(content: any) {
    this.modalService.open(content)
  }

  decline() {
    this.modalService.dismissAll();
  }
}
