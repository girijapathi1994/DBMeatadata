import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf'; //for pdf functionality
import 'jspdf-autotable';
@Injectable({
  providedIn: 'root'
})
export class PdfService {
  constructor() { }
  constructPDF(col,rows,name){
    let doc = new jsPDF();
    doc.autoTable({head:[col], body:rows});
        doc.save(name);
  }
}
