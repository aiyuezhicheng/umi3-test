// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { AssetTreeItem, AssetItem,MaterialItem } from './data.d';

// 获取资产树
export async function getAssetTree() {
  return request<{
    data: AssetTreeItem[];
  }>('/api/AssetTree', {
    method: 'GET',
  });
}

export async function getOneAsset(id: string): Promise<{ data: AssetItem}> {
  return request(`/api/OneAsset/${id}`);
}


export async function getMaterialList() {
  return request<{
    data:MaterialItem[];
  }>('/api/getMaterialList', {
    method: 'GET',
  });
}
