import { Request, Response } from 'express';
import { AssetTypeTreeItem, AssetTypeItem, MaterialItem, AssetTypePropertyItem } from './data.d';


const getAssetTree = (req: Request, res: Response) => {
  const tree: AssetTypeTreeItem[] = [{
    ID: '001',
    Name: '资产类型001',
    EntityType: 13,
    ExProperty: '13',
    ChildList: [],
  }, {
    ID: '002',
    Name: '资产类型002',
    EntityType: 13,
    ExProperty: '13',
    ChildList: [{
      ID: '002-001',
      Name: '资产类型002下的001',
      EntityType: 13,
      ExProperty: '13',
      ChildList: [{
        ID: '002-001-001',
        Name: '资产类型002下001的001',
        EntityType: 13,
        ExProperty: '13',
        ChildList: [{
          ID: '002-001-001-001',
          Name: '资产类型002下001的002',
          EntityType: 13,
          ExProperty: '13',
          ChildList: []
        }]
      }, {
        ID: '002-001-002',
        Name: '资产类型002下001的002',
        EntityType: 13,
        ExProperty: '13',
        ChildList: []
      }]
    }, {
      ID: '002-002',
      Name: '资产类型002下的002',
      EntityType: 13,
      ExProperty: '13',
      ChildList: []
    }, {
      ID: '002-003',
      Name: '资产类型002下的003',
      EntityType: 13,
      ExProperty: '13',
      ChildList: [{
        ID: '002-003-001',
        Name: '资产类型002下003的001',
        EntityType: 13,
        ExProperty: '13',
        ChildList: []
      }]
    }]
  }, {
    ID: '003',
    Name: '资产类型003',
    EntityType: 13,
    ExProperty: '13',
    ChildList: []
  }, {
    ID: '004',
    Name: '资产类型004',
    EntityType: 13,
    ExProperty: '13',
    ChildList: []
  }];

  res.json({
    data: tree,
    success: true
  });
};

const getOneAssetType = (req: Request, res: Response) => {
  const id = req.params.id;
  const treeList: AssetTypeTreeItem[] = [{
    ID: '001',
    Name: '资产类型001',
    EntityType: 13,
    ExProperty: '13',
    ChildList: []
  }, {
    ID: '002',
    Name: '资产类型002',
    EntityType: 13,
    ExProperty: '13',
    ChildList: []
  }, {
    ID: '002-002',
    Name: '资产类型002下的002',
    EntityType: 13,
    ExProperty: '13',
    ChildList: []
  }, {
    ID: '002-003',
    Name: '资产类型002下的003',
    EntityType: 13,
    ExProperty: '13',
    ChildList: []
  }, {
    ID: '002-003-001',
    Name: '资产类型002下003的001',
    EntityType: 13,
    ExProperty: '13',
    ChildList: []
  }, {
    ID: '002-001',
    Name: '资产类型002下的001',
    EntityType: 13,
    ExProperty: '13',
    ChildList: []
  },
  {
    ID: '002-001-001',
    Name: '资产类型002下001的001',
    EntityType: 13,
    ExProperty: '13',
    ChildList: []
  }, {
    ID: '002-001-001-001',
    Name: '资产类型002下001的002',
    EntityType: 13,
    ExProperty: '13',
    ChildList: []
  }, {
    ID: '002-001-002',
    Name: '资产类型002下001的002',
    EntityType: 13,
    ExProperty: '13',
    ChildList: []
  }, {
    ID: '003',
    Name: '资产类型003',
    EntityType: 13,
    ExProperty: '13',
    ChildList: []
  }, {
    ID: '004',
    Name: '资产类型004',
    EntityType: 13,
    ExProperty: '13',
    ChildList: []
  }];
  const parentObj = {
    '001': '',
    '002': '',
    '003': '',
    '004': '',
    '002-001': '002',
    '002-001-001': '002-001',
    '002-001-002': '002-001',
    '002-001-001-001': '002-001-001',
    '002-002': '002',
    '002-003': '002',
    '002-003-001': '002-003',
  }
  let obj = {};
  console.log('id=' + id)
  let item = treeList.find(item => item.ID == id)
  obj = { ...item }
  delete obj['ChildList']
  obj['Description'] = obj['Name'] + '-描述';
  obj['Ext'] = obj['Name'] + '-Ext';
  obj['ParentID'] = parentObj[obj['ID']]
  res.json({
    data: obj,
    success: true
  });
}

const getMaterialList = (req: Request, res: Response) => {
  const data: MaterialItem[] = [
    { ID: '物料1-id', Name: '物料1' },
    { ID: '物料2-id', Name: '物料2' },
    { ID: '物料3-id', Name: '物料3' },
    { ID: '物料4-id', Name: '物料4' },
    { ID: '物料5-id', Name: '物料5' },
    { ID: '物料6-id', Name: '物料6' },
    { ID: '物料7-id', Name: '物料7' },
    { ID: '物料8-id', Name: '物料8' }
  ];
  res.json({
    data: data,
    success: true
  });
}


const getEngineeringUnitList = (req: Request, res: Response) => {
  const data: { ID: string, Name: string }[] = [
    { ID: '单位1-id', Name: '单位1' },
    { ID: '单位2-id', Name: '单位2' },
    { ID: '单位3-id', Name: '单位3' },
    { ID: '单位4-id', Name: '单位4' },
    { ID: '单位5-id', Name: '单位5' },
    { ID: '单位6-id', Name: '单位6' },
    { ID: '单位7-id', Name: '单位7' },
    { ID: '单位8-id', Name: '单位8' },
    { ID: '单位9-id', Name: '单位9' },
    { ID: '单位10-id', Name: '单位10' },
  ];
  res.json({
    data: data,
    success: true
  });
}

const getEngineeringUnitNamesByIDs = (req: Request, res: Response) => {
  const data = {
    '单位1-id': '单位1',
    '单位2-id': '单位2',
    '单位3-id': '单位3',
    '单位4-id': '单位4',
    '单位5-id': '单位5',
    '单位6-id': '单位6',
    '单位7-id': '单位7',
    '单位8-id': '单位8',
    '单位9-id': '单位9',
    '单位10-id': '单位10'
  }

  res.json({
    data: data,
    success: true
  });
}

const getOneAssetTypeProperties = (req: Request, res: Response) => {
  const data: AssetTypePropertyItem[] = [{
    DefaultValue: "",
    Description: "",
    GroupName: "基本信息",
    ID: "资产类别属性001",
    Invisible: false,
    IsMobileSync: false,
    IsNotSaveHistory: false,
    IsTelemeteringData: false,
    Name: "字符串",
    RelatedAssetType: { ID: 'a33567c2-2193-4db2-a219-efee78dcc5f8', Name: null },
    RelatedEngineeringUnit: { ID: '8626dc3b-9af0-4641-8a88-4479491fa9b5', Name: null },
    RelatedResponseItem: { ID: '00000000-0000-0000-0000-000000000000', Name: null },
    SN: 1,
    ValueFormat: "",
    ValueType: 2,
    CurrentValue: '这是一个字符串'
  }, {
    DefaultValue: '100',
    Description: "",
    GroupName: "基本信息",
    ID: "资产类别属性002",
    Invisible: false,
    IsMobileSync: true,
    IsNotSaveHistory: false,
    IsTelemeteringData: false,
    Name: "数值",
    RelatedAssetType: { ID: 'a33567c2-2193-4db2-a219-efee78dcc5f8', Name: null },
    RelatedEngineeringUnit: { ID: '8626dc3b-9af0-4641-8a88-4479491fa9b5', Name: null },
    RelatedResponseItem: { ID: '00000000-0000-0000-0000-000000000000', Name: null },
    SN: 1,
    ValueFormat: "",
    ValueType: 1,
    CurrentValue: ''

  }, {
    DefaultValue: "",
    Description: "",
    GroupName: "基本信息",
    ID: "资产类别属性003",
    Invisible: false,
    IsMobileSync: true,
    IsNotSaveHistory: false,
    IsTelemeteringData: false,
    Name: "列表",
    RelatedAssetType: { ID: 'a33567c2-2193-4db2-a219-efee78dcc5f8', Name: null },
    RelatedEngineeringUnit: { ID: '00000000-0000-0000-0000-000000000000', Name: null },
    RelatedResponseItem: { ID: '8626dc3b-9af0-4641-8a88-4479491fa9b5', Name: null },
    SN: 1,
    ValueFormat: "",
    ValueType: 0,
    CurrentValue: '8626dc3b-9af0-4641-8a88-4479491fa9b5'
  }, {
    DefaultValue: "",
    Description: "",
    GroupName: "基本信息",
    ID: "资产类别属性004",
    Invisible: false,
    IsMobileSync: true,
    IsNotSaveHistory: false,
    IsTelemeteringData: false,
    Name: "可输入列表",
    RelatedAssetType: { ID: '8626dc3b-9af0-4641-8a88-4479491fa9b5', Name: null },
    RelatedEngineeringUnit: { ID: '00000000-0000-0000-0000-000000000000', Name: null },
    RelatedResponseItem: { ID: '1e6761d1-e8c2-4b03-b659-2043416cda2e', Name: null },
    SN: 1,
    ValueFormat: "",
    ValueType: 3,
  }, {
    DefaultValue: "48d73844-ebbd-4a3c-af7a-0af21e8aa7a8",
    Description: "",
    GroupName: "基本信息",
    ID: "资产类别属性005",
    Invisible: false,
    IsMobileSync: true,
    IsNotSaveHistory: false,
    IsTelemeteringData: false,
    Name: "多选列表",
    RelatedAssetType: { ID: 'a33567c2-2193-4db2-a219-efee78dcc5f8', Name: null },
    RelatedEngineeringUnit: { ID: '00000000-0000-0000-0000-000000000000', Name: null },
    RelatedResponseItem: { ID: '48d73844-ebbd-4a3c-af7a-0af21e8aa7a8', Name: null },
    SN: 1,
    ValueFormat: "",
    ValueType: 7,
  }, {
    DefaultValue: "",
    Description: "",
    GroupName: "基本信息",
    ID: "资产类别属性006",
    Invisible: false,
    IsMobileSync: true,
    IsNotSaveHistory: false,
    IsTelemeteringData: false,
    Name: "日期时间",
    RelatedAssetType: { ID: 'a33567c2-2193-4db2-a219-efee78dcc5f8', Name: null },
    RelatedEngineeringUnit: { ID: '00000000-0000-0000-0000-000000000000', Name: null },
    RelatedResponseItem: { ID: '00000000-0000-0000-0000-000000000000', Name: null },
    SN: 1,
    ValueFormat: "",
    ValueType: 5,
  }, {
    DefaultValue: "",
    Description: "",
    GroupName: "基本信息",
    ID: "资产类别属性007",
    Invisible: true,
    IsMobileSync: true,
    IsNotSaveHistory: false,
    IsTelemeteringData: false,
    Name: "文件",
    RelatedAssetType: { ID: 'a33567c2-2193-4db2-a219-efee78dcc5f8', Name: null },
    RelatedEngineeringUnit: { ID: '00000000-0000-0000-0000-000000000000', Name: null },
    RelatedResponseItem: { ID: '00000000-0000-0000-0000-000000000000', Name: null },
    SN: 1,
    ValueFormat: "",
    ValueType: 6,
  }, {
    DefaultValue: "",
    Description: "",
    GroupName: "基本信息",
    ID: "资产类别属性008",
    Invisible: false,
    IsMobileSync: true,
    IsNotSaveHistory: true,
    IsTelemeteringData: false,
    Name: "json",
    RelatedAssetType: { ID: 'a33567c2-2193-4db2-a219-efee78dcc5f8', Name: null },
    RelatedEngineeringUnit: { ID: '00000000-0000-0000-0000-000000000000', Name: null },
    RelatedResponseItem: { ID: '00000000-0000-0000-0000-000000000000', Name: null },
    SN: 1,
    ValueFormat: "",
    ValueType: 8,
  }, {
    DefaultValue: "",
    Description: "",
    GroupName: "test",
    ID: "资产类别属性008",
    Invisible: false,
    IsMobileSync: true,
    IsNotSaveHistory: true,
    IsTelemeteringData: false,
    Name: "json",
    RelatedAssetType: { ID: 'a33567c2-2193-4db2-a219-efee78dcc5f8', Name: null },
    RelatedEngineeringUnit: { ID: '00000000-0000-0000-0000-000000000000', Name: null },
    RelatedResponseItem: { ID: '00000000-0000-0000-0000-000000000000', Name: null },
    SN: 1,
    ValueFormat: "",
    ValueType: 8,
  }]
  res.json({
    data: data,
    success: true
  });
}


export default {
  'GET /api/AssetTypeTree': getAssetTree,
  'GET /api/OneAssetType/:id': getOneAssetType,
  'GET /api/getMaterialList': getMaterialList,
  'GET /api/getEngineeringUnitList': getEngineeringUnitList,
  'GET /api/getEngineeringUnitNamesByIDs': getEngineeringUnitNamesByIDs,
  'GET /api/OneAssetTypeProperties/:id': getOneAssetTypeProperties,
  getEngineeringUnitNamesByIDs
};
