// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { AssetListItem } from './data.d';

/** 获取规则列表 GET /api/rule */
export async function getAssetList() {
  return request<{
    data: AssetListItem[];
    errorMsg?: string;
    success?: boolean;
  }>('/api/assetList', {
    method: 'GET',
  });
}

export async function getAssetTree() {
  return request<{
    data: AssetListItem[];
    errorMsg?: string;
    success?: boolean;
  }>('/api/assetTree', {
    method: 'GET',
  });
}

