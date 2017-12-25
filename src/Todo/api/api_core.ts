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

    public _post (uri: string, payload: object): Promise<any> {
        return this._axios.post(uri, payload);
    }

    public _put (uri: string, payload: object): Promise<any> {
        return this._axios.put(uri, payload);
    }
}

const todoApi = new TodoAPI;

export default todoApi;
