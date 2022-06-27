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
const Order = () => {
    const [listOrder, setListOrder] = useState()
    const [listUser, setListUser] = useState()

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
                listUser.data.map((item) => {
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
                return 'Click to see full order detail'
            }
        }
    ]
    return (
        <div>
            <h1 style={{ textAlign: "center", fontSize: "32px", paddingBottom: "1%" }}>Payments</h1>
            <div style={{ margin: "1.5%" }}>
                <Table
                    columns={columns}
                    dataSource={listOrder.data}
                    pagination={false}
                    scroll={{ x: 700, y: 300 }}
                />
            </div>
        </div>
    )
}

export default Order