import React, { useState } from 'react'
import styleModal from '../../CSS/ModalNotification.module.css'
import { Select, Form, notification } from 'antd';
import { AlertOutlined } from '@ant-design/icons';
const { Option } = Select;
function Edit(role, id) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", sessionStorage.getItem('token'));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "role": role
    });

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(`http://localhost:8080/api/v1/users/${id}`, requestOptions)
        .then(response => response.json())
        .then(result => { alert("Edit User Successfull"); window.location.reload() })
        .catch(error => console.log('error', error));
}
export default function EditUser(props) {
    var sendData = (p) => {
        props.callback(p)
    }
    const [role, setRole] = useState(undefined)
    return (
        <div style={{
            textAlign: 'Center',
        }}>
            <p style={{
                fontSize: '30px',
                fontWeight: '600',
            }}>Edit Role</p>
            <Form
                layout="vertical"
                style={{
                    padding: '0 10% 0 10%'
                }}
            >
                <Form.Item name="role" label="Role: ">
                    <Select
                        placeholder="Please select a role option"
                        allowClear
                        onChange={(e) => {
                            setRole(e)
                        }}
                        defaultValue={props.dataFromParent.role}
                    >
                        <Option value="admin">Admin</Option>
                        <Option value="seller">Seller</Option>
                        <Option value="customer">Customer</Option>
                    </Select>
                </Form.Item>
            </Form>
            <button
                className={styleModal.btn}
                onClick={() => {
                    if (role === undefined || role === props.dataFromParent.role)
                        alert('Can not update the same role')
                    else
                        Edit(role, props.dataFromParent._id);
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
