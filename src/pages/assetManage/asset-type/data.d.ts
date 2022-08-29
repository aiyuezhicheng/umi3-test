// import {entityType} from '../../../utils/data.d'
// 资产类别属性
export type AssetTypePropertyItem = {
  ID?: string | undefined;
  Name: string;
  Description?:string;
  SN?: number;
  RelatedAssetType?:string;
  RelatedResponseItem?:string;
  RelatedEngineeringUnit?:string;
  ValueType:number;
  ValueFormat?:string;
  DefaultValue?:string;
  IsNotSaveHistory:boolean;
  IsMobileSync:boolean;
  IsTelemeteringData:boolean;
  TelemeteringAlertConfig?:string;
  Invisible:boolean;
  GroupName?:string;
}



// 资产类别项
export type AssetTypeItem = {
  ID?: string | undefined;
  Name: string;
  Description?:string,
  SN?: number;
  ParentID?: string;
  RelatedMaterielIDList ?:string;
  Ext?:string;
  Properties?:AssetTypePropertyItem[]
};

// 树节点
export type AssetTypeTreeItem = {
  ID: string;
  Name: string;
  EntityType:number,
  ExProperty: string;
  ChildList?:AssetTypeTreeItem[]
};

export type MaterialItem={
  ID:string,
  Name:string
}
