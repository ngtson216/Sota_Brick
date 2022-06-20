import React, { useEffect, useState } from 'react'
// import jwt_decode from "jwt-decode";
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { AiFillCaretDown } from 'react-icons/ai';
import tableStyle from '../../CSS/TableStyle.module.scss'
import jwt_decode from "jwt-decode";
import styleHome from '../../CSS/Home.module.css'
import styleShop from '../../CSS/Shop.module.css'
import Card from '../../components/Card'
import CreateProduct from '../Create/CreateProduct'
import Popup from 'reactjs-popup';
import { Checkbox } from '@mui/material';
import MultiRangeSlider from '../MultiRangeSlider/index';
import { faL } from '@fortawesome/free-solid-svg-icons';
import bgProfile from '../../img/bgProfile.jpg'

export default function Shop(props) {
    const overlayStyle = { background: 'rgba(0,0,0,0.5)' };
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState();
    const [itemsPage, setItemsPage] = useState();
    const [getMin, setMin] = useState();
    const [getMax, setMax] = useState();
    const [getChangeSlide, setChangeSlide] = useState();
    const [getBoy, setBoy] = useState();
    const [getGirl, setGirl] = useState();
    const [get13, set13] = useState(false);
    const [get36, set36] = useState(false);
    const [get612, set612] = useState(false);
    const [getOver, setOver] = useState(false);
    const [getUnder, setUnder] = useState(false);
    const [getLoz, setLoz] = useState(false);
    const [getSembo, setSembo] = useState(false);
    useEffect(() => {
        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/api/v1/products/?sort=desc&page=1&limit=10000", requestOptions)
            .then(response => response.json())
            .then(result => setItems(result))
            .catch(error => console.log('error', error));
    }, [])
    useEffect(() => {
        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/api/v1/products/?sort=desc&page=1&limit=9", requestOptions)
            .then(response => response.json())
            .then(result => setItemsPage(result))
            .catch(error => console.log('error', error));
    }, [])
    return (
        <div className={styleHome.paddingBottom} style={{ backgroundImage: `url(${bgProfile})`, backgroundRepeat: "no-repeat", backgroundSize: "100%", width: "100%" }}>
            <h1 style={{ paddingTop: '40px', paddingBot: '30px', color: 'white', fontSize: '100px' }} className={`${styleHome.center} ${styleHome.title}`}>All our product</h1>
            <div>
                <Popup trigger={
                    <button style={{
                        marginLeft: '77%',
                        marginBottom: '30px'
                    }} className={`${styleShop.customBtn} ${styleShop.btnStyle}`}>
                        Create
                    </button>
                }{...{ overlayStyle }} modal nested>
                    {(close) => (
                        <div className={styleShop.modal}>
                            <button className={styleShop.close} onClick={close}>
                                &times;
                            </button>
                            <div className={styleShop.content}>
                            </div>
                            {/* .................................................................... */}
                            <div className={styleShop.actions}>
                                <CreateProduct />
                            </div>
                        </div>
                    )}
                </Popup>
            </div>
            <div className={` ${styleHome.gridContainer1}`}>
                <div>
                </div>
                <div>
                    <div>
                        <b style={{
                            fontSize: '40px',
                        }}>Category</b>
                    </div>
                    <div style={{
                        marginTop: '10px'
                    }}>
                        <span><b><em style={{
                            fontSize: '20px',
                        }}>Hot Choices</em></b></span>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '95% 5%',
                            borderBottomStyle: 'outset',
                            marginTop: '5px'
                        }} onClick={(e) => {
                            if (document.getElementById("divSortMovies").style.display === "block") {
                                document.getElementById("divSortMovies").style.display = "none";
                            }
                            else {
                                document.getElementById("divSortMovies").style.display = "block";
                            }
                        }}>
                            <em>Sort by movies</em>
                            <span><AiFillCaretDown /></span>
                        </div>
                        <div id="divSortMovies" style={{
                            marginTop: '5px',
                            marginLeft: '20px',
                            display: 'none'
                        }}>
                            <div>Star War</div>
                            <div>Lego City</div>
                            <div>Harry Potter</div>
                            <div>Mine Craft</div>
                            <div>Marvel</div>
                            <div>Kimetsu No Yaiba</div>
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '95% 5%',
                            borderBottomStyle: 'outset',
                            marginTop: '10px'
                        }} onClick={(e) => {
                            if (document.getElementById("divLegoTheme").style.display === "block") {
                                document.getElementById("divLegoTheme").style.display = "none";
                            }
                            else {
                                document.getElementById("divLegoTheme").style.display = "block";
                            }
                        }}
                        >
                            <em>LEGO® Theme</em>
                            <span><AiFillCaretDown /></span>
                        </div>
                        <div id="divLegoTheme" style={{
                            marginTop: '5px',
                            marginLeft: '20px',
                            display: 'none'
                        }}>
                            <div>Lego Technic</div>
                            <div>Lego City</div>
                            <div>Lego Disney</div>
                            <div>Lego Harry Potter</div>
                            <div>Lego DUPLO</div>
                            <div>Lego Classic</div>
                            <div>Lego Creator</div>
                            <div>Lego Architecture</div>
                            <div>Lego Minifigures</div>
                        </div>
                        <div>
                            <div style={{
                                marginTop: '10px',
                                fontSize: '20px',
                            }}>
                                <span onClick={(e) => {
                                    if (document.getElementById("divSex").style.display === "block") {
                                        document.getElementById("divSex").style.display = "none";
                                    }
                                    else {
                                        document.getElementById("divSex").style.display = "block";
                                    }
                                }}><b><em>Sex</em></b></span>
                            </div>
                            <div id="divSex">
                                <div style={{
                                    borderBottomStyle: 'outset',
                                    marginTop: '5px'
                                }}>
                                    <input type="checkbox" id='cbBoy' style={{
                                        height: '15px',
                                        width: '20px',
                                        background: '#fff',
                                        border: '2px #ddd solid',
                                    }} onClick={(e) => {
                                        if (e.target.checked === true) {
                                            setBoy(true)
                                        }
                                        else if (e.target.checked === false) {
                                            setBoy(undefined)
                                        }
                                    }} />
                                    <label htmlFor="cbBoy" style={{
                                        paddingLeft: '5px',
                                        fontSize: '17px'
                                    }}>Boy</label>
                                </div>
                                <div style={{
                                    borderBottomStyle: 'outset',
                                    marginTop: '5px'
                                }}>
                                    <input type="checkbox" id='cbGirl' style={{
                                        height: '15px',
                                        width: '20px',
                                        background: '#fff',
                                        border: '2px #ddd solid',
                                    }} onClick={(e) => {
                                        if (e.target.checked === true) {
                                            setGirl(false)
                                        }
                                        else if (e.target.checked === false) {
                                            setGirl(undefined)
                                        }
                                    }} />
                                    <label htmlFor="cbGirl" style={{
                                        paddingLeft: '5px',
                                        fontSize: '17px'
                                    }}>Girl</label>
                                </div>
                            </div>
                        </div>
                        <div style={{
                            marginTop: '10px',
                            fontSize: '20px'
                        }}>
                            <span onClick={(e) => {
                                if (document.getElementById("divAge").style.display === "block") {
                                    document.getElementById("divAge").style.display = "none";
                                }
                                else {
                                    document.getElementById("divAge").style.display = "block";
                                }
                            }}><b><em>Age</em></b></span>
                            <div id="divAge">
                                <div style={{
                                    borderBottomStyle: 'outset',
                                    marginTop: '5px'
                                }}>
                                    <input type="checkbox" id='cbAgeUnder1' style={{
                                        height: '15px',
                                        width: '20px',
                                        background: '#fff',
                                        border: '2px #ddd solid'
                                    }} onClick={(e) => {
                                        if (e.target.checked === true) {
                                            setUnder(true)
                                        }
                                        else if (e.target.checked === false) {
                                            setUnder(false)
                                        }
                                    }} />
                                    <label htmlFor="cbAgeUnder1" style={{
                                        paddingLeft: '5px',
                                        fontSize: '17px'
                                    }}>Under 1 year old</label>
                                </div>
                                <div style={{
                                    borderBottomStyle: 'outset',
                                    marginTop: '5px'
                                }}>
                                    <input type="checkbox" id='cbAge1to3' style={{
                                        height: '15px',
                                        width: '20px',
                                        background: '#fff',
                                        border: '2px #ddd solid'
                                    }} onClick={(e) => {
                                        if (e.target.checked === true) {
                                            set13(true)
                                        }
                                        else if (e.target.checked === false) {
                                            set13(false)
                                        }
                                    }} />
                                    <label htmlFor="cbAge1to3" style={{
                                        paddingLeft: '5px',
                                        fontSize: '17px'
                                    }}>1 to 3 year old</label>
                                </div>
                                <div style={{
                                    borderBottomStyle: 'outset',
                                    marginTop: '5px'
                                }}>
                                    <input type="checkbox" id='cbAge3to6' style={{
                                        height: '15px',
                                        width: '20px',
                                        background: '#fff',
                                        border: '2px #ddd solid'
                                    }} onClick={(e) => {
                                        if (e.target.checked === true) {
                                            set36(true)
                                        }
                                        else if (e.target.checked === false) {
                                            set36(false)
                                        }
                                    }} />
                                    <label htmlFor="cbAge3to6" style={{
                                        paddingLeft: '5px',
                                        fontSize: '17px'
                                    }}>3 to 6 year old</label>
                                </div>
                                <div style={{
                                    borderBottomStyle: 'outset',
                                    marginTop: '5px'
                                }}>
                                    <input type="checkbox" id='cbAge6to12' style={{
                                        height: '15px',
                                        width: '20px',
                                        background: '#fff',
                                        border: '2px #ddd solid'
                                    }} onClick={(e) => {
                                        if (e.target.checked === true) {
                                            set612(true)
                                        }
                                        else if (e.target.checked === false) {
                                            set612(false)
                                        }
                                    }} />
                                    <label htmlFor="cbAge6to12" style={{
                                        paddingLeft: '5px',
                                        fontSize: '17px'
                                    }}>6 to 12 year old</label>
                                </div>
                                <div style={{
                                    borderBottomStyle: 'outset',
                                    marginTop: '5px'
                                }}>
                                    <input type="checkbox" id='cbAgeOver12' style={{
                                        height: '15px',
                                        width: '20px',
                                        background: '#fff',
                                        border: '2px #ddd solid'
                                    }} onClick={(e) => {
                                        if (e.target.checked === true) {
                                            setOver(true)
                                        }
                                        else if (e.target.checked === false) {
                                            setOver(false)
                                        }
                                    }} />
                                    <label htmlFor="cbAgeOver" style={{
                                        paddingLeft: '5px',
                                        fontSize: '17px'
                                    }}>Over 12 years old</label>
                                </div>
                            </div>
                        </div>
                        <div style={{
                            marginTop: '10px',
                            fontSize: '20px',
                        }}>
                            <div onClick={(e) => {
                                if (document.getElementById("sliderRange").style.display === "block") {
                                    document.getElementById("sliderRange").style.display = "none";
                                    setChangeSlide(false)
                                }
                                else {
                                    document.getElementById("sliderRange").style.display = "block";
                                    setChangeSlide(true)
                                }

                            }} style={{
                                display: 'grid',
                                gridTemplateColumns: '95% 5%',
                            }}>
                                <b><em>Price Range <u style={{ color: 'red', fontSize: '12px', paddingLeft: '10px' }}> Click to show/ hide slider</u> </em></b>
                                <span><AiFillCaretDown /></span>
                            </div>
                            <div id="sliderRange" style={{
                                marginTop: '5px',
                                display: 'none'
                            }}>
                                <MultiRangeSlider
                                    id="slider"
                                    min={0}
                                    max={6999000}
                                    onChange={({ min, max }) => {
                                        setMin(min);
                                        setMax(max);
                                    }}
                                />
                            </div>
                        </div>
                        <div style={{
                            marginTop: '10px',
                            fontSize: '20px'
                        }}>
                            <span onClick={(e) => {
                                if (document.getElementById("divBranch").style.display === "block") {
                                    document.getElementById("divBranch").style.display = "none";
                                }
                                else {
                                    document.getElementById("divBranch").style.display = "block";
                                }
                            }}><b><em>Branch</em></b></span>
                            <div id="divBranch">
                                <div style={{
                                    borderBottomStyle: 'outset',
                                    marginTop: '5px'
                                }}>
                                    <input type="checkbox" id='cbBranchLego' style={{
                                        height: '15px',
                                        width: '20px',
                                        background: '#fff',
                                        border: '2px #ddd solid'
                                    }} onClick={(e) => {
                                        if (e.target.checked === true) {

                                        }
                                        else if (e.target.checked === false) {

                                        }
                                    }} />
                                    <label htmlFor="cbBranchLego" style={{
                                        paddingLeft: '5px',
                                        fontSize: '17px'
                                    }}>Lego</label>
                                </div>
                                <div style={{
                                    borderBottomStyle: 'outset',
                                    marginTop: '5px'
                                }}>
                                    <input type="checkbox" id='cbBranchHoyu' style={{
                                        height: '15px',
                                        width: '20px',
                                        background: '#fff',
                                        border: '2px #ddd solid'
                                    }} onClick={(e) => {
                                        if (e.target.checked === true) {

                                        }
                                        else if (e.target.checked === false) {

                                        }
                                    }} />
                                    <label htmlFor="cbThemeHoyu" style={{
                                        paddingLeft: '5px',
                                        fontSize: '17px'
                                    }}>Hoyu</label>
                                </div>
                                <div style={{
                                    borderBottomStyle: 'outset',
                                    marginTop: '5px'
                                }}>
                                    <input type="checkbox" id='cbBranchSemboBlock' style={{
                                        height: '15px',
                                        width: '20px',
                                        background: '#fff',
                                        border: '2px #ddd solid'
                                    }} onClick={(e) => {
                                        if (e.target.checked === true) {
                                            setSembo(true)
                                        }
                                        else if (e.target.checked === false) {
                                            setSembo(false)
                                        }
                                    }} />
                                    <label htmlFor="cbBranchSemboBlock" style={{
                                        paddingLeft: '5px',
                                        fontSize: '17px'
                                    }}>Sembo Block</label>
                                </div>
                                <div style={{
                                    borderBottomStyle: 'outset',
                                    marginTop: '5px'
                                }}>
                                    <input type="checkbox" id='cbBranchLozBrick' style={{
                                        height: '15px',
                                        width: '20px',
                                        background: '#fff',
                                        border: '2px #ddd solid'
                                    }} onClick={(e) => {
                                        if (e.target.checked === true) {
                                            setLoz(true)
                                        }
                                        else if (e.target.checked === false) {
                                            setLoz(false)
                                        }
                                    }} />
                                    <label htmlFor="cbBranchLozBrick" style={{
                                        paddingLeft: '5px',
                                        fontSize: '17px'
                                    }}>Loz Block</label>
                                </div>
                                <div style={{
                                    borderBottomStyle: 'outset',
                                    marginTop: '5px'
                                }}>
                                    <input type="checkbox" id='cbBranchBalody' style={{
                                        height: '15px',
                                        width: '20px',
                                        background: '#fff',
                                        border: '2px #ddd solid'
                                    }} onClick={(e) => {
                                        if (e.target.checked === true) {

                                        }
                                        else if (e.target.checked === false) {

                                        }
                                    }} />
                                    <label htmlFor="cbBranchBalody" style={{
                                        paddingLeft: '5px',
                                        fontSize: '17px'
                                    }}>Balody</label>
                                </div>
                            </div>
                        </div>
                        <div style={{
                            marginTop: '10px',
                            fontSize: '20px'
                        }}>
                            <span onClick={(e) => {
                                if (document.getElementById("divTheme").style.display === "block") {
                                    document.getElementById("divTheme").style.display = "none";
                                }
                                else {
                                    document.getElementById("divTheme").style.display = "block";
                                }
                            }}><b><em>Theme</em></b></span>
                            <div id="divTheme"
                            // style={{ display: 'none' }}
                            >
                                <div style={{
                                    borderBottomStyle: 'outset',
                                    marginTop: '5px'
                                }}>
                                    <input type="checkbox" id='cbThemeStarWar' style={{
                                        height: '15px',
                                        width: '20px',
                                        background: '#fff',
                                        border: '2px #ddd solid'
                                    }} onClick={(e) => {
                                        if (e.target.checked === true) {

                                        }
                                        else if (e.target.checked === false) {

                                        }
                                    }} />
                                    <label htmlFor="cbThemeStarWar" style={{
                                        paddingLeft: '5px',
                                        fontSize: '17px'
                                    }}>Star War</label>
                                </div>
                                <div style={{
                                    borderBottomStyle: 'outset',
                                    marginTop: '5px'
                                }}>
                                    <input type="checkbox" id='cbThemeLegoCity' style={{
                                        height: '15px',
                                        width: '20px',
                                        background: '#fff',
                                        border: '2px #ddd solid'
                                    }} onClick={(e) => {
                                        if (e.target.checked === true) {

                                        }
                                        else if (e.target.checked === false) {

                                        }
                                    }} />
                                    <label htmlFor="cbThemeLegoCity" style={{
                                        paddingLeft: '5px',
                                        fontSize: '17px'
                                    }}>Lego City</label>
                                </div>
                                <div style={{
                                    borderBottomStyle: 'outset',
                                    marginTop: '5px'
                                }}>
                                    <input type="checkbox" id='cbThemeHarryPotter' style={{
                                        height: '15px',
                                        width: '20px',
                                        background: '#fff',
                                        border: '2px #ddd solid'
                                    }} onClick={(e) => {
                                        if (e.target.checked === true) {

                                        }
                                        else if (e.target.checked === false) {

                                        }
                                    }} />
                                    <label htmlFor="cbThemeHarryPotter" style={{
                                        paddingLeft: '5px',
                                        fontSize: '17px'
                                    }}>Harry Potter</label>
                                </div>
                                <div style={{
                                    borderBottomStyle: 'outset',
                                    marginTop: '5px'
                                }}>
                                    <input type="checkbox" id='cbThemeMineCraft' style={{
                                        height: '15px',
                                        width: '20px',
                                        background: '#fff',
                                        border: '2px #ddd solid'
                                    }} onClick={(e) => {
                                        if (e.target.checked === true) {

                                        }
                                        else if (e.target.checked === false) {

                                        }
                                    }} />
                                    <label htmlFor="cbThemeMineCraft" style={{
                                        paddingLeft: '5px',
                                        fontSize: '17px'
                                    }}>Mine Craft</label>
                                </div>
                                <div style={{
                                    borderBottomStyle: 'outset',
                                    marginTop: '5px'
                                }}>
                                    <input type="checkbox" id='cbThemeLegoClassic' style={{
                                        height: '15px',
                                        width: '20px',
                                        background: '#fff',
                                        border: '2px #ddd solid'
                                    }} onClick={(e) => {
                                        if (e.target.checked === true) {

                                        }
                                        else if (e.target.checked === false) {

                                        }
                                    }} />
                                    <label htmlFor="cbThemeLegoClassic" style={{
                                        paddingLeft: '5px',
                                        fontSize: '17px'
                                    }}>Lego Classic</label>
                                </div>
                                <div style={{
                                    borderBottomStyle: 'outset',
                                    marginTop: '5px'
                                }}>
                                    <input type="checkbox" id='cbThemeLegoCreator' style={{
                                        height: '15px',
                                        width: '20px',
                                        background: '#fff',
                                        border: '2px #ddd solid'
                                    }} onClick={(e) => {
                                        if (e.target.checked === true) {

                                        }
                                        else if (e.target.checked === false) {

                                        }
                                    }} />
                                    <label htmlFor="cbThemeLegoCreator" style={{
                                        paddingLeft: '5px',
                                        fontSize: '17px'
                                    }}>Lego Creator</label>
                                </div>
                                <div style={{
                                    borderBottomStyle: 'outset',
                                    marginTop: '5px'
                                }}>
                                    <input type="checkbox" id='cbThemeChristmas' style={{
                                        height: '15px',
                                        width: '20px',
                                        background: '#fff',
                                        border: '2px #ddd solid'
                                    }} onClick={(e) => {
                                        if (e.target.checked === true) {

                                        }
                                        else if (e.target.checked === false) {

                                        }
                                    }} />
                                    <label htmlFor="cbThemeChrismast" style={{
                                        paddingLeft: '5px',
                                        fontSize: '17px'
                                    }}>Christmas</label>
                                </div>
                                <div style={{
                                    borderBottomStyle: 'outset',
                                    marginTop: '5px'
                                }}>
                                    <input type="checkbox" id='cbThemeDoraemon' style={{
                                        height: '15px',
                                        width: '20px',
                                        background: '#fff',
                                        border: '2px #ddd solid'
                                    }} onClick={(e) => {
                                        if (e.target.checked === true) {

                                        }
                                        else if (e.target.checked === false) {

                                        }
                                    }} />
                                    <label htmlFor="cbThemeDoraemon" style={{
                                        paddingLeft: '5px',
                                        fontSize: '17px'
                                    }}>Doraemon</label>
                                </div>
                                <div style={{
                                    borderBottomStyle: 'outset',
                                    marginTop: '5px'
                                }}>
                                    <input type="checkbox" id='cbThemeLunaNewYear' style={{
                                        height: '15px',
                                        width: '20px',
                                        background: '#fff',
                                        border: '2px #ddd solid'
                                    }} onClick={(e) => {
                                        if (e.target.checked === true) {

                                        }
                                        else if (e.target.checked === false) {

                                        }
                                    }} />
                                    <label htmlFor="cbThemeLunaNewYear" style={{
                                        paddingLeft: '5px',
                                        fontSize: '17px'
                                    }}>Luna New Year</label>
                                </div>
                                <div style={{
                                    borderBottomStyle: 'outset',
                                    marginTop: '5px'
                                }}>
                                    <input type="checkbox" id='cbThemeVehicle' style={{
                                        height: '15px',
                                        width: '20px',
                                        background: '#fff',
                                        border: '2px #ddd solid'
                                    }} onClick={(e) => {
                                        if (e.target.checked === true) {

                                        }
                                        else if (e.target.checked === false) {

                                        }
                                    }} />
                                    <label htmlFor="cbThemeVehicle" style={{
                                        paddingLeft: '5px',
                                        fontSize: '17px'
                                    }}>Vehicle</label>
                                </div>
                            </div>
                        </div>
                        <div style={{
                            marginTop: '10px',
                            fontSize: '20px'
                        }}>
                            <span onClick={(e) => {
                                if (document.getElementById("divOrigin").style.display === "block") {
                                    document.getElementById("divOrigin").style.display = "none";
                                }
                                else {
                                    document.getElementById("divOrigin").style.display = "block";
                                }
                            }}><b><em>Origin</em></b></span>
                            <div id="divOrigin"
                            // style={{ display: 'none' }}
                            >
                                <div style={{
                                    borderBottomStyle: 'outset',
                                    marginTop: '5px'
                                }}>
                                    <input type="checkbox" id='cbOriginDenmark' style={{
                                        height: '15px',
                                        width: '20px',
                                        background: '#fff',
                                        border: '2px #ddd solid'
                                    }} onClick={(e) => {
                                        if (e.target.checked === true) {

                                        }
                                        else if (e.target.checked === false) {

                                        }
                                    }} />
                                    <label htmlFor="cbOriginDenmark" style={{
                                        paddingLeft: '5px',
                                        fontSize: '17px'
                                    }}>Denmark</label>
                                </div>
                                <div style={{
                                    borderBottomStyle: 'outset',
                                    marginTop: '5px'
                                }}>
                                    <input type="checkbox" id='cbOriginChina' style={{
                                        height: '15px',
                                        width: '20px',
                                        background: '#fff',
                                        border: '2px #ddd solid'
                                    }} onClick={(e) => {
                                        if (e.target.checked === true) {

                                        }
                                        else if (e.target.checked === false) {

                                        }
                                    }} />
                                    <label htmlFor="cbOriginChina" style={{
                                        paddingLeft: '5px',
                                        fontSize: '17px'
                                    }}>China</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                </div>
                <div className={`${styleHome.gridContainer}`}>
                    {
                        (props.searchData || getBoy || getGirl === false ||
                            getUnder || get13 || get36 || get612 || getOver || getChangeSlide || getLoz ||
                            getSembo
                        ) ?
                            (items ?
                                items.data.filter((item) => {
                                    if (get13 === false && get36 === false && get612 === false && getOver === false && getUnder === false) {
                                        return item
                                    }
                                    else if (getUnder === true && item.age < 1) {
                                        return item
                                    }
                                    else if (get13 === true && 1 <= item.age && item.age <= 3) {
                                        return item
                                    }
                                    else if (get36 === true && 3 <= item.age && item.age <= 6) {
                                        return item
                                    }
                                    else if (get612 === true && 6 <= item.age && item.age <= 12) {
                                        return item
                                    }
                                    else if (getOver === true && 12 < item.age) {
                                        return item
                                    }
                                }).filter((item) => {
                                    if (getBoy === undefined && getGirl === undefined) {
                                        return item
                                    }
                                    else if (getBoy === true && item.sex === getBoy) {
                                        return item
                                    }
                                    else if (getGirl === false && item.sex === getGirl) {
                                        return item
                                    }
                                }).filter((item) => {
                                    if (getMin <= item.price && item.price <= getMax) {
                                        return item
                                    }

                                }).filter((item) => {
                                    if (getLoz === false && getSembo === false) {
                                        return item
                                    }
                                    else if (getLoz === true && item.branch === "Loz Block") {
                                        return item
                                    }
                                    else if (getSembo === true && item.branch === "Sembo Block") {
                                        return item
                                    }
                                }).filter((item) => {
                                    if (props.searchData === undefined) {
                                        return item
                                    }
                                    else if ((item.name.toLowerCase().includes(props.searchData.toLowerCase()) ||
                                        item.productCode.toLowerCase().includes(props.searchData.toLowerCase()) ||
                                        item.price.toString().includes(props.searchData.toLowerCase()) ||
                                        item.branch.toLowerCase().includes(props.searchData.toLowerCase()) ||
                                        item.theme.toLowerCase().includes(props.searchData.toLowerCase()) ||
                                        item.origin.toLowerCase().includes(props.searchData.toLowerCase()) ||
                                        item.description.toLowerCase().includes(props.searchData.toLowerCase()) ||
                                        item.discount.toString().includes(props.searchData.toLowerCase()) ||
                                        item.tax.toString().includes(props.searchData.toLowerCase()))
                                    ) {
                                        return item
                                    }
                                }).map((item, index) => {
                                    return (
                                        <div key={index} className={`${styleHome.center}`}>
                                            <Card
                                                title={item.name}
                                                image={item.product_images.map((i) => {
                                                    return (i.url)
                                                })}
                                                price={item.price}
                                                info={item}
                                            />
                                        </div>
                                    )
                                }) : '') : (
                                itemsPage ?
                                    (itemsPage.data.map((item, index) => {
                                        return (
                                            <div key={index} className={`${styleHome.center}`}>
                                                <Card
                                                    title={item.name}
                                                    image={item.product_images.map((i) => {
                                                        return (i.url)
                                                    })}
                                                    price={item.price}
                                                    info={item}
                                                />
                                            </div>
                                        )
                                    })) : '')
                    }
                </div>
                <div>
                </div>
            </div>
        </div >
    )
}
