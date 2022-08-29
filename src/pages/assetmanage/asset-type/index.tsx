import {
  PlusOutlined,
  DeleteOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  ImportOutlined,
  ExportOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { MenuProps, message } from 'antd';
import { Col, Row, Button, Input, Dropdown, Menu, Image, Space, Popconfirm } from 'antd';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import { ProTable, TableDropdown } from '@ant-design/pro-table';
import { useRequest, useIntl, FormattedMessage } from 'umi';
import React, { useEffect, useState } from 'react';

import OneDetailAssetTypeDrawer from './components/OneDetailAssetTypeDrawer';
import styles from './index.less';
import { AssetTypeTreeItem } from './data.d';
import { getAssetTypeTree } from './service';

const { Search } = Input;
const AssetType: React.FC = () => {
  const [viewType, setViewType] = useState<string>('table');
  const { loading, data: assetTypeTree } = useRequest(getAssetTypeTree);
  const [detailVisible, setDetailVisible] = useState(false);

  type detailDrawerPrams = {
    action: string,
    id?: string,
    newKey?: string
  }
  const [detailParams, setDetailParams] = useState<detailDrawerPrams>({ action: 'new', id: '', newKey: '' });

  const onSearch = (value: string) => console.log(value);
  const changeViewType: MenuProps['onClick'] = (e) => {
    setViewType(e.key);
  };
  const viewTypeList = [
    {
      key: 'table',
      label: useIntl().formatMessage({
        id: 'pages.topNavbar.operation.viewType.table',
        defaultMessage: '表格',
      }),
    },
    {
      key: 'tree',
      label: useIntl().formatMessage({
        id: 'pages.topNavbar.operation.viewType.tree',
        defaultMessage: '树',
      }),
    },
  ];
  const getViewTypeLabel = () => {
    const item = viewTypeList.find((viewTypeItem) => viewTypeItem.key == viewType);
    return item && item.label ? item.label : 'table';
  };
  const viewTypeMenu = (
    <Menu
      selectable
      defaultSelectedKeys={['table']}
      onClick={changeViewType}
      items={viewTypeList}
    ></Menu>
  );
  const showDetailInfoDrawer = (action: string, newKey?: string, id?: string) => {
    setDetailVisible(true);
    setDetailParams({ action: action, newKey, id });
  }
  const newAssetTypeMenu = (
    <Menu
      selectable
      defaultSelectedKeys={[]}
      items={[
        {
          key: 'new',
          label: useIntl().formatMessage({
            id: 'pages.operation.new',
            defaultMessage: '新增',
          }),
          onClick: (e) => {
            showDetailInfoDrawer('new')
          },
        },
        {
          key: 'newSmartDevice',
          label: useIntl().formatMessage({
            id: 'pages.assetManage.topNavbar.operation.new.menu.smartDevice',
            defaultMessage: '新增智能设备',
          }),
          onClick: (e) => {
            showDetailInfoDrawer('new', e.key)
          },
          children: [
            {
              key: 'smartLock',
              label: useIntl().formatMessage({
                id: 'pages.assetManage.topNavbar.operation.new.subMenu.smartLock',
                defaultMessage: '智能锁',
              })
            },
            {
              key: 'smartCar',
              label: useIntl().formatMessage({
                id: 'pages.assetManage.topNavbar.operation.new.subMenu.smartCar',
                defaultMessage: '智能车',
              })
            },
            {
              key: 'camera',
              label: useIntl().formatMessage({
                id: 'pages.assetManage.topNavbar.operation.new.subMenu.camera',
                defaultMessage: '摄像头',
              })
            },
            {
              key: 'cctv',
              label: useIntl().formatMessage({
                id: 'pages.assetManage.topNavbar.operation.new.subMenu.cctv',
                defaultMessage: 'CCTV',
              })
            },
            {
              key: 'inkBottle-yanhua',
              label: useIntl().formatMessage({
                id: 'pages.assetManage.topNavbar.operation.new.subMenu.inkBottle-yanhua',
                defaultMessage: '墨水瓶-研华',
              })
            },
            {
              key: 'inkBottle-zhikong',
              label: useIntl().formatMessage({
                id: 'pages.assetManage.topNavbar.operation.new.subMenu.inkBottle-zhikong',
                defaultMessage: '墨水瓶-智控',
              })
            },
          ],
        },
        {
          key: 'newDataSource',
          label: useIntl().formatMessage({
            id: 'pages.assetManage.topNavbar.operation.new.menu.dataSource',
            defaultMessage: '新增数据源',
          }),
          onClick: (e) => {
            showDetailInfoDrawer('new', e.key)
          },
          children: [
            {
              key: 'opcda',
              label: useIntl().formatMessage({
                id: 'pages.assetManage.topNavbar.operation.new.subMenu.opcda',
                defaultMessage: 'OPCDA',
              })
            }, {
              key: 'opcua',
              label: useIntl().formatMessage({
                id: 'pages.assetManage.topNavbar.operation.new.subMenu.opcua',
                defaultMessage: 'OPCUA',
              })
            }, {
              key: 'mqtt',
              label: useIntl().formatMessage({
                id: 'pages.assetManage.topNavbar.operation.new.subMenu.mqtt',
                defaultMessage: 'MQTT',
              })
            }]
        },
      ]}
    ></Menu>
  );
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
  const [tableData, setTableData] = useState<AssetTypeTreeItem[]>([]);
  const [selectedRowsState, setSelectedRows] = useState<AssetTypeTreeItem[]>([]);

  useEffect(() => {
    setTableData(convertToList(assetTypeTree));
  }, [assetTypeTree]);

  const deleteOneAsset = (oneAssetID: string | undefined) => {
    console.log(oneAssetID);
    message.success(<FormattedMessage
      id="pages.delete.success"
      defaultMessage="删除成功!"
    />)
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
      render: (t) => (
        <Image
          src='https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png'
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
          <Button type="link" onClick={(): void => showDetailInfoDrawer('edit', '', record.ID)}>
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
          <Button type="link" onClick={(): void => showDetailInfoDrawer('copy', '', record.ID)}>
            <FormattedMessage
              id="pages.assetManage.asset.table.btnOption.copy"
              defaultMessage="拷贝"
            />
          </Button>
        </>
      ),
    },
  ];
  const handleCloseDrawer = (e: any) => {
    console.log(e)
    setDetailVisible(false);
  }
  const renderMainContent = () => {
    if (viewType == 'table') {
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
                setSelectedRows(selectedRows);
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
    } else {
      return <h1>树</h1>;
    }
  };
  return (
    <PageContainer title={false} loading={loading}>
      <Row>
        <Col span={8}>
          <Dropdown overlay={newAssetTypeMenu}>
            <Button type="primary">
              <Space>
                <PlusOutlined />
                <FormattedMessage id="pages.operation.new" defaultMessage="新建" />
              </Space>
            </Button>
          </Dropdown>
          <Button
            type="primary"
            icon={<DeleteOutlined />}
            className={styles.tabOperationButton}
            disabled
          >
            <FormattedMessage id="pages.operation.delete" defaultMessage="删除" />
          </Button>
          <Button type="primary" icon={<ImportOutlined />} className={styles.tabOperationButton}>
            <FormattedMessage id="pages.operation.import" defaultMessage="导入" />
          </Button>
          <Button type="primary" icon={<ExportOutlined />} className={styles.tabOperationButton}>
            <FormattedMessage id="pages.operation.export" defaultMessage="导出" />
          </Button>
        </Col>
        <Col span={8} offset={8}>
          <Search
            placeholder={useIntl().formatMessage({
              id: 'pages.topNavbar.operation.viewType.search',
              defaultMessage: '搜索',
            })}
            onSearch={onSearch}
            style={{ width: 200 }}
          />
          <Dropdown overlay={viewTypeMenu}>
            <Button>
              <Space>
                {getViewTypeLabel()}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
          <Button
            type="primary"
            icon={<FullscreenOutlined />}
            className={styles.tabOperationButton}
          />
        </Col>
      </Row>
      {renderMainContent()}
      <OneDetailAssetTypeDrawer visible={detailVisible} {...detailParams} onClose={handleCloseDrawer} />
    </PageContainer>
  );
};
export default AssetType;
