declare namespace API {
  type BooleanAPIResult = {
    /** 操作所否成功 */
    IsOk?: boolean;
    /** 错误代码 */
    ErrorID?: string;
    /** 错误信息 */
    ErrorMsg?: string;
    /** 返回对象 */
    Response?: boolean;
  };

  type deleteAttachmentIdParams = {
    /** 附件ID */
    id: string;
  };

  type deleteEngUnitIdParams = {
    /** 工程单位ID */
    id: string;
  };

  type deleteEventLevelIdParams = {
    /** 例外等级ID */
    id: string;
  };

  type deleteGlobalPropertyTemplateIdParams = {
    /** 全局属性模板ID */
    id: string;
  };

  type deleteShiftPolicyIdParams = {
    /** 轮班ID */
    id: string;
  };

  type deleteUserDefinedListIdParams = {
    /** 列表ID */
    id: string;
  };

  type deleteUserDefinedListRelationIdParams = {
    /** 列表关联关系ID */
    id: string;
  };

  type getAttachmentDownloadAttachmentIDParams = {
    /** 附件ID */
    attachmentID: string;
  };

  type getAttachmentIdParams = {
    /** 附件ID */
    id: string;
  };

  type getAttachmentNameNameParams = {
    /** 名字 */
    name: string;
  };

  type getEngUnitIdParams = {
    /** 工程单位ID */
    id: string;
  };

  type getEngUnitNameNameParams = {
    /** 名字 */
    name: string;
  };

  type getEngUnitNamesIdsParams = {
    /** 多个ID用逗号分隔 */
    ids: string;
  };

  type getEventLevelIdParams = {
    /** 例外等级ID */
    id: string;
  };

  type getEventLevelNameNameParams = {
    /** 名字 */
    name: string;
  };

  type getGlobalPropertyTemplateIdParams = {
    /** 全局属性模板ID */
    id: string;
  };

  type getGlobalPropertyTemplateListParams = {
    /** 属性模板的分类（组织单元为8，用户为9，岗位为11，其他均为作业组） */
    entityType?: IMEntityType;
  };

  type getGlobalPropertyTemplateNameNameParams = {
    /** 名字 */
    name: string;
    /** 属性类型（组织单元为8，用户为9，岗位为11，其他均为作业组） */
    entityType?: IMEntityType;
  };

  type getShiftPolicyIdParams = {
    /** 轮班ID */
    id: string;
  };

  type getShiftPolicyNameNameParams = {
    /** 名字 */
    name: string;
  };

  type getUserDefinedListChildParentIDParams = {
    /** 父节点ID，如果为Guid.Empty，表示列表，否则为列表下的列表项 */
    parentID: string;
  };

  type getUserDefinedListIdParams = {
    /** 列表（项）ID */
    id: string;
  };

  type getUserDefinedListNameParentIDNameParams = {
    /** 父节点ID，如果为空，表示顶层节点；如果为invalid，表示不指定父节点 */
    parentID: string;
    /** 名字 */
    name: string;
  };

  type getUserDefinedListRelationListRelationIDParams = {
    /** 列表关联关系ID */
    listRelationID: string;
  };

  type GuidAPIResult = {
    /** 操作所否成功 */
    IsOk?: boolean;
    /** 错误代码 */
    ErrorID?: string;
    /** 错误信息 */
    ErrorMsg?: string;
    /** 返回对象 */
    Response?: string;
  };

  type IMAttachment = {
    /** ID */
    ID?: string;
    /** 名称 */
    Name?: string;
    /** 序号 */
    SN?: number;
    /** 描述 */
    Description?: string;
    /** 源Url */
    SourceUrl?: string;
    /** 服务器端文件名 */
    ServerFileName?: string;
    /** 是否上传 */
    IsUpload?: boolean;
    /** 上传时间 */
    UploadTime?: string;
  };

  type IMAttachmentAPIResult = {
    /** 操作所否成功 */
    IsOk?: boolean;
    /** 错误代码 */
    ErrorID?: string;
    /** 错误信息 */
    ErrorMsg?: string;
    Response?: IMAttachment;
  };

  type IMAttachmentContent = {
    /** 文件名 */
    FileName?: string;
    /** 数据
            16进制字符串 */
    Data?: string;
  };

  type IMAttachmentContentAPIResult = {
    /** 操作所否成功 */
    IsOk?: boolean;
    /** 错误代码 */
    ErrorID?: string;
    /** 错误信息 */
    ErrorMsg?: string;
    Response?: IMAttachmentContent;
  };

  type IMAttachmentListAPIResult = {
    /** 操作所否成功 */
    IsOk?: boolean;
    /** 错误代码 */
    ErrorID?: string;
    /** 错误信息 */
    ErrorMsg?: string;
    /** 返回对象 */
    Response?: IMAttachment[];
  };

  type IMDataType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

  type IMEngUnit = {
    /** ID */
    ID?: string;
    /** 名称 */
    Name?: string;
    /** 描述 */
    Description?: string;
    /** 序号 */
    SN?: number;
  };

  type IMEngUnitAPIResult = {
    /** 操作所否成功 */
    IsOk?: boolean;
    /** 错误代码 */
    ErrorID?: string;
    /** 错误信息 */
    ErrorMsg?: string;
    Response?: IMEngUnit;
  };

  type IMEngUnitListAPIResult = {
    /** 操作所否成功 */
    IsOk?: boolean;
    /** 错误代码 */
    ErrorID?: string;
    /** 错误信息 */
    ErrorMsg?: string;
    /** 返回对象 */
    Response?: IMEngUnit[];
  };

  type IMEntityType =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 30
    | 50
    | 51
    | 52
    | 53
    | 54
    | 55
    | 56
    | 57
    | 58
    | 59
    | 80
    | 81
    | 90
    | 91
    | 100
    | 101
    | 201
    | 210;

  type IMEventLevel = {
    /** ID */
    ID?: string;
    /** 名称 */
    Name?: string;
    /** 序号 */
    SN?: number;
    /** 描述 */
    Description?: string;
    /** 等级（正整数） */
    Level?: number;
    /** 颜色 */
    Color?: number;
    /** 图标名 */
    IconName?: string;
    /** 图标类型 */
    IconType?: string;
    /** 图标数据 */
    IconData?: string;
  };

  type IMEventLevelAPIResult = {
    /** 操作所否成功 */
    IsOk?: boolean;
    /** 错误代码 */
    ErrorID?: string;
    /** 错误信息 */
    ErrorMsg?: string;
    Response?: IMEventLevel;
  };

  type IMEventLevelListAPIResult = {
    /** 操作所否成功 */
    IsOk?: boolean;
    /** 错误代码 */
    ErrorID?: string;
    /** 错误信息 */
    ErrorMsg?: string;
    /** 返回对象 */
    Response?: IMEventLevel[];
  };

  type IMGlobalPropertyTemplate = {
    /** ID */
    ID?: string;
    /** 名称 */
    Name?: string;
    /** 序号 */
    SN?: number;
    RelatedResponseItem?: IMRelatedInfo;
    RelatedEngineeringUnit?: IMRelatedInfo;
    ValueType?: IMDataType;
    /** 属性值的格式 */
    ValueFormat?: string;
    /** 属性默认值 */
    DefaultValue?: string;
    /** 终端是否同步 */
    IsMobileSync?: boolean;
    /** 属性默认值 */
    EntityType?: string;
  };

  type IMGlobalPropertyTemplateAPIResult = {
    /** 操作所否成功 */
    IsOk?: boolean;
    /** 错误代码 */
    ErrorID?: string;
    /** 错误信息 */
    ErrorMsg?: string;
    Response?: IMGlobalPropertyTemplate;
  };

  type IMGlobalPropertyTemplateListAPIResult = {
    /** 操作所否成功 */
    IsOk?: boolean;
    /** 错误代码 */
    ErrorID?: string;
    /** 错误信息 */
    ErrorMsg?: string;
    /** 返回对象 */
    Response?: IMGlobalPropertyTemplate[];
  };

  type IMIDName = {
    /** ID */
    ID?: string;
    /** 名字 */
    Name?: string;
  };

  type IMIDNameListAPIResult = {
    /** 操作所否成功 */
    IsOk?: boolean;
    /** 错误代码 */
    ErrorID?: string;
    /** 错误信息 */
    ErrorMsg?: string;
    /** 返回对象 */
    Response?: IMIDName[];
  };

  type IMListRelation = {
    /** ID */
    ID?: string;
    /** 名称 */
    Name?: string;
    /** 列 */
    Columns?: string[];
    /** 所有行 */
    Rows?: string[][];
  };

  type IMListRelationAPIResult = {
    /** 操作所否成功 */
    IsOk?: boolean;
    /** 错误代码 */
    ErrorID?: string;
    /** 错误信息 */
    ErrorMsg?: string;
    Response?: IMListRelation;
  };

  type IMListRelationListAPIResult = {
    /** 操作所否成功 */
    IsOk?: boolean;
    /** 错误代码 */
    ErrorID?: string;
    /** 错误信息 */
    ErrorMsg?: string;
    /** 返回对象 */
    Response?: IMListRelation[];
  };

  type IMRelatedInfo = {
    /** ID */
    ID?: string;
    /** 名字 */
    Name?: string;
  };

  type IMShift = {
    /** ID */
    ID?: string;
    /** 名称 */
    Name?: string;
    /** 开始时间 */
    StartTime?: string;
    /** 结束时间 */
    EndTime?: string;
    /** 班次颜色 */
    Color?: number;
  };

  type IMShiftPolicy = {
    /** ID */
    ID?: string;
    /** 名称 */
    Name?: string;
    /** 序号 */
    SN?: number;
    /** 描述 */
    Description?: string;
    /** 轮班制度下班次列表 */
    Shifts?: IMShift[];
  };

  type IMShiftPolicyAPIResult = {
    /** 操作所否成功 */
    IsOk?: boolean;
    /** 错误代码 */
    ErrorID?: string;
    /** 错误信息 */
    ErrorMsg?: string;
    Response?: IMShiftPolicy;
  };

  type IMShiftPolicyListAPIResult = {
    /** 操作所否成功 */
    IsOk?: boolean;
    /** 错误代码 */
    ErrorID?: string;
    /** 错误信息 */
    ErrorMsg?: string;
    /** 返回对象 */
    Response?: IMShiftPolicy[];
  };

  type IMTreeNode = {
    /** 节点ID */
    ID?: string;
    /** 节点名称 */
    Name?: string;
    EntityType?: IMEntityType;
    /** 其它属性 */
    ExProperty?: string;
    /** 子节点列表 */
    ChildList?: IMTreeNode[];
  };

  type IMTreeNodeListAPIResult = {
    /** 操作所否成功 */
    IsOk?: boolean;
    /** 错误代码 */
    ErrorID?: string;
    /** 错误信息 */
    ErrorMsg?: string;
    /** 返回对象 */
    Response?: IMTreeNode[];
  };

  type IMUserDefinedList = {
    /** ID */
    ID?: string;
    /** 名称 */
    Name?: string;
    /** 序号 */
    SN?: number;
    /** 描述 */
    Description?: string;
    Type?: IMEntityType;
    /** 父节点ID */
    ParentID?: string;
  };

  type IMUserDefinedListAPIResult = {
    /** 操作所否成功 */
    IsOk?: boolean;
    /** 错误代码 */
    ErrorID?: string;
    /** 错误信息 */
    ErrorMsg?: string;
    Response?: IMUserDefinedList;
  };

  type IMUserDefinedListListAPIResult = {
    /** 操作所否成功 */
    IsOk?: boolean;
    /** 错误代码 */
    ErrorID?: string;
    /** 错误信息 */
    ErrorMsg?: string;
    /** 返回对象 */
    Response?: IMUserDefinedList[];
  };

  type putAttachmentUploadIdUrlParams = {
    /** 附件ID */
    id: string;
    /** 要上载的附件Url */
    url: string;
  };

  type putAttachmentValidateParams = {
    /** 验证的附件 */
    id?: string;
  };

  type putEngUnitValidateIdParams = {
    /** 验证的工程单位id */
    id: string;
  };

  type putEventLevelValidateParams = {
    /** 验证的例外等级 */
    id?: string;
  };

  type putGlobalPropertyTemplateValidateParams = {
    /** 验证的全局属性模板 */
    id?: string;
  };

  type putShiftPolicyValidateParams = {
    /** 验证的轮班 */
    id?: string;
  };

  type putUserDefinedListValidateParams = {
    /** 验证的id */
    id?: string;
  };
}
