import axios from 'axios';

const nodeClient = axios.create({
  baseURL: "http://192.168.0.107:5000/api/v1",
  timeout: 2500,
});

const api = {
  request: (method, url, opts = {}) => {
    const { token, headers, ...newOpts } = opts;
    const newHeaders = headers || {};
    if (token) {
      newHeaders.Authorization = `Bearer ${token}`;
    }
    return nodeClient.request({
      method,
      url,
      headers: newHeaders,
      ...newOpts,
    });
  },
  get: (url, opts = {}) => {
    return api.request('get', url, opts);
  },
  post: (url, data, opts = {}) => {
    opts.data = data;
    return api.request('post', url, opts);
  },
};

export default api;
