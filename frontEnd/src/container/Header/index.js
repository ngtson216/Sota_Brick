import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import '../../CSS/GlobalStyles.css'
import { MdOutlineShoppingCart } from 'react-icons/md';
import { BsPerson } from 'react-icons/bs';
import Nav from '../../CSS/Nav.module.css'
import styleHeader from '../../CSS/Header.module.scss'
import logo from '../../img/logo1.png'
import { connect } from 'react-redux'

function Header(props) {
    var sendData = (p) => {
        props.parentCallback(p)
    }
    return (
        <div>
            <div className={Nav.containter}>
                <div className={Nav.grid}>
                    <nav className={Nav.navbar}>
                        <ul className={Nav.listUnstyle}>
                            <Link to="/">
                                <img className={Nav.navbarItem} src={logo} alt="Logo" height="80px" />
                            </Link>
                        </ul>
                        <ul id={Nav.nav} className={Nav.listUnstyle}>
                            <li className={Nav.navbarItem}>
                                <Link className={Nav.navbarItemLink} to="/">Home</Link>
                            </li>
                            <li className={Nav.navbarItem}>
                                <Link className={Nav.navbarItemLink} to="/Shop">Shop</Link>
                            </li>
                            <li className={Nav.navbarItem}>
                                <Link className={Nav.navbarItemLink} to="/AboutUs">About Us</Link>
                            </li>

                            <li className={Nav.navbarItem}>
                                <Link className={`${Nav.navbarItemIcon} ${Nav.iconStyle}`} to="/Cart"><MdOutlineShoppingCart /> <span style={{
                                    position: 'absolute',
                                    fontSize: '18px',
                                    color: 'red'
                                }}>
                                    {props.numberCart}
                                </span></Link>
                            </li>
                            <li className={Nav.navbarItem}>
                                <Link className={`${Nav.navbarItemIcon} ${Nav.iconStyle}`} to="/Login"><BsPerson /></Link>
                            </li>
                            <li className={Nav.navbarItem}>
                                {/* Search Bar */}
                                <div className={styleHeader.wrapper}>
                                    <div className={styleHeader.inner}>
                                        <div className={styleHeader.search}>
                                            <input
                                                placeholder='Search'
                                                spellCheck={false}
                                                onChange={(e) => {
                                                    sendData(e.target.value)
                                                }} />
                                            <button className={styleHeader.searchBtn}>
                                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div >
    )
}
const mapStateToProps = state => {
    return {
        numberCart: state.numberCart
    }
}

export default connect(mapStateToProps)(Header)