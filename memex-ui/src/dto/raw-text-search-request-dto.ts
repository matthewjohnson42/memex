export class RawTextSearchRequestDto {
    searchString: string;
    pageSize: number;
    pageNumber: number;
    startCreateDate: string;
    endCreateDate: string;
    constructor(searchString: string, pageSize: number, pageNumber: number, startCreateDate: string, endCreateDate: string) {
        this.searchString = searchString;
        this.pageSize = pageSize;
        this.pageNumber = pageNumber;
        this.startCreateDate = startCreateDate;
        this.endCreateDate = endCreateDate;
    }
}
