import DeviceHelper from '../Constants/DeviceHelper'
import { API_STATUS } from '../Constants/AppConst';
import queryString from 'query-string';
import { isObject, isArray, isString } from 'util';
import Config from 'react-native-config';
import { getUserProfileInfo } from '../Constants/AsyncStorageHelper';

export const API_BASE_URL = "" //DEV

export default class ApiClient {
    constructor(prefix = '/api') {
        this.prefix = API_BASE_URL;
    }

    get(intl, requestUrl, params = {}) {
        return this.request({
            intl: intl,
            url: requestUrl,
            method: 'get',
            params
        });
    }

    post(intl, requestUrl, payload = {}) {
        return this.request({
            intl: intl,
            url: requestUrl,
            method: 'post',
            body: payload,
        });
    }

    postParams(intl, requestUrl, params = {}) {
        return this.request({
            intl: intl,
            url: requestUrl,
            method: 'post',
            params
        });
    }

    put(intl, requestUrl, payload = {}) {
        return this.request({
            intl: intl,
            url: requestUrl,
            method: 'put',
            body: payload
        });
    }

    patch(intl, requestUrl, payload = {}) {
        return this.request({
            intl: intl,
            url: requestUrl,
            method: 'patch',
            body: payload
        });
    }

    delete(intl, requestUrl) {
        return this.request({
            intl: intl,
            url: requestUrl,
            method: 'delete'
        });
    }

    upload(intl, requestUrl, payload = {}, callback = () => { }) {
        return this.uploadFile({
            intl: intl,
            url: requestUrl,
            method: 'post',
            body: payload,
            callback: callback
        });
    }

    uploadHandOverFileInHub(requestUrl, payload = {}, callback = () => { }) {
        return this.uploadHandOverInHub({
            url: requestUrl,
            method: 'post',
            body: payload,
            callback: callback
        });
    }

    uploadHandOverInHub = async ({ url, method, params = {}, body, callback }) => {
        const isConnected = await DeviceHelper.isConnectedToInternet();
        const jwtToken = await getJwtToken();
        if (!isConnected) {
            const res = {
                error: NO_INTERNET_MSG,
                message: NO_INTERNET_MSG,
                noInternet: true
            }
            return res;
        }
        if (TENANT_ID) {
            params = {
                ...params,
                TENANT_ID: TENANT_ID
            }
        }
        let file = body.file;
        file = {
            ...file,
        }
        body = {
            ...body,
            file: file
        }
        const urlWithQuery = `${url}?${queryString.stringify(params)}`;
        console.log("urlWithQuery=======> ", urlWithQuery);
        console.log("body====>", body);
        let formdata = new FormData();
        formdata.append("fileTypeId", body.fileTypeId);
        formdata.append("reg_id", body.reg_id);
        formdata.append("file", body.file);
        formdata.append("screenName", body.screenName);
        formdata.append("isActive", body.isActive);
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = async (e) => {
            if (xhr.readyState !== 4) {
                return;
            }
            let status = xhr.status;
            let msg = xhr.message;
            console.log("status :-", status);
            //console.log("res :-", xhr.response);
            if (status == 413) {
                callback({
                    error: "File Size too large."
                })
                return;
            }
            if (status == 401) {

                PubSub.publish(TOKEN_EXPIRE, {
                    tokenExpire: true,
                });
                callback({
                    error: SEESION_EXPIRE
                })

                return;


            }
            if (status >= 500) {
                callback({
                    error: "Internal server error"
                })
                return;
            }
            if (xhr.response == "") {
                console.log("response =>:-", xhr.response);
                callback({
                    error: "Unable to upload file. Try Again later."
                })
                return;
            }
            let res = JSON.parse(xhr.response);
            // console.log(res);
            if (res.status == 'failed') {
                //console.log("res 3:-");
                res.error = `${res.response || res.message} ${res.httpStatus}`;
            }
            if (status >= 500) {
                //throw new Error('Bad response from server');
                //console.log("res 1:-");
                res.error = res.message || 'Bad response from server';
            }
            if (status >= 400) {
                //throw new Error('Bad response from server');
                //console.log("res 2:-");
                res.error = res.message || 'Bad Credentials';
            }


            if ((res.status == "success" || res.status == "OK") && isObject(res.response)) {
                //console.log("res 4:-");
                return callback({
                    status: "success",
                    response: res.response,
                    httpStatus: res.httpStatus
                });
            } else {
                //console.log("res else:-");
                return callback({
                    error: res.error || "Something went wrong"
                })
            }
        };
        xhr.open('POST', `${this.prefix}/${urlWithQuery}`);
        xhr.setRequestHeader('Content-type', 'multipart/form-data');
        if (jwtToken) {
            xhr.setRequestHeader('Authorization', jwtToken);
        }
        xhr.send(formdata);

    }

    uploadFile = async ({ url, method, params = {}, body, callback }) => {
        // TODO function to upload files
    }

    request = async ({ intl, url, method, params = {}, body }) => {
        const isConnected = await DeviceHelper.isConnectedToInternet();
        if (!isConnected) {
            const res = {
                message: intl.noInternet,
                noInternet: true,
                status: API_STATUS.NO_INTERNET
            }
            return res;
        }

        const urlWithQuery = `${this.prefix}/${url}?${queryString.stringify(params)}`;
        const resp = await getUserProfileInfo();
        console.log("urlWithQuery=======> ", urlWithQuery);
        if (resp != null) {
            let headers = {
                'Authorization': `Bearer ${resp.token}`,
                'content-type': 'application/json'
            }
            console.log("headers : ", headers);
            const init = {
                method,
                headers: headers
                //url: `${this.prefix}/${urlWithQuery}`
            };

            if (method !== 'get' && method !== 'head') {
                init.body = JSON.stringify(body);
                //init.data = body;
            }
            console.log(init);
            try {
                let res = await fetch(urlWithQuery, init);
                let status = res.status;
                let response;
                try {
                    response = await res.json();
                    console.log("response 1:- ", response)

                    if (isObject(response) || isArray(response)) {
                        res = {
                            message: "Success",
                            status: API_STATUS.OK,
                            data: response
                        }
                        return res;
                    } else if (res.status == 200) {
                        res = {
                            message: response,
                            status: API_STATUS.OK,
                            data: response
                        }
                        return res;
                    }
                    if (status >= 500) {
                        //throw new Error('Bad response from server');
                        res = {
                            //...res,
                            message: response || 'Bad response from server',
                            status: API_STATUS.SERVER_ERROR
                        }
                        return res;
                    }
                    if (status == 404) {
                        //throw new Error('Bad response from server');
                        //res.error = res.message || 'Bad Credentials';
                        res = {
                            //...res,
                            message: response || 'Bad Credentials',
                            status: API_STATUS.BAD_REQUEST
                        }
                        return res;
                    }
                    if (status >= 400) {
                        //throw new Error('Bad response from server');
                        //res.error = res.message || 'Bad Credentials';
                        res = {
                            //...res,
                            message: response || 'Bad Credentials',
                            status: API_STATUS.BAD_REQUEST
                        }
                        return res;
                    }

                    if (res.status == 'failed') {
                        //res.error = `${res.response || res.message} ${res.httpStatus}`;
                        res = {
                            //...res,
                            message: response || 'Bad Credentials',
                            status: API_STATUS.BAD_REQUEST
                        }
                        return res;
                    }

                    return res;
                } catch (err) {
                    const res = {
                        message: err.message || intl.somethingWentWrong,
                        status: API_STATUS.CODE_ERROR
                    }

                    return res;
                }

            } catch (err) {
                const res = {
                    message: err.message || intl.somethingWentWrong,
                    status: API_STATUS.CODE_ERROR
                }

                return res;
            }
        }
        else {
            let headers = {
                'content-type': 'application/json'
            }
            console.log("headers : ", headers);
            const init = {
                method,
                headers: headers
                //url: `${this.prefix}/${urlWithQuery}`
            };

            if (method !== 'get' && method !== 'head') {
                init.body = JSON.stringify(body);
                //init.data = body;
            }
            console.log(init);
            try {
                let res = await fetch(urlWithQuery, init);
                let status = res.status;
                let response;
                try {
                    response = await res.json();
                    console.log("response 1:- ", response)

                    if (isObject(response) || isArray(response)) {
                        res = {
                            message: "Success",
                            status: API_STATUS.OK,
                            data: response
                        }
                        return res;
                    } else if (res.status == 200) {
                        res = {
                            message: response,
                            status: API_STATUS.OK,
                            data: response
                        }
                        return res;
                    }
                    if (status >= 500) {
                        //throw new Error('Bad response from server');
                        res = {
                            //...res,
                            message: response || 'Bad response from server',
                            status: API_STATUS.SERVER_ERROR
                        }
                        return res;
                    }
                    if (status == 404) {
                        //throw new Error('Bad response from server');
                        //res.error = res.message || 'Bad Credentials';
                        res = {
                            //...res,
                            message: response || 'Bad Credentials',
                            status: API_STATUS.BAD_REQUEST
                        }
                        return res;
                    }
                    if (status >= 400) {
                        //throw new Error('Bad response from server');
                        //res.error = res.message || 'Bad Credentials';
                        res = {
                            //...res,
                            message: response || 'Bad Credentials',
                            status: API_STATUS.BAD_REQUEST
                        }
                        return res;
                    }

                    if (res.status == 'failed') {
                        //res.error = `${res.response || res.message} ${res.httpStatus}`;
                        res = {
                            //...res,
                            message: response || 'Bad Credentials',
                            status: API_STATUS.BAD_REQUEST
                        }
                        return res;
                    }

                    return res;
                } catch (err) {
                    const res = {
                        message: err.message || intl.somethingWentWrong,
                        status: API_STATUS.CODE_ERROR
                    }

                    return res;
                }

            } catch (err) {
                const res = {
                    message: err.message || intl.somethingWentWrong,
                    status: API_STATUS.CODE_ERROR
                }

                return res;
            }
        }
    }
}