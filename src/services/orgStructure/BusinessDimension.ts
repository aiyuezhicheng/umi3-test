// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 修改业务范畴 PUT /OrgStructureService/api/v1/BusinessDimension */
export async function putBusinessDimension(
  body: API.IMBusinessDimension,
  options?: { [key: string]: any },
) {
  return request<boolean>('/OrgStructureService/api/v1/BusinessDimension', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建业务范畴 POST /OrgStructureService/api/v1/BusinessDimension */
export async function postBusinessDimension(
  body: API.IMBusinessDimension,
  options?: { [key: string]: any },
) {
  return request<string>('/OrgStructureService/api/v1/BusinessDimension', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 得到业务范畴 GET /OrgStructureService/api/v1/BusinessDimension/${param0} */
export async function getBusinessDimensionId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBusinessDimensionIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.IMBusinessDimension>(
    `/OrgStructureService/api/v1/BusinessDimension/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 删除业务范畴 DELETE /OrgStructureService/api/v1/BusinessDimension/${param0} */
export async function deleteBusinessDimensionId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteBusinessDimensionIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/OrgStructureService/api/v1/BusinessDimension/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 得到直接儿子业务范畴（分类） GET /OrgStructureService/api/v1/BusinessDimension/child/${param0} */
export async function getBusinessDimensionChildParentID(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBusinessDimensionChildParentIDParams,
  options?: { [key: string]: any },
) {
  const { parentID: param0, ...queryParams } = params;
  return request<API.IMBusinessDimension[]>(
    `/OrgStructureService/api/v1/BusinessDimension/child/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 得到所有业务范畴 GET /OrgStructureService/api/v1/BusinessDimension/list */
export async function getBusinessDimensionList(options?: { [key: string]: any }) {
  return request<API.IMBusinessDimension[]>('/OrgStructureService/api/v1/BusinessDimension/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 得到业务范畴（根据名字） GET /OrgStructureService/api/v1/BusinessDimension/name/${param0}/${param1} */
export async function getBusinessDimensionNameParentIDName(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBusinessDimensionNameParentIDNameParams,
  options?: { [key: string]: any },
) {
  const { parentID: param0, name: param1, ...queryParams } = params;
  return request<API.IMBusinessDimension>(
    `/OrgStructureService/api/v1/BusinessDimension/name/${param0}/${param1}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 得到业务范畴树 GET /OrgStructureService/api/v1/BusinessDimension/tree */
export async function getBusinessDimensionTree(options?: { [key: string]: any }) {
  return request<API.IMTreeNode[]>('/OrgStructureService/api/v1/BusinessDimension/tree', {
    method: 'GET',
    ...(options || {}),
  });
}
