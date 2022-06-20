import React from "react";
import styleProduct from '../../CSS/Product.module.css'

export default class Click extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clicks: 0,
        };
    }
    Callback = () => {
        this.props.parentCallback(this.state.clicks)
    }
    IncrementItem = () => {
        if (this.state.clicks < this.props.maxVal)
            this.setState({ clicks: this.state.clicks + 1 });
    };

    DecreaseItem = () => {
        if (this.state.clicks < 1) {
            this.setState({
                clicks: 0
            });
        } else {
            this.setState({
                clicks: this.state.clicks - 1
            });
        }
    };
    render() {
        this.Callback()
        return (
            <div>
                <button
                    className={styleProduct.btnQty}
                    onClick={this.DecreaseItem}
                >
                    -
                </button>
                <input
                    className={styleProduct.btnQty}
                    name="clicks"
                    value={Number(this.state.clicks).toString()}
                    disabled
                    style={{
                        backgroundColor: 'white'
                    }}
                />
                <button
                    className={styleProduct.btnQty}
                    onClick={this.IncrementItem}
                >
                    +
                </button>
            </div>
        );
    }
}
