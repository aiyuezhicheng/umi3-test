import { Tree } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import React from 'react';
import { FormattedMessage } from 'umi';
import { AssetListItem } from './data.d';

export type AssetTreeProps = {
  assetTree: AssetListItem[];
};

const { TreeNode } = Tree;
const AssetTree: React.FC<AssetTreeProps> = (props) => {
  const { assetTree } = props;
  const renderTree = (jsonTree: AssetListItem[]) =>
    jsonTree.map((value) => {
      //遍历树状数组，如果发现他有children则先套上<TreeNode>,再对他children中的元素做相同的操纵，直到children为空的元素停止，说明他们已经是最深的那一层了。
      if (value.Children) {
        return (
          <TreeNode title={<span>{value.Name}</span>} key={value.ID}>
            {renderTree(value.Children)}
          </TreeNode>
        );
      } else {
        return <TreeNode title={<span>{value.Name}</span>} key={value.ID}></TreeNode>;
      }
    });
  console.log(assetTree);
  return <Tree showLine>renderTree(assetTree)</Tree>;
};

export default AssetTree;
