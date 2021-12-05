enum DeviceList {
  MOBILE = 'MOBILE',
  DESKTOP = 'DESKTOP',
}

export type Device = keyof typeof DeviceList;

export interface RegisterProps {
  username: string;
  password: string;
  phoneNo?: string;
  email?: string;
  token?: string;
}

export interface LoginProps {
  username: string;
  password: string;
}

export interface UserState {
  loading: boolean;
  error: string | null;
  token: string | null;
  device: Device;
  collapsed: boolean;
  menuList: MenuChild[];
  userInfo: RegisterProps | null
}

export interface HeaderProps {
  collapsed: boolean;
  toggle: () => void
}

interface MenuItem {
  /** menu item name */
  name: string;
  /** menu labels */
  label: {
    zh_CN: string;
    en_US: string;
  };
  /** 图标名称
   *
   * 子子菜单不需要图标
   */
  icon?: string;
  /** 菜单id */
  key: string;
  /** 菜单路由 */
  path: string;
  /** 子菜单 */
  children?: MenuItem[];
}

export type MenuChild = Omit<MenuItem, 'children'>;

export type MenuList = MenuItem[];

export interface MenuProps {
  menuList: MenuList;
}
