import React from 'react'
import styleFooter from '../../CSS/Footer.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../img/logo1.png'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className={styleFooter.mainFooter}>
            <div className="container">
                <div className="row">
                    {/* Logo */}
                    <div className="col-3">
                        <img src={logo} alt="Logo" width="200px" />
                    </div>
                    {/* column 1 */}
                    <div className="col">
                        <h4 style={{ color: "#fff" }}>Home</h4>
                        <ul className="list-unstyled">
                            <Link className={styleFooter.unstyleLink} to="/Cart"><li>Cart</li></Link>
                            <Link className={styleFooter.unstyleLink} to="/Shop"><li>Shop</li></Link>
                            <Link className={styleFooter.unstyleLink} to="/Category"><li>Category</li></Link>
                            <Link className={styleFooter.unstyleLink} to="/Login"><li>Login</li></Link>
                        </ul>
                    </div>
                    {/* column 2 */}
                    <div className="col">
                        <h4 style={{ color: "#fff" }}>Shop</h4>
                        <ul className="list-unstyled">
                            <Link className={styleFooter.unstyleLink} to="/Lego-City"><li>Lego City</li></Link>
                            <Link className={styleFooter.unstyleLink} to="/Harry-Potter"><li>Harry Potter</li></Link>
                            <Link className={styleFooter.unstyleLink} to="/Star-War"><li>Star War</li></Link>
                            <Link className={styleFooter.unstyleLink} to="/Lego-Classic"><li>Lego Classic</li></Link>
                            <Link className={styleFooter.unstyleLink} to="/Lego-Creator"><li>Lego Creator</li></Link>
                        </ul>
                    </div>

                    {/* column 3 */}
                    <div className="col">
                        <h4 style={{ color: "#fff" }}>Categories</h4>
                        <ul className="list-unstyled">
                            <Link className={styleFooter.unstyleLink} to="/Sex"><li>Sex</li></Link>
                            <Link className={styleFooter.unstyleLink} to="/Brand"><li>Brand</li></Link>
                            <Link className={styleFooter.unstyleLink} to="/Category"><li>Theme</li></Link>
                            <Link className={styleFooter.unstyleLink} to="/Login"><li>Origin</li></Link>
                        </ul>
                    </div>

                    {/* column 4 */}
                    <div className="col">
                        <h4 style={{ color: "#fff" }}>Contact</h4>
                        <ul className="list-unstyled">
                            <li>sotabrick@gmail.com</li>
                            <a href="https://www.facebook.com/SotA-Bricks-And-Figures-101501982349241" target="blank">
                                <FontAwesomeIcon className={styleFooter.FooterItemLink} icon={['fab', 'facebook']} />
                            </a>
                            <a href="https://www.instagram.com/sotabrick.vn/" target="blank">
                                <FontAwesomeIcon className={styleFooter.FooterItemLink} icon={['fab', 'instagram']} />
                            </a>
                        </ul>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default Footer