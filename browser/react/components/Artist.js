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
    //console.log("selected artists: ", this.props.selectedArtist);
  }

  render(){

    const {info, songs, albums} = this.props.selectedArtist;
    //console.log("props.albums is: ", albums);

      return (
        <div>
          <h3>{info.name}</h3>
          <ul className="nav nav-tabs">
            <li><Link to={`/artists/${this.props.routeParams.artistId}/albums`}>ALBUMS</Link></li>
            <li><Link to={`/artists/${this.props.routeParams.artistId}/songs`}>SONGS</Link></li>
          </ul>

          {

          this.props.children ?
          React.cloneElement(this.props.children, {
            selectedAlbum: this.props.selectedAlbum,
            currentSong: this.props.currentSong,
            isPlaying: this.props.isPlaying,
            toggleOne: this.props.toggleOne,
            albums: this.props.albums,
            selectAlbum: this.props.selectAlbum,
            selectedArtist: this.props.selectedArtist,
            selectArtist: this.props.selectArtist,
            artists: this.props.artists,
            //selectedArtist: this.selectArtist(this.props.routeParams.artistId)
          }) : null
        }

          {/*<h4>ALBUMS</h4>
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
            </div>*/}
        </div>
      );
    }
}

export default Artist;
