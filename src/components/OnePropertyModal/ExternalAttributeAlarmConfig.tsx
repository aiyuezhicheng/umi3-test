import {
  PlusOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
} from '@ant-design/icons';
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
  DatePicker,
  TimePicker,
  Checkbox,
  List,
  Tooltip,
  Table,
} from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import moment from 'moment';
import React, { useEffect, useState, useRef } from 'react';
import { useRequest, useIntl, FormattedMessage } from 'umi';

type ExternalAttributeAlarmConfig = {
  value: string;
};

type DataSourceType = {
  id: string;
  Operator?: string;
  Value?: string;
  AlarmType?: string;
  created_at?: string;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = new Array(2).fill(1).map((_, index) => {
  return {
    id: (Date.now() + index).toString(),
    Operator: '=',
    Value: '2020-01-01 12:00:00',
    AlarmType: 'open',
    created_at: '1590486176000',
  };
});

const ExternalAttributeAlarmConfig: React.FC<ExternalAttributeAlarmConfig> = (props) => {
  // const { visible, value } = props;
  const actionRef = useRef<ActionType>();
  const [alertConfigModalVisible, setAlertConfigModalVisible] = useState(false);

  const [
    selectedExternalAttributeAlarmConfigRowKeys,
    setSelectedExternalAttributeAlarmConfigRowKeys,
  ] = useState<string[]>([]);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((item) => item.id),
  );
  const [dataSource, setDataSource] = useState<DataSourceType[]>(() => defaultData);
  const [form] = Form.useForm();

  // 报警逻辑
  const renderAlarmLogic = () => {
    return (
      <>
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
                console.log(111);
                // setAlertConfigModalVisible(true);
              }}
            />
          </Tooltip>
        </Input.Group>
      </>
    );
  };

  // 外部属性报警配置列
  const ExternalAttributeAlarmConfigColumns: ProColumns<DataSourceType>[] = [
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
      render: () => {
        return renderAlarmLogic();
      },
    },
  ];

  // 新增和插入
  const handleIncrease = (operationType: string) => {
    if (operationType == 'add') {
      // 新增在最后一行
      console.log(123);
      const obj = {
        id: new Date().getTime() + '',
        Operator: `=`,
      };
      const newDataSource = [...dataSource];
      newDataSource.push(obj);
      setDataSource(newDataSource);
      actionRef.current?.addEditRecord?.(obj);
    } else {
      // 插入在选中那一行后面
    }
  };
  // 删除所有
  const handleDeleteAll = () => {
    let newDataSource = [...dataSource];
    newDataSource = newDataSource.filter(
      (item) => selectedExternalAttributeAlarmConfigRowKeys.indexOf(item.id) == -1,
    );
    setDataSource(newDataSource);
  };
  return (
    <>
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
        {JSON.stringify(defaultData)}
        {JSON.stringify(editableKeys)}
        <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => handleIncrease('add')}>
          <FormattedMessage id="pages.operation.add" defaultMessage="新增" />
        </Button>
        <Button
          icon={<PlusCircleOutlined />}
          disabled={!(selectedExternalAttributeAlarmConfigRowKeys.length == 1)}
          onClick={() => handleIncrease('insert')}
        >
          <FormattedMessage id="pages.operation.insert" defaultMessage="插入" />
        </Button>
        <Button
          icon={<MinusCircleOutlined />}
          disabled={!(selectedExternalAttributeAlarmConfigRowKeys.length == 1)}
        >
          <FormattedMessage id="pages.operation.delete" defaultMessage="删除" />
        </Button>
        <Button
          icon={<DeleteOutlined />}
          disabled={selectedExternalAttributeAlarmConfigRowKeys.length == 0}
          onClick={() => handleDeleteAll()}
        >
          <FormattedMessage id="pages.operation.deleteAll" defaultMessage="删除所有" />
        </Button>
        <EditableProTable<DataSourceType>
          columns={ExternalAttributeAlarmConfigColumns}
          rowKey="id"
          scroll={{
            x: 960,
          }}
          value={dataSource}
          rowSelection={{
            selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
            defaultSelectedRowKeys: selectedExternalAttributeAlarmConfigRowKeys,
            onChange: (_, selectedRows) => {
              const selected = selectedRows.map((item) => item.id);
              setSelectedExternalAttributeAlarmConfigRowKeys(selected);
            },
          }}
          onChange={setDataSource}
          recordCreatorProps={false}
          editable={{
            type: 'multiple',
            editableKeys,

            // actionRender: (row, config, defaultDoms) => {
            //   return [defaultDoms.delete];
            // },
            // onValuesChange: (record, recordList) => {
            //   setDataSource(recordList);
            // },
            // actionRender: (row, config, defaultDoms) => {
            //   return [defaultDoms.delete];
            // },
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
    </>
  );
};
export default ExternalAttributeAlarmConfig;
