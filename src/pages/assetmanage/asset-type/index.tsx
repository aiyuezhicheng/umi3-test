import {
  PlusOutlined,
  DeleteOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  UploadOutlined,
  DownloadOutlined,
  DownOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import {
  Col,
  Row,
  Button,
  Input,
  Dropdown,
  Menu,
  Space,
  message,
  Upload,
  Modal,
  Image,
  Popconfirm,
} from 'antd';
import { ProTable } from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import type { MenuProps, UploadProps } from 'antd';
import { useIntl, FormattedMessage, useModel } from 'umi';

import React, { useEffect, useState } from 'react';
import OneDetailAssetTypeDrawer from './components/OneDetailAssetTypeDrawer';
import TreeComponent from './components/Tree';
import {
  handleExportToExcel,
  requestFullScreen,
  exitFullScreen,
  isFullscreenElement,
  FindOneByIDInTree,
  ConvertToList,
} from '@/utils/common';
import styles from './index.less';
const { Search } = Input;

type detailDrawerPrams = {
  action: string;
  id?: string;
  newKey?: string;
};

const AssetType: React.FC = () => {
  const { loading, tree, list, queryAssetTypeTree, deleteOne, batchDelete } = useModel('assetType');
  const [viewType, setViewType] = useState<string>('table');
  const [detailDrawerVisible, setDetailInfoVisible] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [searchKeyWords, setSearchKeyWords] = useState<string>('');
  const [detailParams, setDetailParams] = useState<detailDrawerPrams>({
    action: 'new',
    id: '',
    newKey: '',
  });
  const [checked, setChecked] = useState<string[]>([]);
  const intl = useIntl();

  useEffect(() => {
    queryAssetTypeTree();
  }, [queryAssetTypeTree]);

  useEffect(() => {
    const onEscCancelFull = () => {
      setFullScreen(isFullscreenElement());
    };
    // 监听 键盘ESC 退出全屏(可以使用屏幕大小监听，触发对应的事件)
    if (window.addEventListener) {
      window.addEventListener('resize', onEscCancelFull, false);
    } else {
      window.onresize = onEscCancelFull;
    }
    // 销毁清除事件
    return () => {
      if (window.removeEventListener) {
        window.removeEventListener('resize', onEscCancelFull, false);
      }
    };
  }, []);

  const viewTypeList = [
    {
      key: 'table',
      label: intl.formatMessage({
        id: 'pages.viewType.table',
        defaultMessage: '表格',
      }),
    },
    {
      key: 'tree',
      label: intl.formatMessage({
        id: 'pages.viewType.tree',
        defaultMessage: '树',
      }),
    },
  ];

  const getViewTypeLabel = () => {
    const item = viewTypeList.find((viewTypeItem) => viewTypeItem.key == viewType);
    return item && item.label ? item.label : 'table';
  };

  // 切换视图
  const handleChangeViewType: MenuProps['onClick'] = (e) => {
    setViewType(e.key);
  };

  const showDetailInfoDrawer = (action: string, newKey?: string, id?: string) => {
    setDetailInfoVisible(true);
    setDetailParams({ action: action, newKey, id });
  };

  const handleCloseDrawer = (e: any) => {
    setDetailInfoVisible(false);
  };
  //搜索关键字
  const onSearch = (value: string) => {
    setSearchKeyWords(value);
    // 调用接口
    if (viewType == 'table') {
    } else {
    }
  };

  const newAssetTypeMenu = (
    <Menu
      selectable
      defaultSelectedKeys={[]}
      items={[
        {
          key: 'new',
          label: intl.formatMessage({
            id: 'pages.operation.new',
            defaultMessage: '新增',
          }),
          onClick: (e) => {
            showDetailInfoDrawer('new');
          },
        },
        {
          key: 'newSmartDevice',
          label: intl.formatMessage({
            id: 'pages.assetType.new.menu.smartDevice',
            defaultMessage: '新增智能设备',
          }),
          onClick: (e) => {
            showDetailInfoDrawer('new', e.key);
          },
          children: [
            {
              key: 'smartLock',
              label: intl.formatMessage({
                id: 'pages.assetType.new.subMenu.smartLock',
                defaultMessage: '智能锁',
              }),
            },
            {
              key: 'smartCar',
              label: intl.formatMessage({
                id: 'pages.assetType.new.subMenu.smartCar',
                defaultMessage: '智能车',
              }),
            },
            {
              key: 'camera',
              label: intl.formatMessage({
                id: 'pages.assetType.new.subMenu.camera',
                defaultMessage: '摄像头',
              }),
            },
            {
              key: 'cctv',
              label: intl.formatMessage({
                id: 'pages.assetType.new.subMenu.cctv',
                defaultMessage: 'CCTV',
              }),
            },
            {
              key: 'inkBottle-yanhua',
              label: intl.formatMessage({
                id: 'pages.assetType.new.subMenu.inkBottle-yanhua',
                defaultMessage: '墨水瓶-研华',
              }),
            },
            {
              key: 'inkBottle-zhikong',
              label: intl.formatMessage({
                id: 'pages.assetType.new.subMenu.inkBottle-zhikong',
                defaultMessage: '墨水瓶-智控',
              }),
            },
          ],
        },
        {
          key: 'newDataSource',
          label: intl.formatMessage({
            id: 'pages.assetType.new.menu.dataSource',
            defaultMessage: '新增数据源',
          }),
          onClick: (e) => {
            showDetailInfoDrawer('new', e.key);
          },
          children: [
            {
              key: 'opcda',
              label: intl.formatMessage({
                id: 'pages.assetType.new.subMenu.opcda',
                defaultMessage: 'OPCDA',
              }),
            },
            {
              key: 'opcua',
              label: intl.formatMessage({
                id: 'pages.assetType.new.subMenu.opcua',
                defaultMessage: 'OPCUA',
              }),
            },
            {
              key: 'mqtt',
              label: intl.formatMessage({
                id: 'pages.assetType.new.subMenu.mqtt',
                defaultMessage: 'MQTT',
              }),
            },
          ],
        },
      ]}
    ></Menu>
  );

  // // 导出
  // const handleExport = () => {
  //   const fileName = intl.formatMessage({
  //     id: 'menu.assetManage.asset-type',
  //     defaultMessage: '资产类别',
  //   });
  //   const datas = [
  //     {
  //       sheetFilter: ['ID', 'Name'],
  //       sheetHeader: ['ID', '名称'],
  //       sheetData: tableData,
  //     },
  //   ];
  //   handleExportToExcel(fileName, datas);
  // };
  // // 上传
  // const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  //   console.log(file);
  // };

  // 批量删除
  const handleBatchDelete = () => {
    const { confirm } = Modal;
    confirm({
      title: <FormattedMessage id="pages.deleteDialog.title" defaultMessage="确认删除么?" />,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        batchDelete(checked);
        // message.success(
        //   <FormattedMessage id="pages.dialog.delete.success" defaultMessage="删除成功!" />,
        // );
        // setChecked([]);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  // 处理删除一个资产类别
  const handleDeleteOneAssetType = (node: API.IMAssetType) => {
    if (node.ChildList && node.ChildList.length > 0) {
      const needDeleteList = ConvertToList([node]).map((item: { ID: string }) => item.ID);
      batchDelete(needDeleteList);
    } else {
      deleteOne({ id: node.ID as string }).then((result) => {
        if (result.IsOk) {
          message.success(
            <FormattedMessage id="pages.dialog.delete.success" defaultMessage="删除成功" />,
          );
        } else {
          message.error(
            <>
              <FormattedMessage
                id="pages.message.delete.errorReason"
                defaultMessage="删除失败的原因为："
              />
              {result.ErrorMsg}
            </>,
          );
        }
      });
    }
  };

  // 表格列
  const columns: ProColumns<API.IMAssetType>[] = [
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
            title={
              <>
                <FormattedMessage id="pages.deleteDialog.title" defaultMessage="确认删除么?" />
                {record!.ChildList && record!.ChildList.length > 0 && (
                  <FormattedMessage
                    id="pages.message.includeAllChildren"
                    defaultMessage="(包含所有子节点)"
                  />
                )}
              </>
            }
            onConfirm={() => handleDeleteOneAssetType(record)}
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
          <Button
            type="link"
            onClick={(): void => showDetailInfoDrawer('verification', '', record.ID)}
          >
            <FormattedMessage id="pages.operation.verification" defaultMessage="验证" />
          </Button>
        </>
      ),
    },
  ];
  return (
    <PageContainer title={false}>
      <div id="mainContainer" style={{ background: '#f0f2f5', height: '100%' }}>
        {/* 工具栏 */}
        <Row justify="space-between">
          <Col>
            <Dropdown overlay={newAssetTypeMenu}>
              <Button type="primary">
                <Space>
                  <PlusOutlined />
                  <FormattedMessage id="pages.operation.new" defaultMessage="新建" />
                </Space>
              </Button>
            </Dropdown>
            <Button
              className={styles.tabOperationButton}
              disabled={checked.length == 0}
              onClick={handleBatchDelete}
            >
              <Space>
                <DeleteOutlined />
                <FormattedMessage id="pages.operation.delete" defaultMessage="删除" />
              </Space>
            </Button>
            <Button className={styles.tabOperationButton}>
              <Space>
                <UploadOutlined />
                <FormattedMessage id="pages.operation.import" defaultMessage="导入" />
              </Space>
            </Button>
            {/* onClick={handleExport} */}
            <Button className={styles.tabOperationButton}>
              <Space>
                <DownloadOutlined />
                <FormattedMessage id="pages.operation.export" defaultMessage="导出" />
              </Space>
            </Button>
          </Col>
          <Col style={{ textAlign: 'right' }}>
            <Search
              placeholder={intl.formatMessage({
                id: 'pages.operation.search',
                defaultMessage: '搜索',
              })}
              onSearch={onSearch}
              allowClear
              style={{ width: 200 }}
            />
            <Dropdown
              overlay={
                <Menu
                  selectable
                  defaultSelectedKeys={['table']}
                  onClick={handleChangeViewType}
                  items={viewTypeList}
                ></Menu>
              }
            >
              <Button>
                <Space>
                  {getViewTypeLabel()}
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
            {fullScreen ? (
              <Button
                type="primary"
                icon={<FullscreenExitOutlined />}
                className={styles.tabOperationButton}
                onClick={() => {
                  exitFullScreen();
                }}
              />
            ) : (
              <Button
                type="primary"
                icon={<FullscreenOutlined />}
                className={styles.tabOperationButton}
                onClick={() => {
                  requestFullScreen(document.getElementById('mainContainer'));
                }}
              />
            )}
          </Col>
        </Row>

        {/* 主要视图 */}
        {viewType == 'table' && (
          <ProTable<API.IMAssetType>
            dataSource={list}
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
                const selected = selectedRows.map((item) => item.ID);
                setChecked(selected as string[]);
              },
            }}
            style={{ marginTop: '20px' }}
          />
        )}
        {viewType == 'tree' && (
          <TreeComponent
            assetTypeTree={tree}
            setDetailInfoVisible={setDetailInfoVisible}
            setDetailParams={setDetailParams}
            setChecked={setChecked}
            deleteOneAssetType={handleDeleteOneAssetType}
            searchKeyWords={searchKeyWords}
          ></TreeComponent>
        )}
        {/* 详细信息的抽屉 */}
        <OneDetailAssetTypeDrawer
          visible={detailDrawerVisible}
          {...detailParams}
          onClose={handleCloseDrawer}
        />
      </div>
    </PageContainer>
  );
};
export default AssetType;
