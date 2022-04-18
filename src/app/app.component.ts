import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  tokenFromUI: string = 'b7ab81c783da4045ba3655e5cedda314';
  iVFromUI: string = '9adccc6ad6ad4c79b86406e8b3374779';
  encrypted: any = '';
  decrypted: string;

  request: string;
  responce: string;
  constructor() {
    this.encryptUsingAES256();
  }
  encryptUsingAES256() {
    let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let _iv = CryptoJS.enc.Utf8.parse(this.iVFromUI);
    let encrypted = CryptoJS.AES.encrypt(JSON.stringify(this.request), _key, {
      keySize: 128,
      iv: _iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    this.encrypted = encrypted.toString();
  }
  decryptUsingAES256() {
    let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let _iv = CryptoJS.enc.Utf8.parse(this.iVFromUI);

    this.decrypted = CryptoJS.AES.decrypt(this.encrypted, _key, {
      keySize: 128,
      iv: _iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }).toString(CryptoJS.enc.Utf8);
  }
}
