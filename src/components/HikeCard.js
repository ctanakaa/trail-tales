import React from 'react';
import { useState, useEffect } from 'react';

function HikeCard(props) {
  const { hikeData, onSaveHike, savedHikes } = props;
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(false);

  // console.log('User:', props.user);

  useEffect(() => {
    if (savedHikes && savedHikes.find(savedHike => savedHike.name === hikeData.name)) {
      setIsSaveButtonDisabled(true);
    } else {
      setIsSaveButtonDisabled(false);
    }
  }, [savedHikes, hikeData.name]);

  const handleSave = (event) => {
    event.preventDefault();
    onSaveHike(hikeData);
    setIsSaveButtonDisabled(true);
  };

  return (
    <div className="col-md-6 col-xl-3 d-flex">
      <div className="card w-100 mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-auto col-xl-12">
              <img id="card-img" src={hikeData.img} alt={hikeData.name}></img>
            </div>
            <div className="col-sm">
              <h4 className="card-title">{hikeData.name}</h4>
              <p className="card-text">{hikeData.description}</p>
              <button id="save-btn" className="btn btn-dark" onClick={handleSave} disabled={isSaveButtonDisabled}>{isSaveButtonDisabled ? 'Saved' : 'Save'}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HikeCard;