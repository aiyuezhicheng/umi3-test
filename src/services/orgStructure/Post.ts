// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 得到岗位 GET /OrgStructureService/api/v1/Post */
export async function getPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPostParams,
  options?: { [key: string]: any },
) {
  return request<API.IMPost>('/OrgStructureService/api/v1/Post', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改岗位 PUT /OrgStructureService/api/v1/Post */
export async function putPost(body: API.IMPost, options?: { [key: string]: any }) {
  return request<boolean>('/OrgStructureService/api/v1/Post', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建岗位 POST /OrgStructureService/api/v1/Post */
export async function postPost(body: API.IMPost, options?: { [key: string]: any }) {
  return request<string>('/OrgStructureService/api/v1/Post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除岗位 DELETE /OrgStructureService/api/v1/Post/${param0} */
export async function deletePostId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deletePostIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/OrgStructureService/api/v1/Post/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 得到所有岗位 GET /OrgStructureService/api/v1/Post/list */
export async function getPostList(options?: { [key: string]: any }) {
  return request<API.IMPost[]>('/OrgStructureService/api/v1/Post/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 得到岗位（根据名字） GET /OrgStructureService/api/v1/Post/name/${param0} */
export async function getPostNameName(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPostNameNameParams,
  options?: { [key: string]: any },
) {
  const { name: param0, ...queryParams } = params;
  return request<API.IMPost>(`/OrgStructureService/api/v1/Post/name/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
