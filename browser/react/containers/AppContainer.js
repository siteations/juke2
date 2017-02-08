import React, { Component } from 'react';
import axios from 'axios';
import bluebird from 'bluebird';
const Promise = bluebird;

import initialState from '../initialState';
import AUDIO from '../audio';

import Albums from '../components/Albums.js';
import Album from '../components/Album';
import Sidebar from '../components/Sidebar';
import Player from '../components/Player';
import Artists from "../components/Artists.js";
import Artist from "../components/Artist.js";


import { convertSong, convertAlbum, convertAlbums, skip } from '../utils';

export default class AppContainer extends Component {

  constructor (props) {
    super(props);
    this.state = initialState;

    this.toggle = this.toggle.bind(this);
    this.toggleOne = this.toggleOne.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.selectAlbum = this.selectAlbum.bind(this);
    this.deselectAlbum = this.deselectAlbum.bind(this);
    this.selectArtist = this.selectArtist.bind(this);
    this.deselectArtist = this.deselectArtist.bind(this);
  }

  componentDidMount () {
    axios.get('/api/albums/')
      .then(res => res.data)
      .then(album => this.onLoad(convertAlbums(album)));

     axios.get('/api/artists/')
      .then(res => res.data)
      .then(artist => this.onLoadArtists(artist))
      .then(artist => console.log("artist in axios: ", artist))
      .catch(err => console.error(err));

    AUDIO.addEventListener('ended', () =>
      this.next());
    AUDIO.addEventListener('timeupdate', () =>
      this.setProgress(AUDIO.currentTime / AUDIO.duration));
  }

  onLoad (albums) {
    this.setState({
      albums: albums
    });
  }

  onLoadArtists (artists){
    this.setState({
      artists: artists
    });
  }

  play () {
    AUDIO.play();
    this.setState({ isPlaying: true });
  }

  pause () {
    AUDIO.pause();
    this.setState({ isPlaying: false });
  }

  load (currentSong, currentSongList) {
    AUDIO.src = currentSong.audioUrl;
    AUDIO.load();
    this.setState({
      currentSong: currentSong,
      currentSongList: currentSongList
    });
  }

  startSong (song, list) {
    this.pause();
    this.load(song, list);
    this.play();
  }

  toggleOne (selectedSong, selectedSongList) {
    if (selectedSong.id !== this.state.currentSong.id)
      this.startSong(selectedSong, selectedSongList);
    else this.toggle();
  }

  toggle () {
    if (this.state.isPlaying) this.pause();
    else this.play();
  }

  next () {
    this.startSong(...skip(1, this.state));
  }

  prev () {
    this.startSong(...skip(-1, this.state));
  }

  setProgress (progress) {
    this.setState({ progress: progress });
  }

  selectAlbum (albumId) {
    axios.get(`/api/albums/${albumId}`)
      .then(res => res.data)
      .then(album => this.setState({
        selectedAlbum: convertAlbum(album)
      }));
  }

  deselectAlbum () {
    this.setState({ selectedAlbum: {}});
  }

  selectArtist (artistId) {
    let artistAlbums = axios.get(`/api/artists/${artistId}/albums`)
      .then(res => res.data);

    let artistInfo = axios.get(`/api/artists/${artistId}`)
      .then(res => res.data);

    let artistSongs = axios.get(`/api/artists/${artistId}/songs`)
      .then(res => res.data);

     Promise.all([artistAlbums, artistInfo, artistSongs]).spread((albums,info,songs) => {
          console.log("info in promise is: ", info)
          albums = convertAlbums(albums);
          songs = songs.map(song => {
            return convertSong(song);
          });

          return this.setState({
          selectedArtist: {info, albums, songs}
        })
      });
  }

    deselectArtist () {
      this.setState({ selectedArtist: {} });
    }

  render () {
    return (
      <div id="main" className="container-fluid">
        <div className="col-xs-2">
          <Sidebar deselectAlbum={this.deselectAlbum} />
        </div>
        <div className="col-xs-10">
        {

          this.props.children ?
          React.cloneElement(this.props.children, {
            selectedAlbum: this.state.selectedAlbum,
            currentSong: this.state.currentSong,
            isPlaying: this.state.isPlaying,
            toggleOne: this.toggleOne,
            albums: this.state.albums,
            selectAlbum: this.selectAlbum,
            selectedArtist: this.state.selectedArtist,
            selectArtist: this.selectArtist,
            artists: this.state.artists,
            //selectedArtist: this.selectArtist(this.props.routeParams.artistId)
          }) : null


         /*} this.state.selectedAlbum.id ?
          <Album
            album={this.state.selectedAlbum}
            currentSong={this.state.currentSong}
            isPlaying={this.state.isPlaying}
            toggleOne={this.toggleOne}
          /> :
          <Albums
            albums={this.state.albums}
            selectAlbum={this.selectAlbum}
          />*/
        }
        </div>
        <Player
          currentSong={this.state.currentSong}
          currentSongList={this.state.currentSongList}
          isPlaying={this.state.isPlaying}
          progress={this.state.progress}
          next={this.next}
          prev={this.prev}
          toggle={this.toggle}
        />
      </div>
    );
  }
}
