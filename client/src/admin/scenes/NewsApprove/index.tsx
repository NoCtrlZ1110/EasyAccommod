import AppComponentBase from "../../components/AppComponentBase";
import ApartmentStore from "../../stores/apartmentStore";
import {Button, Card, Col, Dropdown, Input, Menu, Modal, Row, Table} from "antd";
import Stores from "../../stores/storeIdentifier";
import * as React from "react";
import {FormInstance} from "antd/lib/form";
import {SettingOutlined} from "@ant-design/icons";
import {inject, observer} from "mobx-react";
import moment from "moment";
import {ApartmentType} from "../../services/apartment/dto/apartmentOutput";
import {ApproveNewsInput} from "../../services/apartment/dto/approveNewsInput";
import {toast} from "react-toastify";
import history from "../../../services/history";

export interface IApartmentProps {
    apartmentStore: ApartmentStore;
}

export interface IApartmentState {
    modalVisible: boolean;
    title: string;
    dateFrom?: Date;
    dateTo?: Date;
    status?: number;
    skipCount?: number;
    maxResultCount?: number;
}

const confirm = Modal.confirm;
const Search = Input.Search;

@inject(Stores.ApartmentStore)
@observer
class NewsApprove extends AppComponentBase<IApartmentProps, IApartmentState> {
    formRef = React.createRef<FormInstance>();

    state = {
        modalVisible: false,
        title: '',
        dateFrom: undefined,
        dateTo: undefined,
        status: 1,
        skipCount: 0,
        maxResultCount: 10,
    };

    async componentDidMount() {
        await this.getListApartment();
    }

    async getListApartment() {
        await this.props.apartmentStore.getListApartmentForAdmin(
            {
                dateFrom: this.state.dateFrom,
                dateTo: this.state.dateTo,
                maxResultCount: this.state.maxResultCount,
                skipCount: this.state.skipCount,
                status: this.state.status,
                title: this.state.title
            });
    }

    async approveNews(input: ApproveNewsInput) {
        const self = this;
        confirm({
            title: 'Bạn muốn phê duyệt bài viết này?',
            onOk() {
                self.props.apartmentStore.approveNews(input).then(() => {
                    toast.success(
                        '✅ Phê duyệt thành công, bài viết đã được đăng tải'
                    );
                    history.push('/admin/management_news');
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        })
    };
    async rejectNews(input: ApproveNewsInput) {
        const self = this;
        confirm({
            title: 'Bạn muốn từ chối bài viết này?',
            onOk() {
                self.props.apartmentStore.approveNews(input).then(() => {
                    toast.success(
                        '✅ Thành công, bài viết đã được loại bỏ'
                    );
                    history.push('/admin/management_news');
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        })
    };
    handleSearch = (value: string) => {
        this.setState({title: value}, async () => await this.getListApartment());
    }
    handleTableChange = (pagination: any) => {
        this.setState({skipCount: (pagination.current - 1) * this.state.maxResultCount!}, async () => await this.getListApartment());
    };
    Modal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible,
        });
    };

    public render() {
        const {apartment} = this.props.apartmentStore;
        const columns = [
            {title: ('Tiêu đề bài viết'), dataIndex: 'title', key: 'title', width: 150, render: (text: string) => <div>{text}</div>},
            {title: ('Ngày tạo bài'), dataIndex: 'creationTime', key: 'creationTime', width: 150, render: (text: Date) => <div>{moment(text).format('L')}</div>},
            {title: ('Số ngày hiển thị'), dataIndex: 'creationTime', key: 'creationTime', width: 150, render: (text: Date) => <div>{moment(text).format('L')}</div>},
            {title: ('Địa chỉ'), dataIndex: 'address', key: 'address', width: 150, render: (text: string) => <div>{text}</div>},
            {title: ('Loại phòng'), dataIndex: 'apartmentType', key: 'apartmentType', width: 150, render: (text: ApartmentType) => <div>{text?.description}</div>},
            {title: ('Giá phòng'), dataIndex: 'roomPrice', key: 'roomPrice', width: 150, render: (text: string) => <div>{text}</div>},
            {title: ('Tên chủ phòng'), dataIndex: 'ownerName', key: 'ownerName', width: 150, render: (text: string) => <div>{text}</div>},
            {title: ('Số điện thoại'), dataIndex: 'ownerPhone', key: 'ownerPhone', width: 150, render: (text: string) => <div>{text}</div>},
            {
                title: ('Thao tác'),
                width: 150,
                render: (text: string, item: any) => (
                    <div>
                        <Dropdown
                            trigger={['click']}
                            overlay={
                                <Menu>
                                    <Menu.Item onClick={() => this.approveNews({apartmentId: item.id, status: 1})}>{('Phê duyệt bài viết')}</Menu.Item>
                                    <Menu.Item onClick={() => this.rejectNews({apartmentId: item.id, status: 2})}>{('Từ chối bài viết')}</Menu.Item>
                                    {/* <Menu.Item onClick={() => this.delete({id: item.id})}>{('Xóa tài khoản')}</Menu.Item>*/}
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
                <Row><h2>{('Danh sách bài viết đợi phê duyệt')}</h2></Row>
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
                            pagination={{pageSize: 10, total: apartment === undefined ? 0 : apartment.totalCount, defaultCurrent: 1}}
                            loading={apartment === undefined}
                            dataSource={apartment === undefined ? [] : apartment.items}
                            onChange={this.handleTableChange}
                        />
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default NewsApprove;