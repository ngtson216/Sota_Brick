import { React, useEffect, useState } from 'react'
import tableStyle from '../../CSS/TableStyle.module.scss'
import bgProfile from '../../img/bgProfile.jpg'
import styleModal from '../../CSS/ModalNotification.module.css'
import Popup from 'reactjs-popup'
import styleShop from '../../CSS/Shop.module.css'
import CreateStock from '../Create/CreateStock'
function loop(items) {
    const all = [];
    for (var i in items) {
        for (var j = 0; j < items[i].length; j++) {
            all.push(items[i][j])
        }
    }
    return (all);
}
export default function StockManager() {
    const overlayStyle = { background: 'rgba(0,0,0,0.5)' };
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [products, setProducts] = useState([]);
    const decoded = sessionStorage.getItem('token');
    const url = "http://localhost:8080/api/v1/stocks/"
    const urlProduct = "http://localhost:8080/api/v1/products"
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", decoded);
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders,
        };
        fetch(url, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", decoded);
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders,
        };
        fetch(urlProduct, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setProducts(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
    return (
        <div style={{ paddingBottom: "10%", paddingLeft: "5%", backgroundImage: `url(${bgProfile})`, backgroundRepeat: "no-repeat", backgroundSize: "100%", width: "100%" }}>
            <h1 style={{ padding: "5% 0% 10% 10%", color: "white", fontWeight: "600", position: "relative" }}>Product Stock Manager</h1>
            <Popup trigger={
                <button style={{
                    marginLeft: '1.5%',
                }} className={`${styleShop.customBtn} ${styleShop.btnStyle}`}>
                    Receiving
                </button>
            }{...{ overlayStyle }} modal nested>
                {(close) => (
                    <div className={styleModal.modal}>
                        <button className={styleModal.close} onClick={close}>
                            &times;
                        </button>
                        <div className={styleModal.content}>
                        </div>
                        {/* .................................................................... */}
                        <div className={styleModal.actions}>
                            <CreateStock />
                        </div>
                    </div>
                )}
            </Popup>
            <table className={tableStyle.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name Product</th>
                        <th>Type</th>
                        <th>Quantity</th>
                        <th>Created At</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        loop(items).map((item, index) => (
                            <tr key={item._id}>
                                <td>
                                    {loop(products).map((product) => {
                                        if (product._id === item.productId) {
                                            return product.productCode;
                                        }
                                    })}
                                </td>
                                <td>
                                    {loop(products).map((product) => {
                                        if (product._id === item.productId) {
                                            return product.name;
                                        }
                                    })}
                                </td>
                                <td>
                                    {item.type ? "Receiving" : "Delivering"}
                                </td>
                                <td>
                                    {item.quantity}
                                </td>
                                <td>
                                    {item.createdAt.slice(11, 16)}, {item.createdAt.slice(8, 10)}
                                    /{item.createdAt.slice(5, 7)}
                                    /{item.createdAt.slice(0, 4)}
                                </td>
                                <td>
                                    {item.description}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
