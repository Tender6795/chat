import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

type CustomHeaders = Record<string, string>;

const api = <T>(fn: (...args: any[]) => Promise<AxiosResponse<T>>, args: any[]): Promise<T> =>
  fn
    .apply(axios, args)
    .then((res: AxiosResponse<T>) => res.data)
    .catch((error) => {
      if (error?.response) {
        console.error('Response error => ', error?.response?.data, 'Status => ', error?.response?.status);
      } else if (error?.request) { 
        console.error('Request error => ', error?.request);
      } else {
        console.error('Request error => ', error?.message);
      }
      console.error('Request error => ', error?.config);
      return Promise.reject(error?.response?.data);
    });

const _get = <T>(...rest: any[]): Promise<T> => api<T>(axios.get, rest);

const _post = <T>(...rest: any[]): Promise<T> => api<T>(axios.post, rest);

const _put = <T>(...rest: any[]): Promise<T> => api<T>(axios.put, rest);

const _patch = <T>(...rest: any[]): Promise<T> => api<T>(axios.patch, rest);

const _delete = <T>(...rest: any[]): Promise<T> => api<T>(axios.delete, rest);

export const baseURL: string = process.env.SRC || 'http://localhost:5000/api';

const setCustomHeader = (headers: CustomHeaders): CustomHeaders => {
  let custom_headers: CustomHeaders = { ...headers };

  if (localStorage.getItem('token')) {
    custom_headers = { authorization: '' + localStorage.getItem('token'), ...custom_headers };
  }

  return custom_headers;
};

const httpOptions = (headers: CustomHeaders, responseType: 'json' | 'arraybuffer' | 'blob' | 'document' | 'text' = 'json'): AxiosRequestConfig => ({
  baseURL,
  responseType,
  headers: setCustomHeader(headers),
});

export const get = <T>(url: string, params: any = {}, headers: CustomHeaders = {}, responseType: 'json' | 'arraybuffer' | 'blob' | 'document' | 'text' = 'json'): Promise<T> =>
  _get<T>(url, { ...httpOptions(headers, responseType), params });

export const post = <T>(url: string, body: any = '', headers: CustomHeaders = {}, responseType: 'json' | 'arraybuffer' | 'blob' | 'document' | 'text' = 'json'): Promise<T> =>
  _post<T>(url, body, { ...httpOptions(headers, responseType) });

export const put = <T>(url: string, body: any = '', headers: CustomHeaders = {}, responseType: 'json' | 'arraybuffer' | 'blob' | 'document' | 'text' = 'json'): Promise<T> =>
  _put<T>(url, body, { ...httpOptions(headers, responseType) });

export const patch = <T>(url: string, body: any = '', headers: CustomHeaders = {}, responseType: 'json' | 'arraybuffer' | 'blob' | 'document' | 'text' = 'json'): Promise<T> =>
  _patch<T>(url, body, { ...httpOptions(headers, responseType) });

export const httpDelete = <T>(url: string, data: any = '', headers: CustomHeaders = {}, responseType: 'json' | 'arraybuffer' | 'blob' | 'document' | 'text' = 'json'): Promise<T> =>
  _delete<T>(url, { data, ...httpOptions(headers, responseType) });
