import React from 'react';
import Songs from '../components/Songs';
import initialState from '../initialState';


class Album extends React.Component{
  constructor(props){
    super(props);

  }

  componentDidMount () {
      const albumId = this.props.routeParams.albumId;
      const selectAlbum = this.props.selectAlbum;

      selectAlbum(albumId);
  }

  render(){

    console.log("this: ", this);
    console.log("props: ", this.props);

    var album = this.props.selectedAlbum;


    return (
      <div className="album">
        <div>
          <h3>{ album.name }</h3>
          <img src={ album.imageUrl } className="img-thumbnail" />
        </div>
        <Songs
          songs={album.songs}
          currentSong={this.props.currentSong}
          isPlaying={this.props.isPlaying}
          toggleOne={this.props.toggleOne} />
      </div>
    )
  }

}

export default Album;
