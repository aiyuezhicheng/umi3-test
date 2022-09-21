import ExportJsonExcel from "js-export-excel";
// 导出为excel
export function handleExportToExcel(fileName: any, datas: any[]) {
  const option = {
    fileName: fileName,
    datas: datas
  };
  const toExcel = new ExportJsonExcel(option);
  toExcel.saveExcel();
}

// 全屏
export function requestFullScreen(element: any) {
  console.log(element)
  const requestMethod = element.requestFullscreen || element.webkitRequestFullscreen || element.msRequestFullscreen || element.mozRequestFullScreen;
  if (requestMethod) {
    requestMethod.call(element);
  }
}

// 退出全屏
export function exitFullScreen() {
  const document: any = window.document;
  const exitMethod = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen;
  if (exitMethod) {
    exitMethod.call(document);
  }
}
// 判断是否全屏
export function isFullscreenElement() {
  const document: any = window.document;
  const isFull = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement || document.mozFullScreenElement;
  return !!isFull;
}

// 空Guid
export const GuidEmpty = "00000000-0000-0000-0000-000000000000";

/// <summary>是否为Guid
///   <para></para>
/// </summary>
export const IsGuid = (value: string) => {
  if (value && value.length == 36) {
    var re = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return re.test(value);
  }
  return false;
}

// 是否是非空GUID
export const IsNotEmptyGuid = (value: any) => {
  if (IsGuid(value)) {
    if (value == GuidEmpty)
      return false;
    else
      return true;
  }
  else
    return false;
}

// 新的GUID
export const NewGuid = () => {
  let guid: string = "";
  for (var i = 1; i <= 32; i++) {
    var n = Math.floor(Math.random() * 16.0).toString(16);
    guid += n;
    if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
      guid += "-";
  }
  return guid;
}

// 处理工程单位和列表项
export const ProcessListOptionsAndEngUnit = (properties: any[], callback: any) => {
  const processEngUnit = (engUnitIDs: string[], callback: any) => {
    if (engUnitIDs && engUnitIDs.length == 0) {
      callback(properties);
    } else {
      const engineeringUnitList = [
        { ID: '8626dc3b-9af0-4641-8a88-4479491fa9b5', Name: '米' },
        { ID: '单位2-id', Name: '单位2' },
        { ID: '单位3-id', Name: '单位3' },
        { ID: '单位4-id', Name: '单位4' },
        { ID: '单位5-id', Name: '单位5' },
        { ID: '单位6-id', Name: '单位6' },
        { ID: '单位7-id', Name: '单位7' },
        { ID: '单位8-id', Name: '单位8' },
        { ID: '单位9-id', Name: '单位9' },
        { ID: '单位10-id', Name: '单位10' },
      ];
      for (let i = 0; i < properties.length; i++) {
        const oneProperty = properties[i];
        const relatedEngineeringUnit = oneProperty['RelatedEngineeringUnit']
        if (relatedEngineeringUnit && IsNotEmptyGuid(relatedEngineeringUnit.ID) && !relatedEngineeringUnit.Name) {
          const find = engineeringUnitList.find(item => { return item.ID == relatedEngineeringUnit.ID });
          if (find) {
            relatedEngineeringUnit['Name'] = find['Name'];
          }
        }
      }
      callback(properties);
    }
  }
  const processListOptions = (listTypeIDs: string[], callback: any) => {
    if (listTypeIDs && listTypeIDs.length == 0) {
      callback(properties);
    } else {
      const obj: any = {
        '18d73844-ebbd-4a3c-af7a-0af21e8aa7a1': [
          { ID: '48d73844-ebbd-4a3c-af7a-0af21e8aa7a8', Name: '周一' },
          { ID: '48d73844-ebbd-4a3c-af7a-0af21e8aa7b8', Name: '周二' },
          { ID: '48d73844-ebbd-4a3c-af7a-0af21e8aa7c8', Name: '周三' },
          { ID: '48d73844-ebbd-4a3c-af7a-0af21e8aa7d8', Name: '周四' },
          { ID: '48d73844-ebbd-4a3c-af7a-0af21e8aa7e8', Name: '周五' },
          { ID: '48d73844-ebbd-4a3c-af7a-0af21e8aa7f8', Name: '周六' },
          { ID: '48d73844-ebbd-4a3c-af7a-0af21e8aa7g8', Name: '周日' },
        ],
        '28d73844-ebbd-4a3c-af7a-0af21e8aa7a1': [
          { ID: '28d73844-ebbd-4a3c-af7a-0af21e8aaaa8', Name: '是' },
          { ID: '28d73844-ebbd-4a3c-af7a-0af21e8aaba8', Name: '是' },
        ],
        '38d73844-ebbd-4a3c-af7a-0af21e8aa7a1': [
          { ID: '38d73844-ebbd-4a3c-af7a-0af21e8aaaa8', Name: '鼠标' },
          { ID: '38d73844-ebbd-4a3c-af7a-0af21e8abaa8', Name: '键盘' },
          { ID: '38d73844-ebbd-4a3c-af7a-0af21e8acaa8', Name: '显视屏' },
        ]
      }
      for (let i = 0; i < properties.length; i++) {
        const oneProperty = properties[i];
        const relatedResponseItem = oneProperty['RelatedResponseItem']
        if (relatedResponseItem && IsNotEmptyGuid(relatedResponseItem.ID) && !relatedResponseItem.Name && obj[relatedResponseItem.ID]) {
          const find = obj[relatedResponseItem.ID].find((item: any) => { return item.ID == oneProperty.CurrentValue || oneProperty.DefaultValue });
          if (find) {
            oneProperty['Options'] = obj[relatedResponseItem.ID]
          }
        }
      }
      callback(properties);
    }
  }
  if (properties && properties.length > 0) {
    let listTypeIDs: any[] = [];
    let engUnitIDs = [];
    for (let i = 0; i < properties.length; i++) {
      const oneProperty = properties[i];
      const relatedResponseItem = oneProperty['RelatedResponseItem']
      const relatedEngineeringUnit = oneProperty['RelatedEngineeringUnit']
      if (relatedEngineeringUnit && IsNotEmptyGuid(relatedEngineeringUnit.ID) && !relatedEngineeringUnit.Name) {
        engUnitIDs.push(relatedEngineeringUnit.ID);
      }
      if (relatedResponseItem && IsNotEmptyGuid(relatedResponseItem.ID) && !relatedResponseItem.Name) {
        listTypeIDs.push(relatedResponseItem.ID);
      }
    }

    processEngUnit(engUnitIDs, () => {
      processListOptions(listTypeIDs, () => {
        callback(properties);
      })
    })
  } else {
    callback([]);
  }
}

export const FormatDateTimeByFormat = (_format: string, _daytime: Date) => {
  const year = _daytime.getFullYear() + '';
  const month = ((_daytime.getMonth() + 1).toString().length == 1 ? "0" + (_daytime.getMonth() + 1) : (_daytime.getMonth() + 1)) + '';
  const day = (_daytime.getDate().toString().length == 1 ? "0" + _daytime.getDate() : _daytime.getDate()) + '';
  const hour = (_daytime.getHours().toString().length == 1 ? "0" + _daytime.getHours() : _daytime.getHours()) + '';
  const minute = (_daytime.getMinutes().toString().length == 1 ? "0" + _daytime.getMinutes() : _daytime.getMinutes()) + '';
  const second = (_daytime.getSeconds().toString().length == 1 ? "0" + _daytime.getSeconds() : _daytime.getSeconds()) + '';
  return _format.replace("YYYY", year).replace("yyyy", year).replace("MM", month).replace("DD", day).replace("dd", day).replace("HH", hour).replace("hh", hour).replace("mm", minute).replace("ss", second);
}

// 安全Json解析
export const JsonParseSafe = (str: any) => {
  var res = null;
  try {
    if ((str.indexOf('{') >= 0 && str.indexOf('}') > 0) || str.indexOf('[') >= 0 && str.indexOf(']') > 0) {
      res = JSON.parse(str);
    }
  }
  catch (e) {
    res = null;
  }
  return res;
}

// 安全Json序列化
export const JsonStringifySafe = function (obj:any) {
  var res = '';
  try {
      res = JSON.stringify(obj);
  }
  catch (e) {
      res = '';
  }
  return res;
}

// 找到树中指定节点
export const FindOneByIDInTree = (
  tree: API.IMTreeNode[], // 所有树节点
  data: API.IMTreeNode[], // 当前循环的树节点
  key: string,            // 指定某节点ID
  callback: (
    node: API.IMTreeNode, // 指定某节点
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
      FindOneByIDInTree(tree, data[i].ChildList!, key, callback);
    }
  }
};

// 树转换成列表
export const ConvertToList = (tree: API.IMTreeNode[]) => {
  let list: any = [];
  if (tree && tree.length > 0) {
    for (let i = 0; i < tree.length; i++) {
      const oneNode = tree[i];
      if (oneNode.ChildList && oneNode.ChildList.length > 0) {
        let childList = ConvertToList(oneNode.ChildList);
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
