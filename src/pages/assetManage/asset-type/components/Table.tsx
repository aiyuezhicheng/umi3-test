import { Button, Image, Popconfirm } from 'antd';
import { FooterToolbar } from '@ant-design/pro-layout';
import { ProTable } from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { FormattedMessage } from 'umi';
import React, { useEffect, useState } from 'react';
import { AssetTypeTreeItem } from '../data.d';

type TableProps = {
  showDetailInfoDrawer: (action: string, newKey?: string, id?: string) => void;
  deleteOneAsset: (oneAssetID: string) => void;
  tableList: AssetTypeTreeItem[];
  setChecked: (list: string[]) => void;
  searchKeyWords: string;
};

const Table: React.FC<TableProps> = (props) => {
  const { showDetailInfoDrawer, deleteOneAsset, tableList, setChecked, searchKeyWords } = props;
  const [tableData, setTableData] = useState<AssetTypeTreeItem[]>([]);
  // const [selectedRowsState, setSelectedRows] = useState<AssetTypeTreeItem[]>([]);

  useEffect(() => {
    if (searchKeyWords) {
      const newTableList = tableList.filter((item: AssetTypeTreeItem) =>
        item.Name.includes(searchKeyWords),
      );
      setTableData(newTableList);
    } else {
      setTableData(tableList);
    }
  }, [tableList, searchKeyWords]);

  const columns: ProColumns<AssetTypeTreeItem>[] = [
    {
      title: <FormattedMessage id="pages.table.columnName.avatar" defaultMessage="图像" />,
      dataIndex: 'Avatar',
      width: 150,
      render: (t) => (
        <Image
          src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"
          width={40}
        />
      ),
    },
    {
      title: <FormattedMessage id="pages.table.columnName.name" defaultMessage="名称" />,
      dataIndex: 'Name',
      width: 150,
    },
    {
      title: <FormattedMessage id="pages.table.columnName.operation" defaultMessage="操作" />,
      dataIndex: 'Operation',
      render: (_, record) => (
        <>
          <Button type="link" onClick={(): void => showDetailInfoDrawer('edit', '', record.ID)}>
            <FormattedMessage id="pages.operation.edit" defaultMessage="编辑" />
          </Button>
          <Popconfirm
            title={<FormattedMessage id="pages.deleteDialog.title" defaultMessage="确认删除么?" />}
            onConfirm={() => deleteOneAsset(record.ID)}
            okText={<FormattedMessage id="pages.operation.confirm'" defaultMessage="确定" />}
            cancelText={<FormattedMessage id="pages.operation.cancel" defaultMessage="取消" />}
          >
            <a>
              <FormattedMessage id="pages.operation.delete" defaultMessage="删除" />
            </a>
          </Popconfirm>
          <Button type="link" onClick={(): void => showDetailInfoDrawer('copy', '', record.ID)}>
            <FormattedMessage id="pages.operation.copy" defaultMessage="拷贝" />
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
          pageSize: 5,
        }}
        columns={columns}
        search={false}
        dateFormatter="string"
        rowSelection={{
          onChange: (_, selectedRows) => {
            console.log(selectedRows);
            // setSelectedRows(selectedRows);
            const selected = selectedRows.map((item) => item.ID);
            setChecked(selected);
          },
        }}
      />
      {/* {selectedRowsState?.length > 0 && (
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
      )} */}
    </>
  );
};
export default Table;
