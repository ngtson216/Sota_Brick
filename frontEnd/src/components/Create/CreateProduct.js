import React, { useEffect, useState } from 'react'
import createStyle from '../../CSS/Create.module.scss'
import styleShop from '../../CSS/Shop.module.css'
import '../../CSS/Login.module.css'

function CreatePro(Name, Price, Code, Sex, Age, Branch, Theme, Origin, Discount, Tax, Desc, File) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", sessionStorage.getItem('token'));
    var formdata = new FormData();
    Array.from(File).forEach(file => {
        formdata.append("images", file);
    });
    formdata.append("name", Name);
    formdata.append("price", Price);
    formdata.append("description", Desc);
    formdata.append("productCode", Code);
    formdata.append("sex", Sex);
    formdata.append("age", Age);
    formdata.append("branch", Branch);
    formdata.append("theme", Theme);
    formdata.append("origin", Origin);
    formdata.append("discount", Discount);
    formdata.append("tax", Tax);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch("http://localhost:8080/api/v1/products/", requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.success === true) {
                alert("Create Successfully")
                window.location.reload()
            }
        })
        .catch(error => console.log('error', error));
}


export default function CreateProduct(props) {
    const [getName, setName] = useState();
    const [getPrice, setPrice] = useState();
    const [getCode, setCode] = useState();
    const [getSex, setSex] = useState();
    const [getAge, setAge] = useState();
    const [getBranch, setBranch] = useState();
    const [getTheme, setTheme] = useState();
    const [getOrigin, setOrigin] = useState();
    const [getDiscount, setDiscount] = useState();
    const [getTax, setTax] = useState();
    const [getDesc, setDecs] = useState();
    const [getFile, setFile] = useState([]);
    return (
        <div>
            <h1 className={createStyle.h1Create}>Create Product</h1>
            <div className={createStyle.gridContainer}>
                <div className={createStyle.gridChildren}>
                    <label>Name Product: </label>
                    <br />
                    <input
                        type={'text'}
                        placeholder={'Please type name of product...'}
                        className={createStyle.inputStyle}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                    ></input>
                    <br />

                    <label>Price: </label>
                    <br />
                    <input
                        type={'text'}
                        placeholder={'Please type price of product...'}
                        className={createStyle.inputStyle}
                        onChange={(e) => {
                            setPrice(e.target.value)
                        }}
                    ></input>
                    <br />

                    <label>Product Code: </label>
                    <br />
                    <input
                        type={'text'}
                        placeholder={'Please type code of product...'}
                        className={createStyle.inputStyle}
                        onChange={(e) => {
                            setCode(e.target.value)
                        }}
                    ></input>
                    <br />

                    <label>Choose Sex Filter:</label>
                    <br />
                    <select id="mySelect" className={createStyle.inputStyle} required onChange={() => {
                        var value = document.getElementById("mySelect").value;
                        setSex(value)
                    }}>
                        <option value="" disabled selected hidden>Please choose an option</option>
                        <option value={true}>Boy</option>
                        <option value={false}>Girl</option>
                    </select>
                    <br />

                    <label>Age Filter: </label>
                    <br />
                    <input
                        type={'number'}
                        placeholder={'Please type age filter of product...'}
                        className={createStyle.inputStyle}
                        onChange={(e) => {
                            setAge(e.target.value)
                        }}
                    ></input>
                </div>
                <div className={createStyle.gridChildrenRight}>
                    <label>Product Branch: </label>
                    <br />
                    <input
                        type={'text'}
                        placeholder={'Please type branch of product...'}
                        className={createStyle.inputStyle}
                        onChange={(e) => {
                            setBranch(e.target.value)
                        }}
                    ></input>
                    <br />

                    <label>Product Theme: </label>
                    <br />
                    <input
                        type={'text'}
                        placeholder={'Please type theme of product...'}
                        className={createStyle.inputStyle}
                        onChange={(e) => {
                            setTheme(e.target.value)
                        }}
                    ></input>
                    <br />

                    <label>Product Origin: </label>
                    <br />
                    <input
                        type={'text'}
                        placeholder={'Please type origin of product...'}
                        className={createStyle.inputStyle}
                        onChange={(e) => {
                            setOrigin(e.target.value)
                        }}
                    ></input>
                    <br />

                    <label>Discount: </label>
                    <br />
                    <input
                        type={'number'}
                        min='0'
                        max='100'
                        placeholder={'Please type % discount of product...'}
                        className={createStyle.inputStyle}
                        onChange={(e) => {
                            setDiscount(e.target.value)
                        }}
                    ></input>
                    <br />

                    <label>Tax: </label>
                    <br />
                    <input
                        type={'number'}
                        placeholder={'Please type tax of product...'}
                        className={createStyle.inputStyle}
                        onChange={(e) => {
                            setTax(e.target.value)
                        }}
                    ></input>
                </div>
            </div>
            <div className={createStyle.description}>
                <label>Description: </label>
                <br />
                <textarea
                    type={'text'}
                    placeholder={'Please type description of product...'}
                    className={createStyle.inputDescriptionStyle}
                    onChange={(e) => {
                        setDecs(e.target.value)
                    }}
                >
                </textarea>
            </div>
            <br />
            <div className={createStyle.inputFile}>
                <input
                    type={'file'}
                    id='uploadfile'
                    multiple
                    accept=".png, .jpg"
                    onChange={(e) => {
                        setFile(e.target.files)
                    }}
                >
                </input>
            </div>
            <div>
                <button
                    className={`${styleShop.customBtnConfirm} ${styleShop.btnStyle}`}
                    onClick={() => {
                        if (getName !== undefined &&
                            getPrice !== undefined &&
                            getCode !== undefined &&
                            getSex !== undefined &&
                            getAge !== undefined &&
                            getBranch !== undefined &&
                            getTheme !== undefined &&
                            getOrigin !== undefined &&
                            getDiscount !== undefined &&
                            getTax !== undefined &&
                            getDesc !== undefined) {
                            CreatePro(getName, getPrice, getCode, getSex, getAge, getBranch, getTheme, getOrigin, getDiscount, getTax, getDesc, getFile)
                        }
                        else {
                            alert("Please fill full information !!")
                        }
                    }}
                >
                    Confirm
                </button>
            </div>
        </div>
    )
}
