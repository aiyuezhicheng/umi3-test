// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 编辑资产类别 PUT /AssetService/api/v1/AssetType */
export async function putAssetType(body: API.IMAssetType, options?: { [key: string]: any }) {
  return request<API.AssetTypeAPIResult>('/AssetService/api/v1/AssetType', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建资产类别 POST /AssetService/api/v1/AssetType */
export async function postAssetType(body: API.IMAssetType, options?: { [key: string]: any }) {
  return request<API.AssetTypeAPIResult>('/AssetService/api/v1/AssetType', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 得到资产类别 GET /AssetService/api/v1/AssetType/${param0} */
export async function getAssetTypeId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAssetTypeIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.AssetTypeAPIResult>(`/AssetService/api/v1/AssetType/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除资产类别 DELETE /AssetService/api/v1/AssetType/${param0} */
export async function deleteAssetTypeId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteAssetTypeIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.AssetTypeAPIResult>(`/AssetService/api/v1/AssetType/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 得到直接儿子资产类别 GET /AssetService/api/v1/AssetType/child/${param0} */
export async function getAssetTypeChildParentID(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAssetTypeChildParentIDParams,
  options?: { [key: string]: any },
) {
  const { parentID: param0, ...queryParams } = params;
  return request<API.IMAssetType[]>(`/AssetService/api/v1/AssetType/child/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 得到所有资产类别 GET /AssetService/api/v1/AssetType/list */
export async function getAssetTypeList(options?: { [key: string]: any }) {
  return request<API.IMAssetType[]>('/AssetService/api/v1/AssetType/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 得到资产类别（根据名字） GET /AssetService/api/v1/AssetType/name/${param0} */
export async function getAssetTypeNameName(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAssetTypeNameNameParams,
  options?: { [key: string]: any },
) {
  const { name: param0, ...queryParams } = params;
  return request<API.IMAssetType>(`/AssetService/api/v1/AssetType/name/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 得到资产类别属性 GET /AssetService/api/v1/AssetType/property/${param0} */
export async function getAssetTypePropertyAssetTypeID(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAssetTypePropertyAssetTypeIDParams,
  options?: { [key: string]: any },
) {
  const { assetTypeID: param0, ...queryParams } = params;
  return request<API.IMAssetTypeProperty[]>(`/AssetService/api/v1/AssetType/property/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 保存资产类别属性 PUT /AssetService/api/v1/AssetType/property/${param0} */
export async function putAssetTypePropertyAtid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.putAssetTypePropertyAtidParams,
  body: API.IMAssetTypeProperty[],
  options?: { [key: string]: any },
) {
  const { atid: param0, ...queryParams } = params;
  return request<boolean>(`/AssetService/api/v1/AssetType/property/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 得到资产类别树 GET /AssetService/api/v1/AssetType/tree */
export async function getAssetTypeTree(options?: { [key: string]: any }) {
  return request<API.AssetTypeAPIResult>('/AssetService/api/v1/AssetType/tree', {
    method: 'GET',
    ...(options || {}),
  });
}
