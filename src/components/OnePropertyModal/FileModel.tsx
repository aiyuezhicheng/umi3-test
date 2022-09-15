import {
  PlusOutlined,
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
  List
} from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import moment from 'moment';
import type { DatePickerProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useRequest, useIntl, FormattedMessage } from 'umi';
import { Property } from '@/utils/data.d';
import {
  IsNotEmptyGuid,
  FormatDateTimeByFormat,
  requestFullScreen,
  exitFullScreen,
  isFullscreenElement,
  GuidEmpty,
} from '@/utils/common';
import { find } from 'lodash';
import Empty from 'antd/es/empty';

type SelectFilesProps = {
  visible:boolean,
  value:[],
  onConfirm?:any
};


const SelectFilesModal: React.FC<SelectFilesProps> = (props) => {
  const { visible, value } = props;
}
export default SelectFilesModal;
