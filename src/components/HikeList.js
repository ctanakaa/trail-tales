import React from 'react';
import HikeCard from './HikeCard';

function HikeList(props) {

  const { hikes, onSaveHike, savedHikes } = props;

  return (
    <div className="container">
      <div className="row">
        {hikes.map((hikeArray) => (
          <HikeCard key={hikeArray.id} hikeData={hikeArray} onSaveHike={onSaveHike} savedHikes={savedHikes}/>
        ))}
      </div>
    </div>
  );
}

export default HikeList;

