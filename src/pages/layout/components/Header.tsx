import React from 'react'
import {HeaderProps} from "@/interfaces/user.interface";
import styles from "@/pages/layout/index.less";
import {Button, Popover, Layout} from "antd";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons/lib";
import {useAppDispatch, useAppState} from "@/store";
import {userSlice} from "@/store/slices";
import {useNavigate} from "react-router-dom";

const {Header} = Layout;
const avatar = require('@/assets/East_White.jpg');

/**
 * 主页头部组件封装
 * @date 2021-12-05
 * @param toggle
 * @param collapsed
 * @constructor
 */
const HeaderComponent: React.FC<HeaderProps> = ({toggle, collapsed}) => {
  const {userInfo} = useAppState(state => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // 退出登录
  const handleLogOut = () => {
    dispatch(userSlice.actions.logOut());
    navigate("/login");
  };

  return (
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
  )
};

export default HeaderComponent;
