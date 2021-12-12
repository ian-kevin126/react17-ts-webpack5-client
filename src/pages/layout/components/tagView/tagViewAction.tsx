import React, {FC} from 'react';
import {Menu, Dropdown} from 'antd';
import {SettingOutlined} from '@ant-design/icons';
// import { LocaleFormatter } from 'locales';
import {useAppDispatch, useAppState} from '@/store';
import {removeTag, removeOtherTag, removeAllTag} from '@/store/slices';

const TagsViewAction: FC = () => {
  const {activeTagId} = useAppState(state => state.tagsView);
  const dispatch = useAppDispatch();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="0" onClick={() => dispatch(removeTag(activeTagId))}>
            {/*<LocaleFormatter id="tagsView.operation.closeCurrent" />*/}
            关闭当前
          </Menu.Item>
          <Menu.Item key="1" onClick={() => dispatch(removeOtherTag())}>
            {/*<LocaleFormatter id="tagsView.operation.closeOther" />*/}
            关闭其他
          </Menu.Item>
          <Menu.Item key="2" onClick={() => dispatch(removeAllTag())}>
            {/*<LocaleFormatter id="tagsView.operation.closeAll" />*/}
            关闭所有
          </Menu.Item>
          <Menu.Divider/>
          <Menu.Item key="3" onClick={() => dispatch(removeAllTag())}>
            {/*<LocaleFormatter id="tagsView.operation.dashboard" />*/}
            首页
          </Menu.Item>
        </Menu>
      }
    >
      <span id="pageTabs-actions">
        <SettingOutlined className="tagsView-extra"/>
      </span>
    </Dropdown>
  );
};

export default TagsViewAction;
