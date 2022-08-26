// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { AssetTypeTreeItem, AssetTypeItem } from './data.d';

// 获取资产树
export async function getAssetTypeTree() {
  return request<{
    IsOk: boolean;
    ErrorMsg?: string;
    Response: AssetTypeTreeItem[];
  }>('/api/AssetTypeTree', {
    method: 'GET',
  });
}

export async function getOneAssetType() {
  return request<{
    IsOk: boolean;
    ErrorMsg?: string;
    Response: AssetTypeItem[];
  }>('/api/OneAssetType', {
    method: 'GET',
  });
}

