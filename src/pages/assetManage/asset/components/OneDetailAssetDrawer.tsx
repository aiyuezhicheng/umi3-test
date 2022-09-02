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
  Checkbox,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useRequest, useIntl, FormattedMessage } from 'umi';
import { AssetItem } from '../data';
import { getMaterialList, getAssetTree, getOneAsset } from '../service';

export type detailProps = {
  action: string;
  id?: string;
  visible: boolean;
  onClose?: (e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void;
};

const { TabPane } = Tabs;
const { TextArea } = Input;
const OneDetailAssetDrawer: React.FC<detailProps> = (props) => {
  console.log(props);
  const { action, visible, id, onClose } = props;
  const [tabActivityKey, setTabActivityKey] = useState<string>('basicInfo');
  const [basicInfo, setBasicInfo] = useState<AssetItem>({
    ParentID: '',
    Name: '',
    Description: '',
    RelatedMaterielIDList: '',
    IsPosition: false,
    IsEnabledScan: false,
    NoSenseUnlockAccuracy: 0,
    IsUseAssetTypeRelatedMaterielIDList: false,
  });

  const [basicInfoForm] = Form.useForm();
  basicInfoForm.setFieldsValue(basicInfo);

  useEffect(() => {
    console.log(id);
    if (id) {
      getOneAsset(id).then(({ data }) => {
        setBasicInfo(data);
        basicInfoForm.setFieldsValue(data);
      });
    }
  }, [id]);

  const { data: materialList } = useRequest(getMaterialList);
  const { data: assetTree } = useRequest(getAssetTree);

  console.log(assetTree);

  const changeTabPane = (activeKey: string) => {
    console.log(activeKey);
    setTabActivityKey(activeKey);
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
  const saveOneAsset = async (values: Record<string, any>) => {
    // // setError([]);
    // try {
    //   // await fakeSubmitForm(values);
    //   message.success('提交成功');
    // } catch {
    //   // console.log
    // }
  };

  const saveOneAssetBasicInfo = async (values: Record<string, any>) => {
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

  return (
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
          <Button type="primary" onClick={saveOneAsset}>
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
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 17 }}
            // initialValues={basicInfo}
            form={basicInfoForm}
            onFinish={saveOneAssetBasicInfo}
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
                treeData={assetTree}
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
                    if (assetTree && assetTree.length > 0) {
                      tree = [...assetTree];
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
              name="Mark"
              label={useIntl().formatMessage({
                id: 'pages.fieldName.asset.no',
                defaultMessage: '资产号',
              })}
            >
              <Input
                placeholder={useIntl().formatMessage({
                  id: 'pages.fieldName.asset.no',
                  defaultMessage: '资产号',
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
              name="RelatedAssetType"
              label={useIntl().formatMessage({
                id: 'pages.fieldName.asset.assetType',
                defaultMessage: '资产类别',
              })}
            >
              <TreeSelect
                key="ID"
                showSearch
                allowClear
                style={{ width: '100%' }}
                fieldNames={{ label: 'Name', value: 'ID', children: 'ChildList' }}
                placeholder={useIntl().formatMessage({
                  id: 'pages.fieldName.asset.assetType',
                  defaultMessage: '资产类别',
                })}
                treeData={assetTree}
              />
            </Form.Item>
            <Form.Item
              name="IsPosition"
              label={useIntl().formatMessage({
                id: 'pages.fieldName.asset.locationPoint',
                defaultMessage: '位置点',
              })}
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name="IsEnabledScan"
              label={useIntl().formatMessage({
                id: 'pages.fieldName.asset.scanPoint',
                defaultMessage: '扫描点',
              })}
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name="NoSenseUnlockAccuracy"
              label={useIntl().formatMessage({
                id: 'pages.fieldName.asset.accuracyOfInsensitiveUnlocking',
                defaultMessage: '无感解锁精度(单位厘米)',
              })}
            >
              <Input
                placeholder={useIntl().formatMessage({
                  id: 'pages.fieldName.asset.accuracyOfInsensitiveUnlocking',
                  defaultMessage: '无感解锁精度(单位厘米)',
                })}
              />
            </Form.Item>
            <Form.Item
              name="IsUseAssetTypeRelatedMaterielIDList"
              label={useIntl().formatMessage({
                id: 'pages.fieldName.asset.raletiveMaterialByAssetType',
                defaultMessage: '使用资产类别关联物料',
              })}
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
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
            defaultMessage: '基本信息',
          })}
          key="property"
        >
          Content of card tab 2
        </TabPane>
      </Tabs>
    </Drawer>
  );
};

export default OneDetailAssetDrawer;
