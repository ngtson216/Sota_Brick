import { React, useEffect, useState } from 'react'
import tableStyle from '../../CSS/TableStyle.module.scss'
import bgProfile from '../../img/bgProfile.jpg'
import styleModal from '../../CSS/ModalNotification.module.css'
import Popup from 'reactjs-popup'
import styleShop from '../../CSS/Shop.module.css'
import CreateStock from '../Create/CreateStock'
import { MDBDataTable } from 'mdbreact';

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
    const url = "http://localhost:8080/api/v1/stocks/?page=1&limit=10000"
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

    const data = {
        columns: [
            {
                label: 'ID',
                field: 'id',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Name Product',
                field: 'name',
                sort: 'asc',
                width: 270
            },
            {
                label: 'Type',
                field: 'type',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Quantity',
                field: 'quantity',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Created At',
                field: 'at',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Description',
                field: 'description',
                sort: 'asc',
                width: 100
            }
        ],
        rows: loop(items).map((item) => (
            {
                id: loop(products).map((product) => {
                    if (product._id === item.productId) {
                        return product.productCode;
                    }
                }),
                name: loop(products).map((product) => {
                    if (product._id === item.productId) {
                        return product.name;
                    }
                }),
                type: item.type ? "Receiving" : "Delivering",
                quantity: item.quantity,
                at: item.createdAt.slice(11, 16) + ", " + item.createdAt.slice(8, 10) + "/" + item.createdAt.slice(5, 7) + "/" + item.createdAt.slice(0, 4),
                description: item.description
            }))

    }

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
            <div style={{ width: "96%", margin: "2%", textAlign: "center" }}>
                <MDBDataTable
                    bordered
                    data={data}
                // striped
                // small
                // searching={false}
                />
            </div>
        </div>
    )
}
