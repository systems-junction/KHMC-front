import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const styles = {
  styleForDesc: {
    fontSize: 14,
  },
  styleForHeading: {
    fontSize: 15,
    fontWeight: "bold",
  },

  styleForCheckboxHeading: {
    fontSize: 13,
  },

  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 5,
    backgroundColor: "#2c6ddd",
    width: "100px",
    height: "40px",
    outline: "none",
  },
};

export default function AlertDialog(props) {
  const [bestEyeResponse, setBestEyeResponse] = useState("");
  const [bestVerbalResponse, setBestVerbalResponse] = useState("");
  const [bestMotorResponse, setBestMotorResponse] = useState("");
  const [covidPositive, setcovidPositive] = useState("");

  const [gcsTotal, setGCSTotal] = useState(0);

  const onNeurological = (e) => {
    if (e.target.name === "bestEyeResponse") {
      let gcsT = gcsTotal - bestEyeResponse;
      setGCSTotal(gcsT + parseInt(e.target.value));
      setBestEyeResponse(parseInt(e.target.value));
    } else if (e.target.name === "bestMotorResponse") {
      let gcsT = gcsTotal - bestMotorResponse;
      setGCSTotal(gcsT + parseInt(e.target.value));
      setBestMotorResponse(parseInt(e.target.value));
    } else if (e.target.name === "bestVerbalResponse") {
      let gcsT = gcsTotal - bestVerbalResponse;
      setGCSTotal(gcsT + parseInt(e.target.value));
      setBestVerbalResponse(parseInt(e.target.value));
    } else if (e.target.name === "covidPositive") {
      //   let gcsT = gcsTotal - bestEyeResponse;
      //   setGCSTotal(gcsT + parseInt(e.target.value));
      setcovidPositive(parseInt(e.target.value));
    }
  };

  function handleDone() {
    props.handleGCSDone(gcsTotal);
  }

  return (
    <div>
      <Dialog
        open={props.openGCSModal}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onBackdropClick={props.setVisibilityGCSModal}
        fullWidth={true}
        maxWidth={"lg"}
      >
        <DialogTitle id="alert-dialog-title">
          {"Glasgow Coma Scale/Score (GCS)"}
        </DialogTitle>

        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description">
           
          </DialogContentText> */}
          <div>
            <div>
              <h6 style={{ ...styles.styleForHeading }}>Best eye response</h6>
              <span style={{ ...styles.styleForDesc }}>
                If local injury, edema, or otherwise unable to be assessed, mark
                "Not testable (NT)".
              </span>

              <div className="row">
                <div className="col-md-4">
                  <label
                    style={{ ...styles.styleForCheckboxHeading }}
                    class="radio-inline control-label"
                  >
                    <input
                      type="checkbox"
                      name="bestEyeResponse"
                      value="4"
                      onChange={onNeurological}
                      checked={bestEyeResponse === 4 ? true : false}
                    />
                    &nbsp;&nbsp;Spontaneously (+4)
                  </label>
                </div>

                <div className="col-md-4">
                  <label
                    style={{ ...styles.styleForCheckboxHeading }}
                    class="radio-inline control-label"
                  >
                    <input
                      type="checkbox"
                      name="bestEyeResponse"
                      value="3"
                      onChange={onNeurological}
                      checked={bestEyeResponse === 3 ? true : false}
                    />
                    &nbsp;&nbsp;To verbal command (+3)
                  </label>
                </div>

                <div className="col-md-4">
                  <label
                    style={{ ...styles.styleForCheckboxHeading }}
                    class="radio-inline control-label"
                  >
                    <input
                      type="checkbox"
                      name="bestEyeResponse"
                      value="2"
                      onChange={onNeurological}
                      checked={bestEyeResponse === 2 ? true : false}
                    />
                    &nbsp;&nbsp;To pain (+2)
                  </label>
                </div>

                <div className="col-md-4">
                  <label
                    style={{ ...styles.styleForCheckboxHeading }}
                    class="radio-inline control-label"
                  >
                    <input
                      type="checkbox"
                      name="bestEyeResponse"
                      value="1"
                      onChange={onNeurological}
                      checked={bestEyeResponse === 1 ? true : false}
                    />
                    &nbsp;&nbsp;No eye opening (+1)
                  </label>
                </div>

                <div className="col-md-4">
                  <label
                    style={{ ...styles.styleForCheckboxHeading }}
                    class="radio-inline control-label"
                  >
                    <input
                      type="checkbox"
                      name="bestEyeResponse"
                      value="0"
                      onChange={onNeurological}
                      checked={bestEyeResponse === 0 ? true : false}
                    />
                    &nbsp;&nbsp;Not testable (0)
                  </label>
                </div>
              </div>
            </div>

            <hr width={"100%"} />

            <div>
              <h6 style={{ ...styles.styleForHeading }}>
                Best verbal response
              </h6>
              <span style={{ ...styles.styleForDesc }}>
                If intubated or otherwise unable to be assessed, mark "Not
                testable (NT)" Oriented (+5).
              </span>

              <div className="row">
                <div className="col-md-4">
                  <label
                    style={{ ...styles.styleForCheckboxHeading }}
                    class="radio-inline control-label"
                  >
                    <input
                      type="checkbox"
                      name="bestVerbalResponse"
                      value="5"
                      onChange={onNeurological}
                      checked={bestVerbalResponse === 5 ? true : false}
                    />
                    &nbsp;&nbsp;Oriented (+5)
                  </label>
                </div>

                <div className="col-md-4">
                  <label
                    style={{ ...styles.styleForCheckboxHeading }}
                    class="radio-inline control-label"
                  >
                    <input
                      type="checkbox"
                      name="bestVerbalResponse"
                      value="4"
                      onChange={onNeurological}
                      checked={bestVerbalResponse === 4 ? true : false}
                    />
                    &nbsp;&nbsp;Confused (+4)
                  </label>
                </div>

                <div className="col-md-4">
                  <label
                    style={{ ...styles.styleForCheckboxHeading }}
                    class="radio-inline control-label"
                  >
                    <input
                      type="checkbox"
                      name="bestVerbalResponse"
                      value="3"
                      onChange={onNeurological}
                      checked={bestVerbalResponse === 3 ? true : false}
                    />
                    &nbsp;&nbsp;Inappropriate words (+3)
                  </label>
                </div>

                <div className="col-md-4">
                  <label
                    style={{ ...styles.styleForCheckboxHeading }}
                    class="radio-inline control-label"
                  >
                    <input
                      type="checkbox"
                      name="bestVerbalResponse"
                      value="2"
                      onChange={onNeurological}
                      checked={bestVerbalResponse === 2 ? true : false}
                    />
                    &nbsp;&nbsp;Incomprehensible sounds (+2)
                  </label>
                </div>

                <div className="col-md-4">
                  <label
                    style={{ ...styles.styleForCheckboxHeading }}
                    class="radio-inline control-label"
                  >
                    <input
                      type="checkbox"
                      name="bestVerbalResponse"
                      value="1"
                      onChange={onNeurological}
                      checked={bestVerbalResponse === 1 ? true : false}
                    />
                    &nbsp;&nbsp;No verbal response (+1)
                  </label>
                </div>

                <div className="col-md-4">
                  <label
                    style={{ ...styles.styleForCheckboxHeading }}
                    class="radio-inline control-label"
                  >
                    <input
                      type="checkbox"
                      name="bestVerbalResponse"
                      value="0"
                      onChange={onNeurological}
                      checked={bestVerbalResponse === 0 ? true : false}
                    />
                    &nbsp;&nbsp;Not testable/intubated (0)
                  </label>
                </div>
              </div>
            </div>

            <hr width={"100%"} />

            <div>
              <h6 style={{ ...styles.styleForHeading }}>Best motor response</h6>
              <span style={{ ...styles.styleForDesc }}>
                {" "}
                If on sedation/paralysis or unable to be assessed, mark "Not
                testable (NT)".
              </span>

              <div className="row">
                <div className="col-md-4">
                  <label
                    style={{ ...styles.styleForCheckboxHeading }}
                    class="radio-inline control-label"
                  >
                    <input
                      type="checkbox"
                      name="bestMotorResponse"
                      value="6"
                      onChange={onNeurological}
                      checked={bestMotorResponse === 6 ? true : false}
                    />
                    &nbsp;&nbsp;Obeys commands (+6)
                  </label>
                </div>

                <div className="col-md-4">
                  <label
                    style={{ ...styles.styleForCheckboxHeading }}
                    class="radio-inline control-label"
                  >
                    <input
                      type="checkbox"
                      name="bestMotorResponse"
                      value="5"
                      onChange={onNeurological}
                      checked={bestMotorResponse === 5 ? true : false}
                    />
                    &nbsp;&nbsp;Localizes pain (+5)
                  </label>
                </div>

                <div className="col-md-4">
                  <label
                    style={{ ...styles.styleForCheckboxHeading }}
                    class="radio-inline control-label"
                  >
                    <input
                      type="checkbox"
                      name="bestMotorResponse"
                      value="4"
                      onChange={onNeurological}
                      checked={bestMotorResponse === 4 ? true : false}
                    />
                    &nbsp;&nbsp;Withdrawal from pain (+4)
                  </label>
                </div>

                <div className="col-md-4">
                  <label
                    style={{ ...styles.styleForCheckboxHeading }}
                    class="radio-inline control-label"
                  >
                    <input
                      type="checkbox"
                      name="bestMotorResponse"
                      value="3"
                      onChange={onNeurological}
                      checked={bestMotorResponse === 3 ? true : false}
                    />
                    &nbsp;&nbsp;Flexion to pain (+3)
                  </label>
                </div>

                <div className="col-md-4">
                  <label
                    style={{ ...styles.styleForCheckboxHeading }}
                    class="radio-inline control-label"
                  >
                    <input
                      type="checkbox"
                      name="bestMotorResponse"
                      value="2"
                      onChange={onNeurological}
                      checked={bestMotorResponse === 2 ? true : false}
                    />
                    &nbsp;&nbsp;Extension to pain (+2)
                  </label>
                </div>

                <div className="col-md-4">
                  <label
                    style={{ ...styles.styleForCheckboxHeading }}
                    class="radio-inline control-label"
                  >
                    <input
                      type="checkbox"
                      name="bestMotorResponse"
                      value="1"
                      onChange={onNeurological}
                      checked={bestMotorResponse === 1 ? true : false}
                    />
                    &nbsp;&nbsp;No motor response (+1)
                  </label>
                </div>

                <div className="col-md-5">
                  <label
                    style={{ ...styles.styleForCheckboxHeading }}
                    class="radio-inline control-label"
                  >
                    <input
                      type="checkbox"
                      name="bestMotorResponse"
                      value="0"
                      onChange={onNeurological}
                      checked={bestMotorResponse === 0 ? true : false}
                    />
                    &nbsp;&nbsp;Not testable (0)
                  </label>
                </div>
              </div>
            </div>

            <hr width={"100%"} />

            <div>
              <h6 style={{ ...styles.styleForHeading }}>
                {" "}
                Is this a COVID-19 patient?
              </h6>
              <span style={{ ...styles.styleForDesc }}>
                For research purposes only; answer does NOT impact results.
              </span>

              <div className="row">
                <div className="col-md-3">
                  <label
                    style={{ ...styles.styleForCheckboxHeading }}
                    class="radio-inline control-label"
                  >
                    <input
                      type="checkbox"
                      name="covidPositive"
                      value="3"
                      onChange={onNeurological}
                      checked={covidPositive === 3 ? true : false}
                    />
                    &nbsp;&nbsp;Confirmed positive
                  </label>
                </div>

                <div className="col-md-3">
                  <label
                    style={{ ...styles.styleForCheckboxHeading }}
                    class="radio-inline control-label"
                  >
                    <input
                      type="checkbox"
                      name="covidPositive"
                      value="2"
                      onChange={onNeurological}
                      checked={covidPositive === 2 ? true : false}
                    />
                    &nbsp;&nbsp;Suspected
                  </label>
                </div>

                <div className="col-md-3">
                  <label
                    style={{ ...styles.styleForCheckboxHeading }}
                    class="radio-inline control-label"
                  >
                    <input
                      type="checkbox"
                      name="covidPositive"
                      value="1"
                      onChange={onNeurological}
                      checked={covidPositive === 1 ? true : false}
                    />
                    &nbsp;&nbsp;Unlikely
                  </label>
                </div>

                <div className="col-md-3">
                  <label
                    style={{ ...styles.styleForCheckboxHeading }}
                    class="radio-inline control-label"
                  >
                    <input
                      type="checkbox"
                      name="covidPositive"
                      value="0"
                      onChange={onNeurological}
                      checked={covidPositive === 0 ? true : false}
                    />
                    &nbsp;&nbsp;Confirmed negative
                  </label>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={props.setVisibilityGCSModal}
            color="primary"
            style={{ ...styles.stylesForButton }}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            autoFocus
            onClick={handleDone}
            style={{ ...styles.stylesForButton }}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
