import React from 'react';
import { Router, Route, hashHistory, IndexRedirect, Link } from 'react-router';

const Sidebar = (props) => {

  const deselectAlbum = props.deselectAlbum;

  return (
    <sidebar>
      <img src="juke.svg" className="logo" />
      <section>
        <h4 className="menu-item active">
          <Link to="/albums">Go to Albums</Link>
          {/*<a href="#" onClick={deselectAlbum}>ALBUMS</a>*/}
        </h4>
      </section>
    </sidebar>
  );
}

export default Sidebar;
