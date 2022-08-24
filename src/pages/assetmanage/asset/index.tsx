import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Row, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { useModel, useRequest, useIntl } from 'umi';
import { getAssetList } from './service';
import type { AssetListItem, TableListPagination } from './data';

const { TabPane } = Tabs;
const Asset: React.FC = () => {
  const panes: React.ReactNode[] = [];
  const [assetList, setAssetList] = useState<AssetListItem[]>([]);
  const { data } = useRequest(getAssetList);
  useEffect(() => {
    setAssetList(data || []);
  }, [data]);
  console.log(data);
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();
  const columns: ProColumns<AssetListItem>[] = [
    {
      title: intl.formatMessage({
        id: 'pages.assetManage.asset.table.column-name.avatar',
        defaultMessage: '资产图像',
      }),
      dataIndex: 'Avatar',
    },
    {
      title: intl.formatMessage({
        id: 'pages.assetManage.asset.table.column-name.asset-name',
        defaultMessage: '资产名称',
      }),
      dataIndex: 'Name',
      valueType: 'textarea',
    },
    {
      title: intl.formatMessage({
        id: 'pages.assetManage.asset.table.column-name.option',
        defaultMessage: '操作',
      }),
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          // onClick={() => {
          //   handleUpdateModalVisible(true);
          //   setCurrentRow(record);
          // }}
        >
          {intl.formatMessage({
            id: 'pages.assetManage.asset.table.option.config',
            defaultMessage: '配置',
          })}
        </a>,
      ],
    },
  ];
  return (
    <PageContainer title={false}>
      <div>资产</div>
      <ProTable<AssetListItem, TableListPagination>
        columns={columns}
        search={false}
        dataSource={assetList}
        // toolBarRender={() => [
        //   <Button
        //     type="primary"
        //     key="primary"
        //     // onClick={() => {
        //     //   handleModalVisible(true);
        //     // }}
        //   >
        //     <PlusOutlined>
        //       {intl.formatMessage({
        //         id: 'pages.assetManage.asset.table.toolbar.button.new',
        //         defaultMessage: '新建',
        //       })}
        //     </PlusOutlined>
        //   </Button>,
        // ]}
      ></ProTable>
    </PageContainer>
  );
};
export default Asset;
