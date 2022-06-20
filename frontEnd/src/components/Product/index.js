import React from 'react';
import { connect } from 'react-redux'
import styleProduct from '../../CSS/Product.module.css'
import Click from './click';
import { FaDollarSign } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa';
import { AddCart } from '../../Redux/store/actions/action'
import { useEffect, useState } from 'react';
function sex(s) {
    if (s) {
        return "Boy";
    }
    else {
        return "Girl";
    }
}

function Product(props) {
    var imgProduct = 'http://localhost:8080/' + props.dataRedux.product_images[0].url
    var sendData = (p) => {
        props.parentCallback(p)
    }
    const [maxVal, setMaxVal] = useState()
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", sessionStorage.getItem('token'));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "productId": props.dataRedux._id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/api/v1/stocks/check-available/", requestOptions)
            .then(response => response.json())
            .then(result => setMaxVal(result.data))
            .catch(error => console.log('error', error));
    }, [])
    var callbackFunction = (childData) => {
        console.log(childData)
    }
    return (
        <div>
            <div style={{ margin: "2% 0 0 7%" }}>
                <p style={{ background: "rgba(1,1,1,0.05)", width: "90%", paddingLeft: "3%" }}>
                    {props.dataRedux.name}
                </p>
            </div>
            <div className={styleProduct.row}>
                <div className={styleProduct.column}>
                    <div style={{ padding: "3% 23%" }}>
                        <img src={imgProduct} alt={props.dataRedux.name} width="400px" />
                    </div>
                </div>
                <div className={styleProduct.column1} style={{ marginLeft: "10%" }}>
                    <div>
                        <p style={{ fontSize: "24px", fontWeight: "600" }}>
                            {props.dataRedux.name}
                        </p>
                        <div style={{ fontSize: "16px" }}>
                            <label style={{ fontWeight: "600" }}>Branch:</label> <label>{props.dataRedux.branch}</label>
                            <label style={{ marginLeft: "5%", marginBottom: "2%", fontWeight: "600" }}>SKU:</label> <label>{props.dataRedux.productCode}</label> <br />
                            <label style={{ fontSize: "22px", fontWeight: "600", color: "#FA3A11", marginBottom: "1%" }}>{props.dataRedux.price} VND</label> <br />
                            <table style={{ border: "0.5px solid #D7DBDD", width: "70%", marginBottom: "2%" }}>
                                <tr style={{ border: "0.1px solid #D7DBDD" }}>
                                    <td style={{ paddingLeft: "2%", height: "40px" }}>
                                        <label><FaDollarSign style={{ fontSize: "24px" }} /></label>
                                        <label style={{ paddingLeft: "2.5%" }}> Genuine products, safety certification</label>
                                    </td>
                                </tr>
                                <tr style={{ border: "0.1px solid #D7DBDD" }}>
                                    <td style={{ paddingLeft: "2%", height: "40px" }}>
                                        <label><FaShoppingCart style={{ fontSize: "24px" }} /></label>
                                        <label style={{ paddingLeft: "2.5%" }}> Free delivery nationwide for</label> <label style={{ fontWeight: "600", fontWeight: "600" }}>orders over 500K</label>
                                    </td>
                                </tr>
                                <tr style={{ border: "0.1px solid #D7DBDD" }}>
                                    <td style={{ paddingLeft: "2%", height: "40px" }}>
                                        <label><FaPhone style={{ fontSize: "24px" }} /></label>
                                        <label style={{ paddingLeft: "2.5%" }}> Contact help:</label> <label style={{ color: "red" }}>0913.088.216</label>
                                    </td>
                                </tr>
                            </table>
                            <Click maxVal={maxVal} parentCallback={callbackFunction} />
                            <div style={{ marginTop: "2%" }}>
                                <button className={styleProduct.btnProduct}>Buy now</button>
                                <button className={styleProduct.btnProduct} onClick={() => {
                                    props.AddCart(props.dataRedux)
                                    sendData(props.numberCart)
                                }}>Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ margin: "2% 0 0 6.7%" }}>
                <div style={{ fontSize: "20px", fontWeight: "600" }}>
                    Description
                </div>
                <div>
                    {props.dataRedux.description}
                </div>
            </div>
            <div style={{ margin: "2% 0 5% 6.7%" }}>
                <div style={{ fontSize: "20px", fontWeight: "600", marginBottom: "0.5%" }}>
                    Product Infomation
                </div>
                <table style={{ border: "0.5px solid #D7DBDD", width: "95%" }}>
                    <tr style={{ border: "0.1px solid #D7DBDD" }}>
                        <td style={{ paddingLeft: "2%", height: "40px", width: "50%", border: "0.1px solid #D7DBDD" }}>
                            Theme
                        </td>
                        <td style={{ paddingLeft: "2%", height: "40px", width: "50%", border: "0.1px solid #D7DBDD" }}>
                            {props.dataRedux.theme}
                        </td>
                    </tr>
                    <tr style={{ border: "0.1px solid #D7DBDD" }}>
                        <td style={{ paddingLeft: "2%", height: "40px", width: "50%", border: "0.1px solid #D7DBDD" }}>
                            Origin
                        </td>
                        <td style={{ paddingLeft: "2%", height: "40px", width: "50%", border: "0.1px solid #D7DBDD" }}>
                            {props.dataRedux.origin}
                        </td>
                    </tr>
                    <tr style={{ border: "0.1px solid #D7DBDD" }}>
                        <td style={{ paddingLeft: "2%", height: "40px", width: "50%", border: "0.1px solid #D7DBDD" }}>
                            Branch
                        </td>
                        <td style={{ paddingLeft: "2%", height: "40px", width: "50%", border: "0.1px solid #D7DBDD" }}>
                            {props.dataRedux.branch}
                        </td>
                    </tr>
                    <tr style={{ border: "0.1px solid #D7DBDD" }}>
                        <td style={{ paddingLeft: "2%", height: "40px", width: "50%", border: "0.1px solid #D7DBDD" }}>
                            Sex
                        </td>
                        <td style={{ paddingLeft: "2%", height: "40px", width: "50%", border: "0.1px solid #D7DBDD" }}>
                            {sex(props.dataRedux.sex)}
                        </td>
                    </tr>
                    <tr style={{ border: "0.1px solid #D7DBDD" }}>
                        <td style={{ paddingLeft: "2%", height: "40px", width: "50%", border: "0.1px solid #D7DBDD" }}>
                            Age
                        </td>
                        <td style={{ paddingLeft: "2%", height: "40px", width: "50%", border: "0.1px solid #D7DBDD" }}>
                            {props.dataRedux.age}
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        dataRedux: state.products,
        numberCart: state.numberCart
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        AddCart: item => dispatch(AddCart(item))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);