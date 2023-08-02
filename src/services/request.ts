import axios, {  Method } from 'axios';
import { API_URL } from '../config/env';

const baseUrl = API_URL;

export const appConst = {
    apiMockTimeout:1000 * 10
};

const codes = {
    UNAUTHORIZED:401,
    CUSTOM_TOKEN_EXPIRED: -2,
    REQUEST_TIMEOUT: 408,
};

axios.interceptors.response.use(
    response => response,
    error => {
        if(error!.response!.data!.error!.code === codes.CUSTOM_TOKEN_EXPIRED){
            console.log('token expired');
        }

        if (error!.response!.data!.error!.code === codes.REQUEST_TIMEOUT) {
            console.log(`A timeout happend on url ${error.config.url}`);
        }

        if (error!.response!.data!.error) {
            console.log('Server error');
        }

        return Promise.resolve(error);
    }
)

const getFullUrl = (uri: string) :string=>{
    return  `${baseUrl}${uri}`;
}

export type Irequest = {
    subUrl: string;
    method?:Method;
    data?:object;
    params?:object;
    headers?:object;
};

export const get = (request:Irequest) =>{
    return commonFetch({...request, method:"get"});
}

export const post = (request: Irequest) => {
    return commonFetch({ ...request, method: "post" });
}

export const patch = (request: Irequest) => {
    return commonFetch({ ...request, method: "patch" });
}

export const put = (request: Irequest) => {
    return commonFetch({ ...request, method: "put" });
}

export const delet = (request: Irequest) => {
    return commonFetch({ ...request, method: "delete" });
}

const commonFetch = (request:Irequest)=>{
    const {subUrl, method, data ={},params, headers} = request;
    const commonHeaders = getHeaders();
    const url = getFullUrl(subUrl);
    return axios({
        method,
        url,
        params,
        data,
        headers: {
            ...commonHeaders, ...headers
        }
    })
}

export const content_types = {
    multipart: {
        'content-type':"multipart/form-data",
    },
    json: {
        'constent-type': "application/json",
    }
}

const getHeaders = ()=>{
    return {
        ...content_types.json
    }
}