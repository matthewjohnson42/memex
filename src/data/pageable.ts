export class Pageable<T> {
    content: Array<T>;
    totalElements: number;
    number: number;
    size: number;
    constructor(content: Array<T>, totalElements: number, number: number, size: number) {
        this.content = content;
        this.totalElements = totalElements;
        this.number = number;
        this.size = size;
    }
}
