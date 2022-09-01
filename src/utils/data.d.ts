
export type propertyDataType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
// List: 0,    //列表
// Number: 1,    //数值
// String: 2,    //字符串
// CanInputList: 3,    //可输入列表
// Signature: 4,    //签名
// Date: 5,    //日期时间
// FileProperty: 6,    //文件
// MutilList: 7,    //多选
// JsonString: 8    // json



export type entityType = {
  UnKnow: 0,    //    未知
  Project: 1,    //   工程
  Attachment: 2,    //   附件
  BusinessDimensionClass: 3,    //   业务范畴分类
  BusinessDimension: 4,    //   业务范畴
  EngUnit: 5,    //   工程单位
  UserDefinedList: 6,    //   自定义列表
  UserDefinedListItem: 7,    //   自定义列表项
  OrgUnit: 8,    //  组织单元
  User: 9,    //  用户
  Post: 10,    //  岗位
  Role: 11,    //  角色
  Asset: 12,    //  资产
  AssetType: 13,    //  资产类型
  AssetProperty: 14,    //  资产属性
  AssetTypeProperty: 15,    //  资产类别属性
  EventLevel: 16,    //  例外等级
  GlobalPropertyTemplate: 17,    //  全局属性模板
  ShiftPolicy: 18,    // 轮班
  BusinessProcess: 30,    //  业务流程
  TaskTemplate: 50,    //  作业模板
  TaskItemTemplate: 51,    //  作业项模板
  TaskGroupTemplate: 52,    //  作业组模板
  Task: 53,    //  作业
  TaskItem: 54,    //  作业项
  TaskGroup: 55,    //  作业组
  TaskStandard: 56,    //  作业规范
  Tag: 57,    //  标签
  Logic: 58,    //  逻辑
  Expression: 59,    //  表达式
  TaskGroupPlan: 80,    //  作业组计划
  TaskJob: 81,    //  作业任务
  TaskGroupTemplateProperty: 90,    //  作业组模板属性
  TaskGroupProperty: 91,    //  作业组属性
  ServiceProjectTemplate: 100,    //  项目模板
  ServiceProject: 101,    //  项目
  SDCConfig: 201,    // 设置
  ListRelation: 210    //  列表关联关系
}

export type RelatedInfo = {
  ID: string;
  Name: string | null;
}

export type Property = {
  ID?: string;
  Name: string;
  ValueType: propertyDataType;
  RelatedResponseItem?: RelatedInfo;
  ValueFormat?: string;
  DefaultValue?: string;
  CurrentValue?: string;
  RelatedEngineeringUnit?: RelatedInfo;
  IsMobileSync: boolean | false;
  Invisible: boolean | false;
}
