export class RawTextSearchRequestDto {
    searchString: string;
    pageSize: number;
    pageNumber: number;
    startCreateDate: string;
    endUpdateDate: string;
    constructor(searchString: string, pageSize: number, pageNumber: number, startCreateDate: string, endUpdateDate: string) {
        this.searchString = searchString;
        this.pageSize = pageSize;
        this.pageNumber = pageNumber;
        this.startCreateDate = startCreateDate;
        this.endUpdateDate = endUpdateDate;
    }
}
