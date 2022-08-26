import {
  PlusOutlined,
  DeleteOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  ImportOutlined,
  ExportOutlined,
  DownOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Col, Row, Button, Input, Dropdown, Menu, Typography, Space } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest, useIntl, FormattedMessage } from 'umi';
import React, { useEffect, useState } from 'react';
import Tree from './components/Tree';
import Table from './components/Table';
import styles from './index.less';

const { Search } = Input;

const AssetType: React.FC = () => {
  const [viewType, setViewType] = useState<string>('table');

  const onSearch = (value: string) => console.log(value);
  const changeViewType: MenuProps['onClick'] = (e) => {
    setViewType(e.key);
    console.log(viewType);
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
  const newAssetTypeMenu = (
    <Menu
      selectable
      defaultSelectedKeys={['new']}
      items={[
        {
          key: 'new',
          label: useIntl().formatMessage({
            id: 'pages.topNavbar.operation.new',
            defaultMessage: '新增',
          }),
          onClick: () => {
            console.log('新增');
          },
        },
        {
          key: 'newSmartDevice',
          label: useIntl().formatMessage({
            id: 'pages.topNavbar.operation.new.menu.smartDevice',
            defaultMessage: '新增智能设备',
          }),
          onClick: () => {
            console.log('新增智能设备');
          },
        },
        {
          key: 'newDataSource',
          label: useIntl().formatMessage({
            id: 'pages.topNavbar.operation.new.menu.dataSource',
            defaultMessage: '新增数据源',
          }),
          onClick: () => {
            console.log('新增数据源');
          },
        },
      ]}
    ></Menu>
  );
  return (
    <PageContainer title={false}>
      <>
        <Row>
          <Col span={8}>
            <Dropdown overlay={newAssetTypeMenu}>
              <Button type="primary">
                <Space>
                  <PlusOutlined />
                  <FormattedMessage id="pages.topNavbar.operation.new" defaultMessage="新建" />
                  {/* <DownOutlined /> */}
                </Space>
              </Button>
            </Dropdown>
            <Button
              type="primary"
              icon={<DeleteOutlined />}
              className={styles.tabOperationButton}
              disabled
            >
              <FormattedMessage id="pages.topNavbar.operation.delete" defaultMessage="删除" />
            </Button>
            <Button type="primary" icon={<ImportOutlined />} className={styles.tabOperationButton}>
              <FormattedMessage id="pages.topNavbar.operation.import" defaultMessage="导入" />
            </Button>
            <Button type="primary" icon={<ExportOutlined />} className={styles.tabOperationButton}>
              <FormattedMessage id="pages.topNavbar.operation.export" defaultMessage="导出" />
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
                  {console.log(viewType)}
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
        {console.log(viewType)}
        {viewType !== 'tree' && <Table></Table>}
        {viewType !== 'table' && <Tree></Tree>}
      </>
    </PageContainer>
  );
};
export default AssetType;
