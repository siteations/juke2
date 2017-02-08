import React from 'react';
import { Router, Route, hashHistory, IndexRedirect, Link } from 'react-router';

const Albums = (props) => {
  console.log(props);

  const albums = props.albums;
  const selectAlbum = props.selectAlbum;

  return (
    <div>
      <h3>Albums</h3>
      <div className="row">
      {
        albums.map(album => (
          <div className="col-xs-4" key={ album.id }>
            <Link className="thumbnail" to={`/albums/${album.id}`}>
            {/*<a className="thumbnail" href="#" onClick={() => selectAlbum(album.id)}>*/}
              <img src={ album.imageUrl } />
              <div className="caption">
                <h5>
                  <span>{ album.name }</span>
                </h5>
                <small>{ album.songs.length } songs</small>
              </div>
            </Link>
          </div>
        ))
      }
      </div>
    </div>
  );
}

export default Albums;
