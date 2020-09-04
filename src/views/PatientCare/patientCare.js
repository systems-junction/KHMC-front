import React, { useEffect, useState, useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import tableStyles from "../../assets/jss/material-dashboard-react/components/tableStyle.js";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
// import AutoComplete from "@material-ui/lab/AutoComplete";
import {
    searchpatient,
    getSearchedpatient,
} from "../../public/endpoins";
import cookie from "react-cookies";
import Header from "../../components/Header/Header";
import patientCareIcon from '../../assets/img/PatientCare.png'
import Back from "../../assets/img/Back_Arrow.png";
import "../../assets/jss/material-dashboard-react/components/TextInputStyle.css";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CustomTable from "../../components/Table/Table";
import plus_icon from "../../assets/img/Plus.png";
import InputLabelComponent from "../../components/InputLabel/inputLabel";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import ErrorMessage from "../../components/ErrorMessage/errorMessage";
import Notification from "../../components/Snackbar/Notification.js";
import Fingerprint from "../../assets/img/fingerprint.png";
import AccountCircle from '@material-ui/icons/SearchOutlined'
import InputAdornment from '@material-ui/core/InputAdornment'
import BarCode from '../../assets/img/Bar Code.png'
import ViewSingleRequest from './viewRequest'
import Loader from "react-loader-spinner";

// const tableHeadingForResident = [
//     "Date/Time",
//     "Description",
//     "Doctor Ref",
//     "Action",
// ];
// const tableDataKeysForResident = [
//     "date",
//     "description",
//     ["doctor", "firstName"],
// ];
// const tableHeadingForConsultation = [
//     "Consultation ID",
//     "Date/Time",
//     "Description",
//     "Doctor Ref",
//     "Action",
// ];
// const tableDataKeysForConsultation = [
//     "consultationNo",
//     "date",
//     "description",
//     ["requester", "firstName"],
// ];
const tableHeadingForPharmacy = [
    "Request ID",
    "Date/Time",
    "Requester",
    "Status",
    "Action",
];
const tableDataKeysForPharmacy = [
    "_id",
    "date",
    ["requester", "firstName"],
    "status",
];
// const tableHeadingForLabReq = [
//     "Request Id",
//     "Service Code",
//     "Service Name",
//     "Requester",
//     "Status",
//     "Action",
// ];
// const tableDataKeysForLabReq = [
//     "_id",
//     "serviceCode",
//     "serviceName",
//     "requesterName",
//     "status",
// ];
// const tableHeadingForRadiology = [
//     "Request Id",
//     "Service Code",
//     "Service Name",
//     "Requester",
//     "Status",
//     "Action",
// ];
// const tableDataKeysForRadiology = [
//     "_id",
//     "serviceCode",
//     "serviceName",
//     "requesterName",
//     "status",
// ];
// const tableHeadingForNurse = [
//     "Service Code",
//     "Service Name",
//     "Requester",
//     "Status",
//     "Action",
// ];
// const tableDataKeysForNurse = [
//     "serviceCode",
//     "serviceName",
//     "requesterName",
//     "status",
// ];
const actions = { view: true };
const styles = {
    patientDetails: {
        backgroundColor: "white",
        borderRadius: 5,
        padding: "20px",
    },
    inputContainerForTextField: {
        marginTop: 25,
    },
    inputContainerForDropDown: {
        marginTop: 25,
        backgroundColor: "white",
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 2,
    },
    stylesForButton: {
        color: "white",
        cursor: "pointer",
        borderRadius: 5,
        backgroundColor: "#2c6ddd",
        height: "50px",
        outline: "none",
    },
    buttonContainer: {
        marginTop: 25,
    },
    stylesForLabel: {
        fontWeight: "400",
        color: "grey",
        fontSize: 15,
    },
    styleForPatientDetails: {
        fontWeight: "bold",
    },
    textFieldPadding:
    {
        paddingLeft: 5,
        paddingRight: 5
    },
    headerHeading: {
        display: "flex",
        alignItems: "center",
        verticalAlign: "center",
        paddingTop: 10,
    },
    headingStyles: {
        fontWeight: "bold",
        color: "grey",
        fontSize: 12,
    },
    textStyles: {
        fontWeight: "700",
        color: "black",
        fontSize: 14
    },
};

const useStylesForTabs = makeStyles({
    root: {
        justifyContent: "center",
    },
    scroller: {
        flexGrow: "0",
    },
});

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
        borderRadius: 5,
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
        borderRadius: 5,
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

const useStyles = makeStyles(tableStyles);

function PatientCare(props) {
    const classesForTabs = useStylesForTabs();
    const classes = useStylesForInput();

    const initialState = {
        labServiceId: "",
        labServiceCode: "",
        labRequestArray: "",
        labServiceName: "",
        labServiceStatus: "",

        radioServiceId: "",
        radioServiceCode: "",
        radioServiceName: "",
        radiologyRequestArray: "",
        radioServiceStatus: "",

        //for nurse
        nurseServiceId: "",
        nurseServiceCode: "",
        nurseServiceName: "",
        nurseService: "",
        nurseServiceStatus: "",

        consultationNoteArray: "",
        consultationNo: "",
        date: new Date(),
        description: "",
        consultationNotes: "",
        requester: cookie.load("current_user").name,

        residentNoteArray: "",
        rdescription: "",
        note: "",
        doctor: cookie.load("current_user").name,

        pharmacyRequestArray: "",
    };

    function reducer(state, { field, value }) {
        return {
            ...state,
            [field]: value,
        };
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const {
        labServiceId,
        labServiceCode,
        labRequestArray,
        labServiceName,
        labServiceStatus,

        radioServiceId,
        radioServiceCode,
        radioServiceName,
        radiologyRequestArray,
        radioServiceStatus,

        //for nursing
        nurseServiceId,
        nurseServiceCode,
        nurseServiceName,
        nurseService,
        nurseServiceStatus,

        consultationNoteArray,
        consultationNo,
        date = new Date(),
        description,
        consultationNotes,
        requester = cookie.load("current_user").name,

        residentNoteArray,
        rdescription,
        note,
        doctor = cookie.load("current_user").name,

        pharmacyRequestArray,
    } = state;

    const onChangeValue = (e) => {
        dispatch({ field: e.target.name, value: e.target.value });
    };

    const [currentUser, setCurrentUser] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [openNotification, setOpenNotification] = useState(false);
    const [value, setValue] = useState(2);
    const [selectedItem, setSelectedItem] = useState("");
    const [searchPatientQuery, setSearchPatientQuery] = useState("");
    const [patientFoundSuccessfull, setpatientFoundSuccessfully] = useState(false);
    const [patientFound, setpatientFound] = useState("");
    const [patientDetails, setPatientDetails] = useState("");
    const [selectedPatientArray, setSelectedPatientArray] = useState([]);
    const [patientDetailsDialog, openPatientDetailsDialog] = useState(false);
    const [enableAssessment, setenableAssessment] = useState(true)

    const [openItemDialog, setOpenItemDialog] = useState(false);
    const [openAddConsultDialog, setOpenAddConsultDialog] = useState(false);
    const [openAddResidentDialog, setOpenAddResidentDialog] = useState(false);
    const [item, setItem] = useState("");
    const [selectedPatient, setSelectedPatient] = useState("");
    const [requestNo, setrequestNo] = useState("");
    const [labRequest, setlabRequest] = useState("");
    const [pharmacyRequest, setpharmacyRequest] = useState("");
    const [radiologyRequest, setradiologyRequest] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [itemFound, setItemFound] = useState("");
    const [itemFoundSuccessfull, setItemFoundSuccessfully] = useState(false);
    const [selectedSearchedItem, setSelectedSearchedItem] = useState("");
    const [selectedSearchedRadioItem, setSelectedSearchedRadioItem] = useState("");
    const [selectedLabArray, setSelectedLabArray] = useState([]);
    const [selectedRadioArray, setSelectedRadioArray] = useState([]);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [id, setId] = useState("");
    const [searchRadioQuery, setSearchRadioQuery] = useState("");
    const [radioItemFoundSuccessfull, setRadioItemFoundSuccessfully] = useState("");
    const [radioItemFound, setRadioItemFound] = useState("");
    const [addLabRequest, setaddLabRequest] = useState(false);
    const [addRadioRequest, setaddRadioRequest] = useState(false);
    const [nurseItemFoundSuccessfull, setNurseItemFoundSuccessfully] = useState("");
    const [nurseItemFound, setNurseItemFound] = useState("");
    const [addNurseRequest, setaddNurseRequest] = useState(false);
    const [searchNurseQuery, setSearchNurseQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setCurrentUser(cookie.load("current_user"));

        // getEDRById(props.history.location.state.selectedItem._id);

        // setId(props.history.location.state.selectedItem._id);
        // setSelectedItem(props.history.location.state.selectedItem);
        // setrequestNo(props.history.location.state.selectedItem.requestNo);
        // setSelectedPatient(props.history.location.state.selectedItem.patientId);
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function viewItem(item) {
        if (item !== "") {
            setOpenItemDialog(true);
            setItem(item);
        } else {
            setOpenItemDialog(false);
            setItem("");
        }
    }

    // function addConsultRequest() {
    // if (!validateForm()) {
    //   setIsFormSubmitted(true);
    //   setOpenNotification(true);
    //   setErrorMsg("Please fill the fields properly");
    // } else {
    // if (validateForm()) {

    // let consultationNote = [];

    // consultationNote = [
    //     ...consultationNoteArray,
    //     {
    //         consultationNo: id,
    //         description: description,
    //         consultationNotes: consultationNotes,
    //         requester: currentUser.staffId,
    //         date: date,
    //     },
    // ];

    // const params = {
    //     _id: id,
    //     consultationNote: consultationNote,
    // };

    // console.log("params", params);
    // axios
    //     .put(updateIPR, params)
    //     .then((res) => {
    //         if (res.data.success) {
    //             console.log("response while adding Consult Req", res.data.data);
    //             window.location.reload(false);
    //         } else if (!res.data.success) {
    //             setOpenNotification(true);
    //             setErrorMsg("Error while adding the Consultation request");
    //         }
    //     })
    //     .catch((e) => {
    //         console.log("error after adding Consultation request", e);
    //         setOpenNotification(true);
    //         setErrorMsg("Error after adding the Consultation request");
    //     });
    //   }
    // }
    // }

    // function addResidentRequest() {
    // if (!validateForm()) {
    //   setIsFormSubmitted(true);
    //   setOpenNotification(true);
    //   setErrorMsg("Please fill the fields properly");
    // } else {
    // if (validateForm()) {

    //     let residentNote = [];

    //     residentNote = [
    //         ...residentNoteArray,
    //         {
    //             date: date,
    //             description: rdescription,
    //             doctor: currentUser.staffId,
    //             note: note,
    //         },
    //     ];

    //     const params = {
    //         _id: id,
    //         residentNotes: residentNote,
    //     };

    //     // console.log("params", params);
    //     axios
    //         .put(updateIPR, params)
    //         .then((res) => {
    //             if (res.data.success) {
    //                 console.log("response while adding Resident Req", res.data.data);
    //                 window.location.reload(false);
    //             } else if (!res.data.success) {
    //                 setOpenNotification(true);
    //                 setErrorMsg("Error while adding the Resident request");
    //             }
    //         })
    //         .catch((e) => {
    //             console.log("error after adding Resident request", e);
    //             setOpenNotification(true);
    //             setErrorMsg("Error after adding the Resident request");
    //         });
    //     //   }
    //     // }
    // }

    // const addNewRequest = () => {
    //     let path = `viewIPR/add`;
    //     props.history.push({
    //         pathname: path,
    //         state: {
    //             comingFor: "add",
    //             selectedItem: selectedItem,
    //             pharmacyRequestArray,
    //         },
    //     });
    // };

    // function hideDialog() {
    //     setOpenAddConsultDialog(false);
    //     setOpenAddResidentDialog(false);

    //     dispatch({ field: "consultationNo", value: "" });
    //     dispatch({ field: "description", value: "" });
    //     dispatch({ field: "consultationNotes", value: "" });
    //     dispatch({ field: "rdescription", value: "" });
    //     dispatch({ field: "note", value: "" });
    // }

    // const handleSearch = (e) => {
    //     setSearchQuery(e.target.value);
    //     if (e.target.value.length >= 3) {
    //         axios
    //             .get(getSearchedLaboratoryService + "/" + e.target.value)
    //             .then((res) => {
    //                 if (res.data.success) {
    //                     if (res.data.data.length > 0) {
    //                         console.log(res.data.data);
    //                         setItemFoundSuccessfully(true);
    //                         setItemFound(res.data.data);
    //                     } else {
    //                         setItemFoundSuccessfully(false);
    //                         setItemFound("");
    //                     }
    //                 }
    //             })
    //             .catch((e) => {
    //                 console.log("error while searching req", e);
    //             });
    //     }
    // };

    // function handleAddItem(i) {
    //     // console.log("selected item", i);

    //     dispatch({ field: "labServiceId", value: i._id });
    //     dispatch({ field: "labServiceCode", value: i.serviceNo });
    //     dispatch({ field: "labServiceName", value: i.name });
    //     dispatch({ field: "labServiceStatus", value: i.status });

    //     setSearchQuery("");
    //     setaddLabRequest(true);
    // }

    // const addSelectedLabItem = () => {
    //     // setIsFormSubmitted(true);
    //     // if (validateItemsForm()) {

    //     let found =
    //         labRequestArray &&
    //         labRequestArray.find((item) => item.serviceId === labServiceId);

    //     if (found) {
    //         setOpenNotification(true);
    //         setErrorMsg("This Service has already been added.");
    //     } else {
    //         dispatch({
    //             field: "labRequestArray",
    //             value: [
    //                 ...labRequestArray,
    //                 {
    //                     serviceId: labServiceId,
    //                     serviceCode: labServiceCode,
    //                     serviceName: labServiceName,
    //                     requester: currentUser.staffId,
    //                     requesterName: requester,
    //                     status: labServiceStatus,
    //                 },
    //             ],
    //         });
    //         // }
    //     }

    //     dispatch({ field: "labServiceId", value: "" });
    //     dispatch({ field: "labServiceName", value: "" });
    //     dispatch({ field: "labServiceStatus", value: "" });
    //     dispatch({ field: "labServiceCode", value: "" });

    //     setaddLabRequest(false);
    // };

    // const saveLabReq = () => {
    //     let labItems = [];
    //     for (let i = 0; i < labRequestArray.length; i++) {
    //         labItems = [
    //             ...labItems,
    //             {
    //                 serviceId: labRequestArray[i].serviceId,
    //                 serviceCode: labRequestArray[i].serviceCode,
    //                 requesterName: labRequestArray[i].requesterName,
    //                 requester: labRequestArray[i].requester,
    //                 serviceName: labRequestArray[i].serviceName,
    //                 status: labRequestArray[i].status,
    //             },
    //         ];
    //     }
    //     const params = {
    //         _id: id,
    //         labRequest: labItems,
    //     };
    //     // console.log("params", params);
    //     axios
    //         .put(updateIPR, params)
    //         .then((res) => {
    //             if (res.data.success) {
    //                 console.log("response after adding Lab Request", res.data);
    //                 window.location.reload(false);
    //             } else if (!res.data.success) {
    //                 setOpenNotification(true);
    //             }
    //         })
    //         .catch((e) => {
    //             console.log("error after adding Lab Request", e);
    //             setOpenNotification(true);
    //             setErrorMsg("Error while adding the Lab Request");
    //         });
    // };

    // const handleRadioSearch = (e) => {
    //     setSearchRadioQuery(e.target.value);
    //     if (e.target.value.length >= 3) {
    //         axios
    //             .get(getSearchedRadiologyService + "/" + e.target.value)
    //             .then((res) => {
    //                 if (res.data.success) {
    //                     if (res.data.data.length > 0) {
    //                         console.log(res.data.data);
    //                         setRadioItemFoundSuccessfully(true);
    //                         setRadioItemFound(res.data.data);
    //                     } else {
    //                         setRadioItemFoundSuccessfully(false);
    //                         setRadioItemFound("");
    //                     }
    //                 }
    //             })
    //             .catch((e) => {
    //                 console.log("error while searching req", e);
    //             });
    //     }
    // };

    // function handleAddRadioItem(i) {
    //     // console.log("selected item", i);
    //     dispatch({ field: "radioServiceId", value: i._id });
    //     dispatch({ field: "radioServiceCode", value: i.serviceNo });
    //     dispatch({ field: "radioServiceName", value: i.name });
    //     dispatch({ field: "radioServiceStatus", value: i.status });

    //     setSearchRadioQuery("");
    //     setaddRadioRequest(true);
    // }

    // const addSelectedRadioItem = () => {
    //     // setIsFormSubmitted(true);
    //     // if (validateItemsForm()) {

    //     let found =
    //         radiologyRequestArray &&
    //         radiologyRequestArray.find((item) => item.serviceId === radioServiceId);

    //     if (found) {
    //         setOpenNotification(true);
    //         setErrorMsg("This Service has already been added.");
    //     } else {
    //         dispatch({
    //             field: "radiologyRequestArray",
    //             value: [
    //                 ...radiologyRequestArray,
    //                 {
    //                     serviceId: radioServiceId,
    //                     serviceCode: radioServiceCode,
    //                     requesterName: requester,
    //                     serviceName: radioServiceName,
    //                     requester: currentUser.staffId,
    //                     status: radioServiceStatus,
    //                 },
    //             ],
    //         });
    //         // }
    //     }

    //     dispatch({ field: "radioServiceId", value: "" });
    //     dispatch({ field: "radioServiceCode", value: "" });
    //     dispatch({ field: "radioServiceName", value: "" });
    //     dispatch({ field: "radioServiceStatus", value: "" });

    //     setaddLabRequest(false);
    // };

    // const saveRadioReq = () => {
    //     let radioItems = [];
    //     for (let i = 0; i < radiologyRequestArray.length; i++) {
    //         radioItems = [
    //             ...radioItems,
    //             {
    //                 serviceId: radiologyRequestArray[i].serviceId,
    //                 serviceCode: radiologyRequestArray[i].serviceCode,
    //                 requester: radiologyRequestArray[i].requester,
    //                 requesterName: radiologyRequestArray[i].requesterName,
    //                 serviceName: radiologyRequestArray[i].serviceName,
    //                 status: radiologyRequestArray[i].status,
    //             },
    //         ];
    //     }

    //     const params = {
    //         _id: id,
    //         radiologyRequest: radioItems,
    //     };
    //     // console.log("params", params);
    //     axios
    //         .put(updateIPR, params)
    //         .then((res) => {
    //             if (res.data.success) {
    //                 console.log("response after adding Radio Request", res.data);
    //                 window.location.reload(false);
    //             } else if (!res.data.success) {
    //                 setOpenNotification(true);
    //             }
    //         })
    //         .catch((e) => {
    //             console.log("error after adding Radio Request", e);
    //             setOpenNotification(true);
    //             setErrorMsg("Error while adding the Radiology Request");
    //         });
    // };

    // // for Nursing
    // const handleNurseSearch = (e) => {
    //     setSearchNurseQuery(e.target.value);
    //     if (e.target.value.length >= 3) {
    //         axios
    //             .get(getSearchedNurseService + "/" + e.target.value)
    //             .then((res) => {
    //                 if (res.data.success) {
    //                     if (res.data.data.length > 0) {
    //                         console.log(res.data.data);
    //                         setNurseItemFoundSuccessfully(true);
    //                         setNurseItemFound(res.data.data);
    //                     } else {
    //                         setNurseItemFoundSuccessfully(false);
    //                         setNurseItemFound("");
    //                     }
    //                 }
    //             })
    //             .catch((e) => {
    //                 console.log("error while searching req", e);
    //             });
    //     }
    // };
    // function handleAddNurseItem(i) {
    //     // console.log("selected item", i.serviceNo);
    //     dispatch({ field: "nurseServiceId", value: i._id });
    //     dispatch({ field: "nurseServiceCode", value: i.serviceNo });
    //     dispatch({ field: "nurseServiceName", value: i.name });
    //     dispatch({ field: "nurseServiceStatus", value: i.status });
    //     setSearchNurseQuery("");
    //     setaddNurseRequest(true);
    // }
    // const addSelectedNurseItem = () => {
    //     // setIsFormSubmitted(true);
    //     // if (validateItemsForm()) {
    //     let found =
    //         nurseService &&
    //         nurseService.find((item) => item.serviceId === nurseServiceId);
    //     if (found) {
    //         setOpenNotification(true);
    //         setErrorMsg("This Service has already been added.");
    //     } else {
    //         dispatch({
    //             field: "nurseService",
    //             value: [
    //                 ...nurseService,
    //                 {
    //                     serviceId: nurseServiceId,
    //                     serviceCode: nurseServiceCode,
    //                     requesterName: requester,
    //                     serviceName: nurseServiceName,
    //                     requester: currentUser.staffId,
    //                     status: nurseServiceStatus,
    //                 },
    //             ],
    //         });
    //         // }
    //     }
    //     dispatch({ field: "nurseServiceId", value: "" });
    //     dispatch({ field: "nurseServiceCode", value: "" });
    //     dispatch({ field: "nurseServiceName", value: "" });
    //     dispatch({ field: "nurseServiceStatus", value: "" });
    //     setaddLabRequest(false);
    // };
    // const saveNurseReq = () => {
    //     // console.log("THISSSSS ISS ARRAYY",radiologyRequestArray)
    //     let nurseItems = [];
    //     for (let i = 0; i < nurseService.length; i++) {
    //         nurseItems = [
    //             ...nurseItems,
    //             {
    //                 serviceId: nurseService[i].serviceId,
    //                 serviceCode: nurseService[i].serviceCode,
    //                 requester: nurseService[i].requester,
    //                 requesterName: nurseService[i].requesterName,
    //                 serviceName: nurseService[i].serviceName,
    //                 status: nurseService[i].status,
    //             },
    //         ];
    //     }
    //     const params = {
    //         _id: id,
    //         nurseService: nurseItems,
    //     };
    //     // console.log("params", params);
    //     axios
    //         .put(updateIPR, params)
    //         .then((res) => {
    //             if (res.data.success) {
    //                 console.log("response after adding nurse Request", res.data);
    //                 window.location.reload(false);
    //             } else if (!res.data.success) {
    //                 setOpenNotification(true);
    //             }
    //         })
    //         .catch((e) => {
    //             console.log("error after adding Nurse Request", e);
    //             setOpenNotification(true);
    //             setErrorMsg("Error while adding the Nurse Request");
    //         });
    // };

    //for search patient
    const handlePatientSearch = (e) => {
        setSearchPatientQuery(e.target.value);
        if (e.target.value.length >= 3) {
            axios
                .get(getSearchedpatient + "/" + e.target.value)
                .then((res) => {
                    if (res.data.success) {
                        if (res.data.data.length > 0) {
                            console.log(res.data.data);
                            setpatientFoundSuccessfully(true);
                            setpatientFound(res.data.data);
                        } else {
                            setpatientFoundSuccessfully(false);
                            setpatientFound("");
                        }
                    }
                })
                .catch((e) => {
                    console.log("error after searching patient request", e);
                });
        }
    };

    function showPatientDetails() {
        openPatientDetailsDialog(false);
    }

    function handleAddPatient(i) {
        // setDialogOpen(true);
        console.log("selected banda : ", i)
        setPatientDetails(i);
        getPatientByInfo(i._id)
        openPatientDetailsDialog(true);

        const obj = {
            itemCode: i.itemCode,
        };

        setSelectedPatientArray((pervState) => [...pervState, obj]);
        setSearchPatientQuery("");
    }

    const getPatientByInfo = (id) => {
        axios
            .get(searchpatient + "/" + id)
            .then((res) => {
                if (res.data.success) 
                {
                    if (res.data.data) 
                    {
                        console.log("Response after getting EDR/IPR data : ", res.data.data);

                        setIsLoading(false);
                        setSelectedItem(res.data.data)
                        setenableAssessment(false)

                        Object.entries(res.data.data).map(([key, val]) => {
                            if (val && typeof val === "object") {
                                // if (key === "patientId") {
                                //     dispatch({ field: "patientId", value: val._id });
                                // } else if (key === "labRequest") {
                                //     dispatch({ field: "labRequestArray", value: val });
                                // } else if (key === "radiologyRequest") {
                                //     dispatch({ field: "radiologyRequestArray", value: val });
                                // } else if (key === "consultationNote") {
                                //     Object.entries(val).map(([key1, val1]) => {
                                //         if (key1 == "requester") {
                                //             dispatch({ field: "requester", value: val1._id });
                                //         } else {
                                //             dispatch({ field: key1, value: val1 });
                                //         }
                                //     });
                                //     dispatch({ field: "consultationNoteArray", value: val });
                                // } else if (key === "residentNotes") {
                                //     Object.entries(val).map(([key1, val1]) => {
                                //         if (key1 == "doctor") {
                                //             dispatch({ field: "doctor", value: val1._id });
                                //         } else {
                                //             dispatch({ field: key1, value: val1 });
                                //         }
                                //     });
                                //     dispatch({ field: "residentNoteArray", value: val });
                                // } else 
                                if (key === "pharmacyRequest") {
                                    dispatch({ field: "pharmacyRequestArray", value: val });
                                }
                                //  else if (key === "nurseService") {
                                //     dispatch({ field: "nurseService", value: val });
                                // }
                            } else {
                                dispatch({ field: key, value: val });
                            }
                        });
                    }
                }
                else {
                    setOpenNotification(true)
                    setErrorMsg("EDR/IPR not generated for patient")
                }
            })
            .catch((e) => {
                setOpenNotification(true)
                setErrorMsg(e)
            });
    };

    const TriageAssessment = () => {
        let path = `patientCare/triageAssessment`;
        props.history.push({
            pathname: path,
            state: {
                selectedItem: selectedItem,
            },
        });
    };

    if (openNotification) {
        setTimeout(() => {
            setOpenNotification(false);
            setErrorMsg("");
        }, 2000);
    }

    return (
        <div
            style={{
                backgroundColor: "#60d69f",
                position: "fixed",
                display: "flex",
                width: "100%",
                height: "100%",
                flexDirection: "column",
                flex: 1,
                overflowY: "scroll",
            }}
        >
            <Header />
            <div className="cPadding">
                <div className="subheader">
                    <div>
                        <img src={patientCareIcon} />
                        <h4>Patient Care</h4>
                    </div>

                    <div>
                        <Button
                            disabled={enableAssessment}
                            onClick={TriageAssessment}
                            style={styles.stylesForButton}
                            variant="contained"
                            color="primary"
                        >
                            Triage & Assessment
                        </Button>
                    </div>
                </div>
                <div className={`${'container-fluid'} ${classes.root}`} style={{ marginTop: "25px" }}>
                    <div className='row'>
                        <div className="col-md-10 col-sm-9 col-8" style={styles.textFieldPadding}>
                            <TextField
                                className="textInputStyle"
                                id="searchPatientQuery"
                                type="text"
                                variant="filled"
                                label="Search Patient by Name / MRN / National ID / Mobile Number/"
                                name={"searchPatientQuery"}
                                value={searchPatientQuery}
                                onChange={handlePatientSearch}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                    className: classes.input,
                                    classes: { input: classes.input },
                                    disableUnderline: true
                                }}
                            />
                        </div>

                        <div className='col-md-1 col-sm-2 col-2'
                            style={{
                                ...styles.textFieldPadding,
                            }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'white',
                                borderRadius: 5,
                                height: 55,
                            }}>
                                <img src={BarCode} style={{ width: 100, height: 70 }} />
                            </div>
                        </div>

                        <div
                            className="col-md-1 col-sm-1 col-2"
                            style={{
                                ...styles.textFieldPadding,
                            }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'white',
                                borderRadius: 5,
                                height: 55,
                            }}>
                                <img src={Fingerprint} style={{ maxWidth: 43, height: 43 }} />
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className="col-md-10 col-sm-9 col-8" style={styles.textFieldPadding}>
                            {searchPatientQuery ? (
                                <div
                                    style={{
                                        zIndex: 3,
                                        position: "absolute",
                                        width: "100%",
                                        marginTop: 5,
                                    }}
                                >
                                    <Paper>
                                        {patientFoundSuccessfull ? (
                                            patientFound && (
                                                <Table size="small">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>MRN Number</TableCell>
                                                            <TableCell>Patient Name</TableCell>
                                                            <TableCell>Gender</TableCell>
                                                            <TableCell>Age</TableCell>
                                                            <TableCell>Payment Method</TableCell>
                                                        </TableRow>
                                                    </TableHead>

                                                    <TableBody>
                                                        {patientFound.map((i) => {
                                                            return (
                                                                <TableRow
                                                                    key={i._id}
                                                                    onClick={() => handleAddPatient(i)}
                                                                    style={{ cursor: "pointer" }}
                                                                >
                                                                    <TableCell>{i.profileNo}</TableCell>
                                                                    <TableCell>
                                                                        {i.firstName + ` ` + i.lastName}
                                                                    </TableCell>
                                                                    <TableCell>{i.gender}</TableCell>
                                                                    <TableCell>{i.age}</TableCell>
                                                                    <TableCell>{i.paymentMethod}</TableCell>
                                                                </TableRow>
                                                            );
                                                        })}
                                                    </TableBody>
                                                </Table>
                                            )
                                        ) : (
                                                <h4
                                                    style={{ textAlign: "center" }}
                                                    onClick={() => setSearchPatientQuery("")}
                                                >
                                                    Patient Not Found
                                                </h4>
                                            )}
                                    </Paper>
                                </div>
                            ) : (
                                    undefined
                                )}
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
                    <h5 style={{ fontWeight: "bold", color: "white", marginTop: 25 }}>
                        Patient Details
                        </h5>
                    <div
                        // className="row"
                        style={{
                            marginTop: 25,
                            backgroundColor: "white",
                            borderRadius: 5,
                            width: "100%",
                        }}
                    >
                        <div
                            className="row"
                            style={{
                                backgroundColor: "#2C6DDD",
                                paddingLeft: 10,
                                height: "30%",
                                borderTopLeftRadius: 5,
                                borderTopRightRadius: 5,
                                paddingBottom: 10,
                                paddingTop: 10,
                                marginLeft: 0,
                                marginRight: 0
                            }}
                        >
                            <div
                                className={"col-md-3 col-sm-3 col-3"}
                                style={styles.headerHeading}
                            >
                                <h6 style={{ color: "white", fontWeight: "700" }}>
                                    Patient Info
                                    </h6>
                            </div>
                            <div
                                className={"col-md-3 col-sm-3 col-3"}
                                style={styles.headerHeading}
                            >
                                <h6 style={{ color: "white", fontWeight: "700" }}>Allergy</h6>
                            </div>
                            <div
                                className={"col-md-3 col-sm-3 col-3"}
                                style={styles.headerHeading}
                            >
                                <h6 style={{ color: "white", fontWeight: "700" }}>
                                    Medication
                                    </h6>
                            </div>
                            <div
                                className={"col-md-3 col-sm-3 col-3"}
                                style={styles.headerHeading}
                            >
                                <h6 style={{ color: "white", fontWeight: "700" }}>
                                    Diagnosis
                                    </h6>
                            </div>
                        </div>

                        <div
                            style={{
                                marginTop: 10,
                                paddingLeft: 10,
                                height: "80%",
                                paddingBottom: 10,
                            }}
                        >
                            <div
                                className={"col-md-3 col-sm-3 col-3"}
                                style={{ display: "flex", flexDirection: "column" }}
                            >
                                <span style={styles.headingStyles}>MRN</span>
                                <span style={styles.textStyles}>
                                    {patientDetails.profileNo ? patientDetails.profileNo : '-----'}
                                    {/* {patientDetails && patientDetails.profileNo} */}
                                </span>

                                <span style={styles.headingStyles}>Patient</span>
                                <span style={styles.textStyles}>
                                    {patientDetails.firstName && patientDetails.lastName ?
                                        patientDetails.firstName + " " + patientDetails.lastName : '---- ----'}
                                </span>

                                <span style={styles.headingStyles}>Gender</span>
                                <span style={styles.textStyles}>
                                    {patientDetails.gender ? patientDetails.gender : '----'}
                                </span>

                                <span style={styles.headingStyles}>Age</span>
                                <span style={styles.textStyles}>
                                    {patientDetails.age ? patientDetails.age : '--'}
                                </span>

                                <span style={styles.headingStyles}>Weight</span>
                                <span style={styles.textStyles}>
                                    {patientDetails.weight ? patientDetails.weight : '--'} kg
                                        </span>
                            </div>

                            <div className={"col-md-3 col-sm-3 col-3"} style={{}}>
                                {patientDetails &&
                                    patientDetails.drugAllergy.map((drug) => {
                                        return <h6 style={styles.textStyles}>{drug}</h6>;
                                    })}
                            </div>

                            <div className={"col-md-3 col-sm-3 col-3"} style={{}}>
                                {patientDetails &&
                                    patientDetails.drugAllergy.map((drug, index) => {
                                        return (
                                            <h6 style={styles.textStyles}>Medication {index + 1}</h6>
                                        );
                                    })}
                            </div>

                            <div className={"col-md-3 col-sm-3 col-3"} style={{}}>
                                {patientDetails &&
                                    patientDetails.drugAllergy.map((drug, index) => {
                                        return (
                                            <h6 style={styles.textStyles}>Diagnosis {index + 1}</h6>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div style={{
                        height: "20px",
                    }}
                    />
                    <div className={classesForTabs.root}>
                        <Tabs
                            classes={{
                                root: classesForTabs.root,
                                scroller: classesForTabs.scroller,
                            }}
                            value={value}
                            onChange={handleChange}
                            indicatorColor="null"
                            centered={false}
                            variant="scrollable"
                            fullWidth={true}
                        >
                            <Tab
                                style={{
                                    color: "white",
                                    borderRadius: 5,
                                    outline: "none",
                                    backgroundColor: value === 0 ? "#2c6ddd" : undefined,
                                }}
                                label="Consultantation Notes" //"Resident Doctor Notes"
                                disabled
                            />
                            <Tab
                                style={{
                                    color: "white",
                                    borderRadius: 5,
                                    outline: "none",
                                    backgroundColor: value === 1 ? "#2c6ddd" : undefined,
                                }}
                                label="Resident Doctor Notes"
                                disabled
                            />
                            <Tab
                                style={{
                                    color: "white",
                                    borderRadius: 5,
                                    outline: "none",
                                    backgroundColor: value === 2 ? "#2c6ddd" : undefined,
                                }}
                                label="Pharm"
                            />
                            <Tab
                                style={{
                                    color: "white",
                                    borderRadius: 5,
                                    outline: "none",
                                    backgroundColor: value === 3 ? "#2c6ddd" : undefined,
                                }}
                                label="Lab"
                                disabled
                            />
                            <Tab
                                style={{
                                    color: "white",
                                    borderRadius: 5,
                                    outline: "none",
                                    backgroundColor: value === 4 ? "#2c6ddd" : undefined,
                                }}
                                label="Rad"
                                disabled
                            />
                            <Tab
                                style={{
                                    color: "white",
                                    borderRadius: 5,
                                    outline: "none",
                                    backgroundColor: value === 5 ? "#2c6ddd" : undefined,
                                }}
                                label="In Patient Request"
                                disabled
                            />
                        </Tabs>
                    </div>

                    {/* {value === 0 ? (
                        <div
                            style={{ flex: 4, display: "flex", flexDirection: "column" }}
                            className="container-fluid"
                        >
                            <div className="row" style={{ marginTop: "20px" }}>
                                {consultationNoteArray !== 0 ? (
                                    <CustomTable
                                        tableData={consultationNoteArray}
                                        tableDataKeys={tableDataKeysForConsultation}
                                        tableHeading={tableHeadingForConsultation}
                                        handleView={viewItem}
                                        action={actions}
                                        borderBottomColor={"#60d69f"}
                                        borderBottomWidth={20}
                                    />
                                ) : (
                                        undefined
                                    )}
                            </div>

                            <div className="row" style={{ marginBottom: "25px" }}>
                                <div className="col-md-6 col-sm-6 col-6">
                                    <img
                                        onClick={() => props.history.goBack()}
                                        src={Back}
                                        style={{ width: 45, height: 35, cursor: "pointer" }}
                                    />
                                </div>
                                <div className="col-md-6 col-sm-6 col-6 d-flex justify-content-end">
                                    <Button
                                        onClick={() => setOpenAddConsultDialog(true)}
                                        style={styles.stylesForButton}
                                        variant="contained"
                                        color="primary"
                                    >
                                        <img className="icon-style" src={plus_icon} />
                        &nbsp;&nbsp;
                        <strong style={{ fontSize: "12px" }}>
                                            Add New Consultation
                        </strong>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : value === 1 ? (
                        <div
                            style={{ flex: 4, display: "flex", flexDirection: "column" }}
                            className=" container-fluid"
                        >
                            <div className="row" style={{ marginTop: "20px" }}>
                                {residentNoteArray !== 0 ? (
                                    <CustomTable
                                        tableData={residentNoteArray}
                                        tableDataKeys={tableDataKeysForResident}
                                        tableHeading={tableHeadingForResident}
                                        handleView={viewItem}
                                        action={actions}
                                        borderBottomColor={"#60d69f"}
                                        borderBottomWidth={20}
                                    />
                                ) : (
                                        undefined
                                    )}
                            </div>

                            <div className="row" style={{ marginBottom: "25px" }}>
                                <div className="col-md-6 col-sm-6 col-6">
                                    <img
                                        onClick={() => props.history.goBack()}
                                        src={Back}
                                        style={{ width: 45, height: 35, cursor: "pointer" }}
                                    />
                                </div>
                            </div>
                        </div>
                    ) :  */}
                    {value === 2 ? (
                        <div
                            style={{ flex: 4, display: "flex", flexDirection: "column" }}
                            className="container-fluid"
                        >
                            <div className="row" style={{ marginTop: "20px" }}>
                                {pharmacyRequestArray !== 0 ? (
                                    <CustomTable
                                        tableData={pharmacyRequestArray}
                                        tableDataKeys={tableDataKeysForPharmacy}
                                        tableHeading={tableHeadingForPharmacy}
                                        handleView={viewItem}
                                        action={actions}
                                        borderBottomColor={"#60d69f"}
                                        borderBottomWidth={20}
                                    />
                                ) : (
                                        undefined
                                    )}
                            </div>
                        </div>
                        // ) 
                        // : value === 3 ? (
                        //     <div
                        //         style={{ flex: 4, display: "flex", flexDirection: "column" }}
                        //         // className={`container ${classes.root}`}
                        //         className="container-fluid"
                        //     >
                        //         <div style={{ marginTop: "20px" }} className="row">
                        //             <div
                        //                 className="col-md-12 col-sm-12 col-12"
                        //                 style={{
                        //                     ...styles.inputContainerForTextField,
                        //                     ...styles.textFieldPadding,
                        //                 }}
                        //             >
                        //                 <AutoComplete
                        //                     id="tags-outlined"
                        //                     getOptionLabel={(option) => option.title}
                        //                     filterSelectedOptions
                        //                     renderInput={(params) => (
                        //                         <TextField
                        //                             {...params}
                        //                             variant="outlined"
                        //                             label="Service Name"
                        //                             placeholder="Search Service Name"
                        //                         />
                        //                     )}
                        //                 />
                        //             </div>
                        //         </div>

                        //         {searchQuery ? (
                        //             // <Paper style={{ width: ' 100%', marginTop: 20,  }} elevation={3}>
                        //             <div style={{ zIndex: 10 }}>
                        //                 <Paper>
                        //                     {itemFoundSuccessfull ? (
                        //                         itemFound && (
                        //                             <Table size="small">
                        //                                 <TableHead>
                        //                                     <TableRow>
                        //                                         <TableCell>Service Name</TableCell>
                        //                                         <TableCell>Service Number</TableCell>
                        //                                         <TableCell>Price</TableCell>
                        //                                         <TableCell align="center">
                        //                                             Description
                        //                                             </TableCell>
                        //                                     </TableRow>
                        //                                 </TableHead>

                        //                                 <TableBody>
                        //                                     {itemFound.map((i, index) => {
                        //                                         return (
                        //                                             <TableRow
                        //                                                 key={i.serviceNo}
                        //                                                 onClick={() => handleAddItem(i)}
                        //                                                 style={{ cursor: "pointer" }}
                        //                                             >
                        //                                                 <TableCell>{i.name}</TableCell>
                        //                                                 <TableCell>{i.serviceNo}</TableCell>
                        //                                                 <TableCell>{i.price}</TableCell>
                        //                                                 <TableCell>{i.description}</TableCell>
                        //                                             </TableRow>
                        //                                         );
                        //                                     })}
                        //                                 </TableBody>
                        //                             </Table>
                        //                         )
                        //                     ) : (
                        //                             <h4
                        //                                 style={{ textAlign: "center" }}
                        //                                 onClick={() => setSearchQuery("")}
                        //                             >
                        //                                 Service Not Found
                        //                             </h4>
                        //                         )}
                        //                 </Paper>
                        //             </div>
                        //         ) : (
                        //                 undefined
                        //             )}

                        //         <div style={{ marginTop: "20px" }} className="row">
                        //             <div
                        //                 className="col-md-10 col-sm-10 col-6"
                        //                 style={{
                        //                     ...styles.inputContainerForTextField,
                        //                     ...styles.textFieldPadding,
                        //                 }}
                        //             >
                        //                 <TextField
                        //                     required
                        //                     disabled
                        //                     label="Selected Service"
                        //                     name={"labServiceName"}
                        //                     value={labServiceName}
                        //                     // error={labServiceName === '' && isFormSubmitted}
                        //                     onChange={onChangeValue}
                        //                     className="textInputStyle"
                        //                     variant="filled"
                        //                     InputProps={{
                        //                         className: classes.input,
                        //                         classes: { input: classes.input },
                        //                     }}
                        //                 />
                        //             </div>
                        //             <div className="col-md-2 col-sm-2 col-6">
                        //                 <Button
                        //                     style={{
                        //                         ...styles.stylesForButton,
                        //                         marginTop: "25px",
                        //                         backgroundColor: "#ad6bbf",
                        //                     }}
                        //                     disabled={!addLabRequest}
                        //                     onClick={addSelectedLabItem}
                        //                     variant="contained"
                        //                     color="primary"
                        //                     fullWidth
                        //                 >
                        //                     Add
                        //   </Button>
                        //             </div>
                        //         </div>

                        //         <div className="row" style={{ marginTop: "20px" }}>
                        //             {labRequestArray !== 0 ? (
                        //                 <CustomTable
                        //                     tableData={labRequestArray}
                        //                     tableDataKeys={tableDataKeysForLabReq}
                        //                     tableHeading={tableHeadingForLabReq}
                        //                     handleView={viewItem}
                        //                     action={actions}
                        //                     borderBottomColor={"#60d69f"}
                        //                     borderBottomWidth={20}
                        //                 />
                        //             ) : (
                        //                     undefined
                        //                 )}
                        //         </div>

                        //         <div className="row" style={{ marginBottom: "25px" }}>
                        //             <div className="col-md-6 col-sm-6 col-6">
                        //                 <img
                        //                     onClick={() => props.history.goBack()}
                        //                     src={Back}
                        //                     style={{ width: 45, height: 35, cursor: "pointer" }}
                        //                 />
                        //             </div>
                        //             <div className="col-md-6 col-sm-6 col-6 d-flex justify-content-end">
                        //                 <Button
                        //                     onClick={saveLabReq}
                        //                     style={styles.stylesForButton}
                        //                     variant="contained"
                        //                     color="primary"
                        //                 >
                        //                     <strong style={{ fontSize: "12px" }}>Save</strong>
                        //                 </Button>
                        //             </div>
                        //         </div>
                        //     </div>
                        // ) : value === 4 ? (
                        //     <div
                        //         style={{ flex: 4, display: "flex", flexDirection: "column" }}
                        //         // className={`container ${classes.root}`}
                        //         className="container-fluid"
                        //     >
                        //         <div style={{ marginTop: "20px" }} className="row">
                        //             <div
                        //                 className="col-md-12 col-sm-12 col-12"
                        //                 style={{
                        //                     ...styles.inputContainerForTextField,
                        //                     ...styles.textFieldPadding,
                        //                 }}
                        //             >
                        //                 <TextField
                        //                     required
                        //                     label="Service Name"
                        //                     name={"searchRadioQuery"}
                        //                     value={searchRadioQuery}
                        //                     // error={searchRadioQuery === '' && isFormSubmitted}
                        //                     onChange={handleRadioSearch}
                        //                     className="textInputStyle"
                        //                     variant="filled"
                        //                     InputProps={{
                        //                         className: classes.input,
                        //                         classes: { input: classes.input },
                        //                     }}
                        //                 />
                        //             </div>
                        //         </div>

                        //         {searchRadioQuery ? (
                        //             // <Paper style={{ width: ' 100%', marginTop: 20,  }} elevation={3}>
                        //             <div style={{ zIndex: 10 }}>
                        //                 <Paper>
                        //                     {radioItemFoundSuccessfull ? (
                        //                         radioItemFound && (
                        //                             <Table size="small">
                        //                                 <TableHead>
                        //                                     <TableRow>
                        //                                         <TableCell>Service Name</TableCell>
                        //                                         <TableCell>Service Number</TableCell>
                        //                                         <TableCell>Price</TableCell>
                        //                                         <TableCell align="center">
                        //                                             Description
                        //               </TableCell>
                        //                                     </TableRow>
                        //                                 </TableHead>

                        //                                 <TableBody>
                        //                                     {radioItemFound.map((i, index) => {
                        //                                         return (
                        //                                             <TableRow
                        //                                                 key={i.serviceNo}
                        //                                                 onClick={() => handleAddRadioItem(i)}
                        //                                                 style={{ cursor: "pointer" }}
                        //                                             >
                        //                                                 <TableCell>{i.name}</TableCell>
                        //                                                 <TableCell>{i.serviceNo}</TableCell>
                        //                                                 <TableCell>{i.price}</TableCell>
                        //                                                 <TableCell>{i.description}</TableCell>
                        //                                             </TableRow>
                        //                                         );
                        //                                     })}
                        //                                 </TableBody>
                        //                             </Table>
                        //                         )
                        //                     ) : (
                        //                             <h4
                        //                                 style={{ textAlign: "center" }}
                        //                                 onClick={() => setSearchRadioQuery("")}
                        //                             >
                        //                                 Service Not Found
                        //                             </h4>
                        //                         )}
                        //                 </Paper>
                        //             </div>
                        //         ) : (
                        //                 undefined
                        //             )}

                        //         <div style={{ marginTop: "20px" }} className="row">
                        //             <div
                        //                 className="col-md-10 col-sm-10 col-6"
                        //                 style={{
                        //                     ...styles.inputContainerForTextField,
                        //                     ...styles.textFieldPadding,
                        //                 }}
                        //             >
                        //                 <TextField
                        //                     required
                        //                     disabled
                        //                     label="Selected Service"
                        //                     name={"radioServiceName"}
                        //                     value={radioServiceName}
                        //                     // error={radioServiceName === '' && isFormSubmitted}
                        //                     onChange={onChangeValue}
                        //                     className="textInputStyle"
                        //                     variant="filled"
                        //                     InputProps={{
                        //                         className: classes.input,
                        //                         classes: { input: classes.input },
                        //                     }}
                        //                 />
                        //             </div>
                        //             <div className="col-md-2 col-sm-2 col-6">
                        //                 <Button
                        //                     style={{
                        //                         ...styles.stylesForButton,
                        //                         marginTop: "25px",
                        //                         backgroundColor: "#ad6bbf",
                        //                     }}
                        //                     disabled={!addRadioRequest}
                        //                     onClick={addSelectedRadioItem}
                        //                     variant="contained"
                        //                     color="primary"
                        //                     fullWidth
                        //                 >
                        //                     Add
                        //   </Button>
                        //             </div>
                        //         </div>

                        //         <div className="row" style={{ marginTop: "20px" }}>
                        //             {radiologyRequestArray !== 0 ? (
                        //                 <CustomTable
                        //                     tableData={radiologyRequestArray}
                        //                     tableDataKeys={tableDataKeysForRadiology}
                        //                     tableHeading={tableHeadingForRadiology}
                        //                     handleView={viewItem}
                        //                     action={actions}
                        //                     borderBottomColor={"#60d69f"}
                        //                     borderBottomWidth={20}
                        //                 />
                        //             ) : (
                        //                     undefined
                        //                 )}
                        //         </div>

                        //         <div className="row" style={{ marginBottom: "25px" }}>
                        //             <div className="col-md-6 col-sm-6 col-6">
                        //                 <img
                        //                     onClick={() => props.history.goBack()}
                        //                     src={Back}
                        //                     style={{ width: 45, height: 35, cursor: "pointer" }}
                        //                 />
                        //             </div>
                        //             <div className="col-md-6 col-sm-6 col-6 d-flex justify-content-end">
                        //                 <Button
                        //                     onClick={saveRadioReq}
                        //                     style={styles.stylesForButton}
                        //                     variant="contained"
                        //                     color="primary"
                        //                 >
                        //                     <strong style={{ fontSize: "12px" }}>Save</strong>
                        //                 </Button>
                        //             </div>
                        //         </div>
                        //     </div>
                        // ) : value === 5 ? (
                        //     <div
                        //         style={{ flex: 4, display: "flex", flexDirection: "column" }}
                        //         // className={`container ${classes.root}`}
                        //         className="container-fluid"
                        //     >
                        //         <div style={{ marginTop: "20px" }} className="row">
                        //             <div
                        //                 className="col-md-12 col-sm-12 col-12"
                        //                 style={{
                        //                     ...styles.inputContainerForTextField,
                        //                     ...styles.textFieldPadding,
                        //                 }}
                        //             >
                        //                 <TextField
                        //                     required
                        //                     label="Service Name"
                        //                     name={"searchNurseQuery"}
                        //                     value={searchNurseQuery}
                        //                     // error={searchNurseQuery === '' && isFormSubmitted}
                        //                     onChange={handleNurseSearch}
                        //                     className="textInputStyle"
                        //                     variant="filled"
                        //                     InputProps={{
                        //                         className: classes.input,
                        //                         classes: { input: classes.input },
                        //                     }}
                        //                 />
                        //             </div>
                        //         </div>
                        //         {searchNurseQuery ? (
                        //             // <Paper style={{ width: ' 100%', marginTop: 20,  }} elevation={3}>
                        //             <div style={{ zIndex: 10 }}>
                        //                 <Paper>
                        //                     {nurseItemFoundSuccessfull ? (
                        //                         nurseItemFound && (
                        //                             <Table size="small">
                        //                                 <TableHead>
                        //                                     <TableRow>
                        //                                         <TableCell>Service Name</TableCell>
                        //                                         <TableCell>Service Number</TableCell>
                        //                                         <TableCell>Price</TableCell>
                        //                                         <TableCell align="center">
                        //                                             Description
                        //               </TableCell>
                        //                                     </TableRow>
                        //                                 </TableHead>
                        //                                 <TableBody>
                        //                                     {nurseItemFound.map((i, index) => {
                        //                                         return (
                        //                                             <TableRow
                        //                                                 key={i.serviceNo}
                        //                                                 onClick={() => handleAddNurseItem(i)}
                        //                                                 style={{ cursor: "pointer" }}
                        //                                             >
                        //                                                 <TableCell>{i.name}</TableCell>
                        //                                                 <TableCell>{i.serviceNo}</TableCell>
                        //                                                 <TableCell>{i.price}</TableCell>
                        //                                                 <TableCell>{i.description}</TableCell>
                        //                                             </TableRow>
                        //                                         );
                        //                                     })}
                        //                                 </TableBody>
                        //                             </Table>
                        //                         )
                        //                     ) : (
                        //                             <h4
                        //                                 style={{ textAlign: "center" }}
                        //                                 onClick={() => setSearchNurseQuery("")}
                        //                             >
                        //                                 Service Not Found
                        //                             </h4>
                        //                         )}
                        //                 </Paper>
                        //             </div>
                        //         ) : (
                        //                 undefined
                        //             )}
                        //         <div style={{ marginTop: "20px" }} className="row">
                        //             <div
                        //                 className="col-md-10 col-sm-10 col-6"
                        //                 style={{
                        //                     ...styles.inputContainerForTextField,
                        //                     ...styles.textFieldPadding,
                        //                 }}
                        //             >
                        //                 <TextField
                        //                     required
                        //                     label="Selected Service"
                        //                     name={"nurseServiceName"}
                        //                     value={nurseServiceName}
                        //                     // error={nurseServiceName === '' && isFormSubmitted}
                        //                     onChange={onChangeValue}
                        //                     className="textInputStyle"
                        //                     variant="filled"
                        //                     InputProps={{
                        //                         className: classes.input,
                        //                         classes: { input: classes.input },
                        //                     }}
                        //                 />
                        //             </div>
                        //             <div className="col-md-2 col-sm-2 col-6">
                        //                 <Button
                        //                     style={{
                        //                         ...styles.stylesForButton,
                        //                         marginTop: "25px",
                        //                         backgroundColor: "#ad6bbf",
                        //                     }}
                        //                     disabled={!addNurseRequest}
                        //                     onClick={addSelectedNurseItem}
                        //                     variant="contained"
                        //                     color="primary"
                        //                     fullWidth
                        //                 >
                        //                     Add
                        //   </Button>
                        //             </div>
                        //         </div>
                        //         <div className="row" style={{ marginTop: "20px" }}>
                        //             {nurseService !== 0 ? (
                        //                 <CustomTable
                        //                     tableData={nurseService}
                        //                     tableDataKeys={tableDataKeysForNurse}
                        //                     tableHeading={tableHeadingForNurse}
                        //                     handleView={viewItem}
                        //                     action={actions}
                        //                     borderBottomColor={"#60D69F"}
                        //                     borderBottomWidth={20}
                        //                 />
                        //             ) : (
                        //                     undefined
                        //                 )}
                        //         </div>
                        //         <div className="row" style={{ marginBottom: "25px" }}>
                        //             <div className="col-md-6 col-sm-6 col-6">
                        //                 <img
                        //                     onClick={() => props.history.goBack()}
                        //                     src={Back}
                        //                     style={{ width: 45, height: 35, cursor: "pointer" }}
                        //                 />
                        //             </div>
                        //             <div className="col-md-6 col-sm-6 col-6 d-flex justify-content-end">
                        //                 <Button
                        //                     onClick={saveNurseReq}
                        //                     style={styles.stylesForButton}
                        //                     variant="contained"
                        //                     color="primary"
                        //                 >
                        //                     <strong style={{ fontSize: "12px" }}>Save</strong>
                        //                 </Button>
                        //             </div>
                        //         </div>
                        //     </div>
                    )
                        : (
                            undefined
                        )}

                    {openItemDialog ? (
                        <ViewSingleRequest
                            item={item}
                            openItemDialog={openItemDialog}
                            viewItem={viewItem}
                        />
                    ) : (
                            undefined
                        )}

                </div>
                {/* 
                <Dialog
                    aria-labelledby="form-dialog-title"
                    open={openAddConsultDialog}
                    maxWidth="xl"
                    fullWidth={true}
                >
                    <DialogContent style={{ backgroundColor: "#31e2aa" }}>
                        <DialogTitle id="simple-dialog-title" style={{ color: "white" }}>
                            Add Consultation Note
                    </DialogTitle>
                        <div className={`container-fluid ${classes.root}`}>
                            <div className="row">
                                <div
                                    className="col-md-12 col-sm-12 col-12"
                                    style={{
                                        ...styles.inputContainerForTextField,
                                        ...styles.textFieldPadding,
                                    }}
                                >
                                    <TextField
                                        required
                                        label="Description"
                                        name={"description"}
                                        value={description}
                                        error={description === "" && isFormSubmitted}
                                        onChange={onChangeValue}
                                        className="textInputStyle"
                                        variant="filled"
                                        InputProps={{
                                            className: classes.input,
                                            classes: { input: classes.input },
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div
                                    className="col-md-12"
                                    style={{
                                        ...styles.inputContainerForTextField,
                                        ...styles.textFieldPadding,
                                    }}
                                >
                                    <TextField
                                        required
                                        label="Consultation Note"
                                        name={"consultationNotes"}
                                        value={consultationNotes}
                                        error={consultationNotes === "" && isFormSubmitted}
                                        onChange={onChangeValue}
                                        className="textInputStyle"
                                        variant="filled"
                                        InputProps={{
                                            className: classes.input,
                                            classes: { input: classes.input },
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div
                                    className="col-md-6 col-sm-6 col-6"
                                    style={{
                                        ...styles.inputContainerForTextField,
                                        ...styles.textFieldPadding,
                                    }}
                                >
                                    <TextField
                                        required
                                        disabled
                                        label="Date"
                                        name={"date"}
                                        value={date}
                                        // error={date === '' && isFormSubmitted}
                                        onChange={onChangeValue}
                                        className="textInputStyle"
                                        variant="filled"
                                        InputProps={{
                                            className: classes.input,
                                            classes: { input: classes.input },
                                        }}
                                    />
                                </div>
                                <div
                                    className="col-md-6 col-sm-6 col-6"
                                    style={{
                                        ...styles.inputContainerForTextField,
                                        ...styles.textFieldPadding,
                                    }}
                                >
                                    <TextField
                                        required
                                        disabled
                                        label="Requester"
                                        name={"requester"}
                                        value={requester}
                                        // error={requester === '' && isFormSubmitted}
                                        onChange={onChangeValue}
                                        className="textInputStyle"
                                        variant="filled"
                                        InputProps={{
                                            className: classes.input,
                                            classes: { input: classes.input },
                                        }}
                                    />
                                </div>
                            </div>

                            <div
                                style={{ display: "flex", justifyContent: "space-between" }}
                            >
                                <div style={{ marginTop: "2%", marginBottom: "2%" }}>
                                    <Button
                                        onClick={() => hideDialog()}
                                        style={styles.stylesForButton}
                                        variant="contained"
                                    >
                                        <strong>Cancel</strong>
                                    </Button>
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        marginTop: "2%",
                                        marginBottom: "2%",
                                    }}
                                >
                                    <Button
                                        style={{
                                            color: "white",
                                            cursor: "pointer",
                                            borderRadius: 5,
                                            backgroundColor: "#2c6ddd",
                                            width: "140px",
                                            height: "50px",
                                            outline: "none",
                                            paddingLeft: 30,
                                            paddingRight: 30,
                                        }}
                                        // disabled={!validateItemsForm()}
                                        onClick={addConsultRequest}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Add Note
                    </Button>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

                <Dialog
                    aria-labelledby="form-dialog-title"
                    open={openAddResidentDialog}
                    maxWidth="xl"
                    fullWidth={true}
                >
                    <DialogContent style={{ backgroundColor: "#31e2aa" }}>
                        <DialogTitle id="simple-dialog-title" style={{ color: "white" }}>
                            Add Resident Note
              </DialogTitle>
                        <div className="container-fluid">
                            <div className="row">
                                <div
                                    className="col-md-12 col-sm-12 col-12"
                                    style={styles.inputContainerForTextField}
                                >
                                    <InputLabelComponent>Description*</InputLabelComponent>
                                    <input
                                        style={styles.inputField}
                                        type="text"
                                        placeholder="Enter Your description"
                                        name={"rdescription"}
                                        value={rdescription}
                                        onChange={onChangeValue}
                                        className="textInputStyle"
                                    />
                                    <ErrorMessage
                                        name={rdescription}
                                        isFormSubmitted={isFormSubmitted}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div
                                    className="col-md-12"
                                    style={styles.inputContainerForTextField}
                                >
                                    <InputLabelComponent>Note*</InputLabelComponent>
                                    <input
                                        style={styles.inputField}
                                        type="text"
                                        placeholder="Add your note here..."
                                        name={"note"}
                                        value={note}
                                        onChange={onChangeValue}
                                        className="textInputStyle"
                                    />
                                    <ErrorMessage
                                        name={note}
                                        isFormSubmitted={isFormSubmitted}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div
                                    className="col-md-6 col-sm-6 col-6"
                                    style={styles.inputContainerForTextField}
                                >
                                    <InputLabelComponent>Date*</InputLabelComponent>
                                    <input
                                        disabled
                                        style={styles.inputField}
                                        type="text"
                                        placeholder="Date"
                                        name={"date"}
                                        value={date}
                                        onChange={onChangeValue}
                                        className="textInputStyle"
                                    />
                                </div>
                                <div
                                    className="col-md-6 col-sm-6 col-6"
                                    style={styles.inputContainerForTextField}
                                >
                                    <InputLabelComponent>Doctor*</InputLabelComponent>
                                    <input
                                        disabled
                                        style={styles.inputField}
                                        type="text"
                                        placeholder="Doctor"
                                        name={"doctor"}
                                        value={doctor}
                                        onChange={onChangeValue}
                                        className="textInputStyle"
                                    />
                                </div>
                            </div>
                            <div
                                style={{ display: "flex", justifyContent: "space-between" }}
                            >
                                <div style={{ marginTop: "2%", marginBottom: "2%" }}>
                                    <Button
                                        onClick={() => hideDialog()}
                                        style={styles.stylesForButton}
                                        variant="contained"
                                    >
                                        <strong>Cancel</strong>
                                    </Button>
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        marginTop: "2%",
                                        marginBottom: "2%",
                                    }}
                                >
                                    <Button
                                        style={{
                                            color: "white",
                                            cursor: "pointer",
                                            borderRadius: 5,
                                            backgroundColor: "#2c6ddd",
                                            width: "140px",
                                            height: "50px",
                                            outline: "none",
                                            paddingLeft: 30,
                                            paddingRight: 30,
                                        }}
                                        onClick={addResidentRequest}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Add Note
                    </Button>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

                <Dialog
                    aria-labelledby="form-dialog-title"
                    open={openAddConsultDialog}
                    maxWidth="xl"
                    fullWidth={true}
                >
                    <DialogContent style={{ backgroundColor: "#31e2aa" }}>
                        <DialogTitle id="simple-dialog-title" style={{ color: "white" }}>
                            Add Consultation Note
              </DialogTitle>
                        <div className={`container-fluid ${classes.root}`}>
                            <div className="row">
                                <div
                                    className="col-md-12 col-sm-12 col-12"
                                    style={{
                                        ...styles.inputContainerForTextField,
                                        ...styles.textFieldPadding,
                                    }}
                                >
                                    <TextField
                                        required
                                        label="Description"
                                        name={"description"}
                                        value={description}
                                        error={description === "" && isFormSubmitted}
                                        onChange={onChangeValue}
                                        className="textInputStyle"
                                        variant="filled"
                                        InputProps={{
                                            className: classes.input,
                                            classes: { input: classes.input },
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div
                                    className="col-md-12"
                                    style={{
                                        ...styles.inputContainerForTextField,
                                        ...styles.textFieldPadding,
                                    }}
                                >
                                    <TextField
                                        required
                                        label="Consultation Note"
                                        name={"consultationNotes"}
                                        value={consultationNotes}
                                        error={consultationNotes === "" && isFormSubmitted}
                                        onChange={onChangeValue}
                                        className="textInputStyle"
                                        variant="filled"
                                        InputProps={{
                                            className: classes.input,
                                            classes: { input: classes.input },
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div
                                    className="col-md-6 col-sm-6 col-6"
                                    style={{
                                        ...styles.inputContainerForTextField,
                                        ...styles.textFieldPadding,
                                    }}
                                >
                                    <TextField
                                        required
                                        disabled
                                        label="Date"
                                        name={"date"}
                                        value={date}
                                        // error={date === '' && isFormSubmitted}
                                        onChange={onChangeValue}
                                        className="textInputStyle"
                                        variant="filled"
                                        InputProps={{
                                            className: classes.input,
                                            classes: { input: classes.input },
                                        }}
                                    />
                                </div>
                                <div
                                    className="col-md-6 col-sm-6 col-6"
                                    style={{
                                        ...styles.inputContainerForTextField,
                                        ...styles.textFieldPadding,
                                    }}
                                >
                                    <TextField
                                        required
                                        disabled
                                        label="Requester"
                                        name={"requester"}
                                        value={requester}
                                        // error={requester === '' && isFormSubmitted}
                                        onChange={onChangeValue}
                                        className="textInputStyle"
                                        variant="filled"
                                        InputProps={{
                                            className: classes.input,
                                            classes: { input: classes.input },
                                        }}
                                    />
                                </div>
                            </div>

                            <div
                                style={{ display: "flex", justifyContent: "space-between" }}
                            >
                                <div style={{ marginTop: "2%", marginBottom: "2%" }}>
                                    <Button
                                        onClick={() => hideDialog()}
                                        style={styles.stylesForButton}
                                        variant="contained"
                                    >
                                        <strong>Cancel</strong>
                                    </Button>
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        marginTop: "2%",
                                        marginBottom: "2%",
                                    }}
                                >
                                    <Button
                                        style={{
                                            color: "white",
                                            cursor: "pointer",
                                            borderRadius: 5,
                                            backgroundColor: "#2c6ddd",
                                            width: "140px",
                                            height: "50px",
                                            outline: "none",
                                            paddingLeft: 30,
                                            paddingRight: 30,
                                        }}
                                        // disabled={!validateItemsForm()}
                                        onClick={addConsultRequest}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Add Note
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog> */}
                <div className="container-fluid" style={{ marginBottom: "15px", marginTop: '25px' }}>
                    <div className="row">
                        <img
                            onClick={() => props.history.goBack()}
                            src={Back}
                            style={{ width: 45, height: 35, cursor: "pointer" }}
                        />
                    </div>
                </div>

                <Notification msg={errorMsg} open={openNotification} />
            </div>
        </div>
    );
}
export default PatientCare;