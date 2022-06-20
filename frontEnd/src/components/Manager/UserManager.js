import { React, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { AiFillDelete } from 'react-icons/ai';
import tableStyle from '../../CSS/TableStyle.module.scss'
import bgProfile from '../../img/bgProfile.jpg'
import DeleteUser from '../Delete/deleteUser';
import styleModal from '../../CSS/ModalNotification.module.css'
import Popup from 'reactjs-popup';

function loop(items) {
    const allUser = [];
    for (var i in items) {
        for (var j = 0; j < items[i].length; j++) {
            allUser.push(items[i][j])
        }
    }
    return (allUser)
}
export default function UserManager() {
    const overlayStyle = { background: 'rgba(0,0,0,0.5)' };
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [getIdDel, setGetIdDel] = useState(null);
    const decoded = sessionStorage.getItem('token');
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const setClose = (childData) => {
        setOpen(childData)
    }
    const url = "http://localhost:8080/api/v1/users"
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", decoded);

        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders,
        };
        fetch(url, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
    return (
        <div style={{ paddingBottom: "10%", paddingLeft: "5%", backgroundImage: `url(${bgProfile})`, backgroundRepeat: "no-repeat", backgroundSize: "100%", width: "100%" }}>
            <h1 style={{ padding: "5% 0% 10% 10%", color: "white", fontWeight: "600", position: "relative" }}>User Accounts Manager</h1>
            <table className={tableStyle.table}>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Chỉnh sửa</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        loop(items).map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>
                                    {item.username}
                                </td>
                                <td>
                                    {item.role}
                                </td>
                                <td>
                                    <Link to="/">
                                        <FiEdit className={tableStyle.icon} />
                                    </Link>
                                    <AiFillDelete className={tableStyle.icon}
                                        onClick={() => {
                                            setGetIdDel(items.data[index]._id)
                                            setOpen(o => !o)
                                        }} />
                                    <Popup {...{ overlayStyle }} open={open} closeOnDocumentClick onClose={closeModal} modal nested>
                                        {(close) => {
                                            return (
                                                <div className={styleModal.modal}>
                                                    <button className={styleModal.close} onClick={close}>
                                                        &times;
                                                    </button>
                                                    <div className={styleModal.actions}>
                                                        <DeleteUser dataFromParent={getIdDel} callback={setClose} />
                                                    </div>
                                                </div>
                                            )
                                        }}
                                    </Popup>

                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div >
    )
}
