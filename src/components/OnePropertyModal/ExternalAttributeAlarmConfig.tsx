import {
  PlusOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseOutlined,
  CopyOutlined,
  ExclamationCircleOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
} from '@ant-design/icons';
import {
  Row,
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
  DatePicker,
  TimePicker,
  Checkbox,
  List,
  Tooltip,
  Table,
  Popconfirm
} from 'antd';
import type { ProColumns, ActionType, EditableFormInstance } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import ProForm, {
  ProFormDependency,
  ProFormFieldSet,
  ProFormSelect,
  ProFormText,
  ModalForm,
  ProFormTextArea,
  ProFormDateRangePicker,
  ProFormList,
  ProFormDigit
} from '@ant-design/pro-form';

import moment from 'moment';
import React, { useEffect, useState, useRef } from 'react';
import { useRequest, useIntl, FormattedMessage } from 'umi';
import { NewGuid, GuidEmpty, JsonParseSafe } from '@/utils/common'
import { ActionRenderConfig } from '@ant-design/pro-utils/lib/useEditableArray';

type ExternalAttributeAlarmConfig = {
  value: string;
};

type DataSourceType = {
  id: string;
  Operator: string;
  Value?: string;
  AlarmType: string;
  LogicConfig?: string;
};

const defaultData: DataSourceType[] = new Array(2).fill(1).map((_, index) => {
  return {
    id: (Date.now() + index).toString(),
    Operator: '=',
    Value: '2020-01-01 12:00:00',
    AlarmType: 'CRITICAL',
    LogicConfig: '[{\"AlarmLogicAction\":1,\"TaskGroupTemplateID\":\"00000000-0000-0000-0000-000000000000\",\"TaskStandardID\":\"00000000-0000-0000-0000-000000000000\"}]'

  };
});

type AlarmLogicItem = {
  ID: string,
  "AlarmLogicAction": number, // 1发消息或2创建作业
  "TaskGroupTemplateID": string,
  "TaskGroupTemplateName": string,
  "TaskGroupTemplateDescription": string,
  "TaskStandardID": string,
  "Duration": number
}

const defaultAlarmLogicData: AlarmLogicItem[] = [
  {
    "ID": NewGuid(),
    "AlarmLogicAction": 1, // 1发消息或2创建作业
    "TaskGroupTemplateID": GuidEmpty,
    "TaskGroupTemplateName": '',
    "TaskGroupTemplateDescription": '',
    "TaskStandardID": GuidEmpty,
    "Duration": 0
  },
  {
    "ID": NewGuid(),
    "AlarmLogicAction": 2, // 1发消息或2创建作业
    "TaskGroupTemplateID": 'fc9ead32-6985-7088-37ae-66486dd521ab',
    "TaskGroupTemplateName": 'test',
    "TaskGroupTemplateDescription": 'aaabbbccc',
    "TaskStandardID": '1c9ead32-6985-7088-37ae-66486dd521ab',
    "Duration": 12
  }
]


const ExternalAttributeAlarmConfig: React.FC<ExternalAttributeAlarmConfig> = (props) => {
  // const { visible, value } = props;
  const actionRef = useRef<ActionType>();
  const [alertConfigModalVisible, setAlertConfigModalVisible] = useState(false);
  const editorFormRef = useRef<EditableFormInstance<DataSourceType>>();
  const [
    selectedExternalAttributeAlarmConfigRowKeys,
    setSelectedExternalAttributeAlarmConfigRowKeys,
  ] = useState<string[]>([]);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((item) => item.id),
  );
  const [dataSource, setDataSource] = useState<DataSourceType[]>(() => defaultData);
  const [form] = Form.useForm();

  // 报警逻辑弹框  
  const [alarmLogicModalVisible, setAlarmLogicModalVisible] = useState<boolean>(false);
  const [
    selectedAlarmLogicRowKeys,
    setSelectedAlarmLogicRowKeys,
  ] = useState<string[]>([]);
  const [alarmLogicEditableKeys, setAlarmLogicEditableRowKeys] = useState<React.Key[]>(() =>
    defaultAlarmLogicData.map((item) => item.ID),
  );

  // const [alarmLogicList, setAlarmLogicList] = useState([]);

  // 报警逻辑弹框
  const renderAlarmLogicModal = (alarmLogicStr: string) => {
    console.log(renderAlarmLogicModal)
    console.log(alarmLogicModalVisible)
    if (alarmLogicModalVisible) {
      console.log(JsonParseSafe(alarmLogicStr));
      // setAlarmLogicList(JsonParseSafe(alarmLogicStr) || []);
      const alarmLogicList = JsonParseSafe(alarmLogicStr) || []
      console.log(alarmLogicList);
      return (
        <ModalForm
          title={<FormattedMessage id="pages.modal.AlarmLogic.title" defaultMessage="编辑报警逻辑" />}
          visible={alarmLogicModalVisible}
          onFinish={async () => {
            message.success('提交成功');
            return true;
          }}
          onVisibleChange={setAlarmLogicModalVisible}
          modalProps={{
            bodyStyle: { height: document.body.clientHeight * 0.6 + 'px', overflow: 'auto' }
          }}
        >
          <Row>
            <Space
              style={{
                marginBlockEnd: 24,
              }}
            >
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  // const list = actionRef.current?.getList();
                  // actionRef.current?.add({
                  //   name: '新增' + list?.length,
                  // });
                }}
              >
                <FormattedMessage id="pages.operation.add" defaultMessage="新增" />
              </Button>
              <Button
                icon={<DeleteOutlined />}
                onClick={() => {
                  // actionRef.current?.remove(1);
                }}
              >
                <FormattedMessage id="pages.operation.deleteAll" defaultMessage="删除所有" />
              </Button>
            </Space>
          </Row>
          <ProForm>
            <ProFormList name={['default', 'users']}
              initialValue={alarmLogicList}
              alwaysShowItemLabel
              creatorButtonProps={false}
            // copyIconProps={false}
            // deleteIconProps={false}
            // actionRender={(props, action, defaultActionDom) => {
            //   return [<PlusCircleOutlined key='add' onClick={() => action.add()} />, ...defaultActionDom]
            // }}
            >
              <ProForm.Group key="group">
                <ProFormSelect
                  options={[
                    {
                      value: 1,
                      label: (<FormattedMessage id="pages.modal.AlarmLogic.fieldName.logicalBehavior.sendMessage" defaultMessage="发送消息" />),
                    },
                    {
                      value: 2,
                      label: (<FormattedMessage id="pages.modal.AlarmLogic.fieldName.logicalBehavior.createTask" defaultMessage="创建作业" />),
                    },
                  ]}
                  width="xs"
                  name="AlarmLogicAction"
                  label={<FormattedMessage id="pages.modal.AlarmLogic.fieldName.logicalBehavior" defaultMessage="逻辑行为" />}
                />

                <ProFormDependency name={['AlarmLogicAction']}>
                  {({ AlarmLogicAction }) => {
                    if (AlarmLogicAction === 2) { // 创建作业
                      return (
                        <>
                          <ProFormSelect
                            request={async () => [
                              { label: '作业组模板1', value: NewGuid() },
                              { label: '作业组模板2', value: NewGuid() },
                              { label: '作业组模板3', value: NewGuid() },
                              { label: '作业组模板4', value: NewGuid() },
                            ]}
                            width="md"
                            name="TaskGroupTemplateID"
                            label={<FormattedMessage id="pages.modal.AlarmLogic.fieldName.createTask.taskGroupName" defaultMessage="作业组" />}
                          />
                          <ProFormText name="text" label={<FormattedMessage id="pages.modal.AlarmLogic.fieldName.createTask.taskGroupNameAfterModify" defaultMessage="修改后作业组名称" />} placeholder="请输入名称" />
                          <ProFormTextArea
                            name="TaskGroupTemplateDescription"
                            label={<FormattedMessage id="pages.modal.AlarmLogic.fieldName.createTask.taskGroupDescriptionAfterModify" defaultMessage="修改后作业组描述" />}
                          />
                          <ProFormSelect
                            request={async () => [
                              { label: '作业规范1', value: NewGuid() },
                              { label: '作业规范2', value: NewGuid() },
                              { label: '作业规范3', value: NewGuid() },
                            ]}
                            width="md"
                            name="TaskStandardID"
                            label={<FormattedMessage id="pages.modal.AlarmLogic.fieldName.createTask.taskStandard" defaultMessage="作业规范" />}
                          />
                          <ProFormDigit label={<FormattedMessage id="pages.modal.AlarmLogic.fieldName.createTask.taskGroupDuration" defaultMessage="作业组时长(分钟)" />} name="Duration" min={1} max={10} />
                        </>
                      );
                    }
                    return null;
                  }}
                </ProFormDependency>
              </ProForm.Group>
            </ProFormList>
          </ProForm>
        </ModalForm>
      )
    }
    return ''
  }
  // 处理一条外部属性报警配置数据
  const handleOneRowByOperation = (type: string, oneRow?: DataSourceType, externalAlarmConfigForm?: any) => {
    let newDataSource = [...dataSource];
    const emptyOneRow = {
      id: '',
      Operator: '=',
      Value: moment().format('YYYY-MM-DD'),
      AlarmType: 'CRITICAL',
      LogicConfig: ''
    };
    let newOneRow = oneRow ? { ...oneRow } : emptyOneRow;
    switch (type) {
      case 'add':
        newOneRow['id'] = NewGuid();
        newDataSource.push(newOneRow);
        setDataSource(newDataSource);
        setEditableRowKeys(newDataSource.map(({ id }) => id));
        break;
      case 'clearAlarmLogic':
        newOneRow['LogicConfig'] = '';
        externalAlarmConfigForm.setFieldValue(newOneRow.id, newOneRow);
        let clearAlarmLogicIndex = newDataSource.findIndex(item => item.id == newOneRow.id);
        if (clearAlarmLogicIndex > -1) {
          newDataSource[clearAlarmLogicIndex] = newOneRow;
          setDataSource(newDataSource);
        }
        break;
      case 'copy':
        let copyID = newOneRow['id'];
        newOneRow['id'] = NewGuid();
        let index = newDataSource.findIndex(item => item.id == copyID);
        if (index > -1) {
          newDataSource.splice(index, 0, newOneRow);
          setDataSource(newDataSource);
          setEditableRowKeys(newDataSource.map(({ id }) => id));
        }
        break;
      case 'delete':
        let deleteIndex = newDataSource.findIndex(item => item.id == newOneRow['id']);
        if (deleteIndex > -1) {
          newDataSource.splice(deleteIndex, 1);
          setDataSource(newDataSource);
          setEditableRowKeys(newDataSource.map(({ id }) => id));
        }
        // 删除接口
        message.success(<FormattedMessage id="pages.dialog.delete.success" defaultMessage="删除成功!" />);
        break;
      default:
        break;
    }
  }
  // 显示批量删除弹框
  const showDeleteConfirmModal = () => {
    Modal.confirm({
      title: <FormattedMessage id="pages.deleteSelectedDialog.title" defaultMessage="确认删除选中么?" />,
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        // 批量删除接口
        setSelectedExternalAttributeAlarmConfigRowKeys([])
        let newDataSource = [...dataSource];
        newDataSource = newDataSource.filter(
          (item) => selectedExternalAttributeAlarmConfigRowKeys.indexOf(item.id) == -1,
        );
        setDataSource(newDataSource);
      },
      onCancel() {
        console.log('Cancel');
      },
      okText: <FormattedMessage id="pages.operation.confirm" defaultMessage="确定" />,
      cancelText: <FormattedMessage id="pages.operation.cancel" defaultMessage="取消" />,
    });
  }





  // 清空报警靠逻辑
  const clearAlarmLogic = (record: any, form: any) => {
    handleOneRowByOperation('clearAlarmLogic', record, form)
    // const oneRow = editorFormRef.current?.getFieldValue(record.id);
    // // console.log(oneRow);
    // const newRowObj = { ...oneRow };
    // newRowObj['LogicConfig'] = '';
    // editorFormRef.current?.setFieldValue(record.id, newRowObj);


    // const rows = editorFormRef.current?.getRowsData?.();
    // console.log(rows);
    // console.log(dataSource)
    // setDataSource(dataSource)
  }
  // editorFormRef

  // 报警逻辑
  const renderAlarmLogic = (record: any, form: any) => {
    console.log("renderAlarmLogic");
    return (
      <>
        <Input.Group compact>
          <Input
            style={{ width: 'calc(100% - 80px)' }}
            value={record.LogicConfig || ''}
            disabled
            allowClear
          />
          <Tooltip title={<FormattedMessage id="pages.operation.clear" defaultMessage="清空" />} >
            <Button icon={<CloseOutlined />} onClick={() => handleOneRowByOperation('clearAlarmLogic', record, form)} />
          </Tooltip>
          <Tooltip title={<FormattedMessage id="pages.operation.edit" defaultMessage="编辑" />}>
            <Button
              icon={<EditOutlined />}
              onClick={() => {
                setAlarmLogicModalVisible(true);
              }}
            />
          </Tooltip>
        </Input.Group>
        {alarmLogicModalVisible ? renderAlarmLogicModal(record.LogicConfig || '') : ''}
      </>
    );
  };

  // 外部属性报警配置列
  const externalAttributeAlarmConfigColumns: ProColumns<DataSourceType>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.modal.externalAttributeAlarmConfig.fieldName.conditionType"
          defaultMessage="条件类型"
        />
      ),
      dataIndex: 'Operator',
      width: 100,
      formItemProps: {
        rules: [
          {
            required: true,
            whitespace: true,
            message: '此项是必填项',
          },
        ],
      },
      renderFormItem: (_, config, data) => {
        return (
          <Select>
            {[
              { label: '=', value: '=' },
              { label: '<>', value: '<>' },
              { label: '>', value: '>' },
              { label: '>=', value: '>=' },
              { label: '<', value: '<' },
              { label: '<=', value: '<=' },
            ].map((item) => (
              <Select.Option value={item.value} key={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        );
      },
    },
    {
      title: (
        <FormattedMessage
          id="pages.modal.externalAttributeAlarmConfig.fieldName.conditionValue"
          defaultMessage="条件值"
        />
      ),
      key: 'Value',
      dataIndex: 'Value',
      valueType: 'dateTime',
    },
    {
      title: (
        <FormattedMessage
          id="pages.modal.externalAttributeAlarmConfig.fieldName.alarmLevel"
          defaultMessage="报警级别"
        />
      ),
      dataIndex: 'AlarmType',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          },
        ],
      },
      renderFormItem: (_, config, data) => {
        return (
          <Select>
            {[
              {
                label: <FormattedMessage id="pages.alarmLevel.critical" defaultMessage="危险" />,
                value: 'CRITICAL',
              },
              {
                label: <FormattedMessage id="pages.alarmLevel.major" defaultMessage="重要" />,
                value: 'MAJOR',
              },
              {
                label: <FormattedMessage id="pages.alarmLevel.minor" defaultMessage="次要" />,
                value: 'MINOR',
              },
              {
                label: <FormattedMessage id="pages.alarmLevel.warning" defaultMessage="警告" />,
                value: 'WARNING',
              },
              {
                label: (
                  <FormattedMessage id="pages.alarmLevel.indeterminate" defaultMessage="不确定" />
                ),
                value: 'INDETERMINATE',
              },
            ].map((item) => (
              <Select.Option value={item.value} key={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        );
      },
    },
    {
      title: (
        <FormattedMessage
          id="pages.modal.externalAttributeAlarmConfig.fieldName.logic"
          defaultMessage="逻辑"
        />
      ),
      width: 250,
      dataIndex: 'LogicConfig',
      renderFormItem: (_, config, form) => {
        return renderAlarmLogic(config.record, form);
      },
    },
    {
      title: '操作',
      key: 'option',
      width: 250,
      valueType: 'option',
      render: () => { return null }
    },
  ];

  return (
    <>
      {/* 外部属性报表配置输入框 */}
      <Input.Group compact>
        <Input
          style={{ width: 'calc(100% - 80px)' }}
          defaultValue="git@github.com:ant-design/ant-design.git"
          disabled
          allowClear
        />
        <Tooltip title={<FormattedMessage id="pages.operation.delete" defaultMessage="删除" />}>
          <Button icon={<DeleteOutlined />} />
        </Tooltip>
        <Tooltip title={<FormattedMessage id="pages.operation.edit" defaultMessage="编辑" />}>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setAlertConfigModalVisible(true);
            }}
          />
        </Tooltip>
      </Input.Group>
      {/* 编辑外部属性报表配置弹框 */}
      <Modal
        title={
          <FormattedMessage
            id="pages.modal.externalAttributeAlarmConfig.title"
            defaultMessage="编辑外部属性报表配置"
          />
        }
        visible={alertConfigModalVisible}
        width="60%"
        bodyStyle={{ height: document.body.clientHeight * 0.6 + 'px', overflow: 'auto' }}
        onOk={() => {
          setAlertConfigModalVisible(false);
        }}
        onCancel={() => setAlertConfigModalVisible(false)}
        okText="确认"
        cancelText="取消"
      >
        <Space>
          <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => handleOneRowByOperation('add')}>
            <FormattedMessage id="pages.operation.add" defaultMessage="新增" />
          </Button>
          <Button
            icon={<DeleteOutlined />}
            disabled={selectedExternalAttributeAlarmConfigRowKeys.length == 0}
            onClick={() => showDeleteConfirmModal()}
          >
            <FormattedMessage id="pages.operation.batchDelete" defaultMessage="批量删除" />
          </Button>
        </Space>

        <EditableProTable<DataSourceType>
          columns={externalAttributeAlarmConfigColumns}
          rowKey="id"
          scroll={{
            x: 960,
          }}
          // editableFormRef={editorFormRef}
          value={dataSource}
          rowSelection={{
            selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
            // defaultSelectedRowKeys: selectedExternalAttributeAlarmConfigRowKeys,
            selectedRowKeys: selectedExternalAttributeAlarmConfigRowKeys,
            onChange: (_, selectedRows) => {
              const selected = selectedRows.map((item) => item.id);
              setSelectedExternalAttributeAlarmConfigRowKeys(selected);
            },
          }}
          // controlled={true}
          // onChange={setDataSource}
          recordCreatorProps={false}
          editable={{
            type: 'multiple',
            editableKeys,
            onValuesChange: (record, recordList) => {
              console.log("onValuesChange");
              setDataSource(recordList);
            },
            actionRender: (row, config, dom) => [
              <Tooltip title={<FormattedMessage id="pages.operation.copy" defaultMessage="复制" />} key={row.id + 'copy'}>
                <Button icon={<CopyOutlined />} onClick={() => { console.log(row, config, dom, form); handleOneRowByOperation('copy', row, config) }} />
              </Tooltip>,
              <Popconfirm
                title={<FormattedMessage id="pages.deleteDialog.title" defaultMessage="确认删除么?" />}
                onConfirm={() => {
                  handleOneRowByOperation('delete', row);
                }}
                okText={<FormattedMessage id="pages.operation.confirm'" defaultMessage="确定" />}
                cancelText={<FormattedMessage id="pages.operation.cancel" defaultMessage="取消" />}
                key={row.id + 'delete'}
              >
                <Tooltip title={<FormattedMessage id="pages.operation.delete" defaultMessage="删除" />} >
                  <Button icon={<DeleteOutlined />} onClick={() => { console.log(config, form) }} />
                </Tooltip></Popconfirm>,
            ],
            // onValuesChange: (record, recordList) => {
            //   setDataSource(recordList);
            // },
            onChange: () => {
              console.log(111);
              setEditableRowKeys;
            },
          }}
          actionRef={actionRef}
        />
      </Modal>
      {/* { alarmLogicModalVisible && alarmLogicModal()} */}
    </>
  );
};
export default ExternalAttributeAlarmConfig;


