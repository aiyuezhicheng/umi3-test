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
import { Col, Row, Button, Input, Dropdown, Menu, Space, message, Upload, Modal } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import type { MenuProps, UploadProps } from 'antd';
import { useRequest, useIntl, FormattedMessage } from 'umi';

import React, { useEffect, useState } from 'react';
import OneDetailAssetTypeDrawer from './components/OneDetailAssetTypeDrawer';
import Table from './components/Table';
import TreeComponent from './components/Tree';
import {
  handleExportToExcel,
  requestFullScreen,
  exitFullScreen,
  isFullscreenElement,
} from '@/utils/common';
import styles from './index.less';
import { AssetTypeTreeItem } from './data.d';
import { getAssetTypeTree } from './service';

const { Search } = Input;
const AssetType: React.FC = () => {
  const [viewType, setViewType] = useState<string>('table');
  const { loading, data: assetTypeTree } = useRequest(getAssetTypeTree);
  const [detailVisible, setDetailVisible] = useState(false);
  const [tree, setTreeData] = useState<AssetTypeTreeItem[]>();
  const [tableData, setTableData] = useState<AssetTypeTreeItem[]>([]);
  const [fullScreen, setFullScreen] = useState(false);
  const [searchKeyWords, setSearchKeyWords] = useState<string>('');
  // const [originResizeFunc, setOriginResizeFunc] = useState<any>(null);

  useEffect(() => {
    // 监听 键盘ESC 退出全屏(可以使用屏幕大小监听，触发对应的事件)
    if (window.addEventListener) {
      window.addEventListener('resize', onEscCancelFull, false);
    } else {
      // setOriginResizeFunc(window.onresize);
      window.onresize = onEscCancelFull;
    }
    // 销毁清除事件
    return () => {
      if (window.removeEventListener) {
        window.removeEventListener('resize', onEscCancelFull, false);
        // } else {
        //   window.onresize = originResizeFunc;
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  function onEscCancelFull() {
    // 用于反显状态
    setFullScreen(isFullscreenElement());
  }

  type detailDrawerPrams = {
    action: string;
    id?: string;
    newKey?: string;
  };
  const [detailParams, setDetailParams] = useState<detailDrawerPrams>({
    action: 'new',
    id: '',
    newKey: '',
  });

  const [checked, setChecked] = useState<string[]>([]);

  //搜索关键字
  const onSearch = (value: string) => {
    setSearchKeyWords(value);
    // 调用接口
    if (viewType == 'table') {
    } else {
    }
  };
  // 切换视图
  const changeViewType: MenuProps['onClick'] = (e) => {
    setViewType(e.key);
  };
  const intl = useIntl();

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
  const convertToList = function (_tree: AssetTypeTreeItem[] | undefined) {
    let list: any = [];
    if (_tree && _tree.length > 0) {
      for (let i = 0; i < _tree.length; i++) {
        const oneNode: AssetTypeTreeItem = _tree[i];
        if (oneNode.ChildList && oneNode.ChildList.length > 0) {
          let childList: AssetTypeTreeItem[] = convertToList(oneNode.ChildList);
          // if (oneNode.ChildList) {
          //   delete oneNode.ChildList;
          // }
          list.push(oneNode);
          list = list.concat(childList);
        } else {
          list.push(oneNode);
        }
      }
    }
    return list;
  };

  useEffect(() => {
    setTableData(convertToList(assetTypeTree));
    setTreeData(assetTypeTree);
  }, [assetTypeTree, searchKeyWords]);

  useEffect(() => { }, []);
  const deleteOneAsset = (oneAssetID: string) => {
    message.success(
      <FormattedMessage id="pages.dialog.delete.success" defaultMessage="删除成功!" />,
    );
  };

  const handleCloseDrawer = (e: any) => {
    setDetailVisible(false);
  };

  // 导出
  const handleExport = () => {
    const fileName = intl.formatMessage({
      id: 'menu.assetManage.asset-type',
      defaultMessage: '资产类别',
    });
    const datas = [
      {
        sheetFilter: ['ID', 'Name'],
        sheetHeader: ['ID', '名称'],
        sheetData: tableData,
      },
    ];
    handleExportToExcel(fileName, datas);
  };
  // 上传
  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    console.log(file);
  };

  // 批量删除
  const handleBatchDelete = () => {
    const { confirm } = Modal;
    confirm({
      title: <FormattedMessage id="pages.deleteDialog.title" defaultMessage="确认删除么?" />,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        message.success(
          <FormattedMessage id="pages.dialog.delete.success" defaultMessage="删除成功!" />,
        );
        setChecked([]);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  return (
    <PageContainer title={false} loading={loading}>
      <div id="mainContainer" style={{ background: '#f0f2f5', height: '100%' }}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
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
                className={styles.tabOperationButton}
                disabled={checked.length == 0}
                onClick={handleBatchDelete}
              >
                <Space>
                  <DeleteOutlined />
                  <FormattedMessage id="pages.operation.delete" defaultMessage="删除" />
                </Space>
              </Button>
              <Button
                className={styles.tabOperationButton}
              >
                <Space>
                  <UploadOutlined />
                  <FormattedMessage id="pages.operation.import" defaultMessage="导入" />
                </Space>
              </Button>
              <Button
                className={styles.tabOperationButton}
                onClick={handleExport}
              >
                <Space>
                  <DownloadOutlined />
                  <FormattedMessage id="pages.operation.export" defaultMessage="导出" />
                </Space>
              </Button>
            </Col>
            <Col span={8} offset={8} style={{ textAlign: 'right' }}>
              <Search
                placeholder={intl.formatMessage({
                  id: 'pages.operation.search',
                  defaultMessage: '搜索',
                })}
                onSearch={onSearch}
                allowClear
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
          {viewType == 'table' && (<Table
            showDetailInfoDrawer={showDetailInfoDrawer}
            deleteOneAsset={deleteOneAsset}
            tableList={tableData}
            setChecked={setChecked}
            searchKeyWords={searchKeyWords}
          ></Table>)}
          {viewType == 'tree' && (<TreeComponent
            assetTypeTree={tree!}
            setDetailVisible={setDetailVisible}
            setDetailParams={setDetailParams}
            setChecked={setChecked}
            deleteOneAsset={deleteOneAsset}
            searchKeyWords={searchKeyWords}
          ></TreeComponent>)}
        </Space>

        <OneDetailAssetTypeDrawer
          visible={detailVisible}
          {...detailParams}
          onClose={handleCloseDrawer}
        />
      </div>
    </PageContainer>
  );
};
export default AssetType;
