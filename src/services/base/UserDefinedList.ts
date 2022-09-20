// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 修改列表（项） PUT /BaseService/api/v1/UserDefinedList */
export async function putUserDefinedList(
  body: API.IMUserDefinedList,
  options?: { [key: string]: any },
) {
  return request<API.BooleanAPIResult>('/BaseService/api/v1/UserDefinedList', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建列表（项） POST /BaseService/api/v1/UserDefinedList */
export async function postUserDefinedList(
  body: API.IMUserDefinedList,
  options?: { [key: string]: any },
) {
  return request<API.GuidAPIResult>('/BaseService/api/v1/UserDefinedList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 得到列表（项） GET /BaseService/api/v1/UserDefinedList/${param0} */
export async function getUserDefinedListId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserDefinedListIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.IMUserDefinedListAPIResult>(`/BaseService/api/v1/UserDefinedList/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除列表（项） DELETE /BaseService/api/v1/UserDefinedList/${param0} */
export async function deleteUserDefinedListId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUserDefinedListIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BooleanAPIResult>(`/BaseService/api/v1/UserDefinedList/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 得到直接儿子列表（项） GET /BaseService/api/v1/UserDefinedList/child/${param0} */
export async function getUserDefinedListChildParentID(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserDefinedListChildParentIDParams,
  options?: { [key: string]: any },
) {
  const { parentID: param0, ...queryParams } = params;
  return request<API.IMUserDefinedListListAPIResult>(
    `/BaseService/api/v1/UserDefinedList/child/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 得到所有列表（包括项） GET /BaseService/api/v1/UserDefinedList/list */
export async function getUserDefinedListList(options?: { [key: string]: any }) {
  return request<API.IMUserDefinedListListAPIResult>('/BaseService/api/v1/UserDefinedList/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 得到列表（项）（根据名字） GET /BaseService/api/v1/UserDefinedList/name/${param0}/${param1} */
export async function getUserDefinedListNameParentIDName(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserDefinedListNameParentIDNameParams,
  options?: { [key: string]: any },
) {
  const { parentID: param0, name: param1, ...queryParams } = params;
  return request<API.IMUserDefinedListAPIResult>(
    `/BaseService/api/v1/UserDefinedList/name/${param0}/${param1}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 保存列表关联关系 POST /BaseService/api/v1/UserDefinedList/relation */
export async function postUserDefinedListRelation(
  body: API.IMListRelation,
  options?: { [key: string]: any },
) {
  return request<API.GuidAPIResult>('/BaseService/api/v1/UserDefinedList/relation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 得到列表关联关系 GET /BaseService/api/v1/UserDefinedList/relation/${param0} */
export async function getUserDefinedListRelationListRelationID(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserDefinedListRelationListRelationIDParams,
  options?: { [key: string]: any },
) {
  const { listRelationID: param0, ...queryParams } = params;
  return request<API.IMListRelationAPIResult>(
    `/BaseService/api/v1/UserDefinedList/relation/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 删除列表关联关系 DELETE /BaseService/api/v1/UserDefinedList/relation/${param0} */
export async function deleteUserDefinedListRelationId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUserDefinedListRelationIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BooleanAPIResult>(`/BaseService/api/v1/UserDefinedList/relation/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 得到所有列表关联关系 GET /BaseService/api/v1/UserDefinedList/relations */
export async function getUserDefinedListRelations(options?: { [key: string]: any }) {
  return request<API.IMListRelationListAPIResult>('/BaseService/api/v1/UserDefinedList/relations', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 得到列表树 GET /BaseService/api/v1/UserDefinedList/tree */
export async function getUserDefinedListTree(options?: { [key: string]: any }) {
  return request<API.IMTreeNodeListAPIResult>('/BaseService/api/v1/UserDefinedList/tree', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 验证列表 PUT /BaseService/api/v1/UserDefinedList/validate */
export async function putUserDefinedListValidate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.putUserDefinedListValidateParams,
  options?: { [key: string]: any },
) {
  return request<boolean>('/BaseService/api/v1/UserDefinedList/validate', {
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
