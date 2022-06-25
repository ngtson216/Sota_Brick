import { React, useEffect, useState } from 'react'
import tableStyle from '../../CSS/TableStyle.module.scss'
import bgProfile from '../../img/bgProfile.jpg'
import styleModal from '../../CSS/ModalNotification.module.css'
import Popup from 'reactjs-popup'
import styleShop from '../../CSS/Shop.module.css'
import CreateStock from '../Create/CreateStock'
import { Table } from 'antd'
import '../../CSS/TableAntd.css'
import 'antd/dist/antd.css'
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
    const columns = [
        {
            title: 'ID',
            render: (_, record) => {
                let code
                loop(products).map((product) => {
                    if (product._id === record.productId) {
                        return code = product.productCode
                    }
                })
                return <span>{code}</span>
            },
            align: 'center'
        },
        {
            title: 'Name Product',
            render: (_, record) => {
                let name
                loop(products).map((product) => {
                    if (product._id === record.productId) {
                        return name = product.name;
                    }
                })
                return <span>{name}</span>
            },
            align: 'center'
        },
        {
            title: 'Type',
            render: (_, record) => {
                return <span>{record.type ? "Receiving" : "Delivering"}</span>
            },
            align: 'center'
        },
        {
            title: 'Quantity',
            key: 'quantity',
            dataIndex: 'quantity',
            align: 'center'
        },
        {
            title: 'Created At',
            render: (_, record) => {
                return <span> {record.createdAt.slice(11, 16)}, {record.createdAt.slice(8, 10)}
                    /{record.createdAt.slice(5, 7)}
                    /{record.createdAt.slice(0, 4)}</span>
            },
            align: 'center'
        },
        {
            title: 'Description',
            key: 'description',
            dataIndex: 'description',
            align: 'center'
        }
    ]
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
            <div style={{
                margin: '2rem auto 9rem auto',
                width: '97%',
            }}>
                <Table
                    columns={columns}
                    dataSource={loop(items)}
                    scroll={{ x: 1300 }}
                    pagination={{
                        position: ['bottomCenter']
                    }}
                    bordered={true}
                />
            </div>
        </div>
    )
}
