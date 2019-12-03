import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { useInput } from '../../hooks/useInput.jsx';

function Input() {
    const { value:name, bind:bindName, reset:resetName } = useInput('');
    const { value:skill, bind:bindSkill, reset:resetSkill } = useInput('');
    const[shouldRedirect, setShouldRedirect] = useState(false);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const url = '/add-student';
        const data = {
            name: name,
            skill: skill
        };

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then((response) => {
            setShouldRedirect(true);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Please input a skill level between 1 and 12');
        });
        
        resetName();
        resetSkill();
    }

    const routingForSearch = () => {
        if (shouldRedirect === true) {
            return(
                <Redirect to='/success' />
            )
        };
    };

    useEffect(() => {
        setShouldRedirect(false);
    }, [shouldRedirect])

    return (
        <>
            <div className="centered-horizontal">
                <div className="centered-vertical">
                    <h1 className="input-header">[SDCS] Group Generator</h1>
                    <p className="input-page-text">Sponsored by: Michael Roberts Jr. and his students</p>
                    <p className="input-page-text">Sign up and...</p>
					<p className="input-page-text">"Git your Mob On!"</p>
                </div>
            </div>
            <div className="centered-horizontal">
                <div className="centered-vertical">
                <form onSubmit={ handleSubmit } className="input-form">
                    <label className="search-label">
                        Full Name:
                        <input
                            className="search-bar"
                            placeholder="i.e., Scooter Frank" 
                            maxLength="50"
                            type="text"
                            { ...bindName}
                        />
                    </label>
                    <br />
                    <label className="search-label">
                        Input your skill Level: 
                        <input
                            className="search-bar"
                            type="number" 
                            id="skill-level" 
                            min="1" 
                            max="16"
                            placeholder="i.e., 7" 
                            { ...bindSkill}
                        />
                    </label>
                    <input className="submit-button" type="submit" value="Submit" />
                </form>
                </div>
                { routingForSearch() }
            </div>
            
        </>
    )
};

export default Input;