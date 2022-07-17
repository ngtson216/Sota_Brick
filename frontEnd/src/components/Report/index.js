import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import bgProfile from '../../img/bgProfile.jpg'
import { Pie } from '@ant-design/plots';
import { DatePicker, Space, Button, Form, Typography } from 'antd';
const { Title } = Typography;
const { RangePicker } = DatePicker;
const DemoPie = () => {
    const [dateS, setDateS] = useState(undefined);
    const [dateE, setDateE] = useState(undefined);
    const [dataSBS, setDataSBS] = useState(null);
    const checkBySex = (dateS, dateE) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", sessionStorage.getItem('token'));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "time1": dateS,
            "time2": dateE
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/api/v1/orders/gender", requestOptions)
            .then(response => response.json())
            .then(result => setDataSBS(result.data))
            .catch(error => console.log('error', error));
    }
    const data = [
        {
            type: 'Boy',
            value: dataSBS?.men ? dataSBS?.men : 0,
        },
        {
            type: 'Girl',
            value: dataSBS?.women ? dataSBS?.women : 0,
        },
    ];
    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        label: {
            type: 'outer',
            content: '{name} {percentage}',
        },
        interactions: [
            {
                type: 'pie-legend-active',
            },
            {
                type: 'element-active',
            },
        ],
    };
    return (
        <div style={{ paddingBottom: "10%", paddingLeft: "5%", backgroundImage: `url(${bgProfile})`, backgroundRepeat: "no-repeat", backgroundSize: "100%", width: "100%" }}>
            <h1 style={{ padding: "5% 0% 10% 0%", color: "white", fontWeight: "600", position: "relative" }}>Report on the gender of products sold</h1>
            <div style={{
                display: 'grid',
                gridTemplateColumns: '30% 70%'
            }}>
                <Space direction="vertical" size={12}>
                    <Form
                        layout="vertical"
                    >
                        <Form.Item
                            label="Date Picker :"
                            autoComplete="off"
                        >
                            <RangePicker
                                onChange={(e) => {
                                    if (e === null) {
                                        setDateS(null);
                                        setDateE(null);
                                    }
                                    e?.forEach((item, index) => {
                                        if (index === 0)
                                            setDateS((item._d).toJSON());
                                        else
                                            setDateE((item._d).toJSON());
                                    })
                                }}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                onClick={() => {
                                    if (dateS && dateE)
                                        checkBySex(dateS, dateE)
                                    else
                                        alert("Please enter date range")
                                }}
                            >
                                Check
                            </Button>
                        </Form.Item>
                    </Form>
                </Space>
                <div style={{
                    borderLeftStyle: 'solid',
                    textAlign: 'center'
                }}>
                    <Pie {...config} />
                    <Title level={4}>Report on the gender of products sold</Title>
                </div>
            </div>
        </div>
    );
};

export default DemoPie