export class AppConfig {
    constructor(production: boolean, apiUrl: string) {
        this.production = production;
        this.apiUrl = apiUrl;
    }
    production: boolean;
    apiUrl: string;
}
