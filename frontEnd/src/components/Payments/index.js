import React, { useEffect, useState } from 'react'
import bgProfile from '../../img/bgProfile.jpg'
import { GoLocation } from "react-icons/go"
import { PayPalButtons } from '@paypal/react-paypal-js'
import jwt_decode from "jwt-decode";
import { Table } from 'antd'
import '../../CSS/TableAntd.css'
import 'antd/dist/antd.css'
import styleShop from '../../CSS/Shop.module.css'
const decreaseStock = (id, quantity, description) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", sessionStorage.getItem('token'));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "description": description,
        "quantity": quantity,
        "productId": id,
        "type": 0
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:8080/api/v1/stocks", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
const createOrder = (name, shippingObj, orderDetailsArr, stt) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", sessionStorage.getItem('token'));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "customerName": name,
        "shipping": shippingObj,
        "orderDetails": orderDetailsArr,
        "status": stt
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:8080/api/v1/orders/", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

function Payments(props) {
    let sum = 0;
    let sumToUSD = 0;
    let itemArr = [];
    props.data.map((item) => {
        sum = sum + (item.price * item.quantity)
    })
    props.data.map((item) => {
        sumToUSD = sumToUSD + (Math.round(item.price * 0.000043) * item.quantity)
        itemArr.push({
            name: item.name,
            quantity: item.quantity,
            unit_amount: {
                currency_code: "USD",
                value: Math.round(item.price * 0.000043)
            }
        })
    })
    // let sumToUSD = Math.round(sum * 0.000043)
    const token = sessionStorage.getItem('token')
    const decoded = jwt_decode(sessionStorage.getItem('token'));
    const url = "http://localhost:8080/api/v1/users/" + decoded.id
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    const [items, setItems] = useState()
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => setItems(result))
            .catch(error => console.log('error', error));
    }, [])
    const handleApprove = (order) => {
        setPaidFor(true);
        //Call API POST to order DB
        let orderArr = [];
        order.items.map((item) => {
            orderArr.push({
                "price": item.price,
                "quantity": item.quantity,
                "tax": item.tax,
                "discount": item.discount,
                "productId": item._id
            })
        })
        createOrder(order.customerName, order.shippingAddress, orderArr, 'Preparing')
        // Call API stock check out
        let desc = `Order By ${order.customerName} at ${order.create_time.slice(0, 10)}`
        order.items.map((item, key) => {
            decreaseStock(item._id, item.quantity, desc)
        })
    };
    useEffect(() => {
        if (paidFor) {
            alert("Thank you for your purchase!");
            localStorage.removeItem('persist:root');
            window.location.reload()
        }
        if (error) {
            alert(error);
        }
    }, [paidFor, error])
    const columns = [
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            width: 400
        },
        {
            title: 'Image',
            render: (value) => {
                return <img src={'http://localhost:8080' + value.product_images[0].url} width="50px" height="50px" alt="Product" />
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
    return (
        <div>
            <h1 style={{ textAlign: "center", fontSize: "32px", paddingBottom: "1%" }}>Payments</h1>
            <div style={{ margin: "1.5%" }}>
                <Table
                    columns={columns}
                    dataSource={props.data}
                    pagination={false}
                    scroll={{ x: 700, y: 300 }}
                />
                <div style={{ padding: "2% 0% 0% 2%", fontSize: '20px' }}>
                    <b>Total Price: </b>{sum} VNĐ
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
                        <span><b>Name: </b> {items ? items?.data?.name : ''} | <b>Phone Number:</b> {items ? items?.data?.phone : ''}</span> <br />
                        <span><b>Address: </b> {items ? items?.data?.address : ''}</span><br />
                        <span><b>Ward: </b> {items ? items?.data?.ward : ''},
                            <b> District: </b> {items ? items?.data?.district : ''},
                            <b> City: </b> {items ? items?.data?.city : ''}
                        </span><br />
                        <button className={styleShop.btnChangeDelivery}
                            onClick={{}}
                        >
                            Change Delivery Address
                        </button>
                    </div>
                    <div style={{ width: "80%", margin: "3% 0% 0% 0%" }}>
                        <p style={{ fontWeight: "600" }}>Purchase With </p>
                        <button style={{
                            borderRadius: '23px',
                            background: '#fce123',
                            color: '#2C2E2F',
                            display: 'inline-block',
                            textAlign: 'center',
                            height: '45px',
                            position: 'relative',
                            width: '100%',
                            boxSizing: 'border-box',
                            border: 'none',
                            verticalAlign: 'top',
                            cursor: 'pointer',
                            overflow: 'hidden',
                            fontSize: '15px',
                            marginBottom: '10px'
                        }}>
                            Payment After Delivery
                        </button>
                        <button style={{
                            borderRadius: '23px',
                            background: '#def543',
                            color: '#2C2E2F',
                            display: 'inline-block',
                            textAlign: 'center',
                            height: '45px',
                            position: 'relative',
                            width: '100%',
                            boxSizing: 'border-box',
                            border: 'none',
                            verticalAlign: 'top',
                            cursor: 'pointer',
                            overflow: 'hidden',
                            fontSize: '15px',
                            marginBottom: '10px'
                        }}>
                            Payment Via Bank Transfer
                        </button>
                        <PayPalButtons
                            style={{
                                "layout": "horizontal",
                                "shape": "pill",
                                "color": "gold",
                                "label": "pay"
                            }}
                            disabled={false}
                            forceReRender={["2", "VND", { "layout": "vertical" }]}
                            fundingSource={undefined}
                            onClick={(data, actions) => {
                                // Validate on button click, client or server side
                                const hasAlreadyBoughtCourse = false;

                                if (hasAlreadyBoughtCourse) {
                                    setError(
                                        "You already bought this course. Go to your account to view your list of courses."
                                    );
                                    return actions.reject();
                                } else {
                                    return actions.resolve();
                                }
                            }}
                            createOrder={(data, actions) => {
                                return actions.order
                                    .create({
                                        purchase_units: [
                                            {
                                                amount: {
                                                    currency_code: "USD",
                                                    value: sumToUSD,
                                                    breakdown: {
                                                        item_total: {
                                                            currency_code: "USD",
                                                            value: sumToUSD
                                                        }
                                                    }
                                                },
                                                shipping: {
                                                    address: {
                                                        address_line_1: items.data.address,
                                                        admin_area_2: `${items.data.ward}, ${items.data.district}, ${items.data.city}`,
                                                        postal_code: '10000',
                                                        country_code: 'VN',
                                                    },
                                                    name: {
                                                        full_name: items.data.name
                                                    },
                                                },
                                                items: itemArr
                                            },
                                        ],
                                    })
                            }}
                            onApprove={async (data, actions) => {
                                const order = await actions.order.capture();
                                let orderObj = {
                                    orderId: order.id,
                                    create_time: order.create_time,
                                    amount: sum,
                                    customerName: order.purchase_units[0].shipping.name.full_name,
                                    shippingAddress: order.purchase_units[0].shipping.address,
                                    items: props.data
                                }
                                handleApprove(orderObj);
                            }}
                            onCancel={() => {
                                console.log("cancel")
                            }}
                            onError={(err) => {
                                setError(err);
                                console.error("PayPal Checkout onError", err);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payments