import React, { useEffect, useState } from 'react'
import bgProfile from '../../img/bgProfile.jpg'
import { GoLocation } from "react-icons/go"
import { PayPalButtons } from '@paypal/react-paypal-js'
import jwt_decode from "jwt-decode";

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
        //Call API stock check out
        let desc = `Order By ${order.customerName} at ${order.create_time.slice(0, 10)}, and order id is ${order.orderId}`
        order.items.map((item, key) => {
            decreaseStock(item._id, item.quantity, desc)
        })
    };
    useEffect(() => {
        if (paidFor) {
            alert("Thank you for your purchase!");
        }
        if (error) {
            alert(error);
        }
    }, [paidFor, error])
    return (
        <div>
            <h1 >Payments</h1>
            <div className="row">
                <div className="col-md-12">
                    <table className="table" style={{ textAlign: "center", width: "97%" }}>
                        <thead style={{ backgroundColor: "#95ff94" }}>
                            <tr>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.data.map((item, key) => (
                                    <tr>
                                        <td>{item.name}</td>
                                        <td><img src={'http://localhost:8080' + item.product_images[0].url} width="50px" height="50px" alt="Product" /></td>
                                        <td>{item.price} VNĐ</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.price * item.quantity} VNĐ</td>
                                    </tr>
                                ))
                            }
                            <tr>
                                <td>Total Payments Price</td>
                                <td colSpan="3"></td>
                                <th>{sum} VNĐ</th>
                            </tr>
                        </tbody>
                    </table>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'auto auto'
                    }}>
                        <div>
                            <p> <GoLocation style={{
                                color: 'red',
                                fontSize: '25px'
                            }} />Delivery Address</p>
                            <span>Name: {(items && items.success === true) ? items.data.name : ''} | Phone Number: {(items && items.success === true) ? items.data.phone : ''}</span> <br />
                            <span>Address: {(items && items.success === true) ? items.data.address : ''}</span><br />
                            <span>Ward, District, City</span><br />
                        </div>
                        <div >
                            <p>Purchase With </p>
                            <PayPalButtons
                                style={{
                                    "layout": "vertical",
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
                                                            address_line_1: 'hellooo dmm',
                                                            admin_area_2: 'xin chao dmm',
                                                            postal_code: '10000',
                                                            country_code: 'VN',
                                                        },
                                                        name: {
                                                            full_name: 'Nguyen Son'
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
        </div>
    )
}

export default Payments