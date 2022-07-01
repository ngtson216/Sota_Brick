import React from 'react'
import StepProgressBar from 'react-step-progress';
import 'react-step-progress/dist/index.css';

function step2Validator() {

}

function step3Validator() {

}

function onFormSubmit() {

}

export default function Status() {
    return (
        <div>
            <StepProgressBar
                startingStep={0}
                onSubmit={onFormSubmit}
                steps={[
                    {
                        label: 'Paying',
                        subtitle: '10%',
                        name: 'paying',
                    },
                    {
                        label: 'Shipping',
                        subtitle: '50%',
                        name: 'shipping',
                        validator: step2Validator
                    },
                    {
                        label: 'Done ',
                        subtitle: '100%',
                        name: 'done ',
                        validator: step3Validator
                    }
                ]}
            />;
        </div>
    )
}
