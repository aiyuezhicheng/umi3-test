import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer, Tabs, Form, Select, Space, TreeSelect, Modal } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';

import React, { useEffect, useState } from 'react';
import { useRequest, useIntl, FormattedMessage } from 'umi';
import { Property } from '@/utils/data.d'
// import { AssetTypeItem, AssetTypePropertyItem } from '../data.d';
// import { getMaterialList, getAssetTypeTree, getOneAssetType } from '../service';

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

  // const [customListObj, setCustomListObj] = useState({});
  // const [oneCustomListItems, setOneCustomListItems] = useState({});
  // const [engUnitObj, setEngUnitObj] = useState({});
  const [dataSource, setDataSource] = useState<any[]>([]);
  
  useEffect(() => {
    console.log(properties)
    setDataSource(properties || []);
    // setEditableRowKeys(properties.map(item=>item.ID))
  })
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(dataSource.map(item=>item.ID));

  useEffect(()=>{
    console.log(dataSource)
    setEditableRowKeys(dataSource.map(item=>item.ID))
  },['dataSource'])


  // useEffect(() => {
  //   let data = {};
  //   const list = [
  //     { ID: '18d73844-ebbd-4a3c-af7a-0af21e8aa7a1', Name: '一周' },
  //     { ID: '28d73844-ebbd-4a3c-af7a-0af21e8aa7a1', Name: '是/否' },
  //     { ID: '38d73844-ebbd-4a3c-af7a-0af21e8aa7a1', Name: '设备' },
  //   ];
  //   list.map((item) => {
  //     data[item['ID']] = { text: item.Name };
  //   });
  //   setCustomListObj(data);
  //   let obj = {};
  //   const engineeringUnitList = [
  //     { ID: '8626dc3b-9af0-4641-8a88-4479491fa9b5', Name: '米' },
  //     { ID: 'a626dc3b-9af0-4641-8a88-4479491fa9b5', Name: '厘米' },
  //     { ID: 'b626dc3b-9af0-4641-8a88-4479491fa9b5', Name: '度' },
  //     { ID: 'c626dc3b-9af0-4641-8a88-4479491fa9b5', Name: '摄氏度' },
  //   ];
  //   engineeringUnitList.map((item) => {
  //     obj[item['ID']] = { text: item.Name };
  //   });
  //   setCustomListObj(obj);
  // }, ['title']);
  const columns: ProColumns<Property>[] = [
    {
      title: <FormattedMessage id="pages.table.columnName.propertyName" defaultMessage="属性名" />,
      dataIndex: 'Name',
      width: '30%',
      formItemProps: {
        rules: [
          {
            required: true,
            whitespace: true,
            message: '此项是必填项',
          },
          {
            message: '必须包含数字',
            pattern: /[0-9]/,
          },
          {
            max: 16,
            whitespace: true,
            message: '最长为 16 位',
          },
          {
            min: 6,
            whitespace: true,
            message: '最小为 6 位',
          },
        ],
      },
    },
    {
      title: <FormattedMessage id="pages.table.columnName.dataType" defaultMessage="数据类型" />,
      key: 'ValueType',
      dataIndex: 'ValueType',
      valueType: 'select',
      valueEnum: {
        1: {
          text: <FormattedMessage id="pages.property.fieldName.number" defaultMessage="数值" />,
        },
        2: {
          text: <FormattedMessage id="pages.property.fieldName.string" defaultMessage="字符串" />,
        },
        0: { text: <FormattedMessage id="pages.property.fieldName.list" defaultMessage="列表" /> },
        3: {
          text: (
            <FormattedMessage
              id="pages.property.fieldName.canInputList"
              defaultMessage="可输入列表"
            />
          ),
        },
        5: {
          text: (
            <FormattedMessage id="pages.property.fieldName.dateTime" defaultMessage="日期时间" />
          ),
        },
        6: { text: <FormattedMessage id="pages.property.fieldName.file" defaultMessage="文件" /> },
        7: {
          text: (
            <FormattedMessage id="pages.property.fieldName.multiList" defaultMessage="多选列表" />
          ),
        },
        8: {
          text: (
            <FormattedMessage
              id="pages.property.fieldName.jsonString"
              defaultMessage="Json字符串"
            />
          ),
        },
      },
    },
    {
      title: <FormattedMessage id="pages.table.columnName.propertyName" defaultMessage="属性名" />,
      dataIndex: 'IsMobileSync',
    },
    {
      title: <FormattedMessage id="pages.table.columnName.propertyName" defaultMessage="属性名" />,
      dataIndex: 'Invisible',
    }
    // {
    //   title: <FormattedMessage id="pages.table.columnName.listType" defaultMessage="列表类型" />,
    //   key: 'state',
    //   dataIndex: 'state',
    //   valueType: 'select',
    //   valueEnum: customListObj,
    // },
    // {
    //   title: (
    //     <FormattedMessage id="pages.table.columnName.engineeringUnit" defaultMessage="工程单位" />
    //   ),
    //   key: 'state',
    //   dataIndex: 'state',
    //   valueType: 'select',
    //   valueEnum: engUnitObj,
    // },
    // {
    //   title: '操作',
    //   valueType: 'option',
    //   width: 250,
    //   render: () => {
    //     return null;
    //   },
    // },
  ];
  return (
    <Modal
      title={title}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      width="70%"
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
      {console.log(properties)}
      {JSON.stringify(editableKeys)}
      {JSON.stringify(dataSource)}
      <EditableProTable<any>
        headerTitle="可编辑表格"
        columns={columns}
        rowKey="ID"
        // scroll={{
        //   x: 960,
        // }}
        value={dataSource}
        onChange={setDataSource}
        recordCreatorProps={{
          newRecordType: 'dataSource',
          record: () => ({
            ID: Date.now(),
          }),
        }}
        toolBarRender={() => {
          return [
            <Button
              type="primary"
              key="save"
              onClick={() => {
                // dataSource 就是当前数据，可以调用 api 将其保存
                // console.log(dataSource);
              }}
            >
              保存数据
            </Button>,
          ];
        }}
        editable={{
          type: 'multiple',
          editableKeys:dataSource.map(item=>item.ID),
          // actionRender: (row, config, defaultDoms) => {
          //   return [defaultDoms.delete];
          // },
          // onValuesChange: (record, recordList) => {
          //   setDataSource(recordList);
          // },
          // onChange: setEditableRowKeys,
        }}
      />
    </Modal>
  );
};
export default OnePropertyModal;
