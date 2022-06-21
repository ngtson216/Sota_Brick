import React, { useState } from 'react'
import { connect } from "react-redux";
import { IncreaseQuantity, DecreaseQuantity, DeleteCart } from '../../Redux/store/actions/action';
import { AiOutlinePlusCircle, AiOutlineMinusCircle, AiOutlineDelete } from "react-icons/ai";
import bgProfile from '../../img/bgProfile.jpg'

function Cart(props) {
    const [value, setValue] = useState(1);
    let sum = 0;
    props.Cart.map((item) => {
        sum = sum + (item.price * item.quantity)
    })
    var sendData = (p) => {
        props.parentCallback(p)
    }
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
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <th>{sum} VNĐ</th>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
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
