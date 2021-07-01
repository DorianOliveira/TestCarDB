const Config =
{
    timeout: 3000
}

export class FetchHelper {

    constructor() {
        this.headers =
        {
            'Content-Type': 'application/json'
        };

        this.Body = '';
    }

    setBody(data) {
        if (data !== null && data !== '')
            this.Body = JSON.stringify(data);
    }

    setHeaders(headers) {
        if (headers !== null && headers !== '' && headers !== undefined) {
            let keys = Object.keys(headers)

            keys.forEach((key) => {
                this.headers[key] = headers[key];
            });
        }
    }

    async raceFetch(url, options) {
        const promiseFetch = await fetch(url, options);

        const promiseTimeout = new Promise((resolve, reject) => {
            setTimeout(
                () => reject(`Request failed!`),
                Config.timeout
            )
        });

        return await Promise.race([promiseTimeout, promiseFetch]);

    }

    async fetch(url, method, data, headers) {
        
        const options = {
            method: method,
            headers: this.headers
        };

        if (method === 'POST') {
            this.setBody(data);
            options.body = this.Body;
        }

        this.setHeaders(headers);

        return await this.raceFetch(url, options);
    }

    async post(url, data) {
        return await this.fetch(url, 'POST', data);
    }

    async get(url, data = null, headers = null) {
        return await this.fetch(url, 'GET', data, headers);
    }

    async put(url, data = null) {
        return await this.fetch(url, 'PUT', data);
    }

    async delete(url, data = null) {
        return await this.fetch(url, 'DELETE', data);
    }
}