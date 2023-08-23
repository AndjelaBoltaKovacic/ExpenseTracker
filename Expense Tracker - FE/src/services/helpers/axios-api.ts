import axios from "axios";
import { HttpMethod } from "../../values/enums/service";


export const axiosApiCall = <T>(method: HttpMethod, url: string, data?: any): Promise<T> =>
    new Promise((resolve, reject) => {
        axios({
            method,
            url,
            data,
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });