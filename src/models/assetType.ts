import { getAssetTypeTree as queryTree, postAssetType as createOneAssetType, putAssetType as editOneAssetType, getAssetTypeId as getOneAssetTypeByID, deleteAssetTypeId as deleteOneAssetType, getAssetTypeTree } from '@/services/asset/AssetType';
import { useState, useCallback } from 'react'
import { FindOneByIDInTree, GuidEmpty, IsNotEmptyGuid } from '@/utils/common';

const convertToList = (_tree: API.IMTreeNode[]) => {
  let list: any = [];
  if (_tree && _tree.length > 0) {
    for (let i = 0; i < _tree.length; i++) {
      const oneNode = _tree[i];
      if (oneNode.ChildList && oneNode.ChildList.length > 0) {
        let childList = convertToList(oneNode.ChildList);
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

export default () => {
  const [tree, setTree] = useState<API.IMTreeNode[]>([]);
  const [list, setList] = useState<API.IMTreeNode[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 查询资产类别树
  const queryAssetTypeTree = useCallback(async () => {
    setLoading(true)
    const result = await queryTree();
    let treeResult: API.IMTreeNode[] = [];
    if (result.IsOk && result.Response) {
      treeResult = result.Response as API.IMTreeNode[]
    }
    setTree(treeResult)
    setList(convertToList(treeResult));
    setLoading(false)
  }, [])

  // 新增一个资产类别树
  const addOne = useCallback(async (params: API.IMAssetType) => {
    setLoading(true)
    const result: API.AssetTypeAPIResult = await createOneAssetType(params);
    const newGuid = result.Response as string
    if (result.IsOk && IsNotEmptyGuid(newGuid)) {
      params['ID'] = newGuid
      if (params.ParentID == GuidEmpty) {
        tree.push(params)
      } else {
        FindOneByIDInTree(tree, tree, params.ParentID as string, (parentNode) => {
          if (parentNode) {
            if (!parentNode.ChildList) {
              parentNode.ChildList = [];
            }
            parentNode?.ChildList?.push(params);
          }
        })
      }
      setTree(tree)
      setTree(convertToList(tree))
    }
    setLoading(false)
    return result;
  }, [tree, list])

  // 编辑一个资产类别树
  const editOne = useCallback(async (params: API.IMAssetType) => {
    setLoading(true)
    const result: API.AssetTypeAPIResult = await editOneAssetType(params);
    if (result.IsOk && result.Response as boolean) {
      //   FindOneByIDInTree(tree, tree,  params?.ID as string, (oneNode,index,parentNode) => {
      //     parentNode[index] = params
      //   })
      // setTree(tree)
      // setTree(convertToList(tree))
    }
    setLoading(false)
    return result;
  }, [tree, list])

  // 删除一个资产类别
  const deleteOne = useCallback(async (params: API.deleteAssetTypeIdParams) => {
    setLoading(true)
    const result: API.AssetTypeAPIResult = await deleteOneAssetType(params);
    if (result.IsOk && result.Response) {
      let deleteID = params.id
      const afterDeleteList = list.filter((item) => item.ID !== deleteID);
      setList(afterDeleteList);
      const afterDeleteTree = afterDeleteList.filter(item => item.ID == GuidEmpty)
      setTree(afterDeleteTree);
    }
    setLoading(false)
    return result;
  }, [tree, list])

  // 批量删除资产类别
  const batchDelete = useCallback(async (params: any) => {
    setLoading(true)
    setLoading(false)
  }, [])

  return {
    loading,
    tree,
    list,
    queryAssetTypeTree,
    addOne,
    editOne,
    deleteOne,
    batchDelete
  }
}

