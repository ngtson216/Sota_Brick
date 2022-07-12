import React from "react";
import Menu from "antd/lib/menu";
import "antd/lib/menu/style/css";
import Dropdown from "antd/lib/dropdown";
import "antd/lib/dropdown/style/css";
import "antd/lib/icon/style/css";
import { MdOutlineArrowDropDownCircle } from "react-icons/md"

export const TypeFilter = ({ filterBy, ...props }) => {
    const onClick = ({ key }) => {
        filterBy(key);
    };

    const menu = (
        <Menu onClick={onClick}>
            <Menu.Item key="1">Type: After Delivery</Menu.Item>
            <Menu.Item key="2">Type: Bank Tranfer</Menu.Item>
            <Menu.Item key="3">Type: PayPal</Menu.Item>
            <Menu.Divider />
            <Menu.Item key="4">Clear Filter</Menu.Item>
        </Menu>
    );

    return (
        <div {...props}>
            <Dropdown className="filter" overlay={menu}>
                <a className="ant-dropdown-link" style={{
                    color: 'blue',
                    fontSize: '20px'
                }}>
                    Filter Type <MdOutlineArrowDropDownCircle style={{
                        fontSize: '20px',
                        paddingBottom: '2px',
                        marginRight: '15px'
                    }} />
                </a>
            </Dropdown>
        </div>
    );
};
