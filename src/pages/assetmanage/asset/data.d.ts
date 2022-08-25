// 资产项
export type AssetListItem = {
  ID?: string | undefined;
  Avatar?:string,
  Name?: string;
  EntityType?: number;
  Exproperty?: boolean;
  Children?:AssetListItem[]
};
