import React, {useEffect} from 'react';
import {Form, Input, Checkbox, Button} from 'antd';
import styles from './loginPage.less'
import {LoginProps} from "@/interfaces/user.interface";
import {useDispatch} from "react-redux";
import {login} from "@/store/slices";
import {useSelector} from "@/store/hooks";
import {useNavigate} from 'react-router-dom';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(s => s.user.token);

  useEffect(() => {
    if (token != null) {
      setTimeout(() => navigate('/'), 1500)
    }
  }, [token, navigate])

  // 点击登录
  const onFinish = (values: LoginProps) => {
    dispatch(login(values));
  };

  // 没有账号，跳转注册页
  const goToRegister = () => {
    navigate('/register');
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

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{offset: 8, span: 16}}>
          <Checkbox>记住我</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{offset: 8, span: 16}}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
          <div className={styles.gotoRegister}>
            <a onClick={goToRegister}>没有账号？去注册一个</a>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
};

export default LoginPage;
