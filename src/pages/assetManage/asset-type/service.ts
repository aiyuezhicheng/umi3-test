// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { AssetTypeTreeItem, AssetTypeItem,MaterialItem } from './data.d';

// 获取资产树
export async function getAssetTypeTree() {
  return request<{
    data: AssetTypeTreeItem[];
  }>('/api/AssetTypeTree', {
    method: 'GET',
  });
}

export async function getOneAssetType(id:string) {
  return request<{
    data: AssetTypeItem[];
  }>(`/api/OneAssetType?id=${id}`, {
    method: 'GET',
  });
}


export async function getMaterialList() {
  return request<{
    data:MaterialItem[];
  }>('/api/getMaterialList', {
    method: 'GET',
  });
}
