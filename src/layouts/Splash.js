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

      hideImage: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ hideImage: true });
    }, 2000);

    setTimeout(() => {
      this.props.hideSplash();
    }, 3000);
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
          // backgroundImage: `url("${Splash}")`,
          backgroundImage:
            " linear-gradient(25deg, rgba(42,98,205,1) 0%, rgba(4,76,207,1) 33%, rgba(0,45,130,1) 66%, rgba(0,33,106,1) 100%)",
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
            {!this.state.hideImage ? (
              <img
                src={Influence_white}
                onClick={() => this.props.hideSplash()}
                style={{ width: "28%", height: "auto", cursor: "pointer" }}
              />
            ) : (
              undefined
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
