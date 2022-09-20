declare namespace API {
  type deleteAssetIdParams = {
    /** 资产ID */
    id: string;
  };

  type deleteAssetTypeIdParams = {
    /** 资产类别ID */
    id: string;
  };

  type getAssetChildParentIDParams = {
    /** 父节点ID，如果为空，表示顶层资产 */
    parentID: string;
  };

  type getAssetIdParams = {
    /** 资产ID */
    id: string;
  };

  type getAssetMarkMarkParams = {
    /** 资产号 */
    mark: string;
  };

  type getAssetNameParentIDNameParams = {
    /** 父节点ID，如果为空，表示顶层节点；如果为invalid，表示不指定父节点 */
    parentID: string;
    /** 名字 */
    name: string;
  };

  type getAssetPropertyAssetIDParams = {
    /** 资产ID */
    assetID: string;
  };

  type getAssetPropertyAssetIDPropertyNameParams = {
    /** 资产ID */
    assetID: string;
    /** 属性名 */
    propertyName: string;
  };

  type getAssetTreeAssetTypeNamesParams = {
    /** 资产类别名称，多个资产类别名称用英文逗号分隔 */
    assetTypeNames: string;
  };

  type getAssetTypeAssetTypeIDParams = {
    /** 资产类别ID */
    assetTypeID: string;
  };

  type getAssetTypeChildParentIDParams = {
    /** 父节点ID。如果为Guid.Empty，表示顶层资产类别 */
    parentID: string;
  };

  type getAssetTypeIdParams = {
    /** 资产类别ID */
    id: string;
  };

  type getAssetTypeNameNameParams = {
    /** 名字 */
    name: string;
  };

  type getAssetTypePropertyAssetTypeIDParams = {
    /** 资产类别ID */
    assetTypeID: string;
  };

  type IMAsset = {
    /** ID */
    ID?: string;
    /** 名称 */
    Name?: string;
    /** 描述 */
    Description?: string;
    /** 序号 */
    SN?: number;
    /** 父级资产ID */
    ParentAssetID?: string;
    /** 资产号（用于系统内部管理和识别） */
    Mark?: string;
    /** 是否是位置标签，默认为是 */
    IsPosition?: boolean;
    /** 位置名称，默认为资产名称 */
    PositionName?: string;
    /** 是否为扫描点 */
    IsEnabledScan?: boolean;
    RelatedAssetType?: IMRelatedInfo;
    /** 资产属性 */
    Properties?: IMAssetProperty[];
    /** 无感解锁精度(单位厘米) */
    NoSenseUnlockAccuracy?: number;
    /** 是否使用资产类别的关联物料 */
    IsUseAssetTypeRelatedMaterielIDList?: boolean;
    /** 关联物料IDList */
    RelatedMaterielIDList?: string;
  };

  type IMAssetProperty = {
    /** ID */
    ID?: string;
    /** 名称 */
    Name?: string;
    /** 描述 */
    Description?: string;
    /** 序号 */
    SN?: number;
    RelatedAsset?: IMRelatedInfo;
    RelatedAssetTypeProperty?: IMRelatedInfo;
    RelatedResponseItem?: IMRelatedInfo;
    RelatedEngineeringUnit?: IMRelatedInfo;
    ValueType?: IMDataType;
    /** 属性值的格式 */
    ValueFormat?: string;
    /** 属性默认值 */
    DefaultValue?: string;
    /** 属性当前值 */
    CurrentValue?: string;
    /** 属性当前值修改时间 */
    ModifyValueOn?: string;
    /** 是否不保存历史 */
    IsNotSaveHistory?: boolean;
    /** 终端是否同步 */
    IsMobileSync?: boolean;
    /** 是否为外部属性 */
    IsTelemeteringData?: boolean;
    /** 外部Tag */
    ExtTag?: string;
    /** 外部属性报警配置 */
    TelemeteringAlertConfig?: string;
    /** 不可查看 */
    Invisible?: boolean;
    /** 分组名 */
    GroupName?: string;
  };

  type IMAssetType = {
    /** ID */
    ID?: string;
    /** 名称 */
    Name?: string;
    /** 描述 */
    Description?: string;
    /** 序号 */
    SN?: number;
    /** 父ID */
    ParentID?: string;
    /** 关联物料IDList */
    RelatedMaterielIDList?: string;
    /** 扩展参数 */
    Ext?: string;
    /** 资产类别属性 */
    Properties?: IMAssetTypeProperty[];
  };

  type IMAssetTypeProperty = {
    /** ID */
    ID?: string;
    /** 名称 */
    Name?: string;
    /** 描述 */
    Description?: string;
    /** 序号 */
    SN?: number;
    RelatedAssetType?: IMRelatedInfo;
    RelatedResponseItem?: IMRelatedInfo;
    RelatedEngineeringUnit?: IMRelatedInfo;
    ValueType?: IMDataType;
    /** 属性值的格式 */
    ValueFormat?: string;
    /** 属性默认值 */
    DefaultValue?: string;
    /** 是否不保存历史 */
    IsNotSaveHistory?: boolean;
    /** 终端是否同步 */
    IsMobileSync?: boolean;
    /** 是否为外部属性 */
    IsTelemeteringData?: boolean;
    /** 外部属性报警配置 */
    TelemeteringAlertConfig?: string;
    /** 不可查看 */
    Invisible?: boolean;
    /** 分组名列表 */
    GroupName?: string;
  };

  type IMDataType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

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

  type IMRelatedInfo = {
    /** ID */
    ID?: string;
    /** 名字 */
    Name?: string;
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

  type postAssetPropertyAssetIDParams = {
    /** 资产ID */
    assetID: string;
  };

  type putAssetTypePropertyAtidParams = {
    /** 资产类别id */
    atid: string;
  };
}
