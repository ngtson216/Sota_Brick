import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styleHome from '../../CSS/Home.module.css'
import Card from '../../components/Card'
import AutoSlider from '../../container/AutoSlider'
import SlickSlider from '../../container/AutoSlider/SlickSlider'
import styleLogin from '../../CSS/Login.module.css'
import { connect } from 'react-redux'
function Home(props) {
    const [items, setItems] = useState()
    const [showComp, setShowComp] = useState(0)
    const [show, setShow] = useState(true)
    const [cateInfo, setCate] = useState()
    const [cateName, setCateName] = useState()
    const [mess, setMess] = useState(undefined)
    var callbackFunction = (childData) => {
        setMess(childData)
    }
    var callbackFunction2 = (childData2) => {
        setShowComp(childData2)
    }
    var callbackFunction3 = (childData3) => {
        setShow(childData3)
    }
    useEffect(() => {
        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/api/v1/products/?sort=desc&page=1&limit=20", requestOptions)
            .then(response => response.json())
            .then(result => setItems(result))
            .catch(error => console.log('error', error));
    }, [])
    useEffect(() => {
        switch (showComp) {
            case 0:
                setCateName('Lego')
                setCate('Lego is a line of plastic construction toys that are manufactured by The Lego Group, a privately held company based in Billund, Denmark. As of 2021, Lego was the largest toy company in the world. The companys flagship product, Lego, consists of variously colored interlocking plastic bricks accompanying an array of gears, figurines called minifigures, and various other parts. Lego pieces can be assembled and connected in many ways to construct objects, including vehicles, buildings, and working robots.')
                break;
            case 1:
                setCateName('Lego Star War')
                setCate('Lego Star Wars is a Lego theme that incorporates the Star Wars saga and franchise. Originally it was only licensed from 1999 to 2008, but The Lego Group extended the license with Lucasfilm, first until 2011, then until 2016, then again until 2022. The brand has spawned an eponymous video game series containing six video games and many short films and miniseries have also been produced.')
                break;
            case 2:
                setCateName('Doraemon')
                setCate('Doraemon is a Japanese manga series written by Fujiko F. Fujio from December 1969 to April 1996 published in the Shogakukan CoroCoro Comic magazine. There are a total of 821 chapters of the story, selected for packaging and put into 45 tankōbon volumes under the Tentōmushi Comics label, also published by Shogakukan; Manga has been translated and published in many languages around the world including Vietnamese by Kim Dong Publishing House. The series tells the unhappy life of Nobita and Doraemon from the future to help his life become better.')
                break;
            case 3:
                setCateName('Kimetsu')
                setCate('The Demon Slayer Sword (Japanese title: 鬼 滅 の 刃, English title: Demon Slayer: Kimetsu no Yaiba) is a Japanese manga written and illustrated by Gotōge Koyoharu. The story tells the teenage Kamado Tanjirō\'s journey to become a demon swordsman after his family is murdered by a demon and his sister Nezuko turns into a demon. The series was serialized in the Shūeisha publisher Shūeisha\'s teen manga Weekly Shōnen Jump from February 2016 to May 2020, after which the chapters were combined into 23 tankōbon volumes. The work was translated into English and published by Viz Media, which was then uploaded by Shūeisha to their online reading platform Manga Plus.')
                break;
            case 4:
                setCateName('Harry Potter')
                setCate('Lego Harry Potter is a Lego theme based on the films of the Harry Potter series. It is licensed from Warner Bros. Lego models of important scenes, vehicles and characters were made for the first six films and all of the published books. The first sets appeared in 2001, to coincide with the release of the first film, Harry Potter and the Philosopher\'s Stone. Subsequent sets were released alongside the new films, until Harry Potter and the Order of the Phoenix. ')
                break;
            case 5:
                setCateName('Marvel')
                setCate('Lego Super Heroes is a theme and product range of the Lego construction toy, introduced in 2011. Marvel Comics universe were first launched in April 2012 to feature alongside the 2012 film The Avengers. Some pack like: Lego Marvel Super Heroes: Maximum Overload (2013), Lego Marvel Super Heroes: Avengers Reassembled (2015), Lego Marvel Super Heroes - Guardians of the Galaxy: The Thanos Threat (2017), Lego Marvel Super Heroes - Black Panther: Trouble in Wakanda (2018)...')
                break;
            default:
            // code block
        }
        if (showComp === 0) {
        }
    }, [showComp])
    return (
        <div className={styleHome.paddingBottom}>
            <div>
                <div>
                    <AutoSlider />
                </div>
                <div style={{ display: "flex", paddingTop: '20px' }}>
                    <div className={styleLogin.inline} style={{ paddingLeft: "10vw", width: "40vw" }}>
                        <b style={{ color: 'blue', fontSize: '30px' }}>Category</b>
                        <h2 style={{ color: 'red', fontSize: '50px' }}>{cateName}</h2>
                        <em>{cateInfo}</em>
                    </div>
                    <div className={styleLogin.inline} style={{ paddingLeft: "10vw" }}>
                        <div style={{ width: "750px" }}>
                            <SlickSlider parentCallback2={callbackFunction2} />
                        </div>
                    </div>
                </div>
            </div>
            <h1 className={`${styleHome.center} ${styleHome.title}`}>Our best product</h1>
            <div className={styleHome.center}>
                <ul className={styleHome.listUnstyle} style={{ color: 'blue', fontSize: '23px' }}>
                    <li className={styleHome.bodyItem}>
                        <Link className={styleHome.bodyItemLink} to="/">Lego City</Link>
                    </li>
                    <li className={styleHome.bodyItem}>
                        <Link className={styleHome.bodyItemLink} to="/">Harry Potter</Link>
                    </li>
                    <li className={styleHome.bodyItem}>
                        <Link className={styleHome.bodyItemLink} to="/">Star War</Link>
                    </li>
                    <li className={styleHome.bodyItem}>
                        <Link className={styleHome.bodyItemLink} to="/">Minecraft</Link>
                    </li>
                    <li className={styleHome.bodyItem}>
                        <Link className={styleHome.bodyItemLink} to="/">Lego Classic</Link>
                    </li>
                    <li className={styleHome.bodyItem}>
                        <Link className={styleHome.bodyItemLink} to="/">Lego Creator</Link>
                    </li>
                </ul>
            </div>
            <div className={` ${styleHome.gridContainer2}`}>
                <div>
                </div>
                <div className={`${styleHome.gridContainerHome}`}>
                    {
                        items ?
                            items.data.filter((item) => {
                                if (props.searchData === undefined) {
                                    return item
                                }
                                else if (item.name.toLowerCase().includes(props.searchData.toLowerCase()) ||
                                    item.productCode.toLowerCase().includes(props.searchData.toLowerCase()) ||
                                    item.price.toString().includes(props.searchData.toLowerCase()) ||
                                    item.branch.toLowerCase().includes(props.searchData.toLowerCase()) ||
                                    item.theme.toLowerCase().includes(props.searchData.toLowerCase()) ||
                                    item.origin.toLowerCase().includes(props.searchData.toLowerCase()) ||
                                    item.description.toLowerCase().includes(props.searchData.toLowerCase()) ||
                                    item.discount.toString().includes(props.searchData.toLowerCase()) ||
                                    item.tax.toString().includes(props.searchData.toLowerCase())
                                ) {
                                    return item
                                }
                            }).map((item, index) => {
                                return (
                                    <div key={index} className={`${styleHome.center}`} >
                                        <Card
                                            title={item.name}
                                            image={item.product_images.map((i) => {
                                                return (i.url)
                                            })}
                                            price={item.price}
                                            info={item}
                                            parentCallback={callbackFunction}
                                            setShow={callbackFunction3}
                                        />
                                    </div>
                                )
                            }) : null
                    }
                </div>
                <div>
                </div>
            </div>
        </div >)
}
export default Home;