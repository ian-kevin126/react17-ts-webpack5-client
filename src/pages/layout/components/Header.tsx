import React from 'react';
import { HeaderProps } from '@/interfaces/user.interface';
import styles from '@/pages/layout/index.less';
import { Layout, Menu, Dropdown, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons/lib';
import { useAppDispatch, useAppState } from '@/store';
import { userSlice } from '@/store/slices';
// import Logo from '@/assets/logo.svg';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;
const avatar = require('@/assets/East_White.jpg');

/**
 * 主页头部组件封装
 * @date 2021-12-05
 * @param toggle
 * @param collapsed
 * @constructor
 */
const HeaderComponent: React.FC<HeaderProps> = ({ toggle, collapsed }) => {
  const { userInfo } = useAppState((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // 退出登录
  const handleLogOut = () => {
    dispatch(userSlice.actions.logOut());
    navigate('/login');
  };

  // 个人信息和退出登录下拉菜单
  const menu = (
    <Menu>
      <Menu.Item>
        <div style={{ textAlign: 'center', fontWeight: 'bold' }}>{userInfo?.username}</div>
      </Menu.Item>
      <Menu.Item>
        <Button type="link" onClick={handleLogOut}>
          退出登录
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className={styles.header}>
      <div className={styles.logoWrapper} style={{ width: collapsed ? 100 : 240 }}>
        <img className={styles.logo} src={avatar} alt="" />
        {/* <Logo className={styles.logo} /> */}
        {!collapsed && <div>East-White</div>}
      </div>
      <div className={styles.headerRight}>
        {collapsed ? (
          <MenuUnfoldOutlined className={styles.foldIcon} onClick={toggle} />
        ) : (
          <MenuFoldOutlined className={styles.foldIcon} onClick={toggle} />
        )}
        <div className={styles.userInfo}>
          <Dropdown overlay={menu}>
            <img className={styles.avatar} src={avatar} alt="" />
          </Dropdown>
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent;
