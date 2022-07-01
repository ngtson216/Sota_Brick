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
    switch (props.step) {
        case 'Done':
            step = 2;
            break;
        case 'Shipping':
            step = 1;
            break;
        case 'Paying':
            step = 0;
            break;
        default:
        // code block
    }
    return (
        <div>
            <StepProgressBar
                startingStep={step}
                onSubmit={onFormSubmit}
                steps={[
                    {
                        label: 'Paying',
                        name: 'paying',
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
            />;
        </div>
    )
}
