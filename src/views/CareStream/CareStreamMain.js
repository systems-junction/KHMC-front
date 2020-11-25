import React, { useState } from "react"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import Notification from "../../components/Snackbar/Notification.js"
import Header from "../../components/Header/Header"
import MobileStepper from "@material-ui/core/MobileStepper"
import Button from "@material-ui/core/Button"
import "../../assets/jss/material-dashboard-react/components/TextInputStyle.css"
import Assign from "./Steps/Assign"
import Investigations from "./Steps/Investigations"
import Precautions from "./Steps/Precautions"
import TreatmentAndFluids from "./Steps/TreatmentAndFluids"
import Medication from "./Steps/Medication"
import MDNotifications from "./Steps/MDNotifications"
import PrintCareStream from "./Steps/PrintCareStream"

const useStyles = makeStyles(() => ({
  mobileStepper: {
    backgroundColor: "transparent",
    "& .MuiButtonBase-root": {
      backgroundColor: "#2973CF",
      color: "#FFFFFF",
      padding: 10,
    },
  },
  textFieldPadding: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  save: {
    cursor: "pointer",
    borderRadius: 5,
    backgroundColor: "#2973CF",
    width: "130px",
    height: "45px",
    outline: "none",
    color: "white",
  },
  cancel: {
    cursor: "pointer",
    borderRadius: 5,
    width: "130px",
    height: "45px",
    outline: "none",
  },
}))

function CareStreamMain(props) {
  const classes = useStyles()
  const [openNotification, setOpenNotification] = useState(false)
  const [errorMsg, setErrorMsg] = useState(false)
  const [successMsg, setsuccessMsg] = useState(false)
  const theme = useTheme()
  const [activeStep, setActiveStep] = React.useState(0)

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false)
      setErrorMsg("")
      setsuccessMsg("")
    }, 2000)
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const pushingToPrint = () => {
    console.log("he")
    alert("sa")
    let path = `careStream/printCareStream`
    props.history.push({
      pathname: path,
      state: { careStream: "careStream" },
    })
  }

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
          <Medication />
        ) : activeStep === 5 ? (
          <MDNotifications />
        ) : (
          undefined
        )}
        <MobileStepper
          className={classes.mobileStepper}
          steps={7}
          position="static"
          variant="text"
          activeStep={activeStep}
          nextButton={
            <div>
              {activeStep === 0 ? (
                <Button
                  size="small"
                  onClick={handleNext}
                  // disabled={activeStep === 6 - 1}
                >
                  Skip
                </Button>
              ) : activeStep === 4 ? (
                <Button
                  size="small"
                  onClick={handleNext}
                  // disabled={activeStep === 6 - 1}
                >
                  Generate Reconcilation Request
                </Button>
              ) : (
                undefined
              )}
              <Button
                size="small"
                onClick={activeStep === 5 ? pushingToPrint : handleNext}
                // disabled={activeStep === 6 - 1}
              >
                {activeStep === 0
                  ? "Assign"
                  : activeStep === 5
                  ? "Submit"
                  : "Next"}
              </Button>
            </div>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
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
  )
}
export default CareStreamMain
