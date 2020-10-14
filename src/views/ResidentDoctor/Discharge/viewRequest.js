/*eslint-disable*/
import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import capitilizeLetter from "../../../public/capitilizeLetter";
import cookie from "react-cookies";
import CustomTable from "../../../components/Table/Table";
import TextField from "@material-ui/core/TextField";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { DateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
const tableHeadingForPHR = [
  "Item Type",
  "Medicine Name",
  "Requested Qty",
  "Dosage",
  "Frequency",
  "Duration",
  "",
];
const tableDataKeysForPHR = [
  "itemType",
  "medicineName",
  "requestedQty",
  "dosage",
  "frequency",
  "duration",
];
const styles = {
  inputContainer: {
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  inputContainerForTextField: {
    marginTop: 25,
  },
  inputContainerForDropDown: {
    marginTop: 35,
    backgroundColor: "white",
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
  },
  buttonContainer: {
    marginTop: 25,
  },
  styleForLabel: {
    fontWeight: "700",
  },
  textFieldPadding: {
    paddingLeft: 5,
    paddingRight: 5,
  },
};

const useStyles = makeStyles(styles);

const useStylesForInput = makeStyles((theme) => ({
  underline: {
    "&&&:before": {
      borderBottom: "none",
    },
    "&&:after": {
      borderBottom: "none",
    },
  },
  margin: {
    margin: theme.spacing(0),
  },
  input: {
    backgroundColor: "white",
    borderRadius: 6,
    "&:after": {
      borderBottomColor: "black",
    },
    "&:hover": {
      backgroundColor: "white",
    },
    "&:disabled": {
      color: "gray",
    },
  },
  multilineColor: {
    backgroundColor: "white",
    borderRadius: 6,
    "&:hover": {
      backgroundColor: "white",
    },
    "&:after": {
      borderBottomColor: "black",
    },
  },
  root: {
    "& .MuiTextField-root": {
      backgroundColor: "white",
    },
    "& .Mui-focused": {
      backgroundColor: "white",
      color: "black",
    },
  },
}));
export default function EdrRequest(props) {
  const classes = useStylesForInput();
  const [currentUser, setCurrentUser] = React.useState(
    cookie.load("current_user")
  );

  useEffect(() => {
    console.log(props.item);
  }, []);

  const replaceSlugToTitle = (val) => {
    if (val === "in_active") {
      return (
        <Button
          style={stylesB.stylesForInActive}
          variant="contained"
          color="primary"
        >
          <strong>In active</strong>
        </Button>
      );
    } else if (val === "active") {
      return (
        <Button
          style={stylesB.stylesForActive}
          variant="contained"
          color="primary"
        >
          <strong>Active</strong>
        </Button>
      );
    }
    if (
      val === "pending" ||
      val === "to_do" ||
      val === "po_created" ||
      val === "Can be fulfilled" ||
      val === "hold"
    ) {
      if (currentUser && currentUser.staffTypeId.type === "Committe Member") {
        return (
          <>
            {val === "to_do" ? (
              <Button
                style={stylesB.stylesForActive}
                variant="contained"
                color="primary"
              >
                <strong>To Do</strong>
              </Button>
            ) : val === "pending" ? (
              <Button
                style={stylesB.stylesForActive}
                variant="contained"
                color="primary"
              >
                <strong>Pending</strong>
              </Button>
            ) : val === "po_created" ? (
              <Button
                style={stylesB.stylesForActive}
                variant="contained"
                color="primary"
              >
                <strong>PO Created</strong>
              </Button>
            ) : val === "hold" ? (
              <Button
                style={stylesB.stylesForActive}
                variant="contained"
                color="primary"
              >
                <strong>Hold</strong>
              </Button>
            ) : (
              ""
            )}
          </>
        );
      } else {
        return (
          <>
            {val === "to_do" ? (
              <Button
                style={stylesB.stylesForActive}
                variant="contained"
                color="primary"
              >
                <strong>To Do</strong>
              </Button>
            ) : val === "pending" ? (
              <Button
                style={stylesB.stylesForActive}
                variant="contained"
                color="primary"
              >
                <strong>Pending</strong>
              </Button>
            ) : val === "po_created" ? (
              <Button
                style={stylesB.stylesForActive}
                variant="contained"
                color="primary"
              >
                <strong>PO Created</strong>
              </Button>
            ) : val === "Can be fulfilled" ? (
              <Button
                style={stylesB.stylesForActive}
                variant="contained"
                color="primary"
              >
                <strong>Can be fulfilled</strong>
              </Button>
            ) : (
              ""
            )}
          </>
        );
      }
    } else if (
      val === "in_progress" ||
      val === "po_sent" ||
      val === "items_in_transit" ||
      val === "pending_approval_from_accounts" ||
      val === "pending_approval" ||
      val === "Delivery in Progress" ||
      val === "Fulfillment Initiated" ||
      val === "pending_administration" ||
      val === "pending_reception"
    ) {
      return (
        <>
          {val === "in_progress" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>In Progress</strong>
            </Button>
          ) : val === "items_in_transit" ? (
            <Button
              style={stylesB.stylesForReceived}
              variant="contained"
              color="primary"
            >
              <strong>Items in Transit</strong>
            </Button>
          ) : val === "pending_approval_from_accounts" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Pending Approval From Accounts</strong>
            </Button>
          ) : val === "pending_approval" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Pending Approval</strong>
            </Button>
          ) : val === "Delivery in Progress" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Delivery in Progress</strong>
            </Button>
          ) : val === "Fulfillment Initiated" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Fulfillment Initiated</strong>
            </Button>
          ) : val === "pending_reception" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Pending Reception</strong>
            </Button>
          ) : val === "pending_administration" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Pending Administration</strong>
            </Button>
          ) : (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Po Sent</strong>
            </Button>
          )}
        </>
      );
    } else if (
      val === "complete" ||
      val === "approved" ||
      val === "approve" ||
      val === "reject" ||
      val === "received" ||
      val === "Partially Received" ||
      val === "Cannot be fulfilled" ||
      val === "Item Returned to Warehouse" ||
      val === "Returned" ||
      val === "receive" ||
      val === "Received"
    ) {
      return (
        <>
          {val === "complete" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Complete</strong>
            </Button>
          ) : val === "approved" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Approved</strong>
            </Button>
          ) : val === "reject" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Reject</strong>
            </Button>
          ) : val === "received" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Received</strong>
            </Button>
          ) : val === "receive" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Receive</strong>
            </Button>
          ) : val === "Partially Received" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Partially Received</strong>
            </Button>
          ) : val === "approve" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Approve</strong>
            </Button>
          ) : val === "Cannot be fulfilled" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Cannot be fulfilled</strong>
            </Button>
          ) : val === "Returned" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Item Returned</strong>
            </Button>
          ) : val === "Received" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Received</strong>
            </Button>
          ) : (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Item Returned</strong>
            </Button>
          )}
        </>
      );
    }

    return capitilizeLetter(val);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return (
      d.getDate() +
      "/" +
      (d.getMonth() + 1) +
      "/" +
      d.getFullYear() +
      " " +
      d.toLocaleTimeString()
    );
  };

  return (
    <Dialog
      onClose={() => props.viewItem("")}
      fullWidth={true}
      maxWidth={"lg"}
      bodyStyle={{ backgroundColor: "red" }}
      contentStyle={{ backgroundColor: "red" }}
      aria-labelledby="simple-dialog-title"
      open={props.openItemDialog}
    >
      <DialogContent style={{ backgroundColor: "rgb(19 213 159)" }}>
        <DialogTitle
          id="simple-dialog-title"
          style={{ color: "white", paddingLeft: 20 }}
        >
          Details
        </DialogTitle>
        <div className="container-fluid">
          <div className="row">
            <div
              className="col-md-6 col-sm-6 col-6"
              style={{ ...styles.textFieldPadding, marginTop: "25px" }}
            >
              {props.item.date ? (
                <div>
                  {/* <TextField
                    required
                    disabled={true}
                    label='Date'
                    name={'date'}
                    value={formatDate(props.item.date)}
                    className='textInputStyle'
                    variant='filled'
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                  /> */}
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                      // required
                      disabled
                      inputVariant="filled"
                      fullWidth={true}
                      label="Date"
                      format="dd - MM - yyyy HH:mm"
                      // minDate={DateTime}
                      // onChange={(val) => onChangeDate(val, 'DateTime')}
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                      style={{ borderRadius: "10px" }}
                      value={props.item.date}
                    />
                  </MuiPickersUtilsProvider>
                </div>
              ) : (
                undefined
              )}
            </div>
            <div
              className="col-md-6 col-sm-6 col-6"
              style={{ ...styles.textFieldPadding, marginTop: "25px" }}
            >
              {props.item.doctor ? (
                <div>
                  <TextField
                    required
                    disabled={true}
                    label="Doctor"
                    name={"doctor"}
                    value={
                      props.item.doctor.firstName +
                      ` ` +
                      props.item.doctor.lastName
                    }
                    // error={buName === '' && isFormSubmitted}
                    // onChange={(e) => onChangeValue(e)}
                    className="textInputStyle"
                    variant="filled"
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                  />
                </div>
              ) : props.item.requester ? (
                <div>
                  <TextField
                    required
                    disabled={true}
                    label="Requester"
                    name={"requester"}
                    value={
                      props.item.requester.firstName +
                      ` ` +
                      props.item.requester.lastName
                    }
                    className="textInputStyle"
                    variant="filled"
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                  />
                </div>
              ) : (
                undefined
              )}
            </div>
          </div>

          <div className="row">
            <div
              className="col-md-6 col-sm-6 col-6"
              style={{ ...styles.textFieldPadding, marginTop: "25px" }}
            >
              {props.item.description ? (
                <div>
                  <TextField
                    required
                    disabled={true}
                    label="Description"
                    name={"description"}
                    value={props.item.description}
                    rows={4}
                    className="textInputStyle"
                    variant="filled"
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                  />
                </div>
              ) : (
                undefined
              )}
            </div>
            <div
              className="col-md-6 col-sm-6 col-6"
              style={{ ...styles.textFieldPadding, marginTop: "25px" }}
            >
              {props.item.note ? (
                <div>
                  <TextField
                    required
                    disabled={true}
                    label="Note"
                    name={"note"}
                    value={props.item.note}
                    rows={4}
                    className="textInputStyle"
                    variant="filled"
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                  />
                </div>
              ) : props.item.consultationNotes ? (
                <div>
                  <TextField
                    required
                    disabled={true}
                    label="Consultation Note"
                    name={"consultationNotes"}
                    value={props.item.consultationNotes}
                    className="textInputStyle"
                    rows={4}
                    variant="filled"
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                  />
                </div>
              ) : (
                undefined
              )}
            </div>
          </div>

          {props.item.serviceCode && props.item.serviceName ? (
            <div className="row" style={{ marginTop: 25 }}>
              <div
                className="col-md-6 col-sm-6 col-6"
                style={{ ...styles.textFieldPadding }}
              >
                {props.item.serviceCode ? (
                  <div>
                    <TextField
                      required
                      label="Service Code"
                      disabled={true}
                      placeholder="serviceCode"
                      name={"serviceCode"}
                      value={props.item.serviceCode}
                      className="textInputStyle"
                      variant="filled"
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                    />
                  </div>
                ) : (
                  undefined
                )}
              </div>
              <div
                className="col-md-6 col-sm-6 col-6"
                style={{ ...styles.textFieldPadding }}
              >
                {props.item.serviceName ? (
                  <div>
                    <TextField
                      required
                      label="Service Name"
                      disabled={true}
                      placeholder="serviceName"
                      name={"serviceName"}
                      value={props.item.serviceName}
                      className="textInputStyle"
                      variant="filled"
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                    />
                  </div>
                ) : (
                  undefined
                )}
              </div>
            </div>
          ) : (
            undefined
          )}

          <div
            style={{
              flex: 4,
              display: "flex",
              flexDirection: "column",
              paddingLeft: 2.5,
              paddingRight: 2.5,
            }}
          >
            {props.item.medicine ? (
              <div className="row">
                {/* <InputLabel style={styles.styleForLabel} id='generated-label'>
                  Your PHR Medicine
                </InputLabel>{' '} */}
                {props.item.medicine ? (
                  <CustomTable
                    tableData={props.item.medicine}
                    tableDataKeys={tableDataKeysForPHR}
                    tableHeading={tableHeadingForPHR}
                    borderBottomColor={"#60d69f"}
                    borderBottomWidth={20}
                  />
                ) : (
                  undefined
                )}
              </div>
            ) : (
              undefined
            )}
          </div>
          {/* </div> */}

          {/* <div className='row'>
            <div
              className='col-md-12 col-sm-12 col-12 d-flex justify-content-center text-center'
              style={{ ...styles.textFieldPadding, marginTop: '25px' }}
            >
              {props.item.status ? (
                <div>
                  <InputLabel style={styles.styleForLabel} id='generated-label'>
                    Status
                  </InputLabel>
                  {replaceSlugToTitle(props.item.status)}
                </div>
              ) : (
                undefined
              )}
            </div>
          </div> */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginLeft: "-10px",
            }}
          >
            <div style={{ marginTop: "2%", marginBottom: "2%" }}>
              <Button onClick={() => props.viewItem("")} variant="contained">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
