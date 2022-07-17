import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import bgProfile from '../../img/bgProfile.jpg'
import { Bar } from '@ant-design/plots';
import { DatePicker, Space, Button, Form, Typography, Select } from 'antd';
const { Title } = Typography;
const { RangePicker } = DatePicker;
const ReportOnRevenue = () => {
    const [dateS, setDateS] = useState(undefined);
    const [dateE, setDateE] = useState(undefined);
    const [dataSBS, setDataSBS] = useState(null);
    const [items, setItems] = useState(null);
    const [prod, setProd] = useState(null);
    console.log('data: ', dataSBS)
    useEffect(() => {
        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/api/v1/products/", requestOptions)
            .then(response => response.json())
            .then(result => setItems(result.data))
            .catch(error => console.log('error', error));
    }, [])

    const checkByRevenue = (dateS, dateE, product) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", sessionStorage.getItem('token'));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "time1": dateS,
            "time2": dateE,
            "productId": product,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/api/v1/orders/checkQuantity", requestOptions)
            .then(response => response.json())
            .then(result => setDataSBS(result.data))
            .catch(error => console.log('error', error));
    }
    const data = [];
    dataSBS?.forEach((item) => {
        items.map((prod) => {
            if (item.productId === prod._id) {
                data.push({
                    productId: prod.name,
                    sum: item.sum
                })
            }
        })
    });
    const config = {
        appendPadding: 40,
        data,
        xField: 'sum',
        yField: 'productId',
        label: false,
        yAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        xAxis: {
            title: {
                text: 'Number of product sold',
                position: 'center',
                style: {
                    fill: 'green',
                    lineWidth: 1,
                    lineDash: [4, 5],
                }
            },
        },
        color: '#FBB6B6',
        minColumnWidth: 20,
        maxColumnWidth: 60,
    }
    const { Option } = Select;

    const children = [];
    items?.map((item) => {
        children.push(<Option key={item._id}>{item.name}</Option>);
    })
    return (
        <div style={{ paddingBottom: "10%", paddingLeft: "5%", backgroundImage: `url(${bgProfile})`, backgroundRepeat: "no-repeat", backgroundSize: "100%", width: "100%" }}>
            <h1 style={{ padding: "5% 0% 10% 0%", color: "white", fontWeight: "600", position: "relative" }}>Report on the number of product sold</h1>
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
                                style={{ width: '80%' }}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Select
                                mode="multiple"
                                size={'middle'}
                                placeholder="Please select"
                                onChange={(value) => {
                                    setProd(value);
                                }}
                                style={{ width: '80%' }}
                            >
                                {children}
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                onClick={() => {
                                    if (dateS && dateE)
                                        checkByRevenue(dateS, dateE, prod)
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
                    <Bar {...config} />
                    <Title style={{
                        paddingTop: '15px'
                    }} level={3}>Report on the number of product sold</Title>
                </div>
            </div>
        </div>
    );
};

export default ReportOnRevenue