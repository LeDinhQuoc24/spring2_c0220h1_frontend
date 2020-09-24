import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

function comparePassword(c: AbstractControl) {
  const v = c.value;
  return (v.password_new === v.password_confirm) ? null : {
    passwordnotmatch: true
  };
}

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  infoForm: FormGroup;
  url:string | ArrayBuffer;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.infoForm = this.fb.group({
      useName: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      fullName: ['', [Validators.required, Validators.pattern('^[a-zA-ZÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰYÝỲỶỸỴĐáàảãạâấầẩẫậăắằẳẵặéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợuúùủũụưứừửữựýỳỷỹỵđ ]{1,40}$'), Validators.minLength(4), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(25)]],
      birth: [''],
      password_current: [''],
      pwGroup: this.fb.group({
        password_new: ['', [Validators.required, Validators.minLength(5)]],
        password_confirm: ['', [Validators.required, Validators.minLength(5)]]
      }, {validator: comparePassword}),
      idCard: ['', [Validators.required, Validators.pattern('^[0-9]{9,10}$')]],
      phone:  ['', [Validators.required, Validators.pattern('^[0][1-9]{9}$')]],
      address: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    })
    this.url = "../../../assets/pic/avatar.png";
  }

  editInfo() {
  }
  cancel() {
  }
  changeImg(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url=event.target.result;
      }
    }
  }

}
