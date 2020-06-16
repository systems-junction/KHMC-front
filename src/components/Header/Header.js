import React from "react";
import './Header.css';
import KHMC_White from "../../assets/img/KHMC_White.png";
import Influence_white from "../../assets/img/Influence_white.png";
import {Redirect} from 'react-router-dom'
class Header extends React.Component {
  state = {
    goBack: false,
  };

  render() {
    if (this.state.goBack) {
      var currentLocation = window.location.pathname;
      if (currentLocation !== '/home') {
        return <Redirect to={"/home"} />;
      }
    }

    return (
      <div className="header">
            <img src={KHMC_White} style={{ maxWidth: "50%", height: "auto" }} onClick={ () => {return this.setState({ goBack: true})} } />
            <img
              src={Influence_white}
              style={{ maxWidth: "60%", height: "auto" }}
            />
      </div>
    );
  }
}

export default Header;
