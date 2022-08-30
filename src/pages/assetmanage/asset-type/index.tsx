import {
  PlusOutlined,
  DeleteOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  ImportOutlined,
  ExportOutlined,
  DownOutlined,
  EditOutlined,
  CopyOutlined,
  ScissorOutlined,
  DownSquareOutlined,
  UpSquareOutlined,
  VerticalAlignMiddleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';
import {
  Col,
  Row,
  Button,
  Input,
  Dropdown,
  Menu,
  Image,
  Space,
  Popconfirm,
  Tree,
  // MenuProps,
  message,
  List,
} from 'antd';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import type { DataNode, TreeProps } from 'antd/es/tree';
import type { MenuProps } from 'antd';
import { ProTable, TableDropdown } from '@ant-design/pro-table';
import { useRequest, useIntl, FormattedMessage } from 'umi';
import React, { useEffect, useState } from 'react';

import OneDetailAssetTypeDrawer from './components/OneDetailAssetTypeDrawer';
import styles from './index.less';
import { AssetTypeTreeItem } from './data.d';
import { getAssetTypeTree } from './service';
import AssetTree from '../asset/AssetTree';
import access from '../../../access';

const { Search } = Input;
const AssetType: React.FC = () => {
  const [viewType, setViewType] = useState<string>('table');
  const { loading, data: assetTypeTree } = useRequest(getAssetTypeTree);
  const [detailVisible, setDetailVisible] = useState(false);
  const [tree, setTreeData] = useState<AssetTypeTreeItem[]>();
  const [oneCutedTreeNode, setOneCutedTreeNode] = useState<AssetTypeTreeItem | undefined>();
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [rightClickMenuVisible, setRightClickMenuVisible] = useState<boolean>(false);
  const [checked, setChecked] = useState<string[]>([]);

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
  type rightClickTreeNodeMenuInfoParams = {
    pageX: number;
    pageY: number;
    id: string;
    curTreeNode?: AssetTypeTreeItem;
    parent?: any;
    index?: number;
    tree?: AssetTypeTreeItem[];
  };
  const [rightClickTreeNodeMenuInfo, setRightClickTreeNodeMenuInfo] =
    useState<rightClickTreeNodeMenuInfoParams>({
      pageX: 0,
      pageY: 0,
      id: '',
    });
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
  };
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
            showDetailInfoDrawer('new');
          },
        },
        {
          key: 'newSmartDevice',
          label: useIntl().formatMessage({
            id: 'pages.assetManage.topNavbar.operation.new.menu.smartDevice',
            defaultMessage: '新增智能设备',
          }),
          onClick: (e) => {
            showDetailInfoDrawer('new', e.key);
          },
          children: [
            {
              key: 'smartLock',
              label: useIntl().formatMessage({
                id: 'pages.assetManage.topNavbar.operation.new.subMenu.smartLock',
                defaultMessage: '智能锁',
              }),
            },
            {
              key: 'smartCar',
              label: useIntl().formatMessage({
                id: 'pages.assetManage.topNavbar.operation.new.subMenu.smartCar',
                defaultMessage: '智能车',
              }),
            },
            {
              key: 'camera',
              label: useIntl().formatMessage({
                id: 'pages.assetManage.topNavbar.operation.new.subMenu.camera',
                defaultMessage: '摄像头',
              }),
            },
            {
              key: 'cctv',
              label: useIntl().formatMessage({
                id: 'pages.assetManage.topNavbar.operation.new.subMenu.cctv',
                defaultMessage: 'CCTV',
              }),
            },
            {
              key: 'inkBottle-yanhua',
              label: useIntl().formatMessage({
                id: 'pages.assetManage.topNavbar.operation.new.subMenu.inkBottle-yanhua',
                defaultMessage: '墨水瓶-研华',
              }),
            },
            {
              key: 'inkBottle-zhikong',
              label: useIntl().formatMessage({
                id: 'pages.assetManage.topNavbar.operation.new.subMenu.inkBottle-zhikong',
                defaultMessage: '墨水瓶-智控',
              }),
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
            showDetailInfoDrawer('new', e.key);
          },
          children: [
            {
              key: 'opcda',
              label: useIntl().formatMessage({
                id: 'pages.assetManage.topNavbar.operation.new.subMenu.opcda',
                defaultMessage: 'OPCDA',
              }),
            },
            {
              key: 'opcua',
              label: useIntl().formatMessage({
                id: 'pages.assetManage.topNavbar.operation.new.subMenu.opcua',
                defaultMessage: 'OPCUA',
              }),
            },
            {
              key: 'mqtt',
              label: useIntl().formatMessage({
                id: 'pages.assetManage.topNavbar.operation.new.subMenu.mqtt',
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
  const [tableData, setTableData] = useState<AssetTypeTreeItem[]>([]);
  const [selectedRowsState, setSelectedRows] = useState<AssetTypeTreeItem[]>([]);

  useEffect(() => {
    setTableData(convertToList(assetTypeTree));
    setTreeData(assetTypeTree);
  }, [assetTypeTree]);

  const deleteOneAsset = (oneAssetID: string | undefined) => {
    console.log(oneAssetID);
    message.success(<FormattedMessage id="pages.delete.success" defaultMessage="删除成功!" />);
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
          src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"
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
    setDetailVisible(false);
  };
  const { TreeNode } = Tree;
  const renderTree = (jsonTree: AssetTypeTreeItem[] | undefined) => {
    if (jsonTree && jsonTree.length > 0) {
      return jsonTree.map((item: AssetTypeTreeItem) => {
        return (
          <TreeNode
            title={
              <Space size="middle">
                <Image
                  src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"
                  width={60}
                />
                <span>{item.Name}</span>
              </Space>
            }
            key={item.ID}
          >
            {item.ChildList && item.ChildList?.length > 0 && renderTree(item.ChildList)}
          </TreeNode>
        );
      });
    } else {
      return '';
    }
  };
  // 循环找到某树节点
  const loop = (
    tree: AssetTypeTreeItem[],
    data: AssetTypeTreeItem[],
    key: string,
    callback: (
      node: AssetTypeTreeItem,
      i: number,
      data: AssetTypeTreeItem[],
      tree: AssetTypeTreeItem[],
    ) => void,
  ) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].ID === key) {
        return callback(data[i], i, data, tree);
      }
      if (data[i].ChildList) {
        loop(tree, data[i].ChildList!, key, callback);
      }
    }
  };

  // 拖拽树节点
  const onDropTreeNode: TreeProps['onDrop'] = (info) => {
    console.log(info);
    const dropKey = info.node.key + '';
    const dragKey = info.dragNode.key + '';
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
    console.log(tree);
    let data: AssetTypeTreeItem[] = [];
    if (tree && tree.length > 0) data = [...tree];

    // Find dragObject
    let dragObj: AssetTypeTreeItem;
    loop(data, data, dragKey, (item, index, arr, data) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, data, dropKey, (item) => {
        item.ChildList = item.ChildList || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.ChildList.unshift(dragObj);
      });
    } else if (
      ((info.node as any).props.ChildList || []).length > 0 && // Has children
      (info.node as any).props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, data, dropKey, (item) => {
        item.ChildList = item.ChildList || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.ChildList.unshift(dragObj);
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      });
    } else {
      let ar: AssetTypeTreeItem[] = [];
      let i: number;
      loop(data, data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i!, 0, dragObj!);
      } else {
        ar.splice(i! + 1, 0, dragObj!);
      }
    }
    setTreeData(data);
  };
  // 拖拽结束
  const onDragEnter = () => {};
  // 设置点击右键菜单信息
  const setRightClickMenuInfo = (e: { event: { pageX: any; pageY: any }; node: { key: any } }) => {
    const curID = e.node.key;
    setSelectedKeys([curID]);
    setRightClickMenuVisible(true);
    let data: AssetTypeTreeItem[] = [];
    if (tree && tree.length > 0) data = [...tree];
    loop(data, data, curID, (item, index, arr, tree) => {
      setRightClickTreeNodeMenuInfo({
        pageX: e.event.pageX,
        pageY: e.event.pageY,
        id: e.node.key,
        curTreeNode: item,
        parent: arr,
        index: index,
        tree,
      });
    });
  };
  // 显示树节点右键点击的菜单
  const renderTreeNodeRightClickMenu = () => {
    const {
      pageX,
      pageY,
      id,
      curTreeNode,
      parent,
      index,
      tree: newTree,
    } = rightClickTreeNodeMenuInfo;
    // if(id){
    //   setSelectedKeys([id]);
    // }
    // 右键菜单项列表
    const rightMenuItemList = [
      {
        label: <FormattedMessage id="pages.operation.edit" defaultMessage="编辑" />,
        icon: <EditOutlined />,
        key: 'edit',
      },
      {
        label: (
          <Popconfirm
            title={
              <FormattedMessage
                id="pages.assetManage.asset.table.btnOption.delete.dialog.title"
                defaultMessage="确认删除么?"
              />
            }
            onConfirm={() => {
              setRightClickMenuVisible(false);
              deleteOneAsset(id);
            }}
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
        ),
        icon: <DeleteOutlined />,
        key: 'delete',
      },
      {
        label: <FormattedMessage id="pages.operation.copy" defaultMessage="拷贝" />,
        icon: <CopyOutlined />,
        key: 'copy',
      },
      {
        label: <FormattedMessage id="pages.operation.rename" defaultMessage="重命名" />,
        icon: <EditOutlined />,
        key: 'rename',
      },
      {
        label: <FormattedMessage id="pages.operation.cut" defaultMessage="剪切" />,
        icon: <ScissorOutlined />,
        key: 'cut',
        disabled: !oneCutedTreeNode ? false : true,
      },
      {
        label: <FormattedMessage id="pages.operation.paste" defaultMessage="粘贴" />,
        icon: <CopyOutlined />,
        key: 'paste',
        disabled: oneCutedTreeNode ? false : true,
      },
      {
        label: <FormattedMessage id="pages.operation.pasteToTop" defaultMessage="粘贴到顶层" />,
        icon: <CopyOutlined />,
        key: 'pasteToTop',
        disabled: oneCutedTreeNode ? false : true,
      },
      {
        label: <FormattedMessage id="pages.operation.sort" defaultMessage="排序" />,
        icon: <VerticalAlignMiddleOutlined />,
        key: 'sort',
        children: [
          {
            label: <FormattedMessage id="pages.operation.up" defaultMessage="上移" />,
            icon: <ArrowUpOutlined />,
            key: 'up',
            disabled: index == 0,
          },
          {
            label: <FormattedMessage id="pages.operation.down" defaultMessage="下移" />,
            icon: <ArrowDownOutlined />,
            key: 'down',
            disabled: parent && parent.length > 0 && parent.length - 1 == index ? true : false,
          },
        ],
      },
      {
        label: <FormattedMessage id="pages.operation.expand" defaultMessage="该节点全部展开" />,
        icon: <DownSquareOutlined />,
        key: 'expand',
        disabled: curTreeNode?.ChildList?.length == 0,
      },
      {
        label: <FormattedMessage id="pages.operation.allExpand" defaultMessage="全部展开" />,
        icon: <DownSquareOutlined />,
        key: 'allExpand',
      },
      {
        label: <FormattedMessage id="pages.operation.stow" defaultMessage="该节点全部收起" />,
        icon: <UpSquareOutlined />,
        key: 'stow',
        disabled: curTreeNode?.ChildList?.length == 0,
      },
      {
        label: <FormattedMessage id="pages.operation.allStow" defaultMessage="全部收起" />,
        icon: <UpSquareOutlined />,
        key: 'allStow',
      },
    ];
    // 剪切一个树节点
    const cutOneTreeNode = (
      curTreeNode: AssetTypeTreeItem,
      index: number,
      parent: any,
      newTree: any,
    ) => {
      parent.splice(index, 1);
      setOneCutedTreeNode(curTreeNode);
      setTreeData(newTree);
    };

    // 粘贴
    const pasteOneTreeNode = (action: string, curTreeNode: AssetTypeTreeItem, newTree: any) => {
      if (action == 'pasteToTop') {
        if (!newTree) {
          newTree = [];
        }
        if (oneCutedTreeNode) newTree.push(oneCutedTreeNode);
      } else {
        if (!curTreeNode.ChildList) {
          curTreeNode.ChildList = [];
        }
        if (oneCutedTreeNode) {
          curTreeNode.ChildList.push(oneCutedTreeNode);
        }
      }
      setOneCutedTreeNode(undefined);
      setTreeData(newTree);
    };
    //获取所有子节点ID
    const getAllChildrenIDs = (list: AssetTypeTreeItem[]) => {
      let idList: string[] = [];
      for (let i: number = 0; i < list.length; i++) {
        idList.push(list[i]['ID']);
        const childList = list[i]['ChildList'];
        if (childList && childList.length > 0) {
          const childIDlist: string[] = getAllChildrenIDs(childList);
          idList = idList.concat(childIDlist);
        }
      }
      return idList;
    };
    // 展开或收起树节点（包括全部）
    const expandOrStowTreeNodes = (
      treeNodes: AssetTypeTreeItem,
      isAll: boolean,
      expand: boolean,
    ) => {
      let idList: string[] = [];
      if (treeNodes && !isAll && tree) {
        idList = getAllChildrenIDs([treeNodes]);
      } else if (isAll && tree) {
        idList = getAllChildrenIDs(tree);
      }
      if (expand) {
        setExpandedKeys(idList);
      } else {
        const newExpandedKeys = expandedKeys.filter((one) => idList.indexOf(one) == -1);
        setExpandedKeys(newExpandedKeys);
      }
    };
    const toUpOrDown = (
      isUp: boolean,
      curTreeNode: AssetTypeTreeItem,
      index: number,
      parent: any,
      newTree: any,
    ) => {
      parent.splice(index, 1);
      if (isUp) {
        parent.splice(index - 1, 0, curTreeNode);
      } else {
        parent.splice(index + 1, 0, curTreeNode);
      }
      setTreeData(newTree);
    };
    // 点击右键菜单项
    const clickRightMenuItem = (e: any) => {
      setRightClickMenuVisible(false);
      switch (e.key) {
        case 'edit':
        case 'copy':
          setDetailVisible(true);
          setDetailParams({ action: e.key, newKey: '', id });
          break;
        case 'cut':
          cutOneTreeNode(curTreeNode!, index!, parent, newTree);
          break;
        case 'paste':
        case 'pasteToTop':
          pasteOneTreeNode(e.key, curTreeNode!, newTree);
          break;
        case 'expand':
        case 'allExpand':
        case 'stow':
        case 'allStow':
          expandOrStowTreeNodes(
            curTreeNode!,
            e.key == 'allExpand' || e.key == 'allStow',
            e.key == 'allExpand' || e.key == 'expand',
          );
          break;
        case 'up':
        case 'down':
          toUpOrDown(e.key == 'up', curTreeNode!, index!, parent, newTree);
          break;
        default:
          break;
      }
    };
    const menu = (
      <Menu
        selectable
        items={rightMenuItemList}
        style={{
          position: 'absolute',
          left: `${pageX - 160}px`,
          top: `${pageY - 160}px`,
        }}
        onClick={clickRightMenuItem}
      ></Menu>
    );
    return !rightClickMenuVisible ? '' : menu;
  };
  // 手动展开或收起
  const manulExpandOrStow: TreeProps['onExpand'] = (key, info) => {
    let newExpandedKeys = [...expandedKeys];
    if (info.expanded) {
      newExpandedKeys.push(info.node.key.toString());
    } else {
      newExpandedKeys = newExpandedKeys.filter((item) => item !== info.node.key);
    }
    setExpandedKeys(newExpandedKeys);
  };
  // 手动选择或取消选择树节点
  const manulSelectedTreeNode: TreeProps['onSelect'] = (key, info) => {
    let newSelectedKeys = [...selectedKeys];
    if (info.selected) {
      newSelectedKeys = [info.node.key.toString()];
    } else {
      newSelectedKeys = newSelectedKeys.filter((item) => item !== info.node.key);
    }
    setSelectedKeys(newSelectedKeys);
    // 不显示右键菜单
    setRightClickMenuVisible(false);
  };
  // 点击checkbox
  const checkOneTreeNode: TreeProps['onCheck'] = (checkedInfo, info) => {
    const { checked } = checkedInfo;
    setChecked(checked);
  };
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
      return (
        <>
          <Tree
            checkable
            draggable
            blockNode
            checkStrictly
            className="draggable-tree"
            onDrop={onDropTreeNode}
            onDragEnter={onDragEnter}
            onRightClick={setRightClickMenuInfo}
            expandedKeys={expandedKeys}
            onExpand={manulExpandOrStow}
            selectedKeys={selectedKeys}
            onSelect={manulSelectedTreeNode}
            onCheck={checkOneTreeNode}
          >
            {tree && tree?.length > 0 && renderTree(tree)}
          </Tree>
          {renderTreeNodeRightClickMenu()}
        </>
      );
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
            disabled={checked.length == 0}
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
      <OneDetailAssetTypeDrawer
        visible={detailVisible}
        {...detailParams}
        onClose={handleCloseDrawer}
      />
    </PageContainer>
  );
};
export default AssetType;
