import {Injectable} from '@angular/core';
import {RawText} from '../../data/raw-text';
import {Pageable} from '../../data/pageable';

@Injectable({
    providedIn: 'root'
})
export class PersistenceService {

    rawTextPage: Pageable<RawText>;
    rawText: RawText;

    constructor() { }

    setRequestedRawTextPage(rawTextPage: Pageable<RawText>): void {
        this.rawTextPage = rawTextPage;
    }

    getRequestedRawTextPage(): Pageable<RawText> {
        return this.rawTextPage;
    }

    setSubmittedRawText(rawText: RawText): void {
        this.rawText = rawText;
    }

    getSubmittedRawText(): RawText {
        return this.rawText;
    }

    setRequestedRawText(rawText: RawText): void {
        this.rawText = rawText;
    }

}
