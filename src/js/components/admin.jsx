import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { useInput } from '../../hooks/useInput.jsx';

function Admin(props) {
    const [numStudents, setNumStudents] = useState(0);
    const [studentArray, setStudentArray] = useState([]);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [toggleState, setToggleState] = useState(false);
    const [authorized, setAuthorized] = useState(false);
    const[secretWord, setSecretWord] = useState("");
    const { value:numOfGroups, bind:bindNumOfGroups, reset:resetNumOfGroups } = useInput('');
    const { value:password, bind:bindPassword, reset:resetPassword } = useInput('');
    
    useEffect(() => {
        fetch("/students")
            .then((response) => {
                return response.json();
            })
            .then((studentData) => {
                setNumStudents(studentData.length);
                setStudentArray(studentData);
            })
            .catch(err => console.log(err));

        fetch('/password')
            .then(res => res.json())
            .then((result) => {
                setSecretWord(result.password)
            })
            .catch(err => console.log(err));
    }, []);

    const checkToggle = () => {
        setToggleState(!toggleState);
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const number = numOfGroups;
        const isRandom = toggleState;

        createGroups(number, isRandom);

        resetNumOfGroups();
    };

    const createGroups = (number, isRandom) => {
        event.preventDefault();
        
        const url = '/admin';
        const random = isRandom;
        const data = {
        random,
        size: number
        };
        
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
            }).then(res => res.json())
            .then(response => setShouldRedirect(true))
            .catch(error => {
                console.error('Error:', error);
                alert('Please input a valid number of groups');
        });
    }

    const routingForAdmin = () => {
        if (shouldRedirect === true) {
            return(
                <Redirect to='/groups' />
            )
        };
    };

    const deleteStudents = () => {
        const url = '/delete-students';
        
            fetch(url, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                }
                })
                .then(res => res.json())
                .then((response) => {
                    console.log(response);
                })
                .catch(error => {
                console.error('Error:', error);
            });

            fetch("/students")
                .then((response) => {
                    return response.json();
                })
                .then((studentData) => {
                    setNumStudents(studentData.length);
                    setStudentArray(studentData);
                })
                .catch(err => console.log(err));
        }

        const handleLogin = (evt) => {
            evt.preventDefault();
            if (password === secretWord) {
                setAuthorized(true);
            }
            resetPassword();
        };

if (authorized) {
    return (
        <>
            <div className="centered-horizontal">
                <div className="centered-vertical">
                    <h1 className="success-header">Admin</h1>
                </div>
            </div>
            <div className="centered-horizontal">
                <div className="centered-vertical">
                    <h1 className="success-header">There are { numStudents } students so far...</h1>
                    <ul className="students-list">
                        {
                            studentArray.map((student, key) => {
                                return (
                                    <li className="student" key={ key }>{ student.name }</li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className="centered-horizontal">
                <div className="centered-vertical">
                <form onSubmit={ handleSubmit } className="input-form">
                    <label className="search-label">
                        Total Number of Groups:
                        <input
                            className="search-bar"
                            placeholder="i.e., 4" 
                            maxLength="50"
                            type="number"
                            { ...bindNumOfGroups}
                        />
                    </label>
                    <br />
                    <label className="search-label">
                        Check for Randomization: 
                        <label className="toggle-switch">
                                <input type="checkbox" onChange={() => checkToggle()} checked={ toggleState } value={toggleState}/>
                                <span className="slider round"></span>
                            </label>
                    </label>
                    <input className="submit-button" type="submit" value="Submit" />
                </form>
                </div>
            </div>
            <div className="centered-horizontal">
                <div className="centered-vertical">
                    <button className="delete-students" onClick={ () => deleteStudents() }>Delete Students</button>
                </div>
            </div>
            { routingForAdmin() }
        </>
    )
} else {
    return (
        <>
        <form onSubmit={ handleLogin } className="input-form">
            <label className="search-label">
                Say the magic word:
                <input
                    className="search-bar"
                    placeholder="i.e., thundercats!" 
                    maxLength="50"
                    type="string"
                    { ...bindPassword}
                />
            </label>
            <input className="submit-button" type="submit" value="Submit" />
        </form>     
        </>
    )
}
};

export default Admin;
