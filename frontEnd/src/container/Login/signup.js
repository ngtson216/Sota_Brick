import React from 'react'
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { DatePicker } from 'react-rainbow-components';
import styleLogin from '../../CSS/Login.module.css'
import Background from '../../img/walle.jpg'
// import DatePicker from 'react-date-picker/dist/entry.nostyle'
export default function SignUp() {
    const [passwordShow, setPasswordShow] = useState(false);
    const togglePassword = () => {
        setPasswordShow(!passwordShow);
    };
    const [getDate, setDate] = useState(null);
    const [username, setUserName] = useState(null);
    const [password, setPassword] = useState(null);
    const [entryPass, setEntryPass] = useState(null);
    const [email, setEmail] = useState(null);
    const [getFullName, setFullName] = useState(null);
    const [getPhoneNumber, setPhoneNumber] = useState(null);
    const [getAddress, setAddress] = useState(null);
    const [getGender, setGender] = useState(null)
    const [getCity, setCity] = useState([]);
    const [getDis, setDis] = useState([]);
    const [getWard, setWard] = useState([]);
    const [getOneCity, setOneCity] = useState(null);
    const [getOneDis, setOneDis] = useState(null);
    const [getExactCity, setExactCity] = useState(null);
    const [getExactDis, setExactDis] = useState(null);
    const [getExactWard, setExactWard] = useState(null);
    const handleChange = ((e) => {
        if (e.key === "Enter") {
            document.getElementById("myBtn").click()
        }
    })
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
                        setDis(result.districts);
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
    const CallSignUp = (City, District, Ward, BirthYear, FullName, PhoneNumber, Address, username, password, Gender, Email) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let birthYear = new Date().getFullYear() - BirthYear.getFullYear()
        var raw = JSON.stringify({
            "username": username,
            "password": password,
            "name": FullName,
            "age": birthYear,
            "role": "customer",
            "email": Email,
            "phone": PhoneNumber,
            "address": Address,
            "ward": Ward,
            "district": District,
            "city": City,
            "gender": Gender
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/api/v1/users/", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                alert("Sign Up Successfully");
                let url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/Login`
                window.location.assign(url)
            })
            .catch(error => console.log('error', error));
    }
    return (
        <div>
            <div style={{
                backgroundImage: `url(${Background})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                height: '125vh'
            }}>
                <div className={styleLogin.container}>
                    <div>
                        <h1 className={styleLogin.title}>Sign Up</h1>
                    </div>
                    <p className={styleLogin.content}>
                        You have account?
                        <Link className={styleLogin.unstyleLink} to="/Login" > Login</Link>
                    </p>
                    <div>
                        <div className={styleLogin.inline}>
                            <div>
                                <label
                                    className={styleLogin.content}
                                    style={{ padding: "10px 0 0px 0" }}>
                                    Full Name:
                                </label>
                                <div className={styleLogin.wrapper}>
                                    <div className={styleLogin.search}>
                                        <input
                                            type="text"
                                            placeholder="Full name"
                                            onChange={(e) => {
                                                setFullName(e.target.value)
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label
                                    className={styleLogin.content}
                                    style={{ padding: "10px 0 0px 0" }}>
                                    Phone Number:
                                </label>
                                <div className={styleLogin.wrapper}>
                                    <div className={styleLogin.search}>
                                        <input
                                            type="number"
                                            placeholder="Phone number"
                                            onChange={(e) => {
                                                setPhoneNumber(e.target.value)
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label
                                    className={styleLogin.content}
                                    style={{ padding: "10px 0 0px 0" }}>
                                    Date Of Birth:
                                </label>
                                <div className={styleLogin.wrapper}>
                                    <DatePicker
                                        placeholder='01/01/1990'
                                        value={getDate}
                                        minDate={new Date(1990, 0, 1)}
                                        maxDate={new Date()}
                                        onChange={(value) => {
                                            setDate(value)
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    className={styleLogin.content}
                                    style={{ padding: "10px 0 0px 0" }}>
                                    Address:
                                </label>
                                <div className={styleLogin.wrapper}>
                                    <div className={styleLogin.search}>
                                        <input
                                            type="text"
                                            placeholder="Address"
                                            onChange={(e) => {
                                                setAddress(e.target.value)
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label
                                    className={styleLogin.content}
                                    style={{ padding: "10px 0 0px 0" }}>
                                    District:
                                </label>
                                <div className={styleLogin.wrapper}>
                                    <select id="setDis" className={styleLogin.search} required onClick={() => {
                                        getDisFrAPI()
                                    }} onChange={() => {
                                        var value = document.getElementById("setDis").value;
                                        if (value !== "") {
                                            setOneDis(value)
                                            setExactDis(document.getElementById(`${value}`).label)
                                        }
                                        setWard([{ name: 'Select Ward', code: "" }])
                                        setExactWard(null)
                                    }}>
                                        <option value="" disabled selected hidden>Select District</option>
                                        {getDis.map((option) => (
                                            <option id={option.code} value={option.code} label={option.name}></option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label
                                    className={styleLogin.content}
                                    style={{ padding: "10px 0 0px 0" }}>
                                    Email:
                                </label>
                                <div className={styleLogin.wrapper}>
                                    <div className={styleLogin.search}>
                                        <input
                                            type="text"
                                            placeholder="Email"
                                            onChange={(e) => {
                                                setEmail(e.target.value)
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label
                                    className={styleLogin.content}
                                    style={{ padding: "10px 0 0px 0" }}>
                                    Username:
                                </label>
                                <div className={styleLogin.wrapper}>
                                    <div className={styleLogin.search}>
                                        <input
                                            type="text"
                                            placeholder="Username"
                                            onChange={(e) => {
                                                setUserName(e.target.value)
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div >
                                <label
                                    className={styleLogin.content}
                                    style={{ padding: "10px 0 0px 0" }}>
                                    Password:
                                </label>
                                <div >
                                    <div className={styleLogin.wrapper}>
                                        <div className={styleLogin.search}>
                                            <input onChange={e => setPassword(e.target.value)} type={passwordShow ? "text" : "password"}
                                                placeholder="Password"
                                                onKeyPress={handleChange}
                                            />
                                            <button className={styleLogin.btnEye} onClick={togglePassword}>
                                                {passwordShow ? <FaEye /> : <FaEyeSlash />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styleLogin.inline} style={{ paddingLeft: "30px" }}>
                            <div>
                                <label
                                    className={styleLogin.content}
                                    style={{ padding: "10px 0 0px 0" }}>
                                    Gender:
                                </label>
                                <div className={styleLogin.wrapper}>
                                    <select id="setGender" className={styleLogin.search} required onChange={() => {
                                        var value = document.getElementById("setGender").value;
                                        if (value === 'true')
                                            setGender(true)
                                        else
                                            setGender(false)
                                    }}>
                                        <option value="" disabled selected hidden>Select Gender</option>
                                        <option value={true}>Boy</option>
                                        <option value={false}>Girl</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label
                                    className={styleLogin.content}
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
                                        setDis([{ name: 'Select Districts', code: "" }])
                                        setWard([{ name: 'Select Ward', code: "" }])
                                        setExactDis(null)
                                        setExactWard(null)
                                    }}>
                                        <option value="" disabled selected hidden>Select City</option>
                                        {getCity.map((option) => (
                                            <option id={option.code} value={option.code} label={option.name}></option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label
                                    className={styleLogin.content}
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
                                        <option value="" disabled selected hidden>Select Ward</option>
                                        {getWard.map((option) => (
                                            <option id={option.code} value={option.code} label={option.name}></option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div style={{ paddingTop: "74px" }}>
                                <label
                                    className={styleLogin.content}
                                    style={{ padding: "10px 0 0px 0" }}>
                                    Entry Password Again:
                                </label>
                                <div >
                                    <div className={styleLogin.wrapper}>
                                        <div className={styleLogin.search}>
                                            <input onChange={e => setEntryPass(e.target.value)} type={passwordShow ? "text" : "password"}
                                                placeholder="Password"
                                                onKeyPress={handleChange}
                                            />
                                            <button className={styleLogin.btnEye} onClick={togglePassword}>
                                                {passwordShow ? <FaEye /> : <FaEyeSlash />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ paddingLeft: "433px", paddingTop: "15px" }}>
                            <button
                                className={styleLogin.btnLogin}
                                onClick={() => {
                                    if (getDate !== null && password === entryPass)
                                        CallSignUp(getExactCity, getExactDis, getExactWard, getDate, getFullName, getPhoneNumber, getAddress, username, password, getGender, email)
                                }}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}