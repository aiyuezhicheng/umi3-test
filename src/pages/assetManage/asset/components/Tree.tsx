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
  CheckSquareOutlined
} from '@ant-design/icons';
import { Menu, Image, Space, Popconfirm, Tree, Input } from 'antd';
import type { TreeProps } from 'antd/es/tree';
import { FormattedMessage } from 'umi';
import React, { useEffect, useState } from 'react';
import { AssetTreeItem } from '../data.d';
import './Tree.less';

type detailDrawerPrams = {
  action: string;
  id?: string;
};
type AssetTreeProps = {
  assetTree: AssetTreeItem[];
  setDetailVisible: (visible: boolean) => void;
  setDetailParams: (params: detailDrawerPrams) => void;
  setChecked: (list: string[]) => void;
  deleteOneAsset: (id: string) => void;
  searchKeyWords: string;
};

const TreeComponent: React.FC<AssetTreeProps> = (props) => {
  const {
    assetTree,
    setDetailVisible,
    setDetailParams,
    setChecked,
    deleteOneAsset,
    searchKeyWords,
  } = props;
  console.log(assetTree);
  type rightClickTreeNodeMenuInfoParams = {
    pageX: number;
    pageY: number;
    id: string;
    curTreeNode?: AssetTreeItem;
    parent?: any;
    index?: number;
    tree?: AssetTreeItem[];
  };
  const [rightClickTreeNodeMenuInfo, setRightClickTreeNodeMenuInfo] =
    useState<rightClickTreeNodeMenuInfoParams>({
      pageX: 0,
      pageY: 0,
      id: '',
    });
  const [tree, setTreeData] = useState<AssetTreeItem[]>();
  const [oneCutedTreeNode, setOneCutedTreeNode] = useState<AssetTreeItem | undefined>();
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [rightClickMenuVisible, setRightClickMenuVisible] = useState<boolean>(false);
  // const [checked, setCheckedTreeNodes] = useState<string[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [renameID, setRenameID] = useState<string>('');

  const { TreeNode } = Tree;
  useEffect(() => {
    setTreeData(assetTree);
    console.log(tree);
  }, [assetTree]);

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

  generateList(assetTree);

  useEffect(() => {
    console.log(searchKeyWords);
    if (searchKeyWords) {
      const newExpandedKeys = dataList
        .map((item: { Name: string | string[]; ID: any }) => {
          if (item.Name && item.Name.indexOf(searchKeyWords) > -1) {
            return getParentKey(item.ID, assetTree);
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

  // ???????????????
  const confirmRename = (e: any) => {
    let newName = '';
    console.log(e);
    if (e.type == 'click') {
      console.log(e.target.previousSibling);
      newName = e.target.previousSibling.value;
    } else {
      newName = e.target.value;
      alert('?????????=' + newName);
    }
    setRenameID('');
  };
  const renderTree = (jsonTree: AssetTreeItem[] | undefined) => {
    if (jsonTree && jsonTree.length > 0) {
      return jsonTree.map((item: AssetTreeItem) => {
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
  // ????????????????????????
  const loop = (
    tree: AssetTreeItem[],
    data: AssetTreeItem[],
    key: string,
    callback: (
      node: AssetTreeItem,
      i: number,
      data: AssetTreeItem[],
      tree: AssetTreeItem[],
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

  // ???????????????
  const onDropTreeNode: TreeProps['onDrop'] = (info) => {
    const dropKey = info.node.key + '';
    const dragKey = info.dragNode.key + '';
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
    let data: AssetTreeItem[] = [];
    if (tree && tree.length > 0) data = [...tree];

    // Find dragObject
    let dragObj: AssetTreeItem;
    loop(data, data, dragKey, (item, index, arr, data) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, data, dropKey, (item) => {
        item.ChildList = item.ChildList || [];
        // where to insert ?????????????????????????????????????????????
        item.ChildList.unshift(dragObj);
      });
    } else if (
      ((info.node as any).props.ChildList || []).length > 0 && // Has children
      (info.node as any).props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, data, dropKey, (item) => {
        item.ChildList = item.ChildList || [];
        // where to insert ?????????????????????????????????????????????
        item.ChildList.unshift(dragObj);
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      });
    } else {
      let ar: AssetTreeItem[] = [];
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
  // ????????????
  const onDragEnter = () => {};
  // ??????????????????????????????
  const setRightClickMenuInfo = (e: { event: { pageX: any; pageY: any }; node: { key: any } }) => {
    const curID = e.node.key;
    setSelectedKeys([curID]);
    setRightClickMenuVisible(true);
    let data: AssetTreeItem[] = [];
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
  // ????????????????????????????????????
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
    // ?????????????????????
    const rightMenuItemList = [
      {
        label: <FormattedMessage id="pages.operation.edit" defaultMessage="??????" />,
        icon: <EditOutlined />,
        key: 'edit',
      },
      {
        label: (
          <Popconfirm
            title={<FormattedMessage id="pages.deleteDialog.title" defaultMessage="????????????????" />}
            onConfirm={() => {
              setRightClickMenuVisible(false);
              deleteOneAsset(id);
            }}
            okText={<FormattedMessage id="pages.operation.confirm'" defaultMessage="??????" />}
            cancelText={<FormattedMessage id="pages.operation.cancel" defaultMessage="??????" />}
          >
            <a>
              <FormattedMessage id="pages.operation.delete" defaultMessage="??????" />
            </a>
          </Popconfirm>
        ),
        icon: <DeleteOutlined />,
        key: 'delete',
      },
      {
        label: <FormattedMessage id="pages.operation.copy" defaultMessage="??????" />,
        icon: <CopyOutlined />,
        key: 'copy',
      },
      {
        label: <FormattedMessage id="pages.operation.rename" defaultMessage="?????????" />,
        icon: <EditOutlined />,
        key: 'rename',
      },
      {
        label: <FormattedMessage id="pages.operation.cut" defaultMessage="??????" />,
        icon: <ScissorOutlined />,
        key: 'cut',
        disabled: !oneCutedTreeNode ? false : true,
      },
      {
        label: <FormattedMessage id="pages.operation.paste" defaultMessage="??????" />,
        icon: <CopyOutlined />,
        key: 'paste',
        disabled: oneCutedTreeNode ? false : true,
      },
      {
        label: <FormattedMessage id="pages.operation.pasteToTop" defaultMessage="???????????????" />,
        icon: <CopyOutlined />,
        key: 'pasteToTop',
        disabled: oneCutedTreeNode ? false : true,
      },
      {
        label: <FormattedMessage id="pages.operation.sort" defaultMessage="??????" />,
        icon: <VerticalAlignMiddleOutlined />,
        key: 'sort',
        children: [
          {
            label: <FormattedMessage id="pages.operation.up" defaultMessage="??????" />,
            icon: <ArrowUpOutlined />,
            key: 'up',
            disabled: index == 0,
          },
          {
            label: <FormattedMessage id="pages.operation.down" defaultMessage="??????" />,
            icon: <ArrowDownOutlined />,
            key: 'down',
            disabled: parent && parent.length > 0 && parent.length - 1 == index ? true : false,
          },
        ],
      },
      {
        label: <FormattedMessage id="pages.operation.expand" defaultMessage="?????????????????????" />,
        icon: <DownSquareOutlined />,
        key: 'expand',
        disabled: curTreeNode?.ChildList?.length == 0,
      },
      {
        label: <FormattedMessage id="pages.operation.allExpand" defaultMessage="????????????" />,
        icon: <DownSquareOutlined />,
        key: 'allExpand',
      },
      {
        label: <FormattedMessage id="pages.operation.stow" defaultMessage="?????????????????????" />,
        icon: <UpSquareOutlined />,
        key: 'stow',
        disabled: curTreeNode?.ChildList?.length == 0,
      },
      {
        label: <FormattedMessage id="pages.operation.allStow" defaultMessage="????????????" />,
        icon: <UpSquareOutlined />,
        key: 'allStow',
      },
      {
        label: <FormattedMessage id="pages.operation.verification" defaultMessage="??????" />,
        icon: <CheckSquareOutlined />,
        key: 'verification',
      },
    ];
    // ?????????????????????
    const cutOneTreeNode = (
      curTreeNode: AssetTreeItem,
      index: number,
      parent: any,
      newTree: any,
    ) => {
      parent.splice(index, 1);
      setOneCutedTreeNode(curTreeNode);
      setTreeData(newTree);
    };

    // ??????
    const pasteOneTreeNode = (action: string, curTreeNode: AssetTreeItem, newTree: any) => {
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
    //?????????????????????ID
    const getAllChildrenIDs = (list: AssetTreeItem[]) => {
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
    // ??????????????????????????????????????????
    const expandOrStowTreeNodes = (
      treeNodes: AssetTreeItem,
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
    // ???????????????
    const toUpOrDown = (
      isUp: boolean,
      curTreeNode: AssetTreeItem,
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
    // ?????????????????????
    const clickRightMenuItem = (e: any) => {
      setRightClickMenuVisible(false);
      switch (e.key) {
        case 'edit':
        case 'copy':
          setDetailVisible(true);
          setDetailParams({ action: e.key, id });
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
  // ?????????????????????
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
  // ????????????????????????????????????
  const manulSelectedTreeNode: TreeProps['onSelect'] = (key, info) => {
    let newSelectedKeys = [...selectedKeys];
    if (info.selected) {
      newSelectedKeys = [info.node.key.toString()];
    } else {
      newSelectedKeys = newSelectedKeys.filter((item) => item !== info.node.key);
    }
    setSelectedKeys(newSelectedKeys);
    // ?????????????????????
    setRightClickMenuVisible(false);
  };
  // ??????checkbox
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
