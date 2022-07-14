import React from 'react'
import StepProgressBar from 'react-step-progress';
import 'react-step-progress/dist/index.css';
import './style.css'

function step2Validator() {

}

function step3Validator() {

}

function onFormSubmit() {

}

export default function Status(props) {
    let step
    if (props.orderType !== 'AfterDeli') {
        switch (props.step) {
            case 'Cancel':
                step = 0;
                break;
            case 'Done':
                step = 3;
                break;
            case 'Shipping':
                step = 2;
                break;
            case 'Preparing':
                step = 1;
                break;
            case 'Paying':
                step = 0;
                break;
            default:
            // code block
        }
    }
    else {
        switch (props.step) {
            case 'Cancel':
                step = 0;
                break;
            case 'Done':
                step = 2;
                break;
            case 'Shipping':
                step = 1;
                break;
            case 'Preparing':
                step = 0;
                break;
            default:
            // code block
        }
    }

    return (
        <div>
            {props.step !== 'Cancel' ? (
                (props.orderType !== 'AfterDeli' ? (<StepProgressBar
                    startingStep={step}
                    onSubmit={onFormSubmit}
                    steps={[
                        {
                            label: 'Paying',
                            name: 'paying',
                        },
                        {
                            label: 'Preparing',
                            name: 'preparing',
                        },
                        {
                            label: 'Shipping',
                            name: 'shipping',
                        },
                        {
                            label: 'Done ',
                            name: 'done ',
                        },
                    ]}
                    labelClass={'labelClass'}
                />) : (<StepProgressBar
                    startingStep={step}
                    onSubmit={onFormSubmit}
                    steps={[
                        {
                            label: 'Preparing',
                            name: 'preparing',
                        },
                        {
                            label: 'Shipping',
                            name: 'shipping',
                        },
                        {
                            label: 'Done ',
                            name: 'done ',
                        },
                    ]}
                    labelClass={'labelClass'}
                />))) : (
                <StepProgressBar
                    startingStep={step}
                    onSubmit={onFormSubmit}
                    steps={[
                        {
                            label: 'Cancel',
                            name: 'cancel',
                        },
                    ]}
                    labelClass={'labelClass'}
                />
            )}
        </div>
    )
}
