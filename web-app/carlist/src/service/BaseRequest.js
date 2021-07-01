import { Config } from '../config';
import CarListFetch from './CarListFetch';

export class BaseRequest {
    constructor() {
        this.carListFetch = new CarListFetch();
        this.url = Config.ApiUrl;
    }

    async Get(endpoint) {
        return await this.doRequest(endpoint, RequestType.Single, RequestMethod.GET);
    }

    async Post(endpoint) {
        return await this.doRequest(endpoint, RequestType.Single, RequestMethod.POST);
    }

    async GetList(endpoint) {

        
        return await this.doRequest(endpoint, RequestType.List, RequestMethod.GET);
    }

    async GetText(endpoint) {
        return await this.doRequest(endpoint, RequestType.List, RequestMethod.GET, ContentType.Text);
    }

    async GetBlob(endpoint) {
        return await this.doRequest(endpoint, RequestType.List, RequestMethod.GET, ContentType.Blob);
    }

    async doRequest(endpoint, requestType = RequestType.List, requestMethod = RequestMethod.GET, contentType = ContentType.Json) {

        let response = null;

        const apiUrl = `${this.url}/${endpoint}`;

        if (requestMethod === RequestMethod.GET) {
            response = await this.carListFetch.get(apiUrl);
        }
        else if (requestMethod === RequestMethod.POST) {
            response = await this.carListFetch.post(apiUrl);
        }

        if (response.ok) {

            let content = null;

            if (contentType === ContentType.Text) {
                content = await response.text();

            } else if (contentType === ContentType.Blob) {
                content = await response.blob();

            } else if (contentType === ContentType.Json) {
                const json = await response.json();

                if (json) {
                    if (requestMethod === RequestMethod.GET) {

                        if (requestType === RequestType.List) {
                            return this.load(json);
                        }
                        return this.loadItem(json);
                    }

                    content = json;
                }
            }
            return {
                data: content,
                httpResponse: response
            }
        }
        else {
            console.log(`[BaseRequest] > [doRequest] Something goes wrong! Endpoint: ${endpoint}. Response: ${response}`);
        }

        return null;
    }

    loadItem(item) {
        
        return item;
    }

    load(json) {
        return json.map(item => this.loadItem(item));
    }
}

export const RequestType = {
    Single: 0,
    List: 1
}

export const ContentType = {
    Text: 'text',
    Json: 'json',
    Blob: 'blob'
}

export const RequestMethod = {
    GET: 'get',
    POST: 'post',
    DELETE: 'delete',
    PUT: 'put'
}