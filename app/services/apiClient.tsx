type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiRequestConfig {
    method: HttpMethod;
    headers: {
        'Content-Type': string;
    };
    body?: string;
}

export class ApiClient {
    baseURL: string;
    constructor() {
        this.baseURL = 'https://api.mercadolibre.com/';
    }

    async request(endpoint: string, method: HttpMethod, data: any = null) {
        const config: ApiRequestConfig = {
            method,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        if (data) {
            config.body = JSON.stringify(data);
        }
        const response = await fetch(`${this.baseURL}${endpoint}`, config);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'algo salio mal');
        }
        return result;
    }

    get(endpoint: string) {
        return this.request(endpoint, 'GET')
    }

    post(endpoint: string, data: any) {
        return this.request(endpoint, 'POST', data)
    }

    put(endpoint: string, data: any) {
        return this.request(endpoint, 'PUT', data)
    }

    delete(endpoint: string) {
        return this.request(endpoint, 'DELETE')
    }
}