import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Notification from "../../components/Snackbar/Notification.js";
import Header from "../../components/Header/Header";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import "../../assets/jss/material-dashboard-react/components/TextInputStyle.css";
import Assign from "./Steps/Assign";
import Investigations from "./Steps/Investigations";
import Precautions from "./Steps/Precautions";
import TreatmentAndFluids from "./Steps/TreatmentAndFluids";

function CareStreamMain(props) {
  const [openNotification, setOpenNotification] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [successMsg, setsuccessMsg] = useState(false);
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false);
      setErrorMsg("");
      setsuccessMsg("");
    }, 2000);
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div
      style={{
        backgroundColor: "rgb(19 213 159)",
        position: "fixed",
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        flex: 1,
        overflowY: "scroll",
      }}
    >
      <Header history={props.history} />
      <div className="cPadding">
        {activeStep === 0 ? (
          <Assign />
        ) : activeStep === 1 ? (
          <Investigations />
        ) : activeStep === 2 ? (
          <Precautions />
        ) : activeStep === 3 ? (
          <TreatmentAndFluids />
        ) : activeStep === 4 ? (
          <h1>dasdas</h1>
        ) : (
          undefined
        )}
        <MobileStepper
          steps={6}
          position="static"
          variant="text"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === 3 - 1}
            >
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
        <Notification
          msg={errorMsg}
          open={openNotification}
          success={successMsg}
        />
      </div>
    </div>
  );
}
export default CareStreamMain;
