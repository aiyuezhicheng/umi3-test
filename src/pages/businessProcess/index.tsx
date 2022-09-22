import { PageContainer } from '@ant-design/pro-layout';
import { Typography } from 'antd';
import React from 'react';

const BusinessProcess: React.FC = () => {
  return (
    <PageContainer title={false} content={<Typography.Text type="secondary">业务流程</Typography.Text>}>
      <div>业务流程</div>
     </PageContainer>
    
  );
};
export default BusinessProcess;
