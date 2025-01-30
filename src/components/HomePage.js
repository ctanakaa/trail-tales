import React from 'react';
import { useState } from 'react';
import { Header } from './Header';
import HikeList from './HikeList';
import { Footer } from './Footer';
import { getDatabase, ref, push as firebasePush, onValue } from 'firebase/database'

export function HomePage(props) {

    const { hikeData, currentUser } = props;

    const [savedHikes, setSavedHikes] = useState([]);

    const saveHike = (hike) => {
        if (currentUser) {
          const userId = currentUser.uid;
          const db = getDatabase();
          const savedHikesRef = ref(db, `SavedHikes/${userId}`);
          firebasePush(savedHikesRef, hike);
        } else {
          console.log('User has not signed in.');
        }
    };

    return (
        <>
        <Header />
        <HikeList hikes={hikeData} onSaveHike={saveHike} savedHikes={savedHikes} currentUser={currentUser} />
        <Footer />
        </>
    );
}

export default HomePage;


