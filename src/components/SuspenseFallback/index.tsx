import React from 'react';
import {Spin} from 'antd'

const SuspenseFallback: React.FC = () => {
  return (
    <div>
      <Spin/>
    </div>
  )
};

export default SuspenseFallback;
