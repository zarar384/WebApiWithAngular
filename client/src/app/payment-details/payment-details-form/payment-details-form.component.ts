import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from "../../shared/payment-detail.service";
import { NgForm } from "@angular/forms";
import { PaymentDetail } from "../../shared/payment-detail.model";

// ONLY STRING FIELDS FROM PaymentDetail (used for text/number inputs)
type StringKeys = {
  [K in keyof PaymentDetail]: PaymentDetail[K] extends string ? K : never
}[keyof PaymentDetail];

@Component({
  selector: 'app-payment-details-form',
  templateUrl: './payment-details-form.component.html',
  styles: [
  ]
})
export class PaymentDetailsFormComponent implements OnInit {

  constructor(public service: PaymentDetailService) { }

  ngOnInit(): void {
  }

  // INPUT LOGIC FOR THE FORM
  onlyText<K extends StringKeys>(event: any, field: K) {
    let v = event.target.value.replace(/[^A-Za-z ]/g, '');
    event.target.value = v;
    this.service.formData[field] = v;
  }

  onlyNumber<K extends StringKeys>(event: any, field: K, max: number) {
    let v = event.target.value.replace(/[^0-9]/g, '');
    v = v.substring(0, max);
    event.target.value = v;
    this.service.formData[field] = v;
  }

  formatDate(event: any) {
    let v = event.target.value.replace(/[^0-9]/g, '').substring(0, 4);

    if (v.length >= 3) {
      v = v.substring(0, 2) + '/' + v.substring(2);
    }

    event.target.value = v;
    this.service.formData.expirationDate = v;
  }


  // MAIN LOGIC FOR SUBMITTING THE FORM
  onSubmit(form: NgForm) {
    if (this.service.formData.paymentDetailId == 0) {
      this.insertRecord(form);
    }
    else {
      this.updateRecord(form);
    }
  }

  insertRecord(form: NgForm) {
    this.service.postPaymentDetail().subscribe(
      () => {
        this.resetForm(form);
        this.service.refreshList();
      },
      err => { console.log(err) }
    )
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new PaymentDetail();
  }

  private updateRecord(form: NgForm) {
    this.service.putPaymentDetail().subscribe(
      () => {
        this.resetForm(form);
        this.service.refreshList();
      },
      err => { console.log(err) }
    )
  }
}
