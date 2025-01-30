import React, { useState } from 'react';

export function Filter(props) {
  
    const difficultyOptions = ['Easy', 'Moderate', 'Hard'];
    const lengthOptions = ['<= 1', '<= 2', '<= 3', '<= 4', '<= 5', '<= 6', '<= 7', '<= 8', '<= 9', '> 9'];

    const [selectedDifficulty, setSelectedDifficulty] = useState('');
    const [selectedLength, setSelectedLength] = useState('');


    const handleDifficulty = (event) => {
        setSelectedDifficulty(event.target.value);
    }
  
    const handleLength = (event) => {
        setSelectedLength(event.target.value);
    }
  
    const handleClick = (event) => {
        props.applyFilterCallback(selectedDifficulty, selectedLength);
    }


    const optionDiff = difficultyOptions.map((diff) => {
        return <option key={diff} value={diff}>{diff}</option>
    })


    const optionLength = lengthOptions.map((length) => {
        return <option key={length} value={length}>{length}</option>
    })


    return (
        <>
        <select id="difficultySelect" className="form-select" value={selectedDifficulty} onChange={handleDifficulty}>
            <option value="">Show all</option>
            {optionDiff}
        </select>
        <select id="lengthSelect" className="form-select" value={selectedLength} onChange={handleLength}>
            <option value="">Show all</option>
            {optionLength}
        </select>
        <button id="submitButton" type="submit" className="btn btn-warning" onClick={handleClick}>Apply Filter</button>
        </>
    );
}
