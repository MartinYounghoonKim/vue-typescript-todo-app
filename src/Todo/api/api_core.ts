import axios from 'axios';

class TodoAPI {
    private _axios: any;

    constructor () {
        this._axios = axios.create({
            baseURL: 'http://localhost:2403/todos',
            timeout: 1000,
            responseType: 'json'
        });
    }

    public get(uri: string): Promise<any> {
        return this._axios.get(uri);
    }

    public _post (uri: string, payload: object): Promise<any> {
        return this._axios.post(uri, payload);
    }

    public _put (uri: string, payload: object): Promise<any> {
        return this._axios.put(uri, payload);
    }

    public _delete (uri: string): Promise<any> {
        return this._axios.delete(uri);
    }
}

const todoApi = new TodoAPI;

export default todoApi;
