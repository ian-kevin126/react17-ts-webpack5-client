import React, { lazy } from 'react';
import MainLayout from '@/pages/layout';
import LoginPage from '@/pages/user/LoginPage';
import RegisterPage from '@/pages/user/RegisterPage';
import { PartialRouteObject } from 'react-router';

const Dashboard = lazy(async () => import(/* webpackChunkName: "dashboard" */ '@/pages/dashboard'));
const Documentation = lazy(
  async () => import(/* webpackChunkName: "dashboard" */ '@/pages/documentation'),
);
const Guide = lazy(async () => import(/* webpackChunkName: "dashboard" */ '@/pages/guide'));
const NotFound = lazy(async () => import(/* webpackChunkName: "dashboard" */ '@/pages/404'));

/**
 * 路由列表
 */
const routeList: PartialRouteObject[] = [
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'register',
    element: <RegisterPage />,
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'documentation',
        element: <Documentation />,
      },
      {
        path: 'guide',
        element: <Guide />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];

export default routeList;
