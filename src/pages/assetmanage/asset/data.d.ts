import RelatedInfo from '@/utils/data.d'
// 资产类别属性
export type AssetPropertyItem = {
  ID?: string | undefined;
  Name: string;
  Description?: string;
  SN?: number;
  RelatedAsset?: string;
  RelatedResponseItem?: string;
  RelatedEngineeringUnit?: string;
  ValueType: number;
  ValueFormat?: string;
  DefaultValue?: string;
  IsNotSaveHistory: boolean;
  IsMobileSync: boolean;
  IsTelemeteringData: boolean;
  TelemeteringAlertConfig?: string;
  Invisible: boolean;
  GroupName?: string;
}

export type baseObj = {
  ID: 'string',
  Name: any
}

// 资产类别项
export type AssetItem = {
  ID?: string | undefined;
  Name: string;
  Description?: string,
  SN?: number;
  ParentID?: string; // ParentAssetID
  RelatedMaterielIDList?: string;
  Ext?: string;
  Properties?: AssetPropertyItem[],

  Mark?: string;
  RelatedAssetType?: baseObj,
  IsPosition: boolean,
  IsEnabledScan: boolean,
  NoSenseUnlockAccuracy: number,
  IsUseAssetTypeRelatedMaterielIDList: boolean
};

// 树节点
export type AssetTreeItem = {
  ID: string;
  Name: string;
  EntityType: number,
  ExProperty: string;
  ChildList?: AssetTreeItem[]
};

export type MaterialItem = {
  ID: string,
  Name: string
}

