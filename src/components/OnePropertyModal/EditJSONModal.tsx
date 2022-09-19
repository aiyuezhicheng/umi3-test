import { PlusOutlined } from '@ant-design/icons';
import {
    ModalForm,
    ProForm,
    ProFormList,
    ProFormDateRangePicker,
    ProFormSelect,
    ProFormText,
    ProFormDependency,
    ProFormCheckbox,
    ProFormDigit
} from '@ant-design/pro-form';
import { Button, Form, message,Checkbox,Input} from 'antd';

const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};
export type EditJSONModalProps = {
    title?: React.ReactNode | string;
    isPropertyModalVisible: boolean;
    handleCancel?: React.ReactNode | string;
    jsonInfo?: string;
};


const EditJSONModal: React.FC<EditJSONModalProps> = (props) => {
    const { isPropertyModalVisible, jsonInfo } = props;
    const [form] = Form.useForm<{ name: string; company: string }>();
    return (
        <ModalForm<{
            name: string;
            company: string;
        }>
            title="新建表单"
            // trigger={
            //     <Button type="primary">
            //         <PlusOutlined />
            //         新建表单
            //     </Button>
            // }
            form={form}
            autoFocusFirstInput
            // modalProps={{
            //     destroyOnClose: true,
            //     onCancel: () => console.log('run'),
            // }}
            // submitTimeout={2000}
            onFinish={async (values) => {
                await waitTime(2000);
                console.log(values.name);
                message.success('提交成功');
                return true;
            }}
            visible={isPropertyModalVisible}
        >
<ProFormCheckbox.Group
  name="checkbox"
  layout="vertical"
  label="是否是数组"
  options={['农业', '制造业', '互联网']}
/>
是否是数组 <Checkbox />
        
        数组长度 <Input />
<ProFormDigit
  label="数组长度"
  name="input-number"
  min={0}
  fieldProps={{ precision: 0 }}
/>
            <ProForm>
                
                <ProFormList
                    name={['default', 'users']}
                    label="用户信息"
                    initialValue={[
                        {
                            name: '我是姓名',
                        },
                    ]}
                    itemContainerRender={(doms) => {
                        return <ProForm.Group>{doms}</ProForm.Group>;
                    }}
                >
                    {(f, index, action) => {
                        console.log(f, index, action);
                        return (
                            <>
                                <ProFormText initialValue={index} name="rowKey" label={`第 ${index} 配置`} />
                                <ProFormText name="name" label="姓名" />
                                <ProFormDependency name={['name']}>
                                    {({ name }) => {
                                        if (!name) {
                                            return (
                                                <span
                                                    style={{
                                                        lineHeight: '32px',
                                                    }}
                                                >
                                                    输入姓名展示
                                                </span>
                                            );
                                        }
                                        return <ProFormText name="remark" label="昵称详情" />;
                                    }}
                                </ProFormDependency>
                                <ProFormSelect
                                    name="addr"
                                    width="md"
                                    label="与 name 联动的选择器"
                                    dependencies={['name']}
                                    request={async (params) => [
                                        { label: params.name, value: 'all' },
                                        { label: 'Unresolved', value: 'open' },
                                        { label: 'Resolved', value: 'closed' },
                                        { label: 'Resolving', value: 'processing' },
                                    ]}
                                />
                            </>
                        );
                    }}
                </ProFormList>
            </ProForm>
        </ModalForm>
    );
};
export default EditJSONModal;