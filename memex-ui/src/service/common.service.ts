import {Injectable} from '@angular/core';

@Injectable()
export class CommonService {
    constructor() { }

    parseDateString(date: string) {
        const inputDate = new Date(date);
        return inputDate.getFullYear() + '-' + (inputDate.getMonth() + 1) + '-' + inputDate.getDate();
    }
}
