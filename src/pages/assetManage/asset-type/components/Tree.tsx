import {
  DeleteOutlined,
  EditOutlined,
  CopyOutlined,
  ScissorOutlined,
  DownSquareOutlined,
  UpSquareOutlined,
  VerticalAlignMiddleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { Menu, Image, Space, Popconfirm, Tree, Input } from 'antd';
import type { TreeProps } from 'antd/es/tree';
import { FormattedMessage } from 'umi';
import React, { useEffect, useState } from 'react';
import { AssetTypeTreeItem } from '../data.d';
import './Tree.less';

type detailDrawerPrams = {
  action: string;
  id?: string;
  newKey?: string;
};
type AssetTreeProps = {
  assetTypeTree: AssetTypeTreeItem[];
  setDetailVisible: (visible: boolean) => void;
  setDetailParams: (params: detailDrawerPrams) => void;
  setChecked: (list: string[]) => void;
  deleteOneAsset: (id: string) => void;
  searchKeyWords: string;
};

const TreeComponent: React.FC<AssetTreeProps> = (props) => {
  const {
    assetTypeTree,
    setDetailVisible,
    setDetailParams,
    setChecked,
    deleteOneAsset,
    searchKeyWords,
  } = props;
  console.log(assetTypeTree);
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
  const [tree, setTreeData] = useState<AssetTypeTreeItem[]>();
  const [oneCutedTreeNode, setOneCutedTreeNode] = useState<AssetTypeTreeItem | undefined>();
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [rightClickMenuVisible, setRightClickMenuVisible] = useState<boolean>(false);
  // const [checked, setCheckedTreeNodes] = useState<string[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [renameID, setRenameID] = useState<string>('');

  const { TreeNode } = Tree;
  useEffect(() => {
    setTreeData(assetTypeTree);
    console.log(tree);
  }, [assetTypeTree]);

  const getParentKey: any = (key: string, tree: any) => {
    let parentKey;

    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.ChildList) {
        if (node.ChildList.some((item: any) => item.ID === key)) {
          parentKey = node.ID;
        } else if (getParentKey(key, node.ChildList)) {
          parentKey = getParentKey(key, node.ChildList);
        }
      }
    }

    return parentKey;
  };

  const dataList: any = [];

  const generateList = (data: any) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const { ID, Name } = node;
      dataList.push({
        ID,
        Name,
      });

      if (node.ChildList) {
        generateList(node.ChildList);
      }
    }
  };

  generateList(assetTypeTree);

  useEffect(() => {
    console.log(searchKeyWords);
    if (searchKeyWords) {
      const newExpandedKeys = dataList
        .map((item: { Name: string | string[]; ID: any }) => {
          if (item.Name && item.Name.indexOf(searchKeyWords) > -1) {
            return getParentKey(item.ID, assetTypeTree);
          }

          return null;
        })
        .filter((item: any, i: any, self: string | any[]) => item && self.indexOf(item) === i);
      console.log(newExpandedKeys);
      setExpandedKeys(newExpandedKeys);
      setAutoExpandParent(true);
    } else {
      setExpandedKeys([]);
      // setAutoExpandParent(true);
    }
  }, [searchKeyWords]);

  // 确认重命名
  const confirmRename = (e) => {
    let newName = '';
    console.log(e);
    if (e.type == 'click') {
      console.log(e.target.previousSibling);
      newName = e.target.previousSibling.value;
    } else {
      newName = e.target.value;
      alert('重命名=' + newName);
    }
    setRenameID('');
  };
  const renderTree = (jsonTree: AssetTypeTreeItem[] | undefined) => {
    if (jsonTree && jsonTree.length > 0) {
      return jsonTree.map((item: AssetTypeTreeItem) => {
        const strTitle = item.Name;
        const index = strTitle.indexOf(searchKeyWords);
        const beforeStr = strTitle.substring(0, index);
        const afterStr = strTitle.slice(index + searchKeyWords.length);
        return (
          <TreeNode
            title={
              <Space size="middle">
                <Image
                  src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"
                  width={40}
                />
                <span>
                  {item.ID == renameID ? (
                    <Space>
                      <Input defaultValue={item.Name} allowClear onPressEnter={confirmRename} />
                      <CheckCircleOutlined onClick={confirmRename} />
                    </Space>
                  ) : index > -1 ? (
                    <span>
                      {beforeStr}
                      <span className="site-tree-search-value">{searchKeyWords}</span>
                      {afterStr}
                    </span>
                  ) : (
                    <span>{strTitle}</span>
                  )}
                </span>
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
    const dropKey = info.node.key + '';
    const dragKey = info.dragNode.key + '';
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
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
            title={<FormattedMessage id="pages.deleteDialog.title" defaultMessage="确认删除么?" />}
            onConfirm={() => {
              setRightClickMenuVisible(false);
              deleteOneAsset(id);
            }}
            okText={<FormattedMessage id="pages.operation.confirm'" defaultMessage="确定" />}
            cancelText={<FormattedMessage id="pages.operation.cancel" defaultMessage="取消" />}
          >
            <a>
              <FormattedMessage id="pages.operation.delete" defaultMessage="删除" />
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
    // 上移或下移
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
        case 'rename':
          setRenameID(id);
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
          top: `${pageY - 180}px`,
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
    setAutoExpandParent(false);
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
    // setCheckedTreeNodes(checked);
    setChecked(checked);
  };
  return (
    <>
      {console.log(tree)}
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
        autoExpandParent={autoExpandParent}
      >
        {tree && tree?.length > 0 && renderTree(tree)}
      </Tree>
      {renderTreeNodeRightClickMenu()}
    </>
  );
};
export default TreeComponent;
