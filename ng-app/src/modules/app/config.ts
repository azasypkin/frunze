import {Injectable} from '@angular/core';

const API_DOMAIN = 'http://0.0.0.0:8009';

@Injectable()
export class Config {
  get apiDomain() {
    return API_DOMAIN;
  }
}
