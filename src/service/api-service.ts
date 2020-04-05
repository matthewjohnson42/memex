import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor() { /* default constructor */ }

  private getEntry() : String {
    return "Here you are sir";
  }

}
