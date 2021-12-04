import React from 'react';
import styles from "@/pages/user/loginPage.less";
import {Button, Form, Input} from "antd";
import {useDispatch} from 'react-redux';
import {RegisterProps} from "@/interfaces/user.interface";
import {register} from "@/store/slices";
import {useNavigate} from 'react-router-dom';


const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 点击注册
  const onFinish = (values: RegisterProps) => {
    dispatch(register(values));
  };

  // 已有账号，跳转登录页
  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className={styles.loginWrapper}>
      <Form
        name="basic"
        labelCol={{span: 8}}
        wrapperCol={{span: 16}}
        initialValues={{remember: true}}
        onFinish={onFinish}
        autoComplete="off"
        className={styles.form}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{required: true, message: '请输入您的用户名!'}]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{required: true, message: '请输入您的密码!'}]}
        >
          <Input.Password/>
        </Form.Item>

        <Form.Item
          label="手机号码"
          name="phoneNo"
          rules={[{required: false, message: '请输入您的手机号码!'}]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="邮箱"
          name="email"
          rules={[{required: false, message: '请输入您的邮箱!'}]}
        >
          <Input/>
        </Form.Item>

        <Form.Item wrapperCol={{offset: 8, span: 16}}>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
          <div className={styles.gotoRegister}>
            <a onClick={goToLogin}>已有账号？去登录</a>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
};

export default RegisterPage;
