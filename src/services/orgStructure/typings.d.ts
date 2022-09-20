declare namespace API {
  type deleteBusinessDimensionIdParams = {
    /** 业务范畴ID */
    id: string;
  };

  type deleteOrgUnitIdParams = {
    /** 组织单元ID */
    id: string;
  };

  type deletePostIdParams = {
    /** 岗位ID */
    id: string;
  };

  type deleteUserIdParams = {
    /** 用户ID */
    id: string;
  };

  type getBusinessDimensionChildParentIDParams = {
    /** 父节点ID。如果为Guid.Empty，表示业务范畴分类，否则为业务范畴分类下的业务范畴 */
    parentID: string;
  };

  type getBusinessDimensionIdParams = {
    /** 业务范畴ID */
    id: string;
  };

  type getBusinessDimensionNameParentIDNameParams = {
    /** 父节点ID，如果为空，表示顶层节点；如果为invalid，表示不指定父节点 */
    parentID: string;
    /** 名字 */
    name: string;
  };

  type getOrgUnitChildParentIDParams = {
    /** 父节点ID，如果为空，表示顶层组织单元 */
    parentID: string;
  };

  type getOrgUnitIdParams = {
    /** 组织单元ID */
    id: string;
  };

  type getOrgUnitNameParentIDNameParams = {
    /** 父节点ID，如果为空，表示顶层节点；如果为invalid，表示不指定父节点 */
    parentID: string;
    /** 名字 */
    name: string;
  };

  type getOrgUnitShiftIdParams = {
    /** 组织单元ID */
    id: string;
  };

  type getPostNameNameParams = {
    /** 名字 */
    name: string;
  };

  type getPostParams = {
    /** 岗位ID */
    id?: string;
  };

  type getUserBaseInfoPostPostIDsParams = {
    /** 岗位ID，多个之间是有逗号分隔 */
    postIDs: string;
  };

  type getUserBusinessDimensionBusinessDimensionIDParams = {
    /** 业务范畴ID */
    businessDimensionID: string;
  };

  type getUserChildParentIDParams = {
    /** 父节点ID，如果为空，表示顶层用户 */
    parentID: string;
  };

  type getUserIdLoginNameParams = {
    /** 用户登录名 */
    loginName: string;
  };

  type getUserIdParams = {
    /** 用户ID */
    id: string;
  };

  type getUserListParams = {
    /** 是否包含角色 */
    withRoles?: boolean;
  };

  type getUserNameParentIDNameParams = {
    /** 父节点ID，如果为空，表示顶层节点；如果为invalid，表示不指定父节点 */
    parentID: string;
    /** 名字 */
    name: string;
  };

  type getUserOrgUnitOrgUnitIDParams = {
    /** 组织单元ID */
    orgUnitID: string;
  };

  type getUserOrgUnitOrgUnitIDWithRolesParams = {
    /** 组织单元ID */
    orgUnitID: string;
    /** 是否携带角色 */
    withRoles: boolean;
  };

  type getUserPostPostIDParams = {
    /** 岗位ID */
    postID: string;
  };

  type getUserRoleIdParams = {
    /** 用户ID */
    id: string;
  };

  type IMBusinessDimension = {
    /** ID */
    ID?: string;
    /** 名称 */
    Name?: string;
    /** 描述 */
    Description?: string;
    /** 序号 */
    SN?: number;
    Type?: IMEntityType;
    /** 父节点ID */
    ParentID?: string;
  };

  type IMDayRoster = {
    /** 日期 */
    Date?: string;
    /** 当天班次和组织单元关系 */
    ShiftOrgUnitList?: IMShiftOrgUnit[];
  };

  type IMDutyRoster = {
    ParentOrgUnit?: IMOrgUnit;
    ShiftPolicy?: IMShiftPolicy;
    /** 开始日期 */
    StartDate?: string;
    /** 结束日期 */
    EndDate?: string;
    /** 每天排班列表 */
    DayRosterList?: IMDayRoster[];
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

  type IMOrgUnit = {
    /** ID */
    ID?: string;
    /** 名称 */
    Name?: string;
    /** 描述 */
    Description?: string;
    /** 序号 */
    SN?: number;
    /** 所属组织单元ID */
    ParentOrgUnitID?: string;
    /** 是否设置了管辖的资产 */
    IsSetAsset?: boolean;
    /** 管辖范围自动应用到子资产 */
    IsAutoApplyChild?: boolean;
    /** 自定义属性 */
    CustomProperty?: string;
    /** 所管辖的资产列表 */
    AssetIDList?: string[];
    /** 所用的轮班制度实例列表 */
    FOUShiftList?: IMOUShift[];
  };

  type IMOUShift = {
    /** ID */
    ID?: string;
    /** 名称 */
    Name?: string;
    /** 序号 */
    SN?: number;
    /** 轮班制度模板 ID */
    ShiftPolicyID?: string;
    /** 所属组织单元ID */
    OrgUnitID?: string;
    /** 起始日期 */
    StartDate?: string;
    /** 结束日期，默认为 DateTime.MaxValue */
    EndDate?: string;
    /** 轮转周期天数 */
    CycleDay?: number;
    /** 轮转周期排班序列列表 */
    FShiftCycleList?: IMShiftCycle[];
  };

  type IMPost = {
    /** ID */
    ID?: string;
    /** 名称 */
    Name?: string;
    /** 序号 */
    SN?: number;
    /** 描述 */
    Description?: string;
    /** 自定义属性 */
    CustomProperty?: string;
  };

  type IMRelatedInfo = {
    /** ID */
    ID?: string;
    /** 名字 */
    Name?: string;
  };

  type IMRole = {
    /** ID */
    ID?: string;
    /** 名称 */
    Name?: string;
    RelatedOrgUnit?: IMRelatedInfo;
    RelatedPost?: IMRelatedInfo;
    /** 角色业务范畴列表 */
    RelatedBusinessDimensions?: IMRelatedInfo[];
  };

  type IMShift = {
    /** ID */
    ID?: string;
    /** 名称 */
    Name?: string;
  };

  type IMShiftCycle = {
    /** 轮班制度实例ID */
    OUShiftID?: string;
    /** 轮班周期中第几天 */
    Day?: number;
    /** 轮班制度中的班次 */
    ShiftID?: string;
    /** 排班的组织单元 */
    OrgUnitID?: string;
  };

  type IMShiftOrgUnit = {
    /** 班次ID */
    ShiftID?: string;
    /** 组织单元ID */
    OrgUnitID?: string;
  };

  type IMShiftPolicy = {
    /** ID */
    ID?: string;
    /** 名称 */
    Name?: string;
    /** 序号 */
    SN?: number;
    /** 轮班制度下班次列表 */
    Shifts?: IMShift[];
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

  type IMTreeNodeUser = {
    /** 节点ID */
    ID?: string;
    /** 节点名称 */
    Name?: string;
    EntityType?: IMEntityType;
    /** 其它属性 */
    ExProperty?: string;
    /** 子节点列表 */
    ChildList?: IMTreeNodeUser[];
    UserInfo?: IMUser;
  };

  type IMUser = {
    /** ID */
    ID?: string;
    /** 名称 */
    Name?: string;
    /** 序号 */
    SN?: number;
    /** 登录名 */
    LoginName?: string;
    /** 登录密码 */
    Password?: string;
    /** 邮件地址 */
    EMail?: string;
    /** 手机号码 */
    MobilePhone?: string;
    UserType?: IMUserType;
    /** 用户角色列表 */
    UserRoles?: IMRole[];
    /** 父节点ID */
    ManagerID?: string;
    /** 是否多用角色登陆 */
    IsMultiRoseLogin?: boolean;
    /** 是否为后台专家 */
    IsExpert?: boolean;
    /** 用户是否停用 */
    IsStop?: boolean;
    /** 自定义属性 */
    CustomProperty?: string;
    /** 上次修改密码时间 */
    PasswordLastModifyTime?: string;
    /** 密码连续输入错误次数 */
    PasswordErrorCount?: number;
    /** 是否锁定 */
    IsLock?: boolean;
    /** 锁定时间 */
    LockTime?: string;
  };

  type IMUserType = 0 | 1 | 2;

  type postOrgUnitDutyRosterParams = {
    /** 开始日期 */
    startDate?: string;
    /** 结束日期 */
    endDate?: string;
  };

  type putUserIsStopIdStateParams = {
    /** 用户id */
    id: string;
    /** true为停用，false为启用 */
    state: boolean;
  };

  type putUserRoleIdParams = {
    /** 用户ID */
    id: string;
  };

  type StringAPIResult = {
    /** 操作所否成功 */
    IsOk?: boolean;
    /** 错误代码 */
    ErrorID?: string;
    /** 错误信息 */
    ErrorMsg?: string;
    /** 返回对象 */
    Response?: string;
  };

  type StringMutilAPIResult = {
    /** 成功的数量 */
    SuccessCount?: number;
    /** 失败的数量 */
    FailCount?: number;
    /** 跳过的树 */
    SkipCount?: number;
    /** 操作所否成功 */
    IsOk?: boolean;
    /** 错误代码 */
    ErrorID?: string;
    /** 错误信息 */
    ErrorMsg?: string;
    /** 每个操作详细结果 */
    ResultList?: StringAPIResult[];
  };
}
