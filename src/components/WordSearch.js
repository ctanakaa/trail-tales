import React, { useState } from 'react';

export function WordSearch(props) {

    const [inputText, setInputText] = useState('');

    const handleInput = (event) => {
        const inputLowerCase = event.target.value.toLowerCase();
        setInputText(inputLowerCase);
    }
    
    const handleClick = (event) => {
        event.preventDefault();
        props.applyWordSearchCallback(inputText);
    }
    
    return (
        <form className="d-flex" action="search.html">
            <input className="form-control me-2" type="search" placeholder="Search" onChange={handleInput} aria-label="Search" />
            <button className="btn btn-warning" type="submit" onClick={handleClick}>
            Search
            </button>
        </form>
    )
    
}