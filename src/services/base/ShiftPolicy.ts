// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 修改轮班 PUT /BaseService/api/v1/ShiftPolicy */
export async function putShiftPolicy(body: API.IMShiftPolicy, options?: { [key: string]: any }) {
  return request<API.BooleanAPIResult>('/BaseService/api/v1/ShiftPolicy', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建轮班 POST /BaseService/api/v1/ShiftPolicy */
export async function postShiftPolicy(body: API.IMShiftPolicy, options?: { [key: string]: any }) {
  return request<API.GuidAPIResult>('/BaseService/api/v1/ShiftPolicy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 得到轮班 GET /BaseService/api/v1/ShiftPolicy/${param0} */
export async function getShiftPolicyId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getShiftPolicyIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.IMShiftPolicyAPIResult>(`/BaseService/api/v1/ShiftPolicy/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除轮班 DELETE /BaseService/api/v1/ShiftPolicy/${param0} */
export async function deleteShiftPolicyId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteShiftPolicyIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BooleanAPIResult>(`/BaseService/api/v1/ShiftPolicy/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 得到所有轮班 GET /BaseService/api/v1/ShiftPolicy/list */
export async function getShiftPolicyList(options?: { [key: string]: any }) {
  return request<API.IMShiftPolicyListAPIResult>('/BaseService/api/v1/ShiftPolicy/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 得到轮班（根据名字） GET /BaseService/api/v1/ShiftPolicy/name/${param0} */
export async function getShiftPolicyNameName(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getShiftPolicyNameNameParams,
  options?: { [key: string]: any },
) {
  const { name: param0, ...queryParams } = params;
  return request<API.IMShiftPolicyAPIResult>(`/BaseService/api/v1/ShiftPolicy/name/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 验证轮班 PUT /BaseService/api/v1/ShiftPolicy/validate */
export async function putShiftPolicyValidate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.putShiftPolicyValidateParams,
  options?: { [key: string]: any },
) {
  return request<boolean>('/BaseService/api/v1/ShiftPolicy/validate', {
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
