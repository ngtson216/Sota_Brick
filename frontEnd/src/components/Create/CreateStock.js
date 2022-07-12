import { React, useEffect, useState } from 'react'
import createStyle from '../../CSS/Create.module.scss'
import styleShop from '../../CSS/Shop.module.css'
function loop(items) {
    const all = [];
    for (var i in items) {
        for (var j = 0; j < items[i].length; j++) {
            all.push(items[i][j])
        }
    }
    return (all);
}
function Receiving(note, quantity, idProducts) {
    const urlStock = "http://localhost:8080/api/v1/stocks"
    const decoded = sessionStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", decoded);
    var raw = JSON.stringify({
        "description": note,
        "quantity": quantity,
        "productId": idProducts,
        "type": 1
    });
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch(urlStock, requestOptions)
        .then(response => response.json())
        .then(result => { console.log(result); alert('Create Receiving succesfull'); window.location.reload() })
        .catch(error => console.log('error', error));
}
export default function CreateStock() {
    const [products, setProducts] = useState([]);
    const [idProducts, setIDProducts] = useState([]);
    const [note, setNote] = useState([]);
    const [quantity, setQuantity] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const decoded = sessionStorage.getItem('token');
    const urlProduct = "http://localhost:8080/api/v1/products"
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
        <div style={{ margin: "0 0 5% 10%" }}>
            <label style={{ fontSize: "16px", fontWeight: "600" }}>Choose the product</label><br />
            <select
                id="mySelect"
                style={{ marginBottom: "2%" }}
                className={createStyle.inputStyle}
                onChange={() => {
                    var value = document.getElementById("mySelect").value;
                    setIDProducts(value)
                }}>
                <option value={undefined}>Please choose an option</option>
                {loop(products).map((products) => (
                    <option value={products._id} key={products._id}>{products.name}</option>
                ))}
            </select>
            <br />
            <label style={{ fontSize: "16px", fontWeight: "600" }}>Input quantity</label><br />
            <input
                id="quantity"
                type="number"
                className={createStyle.inputStyle}
                placeholder={'Please type quantity'}
                onChange={e => setQuantity(e.target.value)}
                style={{ paddingLeft: "1%", marginBottom: "2%" }} /><br />
            <label style={{ fontSize: "16px", fontWeight: "600" }}>Description</label><br />
            <textarea
                className={createStyle.descriptionInput}
                id='note'
                placeholder='Please type description'
                onChange={e => { setNote(e.target.value) }}
            ></textarea>
            <br />
            <button
                style={{ margin: '5% 0 0 66%' }}
                className={`${styleShop.customBtn} ${styleShop.btnStyle}`}
                onClick={
                    () => {
                        if (idProducts === undefined) {
                            var newIdProducts = document.getElementById("mySelect").defaultValue
                        } else {
                            newIdProducts = idProducts
                        }
                        if (note === undefined) {
                            var newNote = document.getElementById("note").defaultValue
                        } else {
                            newNote = note
                        }
                        if (quantity === undefined) {
                            var newQuantity = document.getElementById("quantity").defaultValue
                        } else {
                            newQuantity = quantity
                        }
                        if (
                            newIdProducts !== '' &&
                            newNote !== '' &&
                            newQuantity !== ''
                        ) {
                            Receiving(newNote, newQuantity, newIdProducts)
                        }
                        else {
                            alert("Please type all information");
                        }
                    }}
            >
                Accept
            </button>
        </div>
    )
}