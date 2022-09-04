import { PlusOutlined, EditOutlined, DeleteOutlined, FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
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
} from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import moment from 'moment';
import type { DatePickerProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useRequest, useIntl, FormattedMessage } from 'umi';
import { Property } from '@/utils/data.d';
import {
  IsNotEmptyGuid, FormatDateTimeByFormat, requestFullScreen,
  exitFullScreen,
  isFullscreenElement,
} from '@/utils/common';

type onePropertyModalProps = {
  title: string;
  isPropertyModalVisible: boolean;
  properties: any[];
  handleOk?: any;
  handleCancel?: any;
};

const OnePropertyModal: React.FC<onePropertyModalProps> = (props) => {
  const {
    title,
    isPropertyModalVisible: isModalVisible,
    handleOk,
    handleCancel,
    properties,
  } = props;

  const [customList, setCustomList] = useState<{ label: string; value: string }[]>([]);
  const [engUnits, setEngUnitList] = useState<{ label: string; value: string }[]>([]);
  const [customListItems, setAllcustomListItems] = useState({});
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [fullScreen, setFullScreen] = useState(false);
  useEffect(() => {
    // console.log(properties)
    setDataSource(properties || []);
    // setEditableRowKeys(properties.map(item=>item.ID))
  });
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(
    dataSource.map((item) => item.ID),
  );

  // useEffect(()=>{
  //   // console.log(dataSource)
  //   setEditableRowKeys(dataSource.map(item=>item.ID))
  // },['dataSource'])

  useEffect(() => {
    // 获取全部自定义列表及列表项
    const list = [
      { value: '18d73844-ebbd-4a3c-af7a-0af21e8aa7a1', label: '一周' },
      { value: '28d73844-ebbd-4a3c-af7a-0af21e8aa7a1', label: '是/否' },
      { value: '38d73844-ebbd-4a3c-af7a-0af21e8aa7a1', label: '设备' },
    ];
    const customListItems = {
      '18d73844-ebbd-4a3c-af7a-0af21e8aa7a1': [
        { value: '48d73844-ebbd-4a3c-af7a-0af21e8aa7a8', label: '周一' },
        { value: '48d73844-ebbd-4a3c-af7a-0af21e8aa7b8', label: '周二' },
        { value: '48d73844-ebbd-4a3c-af7a-0af21e8aa7c8', label: '周三' },
        { value: '48d73844-ebbd-4a3c-af7a-0af21e8aa7d8', label: '周四' },
        { value: '48d73844-ebbd-4a3c-af7a-0af21e8aa7e8', label: '周五' },
        { value: '48d73844-ebbd-4a3c-af7a-0af21e8aa7f8', label: '周六' },
        { value: '48d73844-ebbd-4a3c-af7a-0af21e8aa7g8', label: '周日' },
      ],
      '28d73844-ebbd-4a3c-af7a-0af21e8aa7a1': [
        { value: '28d73844-ebbd-4a3c-af7a-0af21e8aaaa8', label: '是' },
        { value: '28d73844-ebbd-4a3c-af7a-0af21e8aaba8', label: '是' },
      ],
      '38d73844-ebbd-4a3c-af7a-0af21e8aa7a1': [
        { value: '38d73844-ebbd-4a3c-af7a-0af21e8aaaa8', label: '鼠标' },
        { value: '38d73844-ebbd-4a3c-af7a-0af21e8abaa8', label: '键盘' },
        { value: '38d73844-ebbd-4a3c-af7a-0af21e8acaa8', label: '显视屏' },
      ],
    };
    setAllcustomListItems(customListItems);
    setCustomList(list);
    const engineeringUnitList = [
      { value: '8626dc3b-9af0-4641-8a88-4479491fa9b5', label: '米' },
      { value: 'a626dc3b-9af0-4641-8a88-4479491fa9b5', label: '厘米' },
      { value: 'b626dc3b-9af0-4641-8a88-4479491fa9b5', label: '度' },
      { value: 'c626dc3b-9af0-4641-8a88-4479491fa9b5', label: '摄氏度' },
    ];
    setEngUnitList(engineeringUnitList);
  }, ['title']);

  // 日期时间
  const renderDateTime = (dateTimeFormat: string, value?: any) => {
    let dateTimeItem: any = '';
    if (dateTimeFormat) {
      console.log(value);
      let formatList = dateTimeFormat.split(' ');
      // const defaultValue = value
      //   ? FormatDateTimeByFormat('yyyy/MM/dd hh:mm:ss', new Date())
      //   : FormatDateTimeByFormat('yyyy/MM/dd hh:mm:ss', new Date());
      const defaultValue = '2022/08/01';
      // `custom format: ${value.format(dateTimeFormat)}`;
      switch (dateTimeFormat) {
        case 'yyyy年MM月dd日':
        case 'yyyy-MM-dd':
          dateTimeItem = (
            <DatePicker
              defaultValue={moment(defaultValue, dateTimeFormat.toLocaleUpperCase())}
              format={dateTimeFormat.toLocaleUpperCase()}
            />
          );

          break;
        // case 'HH:mm:ss':
        // case 'HH时mm分ss秒':
        //   dateTimeItem = (
        //     <TimePicker
        //       defaultValue={moment(defaultValue, dateTimeFormat.toLocaleUpperCase())}
        //       format={dateTimeFormat.toLocaleUpperCase()}
        //     />
        //   );
        //   break;
        // case 'yyyy-MM-dd HH:mm:ss':
        // case 'yyyy年MM月dd日 HH时mm分ss秒':
        //   dateTimeItem = (
        //     <>
        //       <DatePicker
        //         defaultValue={moment(defaultValue, formatList[0].toLocaleUpperCase())}
        //         format={formatList[0].toLocaleUpperCase()}
        //       />
        //       <TimePicker
        //         defaultValue={moment(defaultValue, formatList[1].toLocaleUpperCase())}
        //         format={formatList[1].toLocaleUpperCase()}
        //       />
        //     </>
        //   );
        //   break;
        default:
          break;
      }
    }
    return dateTimeItem;
  };
  type ColumnProps = {
    IsNotSaveHistory?: boolean;
    IsTelemeteringData?: boolean;
  } & Property;
  // 属性列
  const columns: ProColumns<ColumnProps>[] = [
    {
      title: (
        <FormattedMessage id="pages.property.fieldName.propertyName" defaultMessage="属性名" />
      ),
      dataIndex: 'Name',
      width: '30%',
      formItemProps: {
        rules: [
          {
            required: true,
            whitespace: true,
            message: '此项是必填项',
          },
          // {
          //   message: '必须包含数字',
          //   pattern: /[0-9]/,
          // },
          // {
          //   max: 16,
          //   whitespace: true,
          //   message: '最长为 16 位',
          // },
          // {
          //   min: 6,
          //   whitespace: true,
          //   message: '最小为 6 位',
          // },
        ],
      },
    },
    {
      title: <FormattedMessage id="pages.table.columnName.dataType" defaultMessage="数据类型" />,
      key: 'ValueType',
      dataIndex: 'ValueType',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: <FormattedMessage id="pages.property.fieldName.number" defaultMessage="数值" />,
            value: 1,
          },
          {
            label: (
              <FormattedMessage id="pages.property.fieldName.string" defaultMessage="字符串" />
            ),
            value: 2,
          },
          {
            label: <FormattedMessage id="pages.property.fieldName.list" defaultMessage="列表" />,
            value: 0,
          },
          {
            label: (
              <FormattedMessage
                id="pages.property.fieldName.canInputList"
                defaultMessage="可输入列表"
              />
            ),
            value: 3,
          },
          {
            label: (
              <FormattedMessage id="pages.property.fieldName.dateTime" defaultMessage="日期时间" />
            ),
            value: 5,
          },
          {
            label: <FormattedMessage id="pages.property.fieldName.file" defaultMessage="文件" />,
            value: 6,
          },
          {
            label: (
              <FormattedMessage id="pages.property.fieldName.multiList" defaultMessage="多选列表" />
            ),
            value: 7,
          },
          {
            label: (
              <FormattedMessage
                id="pages.property.fieldName.jsonString"
                defaultMessage="Json字符串"
              />
            ),
            value: 8,
          },
        ],
        onChange: (value: any) => {
          console.log();
        },
      },
    },
    {
      title: <FormattedMessage id="pages.property.fieldName.listType" defaultMessage="列表类型" />,
      dataIndex: ['RelatedResponseItem', 'ID'],
      renderFormItem: (_, config, data) => {
        // 这里返回的值与Protable的render返回的值差不多,能获取到index,row,data 只是这里是获取对象组,外面会在包一层
        console.log(_, config, data);
        let disabled = false; // 列表、可输入列表、多选列表才可编辑
        if (!config.record || (config.record && [0, 3, 7].indexOf(config.record.ValueType) == -1)) {
          // 如果行业未选择或者选择不可填写,产品不能选择
          disabled = true;
        }
        let value: any = '';
        if (IsNotEmptyGuid(config.record?.RelatedResponseItem?.ID)) {
          value = config.record?.RelatedResponseItem?.ID;
        }
        return (
          <Select disabled={disabled} value={value}>
            {customList.map((item) => (
              <Select.Option value={item.value} key={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        );
      },
    },
    {
      title: <FormattedMessage id="pages.property.fieldName.format" defaultMessage="格式" />,
      dataIndex: 'ValueFormat',
      renderFormItem: (_, config, data) => {
        console.log(_, config, data);
        let disabled = false; // 数值、日期时间、json才可编辑
        if (!config.record || (config.record && [1, 5, 8].indexOf(config.record.ValueType) == -1)) {
          disabled = true;
        }
        let items;
        switch (config.record?.ValueType) {
          case 1:
            items = (
              <Select disabled={disabled}>
                {[
                  { label: '{0:N}', value: '{0:N}' },
                  { label: '{0:E}', value: '{0:E}' },
                  { label: '{0:D}', value: '{0:D}' },
                  { label: '{0:N3}', value: '{0:N3}' },
                  { label: '{0:N4}', value: '{0:N4}' },
                ].map((item) => (
                  <Select.Option value={item.value} key={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            );
            break;
          case 5:
            items = (
              <Select disabled={disabled}>
                {[
                  { label: 'yyyy-MM-dd', value: 'yyyy-MM-dd' },
                  { label: 'yyyy年MM月dd日', value: 'yyyy年MM月dd日' },
                  { label: 'HH:mm:ss', value: 'HH:mm:ss' },
                  { label: 'HH时mm分ss秒', value: 'HH时mm分ss秒' },
                  { label: 'yyyy-MM-dd HH:mm:ss', value: 'yyyy-MM-dd HH:mm:ss' },
                  { label: 'yyyy年MM月dd日 HH时mm分ss秒', value: 'yyyy年MM月dd日 HH时mm分ss秒' },
                ].map((item) => (
                  <Select.Option value={item.value} key={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            );
            break;
          case 8:
            items = 'json对话框';
            break;
          default:
            break;
        }
        return items;
      },
    },
    {
      title: (
        <FormattedMessage id="pages.property.fieldName.defaultValue" defaultMessage="缺省值" />
      ),
      dataIndex: 'DefaultValue',
      renderFormItem: (_, config, data) => {
        // // 这里返回的值与Protable的render返回的值差不多,能获取到index,row,data 只是这里是获取对象组,外面会在包一层
        // console.log(_, config, data);
        // let disabled = false;
        // if (!config.record || (config.record && config.record.RelatedResponseItem?.ID === '5')) {
        //   // 如果行业未选择或者选择不可填写,产品不能选择
        //   disabled = true;
        // }
        // return (
        //   <Select disabled={disabled}>
        //     <Select.Option value="1">必填产品1</Select.Option>
        //     <Select.Option value="2">产品2</Select.Option>
        //     <Select.Option value="3">产品3</Select.Option>
        //   </Select>
        // );
        const dataType = config.record?.ValueType;
        const responseItemID = config.record?.RelatedResponseItem?.ID;
        let options: any[] = [];
        if (responseItemID && IsNotEmptyGuid(responseItemID)) {
          options = customListItems[responseItemID] || [];
        }
        const formatType = config.record?.ValueFormat;
        console.log(formatType);
        // mode={dataType == 7?"multiple":undefined}
        let defaultValueItem;

        switch (dataType) {
          case 1:
          case 2:
            defaultValueItem = <Input allowClear />;
            break;
          case 0:
          case 3:
          case 7:
            defaultValueItem = (
              <Select>
                {options.map((item) => (
                  <Select.Option value={item.value} key={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            );
            break;
          case 5:
            // defaultValueItem = renderDateTime(
            //   config.record?.ValueFormat!,
            //   config.record?.CurrentValue || config.record?.DefaultValue,
            // );
            break;
          default:
            break;
        }
        return defaultValueItem;
      },
    },
    {
      title: (
        <FormattedMessage id="pages.property.fieldName.engineeringUnit" defaultMessage="工程单位" />
      ),
      dataIndex: ['RelatedEngineeringUnit', 'ID'],
      renderFormItem: (_, config, data) => {
        // const dataType = config.record?.ValueType;
        // if (dataType != 1) {
        //   return '';
        // }
        // return (
        //   <Select>
        //     {engUnits.map((item) => (
        //       <Select.Option value={item.value} key={item.value}>
        //         {item.label}
        //       </Select.Option>
        //     ))}
        //   </Select>
        // );
        console.log(_, config, data);
        let disabled = false; // 数值才可编辑
        if (!config.record || (config.record && config.record.ValueType !== 1)) {
          disabled = true;
        }
        return (
          <Select disabled={disabled}>
            {engUnits.map((item) => (
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
        <FormattedMessage id="pages.property.fieldName.isMobileSync" defaultMessage="终端同步" />
      ),
      dataIndex: 'IsMobileSync',
      renderFormItem: (_, config, data) => {
        return <Checkbox checked={config.record?.IsMobileSync || false}> </Checkbox>;
      },
    },
    {
      title: <FormattedMessage id="pages.property.fieldName.invisible" defaultMessage="不可查看" />,
      dataIndex: 'Invisible',
      renderFormItem: (_, config, data) => {
        return <Checkbox checked={config.record?.Invisible || false}> </Checkbox>;
      },
    },
    {
      title: (
        <FormattedMessage id="pages.property.fieldName.isSaveHistory" defaultMessage="不保存历史" />
      ),
      dataIndex: 'IsNotSaveHistory',
      renderFormItem: (_, config, data) => {
        return <Checkbox checked={config.record?.IsNotSaveHistory || false}> </Checkbox>;
      },
    },
    {
      title: (
        <FormattedMessage
          id="pages.property.fieldName.isTelemeteringData"
          defaultMessage="外部属性"
        />
      ),
      dataIndex: 'IsTelemeteringData',
      renderFormItem: (_, config, data) => {
        return <Checkbox checked={config.record?.IsTelemeteringData || false}> </Checkbox>;
      },
    },
    {
      title: <FormattedMessage id="pages.property.fieldName.groupName" defaultMessage="组名" />,
      dataIndex: 'GroupName',
      renderFormItem: (_, config, data) => {
        return <Input allowClear />;
      },
    },
  ];
  const renderModalTitle = () => {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginRight: '30px' }}>
      {title}{fullScreen ? <FullscreenExitOutlined onClick={() => {
        setFullScreen(false); exitFullScreen();
      }} /> : <FullscreenOutlined onClick={() => {
        requestFullScreen(document.getElementsByClassName('propertyModal')[0].getElementsByClassName('ant-modal-content')[0]);
      }} />}
    </div>
  }
  return (
    <Modal
      wrapClassName='propertyModal'
      title={renderModalTitle()}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      width="80%"
      bodyStyle={{ height: document.body.clientHeight * 0.6 + 'px', overflow: 'auto' }}
    >
      {/* onClick={()=>showOnePropertyModal('new')} */}
      <Button type="primary" icon={<PlusOutlined />}>
        {useIntl().formatMessage({
          id: 'pages.operation.new',
          defaultMessage: '新建',
        })}
      </Button>
      <Button icon={<EditOutlined />}>
        {useIntl().formatMessage({
          id: 'pages.operation.edit',
          defaultMessage: '编辑',
        })}
      </Button>
      <Button icon={<DeleteOutlined />}>
        {useIntl().formatMessage({
          id: 'pages.operation.delete',
          defaultMessage: '删除',
        })}
      </Button>
      {/* {JSON.stringify(dataSource)} */}
      {/*  {JSON.stringify(editableKeys)}
      {JSON.stringify(dataSource)} */}
      <EditableProTable<any>
        // headerTitle="可编辑表格"
        columns={columns}
        rowKey="ID"
        scroll={{
          x: 960,
        }}
        value={dataSource}
        // onChange={setDataSource}
        // recordCreatorProps={{
        //   newRecordType: 'dataSource',
        //   record: () => ({
        //     ID: Date.now(),
        //   }),
        // }}
        // toolBarRender={() => {
        //   return [
        //     <Button
        //       type="primary"
        //       key="save"
        //       onClick={() => {
        //         // dataSource 就是当前数据，可以调用 api 将其保存
        //         // console.log(dataSource);
        //       }}
        //     >
        //       保存数据
        //     </Button>,
        //   ];
        // }}
        editable={{
          type: 'multiple',
          editableKeys: dataSource.map((item) => item.ID),
          // actionRender: (row, config, defaultDoms) => {
          //   return [defaultDoms.delete];
          // },
          // onValuesChange: (record, recordList) => {
          //   setDataSource(recordList);
          // },
          // onChange: setEditableRowKeys,
          onValuesChange: (record, recordList) => {
            console.log(record);
            console.log(recordList);
            setDataSource(recordList);
          },
        }}
      />
    </Modal>
  );
};
export default OnePropertyModal;
