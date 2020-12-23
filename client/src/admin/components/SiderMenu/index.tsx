import './index.less';

import * as React from 'react';

import {Avatar, Col, Layout, Menu} from 'antd';
import AbpLogo from '../../../assets/images/logo.png';
import {appRouters} from '../../components/Router/router.config';
import utils from '../../utils/utils';
import SubMenu from "antd/lib/menu/SubMenu";

const {Sider} = Layout;

export interface ISiderMenuProps {
    path: any;
    collapsed: boolean;
    onCollapse: any;
    history: any;
}

const SiderMenu = (props: ISiderMenuProps) => {
    const {collapsed, history, onCollapse} = props;
    const currentRoute = utils.getRoute(history.location != null ? history.location.pathname : '/admin');
    return (
        <Sider style={{backgroundColor: "white"}} trigger={null} className={'sidebar'} width={256} collapsible collapsed={collapsed} onCollapse={onCollapse}>
            {collapsed ? (
                <Col id={'logo'} style={{textAlign: 'center', margin: 'auto'}}>
                    <Avatar shape="circle" style={{height: 50, width: 50}} src={AbpLogo}/>
                </Col>
            ) : (
                <Col style={{textAlign: 'center', marginTop: 15, marginBottom: 10}}>
                    <Avatar shape="square" style={{height: 40, width: 40}} src={AbpLogo}/>
                    <b>EASY ACCOMMODATION</b>
                </Col>
            )}
            <Menu theme="light" mode="inline" selectedKeys={[currentRoute ? currentRoute.path : '']}>
                {appRouters
                    .filter((item: any) => !item.isLayout && item.showInMenu)
                    .map((route: any, index: number) => {
                        if (route.child == null) {
                            return (
                                <Menu.Item key={route.path} onClick={() => history.push(route.path)}>
                                    <route.icon/>
                                    <span>{(route.title)}</span>
                                </Menu.Item>
                            );
                        } else return (
                            <SubMenu key={route.path} icon={<route.icon/>} title={route.title}>
                                {route.child.map((routeChild: any,index:number)=>{
                                    return(
                                        <Menu.Item key={routeChild.path} onClick={() => history.push(routeChild.path)}>
                                            <routeChild.icon/>
                                            <span>{(routeChild.title)}</span>
                                        </Menu.Item>
                                    );
                                })}
                            </SubMenu>
                        )
                    })}
            </Menu>
        </Sider>
    );
};

export default SiderMenu;
