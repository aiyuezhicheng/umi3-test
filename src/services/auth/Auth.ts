// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取Token POST /AuthService/api/v1/Auth/token */
export async function postToken(body: API.LoginModel) {
  return request<API.TokenResultAPIResult | string>('/AuthService/api/v1/Auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  });
}

/** 获取当前token用户信息 GET /AuthService/api/v1/Auth/user */
export async function getUser(options?: { [key: string]: any }) {
  console.log(localStorage.getItem('token'));
  return request<API.LoginUserAPIResult>('/AuthService/api/v1/Auth/user', {
    method: 'GET',
    ...(options || {}),
  });
}
