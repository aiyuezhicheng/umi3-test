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
  CheckSquareOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Menu, Image, Space, Popconfirm, Tree, Input, Button, message, Modal } from 'antd';
import type { TreeProps } from 'antd/es/tree';
import { FormattedMessage, useModel } from 'umi';
import React, { useState, useRef } from 'react';
import { FindOneByIDInTree } from '@/utils/common';
import { getAssetTypeId as queryOneAssetTypeByID } from '@/services/asset/AssetType';

import './Tree.less';
import { GuidEmpty } from '../../../../utils/common';

type detailDrawerPrams = {
  action: string;
  id?: string;
  newKey?: string;
};
type AssetTreeProps = {
  setDetailInfoVisible: (visible: boolean) => void;
  setDetailParams: (params: detailDrawerPrams) => void;
  setChecked: (list: string[]) => void;
  deleteOneAssetType: (oneNode: API.IMTreeNode) => void;
  searchKeyWords: string;
};

type rightClickTreeNodeMenuInfoParams = {
  pageX: number;
  pageY: number;
  id: string;
  curTreeNode?: API.IMTreeNode;
  parent?: any;
  index?: number;
  tree?: API.IMTreeNode[];
};

const TreeComponent: React.FC<AssetTreeProps> = (props) => {
  const {
    setDetailInfoVisible,
    setDetailParams,
    setChecked,
    deleteOneAssetType,
    searchKeyWords,
  } = props;

  const [rightClickTreeNodeMenuInfo, setRightClickTreeNodeMenuInfo] =
    useState<rightClickTreeNodeMenuInfoParams>({
      pageX: 0,
      pageY: 0,
      id: '',
    });
  const { loading, tree, editOne } = useModel('assetType');
  const [oneCutedTreeNode, setOneCutedTreeNode] = useState<API.IMTreeNode>();
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [rightClickMenuVisible, setRightClickMenuVisible] = useState<boolean>(false);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [renameID, setRenameID] = useState<string>('');
  const inputRef = useRef<InputRef | null>(null);
  const { TreeNode } = Tree;

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

  const queryAndModifyOneAssetTypeByApi = (
    id: string,
    operationType: string,
    value?: any,
    callback?: any,
  ) => {
    queryOneAssetTypeByID({ id: id }).then((result: API.AssetTypeAPIResult) => {
      if (result.IsOk) {
        const oneAssetType = result.Response as API.IMAssetType;
        let modifyType = '';
        let oldValue;
        switch (operationType) {
          case 'rename':
            modifyType = 'rename';
            oneAssetType['Name'] = value;
            break;
          case 'up':
          case 'down':
            modifyType = 'sn' + (operationType == 'up' ? '-' : '+');
            if (oneAssetType['SN'] || oneAssetType['SN'] == 0) {
              operationType == 'up' ? oneAssetType['SN']-- : oneAssetType['SN']++;
            }
            break;
          case 'paste':
          case 'pasteToTop':
          case 'drop':
            modifyType = 'parentid';
            oldValue = oneAssetType['ParentID'];
            oneAssetType['ParentID'] = value.ParentID;
            oneAssetType['SN'] = value.SN;
          default:
            break;
        }
        editOne(oneAssetType, operationType, oldValue).then((result) => {
          if (!result.IsOk) {
            message.success(
              <>
                <FormattedMessage
                  id="pages.message.api.errorReason"
                  defaultMessage="?????????????????????????????????"
                />
                {result.ErrorMsg}
              </>,
            );
          }
          if (callback) callback();
        });
      } else {
        message.error(
          <>
            <FormattedMessage
              id="pages.message.api.errorReason"
              defaultMessage="?????????????????????????????????"
            />
            {result.ErrorMsg}
          </>,
        );
        if (callback) callback();
      }
    });
  };

  // ???????????????
  const handleRename = () => {
    const value = inputRef.current?.input?.value || '';
    queryAndModifyOneAssetTypeByApi(renameID, 'rename', value, () => {
      setRenameID('');
    });
  };

  const renderTree = (jsonTree: API.IMTreeNode[]) => {
    if (jsonTree && jsonTree.length > 0) {
      return jsonTree.map((item: API.IMTreeNode) => {
        const strTitle = item.Name as string;
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
                      <Input
                        ref={inputRef}
                        defaultValue={item.Name}
                        allowClear
                        onPressEnter={handleRename}
                      />
                      <Button icon={<CheckCircleOutlined />} onClick={handleRename}></Button>
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
            style={oneCutedTreeNode && oneCutedTreeNode.ID == item.ID ? { display: 'none' } : {}}
          >
            {(!oneCutedTreeNode || (oneCutedTreeNode && oneCutedTreeNode.ID !== item.ID)) &&
              item.ChildList &&
              item.ChildList?.length > 0 &&
              renderTree(item.ChildList)}
          </TreeNode>
        );
      });
    } else {
      return '';
    }
  };
  // ????????????????????????
  const loop = (
    tree: API.IMTreeNode[],
    data: API.IMTreeNode[],
    key: string,
    callback: (
      node: API.IMTreeNode,
      i: number,
      data: API.IMTreeNode[],
      tree: API.IMTreeNode[],
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
    // ??????????????????ID
    const dragKey = info.dragNode.key + '';
    // ??????????????????????????????
    const dropKey = info.node.key + '';
    let nextSN = 0;
    let parentID = dropKey;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    if (!info.dropToGap) {
      // ???????????????????????????????????????
      nextSN = 0;
      const value = { ParentID: parentID, SN: nextSN };
      queryAndModifyOneAssetTypeByApi(dragKey, 'drop', value, () => {});
    } else if (
      ((info.node as any).props.ChildList || []).length > 0 && // Has children
      (info.node as any).props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      nextSN = 0;
      const value = { ParentID: parentID, SN: nextSN };
      queryAndModifyOneAssetTypeByApi(dragKey, 'drop', value, () => {});
    } else {
      queryOneAssetTypeByID({ id: dropKey }).then((result: API.AssetTypeAPIResult) => {
        if (result.IsOk) {
          const dropAssetType = result.Response as API.IMAssetType;
          parentID = dropAssetType.ParentID as string;
          nextSN = (dropAssetType?.SN || 0) + 1;
          const value = { ParentID: parentID, SN: nextSN };
          queryAndModifyOneAssetTypeByApi(dragKey, 'drop', value, () => {});
        } else {
          message.error(
            <>
              <FormattedMessage
                id="pages.message.api.errorReason"
                defaultMessage="?????????????????????????????????"
              />
              {result.ErrorMsg}
            </>,
          );
        }
      });
    }
  };

  // ??????????????????????????????
  const handleSetRightClickMenuInfo = (e: {
    event: { pageX: any; pageY: any };
    node: { key: any };
  }) => {
    const curID = e.node.key;
    setSelectedKeys([curID]);
    setRightClickMenuVisible(true);
    let data: API.IMTreeNode[] = [];
    if (tree && tree.length > 0) data = [...tree];
    FindOneByIDInTree(data, data, curID, (item, index, arr, tree) => {
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
        label: <FormattedMessage id="pages.operation.delete" defaultMessage="??????" />,
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
        label: <FormattedMessage id="pages.operation.expand" defaultMessage="??????" />,
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
        label: <FormattedMessage id="pages.operation.stow" defaultMessage="??????" />,
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
    //   // ?????????????????????
    const cutOneTreeNode = (id: string) => {
      FindOneByIDInTree(tree, tree, id, (curNode) => {
        setOneCutedTreeNode(curNode);
      });
    };

    // ??????
    const pasteOneTreeNode = (id: string, action: string) => {
      const pasteFunc = (modifyFieldsObj: { ParentID: string; SN: number }) => {
        if (oneCutedTreeNode && oneCutedTreeNode.ID) {
          queryAndModifyOneAssetTypeByApi(oneCutedTreeNode.ID, action, modifyFieldsObj, () => {
            setOneCutedTreeNode(undefined);
          });
        }
      };
      if (oneCutedTreeNode && oneCutedTreeNode.ID) {
        if (action == 'pasteToTop') {
          pasteFunc({ ParentID: GuidEmpty, SN: tree.length + 1 });
        } else {
          FindOneByIDInTree(tree, tree, id, (node) => {
            const nextSN = node.ChildList ? node.ChildList.length + 1 : 1;
            pasteFunc({ ParentID: id, SN: nextSN });
          });
        }
      }
    };

    //?????????????????????ID
    const getAllChildrenIDs = (list: API.IMTreeNode[]) => {
      let idList: string[] = [];
      for (let i: number = 0; i < list.length; i++) {
        idList.push(list[i]['ID'] as string);
        const childList = list[i]['ChildList'];
        if (childList && childList.length > 0) {
          const childIDlist: string[] = getAllChildrenIDs(childList);
          idList = idList.concat(childIDlist);
        }
      }
      return idList;
    };

    // ??????????????????????????????????????????
    const expandOrStowTreeNodes = (treeNodes: API.IMTreeNode, isAll: boolean, expand: boolean) => {
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
    const toUpOrDown = (id: string, type: string) => {
      queryAndModifyOneAssetTypeByApi(id, type);
    };

    // ?????????????????????
    const clickRightMenuItem = (e: any) => {
      setRightClickMenuVisible(false);
      switch (e.key) {
        case 'delete':
          Modal.confirm({
            title: (
              <>
                <FormattedMessage id="pages.deleteDialog.title" defaultMessage="????????????????" />
                {curTreeNode!.ChildList && curTreeNode!.ChildList.length > 0 && (
                  <FormattedMessage
                    id="pages.message.includeAllChildren"
                    defaultMessage="(?????????????????????)"
                  />
                )}
              </>
            ),
            icon: <ExclamationCircleOutlined />,
            content: '',
            onOk() {
              deleteOneAssetType(curTreeNode as API.IMTreeNode);
            },
          });
          break;
        case 'edit':
        case 'copy':
          setDetailInfoVisible(true);
          setDetailParams({ action: e.key, newKey: '', id });
          break;
        case 'rename':
          setRenameID(id);
          break;
        case 'cut':
          cutOneTreeNode(id);
          break;
        case 'paste':
        case 'pasteToTop':
          pasteOneTreeNode(id, e.key);
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
          toUpOrDown(id, e.key);
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
          height: '300px',
          overflowY: 'auto',
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
    setChecked(checked);
  };
  return (
    <div style={{ marginTop: '20px' }}>
      <Tree
        checkable
        draggable
        blockNode
        checkStrictly
        className="draggable-tree"
        onDrop={onDropTreeNode}
        onRightClick={handleSetRightClickMenuInfo}
        expandedKeys={expandedKeys}
        onExpand={manulExpandOrStow}
        selectedKeys={selectedKeys}
        onSelect={manulSelectedTreeNode}
        onCheck={checkOneTreeNode}
        autoExpandParent={autoExpandParent}
        style={{ marginTop: '10px' }}
      >
        {tree && tree?.length > 0 && renderTree(tree)}
      </Tree>
      {renderTreeNodeRightClickMenu()}
    </div>
  );
};
export default TreeComponent;
