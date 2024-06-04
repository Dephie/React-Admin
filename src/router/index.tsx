/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'

import { Outlet } from 'react-router-dom'
import Layout from '@/layout/index'
import { BarChart3, LaptopMinimal, ShieldAlert, Bell, FolderKanban, Clipboard, ClipboardList, ClipboardPen, UsersRound, UserRoundSearch, UserRoundCog } from 'lucide-react'

const Login = lazy(() => import('@/views/login'))
const Register = lazy(() => import('@/views/register'))

//主页
const Index = lazy(() => import('@/views/index'))
const Workbench = lazy(() => import('@/views/dashboard/index'))
// 故障报修
const Report = lazy(() => import('@/views/report/form/index'))
const CreateReport = lazy(() => import('@/views/report/create/index'))
// 设备管理
const Device = lazy(() => import('@/views/device/form/index'))
// 工单管理
const Ticket = lazy(() => import('@/views/ticket/form/index'))
const CreateTicket = lazy(() => import('@/views/ticket/create/index'))
// 账号管理
const ReadUser = lazy(() => import('@/views/user/read/index'))
const User = lazy(() => import('@/views/user/form/index'))


const Error404 = lazy(() => import('@/views/error/404'))
const Error403 = lazy(() => import('@/views/error/403'))

export interface IRoute {
  path: string
  element?: JSX.Element
  meta: {
    title?: string
    icon?: JSX.Element
    hide?: boolean
  }
  redirect?: string
  children?: IRoute[]
}

export const menuList: IRoute[] = [
  {
    path: '/index',
    element: <Workbench />,
    meta: {
      title: '工作台',
      icon: <BarChart3 />,
    },
  },
  {
    path: '/device',
    element: <Device />,
    meta: {
      title: '设备管理',
      icon: <LaptopMinimal />,
    },
  },
  {
    path: '/report',
    element: <Outlet />,
    meta: {
      title: '故障报修',
      icon: <ShieldAlert />,
    },
    children: [
      {
        path: '/report/create',
        element: <CreateReport />,
        meta: {
          title: '故障报修',
          icon: <Bell />,
        },
      },
      {
        path: '/report/form',
        element: <Report />,
        meta: {
          title: '管理订单',
          icon: <FolderKanban />,
        },
      },
    ],
  },
  {
    path: '/ticket',
    element: <Outlet />,
    meta: {
      title: '工单管理',
      icon: <Clipboard />,
    },
    children: [
      {
        path: '/ticket/create',
        element: <CreateTicket />,
        meta: {
          title: '创建工单',
          icon: <ClipboardPen />,
        },
      },
      {
        path: '/ticket/form',
        element: <Ticket />,
        meta: {
          title: '管理工单',
          icon: <ClipboardList />,
        },
      },
    ],
  },
  {
    path: '/user',
    element: <Outlet />,
    meta: {
      title: '账号管理',
      icon: <UsersRound />,
    },
    children: [
      {
        path: '/user/information',
        element: <ReadUser/>,
        meta: {
          title: '查看用户信息',
          icon: <UserRoundSearch />,
        },
      },
      {
        path: '/user/settings',
        element: <User />,
        meta: {
          title: '更新本人信息',
          icon: <UserRoundCog />,
        },
      },
    ],
  },
]

export const staticList: IRoute[] = [
  {
    path: '/login',
    element: <Login />,
    meta: {
      title: '登录',
    },
  },
  {
    path: '/register',
    element: <Register />,
    meta: {
      title: '注册',
    },
  },
]

export const routerList: IRoute[] = [
  {
    path: '/',
    element: <Layout />,
    meta: {
      title: '首页',
    },
    children: menuList,
  },
  ...staticList,
  {
    path: '403',
    element: <Error403 />,
    meta: {
      title: '404',
    },
  },
  {
    path: '*',
    element: <Error404 />,
    meta: {
      title: '404',
    },
  },
]
