import React from 'react'
import styleCard from '../../CSS/Card.module.scss'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
function Card(props) {
    var { title, image, price, info } = props
    var bgImg = 'http://localhost:8080' + image[0]
    // const link = "/" + info.name.split(" ").join("");
    return (
        <Link to={'/Product'}>
            <div className={styleCard.card} onClick={(e) => {
                props.addProductRedux(info)
            }}>
                <div className={styleCard.wrapper}>
                    <div>
                        <img src={bgImg} width="230px" height="230px" alt="Product" />
                    </div>
                    <div className={styleCard.cardInfo}>
                        <h1 style={{
                            height: '40px'
                        }}>{title}</h1>
                        <p>{price} VNĐ</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
const mapStateToProps = (state) => {
    return {
        dataRedux: state.products
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addProductRedux: (productInfo) => dispatch({ type: 'ADD_PRODUCT', payload: productInfo })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Card)