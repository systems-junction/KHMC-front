import React, { useEffect, useState, useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import tableStyles from "../../assets/jss/material-dashboard-react/components/tableStyle.js";
import Header from "../../components/Header/Header";
import business_Unit from "../../assets/img/Purchase Order.png";
import Back_Arrow from "../../assets/img/Back_Arrow.png";
import cookie from "react-cookies";
import axios from "axios";
import _ from "lodash";
import { updateEdrIpr, notifyTriage } from "../../public/endpoins";
import "../../assets/jss/material-dashboard-react/components/TextInputStyle.css";
import Notification from "../../components/Snackbar/Notification.js";
import CustomTable from "../../components/Table/Table";
import TextField from "@material-ui/core/TextField";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import GCSModal from "./GCSModal";

const tableHeadingForTriage = [
  "Request No.",
  "Date/Time",
  "Checked By",
  "Triage Level",
  "General Appearance",
  "Head Neck",
  "Neurological",
  "Respiratory",
  "Cardiac",
  "Abdomen",
  "",
];
const tableDataKeysForTriage = [
  "triageRequestNo",
  "date",
  "doctorName",
  "triageLevel",
  "generalAppearance",
  "headNeck",
  "neurological",
  "respiratory",
  "cardiac",
  "abdomen",
];

const tableHeadingForVitalSigns = [
  "Request No.",
  "Date/Time",
  "Checked By",
  "Heart Rate",
  "BP (Systolic)",
  "BP (Diastolic)",
  "Respiratory Rate",
  "Temperature",
  "FSBS",
  "Pain Scale",
  "Pulse OX",
  "",
];
const tableDataKeysForVitalSigns = [
  "triageRequestNo",
  "date",
  "doctorName",
  "heartRate",
  "bloodPressureSys",
  "bloodPressureDia",
  "respiratoryRate",
  "temperature",
  "FSBS",
  "painScale",
  "pulseOX",
];

const styles = {
  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 5,
    backgroundColor: "#2c6ddd",
    width: "120px",
    height: "45px",
    outline: "none",
  },
};

const useStylesForTabs = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
  },
  scroller: {
    flexGrow: "0",
  },
}));

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(0),
  },
  input: {
    backgroundColor: "white",
    boxShadow: "none",
    borderRadius: 5,
    "&:after": {
      borderBottomColor: "black",
      boxShadow: "none",
    },
    "&:hover": {
      backgroundColor: "white",
      boxShadow: "none",
    },
    "&:focus": {
      backgroundColor: "white",
      boxShadow: "none",
    },
  },
  multilineColor: {
    boxShadow: "none",
    backgroundColor: "white",
    borderRadius: 5,
    "&:hover": {
      backgroundColor: "white",
      boxShadow: "none",
    },
    "&:after": {
      borderBottomColor: "black",
      boxShadow: "none",
    },
    "&:focus": {
      boxShadow: "none",
    },
  },
  root: {
    "& .MuiTextField-root": {
      backgroundColor: "white",
    },
    "& .Mui-focused": {
      backgroundColor: "white",
      color: "black",
      boxShadow: "none",
    },
    "& .Mui-disabled": {
      backgroundColor: "white",
      color: "gray",
    },
    "&:focus": {
      backgroundColor: "white",
      boxShadow: "none",
    },
  },
}));

function TriageAndAssessment(props) {
  const matches = useMediaQuery("(min-width:600px)");
  const classes = useStyles();

  var initialState = {
    triageAssessmentArray: "",

    triageLevel: [],
    generalAppearance: [],
    headNeck: [],
    respiratory: [],
    cardiac: [],
    abdomen: [],
    neurological: [],

    generalAppearanceText: "",
    headNeckText: "",
    respiratoryText: "",
    cardiacText: "",
    abdomenText: "",
    neurologicalText: "",

    heartRate: "",
    bloodPressureSys: "",
    bloodPressureDia: "",
    respiratoryRate: "",
    temperature: "",
    FSBS: "",
    painScale: "",
    pulseOX: "",
  };

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    };
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  var {
    triageAssessmentArray,

    triageLevel,
    generalAppearance,
    headNeck,
    respiratory,
    cardiac,
    abdomen,
    neurological,

    generalAppearanceText,
    headNeckText,
    respiratoryText,
    cardiacText,
    abdomenText,
    neurologicalText,

    heartRate,
    bloodPressureSys,
    bloodPressureDia,
    respiratoryRate,
    temperature,
    FSBS,
    painScale,
    pulseOX,
  } = state;

  const classesForTabs = useStylesForTabs();

  const [value, setValue] = useState(0);
  const [historyValue, sethistoryValue] = useState(0);
  const [id, setId] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setsuccessMsg] = useState("");
  const [requestType, setrequestType] = useState("");
  const [openNotification, setOpenNotification] = useState(false);
  const [MRN, setMRN] = useState("");
  const [patientId, setpatientId] = useState("");

  const [generalAppearanceBoolean, setGeneralAppearanceBoolean] = useState(
    false
  );
  const [headNeckBoolean, setHeadNeckBoolean] = useState(false);
  const [neurologicalBoolean, setNeurologicalBoolean] = useState(false);
  const [respiratoryBoolean, setRespiratoryBoolean] = useState(false);
  const [cardiacBoolean, setCardiacBoolean] = useState(false);
  const [abdomenBoolean, setAbdomenBoolean] = useState(false);

  const [openGCSModal, setVisibilityGCSModal] = useState(false);

  useEffect(() => {
    setCurrentUser(cookie.load("current_user"));

    const selectedRec = props.history.location.state.selectedItem;
    console.log("In triage : ", selectedRec.patientId._id);
    setMRN(selectedRec.patientId.profileNo);
    setId(selectedRec._id);
    setrequestType(selectedRec.requestType);
    setpatientId(selectedRec.patientId._id);

    if (selectedRec.triageAssessment) {
      selectedRec.triageAssessment.map(
        (d) =>
          (d.doctorName = d.requester
            ? d.requester.firstName + " " + d.requester.lastName
            : "")
      );

      console.log("selectedRec.triageAssessment", selectedRec.triageAssessment);

      let temp = [];

      for (let i = 0; i < selectedRec.triageAssessment.length; i++) {
        let singleT = [...selectedRec.triageAssessment[i].triageLevel];

        let t = "";
        for (let j = 0; j < singleT.length; j++) {
          if (singleT[j] !== "") {
            if (j === singleT.length - 1) {
              t = t + singleT[j];
            } else {
              t = t + singleT[j] + ", ";
            }
          }
        }

        let singleGeneral = [
          ...selectedRec.triageAssessment[i].generalAppearance,
        ];

        let ga = "";
        for (let j = 0; j < singleGeneral.length; j++) {
          if (singleGeneral[j] !== "") {
            if (j === singleGeneral.length - 1) {
              ga = ga + singleGeneral[j];
            } else {
              ga = ga + singleGeneral[j] + ", ";
            }
          }
        }

        let singleHead = [...selectedRec.triageAssessment[i].headNeck];
        let h = "";
        for (let j = 0; j < singleHead.length; j++) {
          if (singleHead[j] !== "") {
            if (j === singleHead.length - 1) {
              h = h + singleHead[j];
            } else {
              h = h + singleHead[j] + ", ";
            }
          }
        }

        let singleResp = [...selectedRec.triageAssessment[i].respiratory];
        let r = "";
        for (let j = 0; j < singleResp.length; j++) {
          if (singleResp[j] !== "") {
            if (j === singleResp.length - 1) {
              r = r + singleResp[j];
            } else {
              r = r + singleResp[j] + ", ";
            }
          }
        }

        let singleAbdomen = [...selectedRec.triageAssessment[i].abdomen];
        let a = "";
        for (let j = 0; j < singleAbdomen.length; j++) {
          if (singleAbdomen[j] !== "") {
            if (j === singleAbdomen.length - 1) {
              a = a + singleAbdomen[j];
            } else {
              a = a + singleAbdomen[j] + ", ";
            }
          }
        }

        let singleNeurological = [
          ...selectedRec.triageAssessment[i].neurological,
        ];
        let n = "";
        for (let j = 0; j < singleNeurological.length; j++) {
          if (singleNeurological[j] !== "") {
            if (j === singleNeurological.length - 1) {
              n = n + singleNeurological[j];
            } else {
              n = n + singleNeurological[j] + ", ";
            }
          }
        }

        let singleCardiac = [...selectedRec.triageAssessment[i].cardiac];
        let c = "";
        for (let j = 0; j < singleCardiac.length; j++) {
          if (singleCardiac[j] !== "") {
            if (j === singleCardiac.length - 1) {
              c = c + singleCardiac[j];
            } else {
              c = c + singleCardiac[j] + ", ";
            }
          }
        }

        temp.push({
          ...selectedRec.triageAssessment[i],
          generalAppearance: ga,
          triageLevel: t,
          headNeck: h,
          abdomen: a,
          neurological: n,
          respiratory: r,
          cardiac: c,
        });
      }

      console.log("temp", temp);

      let obj = { ...selectedRec, triageAssessment: [...temp] };

      dispatch({
        field: "triageAssessmentArray",
        value: _.sortBy(obj.triageAssessment.reverse(), "date").reverse(),
      });
    }
  }, []);

  const onCheckedValue = (e) => {
    // console.log("ds", e.target.value)
    // if (e.target.value === "generalAppearanceText") {
    //   dispatch({ field: "generalAppearanceText", value: "" })
    // } else if (e.target.value === "respiratoryText") {
    //   dispatch({ field: "respiratoryText", value: "" })
    // } else if (e.target.value === "neurologicalText") {
    //   dispatch({ field: "neurologicalText", value: "" })
    // } else if (e.target.value === "headNeckText") {
    //   dispatch({ field: "headNeckText", value: "" })
    // } else if (e.target.value === "abdomenText") {
    //   dispatch({ field: "abdomenText", value: "" })
    // } else if (e.target.value === "cardiacText") {
    //   dispatch({ field: "cardiacText", value: "" })
    // } else {
    //   // dispatch({ field: "generalAppearanceText", value: null })
    //   dispatch({ field: "respiratoryText", value: null })
    //   dispatch({ field: "neurologicalText", value: null })
    //   dispatch({ field: "headNeckText", value: null })
    //   dispatch({ field: "abdomenText", value: null })
    //   dispatch({ field: "cardiacText", value: null })
    // }
    // dispatch({ field: e.target.name, value: e.target.value })
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleHistoryTabChange = (event, newValue) => {
    sethistoryValue(newValue);
  };

  const onNext = () => {
    setValue(value + 1);
  };

  const onSpecify = (e) => {
    // if (e.target.name === "generalAppearance") {
    //   dispatch({ field: "generalAppearanceText", value: e.target.value })
    // } else if (e.target.name === "headNeck") {
    //   dispatch({ field: "headNeckText", value: e.target.value })
    // } else if (e.target.name === "respiratory") {
    //   dispatch({ field: "respiratoryText", value: e.target.value })
    // } else if (e.target.name === "abdomen") {
    //   dispatch({ field: "abdomenText", value: e.target.value })
    // } else if (e.target.name === "neurological") {
    //   dispatch({ field: "neurologicalText", value: e.target.value })
    // } else if (e.target.name === "cardiac") {
    //   dispatch({ field: "cardiacText", value: e.target.value })
    // }
    // dispatch({ field: e.target.name, value: e.target.value })
  };

  const onTextChange = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const onPainScaleChange = (e) => {
    if (
      (e.target.name === "painScale" && e.target.value < 0) ||
      e.target.value > 10
    ) {
      return;
    } else {
      dispatch({ field: e.target.name, value: e.target.value });
    }
  };

  const handleSubmitAssessment = (e) => {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff =
      now -
      start +
      (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);

    var dateNow = new Date();
    var YYYY = dateNow
      .getFullYear()
      .toString()
      .substr(-2);
    var HH = dateNow.getHours();
    var mm = dateNow.getMinutes();
    let ss = dateNow.getSeconds();

    const TAArequestNo = "TAA" + day + YYYY + HH + mm + ss;

    let triageAssessment = [];

    if (generalAppearanceText !== "") {
      console.log("generalAppearanceText", generalAppearanceText);
      let w = generalAppearance.indexOf("");
      w = generalAppearanceText;
      generalAppearance = [...generalAppearance, w];
    }

    if (headNeckText !== "") {
      console.log("headNeckText", headNeckText);
      let w = headNeck.indexOf("");
      w = headNeckText;
      headNeck = [...headNeck, w];
    }

    if (respiratoryText !== "") {
      console.log("respiratoryText", respiratoryText);
      let w = respiratory.indexOf("");
      w = respiratoryText;
      respiratory = [...respiratory, w];
    }
    if (cardiacText !== "") {
      console.log("cardiacText", cardiacText);
      var w = cardiac.indexOf("");
      w = cardiacText;
      cardiac = [...cardiac, w];
    }
    if (abdomenText !== "") {
      console.log("abdomenText", abdomenText);
      var w = abdomen.indexOf("");
      w = abdomenText;
      abdomen = [...abdomen, w];
    }
    if (neurologicalText !== "") {
      console.log("neurologicalText", neurologicalText);
      var w = neurological.indexOf("");
      w = neurologicalText;
      neurological = [...neurological, w];
    }

    triageAssessment = [
      ...triageAssessmentArray,
      {
        triageRequestNo: TAArequestNo,
        requester: currentUser.staffId,
        triageLevel: triageLevel,
        generalAppearance: generalAppearance,
        headNeck: headNeck,
        respiratory: respiratory,
        cardiac: cardiac,
        abdomen: abdomen,
        neurological: neurological,
        heartRate: heartRate === "" ? "N/A" : heartRate,
        bloodPressureSys: bloodPressureSys === "" ? "N/A" : bloodPressureSys,
        bloodPressureDia: bloodPressureDia === "" ? "N/A" : bloodPressureDia,
        respiratoryRate: respiratoryRate === "" ? "N/A" : respiratoryRate,
        temperature: temperature === "" ? "N/A" : temperature,
        FSBS: FSBS === "" ? "N/A" : FSBS,
        painScale: painScale === "" ? "N/A" : painScale,
        pulseOX: pulseOX === "" ? "N/A" : pulseOX,
      },
    ];
    console.log(e);
    const params = {
      _id: id,
      requestType,
      triageAssessment: triageAssessment,
    };
    console.log(params, "params");
    axios
      .put(updateEdrIpr, params)
      .then((res) => {
        if (res.data.success) {
          console.log(
            "Update Patient data patient assessment: ",
            res.data.data
          );
          notifyForTriage(patientId);
          props.history.push({
            pathname: "success",
            state: {
              message: `Triage & Assessment No: ${TAArequestNo.toUpperCase()} for patient MRN: ${res.data.data.patientId.profileNo.toUpperCase()} added successfully`,
            },
            comingFor: "Triage",
          });
        } else if (!res.data.success) {
          setOpenNotification(true);
          setErrorMsg("Error in Submitting Assessment");
        }
      })
      .catch((e) => {
        console.log("error after submitting Assessment", e);
        setOpenNotification(true);
        setErrorMsg("Error while submitting Assessment");
      });
  };

  const notifyForTriage = (id) => {
    axios
      .get(notifyTriage + "/" + id)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log("error after notify", e);
        setOpenNotification(true);
        setErrorMsg(e);
      });
  };

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false);
      setErrorMsg("");
      setsuccessMsg("");
    }, 2000);
  }

  const onChangeHandler = (e, index) => {
    console.log("e.target.value", e.target.value);
    var a = [...triageLevel];
    if (a.includes(e.target.value)) {
      for (var i = 0; i < a.length; i++) {
        if (a[i] === e.target.value) {
          a.splice(i, 1);
          dispatch({ field: "triageLevel", value: a });
        }
      }
    } else {
      a = [...triageLevel, e.target.value];
      dispatch({ field: "triageLevel", value: a });
    }
  };

  const onOtherChange = (e) => {
    console.log(e.target.value);

    if (e.target.name === "headNeck") {
      dispatch({ field: "headNeckText", value: e.target.value });
    } else if (e.target.name === "generalAppearance") {
      dispatch({ field: "generalAppearanceText", value: e.target.value });
    } else if (e.target.name === "respiratory") {
      dispatch({ field: "respiratoryText", value: e.target.value });
    } else if (e.target.name === "cardiac") {
      dispatch({ field: "cardiacText", value: e.target.value });
    } else if (e.target.name === "abdomen") {
      dispatch({ field: "abdomenText", value: e.target.value });
    } else {
      dispatch({ field: "neurologicalText", value: e.target.value });
    }
  };

  const onGeneralAppearance = (e) => {
    if (e.target.name === "generalAppearanceOther") {
      setGeneralAppearanceBoolean(true);
    }

    if (generalAppearanceBoolean === true) {
      setGeneralAppearanceBoolean(false);
    }

    var a = [...generalAppearance];
    if (a.includes(e.target.value)) {
      for (var i = 0; i < a.length; i++) {
        if (a[i] === e.target.value) {
          a.splice(i, 1);
          dispatch({ field: "generalAppearance", value: a });
        }
      }
    } else {
      a = [...generalAppearance, e.target.value];
      dispatch({ field: "generalAppearance", value: a });
    }
  };

  const onHeadNeck = (e) => {
    // if (e.target.value === "generalAppearance") {
    //   console.log("Name")
    // }

    if (e.target.name === "headNeckOther") {
      setHeadNeckBoolean(true);
    }

    if (headNeckBoolean === true) {
      setHeadNeckBoolean(false);
    }

    console.log("e.target.value", e.target.value);
    var a = [...headNeck];
    if (a.includes(e.target.value)) {
      for (var i = 0; i < a.length; i++) {
        if (a[i] === e.target.value) {
          a.splice(i, 1);
          dispatch({ field: "headNeck", value: a });
        }
      }
    } else {
      a = [...headNeck, e.target.value];
      dispatch({ field: "headNeck", value: a });
    }
  };

  const onRespiratory = (e) => {
    // if (e.target.value === "generalAppearance") {
    //   console.log("Name")
    // }

    if (e.target.name === "respiratoryOther") {
      setRespiratoryBoolean(true);
    }

    if (respiratoryBoolean === true) {
      setRespiratoryBoolean(false);
    }

    console.log("e.target.value", e.target.value);
    var a = [...respiratory];
    if (a.includes(e.target.value)) {
      for (var i = 0; i < a.length; i++) {
        if (a[i] === e.target.value) {
          a.splice(i, 1);
          dispatch({ field: "respiratory", value: a });
        }
      }
    } else {
      a = [...respiratory, e.target.value];
      dispatch({ field: "respiratory", value: a });
    }
  };

  const onCardiac = (e) => {
    // if (e.target.value === "generalAppearance") {
    //   console.log("Name")
    // }

    if (e.target.name === "cardiacOther") {
      setCardiacBoolean(true);
    }

    if (cardiacBoolean === true) {
      setCardiacBoolean(false);
    }

    console.log("e.target.value", e.target.value);
    var a = [...cardiac];
    if (a.includes(e.target.value)) {
      for (var i = 0; i < a.length; i++) {
        if (a[i] === e.target.value) {
          a.splice(i, 1);
          dispatch({ field: "cardiac", value: a });
        }
      }
    } else {
      a = [...cardiac, e.target.value];
      dispatch({ field: "cardiac", value: a });
    }
  };

  const onAbdomen = (e) => {
    // if (e.target.value === "generalAppearance") {
    //   console.log("Name")
    // }

    if (e.target.name === "abdomenOther") {
      setAbdomenBoolean(true);
    }

    if (abdomenBoolean === true) {
      setAbdomenBoolean(false);
    }

    console.log("e.target.value", e.target.value);
    var a = [...abdomen];
    if (a.includes(e.target.value)) {
      for (var i = 0; i < a.length; i++) {
        if (a[i] === e.target.value) {
          a.splice(i, 1);
          dispatch({ field: "abdomen", value: a });
        }
      }
    } else {
      a = [...abdomen, e.target.value];
      dispatch({ field: "abdomen", value: a });
    }
  };

  const onNeurological = (e) => {
    // if (e.target.value === "generalAppearance") {
    //   console.log("Name")
    // }

    if (e.target.name === "neurologicalOther") {
      setNeurologicalBoolean(true);
    }

    if (neurologicalBoolean === true) {
      setNeurologicalBoolean(false);
    }

    if (e.target.value === "GCS") {
      if (checkForGCSValue()) {
        let a = [...neurological];
        let b = [];
        for (let i = 0; i < a.length; i++) {
          if (!a[i].includes(":")) {
            b.push(a[i]);
          }
        }
        dispatch({ field: "neurological", value: b });

        return;
      }
      setVisibilityGCSModal(true);
    }

    var a = [...neurological];
    if (a.includes(e.target.value)) {
      for (var i = 0; i < a.length; i++) {
        if (a[i] === e.target.value) {
          a.splice(i, 1);
          dispatch({ field: "neurological", value: a });
        }
      }
    } else {
      a = [...neurological, e.target.value];
      dispatch({ field: "neurological", value: a });
    }
  };

  function hideGCSModal() {
    var a = [...neurological];
    if (a.includes("GCS")) {
      for (var i = 0; i < a.length; i++) {
        if (a[i] === "GCS") {
          a.splice(i, 1);
          dispatch({ field: "neurological", value: a });
        }
      }
    }
    setVisibilityGCSModal(false);
  }

  function handleGCSDone(gcsValue) {
    var a = [...neurological];
    let withValue = [];
    for (var i = 0; i < a.length; i++) {
      if (a[i] === "GCS" || a[i].includes(":")) {
        if (a[i].includes(":")) {
          let val = "GCS" + ":" + gcsValue;
          a.splice(i, 1);
          console.log(gcsValue);
          a[i] = val;
          break;
        }
        let val = a[i] + ":" + gcsValue;
        withValue.push(val);
        a[i] = val;
        break;
      }
    }
    dispatch({ field: "neurological", value: a });
    setVisibilityGCSModal(false);
  }

  function checkForGCSValue() {
    for (let i = 0; i < neurological.length; i++) {
      if (
        (neurological[i].includes("GCS") ||
          neurological[0].split(":")[0] === "GCS") &&
        neurological.length > 0
      ) {
        return true;
      }
    }
    return false;
  }

  function findGCSValue() {
    for (let i = 0; i < neurological.length; i++) {
      if (
        (neurological[i].includes("GCS") ||
          neurological[0].split(":")[0] === "GCS") &&
        neurological.length > 0
      ) {
        return neurological[i];
      }
    }
    return false;
  }

  // console.log("triageLevel", triageLevel);
  // console.log("generalAppearance", generalAppearance);
  // console.log("headNeck", headNeck);
  // console.log("respiratory", respiratory);
  // console.log("cardiac", cardiac);
  // console.log("abdomen", abdomen);
  console.log("neurological", neurological);

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
        <div className="subheader" style={{ marginLeft: "-10px" }}>
          <div>
            <img src={business_Unit} />
            <div style={{ flex: 4, display: "flex", alignItems: "center" }}>
              <h3
                style={{
                  color: "white",
                  fontWeight: "700",
                  fontSize: matches ? " " : "15px ",
                }}
              >
                {"Triage & Assessment"}
              </h3>
            </div>
          </div>
        </div>

        <div className={classesForTabs.root}>
          <Tabs
            classes={{
              root: classesForTabs.root,
              scroller: classesForTabs.scroller,
            }}
            value={value}
            onChange={handleChange}
            textColor="primary"
            variant="scrollable"
            TabIndicatorProps={{ style: { background: "#12387a" } }}
            centered
          >
            <Tab
              style={{
                color: "white",
                borderRadius: 5,
                outline: "none",
                color: value === 0 ? "#12387a" : "#3B988C",
              }}
              label="RN Assessment"
            />
            <Tab
              style={{
                color: "white",
                borderRadius: 5,
                outline: "none",
                color: value === 1 ? "#12387a" : "#3B988C",
              }}
              label="Vital Signs"
            />
            <Tab
              style={{
                color: "white",
                borderRadius: 5,
                outline: "none",
                color: value === 2 ? "#12387a" : "#3B988C",
              }}
              label="Physical Examination"
            />
            <Tab
              style={{
                color: "white",
                borderRadius: 5,
                outline: "none",
                color: value === 3 ? "#12387a" : "#3B988C",
              }}
              label="Triage Level"
            />
          </Tabs>
        </div>

        {value === 0 ? (
          <>
            <div className={classesForTabs.root}>
              <Tabs
                classes={{
                  root: classesForTabs.root,
                  scroller: classesForTabs.scroller,
                }}
                value={historyValue}
                onChange={handleHistoryTabChange}
                textColor="primary"
                variant="scrollable"
                TabIndicatorProps={{ style: { background: "#12387a" } }}
                centered
              >
                <Tab
                  style={{
                    color: "white",
                    borderRadius: 5,
                    outline: "none",
                    color: historyValue === 0 ? "#12387a" : "#3B988C",
                  }}
                  label="Vital Signs"
                />
                <Tab
                  style={{
                    color: "white",
                    borderRadius: 5,
                    outline: "none",
                    color: historyValue === 1 ? "#12387a" : "#3B988C",
                  }}
                  label="Physical Examination & Triage"
                />
              </Tabs>
            </div>

            {historyValue === 0 ? (
              <div
                style={{ flex: 4, display: "flex", flexDirection: "column" }}
                className="container-fluid"
              >
                <div className="row" style={{ marginTop: "20px" }}>
                  {triageAssessmentArray !== 0 ? (
                    <CustomTable
                      tableData={triageAssessmentArray}
                      tableDataKeys={tableDataKeysForVitalSigns}
                      tableHeading={tableHeadingForVitalSigns}
                      borderBottomColor={"#60d69f"}
                      borderBottomWidth={20}
                    />
                  ) : (
                    undefined
                  )}
                </div>
              </div>
            ) : historyValue === 1 ? (
              <div
                style={{ flex: 4, display: "flex", flexDirection: "column" }}
                className="container-fluid"
              >
                <div className="row" style={{ marginTop: "20px" }}>
                  {triageAssessmentArray !== 0 ? (
                    <CustomTable
                      tableData={triageAssessmentArray}
                      tableDataKeys={tableDataKeysForTriage}
                      tableHeading={tableHeadingForTriage}
                      borderBottomColor={"#60d69f"}
                      borderBottomWidth={20}
                    />
                  ) : (
                    undefined
                  )}
                </div>
              </div>
            ) : (
              undefined
            )}
          </>
        ) : value === 1 ? (
          <>
            <div
              style={{
                flex: 4,
                display: "flex",
                flexDirection: "column",
                marginTop: "25px",
                marginBottom: "25px",
                borderRadius: "5px",
              }}
            >
              <div className={`container-fluid ${classes.root}`}>
                <div className="row">
                  <div
                    className="form-group col-md-4 col-sm-4 col-12"
                    style={{
                      paddingLeft: 5,
                      paddingRight: 5,
                    }}
                  >
                    <TextField
                      type="number"
                      label="Enter Heart Rate (bpm)"
                      name={"heartRate"}
                      value={heartRate}
                      // error={email === "" && detailsForm}
                      onChange={onTextChange}
                      className="textInputStyle"
                      variant="filled"
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                        disableUnderline: true,
                      }}
                    />
                  </div>
                  <div
                    className="form-group col-md-4 col-sm-4 col-12"
                    style={{
                      paddingLeft: 5,
                      paddingRight: 5,
                    }}
                  >
                    <TextField
                      type="number"
                      label="Blood Pressure Systolic (mmHg)"
                      name={"bloodPressureSys"}
                      value={bloodPressureSys}
                      // error={email === "" && detailsForm}
                      onChange={onTextChange}
                      className="textInputStyle"
                      variant="filled"
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                        disableUnderline: true,
                      }}
                    />
                  </div>
                  <div
                    className="form-group col-md-4 col-sm-4 col-12"
                    style={{
                      paddingLeft: 5,
                      paddingRight: 5,
                    }}
                  >
                    <TextField
                      type="number"
                      label="Blood Pressure Diastolic (mmHg)"
                      name={"bloodPressureDia"}
                      value={bloodPressureDia}
                      // error={email === "" && detailsForm}
                      onChange={onTextChange}
                      className="textInputStyle"
                      variant="filled"
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                        disableUnderline: true,
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div
                    className="form-group col-md-4 col-sm-4 col-12"
                    style={{
                      paddingLeft: 5,
                      paddingRight: 5,
                    }}
                  >
                    <TextField
                      type="number"
                      label="Enter Respiratory Rate (/min)"
                      name={"respiratoryRate"}
                      value={respiratoryRate}
                      // error={email === "" && detailsForm}
                      onChange={onTextChange}
                      className="textInputStyle"
                      variant="filled"
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                        disableUnderline: true,
                      }}
                    />
                  </div>
                  <div
                    className="form-group col-md-4 col-sm-4 col-12"
                    style={{
                      paddingLeft: 5,
                      paddingRight: 5,
                    }}
                  >
                    <TextField
                      type="number"
                      label="Enter Temperature (°F)"
                      name={"temperature"}
                      value={temperature}
                      // error={email === "" && detailsForm}
                      onChange={onTextChange}
                      className="textInputStyle"
                      variant="filled"
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                        disableUnderline: true,
                      }}
                    />
                  </div>
                  <div
                    className="form-group col-md-4 col-sm-4 col-12"
                    style={{
                      paddingLeft: 5,
                      paddingRight: 5,
                    }}
                  >
                    <TextField
                      type="number"
                      label="Enter FSBS (mg/dL)"
                      name={"FSBS"}
                      value={FSBS}
                      // error={email === "" && detailsForm}
                      onChange={onTextChange}
                      className="textInputStyle"
                      variant="filled"
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                        disableUnderline: true,
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div
                    className="form-group col-md-6 col-sm-6 col-12"
                    style={{
                      paddingLeft: 5,
                      paddingRight: 5,
                    }}
                  >
                    <TextField
                      type="number"
                      label="Enter Pain Scale (0-10)"
                      name={"painScale"}
                      value={painScale}
                      // error={email === "" && detailsForm}
                      onKeyDown={(evt) => {
                        (evt.key === "e" ||
                          evt.key === "E" ||
                          evt.key === "-" ||
                          evt.key === "+") &&
                          evt.preventDefault();
                      }}
                      onChange={onPainScaleChange}
                      className="textInputStyle"
                      variant="filled"
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                        disableUnderline: true,
                      }}
                    />
                  </div>
                  <div
                    className="form-group col-md-6 col-sm-6 col-12"
                    style={{
                      paddingLeft: 5,
                      paddingRight: 5,
                    }}
                  >
                    <TextField
                      type="number"
                      label="Enter Pulse OX (SpO2)"
                      name={"pulseOX"}
                      value={pulseOX}
                      // error={email === "" && detailsForm}
                      onChange={onTextChange}
                      className="textInputStyle"
                      variant="filled"
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                        disableUnderline: true,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "flex-end",
                  marginTop: "15px",
                  marginBottom: "2%",
                  paddingRight: "20px",
                }}
                className="container-fluid"
              >
                <div className="row">
                  <Button
                    style={styles.stylesForButton}
                    //disabled={!validateFormType1()}
                    onClick={onNext}
                    variant="contained"
                    color="primary"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : value === 2 ? (
          <>
            <div
              style={{
                flex: 4,
                display: "flex",
                flexDirection: "column",
                backgroundColor: "white",
                marginTop: "25px",
                marginBottom: "25px",
                padding: "25px",
                borderRadius: "5px",
              }}
            >
              <div className="container-fluid">
                <div className="row">
                  <label style={{ paddingLeft: "15px" }}>
                    <strong>General Appearance</strong>
                  </label>
                </div>
                <form
                  className="form-inline row"
                  role="form"
                  // onChange={onCheckedValue}
                  // value={generalAppearance}
                >
                  <div className="form-group col-md-3">
                    <div class="radio">
                      <label class="radio-inline control-label">
                        <input
                          type="checkbox"
                          name="generalAppearance"
                          value="Good"
                          onChange={onGeneralAppearance}
                          // checked={generalAppearance === "Good"}
                        />
                        &nbsp;&nbsp;Good
                      </label>
                    </div>
                  </div>
                  <div className="form-group col-md-3">
                    <div class="radio">
                      <label class="radio-inline control-label">
                        <input
                          type="checkbox"
                          name="generalAppearance"
                          value="Sick"
                          onChange={onGeneralAppearance}
                          // checked={generalAppearance === "Sick"}
                        />
                        &nbsp;&nbsp;Sick
                      </label>
                    </div>
                  </div>
                  <div className="form-group col-md-3">
                    <div class="radio">
                      <label class="radio-inline control-label">
                        <input
                          type="checkbox"
                          name="generalAppearance"
                          value="Pain"
                          onChange={onGeneralAppearance}
                          // checked={generalAppearance === "Pain"}
                        />
                        &nbsp;&nbsp;Pain
                      </label>
                    </div>
                  </div>
                  <div className="form-group col-md-3">
                    <div class="radio">
                      <label class="radio-inline control-label">
                        <input
                          type="checkbox"
                          name="generalAppearanceOther"
                          value={generalAppearanceText}
                          onChange={onGeneralAppearance}
                          // checked={generalAppearanceText !== null}
                        />
                        &nbsp;&nbsp;Other
                      </label>
                    </div>
                  </div>
                </form>
                {/* <form
                                    className='form-inline row'
                                    role='form'
                                    onChange={onCheckedValue}
                                    value={generalAppearance}
                                > */}
                <div className="form-group col-md-12">
                  {generalAppearanceBoolean ? (
                    <input
                      style={{
                        outline: "none",
                        backgroundColor: "#F7F5F5",
                        width: matches ? "" : "114%",
                      }}
                      // disabled={generalAppearanceText}
                      type="text"
                      placeholder="Specify"
                      onChange={onOtherChange}
                      name="generalAppearance"
                      value={generalAppearanceText}
                      className="control-label textInputStyle"
                      maxlength="500"
                    />
                  ) : (
                    undefined
                  )}
                </div>
                {/* </form> */}
              </div>
              <br />
              <div className="container-fluid">
                <div className="row">
                  <label style={{ paddingLeft: "15px" }}>
                    <strong>Head and Neck</strong>
                  </label>
                </div>
                <form
                  className="form-inline row"
                  role="form"
                  // onChange={onCheckedValue}
                  // value={headNeck}
                >
                  <div className="form-group col-md-3">
                    <div class="radio">
                      <label class="radio-inline control-label">
                        <input
                          type="checkbox"
                          name="headNeck"
                          value="Normal"
                          onChange={onHeadNeck}
                          // checked={headNeck === "Normal"}
                        />
                        &nbsp;&nbsp;Normal
                      </label>
                    </div>
                  </div>
                  <div className="form-group col-md-3">
                    <div class="radio">
                      <label class="radio-inline control-label">
                        <input
                          type="checkbox"
                          name="headNeck"
                          value="Lymphadenopathy"
                          onChange={onHeadNeck}
                          // checked={headNeck === "Line"}
                        />
                        &nbsp;&nbsp;Lymphadenopathy
                      </label>
                    </div>
                  </div>
                  <div className="form-group col-md-3">
                    <div class="radio">
                      <label class="radio-inline control-label">
                        <input
                          type="checkbox"
                          name="headNeck"
                          value="Thyroid Enlargement"
                          onChange={onHeadNeck}
                          // checked={headNeck === "Thyroid Enlargement"}
                        />
                        &nbsp;&nbsp;Thyroid Enlargement
                      </label>
                    </div>
                  </div>
                  <div className="form-group col-md-3">
                    <div class="radio">
                      <label class="radio-inline control-label">
                        <input
                          type="checkbox"
                          name="headNeckOther"
                          value={headNeckText}
                          onChange={onHeadNeck}
                          // checked={headNeckText !== null}
                        />
                        &nbsp;&nbsp;Other
                      </label>
                    </div>
                  </div>
                </form>
                {/* <form className='form-inline row' role='form' onChange={onCheckedValue}
                                    value={headNeck}> */}
                <div className="form-group col-md-12">
                  {headNeckBoolean ? (
                    <input
                      style={{
                        outline: "none",
                        backgroundColor: "#F7F5F5",
                        width: matches ? "" : "114%",
                      }}
                      type="text"
                      onChange={onOtherChange}
                      placeholder="Specify"
                      name="headNeck"
                      value={headNeckText}
                      className="control-label textInputStyle"
                      maxlength="500"
                    />
                  ) : (
                    undefined
                  )}
                </div>
                {/* </form> */}
              </div>
              <br />
              <div className="container-fluid">
                <div className="row">
                  <label style={{ paddingLeft: "15px" }}>
                    <strong>Respiratory</strong>
                  </label>
                </div>
                <form
                  className="form-inline row"
                  role="form"
                  // onChange={onCheckedValue}
                  // value={respiratory}
                >
                  <div className="form-group col-md-3">
                    <div class="radio">
                      <label class="radio-inline control-label">
                        <input
                          type="checkbox"
                          name="respiratory"
                          value="GBAE"
                          onChange={onRespiratory}
                          // checked={respiratory === "GBAE"}
                        />
                        &nbsp;&nbsp;GBAE
                      </label>
                    </div>
                  </div>
                  <div className="form-group col-md-3">
                    <div class="radio">
                      <label class="radio-inline control-label">
                        <input
                          type="checkbox"
                          name="respiratory"
                          value="Wheezing"
                          onChange={onRespiratory}
                          // checked={respiratory === "Wheezing"}
                        />
                        &nbsp;&nbsp;Wheezing
                      </label>
                    </div>
                  </div>
                  <div className="form-group col-md-3">
                    <div class="radio">
                      <label class="radio-inline control-label">
                        <input
                          type="checkbox"
                          name="respiratory"
                          value="Crepitus"
                          onChange={onRespiratory}
                          // checked={respiratory === "Crackles"}
                        />
                        &nbsp;&nbsp;Crepitus
                      </label>
                    </div>
                  </div>
                  <div className="form-group col-md-3">
                    <div class="radio">
                      <label class="radio-inline control-label">
                        <input
                          type="checkbox"
                          name="respiratory"
                          value="Crepitation"
                          onChange={onRespiratory}
                          // checked={respiratory === "Crepitation"}
                        />
                        &nbsp;&nbsp;Crepitation
                      </label>
                    </div>
                  </div>
                </form>
                <div className="row">
                  <form
                    className="form-inline"
                    role="form"
                    onChange={onCheckedValue}
                    value={respiratory}
                  >
                    <div className="form-group col-md-3">
                      <div class="radio">
                        <label class="radio-inline control-label">
                          <input
                            type="checkbox"
                            name="respiratoryOther"
                            value={respiratoryText}
                            onChange={onRespiratory}
                            // checked={respiratoryText !== null}
                          />
                          &nbsp;&nbsp;Other
                        </label>
                      </div>
                    </div>
                  </form>
                  <div className="form-group col-md-11">
                    {respiratoryBoolean ? (
                      <input
                        style={{
                          outline: "none",
                          backgroundColor: "#F7F5F5",
                          marginLeft: "-8px",
                        }}
                        // disabled={respiratoryText === null}
                        type="text"
                        placeholder="Specify"
                        onChange={onOtherChange}
                        name="respiratory"
                        value={respiratoryText}
                        className="control-label textInputStyle tri-Alt-4-tab"
                        maxlength="500"
                      />
                    ) : (
                      undefined
                    )}
                  </div>
                </div>
              </div>
              <br />
              <div className="container-fluid">
                <div className="row">
                  <label style={{ paddingLeft: "15px" }}>
                    <strong>Cardiac</strong>
                  </label>
                </div>
                <form
                  className="form-inline row"
                  role="form"
                  // onChange={onCheckedValue}
                  // value={cardiac}
                >
                  <div className="form-group col-md-4 col-sm-4">
                    <div class="radio">
                      <label class="radio-inline control-label">
                        <input
                          type="checkbox"
                          name="cardiac"
                          value="Normal S1, S2"
                          onChange={onCardiac}
                          // checked={cardiac === "Normal S1, S2"}
                        />
                        &nbsp;&nbsp;Normal S1, S2
                      </label>
                    </div>
                  </div>
                  <div className="form-group col-md-4 col-sm-4">
                    <div class="radio">
                      <label class="radio-inline control-label">
                        <input
                          type="checkbox"
                          name="cardiac"
                          value="No Murmurs"
                          onChange={onCardiac}
                          // checked={cardiac === "No Murmurs"}
                        />
                        &nbsp;&nbsp;No Murmurs
                      </label>
                    </div>
                  </div>
                  <div className="form-group col-md-4 col-sm-4">
                    <div class="radio">
                      <label class="radio-inline control-label">
                        <input
                          type="checkbox"
                          name="cardiacOther"
                          value={cardiacText}
                          onChange={onCardiac}
                          // checked={cardiacText !== null}
                        />
                        &nbsp;&nbsp;Other
                      </label>
                    </div>
                  </div>
                </form>
                {/* <form className='form-inline row' role='form'
                                    onChange={onCheckedValue}
                                    value={cardiac}
                                > */}
                <div className="form-group col-md-12 ">
                  {cardiacBoolean ? (
                    <input
                      style={{
                        outline: "none",
                        backgroundColor: "#F7F5F5",
                        marginLeft: "-5px",
                        width: matches ? "" : "114%",
                      }}
                      // disabled={cardiacText === null}
                      type="text"
                      placeholder="Specify"
                      onChange={onOtherChange}
                      name="cardiac"
                      value={cardiacText}
                      className="control-label textInputStyle"
                      maxlength="500"
                    />
                  ) : (
                    undefined
                  )}
                </div>
                {/* </form> */}
              </div>
              <br />
              <div className="container-fluid">
                <div className="row">
                  <label style={{ paddingLeft: "15px" }}>
                    <strong>Abdomen</strong>
                  </label>
                </div>
                <form
                  className="form-inline row"
                  role="form"
                  // onChange={onCheckedValue}
                  // value={abdomen}
                >
                  <div className="form-group col-md-3">
                    <div class="radio">
                      <label class="radio-inline control-label">
                        <input
                          type="checkbox"
                          name="abdomen"
                          value="Soft Lax"
                          onChange={onAbdomen}
                          // checked={abdomen === "Soft Lax"}
                        />
                        &nbsp;&nbsp;Soft & Lax
                      </label>
                    </div>
                  </div>
                  <div className="form-group col-md-3">
                    <div class="radio">
                      <label class="radio-inline control-label">
                        <input
                          type="checkbox"
                          name="abdomen"
                          value="Non-tender"
                          onChange={onAbdomen}

                          // checked={abdomen === "No Tenderness"}
                        />
                        &nbsp;&nbsp;Non-tender
                      </label>
                    </div>
                  </div>
                  <div className="form-group col-md-3">
                    <div class="radio">
                      <label class="radio-inline control-label">
                        <input
                          type="checkbox"
                          name="abdomen"
                          value="Guarding"
                          onChange={onAbdomen}

                          // checked={abdomen === "Murphy +ve"}
                        />
                        &nbsp;&nbsp;Guarding
                      </label>
                    </div>
                  </div>
                  <div className="form-group col-md-3">
                    <div class="radio">
                      <label class="radio-inline control-label">
                        <input
                          type="checkbox"
                          name="abdomen"
                          value="Rebound"
                          onChange={onAbdomen}
                          // checked={abdomen === "Rebound +ve"}
                        />
                        &nbsp;&nbsp;Rebound
                      </label>
                    </div>
                  </div>
                </form>
                <div class="row">
                  <form
                    className="form-inline"
                    role="form"
                    onChange={onCheckedValue}
                    value={abdomen}
                  >
                    <div className="form-group col-md-3">
                      <div class="radio">
                        <label class="radio-inline control-label">
                          <input
                            type="checkbox"
                            name="abdomenOther"
                            value={abdomenText}
                            onChange={onAbdomen}

                            // checked={abdomenText !== null}
                          />
                          &nbsp;&nbsp;Other
                        </label>
                      </div>
                    </div>
                  </form>
                  <div className="col-md-11">
                    {abdomenBoolean ? (
                      <input
                        style={{
                          outline: "none",
                          backgroundColor: "#F7F5F5",
                          marginLeft: "-10px",
                        }}
                        // disabled={abdomenText === null}
                        type="text"
                        placeholder="Specify"
                        onChange={onOtherChange}
                        name="abdomen"
                        value={abdomenText}
                        className=" textInputStyle tri-Alt-4-tab"
                        maxlength="500"
                      />
                    ) : (
                      undefined
                    )}
                  </div>
                </div>
              </div>
              <br />
              <div className="container-fluid">
                <div className="row">
                  <label style={{ paddingLeft: "15px" }}>
                    <strong>Neurological</strong>
                  </label>
                </div>
                <form
                  className="form-inline row"
                  role="form"
                  // onChange={onCheckedValue}
                  // value={neurological}
                >
                  <div className="form-group col-md-3">
                    <div class="radio">
                      <label class="radio-inline control-label">
                        <input
                          type="checkbox"
                          name="neurological"
                          value="Alert & Conscious"
                          onChange={onNeurological}
                          // checked={neurological === "Conscious"}
                        />
                        &nbsp;&nbsp;Alert & Conscious
                      </label>
                    </div>
                  </div>
                  <div className="form-group col-md-3">
                    <div class="radio">
                      <label class="radio-inline control-label">
                        <input
                          type="checkbox"
                          name="neurological"
                          value="Oriented"
                          onChange={onNeurological}
                          // checked={neurological === "Oriented"}
                        />
                        &nbsp;&nbsp;Oriented
                      </label>
                    </div>
                  </div>
                  <div className="form-group col-md-3">
                    <div class="radio">
                      <label class="radio-inline control-label">
                        <input
                          type="checkbox"
                          name="neurological"
                          value="Confused"
                          onChange={onNeurological}
                          // checked={neurological === "Oriented"}
                        />
                        &nbsp;&nbsp;Confused
                      </label>
                    </div>
                  </div>
                  <div className="form-group col-md-3">
                    <div class="radio">
                      <label class="radio-inline control-label">
                        <input
                          type="checkbox"
                          name="neurological"
                          value="Weakness"
                          onChange={onNeurological}

                          // checked={neurological === "Weakness"}
                        />
                        &nbsp;&nbsp;Weakness
                      </label>
                    </div>
                  </div>

                  <div className="form-group col-md-3">
                    <div class="radio">
                      <label class="radio-inline control-label">
                        <input
                          type="checkbox"
                          name="neurological"
                          value="GCS"
                          onChange={onNeurological}
                          checked={checkForGCSValue() ? true : false}
                        />
                        &nbsp;&nbsp;
                        {checkForGCSValue() ? findGCSValue() : "GCS:0"}
                      </label>
                    </div>
                  </div>

                  <div className="form-group col-md-3">
                    <div class="radio">
                      <label class="radio-inline control-label">
                        <input
                          type="checkbox"
                          name="neurologicalOther"
                          value={neurologicalText}
                          onChange={onNeurological}

                          // checked={neurologicalText !== null}
                        />
                        &nbsp;&nbsp;Other
                      </label>
                    </div>
                  </div>
                </form>
                {/* <form className='form-inline row' role='form'
                                    onChange={onCheckedValue}
                                    value={neurological}
                                > */}

                <div className="form-group col-md-12">
                  {neurologicalBoolean ? (
                    <input
                      style={{
                        outline: "none",
                        backgroundColor: "#F7F5F5",
                        marginLeft: "-5px",
                        width: matches ? "" : "114%",
                      }}
                      // disabled={neurologicalText === null}
                      type="text"
                      placeholder="Specify"
                      onChange={onOtherChange}
                      name="neurological"
                      value={neurologicalText}
                      className="textInputStyle"
                      maxlength="500"
                    />
                  ) : (
                    undefined
                  )}
                </div>
                {/* </form> */}
              </div>
            </div>
            <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "flex-end",
                  marginTop: "2%",
                  marginBottom: "2%",
                  paddingRight: "15px",
                }}
                className="container-fluid"
              >
                <div className="row">
                  <Button
                    style={styles.stylesForButton}
                    //disabled={!validateFormType1()}
                    onClick={onNext}
                    variant="contained"
                    color="primary"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : value === 3 ? (
          <>
            <div
              style={{
                flex: 4,
                display: "flex",
                flexDirection: "column",
                backgroundColor: "white",
                marginTop: "25px",
                marginBottom: "25px",
                padding: "25px",
                borderRadius: "5px",
              }}
              className="container-fluid"
            >
              <div className="row">
                <label style={{ paddingLeft: "15px" }}>
                  <strong>Triage Level</strong>
                </label>
              </div>
              <div value={triageLevel}>
                <div className="row">
                  <div className="col-md-4">
                    <input
                      type="checkbox"
                      name="triageLevel"
                      value="Resuscitation"
                      onChange={onChangeHandler}
                      // checked={triageLevel}
                    />
                    <label for="male">&nbsp;&nbsp;1 - Resuscitation</label>
                  </div>
                  <div className="col-md-4">
                    <input
                      type="checkbox"
                      name="triageLevel"
                      value="Emergent"
                      onChange={onChangeHandler}
                      // checked={triageLevel === "Emergent"}
                    />
                    <label for="male">&nbsp;&nbsp;2 - Emergent</label>
                  </div>
                  <div className="col-md-4">
                    <input
                      type="checkbox"
                      name="triageLevel"
                      onChange={onChangeHandler}
                      value="Urgent"
                      // checked={triageLevel === "Urgent"}
                    />
                    <label for="male">&nbsp;&nbsp;3 - Urgent</label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <input
                      type="checkbox"
                      name="triageLevel"
                      value="LessUrgent"
                      onChange={onChangeHandler}
                      // checked={triageLevel === "LessUrgent"}
                    />
                    <label for="male">&nbsp;&nbsp;4 - Less Urgent</label>
                  </div>
                  <div className="col-md-4">
                    <input
                      type="checkbox"
                      name="triageLevel"
                      value="NonUrgent"
                      onChange={onChangeHandler}
                      // checked={triageLevel === "NonUrgent"}
                    />
                    <label for="male">&nbsp;&nbsp;5 - Non Urgent</label>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "flex-end",
                  marginTop: "2%",
                  marginBottom: "2%",
                  paddingRight: "15px",
                }}
                className="container-fluid"
              >
                <div className="row">
                  <Button
                    style={styles.stylesForButton}
                    //disabled={!validateFormType1()}
                    onClick={handleSubmitAssessment}
                    variant="contained"
                    color="primary"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          undefined
        )}

        <Notification
          msg={errorMsg}
          open={openNotification}
          success={successMsg}
        />

        <div style={{ marginBottom: 20, marginTop: 50 }}>
          <img
            onClick={() => props.history.goBack()}
            src={Back_Arrow}
            style={{ width: 45, height: 35, cursor: "pointer" }}
          />
        </div>
      </div>

      {openGCSModal ? (
        <GCSModal
          openGCSModal={openGCSModal}
          setVisibilityGCSModal={hideGCSModal}
          handleGCSDone={handleGCSDone}
        />
      ) : (
        undefined
      )}
    </div>
  );
}
export default TriageAndAssessment;
