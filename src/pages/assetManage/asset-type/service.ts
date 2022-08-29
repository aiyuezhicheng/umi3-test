// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import AssetType from '.';
import { AssetTypeTreeItem, AssetTypeItem,MaterialItem } from './data.d';

// 获取资产树
export async function getAssetTypeTree() {
  return request<{
    data: AssetTypeTreeItem[];
  }>('/api/AssetTypeTree', {
    method: 'GET',
  });
}

// export async function getOneAssetType(id:string) {
//   console.log(id)
//   return request<{
//     data: AssetTypeItem[];
//   }>(`/api/OneAssetType?${id}`, {
//     method: 'GET',
//   });
// }

export async function getOneAssetType(id: string): Promise<{ data: AssetTypeItem}> {
  return request(`/api/OneAssetType/${id}`);
}
// export async function getOneAssetType(id:string): Promise<{ data: AssetTypeItem[] }> {
//   return request(`/api/OneAssetType/${id}`);
// }


export async function getMaterialList() {
  return request<{
    data:MaterialItem[];
  }>('/api/getMaterialList', {
    method: 'GET',
  });
}
