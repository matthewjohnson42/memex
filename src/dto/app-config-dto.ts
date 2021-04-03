export class AppConfigDto {
    production: boolean;
    apiProtocol: string;
    apiHost: string;
    errorMessageDisplayTime: number;
    constructor(production: boolean, apiProtocol: string, apiHost: string) {
        this.production = production;
        this.apiProtocol = apiProtocol;
        this.apiHost = apiHost;
    }
}
