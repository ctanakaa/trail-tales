import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ReviewForm } from './ReviewForm';
import { PostList } from './PostList';
import { getDatabase, ref, onValue } from 'firebase/database'

const usersData = [
  {"userId": null, "userName": "Guest", "userImg": "/img/guest.png"},
  {"userId": "1", "userName": "John", "userImg": "/img/avatar.png"},
  {"userId": "2", "userName": "Jane", "userImg": "/img/avatar2.png"}
];

const hikesData = [
  {"name": "Discovery Park", "img": "img/forest.jpg", "description": "Difficulty: Easy | Length: 4.5mi"},
  {"name": "Loop Trail", "img": "img/mountain.jpg", "description": "Difficulty: Easy | Length: 2.8mi"},
  {"name": "Cable Line Trail to West Tiger", "img": "img/river.jpg", "description": "Difficulty: Hard | Length: 3.0mi"},
  {"name": "Greenlake Trail", "img": "img/forest.jpg", "description": "Difficulty: Easy | Length: 2.9mi"},
  {"name": "WA Park Arboretum Loop", "img": "img/mountain.jpg", "description": "Difficulty: Easy | Length: 2.3mi"},
  {"name": "Foster Island Trail", "img": "img/river.jpg", "description": "Difficulty: Easy | Length: 3.3mi"},
  {"name": "Alki Trail", "img": "img/forest.jpg", "description": "Difficulty: Easy | Length: 7.6mi"},
  {"name": "Piper's Creek and South Ridge Trail", "img": "img/mountain.jpg", "description": "Difficulty: Moderate | Length: 1.9mi"}
];

function addPost(post, posts, setPosts) {
  let user;
  let hike;

  for (let i = 0; i < usersData.length; i++) {
    if (usersData[i].userId === post.userId) {
      user = usersData[i];
      break;
    }
  }

  for (let j = 0; j < hikesData.length; j++) {
    if (hikesData[j].name === post.hikeName) {
      hike = hikesData[j];
      break;
    }
  }

  let newPost = {
    userId: post.userId,
    hikeName: post.hikeName,
    review: post.review,
    user: user,
    hike: hike,
    date: new Date().toLocaleDateString()
  };
  setPosts(posts.concat(newPost));
}

export function PostPage(props) {
  const [reviewStateArray, setReviewStateArray] = useState([]);
  useEffect(() =>{
    const db = getDatabase();
    const reviewRef = ref(db, 'Reviews');
    onValue(reviewRef, (snapshot)=>{
      const reviewsData = snapshot.val();
      const keysArray = Object.keys(reviewsData);
      const allReviewsArray = keysArray.map((key) =>{
        const transformed = reviewsData[key];
        transformed.firebaseKey = key;
        return transformed;
      });
      setReviewStateArray(allReviewsArray);
    })
  }, []);

  return (
      <>
      <Header />
      <h2>Make a Post, Share Your Adventures!</h2>
      <p>Share your experience! How was the hike? Did the difficulty and accessibility ratings match the descriptions? Any pointers or things to look out for?</p>
      <ReviewForm addPost={(post) => addPost(post, reviewStateArray, setReviewStateArray)} hikes={hikesData}/>
      <PostList posts={reviewStateArray}/>
      <Footer />
      </>
  );
}

export default PostPage;