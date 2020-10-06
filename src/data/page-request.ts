export class PageRequest {
    constructor(pageSize: number, pageNumber: number, sort: string) {
        this.pageSize = pageSize;
        this.pageNumber = pageNumber;
        this.sort = sort;
    }
    pageSize: number;
    pageNumber: number;
    sort: string;
}
