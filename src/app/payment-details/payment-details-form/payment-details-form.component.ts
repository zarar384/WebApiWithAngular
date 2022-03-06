import { Component, OnInit } from '@angular/core';
import {PaymentDetailService} from "../../shared/payment-detail.service";
import {NgForm} from "@angular/forms";
import {PaymentDetail} from "../../shared/payment-detail.model";

@Component({
  selector: 'app-payment-details-form',
  templateUrl: './payment-details-form.component.html',
  styles: [
  ]
})
export class PaymentDetailsFormComponent implements OnInit {

  constructor(public service:PaymentDetailService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
  if(this.service.formData.paymentDetailId==0){
    this.insertRecord(form);
  }
  else
    this.updateRecord(form);
  }

  insertRecord(form:NgForm){
    this.service.postPaymentDetail().subscribe(
      ()=>{
        this.resetForm(form);
        this.service.refreshList();
      },
      err=>{console.log(err)}
    )
  }
  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData=new PaymentDetail();
  }

  private updateRecord(form: NgForm) {
    this.service.putPaymentDetail().subscribe(
      ()=>{
        this.resetForm(form);
        this.service.refreshList();
      },
      err=>{console.log(err)}
    )
  }
}
