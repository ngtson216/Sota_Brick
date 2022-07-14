import React, { useEffect, useState } from 'react'
import bgProfile from '../../img/bgProfile.jpg'
import { GoLocation } from "react-icons/go"
import { PayPalButtons } from '@paypal/react-paypal-js'
import jwt_decode from "jwt-decode";
import { Table, Select, Typography, Button } from 'antd'
import '../../CSS/TableAntd.css'
import '../../CSS/ButtonAntd.css'
import 'antd/dist/antd.css'
import moment from 'moment-timezone';
import styleShop from '../../CSS/Shop.module.css'
import Popup from 'reactjs-popup';
import { BiMessageAltDetail } from "react-icons/bi"
import { height } from '@mui/system';
import Status from './status';
import { StatusFilter } from './components/StatusFilter';
import { StatusTag } from './components/StatusTag';
import { TypeTag } from './components/TypeTag';
import { TypeFilter } from './components/TypeFilter';
const { Option } = Select

const UpdateStatus = (id, stt) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", sessionStorage.getItem('token'));
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        "status": stt
    });

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(`http://localhost:8080/api/v1/orders/${id}`, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result), window.location.reload())
        .catch(error => console.log('error', error));
}
const Order = () => {
    const role = sessionStorage.getItem('role')
    const [listOrder, setListOrder] = useState()
    const [listUser, setListUser] = useState()
    const [products, setProducts] = useState();
    const [listOrderFilter, setListOrderFilter] = useState()
    const [status, setStatus] = useState()
    const overlayStyle = { background: 'rgba(0,0,0,0.5)' };
    const decoded = jwt_decode(sessionStorage.getItem('token'));
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", sessionStorage.getItem('token'));
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders,
        };
        fetch("http://localhost:8080/api/v1/products", requestOptions)
            .then(response => response.json())
            .then(result => setProducts(result))
            .catch(error => console.log('error', error));
    }, [])
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", sessionStorage.getItem('token'))
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/api/v1/users/?sort=asc", requestOptions)
            .then(response => response.json())
            .then(result => setListUser(result))
            .catch(error => console.log('error', error));
    }, [])

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", sessionStorage.getItem('token'))
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/api/v1/orders/", requestOptions)
            .then(response => response.json())
            .then(result => { setListOrder(result); setListOrderFilter(result.data) })
            .catch(error => console.log('error', error));
    }, [])
    const columnsDetail = [
        {
            title: 'Name',
            render: (_, record) => {
                let name
                products?.data.map((product) => {
                    if (product._id === record.productId) {
                        return name = product.name
                    }
                })
                return <span>{name}</span>
            },
            width: 400
        },
        {
            title: 'Image',
            render: (_, record) => {
                let img
                products?.data.map((product) => {
                    if (product._id === record.productId) {
                        return img = product.product_images
                    }
                })
                return <img src={'http://localhost:8080' + img[0].url} width="50px" height="50px" alt="Product" />
            },
            align: 'center'
        },
        {
            title: 'Price',
            key: 'price',
            align: 'center',
            render: (value) => {
                return <span>{value.price} VNĐ</span>
            }
        },
        {
            title: 'Quantity',
            key: 'quantity',
            align: 'center',
            render: (_, record, index) => {
                return (
                    <span>{record.quantity}</span>
                )
            }
        },
        {
            title: 'Total Price',
            align: 'center',
            render: (_, record) => {
                return <span>{record.price * record.quantity} VNĐ</span>
            },
        },
    ]
    const columns = [
        {
            title: 'No',
            render: (_, record, index) => {
                return index + 1
            },
            align: 'center',
        },
        {
            title: 'Purchase Customer',
            key: 'customerName',
            dataIndex: 'customerName',
            align: 'center',
        },
        {
            title: 'Create By User',
            align: 'center',
            render: (_, record) => {
                let user
                listUser?.data.map((item) => {
                    if (item._id === record.createdBy) {
                        return user = item.username
                    }
                })
                return <span>{user}</span>
            }
        },
        {
            title: 'Create At',
            align: 'center',
            render: (_, record) => {
                return moment(record.createdAt).tz('Asia/Ho_Chi_Minh').format('h:mm a, DD-MM-YYYY');
            },
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        },
        {
            title: 'Shipping To',
            align: 'center',
            render: (_, record) => {
                return `${record.shipping.admin_area_2}`
            }
        },
        {
            title: 'Total Price',
            align: 'center',
            render: (value) => {
                return `${value.totalPrice} VNĐ`
            },
            sorter: (a, b) => a.totalPrice - b.totalPrice
        },
        {
            title: 'Status',
            align: 'center',
            render: (_, record) => {
                return <StatusTag status={record.status} />
            }
        },
        {
            title: 'Type',
            align: 'center',
            render: (_, record) => {
                return <TypeTag type={record.type} />
            }
        },
        {
            title: '',
            align: 'center',
            render: (_, record) => {
                return (
                    <Popup trigger={
                        <div className={styleShop.divClick}>
                            <span>Full order detail</span>
                            <BiMessageAltDetail style={{
                                color: 'red',
                                fontSize: '25px',
                                paddingLeft: '2px'
                            }} />
                        </div>
                    }{...{ overlayStyle }} modal nested>
                        {(close) => (
                            <div className={styleShop.modal}>
                                <button className={styleShop.close} onClick={close}>
                                    &times;
                                </button>
                                <div className={styleShop.content}>
                                    <div>
                                        <h1 style={{ fontSize: "18px", padding: "1% 0 1% 1.5%", fontWeight: "600" }}>Order Detail</h1>
                                        <Status step={record.status} orderType={record.type} />
                                        <div style={{ margin: "1.5%" }}>
                                            <Table
                                                columns={columnsDetail}
                                                dataSource={record.orderDetails}
                                                pagination={false}
                                                scroll={{ x: 700, y: 300 }}
                                            />
                                            <div style={{ padding: "2% 0% 0% 2%", fontSize: '15px' }}>
                                                <b>Total Price: </b>{record.totalPrice} VNĐ
                                            </div>
                                            <div style={{
                                                display: 'grid',
                                                gridTemplateColumns: '75% 25%'
                                            }}>
                                                <div style={{ padding: "1% 0% 0% 5%" }}>
                                                    <b> <GoLocation style={{
                                                        color: 'red',
                                                        fontSize: '25px',
                                                        margin: '1% 1.5% 1.5% 0%',
                                                    }} />Delivery Address</b> <br />
                                                    <span><b>Customer Name: </b> {record.customerName} </span> <br />
                                                    <span><b>Phone Number: </b> </span> <br />
                                                    <span><b>Address: </b>{record.shipping.address_line_1}, {record.shipping.admin_area_2}</span><br />
                                                </div>
                                                <div>
                                                    {(record.status !== 'Cancel' && record.status !== 'Done') ? (
                                                        <Popup
                                                            onClose={() => {
                                                                setStatus(undefined)
                                                            }}
                                                            trigger={
                                                                <div className={styleShop.divClick}>
                                                                    <button className={styleShop.btnUpdateStatus}>Update status</button>
                                                                </div>
                                                            }{...{ overlayStyle }} modal nested>
                                                            {(close) => (
                                                                <div className={styleShop.modalNoti}>
                                                                    <button className={styleShop.close} onClick={close}>
                                                                        &times;
                                                                    </button>
                                                                    <div className={styleShop.content}>
                                                                        <h5 className={styleShop.h5tag}>Change Order Status</h5>
                                                                        <div className={styleShop.selectDiv}>
                                                                            <Typography>Status:</Typography>
                                                                            <Select
                                                                                size='large'
                                                                                defaultValue={record.status}
                                                                                placeholder="Please select"
                                                                                style={{ width: '100%' }}
                                                                                onChange={(e) => {
                                                                                    setStatus(e)
                                                                                }}
                                                                            >
                                                                                <Option value="Cancel">Cancel</Option>
                                                                                {role === "admin" ? <>
                                                                                    <Option value="Paying">Paying</Option>
                                                                                    <Option value="Preparing">Preparing</Option>
                                                                                    <Option value="Shipping">Shipping</Option>
                                                                                    <Option value="Done">Done</Option>
                                                                                </> : null
                                                                                }
                                                                            </Select>
                                                                        </div>
                                                                        <Button
                                                                            type='primary'
                                                                            onClick={() => {
                                                                                if (record.status === status || !status) alert(`Can not update duplicate status`)
                                                                                else if (status === 'Cancel' && record.status !== 'Paying') alert(`Can not cancel order`)
                                                                                else if (record.status === 'Preparing' && status === 'Paying') alert(`Update order status failed`)
                                                                                else if (record.status === 'Shipping' && (status === 'Paying' || status === 'Preparing')) alert(`Update order status failed`)
                                                                                else UpdateStatus(record._id, status)
                                                                            }}
                                                                        >
                                                                            Submit
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </Popup>) : null}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className={styleShop.actions}>
                                </div>
                            </div>
                        )}
                    </Popup>
                )
            }
        }
    ]
    const handleFilter = key => {
        const selected = parseInt(key);
        if (selected === 6) {
            setListOrderFilter(listOrder?.data)
        }
        else {
            const statusMap = {
                1: "Paying",
                2: "Preparing",
                3: "Shipping",
                4: "Done",
                5: "Cancel"
            };
            const selectedStatus = statusMap[selected];

            const filteredEvents = listOrder?.data.filter(
                (item) => item.status === selectedStatus
            );
            setListOrderFilter(filteredEvents)
        }
    };
    const handleFilterType = key => {
        const selected = parseInt(key);
        if (selected === 4) {
            setListOrderFilter(listOrder?.data)
        }
        else {
            const typeMap = {
                1: "AfterDeli",
                2: "BankTranfer",
                3: "PayPal",
            };
            const selectedType = typeMap[selected];

            const filteredEvents = listOrder?.data.filter(
                (item) => item.type === selectedType
            );
            setListOrderFilter(filteredEvents)
        }
    };
    return (
        <div style={{ paddingBottom: "10%", paddingLeft: "5%", backgroundImage: `url(${bgProfile})`, backgroundRepeat: "no-repeat", backgroundSize: "100%", width: "100%" }}>
            <h1 style={{ padding: "5% 0% 8% 0%", color: "#fff", fontWeight: "600", }}>Orders</h1>
            <div style={{ margin: "1.5%" }}>
                <div style={{
                    display: 'flex'
                }}>
                    <StatusFilter filterBy={handleFilter} />
                    <TypeFilter filterBy={handleFilterType} />
                </div>
                <Table
                    columns={columns}
                    dataSource={role === "admin" ? listOrderFilter : listOrderFilter?.filter((item) => {
                        if (item.createdBy === decoded.id)
                            return item
                    })}
                    pagination={{
                        position: ["bottomCenter"]
                    }}
                    bordered={true}
                    scroll={{ x: 1300 }}
                />
            </div>
        </div>
    )
}

export default Order