import React from 'react';
import { Router, Route, hashHistory, IndexRedirect, Link } from 'react-router';
import Songs from '../components/Songs';

class Artist extends React.Component{
  constructor(props){
    super(props);

  }

  componentDidMount () {
    const artistId = this.props.routeParams.artistId;
    const selectArtist = this.props.selectArtist;

    selectArtist(artistId);
    console.log("selected artists: ", this.props.selectedArtist);
  }

  render(){

    const {info, songs, albums} = this.props.selectedArtist;
    console.log("props.albums is: ", albums);

      return (
        <div>
          <h3>{info.name}</h3>
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
          <h4>SONGS</h4>
          <div className="row">
            <Songs
            songs={songs}
            currentSong={this.props.currentSong}
            isPlaying={this.props.isPlaying}
            toggleOne={this.props.toggleOne} />
            </div>
        </div>
      );
    }
}

export default Artist;
