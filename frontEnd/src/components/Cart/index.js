import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { IncreaseQuantity, DecreaseQuantity, DeleteCart } from '../../Redux/store/actions/action';
import { AiOutlinePlusCircle, AiOutlineMinusCircle, AiOutlineDelete } from "react-icons/ai";
import { PayPalButtons } from '@paypal/react-paypal-js'
import bgProfile from '../../img/bgProfile.jpg'
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import Payments from '../Payments';
import styleShop from '../../CSS/Shop.module.css'
import { Table } from 'antd'
import 'antd/dist/antd.css'
function Cart(props) {
    const overlayStyle = { background: 'rgba(0,0,0,0.5)' };
    const [value, setValue] = useState(1);
    let sum = 0;
    props.Cart.map((item) => {
        sum = sum + (item.price * item.quantity)
    })
    var sendData = (p) => {
        props.parentCallback(p)
    }
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
                    <div>
                        <span style={{
                            margin: '10px'
                        }} onClick={() => {
                            props.DecreaseQuantity(index)
                            setValue((value + 1)) //dump way to die
                        }}>
                            <AiOutlineMinusCircle style={{
                                color: 'red',
                                fontSize: '20px'
                            }} />
                        </span>
                        <span>{record.quantity}</span>
                        <span style={{
                            margin: '10px'
                        }} onClick={() => {
                            props.IncreaseQuantity(index)
                            setValue((value + 1)) //dump way to die
                        }}>
                            <AiOutlinePlusCircle style={{
                                color: 'red',
                                fontSize: '20px'
                            }} />
                        </span>
                    </div>
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
        {
            title: '',
            align: 'center',
            render: (_, record, index) => {
                return (
                    <AiOutlineDelete style={{
                        color: 'red',
                        fontSize: '30px'
                    }} onClick={() => {
                        props.DeleteCart(index)
                        sendData(record)
                    }} />
                )
            }
        }
    ]
    return (
        <div style={{ paddingBottom: "10%", paddingLeft: "5%", backgroundImage: `url(${bgProfile})`, backgroundRepeat: "no-repeat", backgroundSize: "100%", width: "100%" }}>
            <h1 style={{ padding: "5% 0% 10% 10%", color: "white", fontWeight: "600", position: "relative" }}>Cart</h1>
            <div>
                <Table
                    columns={columns}
                    dataSource={props.Cart}
                    pagination={false}
                    scroll={{ x: 1300 }}
                />
                <div>
                    {props.login === false ? (
                        <button onClick={() => {
                            alert('Please login to continue purchase!')
                        }}>
                            Purchase Now!
                        </button>
                    ) : (<Popup trigger={
                        <button style={{
                            marginLeft: '77%',
                            marginBottom: '30px'
                        }}>
                            Purchase Now!
                        </button>
                    }{...{ overlayStyle }} modal nested>
                        {(close) => (
                            <div className={styleShop.modal}>
                                <button className={styleShop.close} onClick={close}>
                                    &times;
                                </button>
                                <div className={styleShop.content}>
                                </div>
                                {/* .................................................................... */}
                                <div className={styleShop.actions}>
                                    <Payments data={props.Cart} />
                                </div>
                            </div>
                        )}
                    </Popup>)}
                </div>
            </div>
        </div>
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
