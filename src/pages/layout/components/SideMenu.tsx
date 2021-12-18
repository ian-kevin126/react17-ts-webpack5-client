import React, { useEffect, useState } from 'react';
import { MenuList, MenuProps } from '@/interfaces/user.interface';
import styles from '@/pages/layout/index.less';
import { Layout, Menu } from 'antd';
import { useAppState } from '@/store';
import { useLocation, useNavigate } from 'react-router-dom';
// import {userSlice} from "@/store/slices";
import { MenuIcon } from '@/pages/layout/components/MenuIcon';

const { Sider } = Layout;
const { SubMenu, Item } = Menu;

/**
 * 侧边栏组菜单件
 * @date 2021-12-05
 * @param menuList
 * @constructor
 */
const SideMenuComponent: React.FC<MenuProps> = ({ menuList }) => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const { collapsed } = useAppState((state) => state.user);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();

  useEffect(() => {
    setSelectedKeys([pathname]);
    setOpenKeys(collapsed ? [] : ['/' + pathname.split('/')[1]]);
  }, [collapsed, pathname]);

  const getTitle = (menu: MenuList[0]) => {
    return (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <MenuIcon type={menu.icon} />
        <span>{menu.label['zh_CN']}</span>
      </span>
    );
  };

  const onOpenChange = (keys: string[]) => {
    const key = keys.pop();
    setOpenKeys(key ? [key] : []);
  };

  const onMenuClick = (menu: MenuList[0]) => {
    if (menu.path === pathname) return;
    const { key, path } = menu;
    setSelectedKeys([key]);
    // if (device !== 'DESKTOP') {
    //   dispatch(userSlice.actions.setUserState({collapsed: true}));
    // }
    // dispatch(
    //   addTag({
    //     id: key,
    //     label,
    //     path,
    //     closable: true,
    //   }),
    // );
    navigate(path);
  };

  return (
    <Sider className={styles.sideMenu} trigger={null} collapsible collapsed={collapsed}>
      <Menu
        mode="inline"
        theme="light"
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={onOpenChange as any}
        className={styles.menu}
      >
        {menuList?.map((menu) =>
          menu.children ? (
            <SubMenu key={menu.path} title={getTitle(menu)}>
              {menu.children.map((child) => (
                <Item key={child.path} onClick={() => onMenuClick(child)}>
                  {child.label['zh_CN']}
                </Item>
              ))}
            </SubMenu>
          ) : (
            <Item key={menu.path} onClick={() => onMenuClick(menu)}>
              {getTitle(menu)}
            </Item>
          ),
        )}
      </Menu>
    </Sider>
  );
};

export default SideMenuComponent;
