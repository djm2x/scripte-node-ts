
import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
/*{imports}*/
@Injectable({
  providedIn: 'root'
})
export class UowService {
  accounts = new AccountService();
  /*{services}*/
  

  constructor() { }

  valideDate(date: Date): Date {
    date = new Date(date);

    const hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
    const minutesDiff = (date.getHours() - date.getTimezoneOffset()) % 60;
    date.setHours(hoursDiff);
    date.setMinutes(minutesDiff);

    return date;
  }
}
