import React, {useState} from 'react'
import {Menu, Layout, Popover, Button} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import styles from './index.less';
import Logo from '@/assets/logo.svg';
import {Outlet} from 'react-router-dom'
import {useSelector} from "@/store/hooks";
import {useDispatch} from 'react-redux'
import {userSlice} from "@/store/slices";
import {useNavigate} from 'react-router-dom';

const {Sider, Header, Content} = Layout;
const avatar = require('@/assets/East_White.jpg');

/**
 * 主页面布局组件
 * @constructor
 */
const MainLayout: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(s => s.user.userInfo);
  const [collapsed, setCollapsed] = useState(false);

  console.log('userInfo', userInfo);

  const toggle = () => {
    setCollapsed(prev => !prev)
  };

  // 退出登录
  const handleLogOut = () => {
    dispatch(userSlice.actions.logOut());
    navigate("/login");
  };

  return (<Layout className={styles.mainLayout}>
    <Sider className={styles.sideMenu} trigger={null} collapsible collapsed={collapsed}>
      <div className={styles.logoWrapper}>
        <Logo className={styles.logo}/>
      </div>
      <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<UserOutlined/>}>
          nav 1
        </Menu.Item>
        <Menu.Item key="2" icon={<VideoCameraOutlined/>}>
          nav 2
        </Menu.Item>
        <Menu.Item key="3" icon={<UploadOutlined/>}>
          nav 3
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout className={styles.contentLayout}>
      <Header className={styles.header}>
        {
          collapsed ? <MenuUnfoldOutlined className={styles.foldIcon} onClick={toggle}/> :
            <MenuFoldOutlined className={styles.foldIcon} onClick={toggle}/>
        }
        <div className={styles.userInfo}>
          <Popover content={<div>
            <div style={{textAlign: "center", marginBottom: 8}}>{userInfo?.username}</div>
            <Button onClick={handleLogOut}>退出登录</Button>
          </div>}
          >
            <img className={styles.avatar} src={avatar} alt=""/>
          </Popover>
        </div>
      </Header>
      <Content
        className="site-layout-background"
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 280,
        }}
      >
        <Outlet/>
      </Content>
    </Layout>
  </Layout>)
};

export default MainLayout;
