import React, { Component } from 'react'
import { connect } from "react-redux";
import { IncreaseQuantity, DecreaseQuantity, DeleteCart } from '../../Redux/store/actions/action';

function Cart(props) {
    console.log(props.Cart)
    return (
        <div className="row">
            <div className="col-md-12">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            props.Cart.map((item) => (
                                <tr>
                                    <th></th>
                                    <th>{item.name}</th>
                                    <th>image</th>
                                    <th>{item.price}</th>
                                    <th>Quantity</th>
                                    <th>total</th>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        Cart: state.Carts
    }
}

export default connect(mapStateToProps, { IncreaseQuantity, DecreaseQuantity, DeleteCart })(Cart)
