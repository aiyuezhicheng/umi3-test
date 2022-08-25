import { Request, Response } from 'express';
import { AssetListItem } from './data.d';
let tree: AssetListItem[] = [
  {
    ID: 'asset000000001',
    Avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    Name: '资产001',
    Children: [{
      ID: 'asset000000001资产a001',
      Avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      Name: '资产a001',
      Children: undefined
    }, {
      ID: 'asset000000001资产a002',
      Avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      Name: '资产a002',
      Children: undefined
    }, {
      ID: 'asset000000001资产a003',
      Avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      Name: '资产a003',
      Children: undefined
    }, {
      ID: 'asset000000001资产a004',
      Avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      Name: '资产a004',
      Children: undefined
    }]
  },
  {
    ID: 'asset000000002',
    Avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
    Name: '资产002',
    Children: undefined
  },
  {
    ID: 'asset000000003',
    Avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
    Name: '资产003',
    Children: [{
      ID: 'asset000000003资产3a001',
      Avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      Name: '资产3a001',
      Children: undefined
    }, {
      ID: 'asset000000003资产3a002',
      Avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      Name: '资产3a002',
      Children: undefined
    }]
  },
  {
    ID: 'asset000000004',
    Avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
    Name: '资产003',
    Children: undefined
  },
  {
    ID: 'asset000000005',
    Avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    Name: '资产004',
    Children: undefined
  },
  {
    ID: 'asset000000006',
    Avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    Name: '资产005',
    Children: undefined
  },
  {
    ID: 'asset000000007',
    Avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    Name: '资产006',
    Children: undefined
  },
  {
    ID: 'asset000000008',
    Avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    Name: '资产007',
    Children: [{
      ID: 'asset000000008资产8a001',
      Avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      Name: '资产8a001',
      Children: [{
        ID: 'asset000000008资产8a002',
        Avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        Name: '资产8a002',
        Children: [{
          ID: 'asset000000008资产8a003',
          Avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
          Name: '资产8a003',
          Children: undefined
        }]
      }],
    }]
  },
  {
    ID: 'asset000000009',
    Avatar: '',
    Name: '资产008',
    Children: undefined

  },
  {
    ID: 'asset000000010',
    Avatar: '',
    Name: '资产009',
    Children: undefined
  },
  {
    ID: 'asset000000011',
    Avatar: '',
    Name: '资产0010',
    Children: undefined
  },
  {
    ID: 'asset000000012',
    Avatar: '',
    Name: '资产0011',
    Children: undefined
  }
]
const getAssetList = (req: Request, res: Response) => {
  const convertToList = function (_tree: AssetListItem[]) {
    let list: any = [];
    if (_tree && _tree.length > 0) {
      for (let i = 0; i < _tree.length; i++) {
        const oneNode: AssetListItem = _tree[i]
        if (oneNode.Children && oneNode.Children.length > 0) {
          let childList: AssetListItem[] = convertToList(oneNode.Children);
          // delete oneNode.Children;
          // if (oneNode.Children) {
          //   delete oneNode.Children;
          // }
          list.push(oneNode);
          list = list.concat(childList);
        } else {
          list.push(oneNode);
        }

      }
    }
    return list
  }
  res.json({
    data: convertToList(tree),
    success: true
  });
};

const getAssetTree = (req: Request, res: Response) => {
  res.json({
    data: tree,
    success: true
  });
};

export default {
  'GET /api/assetList': getAssetList,
  'GET /api/assetTree': getAssetTree
};
