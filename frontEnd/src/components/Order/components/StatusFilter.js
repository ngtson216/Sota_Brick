import React from "react";
import Menu from "antd/lib/menu";
import "antd/lib/menu/style/css";
import Dropdown from "antd/lib/dropdown";
import "antd/lib/dropdown/style/css";
import "antd/lib/icon/style/css";
import { MdOutlineArrowDropDownCircle } from "react-icons/md"

export const StatusFilter = ({ filterBy, ...props }) => {
    const onClick = ({ key }) => {
        filterBy(key);
    };

    const menu = (
        <Menu onClick={onClick}>
            <Menu.Item key="1">Status: Paying</Menu.Item>
            <Menu.Item key="2">Status: Preparing</Menu.Item>
            <Menu.Item key="3">Status: Shipping</Menu.Item>
            <Menu.Item key="4">Status: Done</Menu.Item>
            <Menu.Item key="5">Status: Cancel</Menu.Item>
            <Menu.Divider />
            <Menu.Item key="6">Clear Filter</Menu.Item>
        </Menu>
    );

    return (
        <div {...props}>
            <Dropdown className="filter" overlay={menu}>
                <a className="ant-dropdown-link" style={{
                    color: 'green',
                    fontSize: '20px'
                }}>
                    Filter Status <MdOutlineArrowDropDownCircle style={{
                        fontSize: '20px',
                        paddingBottom: '2px'
                    }} />
                </a>
            </Dropdown>
        </div>
    );
};
