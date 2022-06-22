import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { IncreaseQuantity, DecreaseQuantity, DeleteCart } from '../../Redux/store/actions/action';
import { AiOutlinePlusCircle, AiOutlineMinusCircle, AiOutlineDelete } from "react-icons/ai";
import { PayPalButtons } from '@paypal/react-paypal-js'
import bgProfile from '../../img/bgProfile.jpg'
import { Link } from 'react-router-dom';

function Cart(props) {
    const [value, setValue] = useState(1);
    let sum = 0;
    props.Cart.map((item) => {
        sum = sum + (item.price * item.quantity)
    })
    let sumToUSD = Math.round(sum * 0.000043)
    var sendData = (p) => {
        props.parentCallback(p)
    }
    var sendDataToPayments = (p) => {
        props.callbackData(p)
    }
    // const [paidFor, setPaidFor] = useState(false);
    // const [error, setError] = useState(null);

    // const handleApprove = (orderId) => {
    //     // Call backend function to fulfill order

    //     // if response is success
    //     setPaidFor(true);
    //     // Refresh user's account or subscription status

    //     // if response is error
    //     // setError("Your payment was processed successfully. However, we are unable to fulfill your purchase. Please contact us at support@designcode.io for assistance.");
    // };
    // useEffect(() => {
    //     if (paidFor) {
    //         // Display success message, modal or redirect user to success page
    //         alert("Thank you for your purchase!");
    //     }
    //     if (error) {
    //         // Display error message, modal or redirect user to error page
    //         alert(error);
    //     }
    // }, [paidFor, error])

    return (
        <div style={{ paddingBottom: "10%", paddingLeft: "5%", backgroundImage: `url(${bgProfile})`, backgroundRepeat: "no-repeat", backgroundSize: "100%", width: "100%" }}>
            <h1 style={{ padding: "5% 0% 10% 10%", color: "white", fontWeight: "600", position: "relative" }}>Cart</h1>
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
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.Cart.map((item, key) => (
                                    <tr>
                                        <td>{item.name}</td>
                                        <td><img src={'http://localhost:8080' + item.product_images[0].url} width="50px" height="50px" alt="Product" /></td>
                                        <td>{item.price} VNĐ</td>
                                        <td>
                                            <span style={{
                                                margin: '10px'
                                            }} onClick={() => {
                                                props.DecreaseQuantity(key)
                                                setValue((value + 1)) //dump way to die
                                            }}>
                                                <AiOutlineMinusCircle style={{
                                                    color: 'red',
                                                    fontSize: '20px'
                                                }} />
                                            </span>
                                            <span>{item.quantity}</span>
                                            <span style={{
                                                margin: '10px'
                                            }} onClick={() => {
                                                props.IncreaseQuantity(key)
                                                setValue((value + 1)) //dump way to die
                                            }}>
                                                <AiOutlinePlusCircle style={{
                                                    color: 'red',
                                                    fontSize: '20px'
                                                }} />
                                            </span>
                                        </td>
                                        <td>{item.price * item.quantity} VNĐ</td>
                                        <td>
                                            <AiOutlineDelete style={{
                                                color: 'red',
                                                fontSize: '30px'
                                            }} onClick={() => {
                                                props.DeleteCart(key)
                                                sendData(item)
                                            }} />
                                        </td>
                                    </tr>
                                ))
                            }
                            <tr>
                                <td>Total Carts</td>
                                <td colSpan="3"></td>
                                <th>{sum} VNĐ</th>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        {props.login === false ? (
                            <button onClick={() => {
                                alert('Please login to continue purchase!')
                            }}>
                                Purchase Now!
                            </button>
                        ) : (< Link to='/Payments'>
                            <button onClick={() => {
                                sendDataToPayments(props.Cart)
                            }}>
                                Purchase Now!
                            </button>
                        </Link>)}
                        {/* <PayPalButtons
                            style={{ "layout": "vertical" }}
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
                                                },
                                            },
                                        ],
                                    })
                            }}
                            onApprove={async (data, actions) => {
                                const order = await actions.order.capture();
                                console.log("order", order);
                                handleApprove(data.orderID);
                            }}
                            onCancel={() => {
                                // Display cancel message, modal or redirect user to cancel page or back to cart
                            }}
                            onError={(err) => {
                                setError(err);
                                console.error("PayPal Checkout onError", err);
                            }}
                        /> */}
                    </div>
                </div>
            </div>
        </div >
    )
}
const mapStateToProps = state => {
    return {
        Cart: state.Carts
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        IncreaseQuantity: (item) => dispatch(IncreaseQuantity(item)),
        DecreaseQuantity: (item) => dispatch(DecreaseQuantity(item)),
        DeleteCart: (item) => dispatch(DeleteCart(item)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
