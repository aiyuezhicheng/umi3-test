import { Request, Response } from 'express';
import { AssetTypeTreeItem ,AssetTypeItem} from './data.d';



const getAssetTree = (req: Request, res: Response) => {
  const tree: AssetTypeTreeItem[] = [{
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
  },{
    ID: '003',
    Name: '资产类型003',
    EntityType: 13,
    ExProperty: '13',
    ChildList: []
  },{
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

const getOneAssetType = (req: Request, res: Response) =>{
  const tree: AssetTypeItem[] = [{
    ID: '001',
    Name: '资产类型001',
    Description: '资产类型001',
    SN: 0,
    ParentID:'0',
    RelatedMaterielIDList:'',
    Ext:'',
    Properties:[]
  }, {
    ID: '002',
    Name: '资产类型002',
    Description: '资产类型002',
    SN: 0,
    ParentID:'0',
    RelatedMaterielIDList:'',
    Ext:'',
    Properties:[]
  },{
    ID: '003',
    Name: '资产类型003',
    Description: '资产类型003',
    SN: 0,
    ParentID:'0',
    RelatedMaterielIDList:'',
    Ext:'',
    Properties:[]
  },{
    ID: '004',
    Name: '资产类型004',
    Description: '资产类型004',
    SN: 0,
    ParentID:'0',
    RelatedMaterielIDList:'',
    Ext:'',
    Properties:[]
  },{
    ID: '002-001',
    Name: '资产类型002下的001',
    Description: '资产类型002下的001',
    SN: 0,
    ParentID:'002',
    RelatedMaterielIDList:'',
    Ext:'',
    Properties:[]
  }, {
    ID: '002-002',
    Name: '资产类型002下的002',
    Description: '资产类型002下的002',
    SN: 0,
    ParentID:'002',
    RelatedMaterielIDList:'',
    Ext:'',
    Properties:[]
  }, {
    ID: '002-003',
    Name: '资产类型002下的003',
    Description: '资产类型002下的003',
    SN: 0,
    ParentID:'002',
    RelatedMaterielIDList:'',
    Ext:'',
    Properties:[]
  },{
    ID: '002-001-001',
    Name: '资产类型002下001的001',
    Description: '资产类型002下001的001',
    SN: 0,
    ParentID:'002-001',
    RelatedMaterielIDList:'',
    Ext:'',
    Properties:[]
  }, {
    ID: '002-002',
    Name: '资产类型002下的002',
    Description: '资产类型002下的002',
    SN: 0,
    ParentID:'002-002',
    RelatedMaterielIDList:'',
    Ext:'',
    Properties:[]
  },{
    ID: '002-003-001',
    Name: '资产类型002下003的001',
    Description: '资产类型002下003的001',
    SN: 0,
    ParentID:'002-003',
    RelatedMaterielIDList:'',
    Ext:'',
    Properties:[]
  },{
    ID: '002-001-002',
    Name: '资产类型002下001的002',
    Description: '资产类型002下001的002',
    SN: 0,
    ParentID:'002-001',
    RelatedMaterielIDList:'',
    Ext:'',
    Properties:[]
  }];
  res.json({
    data: tree,
    success: true
  });
}

export default {
  'GET /api/AssetTypeTree': getAssetTree,
  'GET /api/OneAssetType': getOneAssetType
};
