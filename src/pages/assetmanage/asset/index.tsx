import {
  PlusOutlined,
  DeleteOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  ImportOutlined,
  ExportOutlined,
} from '@ant-design/icons';
import { Button, Checkbox, Divider, Tabs, Dropdown, Menu, Space } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest,useIntl, FormattedMessage } from 'umi';
import React, { useEffect, useState } from 'react';
import AssetTree from './AssetTree';
import AssetTable from './AssetTable';
import type { AssetListItem } from './data.d';
import { getAssetList,getAssetTree } from './service';
import styles from './index.less'
const { TabPane } = Tabs;

const operations = (
  <>
    <Button type="primary" icon={<PlusOutlined />} className={styles.tabOperationButton}>
      <FormattedMessage
        id="pages.operation.new"
        defaultMessage="新建"
      />
    </Button>
    <Button type="primary" icon={<DeleteOutlined />} className={styles.tabOperationButton}>
      <FormattedMessage
        id="pages.operation.delete"
        defaultMessage="删除"
      />
    </Button>
    <Button type="primary" icon={<ImportOutlined />} className={styles.tabOperationButton}>
      <FormattedMessage
        id="pages.operation.import"
        defaultMessage="导入"
      />
    </Button>
    <Button type="primary" icon={<ExportOutlined />} className={styles.tabOperationButton}>
      <FormattedMessage
        id="pages.operation.export"
        defaultMessage="导出"
      />
    </Button>
    <Button type="primary" icon={<FullscreenOutlined />} className={styles.tabOperationButton}/>
  </>
);

const Asset: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string>('table');
  const [assetList, setAssetList] = useState<AssetListItem[]>([]);
  const [assetTree, setAssetTree] = useState<AssetListItem[]>([]);
  const tree = useRequest(getAssetTree).data
  const { data } = useRequest(getAssetList);
  // const { {tr } = useRequest(getAssetTree);
  console.log(useRequest(getAssetTree))
  useEffect(() => {
    setAssetList(data || []);
    setAssetTree(tree || []);
  }, [data,tree]);
  // console.log(data);
  console.log(assetTree);
  // console.log(assetList);

  return (
    <PageContainer title={false}>
      <Tabs
        tabBarExtraContent={operations}
        activeKey={activeKey}
      onChange={(_activeKey)=>{
        console.log(_activeKey);
        setActiveKey(_activeKey);
      }}>
        <TabPane
          tab={useIntl().formatMessage({
            id: 'pages.viewType.tree',
            defaultMessage: '树',
          })}
          key="tree"
        >
          {/* {assetTree={assetTree}} */}
          <AssetTree assetTree={assetTree}/>
        </TabPane>
        <TabPane
          tab={useIntl().formatMessage({
            id: 'pages.viewType.table',
            defaultMessage: '表格',
          })}
          key="table"
        >
          <AssetTable assetList={assetList} total={assetList.length}/>
        </TabPane>
      </Tabs>
    </PageContainer>
  );
};

export default Asset;
