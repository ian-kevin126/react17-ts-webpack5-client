import React, {Suspense, useCallback, useEffect} from 'react'
import {Layout} from 'antd';
import styles from './index.less';
import {Outlet, useLocation} from 'react-router-dom'
import {userSlice} from "@/store/slices";
import {useAppDispatch, useAppState} from "@/store";
import HeaderComponent from "@/pages/layout/components/Header";
import SideMenuComponent from "@/pages/layout/components/SideMenu";
import mockMenuList from "@/pages/layout/components/menuList";
import {MenuChild, MenuList} from "@/interfaces/user.interface";
import SuspenseFallback from "@/components/SuspenseFallback";
import {useNavigate} from 'react-router-dom';
import TagsView from "@/pages/layout/components/tagView";

const {Content} = Layout;

/**
 * 主页面布局组件
 * @author ian-kevin
 * @date 2021-12-04
 * @constructor
 */
const MainLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {collapsed} = useAppState(state => state.user);

  // 切换左侧菜单栏的收起和展开
  const toggleSidebarCollapsed = () => {
    dispatch(
      userSlice.actions.setUserState({
        collapsed: !collapsed,
      }),
    );
  };

  // 初始化菜单列表，扁平化
  const initMenuList = useCallback((menu: MenuList) => {
    const _menuList: MenuChild[] = [];
    menu.forEach(m => {
      if (!m?.children?.length) {
        _menuList.push(m);
      } else {
        m?.children.forEach(mu => {
          _menuList.push(mu);
        });
      }
    });
    return _menuList;
  }, []);

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/dashboard');
    }
  }, [navigate, location]);

  useEffect(() => {
    dispatch(userSlice.actions.setUserState({
      menuList: initMenuList(mockMenuList)
    }))
  }, [dispatch, initMenuList]);

  return (<Layout className={styles.mainLayout}>
    <SideMenuComponent menuList={mockMenuList}/>
    <Layout className={styles.contentLayout}>
      <HeaderComponent collapsed={collapsed} toggle={toggleSidebarCollapsed}/>
      <Content className={styles.contentWrapper}>
        <TagsView />
        <Suspense fallback={SuspenseFallback}><Outlet/></Suspense>
      </Content>
    </Layout>
  </Layout>)
};

export default MainLayout;
