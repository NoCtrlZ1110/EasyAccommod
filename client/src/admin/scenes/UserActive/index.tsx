import * as React from 'react';
import {Button, Card, Col, Dropdown, Input, Menu, Modal, Row, Table} from 'antd';
import {inject, observer} from 'mobx-react';
import AppComponentBase from '../../components/AppComponentBase';
import {EntityDto} from '../../services/dto/entityDto';
import Stores from '../../stores/storeIdentifier';
import UserStore from '../../stores/userStore';
import {FormInstance} from 'antd/lib/form';
import {SettingOutlined} from '@ant-design/icons';
import {EntityId} from "../../services/dto/entityId";

export interface IUserProps {
    userStore: UserStore;
}

export interface IUserState {
    modalVisible: boolean;
    maxResultCount: number;
    skipCount: number;
    userId: number;
    filter: string;
    isActive: boolean;
}

const confirm = Modal.confirm;
const Search = Input.Search;

@inject(Stores.UserStore)
@observer
class UserActive extends AppComponentBase<IUserProps, IUserState> {
    formRef = React.createRef<FormInstance>();

    state = {
        modalVisible: false,
        maxResultCount: 10,
        skipCount: 0,
        userId: 0,
        filter: '',
        isActive: true
    };

    async componentDidMount() {
        await this.getAll();
    }

    async getAll() {
        await this.props.userStore.getAll({maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter, isActive: this.state.isActive});
    }

    handleTableChange = (pagination: any) => {
        this.setState({skipCount: (pagination.current - 1) * this.state.maxResultCount!}, async () => await this.getAll());
    };

    Modal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible,
        });
    };

    delete(input: EntityDto) {
        const self = this;
        confirm({
            title: 'Do you Want to delete these items?',
            onOk() {
                self.props.userStore.delete(input);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    block(input: EntityId) {
        const self = this;
        confirm({
            title: 'Bạn muốn khóa tài khoản này?',
            onOk() {
                self.props.userStore.block(input);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    handleSearch = (value: string) => {
        this.setState({filter: value}, async () => await this.getAll());
    }

    public render() {
        const {users} = this.props.userStore;
        const columns = [
            {title: ('Tên đăng nhập'), dataIndex: 'userName', key: 'userName', width: 150, render: (text: string) => <div>{text}</div>},
            {title: ('Họ và tên'), dataIndex: 'name', key: 'name', width: 150, render: (text: string) => <div>{text}</div>},
            {title: ('Địa chỉ Email'), dataIndex: 'emailAddress', key: 'emailAddress', width: 150, render: (text: string) => <div>{text}</div>},
            {title: ('CMT/CCCD'), dataIndex: 'idCard', key: 'idCard', width: 150, render: (text: string) => <div>{text}</div>},
            {title: ('Số điện thoại'), dataIndex: 'idCard', key: 'idCard', width: 150, render: (text: string) => <div>{text}</div>},
            {
                title: ('Thao tác'),
                width: 150,
                render: (text: string, item: any) => (
                    <div>
                        <Dropdown
                            trigger={['click']}
                            overlay={
                                <Menu>
                                    <Menu.Item onClick={() => this.block({id: item.id})}>{('Khóa tài khoản')}</Menu.Item>
                                    <Menu.Item onClick={() => this.delete({id: item.id})}>{('Xóa tài khoản')}</Menu.Item>
                                </Menu>
                            }
                            placement="bottomLeft"
                        >
                            <Button type="primary" icon={<SettingOutlined/>}>
                                {('Actions')}
                            </Button>
                        </Dropdown>
                    </div>
                ),
            },
        ];

        return (
            <Card>
                <Row><h2>{('Danh sách tài khoản đang hoạt động')}</h2></Row>
                <Row>
                    <Col sm={{span: 10, offset: 0}}>
                        <Search placeholder={('Tìm kiếm')} onSearch={this.handleSearch}/>
                    </Col>
                </Row>
                <Row style={{marginTop: 20}}>
                    <Col
                        xs={{span: 24, offset: 0}}
                        sm={{span: 24, offset: 0}}
                        md={{span: 24, offset: 0}}
                        lg={{span: 24, offset: 0}}
                        xl={{span: 24, offset: 0}}
                        xxl={{span: 24, offset: 0}}
                    >
                        <Table
                            rowKey={(record) => record.id.toString()}
                            bordered={true}
                            columns={columns}
                            pagination={{pageSize: 10, total: users === undefined ? 0 : users.totalCount, defaultCurrent: 1}}
                            loading={users === undefined}
                            dataSource={users === undefined ? [] : users.items}
                            onChange={this.handleTableChange}
                        />
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default UserActive;
