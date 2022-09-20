// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 修改例外等级 PUT /BaseService/api/v1/EventLevel */
export async function putEventLevel(body: API.IMEventLevel, options?: { [key: string]: any }) {
  return request<API.BooleanAPIResult>('/BaseService/api/v1/EventLevel', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建例外等级 POST /BaseService/api/v1/EventLevel */
export async function postEventLevel(body: API.IMEventLevel, options?: { [key: string]: any }) {
  return request<API.GuidAPIResult>('/BaseService/api/v1/EventLevel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 得到例外等级 GET /BaseService/api/v1/EventLevel/${param0} */
export async function getEventLevelId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getEventLevelIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.IMEventLevelAPIResult>(`/BaseService/api/v1/EventLevel/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除例外等级 DELETE /BaseService/api/v1/EventLevel/${param0} */
export async function deleteEventLevelId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteEventLevelIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BooleanAPIResult>(`/BaseService/api/v1/EventLevel/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 得到所有例外等级 GET /BaseService/api/v1/EventLevel/list */
export async function getEventLevelList(options?: { [key: string]: any }) {
  return request<API.IMEventLevelListAPIResult>('/BaseService/api/v1/EventLevel/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 得到例外等级（根据名字） GET /BaseService/api/v1/EventLevel/name/${param0} */
export async function getEventLevelNameName(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getEventLevelNameNameParams,
  options?: { [key: string]: any },
) {
  const { name: param0, ...queryParams } = params;
  return request<API.IMEventLevelAPIResult>(`/BaseService/api/v1/EventLevel/name/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 验证例外等级 PUT /BaseService/api/v1/EventLevel/validate */
export async function putEventLevelValidate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.putEventLevelValidateParams,
  options?: { [key: string]: any },
) {
  return request<boolean>('/BaseService/api/v1/EventLevel/validate', {
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
