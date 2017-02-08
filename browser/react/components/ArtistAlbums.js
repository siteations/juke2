import React from 'react';
import { Router, Route, hashHistory, IndexRedirect, Link } from 'react-router';
import Songs from '../components/Songs';

function ArtistAlbums(props){

	console.log("artist albums:", props);

	var albums = props.selectedArtist.albums;

	return (
	   <div>
	    <h4>ALBUMS</h4>
          <div className="row">
          {
            albums.map(album => (
              <div className="col-xs-4" key={ album.id }>
                <Link className="thumbnail" to={`/albums/${album.id}`}>
                  <img src={ album.imageUrl } />
                  <div className="caption">
                    <h5>
                      <span>{ album.name }</span>
                    </h5>
                    <small>{ album.songs.length }</small>
                  </div>
                </Link>
              </div>
            ))
          }
          </div>
        </div>
	);

}

export default ArtistAlbums;
