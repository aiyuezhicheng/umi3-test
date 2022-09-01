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
export const IsGuid = function (value: string) {
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

// 处理工程单位和列表项
export function ProcessListOptionsAndEngUnit(properties: any[], callback: any) {
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
        '8626dc3b-9af0-4641-8a88-4479491fa9b5': [
          { ID: '8626dc3b-9af0-4641-8a88-4479491fa9b5', Name: '是' },
          { ID: '1e6761d1-e8c2-4b03-b659-2043416cda2e', Name: '否' },
        ],
        '48d73844-ebbd-4a3c-af7a-0af21e8aa7a8': [
          { ID: '48d73844-ebbd-4a3c-af7a-0af21e8aa7a8', Name: '周一' },
          { ID: '周二0000', Name: '周二' },
          { ID: '周三0000', Name: '周三' },
          { ID: '周四0000', Name: '周四' },
          { ID: '周五0000', Name: '周五' },
          { ID: '周六0000', Name: '周六' },
        ]
      }
      for (let i = 0; i < properties.length; i++) {
        const oneProperty = properties[i];
        const relatedResponseItem = oneProperty['RelatedResponseItem']
        if (relatedResponseItem && IsNotEmptyGuid(relatedResponseItem.ID) && !relatedResponseItem.Name && obj[relatedResponseItem.ID]) {
          const find = obj[relatedResponseItem.ID].find((item: any) => { return item.ID == relatedResponseItem.ID });
          if (find) {
            relatedResponseItem['Name'] = find['Name'];
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
