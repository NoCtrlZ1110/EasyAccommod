import LoadableComponent from "../Loadable/index";
import { HomeOutlined, InfoCircleOutlined } from '@ant-design/icons';

export const userRouter: any = [
  {
    path: '/admin/user',
    name: 'user',
    title: 'User',
    component: LoadableComponent(() => import('../../components/Layout/UserLayout')),
    isLayout: true,
    showInMenu: false,
  },
  {
    path: '/admin/user/login',
    name: 'login',
    title: 'LogIn',
    component: LoadableComponent(() => import('../../scenes/Login')),
    showInMenu: false,
  },
];
export const appRouters: any = [
  {
    path: '/admin',
    exact: true,
    name: 'home',
    permission: '',
    title: 'Home',
    component: LoadableComponent(() => import('../../components/Layout/AppLayout')),
    isLayout: true,
    showInMenu: false,
  },
  {
    path: '/admin/dashboard',
    name: 'dashboard',
    permission: '',
    title: 'Thống kê',
    icon: HomeOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/Dashboard')),
  },
  {
    path: '/admin/management_user',
    name: 'manager_user',
    permission: '',
    title: 'Quản lý tài khoản',
    icon: HomeOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../components/Layout/AppLayout')),
    child:[
      {
        path: '/admin/management_user/approve',
        name: 'user_approve',
        permission: '',
        title: 'Đợi phê duyệt',
        icon: HomeOutlined,
        showInMenu: true,
       // component: LoadableComponent(() => import('../../scenes/UserApprove'))
      },
      {
        path: '/admin/management_user/active',
        name: 'user_active',
        permission: '',
        title: 'Đang hoạt động',
        icon: HomeOutlined,
        showInMenu: true,
        //component: LoadableComponent(() => import('../../scenes/UserActive'))
      }
    ]
  },
  {
    path: '/admin/management_news',
    name: 'management_news',
    permission: '',
    title: 'Quản lý bài viết',
    icon: HomeOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/NewsApprove')),
  },
  {
    path: '/admin/about',
    permission: '',
    title: 'About',
    name: 'about',
    icon: InfoCircleOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/About')),
  },
  {
    path: '/admin/logout',
    permission: '',
    title: 'Logout',
    name: 'logout',
    showInMenu: false,
    component: LoadableComponent(() => import('../../components/Logout')),
  },
  {
    path: '/admin/exception?:type',
    permission: '',
    title: 'exception',
    name: 'exception',
    showInMenu: false,
    component: LoadableComponent(() => import('../../scenes/Exception')),
 },
  {
    path: '/admin/management_user/approve',
    name: 'user_approve',
    permission: '',
    title: 'Đợi phê duyệt',
    icon: HomeOutlined,
    showInMenu: false,
    component: LoadableComponent(() => import('../../scenes/UserApprove'))
  },
  {
    path: '/admin/management_user/active',
    name: 'user_active',
    permission: '',
    title: 'Đang hoạt động',
    icon: HomeOutlined,
    showInMenu: false,
    component: LoadableComponent(() => import('../../scenes/UserActive'))
  }
];

export const routers = [...userRouter, ...appRouters];
