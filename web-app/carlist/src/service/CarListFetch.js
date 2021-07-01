import { FetchHelper } from "./FetchHelper";

export default class CarListFetch extends FetchHelper {

    async request(requestType, url, data, headers) {
        try {
            let response = null;

            switch (requestType) {
                case RequestType.GET:
                default:
                    response = await super.get(url, data, headers);
                    break;
                case RequestType.POST:
                    response = await super.post(url, data);
                    break;
            }

            return response;
        }
        catch (error) {
            return {
                status: 'error',
                error: error
            };
        }
    }

    async tryFetch(requestType, url, data, headers) {

        const _headers = {
            ...this.headers,
            ...headers
        };
        return await this.request(requestType, url, data, _headers);
    }

    async get(url, data = null, headers = null) {
        return await this.tryFetch(RequestType.GET, url, data, headers);
    }

    async post(url, data = null) {
        return await this.tryFetch(RequestType.POST, url, data, null);
    }
}

const RequestType =
{
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete',
}