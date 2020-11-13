import React, { useEffect, useState, useReducer } from 'react'
import cookie from "react-cookies";
import Header from "../../components/Header/Header";
import VemIcon from "../../assets/img/Pre-Approval.png";
import view_all from "../../assets/img/Eye.png";
import Back from "../../assets/img/Back_Arrow.png";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

let matches;

const styles = {
    textfieldPadding: {
        paddingRight: '5px',
        paddingLeft: '5px'
    },
    inputContainer: {
        marginTop: 10,
    },
    stylesForButton: {
        cursor: 'pointer',
        borderRadius: '5',
        height: '50px',
        width: '150px',
        borderWidth: 0,
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#2c6ddd'
    }
}

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
            borderRadius: 5,
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
            display: matches ? " " : "none",
        },
        "& .MuiFormLabel-root": {
            fontSize: "12px",
            paddingRight: "45px",
        },
    },
    label: {
        "&$focusedLabel": {
            color: "red",
            display: "none",
        },
    },
}));

const vendorNameArray = [
    {
        key: "vendor1",
        value: "Vendor 1",
    },
    {
        key: "vendor2",
        value: "Vendor 2",
    },
    {
        key: "vendor3",
        value: "Vendor 3",
    },
];


function Vem(props) {
    const classes = useStyles();
    matches = useMediaQuery("(min-width:600px)");

    const initialState = {
        vendorName: '',

        // Quality section fields
        qualityRateNurse: '',
        qualityRateParmacist: '',
        avgQualityRate100: '',
        avgQualityRate35: '',
        complianceBarcode: '',
        qualityRate45: '',

        // Price section fields
        avgPurchasedPrice: '',
        avgSellingPrice: '',
        avgProfitMargin: '',
        PPMinusSP: '',
        PPMinusSP10: '',
        purchasedPrice: '',
        purchasedPrice25: '',
        priceRate35: '',

        // Delivery time fields
        scheduledLeadTime: '',
        avgLeadTime: '',
        avgLeadTimePercent: '',
        totalAvgLeadTime: '',
        lastLeadTime1: '',
        lastLeadTime2: '',
        lastLeadTime3: '',
        leadTimeMarks: '',
        complianceDelivery: '',
        complianceDelivery10: ''
    }

    function reducer(state, { field, value }) {
        return {
            ...state,
            [field]: value,
        };
    }
    const [state, dispatch] = useReducer(reducer, initialState);

    const {
        vendorName,

        // Quality section fields
        qualityRateNurse,
        qualityRateParmacist,
        avgQualityRate100,
        avgQualityRate35,
        complianceBarcode,
        qualityRate45,

        // Price section fields
        avgPurchasedPrice,
        avgSellingPrice,
        avgProfitMargin,
        PPMinusSP,
        PPMinusSP10,
        purchasedPrice,
        purchasedPrice25,
        priceRate35,

        // Delivery time fields
        scheduledLeadTime,
        avgLeadTime,
        avgLeadTimePercent,
        totalAvgLeadTime,
        lastLeadTime1,
        lastLeadTime2,
        lastLeadTime3,
        leadTimeMarks,
        complianceDelivery,
        complianceDelivery10
    } = state

    const classesForTabs = useStylesForTabs();

    const [currentUser] = useState(cookie.load("current_user"));
    const [value, setValue] = useState(0);

    useEffect(() => {
        console.log("Current user ", cookie.load("current_user"))
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const onChangeValue = (e) => {
        dispatch({ field: e.target.name, value: e.target.value })
    }

    const onNextClick = () => {
        setValue(value + 1);
    };

    const onTotalRateClick = () => {
        let path = 'vem/totalRates'
        props.history.push({
            pathname: path,
            state: {
            },
        })
    };

    const onSubmit = () => {

    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                position: "fixed",
                width: "100%",
                height: "100%",
                backgroundColor: "#60d69f",
                overflowY: "scroll",
            }}
        >

            <Header history={props.history} />
            <div className="cPadding">
                <div className="subheader">
                    <div style={{marginLeft:'-10px'}}>
                        <img src={VemIcon} />
                        <h4>
                            Vendor Evaluation
                        </h4>
                    </div>

                    <Button
                        onClick={onTotalRateClick}
                        variant="contained"
                        color="primary"
                        style={{ ...styles.stylesForButton, marginRight: '5px' }}
                    >
                        <img className="icon-view" src={view_all} />
                        &nbsp;&nbsp;
                        <strong>Total Rate</strong>
                    </Button>
                </div>

                <div style={{ width: "auto", height: "30px" }} />

                <div className={`${"container-fluid"} ${classes.root}`}>
                    <div className='row'>
                        <div className='col-md-12 col-sm-12 col-12'
                            style={{
                                ...styles.textfieldPadding
                            }}
                        >
                            <TextField
                                select
                                fullWidth
                                id="vendorName"
                                name="vendorName"
                                value={vendorName}
                                onChange={onChangeValue}
                                label="Vendor Name"
                                variant="filled"
                                className="dropDownStyle"
                                InputProps={{
                                    className: classes.input,
                                    classes: { input: classes.input },
                                    disableUnderline: true
                                }}
                            >
                                <MenuItem value="">None</MenuItem>

                                {vendorNameArray.map((val) => {
                                    return (
                                        <MenuItem key={val.key} value={val.key}>
                                            {val.value}
                                        </MenuItem>
                                    );
                                })}
                            </TextField>
                        </div>
                    </div>
                </div>

                <div style={{ width: "auto", height: "20px" }} />

                <div className='container-fluid'>
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
                        >
                            <Tab
                                style={{
                                    color: "white",
                                    borderRadius: 5,
                                    outline: "none",
                                    color: value === 0 ? "#12387a" : "#3B988C",
                                }}
                                label="Quality"
                            />
                            <Tab
                                style={{
                                    color: "white",
                                    borderRadius: 5,
                                    outline: "none",
                                    color: value === 1 ? "#12387a" : "#3B988C",
                                }}
                                label="Price"
                            />
                            <Tab
                                style={{
                                    color: "white",
                                    borderRadius: 5,
                                    outline: "none",
                                    color: value === 2 ? "#12387a" : "#3B988C",
                                }}
                                label="Delivery Time"
                            />
                        </Tabs>
                    </div>
                </div>

                <div style={{ width: "auto", height: "20px" }} />

                {value === 0 ? (
                    <div
                        style={{ flex: 4, display: "flex", flexDirection: "column" }}
                        className={`${"container-fluid"} ${classes.root}`}
                    >
                        <div className="row">
                            <div
                                className="col-md-6 col-sm-6"
                                style={{
                                    ...styles.inputContainer,
                                    ...styles.textfieldPadding
                                }}
                            >
                                <TextField
                                    type="number"
                                    label="Quality Rate (Pharmacist)"
                                    name={"qualityRateParmacist"}
                                    value={qualityRateParmacist}
                                    // disabled={true}
                                    onChange={onChangeValue}
                                    className="textInputStyle"
                                    variant="filled"
                                    InputProps={{
                                        className: classes.input,
                                        classes: { input: classes.input },
                                        disableUnderline: true
                                    }}
                                    InputLabelProps={{
                                        className: classes.label,
                                        classes: { label: classes.label },
                                    }}
                                />
                            </div>
                            <div
                                className="col-md-6 col-sm-6 "
                                style={{
                                    ...styles.inputContainer,
                                    ...styles.textfieldPadding,
                                }}
                            >
                                <TextField
                                    type="number"
                                    label="Quality Rate (Nurse)"
                                    name={"qualityRateNurse"}
                                    value={qualityRateNurse}
                                    onChange={onChangeValue}
                                    className="textInputStyle"
                                    variant="filled"
                                    InputProps={{
                                        className: classes.input,
                                        classes: { input: classes.input },
                                        disableUnderline: true
                                    }}
                                    InputLabelProps={{
                                        className: classes.label,
                                        classes: { label: classes.label },
                                    }}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div
                                className="col-md-6 col-sm-6 "
                                style={{
                                    ...styles.inputContainer,
                                    ...styles.textfieldPadding,
                                }}
                            >
                                <TextField
                                    type="number"
                                    label="Average Quality Rate (Out of 100)"
                                    name={"avgQualityRate100"}
                                    value={avgQualityRate100}
                                    // disabled={true}
                                    onChange={onChangeValue}
                                    className="textInputStyle"
                                    variant="filled"
                                    InputProps={{
                                        className: classes.input,
                                        classes: { input: classes.input },
                                        disableUnderline: true
                                    }}
                                    InputLabelProps={{
                                        className: classes.label,
                                        classes: { label: classes.label },
                                    }}
                                />
                            </div>
                            <div
                                className="col-md-6 col-sm-6 "
                                style={{
                                    ...styles.inputContainer,
                                    ...styles.textfieldPadding,
                                }}
                            >
                                <TextField
                                    type="number"
                                    label="Average Quality Rate (Out of 35)"
                                    name={"avgQualityRate35"}
                                    value={avgQualityRate35}
                                    onChange={onChangeValue}
                                    className="textInputStyle"
                                    variant="filled"
                                    InputProps={{
                                        className: classes.input,
                                        classes: { input: classes.input },
                                        disableUnderline: true
                                    }}
                                    InputLabelProps={{
                                        className: classes.label,
                                        classes: { label: classes.label },
                                    }}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div
                                className="col-md-6 col-sm-6 "
                                style={{
                                    ...styles.inputContainer,
                                    ...styles.textfieldPadding,
                                }}
                            >
                                <TextField
                                    type="number"
                                    label="Compliance to Barcode Policy"
                                    name={"complianceBarcode"}
                                    value={complianceBarcode}
                                    // disabled={true}
                                    onChange={onChangeValue}
                                    className="textInputStyle"
                                    variant="filled"
                                    InputProps={{
                                        className: classes.input,
                                        classes: { input: classes.input },
                                        disableUnderline: true
                                    }}
                                    InputLabelProps={{
                                        className: classes.label,
                                        classes: { label: classes.label },
                                    }}
                                />
                            </div>
                            <div
                                className="col-md-6 col-sm-6 "
                                style={{
                                    ...styles.inputContainer,
                                    ...styles.textfieldPadding,
                                }}
                            >
                                <TextField
                                    type="number"
                                    label="Quality Rate (Out of 45)"
                                    name={"qualityRate45"}
                                    value={qualityRate45}
                                    onChange={onChangeValue}
                                    className="textInputStyle"
                                    variant="filled"
                                    InputProps={{
                                        className: classes.input,
                                        classes: { input: classes.input },
                                        disableUnderline: true
                                    }}
                                    InputLabelProps={{
                                        className: classes.label,
                                        classes: { label: classes.label },
                                    }}
                                />
                            </div>
                        </div>

                        <div className='row' style={{ marginTop: '30px', marginBottom: '25px' }}>
                            <div className='col-md-6 col-sm-6 col-6' style={styles.textfieldPadding}>
                                <img
                                    onClick={() => props.history.goBack()}
                                    src={Back}
                                    style={{ width: 45, height: 35, cursor: "pointer" }}
                                />
                            </div>
                            <div className='col-md-6 col-sm-6 col-6 d-flex justify-content-end'
                                style={styles.textfieldPadding}
                            >
                                <Button
                                    style={styles.stylesForButton}
                                    onClick={onNextClick}
                                    variant="contained"
                                    color="primary"
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : value === 1 ? (
                    <div
                        style={{ flex: 4, display: "flex", flexDirection: "column" }}
                        className={`${"container-fluid"} ${classes.root}`}
                    >
                        <div className="row">
                            <div
                                className="col-md-6 col-sm-6 "
                                style={{
                                    ...styles.inputContainer,
                                    ...styles.textfieldPadding,
                                }}
                            >
                                <TextField
                                    type="number"
                                    label="Average Purchased Price"
                                    name={"avgPurchasedPrice"}
                                    value={avgPurchasedPrice}
                                    // disabled={true}
                                    onChange={onChangeValue}
                                    className="textInputStyle"
                                    variant="filled"
                                    InputProps={{
                                        className: classes.input,
                                        classes: { input: classes.input },
                                        disableUnderline: true
                                    }}
                                    InputLabelProps={{
                                        className: classes.label,
                                        classes: { label: classes.label },
                                    }}
                                />
                            </div>
                            <div
                                className="col-md-6 col-sm-6 "
                                style={{
                                    ...styles.inputContainer,
                                    ...styles.textfieldPadding,
                                }}
                            >
                                <TextField
                                    type="number"
                                    label="Average Selling Price"
                                    name={"avgSellingPrice"}
                                    value={avgSellingPrice}
                                    onChange={onChangeValue}
                                    className="textInputStyle"
                                    variant="filled"
                                    InputProps={{
                                        className: classes.input,
                                        classes: { input: classes.input },
                                        disableUnderline: true
                                    }}
                                    InputLabelProps={{
                                        className: classes.label,
                                        classes: { label: classes.label },
                                    }}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div
                                className="col-md-6 col-sm-6 "
                                style={{
                                    ...styles.inputContainer,
                                    ...styles.textfieldPadding,
                                }}
                            >
                                <TextField
                                    type="number"
                                    label="Average Profit Margin Per Unit"
                                    name={"avgProfitMargin"}
                                    value={avgProfitMargin}
                                    // disabled={true}
                                    onChange={onChangeValue}
                                    className="textInputStyle"
                                    variant="filled"
                                    InputProps={{
                                        className: classes.input,
                                        classes: { input: classes.input },
                                        disableUnderline: true
                                    }}
                                    InputLabelProps={{
                                        className: classes.label,
                                        classes: { label: classes.label },
                                    }}
                                />
                            </div>
                            <div
                                className="col-md-6 col-sm-6 "
                                style={{
                                    ...styles.inputContainer,
                                    ...styles.textfieldPadding,
                                }}
                            >
                                <TextField
                                    type="number"
                                    label="(Purchased P - Selling P) %"
                                    name={"PPMinusSP"}
                                    value={PPMinusSP}
                                    onChange={onChangeValue}
                                    className="textInputStyle"
                                    variant="filled"
                                    InputProps={{
                                        className: classes.input,
                                        classes: { input: classes.input },
                                        disableUnderline: true
                                    }}
                                    InputLabelProps={{
                                        className: classes.label,
                                        classes: { label: classes.label },
                                    }}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div
                                className="col-md-6 col-sm-6"
                                style={{
                                    ...styles.inputContainer,
                                    ...styles.textfieldPadding,
                                }}
                            >
                                <TextField
                                    type="number"
                                    label="(Purchased P - Selling P) 10%"
                                    name={"PPMinusSP10"}
                                    value={PPMinusSP10}
                                    // disabled={true}
                                    onChange={onChangeValue}
                                    className="textInputStyle"
                                    variant="filled"
                                    InputProps={{
                                        className: classes.input,
                                        classes: { input: classes.input },
                                        disableUnderline: true
                                    }}
                                    InputLabelProps={{
                                        className: classes.label,
                                        classes: { label: classes.label },
                                    }}
                                />
                            </div>
                            <div
                                className="col-md-6 col-sm-6"
                                style={{
                                    ...styles.inputContainer,
                                    ...styles.textfieldPadding,
                                }}
                            >
                                <TextField
                                    type="number"
                                    label="Purchased Price %"
                                    name={"purchasedPrice"}
                                    value={purchasedPrice}
                                    onChange={onChangeValue}
                                    className="textInputStyle"
                                    variant="filled"
                                    InputProps={{
                                        className: classes.input,
                                        classes: { input: classes.input },
                                        disableUnderline: true
                                    }}
                                    InputLabelProps={{
                                        className: classes.label,
                                        classes: { label: classes.label },
                                    }}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div
                                className="col-md-6 col-sm-6"
                                style={{
                                    ...styles.inputContainer,
                                    ...styles.textfieldPadding,
                                }}
                            >
                                <TextField
                                    type="number"
                                    label="Purchased Price 25%"
                                    name={"purchasedPrice25"}
                                    value={purchasedPrice25}
                                    // disabled={true}
                                    onChange={onChangeValue}
                                    className="textInputStyle"
                                    variant="filled"
                                    InputProps={{
                                        className: classes.input,
                                        classes: { input: classes.input },
                                        disableUnderline: true
                                    }}
                                    InputLabelProps={{
                                        className: classes.label,
                                        classes: { label: classes.label },
                                    }}
                                />
                            </div>
                            <div
                                className="col-md-6 col-sm-6"
                                style={{
                                    ...styles.inputContainer,
                                    ...styles.textfieldPadding,
                                }}
                            >
                                <TextField
                                    type="number"
                                    label="Price Rate (Out of 35)"
                                    name={"priceRate35"}
                                    value={priceRate35}
                                    onChange={onChangeValue}
                                    className="textInputStyle"
                                    variant="filled"
                                    InputProps={{
                                        className: classes.input,
                                        classes: { input: classes.input },
                                        disableUnderline: true
                                    }}
                                    InputLabelProps={{
                                        className: classes.label,
                                        classes: { label: classes.label },
                                    }}
                                />
                            </div>
                        </div>

                        <div className='row' style={{ marginTop: '30px', marginBottom: '25px' }}>
                            <div className='col-md-6 col-sm-6 col-6' style={styles.textfieldPadding}>
                                <img
                                    onClick={() => props.history.goBack()}
                                    src={Back}
                                    style={{ width: 45, height: 35, cursor: "pointer" }}
                                />
                            </div>
                            <div className='col-md-6 col-sm-6 col-6 d-flex justify-content-end'
                                style={styles.textfieldPadding}
                            >
                                <Button
                                    style={styles.stylesForButton}
                                    onClick={onNextClick}
                                    variant="contained"
                                    color="primary"
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : value === 2 ? (
                    <div
                        style={{ flex: 4, display: "flex", flexDirection: "column" }}
                        className={`${"container-fluid"} ${classes.root}`}
                    >
                        <div className="row">
                            <div
                                className="col-md-6 col-sm-6"
                                style={{
                                    ...styles.inputContainer,
                                    ...styles.textfieldPadding,
                                }}
                            >
                                <TextField
                                    type="number"
                                    label="Scheduled Lead Time"
                                    name={"scheduledLeadTime"}
                                    value={scheduledLeadTime}
                                    // disabled={true}
                                    onChange={onChangeValue}
                                    className="textInputStyle"
                                    variant="filled"
                                    InputProps={{
                                        className: classes.input,
                                        classes: { input: classes.input },
                                        disableUnderline: true
                                    }}
                                    InputLabelProps={{
                                        className: classes.label,
                                        classes: { label: classes.label },
                                    }}
                                />
                            </div>
                            <div
                                className="col-md-6 col-sm-6"
                                style={{
                                    ...styles.inputContainer,
                                    ...styles.textfieldPadding,
                                }}
                            >
                                <TextField
                                    type="number"
                                    label="Average Lead Time"
                                    name={"avgLeadTime"}
                                    value={avgLeadTime}
                                    onChange={onChangeValue}
                                    className="textInputStyle"
                                    variant="filled"
                                    InputProps={{
                                        className: classes.input,
                                        classes: { input: classes.input },
                                        disableUnderline: true
                                    }}
                                    InputLabelProps={{
                                        className: classes.label,
                                        classes: { label: classes.label },
                                    }}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div
                                className="col-md-6 col-sm-6"
                                style={{
                                    ...styles.inputContainer,
                                    ...styles.textfieldPadding,
                                }}
                            >
                                <TextField
                                    type="number"
                                    label="Average Lead Time"
                                    name={"avgLeadTimePercent"}
                                    value={avgLeadTimePercent}
                                    // disabled={true}
                                    onChange={onChangeValue}
                                    className="textInputStyle"
                                    variant="filled"
                                    InputProps={{
                                        className: classes.input,
                                        classes: { input: classes.input },
                                        disableUnderline: true
                                    }}
                                    InputLabelProps={{
                                        className: classes.label,
                                        classes: { label: classes.label },
                                    }}
                                />
                            </div>
                            <div
                                className="col-md-6 col-sm-6"
                                style={{
                                    ...styles.inputContainer,
                                    ...styles.textfieldPadding,
                                }}
                            >
                                <TextField
                                    type="number"
                                    label="Total Average Lead Time"
                                    name={"totalAvgLeadTime"}
                                    value={totalAvgLeadTime}
                                    onChange={onChangeValue}
                                    className="textInputStyle"
                                    variant="filled"
                                    InputProps={{
                                        className: classes.input,
                                        classes: { input: classes.input },
                                        disableUnderline: true
                                    }}
                                    InputLabelProps={{
                                        className: classes.label,
                                        classes: { label: classes.label },
                                    }}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div
                                className="col-md-4 col-sm-4"
                                style={{
                                    ...styles.inputContainer,
                                    ...styles.textfieldPadding,
                                }}
                            >
                                <TextField
                                    type="number"
                                    label="Last Lead Time 1"
                                    name={"lastLeadTime1"}
                                    value={lastLeadTime1}
                                    // disabled={true}
                                    onChange={onChangeValue}
                                    className="textInputStyle"
                                    variant="filled"
                                    InputProps={{
                                        className: classes.input,
                                        classes: { input: classes.input },
                                        disableUnderline: true
                                    }}
                                    InputLabelProps={{
                                        className: classes.label,
                                        classes: { label: classes.label },
                                    }}
                                />
                            </div>
                            <div
                                className="col-md-4 col-sm-4"
                                style={{
                                    ...styles.inputContainer,
                                    ...styles.textfieldPadding,
                                }}
                            >
                                <TextField
                                    type="number"
                                    label="Last Lead Time 2"
                                    name={"lastLeadTime2"}
                                    value={lastLeadTime2}
                                    onChange={onChangeValue}
                                    className="textInputStyle"
                                    variant="filled"
                                    InputProps={{
                                        className: classes.input,
                                        classes: { input: classes.input },
                                        disableUnderline: true
                                    }}
                                    InputLabelProps={{
                                        className: classes.label,
                                        classes: { label: classes.label },
                                    }}
                                />
                            </div>
                            <div
                                className="col-md-4 col-sm-4"
                                style={{
                                    ...styles.inputContainer,
                                    ...styles.textfieldPadding,
                                }}
                            >
                                <TextField
                                    type="number"
                                    label="Last Lead Time 3"
                                    name={"lastLeadTime3"}
                                    value={lastLeadTime3}
                                    onChange={onChangeValue}
                                    className="textInputStyle"
                                    variant="filled"
                                    InputProps={{
                                        className: classes.input,
                                        classes: { input: classes.input },
                                        disableUnderline: true
                                    }}
                                    InputLabelProps={{
                                        className: classes.label,
                                        classes: { label: classes.label },
                                    }}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div
                                className="col-md-6 col-sm-6"
                                style={{
                                    ...styles.inputContainer,
                                    ...styles.textfieldPadding,
                                }}
                            >
                                <TextField
                                    type="number"
                                    label="Lead Time Marks"
                                    name={"leadTimeMarks"}
                                    value={leadTimeMarks}
                                    // disabled={true}
                                    onChange={onChangeValue}
                                    className="textInputStyle"
                                    variant="filled"
                                    InputProps={{
                                        className: classes.input,
                                        classes: { input: classes.input },
                                        disableUnderline: true
                                    }}
                                    InputLabelProps={{
                                        className: classes.label,
                                        classes: { label: classes.label },
                                    }}
                                />
                            </div>
                            <div
                                className="col-md-6 col-sm-6"
                                style={{
                                    ...styles.inputContainer,
                                    ...styles.textfieldPadding,
                                }}
                            >
                                <TextField
                                    type="number"
                                    label="Compliance to Delivery Schedule"
                                    name={"complianceDelivery"}
                                    value={complianceDelivery}
                                    onChange={onChangeValue}
                                    className="textInputStyle"
                                    variant="filled"
                                    InputProps={{
                                        className: classes.input,
                                        classes: { input: classes.input },
                                        disableUnderline: true
                                    }}
                                    InputLabelProps={{
                                        className: classes.label,
                                        classes: { label: classes.label },
                                    }}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div
                                className="col-md-12 col-sm-12"
                                style={{
                                    ...styles.inputContainer,
                                    ...styles.textfieldPadding,
                                }}
                            >
                                <TextField
                                    type="number"
                                    label="Compliance to Delivery Schedule (Out of 10)"
                                    name={"complianceDelivery10"}
                                    value={complianceDelivery10}
                                    // disabled={true}
                                    onChange={onChangeValue}
                                    className="textInputStyle"
                                    variant="filled"
                                    InputProps={{
                                        className: classes.input,
                                        classes: { input: classes.input },
                                        disableUnderline: true
                                    }}
                                    InputLabelProps={{
                                        className: classes.label,
                                        classes: { label: classes.label },
                                    }}
                                />
                            </div>
                        </div>

                        <div className='row' style={{ marginTop: '30px', marginBottom: '25px' }}>
                            <div className='col-md-6 col-sm-6 col-6' style={styles.textfieldPadding}>
                                <img
                                    onClick={() => props.history.goBack()}
                                    src={Back}
                                    style={{ width: 45, height: 35, cursor: "pointer" }}
                                />
                            </div>
                            <div className='col-md-6 col-sm-6 col-6 d-flex justify-content-end'
                                style={styles.textfieldPadding}
                            >
                                <Button
                                    style={styles.stylesForButton}
                                    onClick={onSubmit}
                                    variant="contained"
                                    color="primary"
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                                undefined
                            )}

            </div>
        </div>
    )
}
export default Vem