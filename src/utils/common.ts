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
