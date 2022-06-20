import React from 'react'
import styleModal from '../../CSS/ModalNotification.module.css'
function Delete(del) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", sessionStorage.getItem('token'));

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`http://localhost:8080/api/v1/users/${del}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
export default function DeleteUser(props) {
    var sendData = (p) => {
        props.callback(p)
    }
    return (
        <div style={{
            textAlign: 'Center',
        }}>
            <p style={{
                fontSize: '30px',
                fontWeight: '600',
                paddingBottom: '5%'
            }}>Confirm</p>

            <p style={{
                fontSize: '24px',
            }}>
                Are you sure to delete this user?
            </p>

            <button
                className={styleModal.btn}
                onClick={() => {
                    Delete(props.dataFromParent);
                }}
            >
                Accept
            </button>
            <button
                className={styleModal.btn}
                onClick={() => {
                    sendData(false)
                }}
            >
                Cancel
            </button>
        </div>
    )
}
