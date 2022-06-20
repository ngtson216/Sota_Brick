import React, { useEffect, useState } from 'react'
import styleLogin from '../../CSS/Login.module.css'
const gender = [
    'Boy',
    'Girl'
]
function EditProf(_id, name, gender, age, email, phone, identification, address, ward, district, city) {
    if (gender === 'Boy') {
        var newGender = true
    }
    else if (gender === 'Girl') {
        newGender = false
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        "name": name,
        "gender": gender,
        "age": age,
        "email": email,
        "phone": phone,
        "identification": identification,
        "address": address,
        "district": ward,
        "ward": district,
        "city": city
    });
    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch("http://localhost:8080/api/v1/users/" + _id, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.success === true) {
                alert('Your profile update successfully')
                window.location.reload()
            }
            console.log(result)
        })
        .catch(error => console.log('error', error));
}
export default function EditProfile(props) {
    const [getName, setName] = useState();
    const [getGender, setGender] = useState();
    const [getAge, setAge] = useState();
    const [getEmail, setEmail] = useState();
    const [getPhone, setPhone] = useState();
    const [getIdentification, setIdentification] = useState();
    const [getAddress, setAddress] = useState();
    const [getWard, setWard] = useState();
    const [getDistrict, setDistrict] = useState();
    const [getCity, setCity] = useState();
    return (
        <div>
            <h1
                style={{
                    textAlign: "center",
                    fontSize: "30px",
                    fontWeight: "600",
                    paddingBottom: "30px",
                }}>
                Update Profile
            </h1>
            <div style={{ fontSize: "15px", }}>
                <div style={{ display: "flex", alignItems: "center", paddingLeft: '10%' }}>
                    <ul className={styleLogin.inline}>
                        <div>
                            <label
                                style={{ padding: "10px 0 0px 0", }}>
                                Name:
                            </label>
                            <div className={styleLogin.wrapper} >
                                <div className={styleLogin.search}>
                                    <input
                                        id='Name'
                                        type='text'
                                        defaultValue={props.dataFromParent[0].name}
                                        placeholder=''
                                        onChange={e => setName(e.target.value)}
                                    ></input>
                                </div>
                            </div>
                            <label
                                style={{ padding: "10px 0 0px 0" }}>
                                Gender:
                            </label>
                            <div className={styleLogin.wrapper}>
                                <div className={styleLogin.search}>
                                    <input
                                        id='Name'
                                        type='text'
                                        defaultValue={props.dataFromParent[0].gender ? "Boy" : "Girl"}
                                        placeholder=''
                                        onChange={e => setGender(e.target.value)}
                                    ></input>
                                </div>
                            </div>
                            <label
                                style={{ padding: "10px 0 0px 0" }}>
                                Age:
                            </label>
                            <div className={styleLogin.wrapper}>
                                <div className={styleLogin.search}>
                                    <input
                                        id='Name'
                                        type='text'
                                        defaultValue={props.dataFromParent[0].age}
                                        placeholder=''
                                        onChange={e => setAge(e.target.value)}
                                    ></input>
                                </div>
                            </div>
                            <label
                                style={{ padding: "10px 0 0px 0" }}>
                                Email:
                            </label>
                            <div className={styleLogin.wrapper}>
                                <div className={styleLogin.search}>
                                    <input
                                        id='Name'
                                        type='text'
                                        defaultValue={props.dataFromParent[0].email}
                                        placeholder=''
                                        onChange={e => setEmail(e.target.value)}
                                    ></input>
                                </div>
                            </div>
                            <label
                                style={{ padding: "10px 0 0px 0" }}>
                                Phone:
                            </label>
                            <div className={styleLogin.wrapper}>
                                <div className={styleLogin.search}>
                                    <input
                                        id='Name'
                                        type='text'
                                        defaultValue={props.dataFromParent[0].phone}
                                        placeholder=''
                                        onChange={e => setPhone(e.target.value)}
                                    ></input>
                                </div>
                            </div>
                        </div>
                    </ul>
                    <ul className={styleLogin.inline} style={{ paddingLeft: "10%" }}>
                        <label
                            style={{ padding: "10px 0 0px 0" }}>
                            Identification:
                        </label>
                        <div className={styleLogin.wrapper}>
                            <div className={styleLogin.search}>
                                <input
                                    id='Name'
                                    type='text'
                                    defaultValue={props.dataFromParent[0].identification}
                                    placeholder=''
                                    onChange={e => setIdentification(e.target.value)}
                                ></input>
                            </div>
                        </div>
                        <label
                            style={{ padding: "10px 0 0px 0" }}>
                            Address:
                        </label>
                        <div className={styleLogin.wrapper}>
                            <div className={styleLogin.search}>
                                <input
                                    id='Name'
                                    type='text'
                                    defaultValue={props.dataFromParent[0].address}
                                    placeholder=''
                                    onChange={e => setAddress(e.target.value)}
                                ></input>
                            </div>
                        </div>
                        <label
                            style={{ padding: "10px 0 0px 0" }}>
                            Ward:
                        </label>
                        <div className={styleLogin.wrapper}>
                            <div className={styleLogin.search}>
                                <input
                                    id='Name'
                                    type='text'
                                    defaultValue={props.dataFromParent[0].ward}
                                    placeholder=''
                                    onChange={e => setWard(e.target.value)}
                                ></input>
                            </div>
                        </div>
                        <label
                            style={{ padding: "10px 0 0px 0" }}>
                            District:
                        </label>
                        <div className={styleLogin.wrapper}>
                            <div className={styleLogin.search}>
                                <input
                                    id='Name'
                                    type='text'
                                    defaultValue={props.dataFromParent[0].district}
                                    placeholder=''
                                    onChange={e => setDistrict(e.target.value)}
                                ></input>
                            </div>
                        </div>
                        <label
                            style={{ padding: "10px 0 0px 0" }}>
                            City:
                        </label>
                        <div className={styleLogin.wrapper}>
                            <div className={styleLogin.search}>
                                <input
                                    id='Name'
                                    type='text'
                                    defaultValue={props.dataFromParent[0].city}
                                    placeholder=''
                                    onChange={e => setCity(e.target.value)}
                                ></input>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
            <button
                style={{
                    width: "120px",
                    height: "40px",
                    lineHeight: "40px",
                    paddingBottom: "30px",
                    borderRadius: "15px",
                    fontWeight: "600",
                    color: "#fff",
                    background: "linear-gradient(180deg, #9C4CD0 0%, #6131EB 100%)",
                    margin: "3% 0 5% 73%"
                }}
                onClick={
                    () => {
                        if (getName === undefined) {
                            var newName = document.getElementById("name").defaultValue
                        } else {
                            newName = getName
                        }
                        if (getGender === undefined) {
                            var newGender = document.getElementById("gender").defaultValue
                        } else {
                            newGender = getGender
                        }
                        if (getAge === undefined) {
                            var newAge = document.getElementById("age").defaultValue
                        } else {
                            newAge = getAge
                        }
                        if (getEmail === undefined) {
                            var newEmail = document.getElementById("email").defaultValue
                        } else {
                            newEmail = getEmail
                        }
                        if (getPhone === undefined) {
                            var newPhone = document.getElementById("phone").defaultValue
                        } else {
                            newPhone = getPhone
                        }
                        if (getIdentification === undefined) {
                            var newIdentification = document.getElementById("identification").defaultValue
                        } else {
                            newIdentification = getIdentification
                        }
                        if (getAddress === undefined) {
                            var newAddress = document.getElementById("address").defaultValue
                        } else {
                            newAddress = getAddress
                        }
                        if (getWard === undefined) {
                            var newWard = document.getElementById("ward").defaultValue
                        } else {
                            newWard = getWard
                        }
                        if (getDistrict === undefined) {
                            var newDistrict = document.getElementById("district").defaultValue
                        } else {
                            newDistrict = getDistrict
                        }
                        if (getCity === undefined) {
                            var newCity = document.getElementById("city").defaultValue
                        } else {
                            newCity = getCity
                        }
                        if (
                            newName !== '' &&
                            newGender !== '' &&
                            newAge !== '' &&
                            newEmail !== '' &&
                            newPhone !== '' &&
                            newIdentification !== '' &&
                            newAddress !== '' &&
                            newWard !== '' &&
                            newDistrict !== '' &&
                            newCity !== ''
                        ) {
                            EditProf(props.dataFromParent[0]._id,
                                newName.trim().replace(/\s+/g, ' '),
                                newGender,
                                newAge,
                                newEmail,
                                newPhone,
                                newIdentification,
                                newAddress.trim().replace(/\s+/g, ' '),
                                newWard,
                                newDistrict,
                                newCity
                            )
                        }
                        else {
                            alert("Please enter all information")
                        }
                    }}>
                Accept
            </button>
        </div >
    )
}
