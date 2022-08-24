// 资产项
export type AssetListItem = {
  ID?: string;
  Avatar?:string,
  Name?: string;
  EntityType?: number;
  Exproperty?: boolean;
};
// 表格分页
export type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type TableListData = {
  list: AssetListItem[];
  pagination: Partial<TableListPagination>;
};

// 资产
export type AssetList = {
  data?: AssetItem[];
  error?: string;
  success?: boolean;
}
