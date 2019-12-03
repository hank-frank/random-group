import React, { useState, useEffect } from 'react';

function Success(props) {
    let [groups, setGroups] = useState([]);
    let [timeGenerated, setTimeGenerated] = useState("");
    let [links, setLinks] = useState("");

    useEffect(() => {
        fetch('/group')
            .then(res => res.json())
            .then((result) => {
                setGroups(result.groups);
                setLinks(result.links);
                setTimeGenerated(result.lastGenerated.toString());
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <>
            <div className="centered-horizontal">
                <div className="centered-vertical">
                    <h1 className="success-header">Student Groups</h1>
                </div>
            </div>
            <div className="centered-horizontal">
                <div className="centered-vertical">
                    { 
                        groups.map((group, key) => {
                            key++
                            return (
                                <table key={ key }>
                                    <thead>
                                        <tr>
                                            <td>{key <= 4 ? links[key-1] : ""}   </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            group.map((student, key2) => {
                                                key2++
                                                return( 
                                                    <tr key={ key2 }>
                                                        <td>{ student.name }</td>
                                                    </tr>
                                                )    
                                            })
                                        }
                                    </tbody>
                                </table>
                            )
                        })
                    }
                </div>
            </div>
            <div className="centered-horizontal">
                <div className="centered-vertical">
                    <h1 className="time">{ timeGenerated }</h1>
                </div>
            </div>
        </>
    )
};

export default Success;
