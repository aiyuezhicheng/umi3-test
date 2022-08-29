import { DownOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-table';
import { ProTable, TableDropdown } from '@ant-design/pro-table';
import { FooterToolbar } from '@ant-design/pro-layout';

import { Button, Tooltip, Image, Popconfirm } from 'antd';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'umi';
import { AssetTypeTreeItem } from '../data.d';
// import OneDetailAssetTypeDrawer from './OneDetailAssetTypeDrawer';
import props from '../../../../.umi/plugin-layout/layout/utils/getLayoutContent';




type AssetTypeTableProps = {
  assetTypeTree: AssetTypeTreeItem[] | undefined;
};
const convertToList = function (_tree: AssetTypeTreeItem[] | undefined) {
  let list: any = [];
  if (_tree && _tree.length > 0) {
    for (let i = 0; i < _tree.length; i++) {
      const oneNode: AssetTypeTreeItem = _tree[i];
      if (oneNode.ChildList && oneNode.ChildList.length > 0) {
        let childList: AssetTypeTreeItem[] = convertToList(oneNode.ChildList);
        if (oneNode.ChildList) {
          delete oneNode.ChildList;
        }
        list.push(oneNode);
        list = list.concat(childList);
      } else {
        list.push(oneNode);
      }
    }
  }
  return list;
};

const AssetTypeTable: React.FC<AssetTypeTableProps> = (props) => {
  const { assetTypeTree } = props;
  const [tableData, setTableData] = useState<AssetTypeTreeItem[]>([]);
  const [selectedRowsState, setSelectedRows] = useState<AssetTypeTreeItem[]>([]);


  useEffect(() => {
    setTableData(convertToList(assetTypeTree));
  }, [assetTypeTree]);
  console.log(tableData);

  const showEditOneAssetDlg = (oneAssetID: string | undefined,isCopy:boolean|undefined) => {
    console.log(oneAssetID);
    console.log(isCopy);
    // setDetailVisible(true);
  };

  const deleteOneAsset = (oneAssetID: string | undefined) => {
    console.log(oneAssetID);
  };

  const columns: ProColumns<AssetTypeTreeItem>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.assetManage.asset.table.column-name.avatar"
          defaultMessage="资产图像"
        />
      ),
      dataIndex: 'Avatar',
      width: 150,
      // render: (t) => (
      //   <Image
      //     src={t&&'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png'}
      //     width={60}
      //   />
      // ),
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
          <Button type="link" onClick={(): void => showEditOneAssetDlg(record.ID,false)}>
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
          <Button type="link" onClick={(): void => showEditOneAssetDlg(record.ID,true)}>
            <FormattedMessage
              id="pages.assetManage.asset.table.btnOption.copy"
              defaultMessage="拷贝"
            />
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <ProTable<AssetTypeTreeItem>
        dataSource={tableData}
        rowKey="ID"
        pagination={{
          showQuickJumper: true,
        }}
        columns={columns}
        search={false}
        dateFormatter="string"
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows)
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项

            </div>
          }
        >
          <Button
            onClick={async () => {
              // await handleRemove(selectedRowsState);
              setSelectedRows([]);
              // actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}
    </>
  );
};
export default AssetTypeTable;
// export default (<TableProps>) => {
//   return (
//     <ProTable<TableListItem>
//       dataSource={tableListDataSource}
//       rowKey="key"
//       pagination={{
//         showQuickJumper: true,
//       }}
//       columns={columns}
//       search={false}
//       dateFormatter="string"
//       headerTitle="表格标题"
//       toolBarRender={() => [
//         <Button key="show">查看日志</Button>,
//         <Button key="out">
//           导出数据
//           <DownOutlined />
//         </Button>,
//         <Button type="primary" key="primary">
//           创建应用
//         </Button>,
//       ]}
//     />
//   );
// };
