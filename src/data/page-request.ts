export class PageRequest {
    pageSize: number;
    pageNumber: number;
    sort: string;
    constructor(pageSize: number, pageNumber: number, sort: string) {
        this.pageSize = pageSize;
        this.pageNumber = pageNumber;
        this.sort = sort;
    }
}
