import { Col, Input } from 'antd';
import React from 'react';
import styles from './index.less';

interface CommonInputProps {
  state: string;
  setState: (v: string) => void;
  text: string;
  span?: number;
  placeholder?: string;
}

/**
 * 普通的输入框
 * @param param0
 * @returns
 */
export const CommonInput = ({
  span = 8,
  state,
  setState,
  text = '',
  placeholder = '',
}: CommonInputProps) => {
  return (
    <Col span={span} className={styles.colWrapper}>
      <div>{text}：</div>
      <Input
        placeholder={placeholder}
        className={styles.inputCom}
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
    </Col>
  );
};
