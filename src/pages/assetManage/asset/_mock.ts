import { Request, Response } from 'express';
import { AssetTreeItem, MaterialItem } from './data.d';



const getAssetTree = (req: Request, res: Response) => {
  const tree: AssetTreeItem[] = [{
    ID: '001',
    Name: '资产001',
    EntityType: 13,
    ExProperty: '13',
    ChildList: [],
  }, {
    ID: '002',
    Name: '资产002',
    EntityType: 13,
    ExProperty: '13',
    ChildList: [{
      ID: '002-001',
      Name: '资产002下的001',
      EntityType: 13,
      ExProperty: '13',
      ChildList: [{
        ID: '002-001-001',
        Name: '资产002下001的001',
        EntityType: 13,
        ExProperty: '13',
        ChildList: [{
          ID: '002-001-001-001',
          Name: '资产002下001的002',
          EntityType: 13,
          ExProperty: '13',
          ChildList: []
        }]
      }, {
        ID: '002-001-002',
        Name: '资产002下001的002',
        EntityType: 13,
        ExProperty: '13',
        ChildList: []
      }]
    }, {
      ID: '002-002',
      Name: '资产002下的002',
      EntityType: 13,
      ExProperty: '13',
      ChildList: []
    }, {
      ID: '002-003',
      Name: '资产002下的003',
      EntityType: 13,
      ExProperty: '13',
      ChildList: [{
        ID: '002-003-001',
        Name: '资产002下003的001',
        EntityType: 13,
        ExProperty: '13',
        ChildList: []
      }]
    }]
  }, {
    ID: '003',
    Name: '资产003',
    EntityType: 13,
    ExProperty: '13',
    ChildList: []
  }, {
    ID: '004',
    Name: '资产004',
    EntityType: 13,
    ExProperty: '13',
    ChildList: []
  }];

  res.json({
    data: tree,
    success: true
  });
};

const getOneAsset = (req: Request, res: Response) => {
  const id = req.params.id;
  const treeList: AssetTreeItem[] = [{
    ID: '001',
    Name: '资产001',
    EntityType: 13,
    ExProperty: '13',
    ChildList: []
  }, {
    ID: '002',
    Name: '资产002',
    EntityType: 13,
    ExProperty: '13',
    ChildList: []
  }, {
    ID: '002-002',
    Name: '资产002下的002',
    EntityType: 13,
    ExProperty: '13',
    ChildList: []
  }, {
    ID: '002-003',
    Name: '资产002下的003',
    EntityType: 13,
    ExProperty: '13',
    ChildList: []
  }, {
    ID: '002-003-001',
    Name: '资产002下003的001',
    EntityType: 13,
    ExProperty: '13',
    ChildList: []
  }, {
    ID: '002-001',
    Name: '资产002下的001',
    EntityType: 13,
    ExProperty: '13',
    ChildList: []
  },
  {
    ID: '002-001-001',
    Name: '资产002下001的001',
    EntityType: 13,
    ExProperty: '13',
    ChildList: []
  }, {
    ID: '002-001-001-001',
    Name: '资产002下001的002',
    EntityType: 13,
    ExProperty: '13',
    ChildList: []
  }, {
    ID: '002-001-002',
    Name: '资产002下001的002',
    EntityType: 13,
    ExProperty: '13',
    ChildList: []
  }, {
    ID: '003',
    Name: '资产003',
    EntityType: 13,
    ExProperty: '13',
    ChildList: []
  }, {
    ID: '004',
    Name: '资产004',
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
  obj['Mark'] = obj['Name'] + '-资产号';
  obj['IsPosition'] = true;
  obj['IsEnabledScan'] = true;
  obj['NoSenseUnlockAccuracy'] = 28;
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


export default {
  'GET /api/AssetTree': getAssetTree,
  'GET /api/OneAsset/:id': getOneAsset,
  'GET /api/getMaterialList': getMaterialList
};
