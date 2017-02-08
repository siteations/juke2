import React from 'react';
import { Router, Route, hashHistory, IndexRedirect, Link } from 'react-router';

const Artists = (props) => {
  console.log("props in artists is: ", props);
  return (
    <div>
  <h3>Artists</h3>
    <div className="list-group">
    {
      props.artists.map(artist => {
        return (
          <div className="list-group-item" key={artist.id}>
            <Link to={`/artists/${artist.id}`}>{ artist.name }</Link>
          </div>
        )
      })
    }
  </div>
</div>
  );
}

export default Artists;
