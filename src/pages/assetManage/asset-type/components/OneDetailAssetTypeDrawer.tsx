import { TableOutlined } from '@ant-design/icons';
import {
  Button,
  message,
  Input,
  Drawer,
  Tabs,
  Form,
  Select,
  TreeSelect,
  List,
  Row,
  Col,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useRequest, useIntl, FormattedMessage, useModel } from 'umi';
import PropertyModal from '@/components/OnePropertyModal';
import { AssetTypePropertyItem } from '../data.d';
import { ProcessListOptionsAndEngUnit, IsNotEmptyGuid, FindOneByIDInTree } from '@/utils/common';
import { getMaterialList, getOneAssetTypeProperties } from '../service';

import { getAssetTypeId as queryOneAssetTypeByID } from '@/services/asset/AssetType';
import { GuidEmpty } from '../../../../utils/common';

export type detailProps = {
  action: string;
  id?: string;
  visible: boolean;
  onClose?: (e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void;
  newKey?: string;
};

const { TabPane } = Tabs;
const { TextArea } = Input;
const OneDetailAssetTypeDrawer: React.FC<detailProps> = (props) => {
  const { tree, addOne, editOne } = useModel('assetType');
  const { action, visible, id, onClose, newKey } = props;
  const [tabActivityKey, setTabActivityKey] = useState<string>('basicInfo');
  const [isPropertyModalVisible, setIsPropertyModalVisible] = useState<boolean>(false);
  const [properties, setProperties] = useState<AssetTypePropertyItem[]>([]);
  const [basicInfoForm] = Form.useForm();

  useEffect(() => {
    // 新建设备或新建数据源有初始默认值
    if (action == 'new') {
      let name = '';
      let description = '';
      let ext = '';
      if (newKey) {
        switch (newKey) {
          case 'smartLock': // 智能锁
            name = '智能锁';
            ext = JSON.stringify({
              DllName: '',
              ClassName: 'iDong.imgenius.Device.SmartLock',
              OpList: [{ Name: '获取秘钥', FuncName: 'GetLOCKSecretKey' }],
            });
            break;
          case 'smartCar': // 智能车
            name = '智能车';
            ext = JSON.stringify({
              DllName: '',
              ClassName: 'iDong.imgenius.Device.SmartCar',
              OpList: [{ Name: '调度智能车', FuncName: 'HandlingTools' }],
            });
            break;
          case 'camera': // 摄像头
            name = '摄像头';
            ext = JSON.stringify({
              DllName: '',
              ClassName: 'iDong.imgenius.Device.Camera',
              OpList: [{ Name: '旋转摄像头', FuncName: 'RotatingCamera' }],
            });
            break;
          case 'cctv': // CCTV
            name = 'CCTV';
            ext = JSON.stringify({
              DllName: '',
              ClassName: 'iDong.imgenius.Device.CCTV',
              OpList: [{ Name: '调整显示场景', FuncName: 'CallCCTV' }],
            });
            break;
          case 'inkBottle-yanhua': // 智能车
            name = '墨水瓶-研华';
            ext = JSON.stringify({
              DllName: '',
              ClassName: 'iDong.imgenius.Device.ePaper',
              OpList: [{ Name: '更新墨水屏', FuncName: 'Show' }],
            });
            break;

          case 'inkBottle-zhikong': // 电子墨水屏-智控
            name = '电子墨水屏-智控';
            ext = JSON.stringify({
              DllName: '',
              ClassName: 'iDong.imgenius.Device.ePaper_ZK',
              OpList: [{ Name: '更新墨水屏_智控', FuncName: 'Show' }],
            });
            break;
          case 'opcda': // OPCDA
            name = 'OPCDAClient';
            description = 'OPC DA';
            break;
          case 'opcua': // OPCDA
            name = 'OPCUAClient';
            description = 'OPC UA';
            break;
          case 'mqtt': // MQTT
            name = 'MQTTSub';
            description = 'MQTT订阅';
            break;
        }
      }
      const newBasicInfo = {
        ParentID: '',
        Name: name,
        Description: description,
        RelatedMaterielIDList: '',
        Ext: ext,
      };
      basicInfoForm.setFieldsValue(newBasicInfo);
    }
  }, [newKey]);

  useEffect(() => {
    if (id) {
      queryOneAssetTypeByID({ id }).then((result: API.AssetTypeAPIResult) => {
        if (result.IsOk) {
          let oneAssetType = result.Response as API.IMAssetType;
          if (oneAssetType.ParentID == GuidEmpty) {
            oneAssetType.ParentID = '';
          }
          basicInfoForm.setFieldsValue(oneAssetType);
        } else {
          message.error(
            <>
              <FormattedMessage
                id="pages.message.api.errorReason"
                defaultMessage="调用接口失败的原因为："
              />
              {result.ErrorMsg}
            </>,
          );
        }
      });
    }
  }, [id]);

  const { data: materialList } = useRequest(getMaterialList);

  const changeTabPane = (activeKey: string) => {
    setTabActivityKey(activeKey);
    if (activeKey == 'property') {
      getOneAssetTypeProperties(id!).then((result) => {
        const { data: properties } = result;
        ProcessListOptionsAndEngUnit(properties, (newProperties: any) => {
          setProperties(newProperties);
        });
      });
    }
  };

  // 标题
  const renderDrawerTitle = () => {
    let title = '';
    switch (action) {
      case 'new':
        title = useIntl().formatMessage({
          id: 'pages.operation.new',
          defaultMessage: '新建',
        });
        break;
      case 'edit':
        title = useIntl().formatMessage({
          id: 'pages.operation.edit',
          defaultMessage: '编辑',
        });
        break;
      case 'copy':
        title = useIntl().formatMessage({
          id: 'pages.operation.copy',
          defaultMessage: '拷贝',
        });
        break;
      default:
        break;
    }
    return title;
  };

  // 搜索物料
  const onSearchRelativeMaterial = (value: string) => {
    console.log('search' + value);
  };

  // 判断资产类别名称是否重名
  const judgeIsDuplicateName = (value: string, list: any) => {
    if (list && list.length > 0) {
      for (let i = 0; i < list.length; i++) {
        if (list[i]['Name'] == value) {
          return false;
        }
        const children = list[i]['ChildList'];
        if (children && children.length > 0) {
          const result = judgeIsDuplicateName(value, children);
          if (!result) {
            return false;
          }
        }
      }
      return true;
    } else {
      return true;
    }
  };

  // 对话框的确认
  const handleOk = () => {
    setIsPropertyModalVisible(false);
  };

  // 对话框的取消
  const handleCancel = () => {
    setIsPropertyModalVisible(false);
  };

  // 显示该资产类别的属性值
  const renderOneProeprtyValue = (item: AssetTypePropertyItem) => {
    let value = item['CurrentValue'] || item['DefaultValue'];
    if (
      value &&
      item['Options'] &&
      (item['ValueType'] == 0 || item['ValueType'] == 3 || item['ValueType'] == 7)
    ) {
      if (IsNotEmptyGuid(value) && (item['ValueType'] == 0 || item['ValueType'] == 3)) {
        const find = item['Options'].find(
          (oneOption: { ID: string; Name: string }) => oneOption.ID == value,
        );
        if (find) {
          value = find['Name'];
        }
      } else if (item['ValueType'] == 7) {
        const list = JSON.parse(value);
        value = list.map((item: any) => item.Name).join(',');
      }
    }
    if (item.ValueType == 1 && item.RelatedEngineeringUnit?.Name) {
      value += ' ' + item.RelatedEngineeringUnit?.Name;
    }
    return value;
  };

  // 收集一个资产类别
  const handleCollectOneAssetType = () => {
    const basicInfoAfterEdit = basicInfoForm.getFieldsValue();
    if (id && action == 'edit') {
      basicInfoAfterEdit['ID'] = id;
    } else {
      delete basicInfoAfterEdit['ID'];
      basicInfoAfterEdit['Properties'] = null;
    }
    if (basicInfoAfterEdit.ParentID == '') {
      basicInfoAfterEdit.ParentID = GuidEmpty;
    }
    if (action == 'new' || action == 'copy') {
      const addOneFunc = () => {
        addOne(basicInfoAfterEdit).then((result) => {
          if (result.IsOk) {
            message.success(
              <FormattedMessage id="pages.message.add.success" defaultMessage="新增成功!" />,
            );
          } else {
            message.success(
              <>
                <FormattedMessage
                  id="pages.message.api.errorReason"
                  defaultMessage="调用接口失败的原因为："
                />
                {result.ErrorMsg}
              </>,
            );
          }
        });
      };
      if (basicInfoAfterEdit.ParentID == GuidEmpty) {
        basicInfoAfterEdit.SN = tree.length + 1;
        addOneFunc();
      } else {
        FindOneByIDInTree(tree, tree, basicInfoAfterEdit.ParentID, (parentNode) => {
          basicInfoAfterEdit.SN = parentNode.ChildList ? parentNode.ChildList.length + 1 : 0;
          addOneFunc();
        });
      }
    } else {
      editOne(basicInfoAfterEdit).then((result) => {
        if (result.IsOk) {
          message.success(
            <FormattedMessage id="pages.message.edit.success" defaultMessage="编辑成功!" />,
          );
        } else {
          message.success(
            <>
              <FormattedMessage
                id="pages.message.api.errorReason"
                defaultMessage="调用接口失败的原因为："
              />
              {result.ErrorMsg}
            </>,
          );
        }
      });
    }
  };

  return (
    <>
      <Drawer
        title={renderDrawerTitle()}
        width={600}
        visible={visible}
        onClose={onClose}
        forceRender
      >
        <Tabs type="card" activeKey={tabActivityKey} onChange={changeTabPane}>
          <TabPane
            tab={useIntl().formatMessage({
              id: 'pages.configDrawer.tab.basicInfo',
              defaultMessage: '基本信息',
            })}
            key="basicInfo"
          >
            <Form
              layout="horizontal"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              form={basicInfoForm}
              onFinish={onClose}
            >
              <Form.Item
                name="ParentID"
                label={useIntl().formatMessage({
                  id: 'pages.basicInfo.parentname',
                  defaultMessage: '父级名称',
                })}
              >
                <TreeSelect
                  key="ID"
                  showSearch={true}
                  allowClear
                  style={{ width: '100%' }}
                  fieldNames={{ label: 'Name', value: 'ID', children: 'ChildList' }}
                  placeholder={useIntl().formatMessage({
                    id: 'pages.basicInfo.parentname',
                    defaultMessage: '父级名称',
                  })}
                  treeData={tree}
                />
              </Form.Item>
              <Form.Item
                name="Name"
                label={useIntl().formatMessage({
                  id: 'pages.basicInfo.name',
                  defaultMessage: '名称',
                })}
                rules={[
                  {
                    required: true,
                    message: useIntl().formatMessage({
                      id: 'pages.message.name.required.message',
                      defaultMessage: '名称不能为空',
                    }),
                  },
                ]}
              >
                <Input
                  placeholder={useIntl().formatMessage({
                    id: 'pages.basicInfo.name',
                    defaultMessage: '名称',
                  })}
                />
              </Form.Item>
              <Form.Item
                name="Description"
                label={useIntl().formatMessage({
                  id: 'pages.basicInfo.description',
                  defaultMessage: '描述',
                })}
              >
                <TextArea
                  placeholder={useIntl().formatMessage({
                    id: 'pages.basicInfo.description',
                    defaultMessage: '描述',
                  })}
                  rows={4}
                />
              </Form.Item>
              <Form.Item
                name="RelatedMaterielIDList"
                label={useIntl().formatMessage({
                  id: 'pages.basicInfo.raletiveMaterial',
                  defaultMessage: '相关物料',
                })}
              >
                <Select
                  showSearch
                  placeholder={useIntl().formatMessage({
                    id: 'pages.basicInfo.raletiveMaterial',
                    defaultMessage: '相关物料',
                  })}
                  onSearch={onSearchRelativeMaterial}
                  filterOption={(input, option) =>
                    (option!.children as unknown as string)
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                >
                  {materialList?.map((item: any) => {
                    return (
                      <Select.Option value={item.ID} key={item.ID}>
                        {item.Name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name="Ext"
                label={useIntl().formatMessage({
                  id: 'pages.basicInfo.ext',
                  defaultMessage: '扩展',
                })}
              >
                <TextArea
                  placeholder={useIntl().formatMessage({
                    id: 'pages.basicInfo.ext',
                    defaultMessage: '扩展',
                  })}
                  rows={4}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  onClick={() => handleCollectOneAssetType()}
                >
                  {useIntl().formatMessage({
                    id: 'pages.operation.confirm',
                    defaultMessage: '确定',
                  })}
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane
            tab={useIntl().formatMessage({
              id: 'pages.configDrawer.tab.property',
              defaultMessage: '属性',
            })}
            key="property"
          >
            <Row style={{ justifyContent: 'right' }}>
              <Button
                type="primary"
                icon={<TableOutlined />}
                onClick={() => setIsPropertyModalVisible(true)}
              >
                {useIntl().formatMessage({
                  id: 'pages.operation.property',
                  defaultMessage: '定义扩展属性',
                })}
              </Button>
            </Row>

            <List
              itemLayout="horizontal"
              dataSource={properties}
              renderItem={(item) => (
                <List.Item>
                  <Row style={{ width: '100%' }}>
                    <Col
                      span={6}
                      style={{
                        textAlign: 'right',
                        display: 'inline-block',
                        marginRight: '10px',
                      }}
                    >
                      {item['Name']}:
                    </Col>
                    {renderOneProeprtyValue(item)}
                  </Row>
                </List.Item>
              )}
            />
          </TabPane>
        </Tabs>
      </Drawer>
      <PropertyModal
        title={'外部属性定义'}
        isPropertyModalVisible={isPropertyModalVisible}
        handleCancel={handleCancel}
        properties={properties}
      ></PropertyModal>
    </>
  );
};

export default OneDetailAssetTypeDrawer;
