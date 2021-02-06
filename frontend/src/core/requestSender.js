import axios from 'axios';
import config from '../config';

export default async function requestSender(url, { body, method = 'GET', params, query, responseType } = {}) {
    if (query) {
        url = `${url}?${new URLSearchParams(query).toString()}`
    }

    try {
        const response = await axios({
            withCredentials: true,
            url: `${config.apiUrl}${url}`,
            responseType,
            data: body,
            method,
            params,
        });

        return response.data

    } catch (error) {
        console.log('error: ', error)
    }
};

