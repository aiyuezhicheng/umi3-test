import { Property, RelatedInfo } from "@/utils/data.d";
// 资产类别属性
export type AssetTypePropertyItem = {
  Description?: string;
  GroupName?: string;
  SN?: number;
  IsNotSaveHistory: boolean;
  IsTelemeteringData: boolean | false;
  RelatedAssetType: RelatedInfo;
  TelemeteringAlertConfig?: string | '';
} & Property




// 资产类别项
export type AssetTypeItem = {
  ID?: string | undefined;
  Name: string;
  Description?: string,
  SN?: number;
  ParentID?: string;
  RelatedMaterielIDList?: string;
  Ext?: string;
  Properties?: AssetTypePropertyItem[]
};

// 树节点
export type AssetTypeTreeItem = {
  ID: string;
  Name: string;
  EntityType: number,
  ExProperty: string;
  ChildList?: AssetTypeTreeItem[]
};

export type MaterialItem = {
  ID: string,
  Name: string
}
