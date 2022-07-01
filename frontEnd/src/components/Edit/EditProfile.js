import React, { useEffect, useState } from 'react'
import styleLogin from '../../CSS/Login.module.css'

function EditProf(_id, name, gender, age, email, phone, identification, address, ward, district, city) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", sessionStorage.getItem('token'));
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
            else {
                alert('Error!! Your profile update unsuccessfully')
                console.log(result)
            }
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
    const [getOneCity, setOneCity] = useState(null);
    const [getOneDis, setOneDis] = useState(null);
    const [getExactCity, setExactCity] = useState(null);
    const [getExactDis, setExactDis] = useState(null);
    const [getExactWard, setExactWard] = useState(null);

    const url = "https://provinces.open-api.vn/api/p"
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    setCity(result);
                },
            )
    }, [])
    const getDisFrAPI = () => {
        if (getOneCity !== null) {
            var url1 = `https://provinces.open-api.vn/api/p/${getOneCity}?depth=2`
            fetch(url1)
                .then(res => res.json())
                .then(
                    (result) => {
                        setDistrict(result.districts);
                    },
                )
        }
    }
    const getWardFrAPI = () => {
        if (getOneDis !== null) {
            var url1 = `https://provinces.open-api.vn/api/d/${getOneDis}?depth=2`
            fetch(url1)
                .then(res => res.json())
                .then(
                    (result) => {
                        setWard(result.wards);
                    },
                )
        }
    }
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
                                        id='name'
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
                                <select id="gender" className={styleLogin.search} required onChange={() => {
                                    var value = document.getElementById("gender").value;
                                    setGender(value)
                                }}>
                                    <option value="">{props.dataFromParent[0].gender ? "Boy" : "Girl"}</option>
                                    <option value={true}>Boy</option>
                                    <option value={false}>Girl</option>
                                </select>
                            </div>
                            <label
                                style={{ padding: "10px 0 0px 0" }}>
                                Age:
                            </label>
                            <div className={styleLogin.wrapper}>
                                <div className={styleLogin.search}>
                                    <input
                                        id='age'
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
                                        id='email'
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
                                        id='phone'
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
                                    id='identification'
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
                                    id='address'
                                    type='text'
                                    defaultValue={props.dataFromParent[0].address}
                                    placeholder=''
                                    onChange={e => setAddress(e.target.value)}
                                ></input>
                            </div>
                        </div>
                        <label
                            style={{ padding: "10px 0 0px 0" }}>
                            City:
                        </label>
                        <div className={styleLogin.wrapper}>
                            <select id="setCity" className={styleLogin.search} required onChange={() => {
                                var value = document.getElementById("setCity").value;
                                if (value !== "") {
                                    setOneCity(value)
                                    setExactCity(document.getElementById(`${value}`).label)
                                }
                                setOneDis(null)
                                setDistrict([{ name: 'Select Districts', code: "" }])
                                setWard([{ name: 'Select Ward', code: "" }])
                                setExactDis(null)
                                setExactWard(null)
                            }}>
                                <option value="" disabled selected hidden>{props.dataFromParent[0].city}</option>
                                {getCity ? getCity.map((option) => (
                                    <option id={option.code} value={option.code} label={option.name}></option>
                                )) : null}
                            </select>
                        </div>
                        <label
                            style={{ padding: "10px 0 0px 0" }}>
                            District:
                        </label>
                        <div className={styleLogin.wrapper}>
                            <select id="setDistrict" className={styleLogin.search} required onClick={() => {
                                getDisFrAPI()
                            }} onChange={() => {
                                var value = document.getElementById("setDistrict").value;
                                if (value !== "") {
                                    setOneDis(value)
                                    setExactDis(document.getElementById(`${value}`).label)
                                }
                                setWard([{ name: 'Select Ward', code: "" }])
                                setExactWard(null)
                            }}>
                                <option value="" disabled selected hidden>{props.dataFromParent[0].district}</option>
                                {getDistrict ? getDistrict.map((option) => (
                                    <option id={option.code} value={option.code} label={option.name}></option>
                                )) : null}
                            </select>
                        </div>
                        <label
                            style={{ padding: "10px 0 0px 0" }}>
                            Ward:
                        </label>
                        <div className={styleLogin.wrapper}>
                            <select id="setWard" className={styleLogin.search} required onClick={() => {
                                getWardFrAPI()
                            }} onChange={() => {
                                var value = document.getElementById("setWard").value;
                                if (value !== "") {
                                    setExactWard(document.getElementById(`${value}`).label)
                                }
                            }}>
                                <option value="" disabled selected hidden>{props.dataFromParent[0].ward}</option>
                                {getWard ? getWard.map((option) => (
                                    <option id={option.code} value={option.code} label={option.name}></option>
                                )) : null}
                            </select>
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
                        if (getExactWard === null) {
                            var newWard = props.dataFromParent[0].ward
                        } else {
                            newWard = getExactWard
                        }
                        if (getExactDis === null) {
                            var newDistrict = props.dataFromParent[0].district
                        } else {
                            newDistrict = getExactDis
                        }
                        if (getExactCity === null) {
                            var newCity = props.dataFromParent[0].city
                        } else {
                            newCity = getExactCity
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
