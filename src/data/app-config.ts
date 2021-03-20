export class AppConfig {
    production: boolean;
    apiProtocol: string;
    apiHost: string;
    constructor(production: boolean, apiProtocol: string, apiHost: string) {
        this.production = production;
        this.apiProtocol = apiProtocol;
        this.apiHost = apiHost;
    }
}
