import { Request, Response } from 'express';

const getAssetList = (req: Request, res: Response) => {
  res.json({
    data: [
      {
        ID: 'asset000000001',
        Avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        Name: '资产001'
      },
      {
        ID: 'asset000000002',
        Avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
        Name: '资产002'
      },
      {
        ID: 'asset000000003',
        Avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
        Name: '资产003'
      },
      {
        ID: 'asset000000004',
        Avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        Name: '资产003',
      },
      {
        ID: 'asset000000005',
        Avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        Name: '资产004',
      },
      {
        ID: 'asset000000006',
        Avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        Name: '资产005',
      },
      {
        ID: 'asset000000007',
        Avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        Name: '资产006',
      },
      {
        ID: 'asset000000008',
        Avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        Name: '资产007',
      },
      {
        ID: 'asset000000009',
        Avatar: '',
        Name: '资产008',

      },
      {
        ID: 'asset000000010',
        Avatar: '',
        Name: '资产009',

      },
      {
        ID: 'asset000000011',
        Avatar: '',
        Name: '资产0010',
      },
      {
        ID: 'asset000000012',
        Avatar: '',
        Name: '资产0011',
      },
    ],
  });
};

export default {
  'GET /api/assetList': getAssetList,
};
