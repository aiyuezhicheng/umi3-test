import { Table, Avatar, Image, Button, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { FormattedMessage } from 'umi';
import { AssetListItem } from './data.d';

const showEditOneAssetDlg = (oneAssetID: string | undefined) => {
  console.log(oneAssetID);
};

const deleteOneAsset = (oneAssetID: string | undefined) => {
  console.log(oneAssetID);
};
// const intl = useIntl();
const columns: ColumnsType<AssetListItem> = [
  {
    title: (
      <FormattedMessage
        id="pages.assetManage.asset.table.column-name.avatar"
        defaultMessage="资产图像"
      />
    ),
    dataIndex: 'Avatar',
    width: 150,
    render: (t) => (
      <Image
        src={t ? t : 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png'}
        width={60}
      />
    ),
  },
  {
    title: (
      <FormattedMessage
        id="pages.assetManage.asset.table.column-name.asset-name"
        defaultMessage="资产名称"
      />
    ),
    dataIndex: 'Name',
    width: 150,
  },
  {
    title: (
      <FormattedMessage
        id="pages.assetManage.asset.table.column-name.option"
        defaultMessage="操作"
      />
    ),
    dataIndex: 'Operation',
    render: (_, record) => (
      <>
        <Button type="link" onClick={(): void => showEditOneAssetDlg(record.ID)}>
          <FormattedMessage
            id="pages.assetManage.asset.table.btnOption.edit"
            defaultMessage="编辑"
          />
        </Button>
        <Popconfirm
          title={
            <FormattedMessage
              id="pages.assetManage.asset.table.btnOption.delete.dialog.title"
              defaultMessage="确认删除么?"
            />
          }
          onConfirm={() => deleteOneAsset(record.ID)}
          okText={
            <FormattedMessage
              id="pages.assetManage.asset.table.btnOption.delete.dialog.confirm"
              defaultMessage="确定"
            />
          }
          cancelText={
            <FormattedMessage
              id="pages.assetManage.asset.table.btnOption.delete.dialog.cancel"
              defaultMessage="取消"
            />
          }
        >
          <a>
            <FormattedMessage
              id="pages.assetManage.asset.table.btnOption.delete"
              defaultMessage="删除"
            />
          </a>
        </Popconfirm>
      </>
    ),
  },
];

export type AssetTableProps = {
  assetList?: AssetListItem[];
  total: number;
};
const AssetTable: React.FC<AssetTableProps> = (props) => {
  const { assetList, total } = props;
  console.log(assetList, total);
  return (
    <>
      <Table
        rowKey="ID"
        columns={columns}
        dataSource={assetList}
        pagination={{ pageSize: 5, total: total }}
      />
    </>
  );
};

export default AssetTable;