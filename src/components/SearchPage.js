import React, { useState } from 'react';
import { Header } from './Header';
import { Filter } from './Filter';
import HikeList from './HikeList';
import { Footer } from './Footer';
import { WordSearch } from './WordSearch';

function SearchPage(props) {

    const [selectedDifficulty, setSelectedDifficulty] = useState('');
    const [selectedLength, setSelectedLength] = useState('');
    const [inputText, setInputText] = useState('');

    const applyFilter = (difficulty, length) => {
        setSelectedDifficulty(difficulty);
        setSelectedLength(length);
    }

    const applyWordSearch = (word) => {
        setInputText(word);
    }

    const displayedData = props.hikeData.filter((hike) => {
        const inputTextFound = inputText == '' || hike.name.toLowerCase().includes(inputText.toLowerCase());
        const difficultyFound = selectedDifficulty === '' || hike.difficulty === selectedDifficulty;
        const lengthFound = selectedLength === '' || (selectedLength === '> 9' ? hike.length > 9 : hike.length <= parseInt(selectedLength.slice(-1)));

        return inputTextFound && difficultyFound && lengthFound;
    });

    return (
        <>
        <Header />
        <h2>Find Your Next Journey</h2>
        <p>Search for hike names, filter to get the perfect experience.</p>
        <WordSearch applyWordSearchCallback={applyWordSearch} />
        <Filter applyFilterCallback={applyFilter}/>
        <HikeList hikes={displayedData} />
        <Footer />
        </>
    );
}

export default SearchPage;
