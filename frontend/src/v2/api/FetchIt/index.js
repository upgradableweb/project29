const BASE_URL = process.env.REACT_APP_BASE_URL

const token = localStorage.getItem("token");
let tokenHeaders = {
    "content-type": "application/json",
    authorization: token
};

export const Params = params => {
    return Object.keys(params)
        .filter(d => params[d])
        .map(d => d + '=' + params[d])
        .join('&')
}


const request = async (url, { headers, params, body, ...init }) => {
    try {
        if (params) {
            url += '?' + Params(params)
        }
        body = JSON.stringify(body)
        init.headers = Object.assign({ }, tokenHeaders, headers)
        init.body = body
        const res = await fetch(BASE_URL + url, init)
        const data = await res.json()
        if (!res.ok) {
            throw data
        }
        return data
    } catch (error) {
        throw error
    }
}


const init = { url: undefined, params: null, body: undefined }

class FetchIt {

    constructor(url) {
        this.url = url
    }

    get({ url = this.url, params } = { url: undefined, params: null }) {
        return request(url, { method: "GET", params })
    }

    post({ body, url = this.url, params } = init) {
        return request(url, { method: "POST", body, params })
    }
    put({ url = this.url, body, params } = init) {
        return request(url, { method: "PUT", body, params })
    }
    delete({ body, url = this.url, params } = init) {
        return request(url, { method: "DELETE", body, params })
    }

    patch({ body, url = this.url, params } = init) {
        return request(url, { method: "PATCH", body, params })
    }
}
  

export default FetchIt