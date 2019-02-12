import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { PdfService } from '../services/pdf.service';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  collections;
  constructor(private authService: AuthService,
    private router: Router,private pdfService:PdfService) { }

  ngOnInit() {
    this.authService.getAllCollections().subscribe(
      res => {
        this.collections = res;
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/login'])
          }
        }
      }
    )
  }
  pdf(){
    let col = ['Name','Options','Info','ID'];
    let rows=[];
    this.collections.map(x=>{
      rows.push([
      JSON.stringify(x['name']),
      JSON.stringify(x['options']),
      JSON.stringify(x['info']),
      JSON.stringify(x['idIndex'])
    ])
    })
    this.pdfService.constructPDF(col,rows,"Test.pdf")
  }

}
