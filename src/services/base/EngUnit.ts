// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 修改工程单位 PUT /BaseService/api/v1/EngUnit */
export async function putEngUnit(body: API.IMEngUnit, options?: { [key: string]: any }) {
  return request<API.BooleanAPIResult>('/BaseService/api/v1/EngUnit', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建工程单位 POST /BaseService/api/v1/EngUnit */
export async function postEngUnit(body: API.IMEngUnit, options?: { [key: string]: any }) {
  return request<API.GuidAPIResult>('/BaseService/api/v1/EngUnit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 得到工程单位 GET /BaseService/api/v1/EngUnit/${param0} */
export async function getEngUnitId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getEngUnitIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.IMEngUnitAPIResult>(`/BaseService/api/v1/EngUnit/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除工程单位 DELETE /BaseService/api/v1/EngUnit/${param0} */
export async function deleteEngUnitId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteEngUnitIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BooleanAPIResult>(`/BaseService/api/v1/EngUnit/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 得到所有工程单位 GET /BaseService/api/v1/EngUnit/list */
export async function getEngUnitList(options?: { [key: string]: any }) {
  return request<API.IMEngUnitListAPIResult>('/BaseService/api/v1/EngUnit/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 得到工程单位（根据名字） GET /BaseService/api/v1/EngUnit/name/${param0} */
export async function getEngUnitNameName(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getEngUnitNameNameParams,
  options?: { [key: string]: any },
) {
  const { name: param0, ...queryParams } = params;
  return request<API.IMEngUnitAPIResult>(`/BaseService/api/v1/EngUnit/name/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 批量获取名字 GET /BaseService/api/v1/EngUnit/names/${param0} */
export async function getEngUnitNamesIds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getEngUnitNamesIdsParams,
  options?: { [key: string]: any },
) {
  const { ids: param0, ...queryParams } = params;
  return request<API.IMIDNameListAPIResult>(`/BaseService/api/v1/EngUnit/names/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 验证工程单位 PUT /BaseService/api/v1/EngUnit/validate/${param0} */
export async function putEngUnitValidateId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.putEngUnitValidateIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BooleanAPIResult>(`/BaseService/api/v1/EngUnit/validate/${param0}`, {
    method: 'PUT',
    params: { ...queryParams },
    ...(options || {}),
  });
}
