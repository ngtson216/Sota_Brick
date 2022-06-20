import React from 'react'
import login from '../../CSS/Login.module.css'
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState } from "react";

import styleLogin from '../../CSS/Login.module.css'
import Background from '../../img/walle.jpg'
import PropTypes from 'prop-types';

function AccessToken(username, password) {
    console.log(username);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "username": username,
        "password": password
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:8080/api/v1/auth/login", requestOptions)
        .then(response => {
            console.log(response)
            if (response.ok) {
                return response.json()
            }
            throw Error(response.status)
        })
        .then(result => {
            sessionStorage.setItem("token", "Bearer " + result.token)
            sessionStorage.setItem("roles", result.roles)
            window.location.href = '/'
        })
        .catch(error => {
            console.log('error', error)
            alert("Incorrect username or password.")
        });

}

export default function Login() {
    const [passwordShow, setPasswordShow] = useState(false);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [popupLogin, setPopupLogin] = useState(false);
    const togglePassword = () => {
        setPasswordShow(!passwordShow);
    };
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const handleChange = ((e) => {
        if (e.key === "Enter") {
            document.getElementById("myBtn").click()
        }
    })
    return (
        <div>
            <div style={{
                backgroundImage: `url(${Background})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                height: '110vh'
            }}>
                <div className={styleLogin.container}>
                    <div>
                        <h1 className={styleLogin.title}>Login</h1>
                    </div>
                    <p className={styleLogin.content}>
                        Don't have account?
                        <Link className={styleLogin.unstyleLink} to="/SignUp" > Sign Up</Link>
                    </p>
                    <div>
                        <div>
                            <label
                                className={styleLogin.content}
                                style={{ padding: "20px 0 6px 0" }}>
                                Username:
                            </label>
                            <div className={styleLogin.wrapper}>
                                <div className={styleLogin.search}>
                                    <input
                                        id="inputTDN" type="text"
                                        placeholder="Username"
                                        onChange={e => setUserName(e.target.value)}
                                        onFocus={
                                            () => {
                                                document.getElementById("errorLog").style.display = 'none';
                                            }
                                        }
                                        onKeyPress={handleChange}
                                    />
                                    <p id="errorLog" hidden> <strong style={{ color: 'red', fontSize: '12px' }} >
                                        Incorrect username or password. </strong></p>
                                </div>
                            </div>
                        </div>
                        <div >
                            <label
                                className={styleLogin.content}
                                style={{ padding: "20px 0 6px 0" }}>
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

                            <Link
                                to="/resetPass" className={styleLogin.forget}
                                style={{ textDecoration: "underline", paddingLeft: "152px" }} in react>
                                Forget Password?
                            </Link>
                            <div style={{ paddingLeft: "152px", paddingTop: "15px" }}>
                                <button
                                    id="myBtn"
                                    className={styleLogin.btnLogin}
                                    onClick={() => {
                                        AccessToken(username, password)
                                        if (document.getElementById("inputTDN").value.trim() === '')
                                            document.getElementById("errorLog").style.display = 'block'
                                    }}
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}