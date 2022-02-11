import axios from 'axios'

// const prefixURL = 'http://localhost:8090';
const prefixURL = 'http://104.168.147.34:8080/sugar';

const request = axios.create({
  baseURL: prefixURL,
  timeout: 40000
});

export const get = ( url, params ={} ) => {
  return request({
    url:url,
    method: "GET",
    params: params
  });
}

export const post = ( url, params={} ) => {
  return request({
    url: url,
    method: "POST",
    data: params
  });
}

export const put = ( url, params = {} ) => {
  return request({
    url: url,
    method: "PUT",
    data: params
  });
}

export const del = ( url, params={} ) => {
  return request({
    url: url,
    method: "DELETE",
    data: params
  });
}

