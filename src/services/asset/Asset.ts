// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 修改资产 PUT /AssetService/api/v1/Asset */
export async function putAsset(body: API.IMAsset, options?: { [key: string]: any }) {
  return request<boolean>('/AssetService/api/v1/Asset', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建资产 POST /AssetService/api/v1/Asset */
export async function postAsset(body: API.IMAsset, options?: { [key: string]: any }) {
  return request<string>('/AssetService/api/v1/Asset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 得到资产 GET /AssetService/api/v1/Asset/${param0} */
export async function getAssetId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAssetIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.IMAsset>(`/AssetService/api/v1/Asset/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除资产 DELETE /AssetService/api/v1/Asset/${param0} */
export async function deleteAssetId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteAssetIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/AssetService/api/v1/Asset/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 得到直接儿子资产 GET /AssetService/api/v1/Asset/child/${param0} */
export async function getAssetChildParentID(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAssetChildParentIDParams,
  options?: { [key: string]: any },
) {
  const { parentID: param0, ...queryParams } = params;
  return request<API.IMAsset[]>(`/AssetService/api/v1/Asset/child/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 得到所有资产 GET /AssetService/api/v1/Asset/list */
export async function getAssetList(options?: { [key: string]: any }) {
  return request<API.IMAsset[]>('/AssetService/api/v1/Asset/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 得到指定资产号的资产 GET /AssetService/api/v1/Asset/mark/${param0} */
export async function getAssetMarkMark(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAssetMarkMarkParams,
  options?: { [key: string]: any },
) {
  const { mark: param0, ...queryParams } = params;
  return request<API.IMAsset>(`/AssetService/api/v1/Asset/mark/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 得到资产（根据名字） GET /AssetService/api/v1/Asset/name/${param0}/${param1} */
export async function getAssetNameParentIDName(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAssetNameParentIDNameParams,
  options?: { [key: string]: any },
) {
  const { parentID: param0, name: param1, ...queryParams } = params;
  return request<API.IMAsset>(`/AssetService/api/v1/Asset/name/${param0}/${param1}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 得到资产属性 GET /AssetService/api/v1/Asset/property/${param0} */
export async function getAssetPropertyAssetID(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAssetPropertyAssetIDParams,
  options?: { [key: string]: any },
) {
  const { assetID: param0, ...queryParams } = params;
  return request<API.IMAssetProperty[]>(`/AssetService/api/v1/Asset/property/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 保存资产属性 POST /AssetService/api/v1/Asset/property/${param0} */
export async function postAssetPropertyAssetID(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postAssetPropertyAssetIDParams,
  body: API.IMAssetProperty[],
  options?: { [key: string]: any },
) {
  const { assetID: param0, ...queryParams } = params;
  return request<boolean>(`/AssetService/api/v1/Asset/property/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 得到资产属性 GET /AssetService/api/v1/Asset/property/${param0}/${param1} */
export async function getAssetPropertyAssetIDPropertyName(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAssetPropertyAssetIDPropertyNameParams,
  options?: { [key: string]: any },
) {
  const { assetID: param0, propertyName: param1, ...queryParams } = params;
  return request<API.IMAssetProperty>(`/AssetService/api/v1/Asset/property/${param0}/${param1}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据资产属性ID列表获取资产属性 POST /AssetService/api/v1/Asset/property/idList */
export async function postAssetPropertyIdList(body: string[], options?: { [key: string]: any }) {
  return request<API.IMAssetProperty[]>('/AssetService/api/v1/Asset/property/idList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 得到资产树 GET /AssetService/api/v1/Asset/tree */
export async function getAssetTree(options?: { [key: string]: any }) {
  return request<API.IMTreeNode[]>('/AssetService/api/v1/Asset/tree', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 得到资产树（带筛选功能） GET /AssetService/api/v1/Asset/tree/${param0} */
export async function getAssetTreeAssetTypeNames(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAssetTreeAssetTypeNamesParams,
  options?: { [key: string]: any },
) {
  const { assetTypeNames: param0, ...queryParams } = params;
  return request<API.IMTreeNode[]>(`/AssetService/api/v1/Asset/tree/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 得到属于指定资产类别的所有资产 GET /AssetService/api/v1/Asset/type/${param0} */
export async function getAssetTypeAssetTypeID(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAssetTypeAssetTypeIDParams,
  options?: { [key: string]: any },
) {
  const { assetTypeID: param0, ...queryParams } = params;
  return request<API.IMAsset[]>(`/AssetService/api/v1/Asset/type/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
