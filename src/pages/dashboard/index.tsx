import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, Col, Form, Input, Modal, Radio, Row, Table, TreeSelect } from 'antd';
import { CommonInput } from '@/components/commonSearchComponent';
import styles from './index.less';
import { useAppDispatch, useAppState } from '@/store';
import { getMenuList, operateMenuItem } from '@/store/slices/menu.slice';
import { cleanFalsyParams } from '@/utils/common';
import { ColumnsType } from 'antd/lib/table';
import { MenuItemProps } from '@/interfaces/menu.interface';

const { TreeNode } = TreeSelect;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

/**
 * 看板页面（待完成）
 * @author ian-kevin
 * @date 2021-12-04
 * @constructor
 */
const Index: React.FC = () => {
  const [menuName, setMenuName] = useState(''); // 菜单名称
  const [menuState, setMenuState] = useState(''); // 菜单状态
  const [parentId, setParentId] = useState(undefined);
  const [addMenuItemModal, setAddMenuItemModal] = useState(false); // 增加菜单弹框
  const { menuList, loading } = useAppState((state) => state.menu);
  const dispatch = useAppDispatch();

  console.log('menuList', menuList);

  const [form] = Form.useForm();

  // 重置
  const handleReset = () => {
    // TODO:
  };

  // 查询
  const handleSearch = useCallback(() => {
    dispatch(getMenuList(cleanFalsyParams({ menuName, menuState })));
  }, [dispatch, menuName, menuState]);

  // 新增菜单
  const addMenuItem = () => {
    setAddMenuItemModal(true);
  };

  // 提交表单
  const onFinish = (values: any) => {
    console.log(values);
    dispatch(operateMenuItem({ action: 'add', ...values }));
  };

  // 选择父级菜单
  const onChangeParentIdSelect = (value: any) => {
    setParentId(value);
  };

  // 选择菜单类型
  const onChangeMenuType = (value: any) => {
    console.log('value', value);
    form.setFieldsValue({ authority: '' });
  };

  // 新建或编辑菜单
  const handleSubmit = () => {
    // TODO:
  };

  const columns: ColumnsType<MenuItemProps> = [
    {
      title: '菜单名称',
      dataIndex: 'menuName',
      key: 'menuName',
      width: '20%',
    },
    {
      title: '菜单图标',
      dataIndex: 'icon',
      key: 'icon',
      width: '20%',
    },
    {
      title: '菜单路径',
      dataIndex: 'path',
      key: 'path',
      width: '20%',
    },
    {
      title: '组件路径',
      dataIndex: 'component',
      key: 'component',
      width: '20%',
    },
    {
      title: '操作',
      dataIndex: 'component',
      key: 'component',
      width: '20%',
      align: 'center',
      render: () => (
        <>
          <Button type={'link'}>编辑</Button>
          <Button style={{ color: 'red' }} type={'link'}>
            删除
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    form.setFieldsValue({ menuType: 1 });
  }, [form]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <>
      <Card>
        <Row gutter={20}>
          <CommonInput
            state={menuName}
            setState={setMenuName}
            text={'菜单名称'}
            placeholder="请输入菜单名称"
          />
          <CommonInput
            state={menuState}
            setState={setMenuState}
            text={'菜单状态'}
            placeholder="请输入菜单状态"
          />
          <Col span={8} className={styles.btnGroup}>
            <Button onClick={addMenuItem}>新增菜单</Button>
            <Button onClick={handleReset} className={styles.resetBtn}>
              重置
            </Button>
            <Button onClick={handleSearch} type="primary">
              查询
            </Button>
          </Col>
        </Row>
      </Card>
      <Card className={styles.menuList}>
        <Table columns={columns} dataSource={menuList} rowKey={'_id'} loading={loading} />
      </Card>
      <Modal
        title="新增菜单"
        visible={addMenuItemModal}
        centered
        closable
        okText="确定"
        cancelText="取消"
        onCancel={() => setAddMenuItemModal(false)}
        onOk={handleSubmit}
      >
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
          {/* 选择父级菜单 */}
          <Form.Item name="parentId" label="父级菜单" rules={[{ required: false }]}>
            <TreeSelect
              showSearch
              style={{ width: '100%' }}
              value={parentId}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="请选择父级菜单，不选，则默认为一级菜单"
              allowClear
              treeDefaultExpandAll
              onChange={onChangeParentIdSelect}
            >
              <TreeNode value="parent 1" title="parent 1">
                <TreeNode value="parent 1-0" title="parent 1-0">
                  <TreeNode value="leaf1" title="leaf1" />
                  <TreeNode value="leaf2" title="leaf2" />
                </TreeNode>
                <TreeNode value="parent 1-1" title="parent 1-1">
                  <TreeNode value="leaf3" title={<b style={{ color: '#08c' }}>leaf3</b>} />
                </TreeNode>
              </TreeNode>
            </TreeSelect>
          </Form.Item>

          {/* 菜单类型 */}
          <Form.Item name="menuType" label="菜单类型" rules={[{ required: false }]}>
            <Radio.Group name="radiogroup" defaultValue={1} onChange={onChangeMenuType}>
              <Radio value={1}>菜单</Radio>
              <Radio value={2}>按钮</Radio>
            </Radio.Group>
          </Form.Item>

          {/* 菜单名称 */}
          <Form.Item name="menuName" label="菜单名称" rules={[{ required: true }]}>
            <Input placeholder="请输入菜单名称" />
          </Form.Item>

          {/* 菜单图标：菜单类型为菜单的时候显示 */}
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
          >
            {({ getFieldValue }) =>
              getFieldValue('menuType') === 1 ? (
                <Form.Item name="icon" label="菜单图标" rules={[{ required: false }]}>
                  <Input placeholder="请输入菜单图标" />
                </Form.Item>
              ) : null
            }
          </Form.Item>

          {/* 路由地址：菜单类型为菜单的时候显示 */}
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
          >
            {({ getFieldValue }) =>
              getFieldValue('menuType') === 1 ? (
                <Form.Item name="path" label="路由地址" rules={[{ required: false }]}>
                  <Input placeholder="请输入路由地址" />
                </Form.Item>
              ) : null
            }
          </Form.Item>

          {/* 组件地址：菜单类型为菜单的时候显示 */}
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
          >
            {({ getFieldValue }) =>
              getFieldValue('menuType') === 1 ? (
                <Form.Item name="component" label="组件路径" rules={[{ required: false }]}>
                  <Input placeholder="请输入组件路径" />
                </Form.Item>
              ) : null
            }
          </Form.Item>

          {/* 菜单状态：菜单类型为菜单的时候显示 */}
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
          >
            {({ getFieldValue }) =>
              getFieldValue('menuType') === 1 ? (
                <Form.Item name="menuState" label="菜单状态" rules={[{ required: false }]}>
                  <Radio.Group name="radiogroup" defaultValue={1}>
                    <Radio value={1}>正常</Radio>
                    <Radio value={2}>停用</Radio>
                  </Radio.Group>
                </Form.Item>
              ) : null
            }
          </Form.Item>

          {/* 权限标识：菜单类型为按钮的时候显示 */}
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
          >
            {({ getFieldValue }) => {
              console.log('getFieldValue', getFieldValue);
              return getFieldValue('menuType') === 2 ? (
                <Form.Item name="authority" label="权限标识" rules={[{ required: false }]}>
                  <Input placeholder="请输入权限标识" />
                </Form.Item>
              ) : null;
            }}
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Index;
