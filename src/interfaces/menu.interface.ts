export interface MenuItemProps {
  _id?: string;
  action: string;
  menuType: number; //菜单类型
  menuName: string; //菜单名称
  menuCode?: string; //权限标识
  path?: string; //路由地址
  icon?: string; //图标
  component?: string; //组件地址
  menuState?: number; //菜单状态
  parentId: string[],
}
export interface MenuListProps {
  menuName?: string;
  menuState?: string;
}

export interface InitialStateProps {
  loading: boolean;
  error: null | string;
  menuList: MenuItemProps[]
}
