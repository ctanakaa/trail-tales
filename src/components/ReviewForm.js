import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getDatabase, ref, push as firebasePush } from 'firebase/database'
import { Link } from 'react-router-dom';

export function ReviewForm(props) {
  const { addPost, hikes } = props;
  const [hikeName, setHikeName] = useState('');
  const [review, setReview] = useState('');
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() =>{
    const auth = getAuth();
    onAuthStateChanged(auth, (firebaseUserObj) =>{
      firebaseUserObj.userId = firebaseUserObj.uid;
      firebaseUserObj.userName = firebaseUserObj.displayName;
      firebaseUserObj.userImg = firebaseUserObj.photoURL;
      setCurrentUser(firebaseUserObj);
    })
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const db = getDatabase();
    const reviewsRef = ref(db, 'Reviews');

    const newPost = {
      userId: currentUser.uid,
      userName: currentUser.displayName,
      hikeName,
      review
    };
    
    firebasePush(reviewsRef, newPost);
    addPost(newPost);
    setHikeName('');
    setReview('');
  };

  return (
    <form className='my-2' onSubmit={handleSubmit}>
      {!currentUser && (
        <div>
          <Link className="btn btn-outline-light" to="/signin">
            Login
          </Link>
        </div>
      )}
      <div className='input-group'>
        <select
          className='form-control'
          value={hikeName}
          onChange={(ev) => setHikeName(ev.target.value)}
          required
        >
          <option value=''>Select Hike</option>
          {hikes.map((hike) => (
            <option key={hike.name} value={hike.name}>
              {hike.name}
            </option>
          ))}
        </select>
      </div>
      <div className='input-group'>
        <textarea
          className='form-control'
          rows='2'
          placeholder='Leave a review'
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        ></textarea>
        <button type="submit">
        {`Post as ${currentUser.userName}`}
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
