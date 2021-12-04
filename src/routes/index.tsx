import React, {lazy} from 'react'
import MainLayout from "@/pages/layout";
import LoginPage from '@/pages/user/LoginPage'
import RegisterPage from '@/pages/user/RegisterPage'
import {PartialRouteObject} from 'react-router'

const Dashboard = lazy(async () => import(/* webpackChunkName: "dashboard" */ '@/pages/dashboard'));

/**
 * 路由列表
 */
const routeList: PartialRouteObject[] = [
  {
    path: 'login',
    element: (<LoginPage/>)
  }, {
    path: 'register',
    element: (<RegisterPage/>)
  }, {
    path: '/',
    element: (<MainLayout/>),
    children: [
      {
        path: 'dashboard',
        element: (<Dashboard/>)
      }
    ]
  }

];

export default routeList;

