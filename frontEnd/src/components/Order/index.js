import React, { useEffect, useState } from 'react'
import bgProfile from '../../img/bgProfile.jpg'
import { GoLocation } from "react-icons/go"
import { PayPalButtons } from '@paypal/react-paypal-js'
import jwt_decode from "jwt-decode";
import { Table } from 'antd'
import '../../CSS/TableAntd.css'
import 'antd/dist/antd.css'
import moment from 'moment-timezone';
import styleShop from '../../CSS/Shop.module.css'
import Popup from 'reactjs-popup';
import { BiMessageAltDetail } from "react-icons/bi"
const Order = () => {
    const [listOrder, setListOrder] = useState()
    const [listUser, setListUser] = useState()
    const [products, setProducts] = useState();
    const overlayStyle = { background: 'rgba(0,0,0,0.5)' };
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
            .then(result => setListOrder(result))
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
            }
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
            }
        },
        {
            title: 'Shipping To',
            align: 'center',
            render: (_, record) => {
                return `${record.shipping.address_line_1}, ${record.shipping.admin_area_2}`
            }
        },
        {
            title: 'Total Price',
            align: 'center',
            render: (value) => {
                return `${value.totalPrice} VNĐ`
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
                                        <h1 style={{ textAlign: "center", fontSize: "32px", paddingBottom: "1%" }}>Order Detail</h1>
                                        <div style={{ margin: "1.5%" }}>
                                            <Table
                                                columns={columnsDetail}
                                                dataSource={record.orderDetails}
                                                pagination={false}
                                                scroll={{ x: 700, y: 300 }}
                                            />
                                            <div style={{ padding: "2% 0% 0% 2%", fontSize: '20px' }}>
                                                <b>Total Price: </b>{record.totalPrice} VNĐ
                                            </div>
                                            <div style={{
                                                display: 'grid',
                                                gridTemplateColumns: 'auto auto'
                                            }}>
                                                <div style={{ padding: "2% 0% 0% 5%" }}>
                                                    <b> <GoLocation style={{
                                                        color: 'red',
                                                        fontSize: '25px',
                                                        margin: '1% 1.5% 1.5% 0%',
                                                    }} />Delivery Address</b> <br />
                                                    <span><b>Customer Name: </b> {record.customerName} </span> <br />
                                                    <span><b>Phone Number: </b> </span> <br />
                                                    <span><b>Address: </b>{record.shipping.address_line_1}, {record.shipping.admin_area_2}</span><br />
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
    return (
        <div>
            <h1 style={{ textAlign: "center", fontSize: "32px", paddingBottom: "1%" }}>Orders</h1>
            <div style={{ margin: "1.5%" }}>
                <Table
                    columns={columns}
                    dataSource={listOrder?.data}
                    pagination={false}
                    scroll={{ x: 700, y: 300 }}
                />
            </div>
        </div>
    )
}

export default Order