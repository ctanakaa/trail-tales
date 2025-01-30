import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push as firebasePush, onValue } from 'firebase/database'
import { Header } from './Header';
import { Footer } from './Footer';
import HikeList from './HikeList';

export function SavePage(props) {
  const { currentUser } = props;
  const [savedHikes, setSavedHikes] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const userId = currentUser.uid;
      const db = getDatabase();
      const savedHikesRef = ref(db, `SavedHikes/${userId}`);
      onValue(savedHikesRef, (snapshot) => {
        const savedHikesData = snapshot.val();
        if (savedHikesData) {
          const hikesArray = Object.values(savedHikesData);
          setSavedHikes(hikesArray);
        } else {
          setSavedHikes([]);
        }
      });
    }
  }, [currentUser]);

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

  const pageStyles = {
    title: { marginTop: '20px', marginLeft: '25px' }
  };

  return (
    <>
      <Header />
      <h2>Best Trails in Seattle</h2>
      <p>Here are your saved trails:</p>
      <HikeList hikes={savedHikes} savedHikes={savedHikes} onSaveHike={saveHike} currentUser={currentUser}/>
      <Footer />
    </>
  );
}

export default SavePage;