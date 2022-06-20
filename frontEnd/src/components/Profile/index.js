import { React, useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";
import styleLogin from '../../CSS/Login.module.css'
import bgProfile from '../../img/bgProfile.jpg'
import avatar from '../../assets/avatar.svg'
function Profile() {
    const token = sessionStorage.getItem('token')
    const decoded = jwt_decode(sessionStorage.getItem('token'));
    const [items, setItems] = useState()
    const url = "http://localhost:8080/api/v1/users/" + decoded.id
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        // myHeaders.append("x-auth-token", localStorage.getItem('token'));
        // myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => setItems(result))
            .catch(error => console.log('error', error));
    }, [])
    return items ? (
        <div style={{ paddingBottom: "10%", paddingLeft: "5%", backgroundImage: `url(${bgProfile})`, backgroundRepeat: "no-repeat", backgroundSize: "100%", width: "100%" }}>
            <h1 style={{ padding: "5% 0% 10% 10%", color: "white", fontWeight: "600", position: "relative" }}>Profile</h1>
            <div style={{
                position: "absolute",
                width: "351px",
                height: "314px",
                left: "70%",
                top: "115px",
                background: "#FFFFFF",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}>
                <div style={{ textAlign: "center", paddingTop: "5%" }}>
                    <img src={avatar} width="100" alt='' />
                    <div>{items.data.name}</div>
                    <div>
                        {items.data.username}
                    </div>
                    <button style={{
                        marginTop: "7%",
                        width: "150px",
                        height: "45px",
                        color: "#fff",
                        background: "linear-gradient(180deg, #9C4CD0 0%, #6131EB 100%)",
                    }}
                    >Update Profile
                    </button>
                </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", paddingLeft: '10%' }}>
                <ul className={styleLogin.inline}>
                    <div>
                        <label
                            style={{ padding: "10px 0 0px 0" }}>
                            Name:
                        </label>
                        <div className={styleLogin.wrapper} >
                            <div className={styleLogin.search} style={{ background: "#ccc", border: "0.01px gray solid" }}>
                                <span className='lineHeightProfile'>{items.data.name}</span>
                            </div>
                        </div>

                        <label
                            style={{ padding: "10px 0 0px 0" }}>
                            Gender:
                        </label>
                        <div className={styleLogin.wrapper}>
                            <div className={styleLogin.search} style={{ background: "#ccc", border: "0.01px gray solid" }}>
                                <span className='lineHeightProfile'>{items.data.gender}</span>
                            </div>
                        </div>

                        <label
                            style={{ padding: "10px 0 0px 0" }}>
                            Age:
                        </label>
                        <div className={styleLogin.wrapper}>
                            <div className={styleLogin.search} style={{ background: "#ccc", border: "0.01px gray solid" }}>
                                <span className='lineHeightProfile'>{items.data.age}</span>
                            </div>
                        </div>

                        <label
                            style={{ padding: "10px 0 0px 0" }}>
                            Email:
                        </label>
                        <div className={styleLogin.wrapper}>
                            <div className={styleLogin.search} style={{ background: "#ccc", border: "0.01px gray solid" }}>
                                <span className='lineHeightProfile'>{items.data.email}</span>
                            </div>
                        </div>

                        <label
                            style={{ padding: "10px 0 0px 0" }}>
                            Phone:
                        </label>
                        <div className={styleLogin.wrapper}>
                            <div className={styleLogin.search} style={{ background: "#ccc", border: "0.01px gray solid" }}>
                                <span className='lineHeightProfile'>{items.data.phone}</span>
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
                        <div className={styleLogin.search} style={{ background: "#ccc", border: "0.01px gray solid" }}>
                            <span className='lineHeightProfile'>{items.data.idCard}</span>
                        </div>
                    </div>

                    <label
                        style={{ padding: "10px 0 0px 0" }}>
                        Address:
                    </label>
                    <div className={styleLogin.wrapper}>
                        <div className={styleLogin.search} style={{ background: "#ccc", border: "0.01px gray solid" }}>
                            <span className='lineHeightProfile'>{items.data.address}</span>
                        </div>
                    </div>

                    <label
                        style={{ padding: "10px 0 0px 0" }}>
                        Ward:
                    </label>
                    <div className={styleLogin.wrapper}>
                        <div className={styleLogin.search} style={{ background: "#ccc", border: "0.01px gray solid" }}>
                            {/* <span className='lineHeightProfile'>{items.data.ward}</span> */}
                        </div>
                    </div>

                    <label
                        style={{ padding: "10px 0 0px 0" }}>
                        District:
                    </label>
                    <div className={styleLogin.wrapper}>
                        <div className={styleLogin.search} style={{ background: "#ccc", border: "0.01px gray solid" }}>
                            {/* <span className='lineHeightProfile'>{items.data.district}</span> */}
                        </div>
                    </div>

                    <label
                        style={{ padding: "10px 0 0px 0" }}>
                        City:
                    </label>
                    <div className={styleLogin.wrapper}>
                        <div className={styleLogin.search} style={{ background: "#ccc", border: "0.01px gray solid" }}>
                            {/* <span className='lineHeightProfile'>{items.data.city}</span> */}
                        </div>
                    </div>
                </ul>
            </div>
        </div >
    ) : null
}

export default Profile