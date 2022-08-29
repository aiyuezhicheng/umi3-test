import { Request, Response } from 'express';
import { AssetTypeTreeItem, AssetTypeItem, MaterialItem } from './data.d';



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
    '001':'',
    '002':'',
    '003':'',
    '004':'',
    '002-001':'002',
    '002-001-001':'002-001',
    '002-001-002':'002-001',
    '002-001-001-001':'002-001-001',
    '002-002':'002',
    '002-003':'002',
    '002-003-001':'002-003',
  }
  let obj= {};
  console.log('id=' + id)
  let item = treeList.find(item=>item.ID == id)
  obj = {...item}
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


export default {
  'GET /api/AssetTypeTree': getAssetTree,
  'GET /api/OneAssetType/:id': getOneAssetType,
  'GET /api/getMaterialList': getMaterialList
};
