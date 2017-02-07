import React from 'react';
import Songs from '../components/Songs';


class Album extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        selectedAlbum : {}
    };
  }

  componentDidMount () {
    const albumId = this.props.routeParams.albumId;
    const selectAlbum = this.props.selectAlbum;

    selectAlbum(albumId);
  }

  render(){

    console.log(this);

    return (
      <div className="album">
        <div>
          <h3>{ album.name }</h3>
          <img src={ album.imageUrl } className="img-thumbnail" />
        </div>
        <Songs
          songs={album.songs}
          currentSong={currentSong}
          isPlaying={isPlaying}
          toggleOne={toggleOne} />
      </div>
    )
  }

}

export default Album;
