import React from 'react';
import GuideSvg from '@/assets/menu/guide.svg';
import PermissionSvg from '@/assets/menu/permission.svg';
import DashboardSvg from '@/assets/menu/dashboard.svg';
import AccountSvg from '@/assets/menu/account.svg';
import DocumentationSvg from '@/assets/menu/documentation.svg';

interface CustomIconProps {
  type: string | undefined;
}

export const MenuIcon: React.FC<CustomIconProps> = props => {
  const {type} = props;
  let com = <GuideSvg/>;
  if (type === 'guide') {
    com = <GuideSvg/>;
  } else if (type === 'permission') {
    com = <PermissionSvg/>;
  } else if (type === 'dashboard') {
    com = <DashboardSvg/>;
  } else if (type === 'account') {
    com = <AccountSvg/>;
  } else if (type === 'documentation') {
    com = <DocumentationSvg/>;
  } else {
    com = <GuideSvg/>;
  }
  return <span className="anticon">{com}</span>;
};
