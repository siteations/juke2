import React from 'react';
import { Router, Route, hashHistory, IndexRedirect, Link } from 'react-router';
import Songs from '../components/Songs';

function ArtistSongs(props){

	console.log("artist songs:", props);

	var songs = props.selectedArtist.songs;

return (
        <div>
			<h4>SONGS</h4>
	          <div className="row">
	            <Songs
	            songs={songs}
	            currentSong={props.currentSong}
	            isPlaying={props.isPlaying}
	            toggleOne={props.toggleOne} />
	         </div>
         </div>
        );

}

export default ArtistSongs;
