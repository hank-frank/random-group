import React from 'react';
import { Link } from 'react-router-dom';

function Success() {

    return (
        <>
            <div className="centered-horizontal">
                <div className="centered-vertical">
                    <h1 className="success-header">Success!!</h1>
                </div>
            </div>
            <div className="centered-horizontal">
                <div className="centered-vertical">
                    <h1 className="success-text">You've been added to the randomizer!</h1>
                </div>
            </div>
            <div className="centered-horizontal">
                <div className="centered-vertical">
                    <Link to='/groups'>
                        <p className="success-link">Click Here to see the last generated groups.</p>
                    </Link>
                    <p className="success-text">You will show up here after the Admin next generates a group.</p>
                </div>
            </div>
            
        </>
    )
};

export default Success;
