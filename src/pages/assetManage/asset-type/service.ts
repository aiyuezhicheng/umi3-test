// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import AssetType from '.';
import { AssetTypeTreeItem, AssetTypeItem, MaterialItem, AssetTypePropertyItem } from './data.d';

// 获取资产树
export async function getAssetTypeTree() {
  return request<{
    data: AssetTypeTreeItem[];
  }>('/api/AssetTypeTree', {
    method: 'GET',
  });
}

export async function getOneAssetType(id: string): Promise<{ data: AssetTypeItem }> {
  return request(`/api/OneAssetType/${id}`);
}

export async function getMaterialList() {
  return request<{
    data: MaterialItem[];
  }>('/api/getMaterialList', {
    method: 'GET',
  });
}

export async function getEngineeringUnitList() {
  return request<{
    data: MaterialItem[];
  }>('/api/getEngineeringUnitList', {
    method: 'GET',
  });
}

export async function getEngineeringUnitNamesByIDs() {
  return request<{
    data: MaterialItem[];
  }>('/api/getEngineeringUnitList', {
    method: 'GET',
  });
}


export async function getOneAssetTypeProperties(id: string): Promise<{ data: AssetTypePropertyItem[] }> {
  return request(`/api/OneAssetTypeProperties/${id}`);
}
