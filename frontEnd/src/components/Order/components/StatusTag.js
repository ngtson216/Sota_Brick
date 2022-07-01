import React from "react";
import Tag from "antd/lib/tag";
import "antd/lib/tag/style/css";

const statusMap = {
    'Done': <Tag color="green">Done</Tag>,
    'Shipping': <Tag color="orange">Shipping</Tag>,
    'Paying': <Tag color="blue">Paying</Tag>
};

export const StatusTag = ({ status }) => statusMap[status];
