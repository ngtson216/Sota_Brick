import React from "react";
import Tag from "antd/lib/tag";
import "antd/lib/tag/style/css";

const typeMap = {
    'PayPal': <Tag color="gold">PayPal</Tag>,
    'AfterDeli': <Tag color="magenta">After Delivery</Tag>,
    'BankTranfer': <Tag color="cyan">Bank Tranfer</Tag>,
};

export const TypeTag = ({ type }) => typeMap[type];
