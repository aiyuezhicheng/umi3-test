// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 修改全局属性模板 PUT /BaseService/api/v1/GlobalPropertyTemplate */
export async function putGlobalPropertyTemplate(
  body: API.IMGlobalPropertyTemplate,
  options?: { [key: string]: any },
) {
  return request<API.BooleanAPIResult>('/BaseService/api/v1/GlobalPropertyTemplate', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建全局属性模板 POST /BaseService/api/v1/GlobalPropertyTemplate */
export async function postGlobalPropertyTemplate(
  body: API.IMGlobalPropertyTemplate,
  options?: { [key: string]: any },
) {
  return request<API.GuidAPIResult>('/BaseService/api/v1/GlobalPropertyTemplate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 得到全局属性模板 GET /BaseService/api/v1/GlobalPropertyTemplate/${param0} */
export async function getGlobalPropertyTemplateId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGlobalPropertyTemplateIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.IMGlobalPropertyTemplateAPIResult>(
    `/BaseService/api/v1/GlobalPropertyTemplate/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 删除全局属性模板 DELETE /BaseService/api/v1/GlobalPropertyTemplate/${param0} */
export async function deleteGlobalPropertyTemplateId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteGlobalPropertyTemplateIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BooleanAPIResult>(`/BaseService/api/v1/GlobalPropertyTemplate/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 得到所有全局属性模板 GET /BaseService/api/v1/GlobalPropertyTemplate/list */
export async function getGlobalPropertyTemplateList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGlobalPropertyTemplateListParams,
  options?: { [key: string]: any },
) {
  return request<API.IMGlobalPropertyTemplateListAPIResult>(
    '/BaseService/api/v1/GlobalPropertyTemplate/list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 得到全局属性模板（根据名字） GET /BaseService/api/v1/GlobalPropertyTemplate/name/${param0} */
export async function getGlobalPropertyTemplateNameName(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGlobalPropertyTemplateNameNameParams,
  options?: { [key: string]: any },
) {
  const { name: param0, ...queryParams } = params;
  return request<API.IMGlobalPropertyTemplateAPIResult>(
    `/BaseService/api/v1/GlobalPropertyTemplate/name/${param0}`,
    {
      method: 'GET',
      params: {
        ...queryParams,
      },
      ...(options || {}),
    },
  );
}

/** 验证全局属性模板 PUT /BaseService/api/v1/GlobalPropertyTemplate/validate */
export async function putGlobalPropertyTemplateValidate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.putGlobalPropertyTemplateValidateParams,
  options?: { [key: string]: any },
) {
  return request<boolean>('/BaseService/api/v1/GlobalPropertyTemplate/validate', {
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
