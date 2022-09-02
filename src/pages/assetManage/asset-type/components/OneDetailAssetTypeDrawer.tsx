import { PlusOutlined, EditOutlined, DeleteOutlined, TableOutlined } from '@ant-design/icons';
import {
  Button,
  message,
  Input,
  Drawer,
  Tabs,
  Form,
  Select,
  Space,
  TreeSelect,
  Modal,
  List,
  Row,
  Col,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useRequest, useIntl, FormattedMessage } from 'umi';
import PropertyModal from '@/components/OnePropertyModal';
import Property from '@/components/OnePropertyModal/test';
import { AssetTypeItem, AssetTypePropertyItem } from '../data.d';
import { ProcessListOptionsAndEngUnit, IsNotEmptyGuid } from '@/utils/common';
import {
  getMaterialList,
  getAssetTypeTree,
  getOneAssetType,
  getOneAssetTypeProperties,
} from '../service';

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
  console.log(props);
  const { action, visible, id, onClose, newKey } = props;
  const [tabActivityKey, setTabActivityKey] = useState<string>('basicInfo');
  const [basicInfo, setBasicInfo] = useState<AssetTypeItem>({
    ParentID: '',
    Name: '',
    Description: '',
    RelatedMaterielIDList: '',
    Ext: '',
  });
  const [properties, setProperties] = useState<AssetTypePropertyItem[]>([]);

  const [basicInfoForm] = Form.useForm();
  basicInfoForm.setFieldsValue(basicInfo);

  useEffect(() => {
    // 新建设备或新建数据源有初始默认值
    if (action == 'new' && newKey) {
      let name = '';
      let description = '';
      let ext = '';

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
      const newBasicInfo = {
        ParentID: '',
        Name: name,
        Description: description,
        RelatedMaterielIDList: '',
        Ext: ext,
      };
      setBasicInfo(newBasicInfo);
      basicInfoForm.setFieldsValue(newBasicInfo);
    }
  }, [newKey]);

  useEffect(() => {
    console.log(id);
    if (id) {
      getOneAssetType(id).then(({ data }) => {
        setBasicInfo(data);
        basicInfoForm.setFieldsValue(data);
      });
    }
  }, [id]);

  const { data: materialList } = useRequest(getMaterialList);
  const { data: assetTypeTree } = useRequest(getAssetTypeTree);

  console.log(assetTypeTree);

  const changeTabPane = (activeKey: string) => {
    console.log(activeKey);
    setTabActivityKey(activeKey);
    if (activeKey == 'property') {
      getOneAssetTypeProperties(id!).then((result) => {
        console.log(result);
        const { data: properties } = result;
        ProcessListOptionsAndEngUnit(properties, (newProperties: any) => {
          console.log(newProperties);
          setProperties(newProperties);
        });
      });
    }
  };
  const renderTitle = () => {
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
  const onSearchRelativeMaterial = (value: string) => {
    console.log('search' + value);
  };
  const saveOneAssetType = async (values: Record<string, any>) => {
    // // setError([]);
    // try {
    //   // await fakeSubmitForm(values);
    //   message.success('提交成功');
    // } catch {
    //   // console.log
    // }
  };

  const saveOneAssetTypeBasicInfo = async (values: Record<string, any>) => {
    // // setError([]);
    const createParams = { ...values };
    if (id && action == 'edit') {
      createParams['ID'] = id;
    }
    console.log(values);
    console.log(createParams);
    try {
      message.success(
        <FormattedMessage id="pages.dialog.save.success" defaultMessage="保存成功!" />,
      );
    } catch {
      // console.log
    }
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

  const [isPropertyModalVisible, setIsPropertyModalVisible] = useState<boolean>(false);
  // const [modalTitle, setModalTitle] = useState<string>('');
  const intl = useIntl();
  //显示编辑一个属性的对话框
  // const showOnePropertyModal = (action:string,id?:string)=>{
  //   console.log(action);
  //   setIsPropertyModalVisible(true)
  //   let title = ''
  //   if(action == 'new'){
  //     title = intl.formatMessage({ id: 'pages.operation.new', defaultMessage: '新建'})
  //   }else{
  //     title = intl.formatMessage({ id: 'pages.operation.edit', defaultMessage: '编辑'})
  //   }
  //   setModalTitle(title)
  // }
  // 对话框的确认
  const handleOk = () => {
    setIsPropertyModalVisible(false);
  };
  // 对话框的取消
  const handleCancel = () => {
    setIsPropertyModalVisible(false);
  };

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
  return (
    <>
      <Drawer
        // forceRender={true}
        title={renderTitle()}
        width={600}
        visible={visible}
        // closable={false}
        onClose={onClose}
        extra={
          <Space>
            <Button onClick={onClose}>
              {useIntl().formatMessage({
                id: 'pages.operation.cancel',
                defaultMessage: '取消',
              })}
            </Button>
            <Button type="primary" onClick={saveOneAssetType}>
              {useIntl().formatMessage({
                id: 'pages.operation.confirm',
                defaultMessage: '确定',
              })}
            </Button>
          </Space>
        }
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
              // initialValues={basicInfo}
              form={basicInfoForm}
              onFinish={saveOneAssetTypeBasicInfo}
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
                  showSearch
                  allowClear
                  style={{ width: '100%' }}
                  fieldNames={{ label: 'Name', value: 'ID', children: 'ChildList' }}
                  placeholder={useIntl().formatMessage({
                    id: 'pages.basicInfo.parentname',
                    defaultMessage: '父级名称',
                  })}
                  treeData={assetTypeTree}
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
                  {
                    validator(_rule, value, callback) {
                      if (action !== 'new') {
                        return Promise.resolve();
                      }
                      let tree: any[] = [];
                      if (assetTypeTree && assetTypeTree.length > 0) {
                        tree = [...assetTypeTree];
                      }
                      const isRight = judgeIsDuplicateName(value, tree);
                      if (!isRight) {
                        return Promise.reject(
                          useIntl().formatMessage({
                            id: 'pages.message.name.valid.message',
                            defaultMessage: '名称不能重名',
                          }),
                        );
                      } else {
                        return Promise.resolve();
                      }
                    },
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
                <Button type="primary" htmlType="submit" className="login-form-button">
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
            <Button
              type="primary"
              icon={<TableOutlined />}
              onClick={() => setIsPropertyModalVisible(true)}
              style={{ textAlign: 'right' }}
            >
              {useIntl().formatMessage({
                id: 'pages.operation.property',
                defaultMessage: '定义扩展属性',
              })}
            </Button>
            <List
              itemLayout="horizontal"
              dataSource={properties}
              renderItem={(item) => (
                <List.Item>
                  <Row style={{ width: '100%' }}>
                    <Col
                      span={6}
                      style={{ textAlign: 'right', display: 'inline-block', marginRight: '10px' }}
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
