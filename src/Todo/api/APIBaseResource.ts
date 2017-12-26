import axios from 'axios';

interface APIOptions {
    baseURL: string,
    responseType: string
}


export class APIBaseResource {
    private _axios: any;

    constructor (options: APIOptions) {
        this._axios = axios.create({
            baseURL: options.baseURL,
            responseType: options.responseType
        });
    }

    public get(uri: string): Promise<any> {
        return this._axios.get(uri);
    }

    public post(uri: string, payload: object): Promise<any> {
        return this._axios.post(uri, payload)
            .then( ( res: any) => {
                return res.data;
            })
    }

    public put(uri: string, payload: any): Promise<any> {
        return this._axios.put(uri, payload);
    }

    public delete(uri: string): Promise<any> {
        return this._axios.delete(uri);
    }
}
