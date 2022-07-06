import React from "react";
import Tag from "antd/lib/tag";
import "antd/lib/tag/style/css";

const statusMap = {
    'Done': <Tag color="green">Done</Tag>,
    'Shipping': <Tag color="blue">Shipping</Tag>,
    'Preparing': <Tag color="purple">Preparing</Tag>,
    'Paying': <Tag color="orange">Paying</Tag>,
    'Cancel': <Tag color="red">Cancel</Tag>
};

export const StatusTag = ({ status }) => statusMap[status];
