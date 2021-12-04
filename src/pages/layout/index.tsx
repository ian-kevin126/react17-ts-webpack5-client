import React, {useState} from 'react'
import {Menu, Layout} from 'antd';
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

const {Sider, Header, Content} = Layout;
const avatar = require('@/assets/East_White.jpg');

const MainLayout: React.FC = () => {
  const userInfo = useSelector(s => s.user.userInfo);
  const [collapsed, setCollapsed] = useState(false);

  console.log('userInfo', userInfo)

  const toggle = () => {
    setCollapsed(prev => !prev)
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
        {collapsed ? <MenuUnfoldOutlined onClick={toggle}/> : <MenuFoldOutlined onClick={toggle}/>}
        <div className={styles.userInfo}>
          <span>{userInfo?.username}</span>
          <img src={avatar} alt=""/>
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
