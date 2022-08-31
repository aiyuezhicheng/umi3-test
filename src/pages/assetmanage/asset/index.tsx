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
import OneDetailAssetDrawer from './components/OneDetailAssetDrawer';
import Table from './components/Table';
import TreeComponent from './components/Tree';
import {
  handleExportToExcel,
  requestFullScreen,
  exitFullScreen,
  isFullscreenElement,
} from '@/utils/common';
import styles from './index.less';
import { AssetTreeItem } from './data.d';
import { getAssetTree } from './service';

const { Search } = Input;
const Asset: React.FC = () => {
  const [viewType, setViewType] = useState<string>('table');
  const { loading, data: assetTree } = useRequest(getAssetTree);
  const [detailVisible, setDetailVisible] = useState(false);
  const [tree, setTreeData] = useState<AssetTreeItem[]>();
  const [tableData, setTableData] = useState<AssetTreeItem[]>([]);
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
  };
  const [detailParams, setDetailParams] = useState<detailDrawerPrams>({
    action: 'new',
    id: '',
  });

  const [checked, setChecked] = useState<string[]>([]);

  //搜索关键字
  const onSearch = (value: string) => {
    console.log(onSearch);
    setSearchKeyWords(value);
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
  const showDetailInfoDrawer = (action: string, id?: string) => {
    setDetailVisible(true);
    setDetailParams({ action: action, id });
  };
  const convertToList = function (_tree: AssetTreeItem[] | undefined) {
    let list: any = [];
    if (_tree && _tree.length > 0) {
      for (let i = 0; i < _tree.length; i++) {
        const oneNode: AssetTreeItem = _tree[i];
        if (oneNode.ChildList && oneNode.ChildList.length > 0) {
          let childList: AssetTreeItem[] = convertToList(oneNode.ChildList);
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
    setTableData(convertToList(assetTree));
    setTreeData(assetTree);
  }, [assetTree, searchKeyWords]);

  useEffect(() => {}, []);
  const deleteOneAsset = (oneAssetID: string) => {
    console.log(oneAssetID);
    message.success(
      <FormattedMessage id="pages.dialog.delete.success" defaultMessage="删除成功!" />,
    );
  };

  const handleCloseDrawer = (e: any) => {
    setDetailVisible(false);
  };

  // 导出
  const handleExport = () => {
    console.log(tableData);
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
    console.log(checked);
    const { confirm } = Modal;
    confirm({
      title: <FormattedMessage id="pages.deleteDialog.title" defaultMessage="确认删除么?" />,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        console.log('OK');
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

  const renderMainContent = () => {
    if (viewType == 'table') {
      return (
        <Table
          showDetailInfoDrawer={showDetailInfoDrawer}
          deleteOneAsset={deleteOneAsset}
          tableList={tableData}
          setChecked={setChecked}
          searchKeyWords={searchKeyWords}
        ></Table>
      );
    } else {
      return (
        <TreeComponent
          assetTree={tree!}
          setDetailVisible={setDetailVisible}
          setDetailParams={setDetailParams}
          setChecked={setChecked}
          deleteOneAsset={deleteOneAsset}
          searchKeyWords={searchKeyWords}
        ></TreeComponent>
      );
    }
  };
  return (
    <PageContainer title={false} loading={loading}>
      <div id="mainContainer" style={{ background: '#f0f2f5', height: '100%' }}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Row>
            <Col span={8}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                className={styles.tabOperationButton}
                onClick={()=>showDetailInfoDrawer('new')}
              > 
                <FormattedMessage id="pages.operation.new" defaultMessage="新增" />
              </Button>
              <Button
                type="primary"
                icon={<DeleteOutlined />}
                className={styles.tabOperationButton}
                disabled={checked.length == 0}
                onClick={handleBatchDelete}
              >
                <FormattedMessage id="pages.operation.delete" defaultMessage="删除" />
              </Button>
              {/* <Upload beforeUpload={beforeUpload}> */}
              <Button
                type="primary"
                icon={<UploadOutlined />}
                className={styles.tabOperationButton}
              >
                <FormattedMessage id="pages.operation.import" defaultMessage="导入" />
              </Button>
              {/* </Upload> */}
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                className={styles.tabOperationButton}
                onClick={handleExport}
              >
                <FormattedMessage id="pages.operation.export" defaultMessage="导出" />
              </Button>
            </Col>
            <Col span={8} offset={8}>
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
          {renderMainContent()}
        </Space>

        <OneDetailAssetDrawer
          visible={detailVisible}
          {...detailParams}
          onClose={handleCloseDrawer}
        />
      </div>
    </PageContainer>
  );
};
export default Asset;
