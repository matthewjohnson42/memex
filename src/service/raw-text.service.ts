import {Injectable} from '@angular/core';
import {Pageable} from '../data/pageable';
import {RawText} from '../data/raw-text';
import {ApiService} from './api.service';
import {PageRequest} from '../data/page-request';

@Injectable({
    providedIn: 'root'
})
export class RawTextService {

    apiService: ApiService;

    constructor(apiService: ApiService) {
        this.apiService = apiService;
    }

    submitEntry(entry: string): string {
        console.log(entry);
        return entry;
    }

    getPage(pageSize: number, pageNumber: number): Pageable<RawText> {
        const pageRequest = new PageRequest(pageSize, pageNumber, null);
        return this.apiService.getEntryPage(pageRequest);
    }
}
