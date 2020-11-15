export class RawText {
    constructor(id: string, textContent: string, createDateTime: string, updateDateTime: string) {
        this.id = id;
        this.textContent = textContent;
        this.createDateTime = createDateTime;
        this.updateDateTime = updateDateTime;
    }
    id ?: string;
    textContent: string;
    createDateTime ?: string;
    updateDateTime ?: string;
}
