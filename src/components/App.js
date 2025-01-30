import React, { useEffect, useState } from 'react';
import HomePage from './HomePage';
import { NavBar } from './NavBar';
import PostPage from './PostPage';
import SearchPage from './SearchPage';
import SavePage from './SavePage';
import { SignInScreen } from './SignInPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database'
import { getAuth, onAuthStateChanged } from 'firebase/auth'


function App(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const [savedHikes, setSavedHikes] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUserObj) => {
      if(firebaseUserObj){ //user signed in
        setCurrentUser(firebaseUserObj);
        fetchSavedHikes(firebaseUserObj.uid);
      }
      else { //is null, user signed out
        setCurrentUser(null);
        setSavedHikes([]);
      }
    });
    return () => unsubscribe();
  }, []); //array is list of variables that will cause this to rerun if changed

  const fetchSavedHikes = (userId) => {
    const db = getDatabase();
    const savedHikesRef = ref(db, `SavedHikes/${userId}`);
    onValue(savedHikesRef, (snapshot) => {
      const savedHikesData = snapshot.val();
      if (savedHikesData) {
        const savedHikesArray = Object.values(savedHikesData);
        setSavedHikes(savedHikesArray);
      } else {
        setSavedHikes([]);
      }
    });
  };

  return (
    <div>
      <NavBar applyWordSearchCallback={props.applyWordSearchCallback} currentUser={currentUser}/>
      <Routes>
        <Route path="/" element={<HomePage hikeData={props.hikes} currentUser={currentUser} />} />
        <Route path="/signin" element={<SignInScreen currentUser={currentUser} />} />
        <Route path="/post" element={<PostPage currentUser={currentUser}/>} />
        <Route path="/search" element={<SearchPage hikeData={props.hikes} />} />
        <Route path="/save" element={<SavePage currentUser={currentUser} savedHikes={savedHikes} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;