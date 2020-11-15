export class Pageable<T> {
    constructor(content: Array<T>, totalElements: number, number: number, size: number) {
        this.content = content;
        this.totalElements = totalElements;
        this.number = number;
        this.size = size;
    }
    content: Array<T>;
    totalElements: number;
    number: number;
    size: number;
}
