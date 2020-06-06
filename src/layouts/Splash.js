import React from "react";
import { Redirect } from "react-router-dom";
import Splash from "../assets/img/Splash.png";
import Influence_white from "../assets/img/KHMC Circle Logo.png";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      null_userName: false,

      password: "",
      null_password: "",

      tr: false,

      verifiedUser: false,

      msg: "",
    };
  }

  render() {
    if (this.state.tr) {
      setTimeout(() => {
        this.setState({ tr: false, msg: "" });
      }, 2000);
    }
    if (this.state.verifiedUser) {
      return <Redirect to="/admin/dashboard" />;
    }

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          position: "fixed",
          width: "100%",
          height: "100%",
          backgroundImage: `url("${Splash}")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          style={{
            flex: 1,
            // justifyContent: 'center',
            // alignItems: 'center',
            display: "flex",
            flexDirection: "row",
            marginLeft: "4%",
            marginRight: "4%",
            // backgroundColor: 'red'
          }}
        >
          <div style={{ display: "flex", flex: 1, alignItems: "flex-end" }}>
            <img
              src={Influence_white}
              onClick={() => this.props.hideSplash()}
              style={{ width: "28%", height: "auto", cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
