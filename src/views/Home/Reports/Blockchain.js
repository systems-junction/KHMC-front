import React, { useState, useEffect } from "react";
import CustomTable from "../../../components/Table/Table";
import _ from "lodash";
import Back from "../../../assets/img/Back_Arrow.png";
import Header from "../../../components/Header/Header";
import AccountCircle from "@material-ui/icons/SearchOutlined";
import "../../../assets/jss/material-dashboard-react/components/loaderStyle.css";
import cookie from "react-cookies";
import DialogComponent from "./Dialog";
import "../../../index.css";
import { useStylesForInput, useStylesForTabs } from "./style";
import
{
  MenuItem,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
} from "@material-ui/core";

const dropdownStyles = {
  textFieldPadding: {
    paddingLeft: 5,
    paddingRight: 5,
  },
};

const Blockchain = ( props ) =>
{
  const {
    dropdownModel,
    setDropdownModel,
    tabsModel,
    setTabsModel,
    tableModel,
    handleViewData,
  } = props;
  const { tableData, tableHeading, tableDataKeys, actions } = tableModel;
  console.log( "tabsModel: ", tabsModel );
  const { id: tabsId, value, innerValue, tabs, innerTabs } = tabsModel;
  const { id, label, items, selectedValue } = dropdownModel;
  const classes = useStylesForInput();
  // const [errorMsg, setErrorMsg] = useState("");
  const [ openNotification, setOpenNotification ] = useState( false );
  const [ searchPatientQuery, setSearchPatientQuery ] = useState( "" );
  const [ QRCodeScanner, setQRCodeScanner ] = useState( false );
  // const [actions, setActions] = useState({
  //   view: true,
  // });
  const [ showDialog, setShowDialog ] = useState( false );
  const [ dialogContent, setDialogContent ] = useState( [] );
  const classesForTabs = useStylesForTabs();

  useEffect( () =>
  {
    // getPatientData()
    // return () => socket.disconnect();
  }, [] );

  function getPatientData ()
  {
    // axios
    //   .get("getPendingEDRs")
    //   .then((res) => {
    //     console.log("response", res.data.data);
    //     if (res.data.success) {
    //       res.data.data.map(
    //         (d) =>
    //           (d.patientName =
    //             d.patientId.name[0].given[0] + " " + d.patientId.name[0].family)
    //       );
    //       res.data.data.map((d) => (d.gender = d.patientId.gender));
    //       res.data.data.map((d) => (d.age = d.patientId.age));
    //       res.data.data.map((d) => (d.createdAt = d.patientId.createdAt));
    //       res.data.data.map((d) => (d.mrn = d.patientId.identifier[0].value));
    //       res.data.data.map((d) => {
    //         d.patientId.telecom.map((a) => {
    //           if (a.system === "mobile") {
    //             return (d.phoneNo = a.value);
    //           }
    //         });
    //       });
    //       var allLabSorted = _.sortBy(res.data.data, "createdAt").reverse();
    //       setTableData(allLabSorted);
    //     } else if (!res.data.success) {
    //       setErrorMsg(res.data.error);
    //       setOpenNotification(true);
    //     }
    //     return res;
    //   })
    //   .catch((e) => {
    //     console.log("error: ", e);
    //   });
  }
  console.log( "current user", cookie.load( "current_user" ) );
  console.log( tableData );

  function handleView ( rec )
  {
    let arr = [];
    tableDataKeys.forEach( ( k, i ) =>
    {
      if ( i !== tableHeading.length - 1 )
      {
        console.log( "***rec[k]: ", rec[ k ] );
        console.log( "***handleViewData[ k ]: ", handleViewData );
        let value = rec[ k ];
        arr.push( {
          title: [ tableHeading[ i ] ],
          value: value,
        } );
      }
    } );
    console.log( "arr: ", arr );
    setDialogContent( arr );
    setShowDialog( true );
  }

  const handlePatientSearch = ( e ) =>
  {
    // const a = e.target.value.replace(/[^\w\s]/gi, "");
    // setSearchPatientQuery(a);
    // if (a.length >= 3) {
    //   axios
    //     .get("searchPendingEdr" + "/" + a)
    //     .then((res) => {
    //       console.log("res", res);
    //       if (res.data.success) {
    //         if (res.data.data) {
    //           res.data.data.map(
    //             (d) =>
    //               (d.patientName =
    //                 d.patientId.name[0].given[0] +
    //                 " " +
    //                 d.patientId.name[0].family)
    //           );
    //           res.data.data.map((d) => (d.gender = d.patientId.gender));
    //           res.data.data.map((d) => (d.age = d.patientId.age));
    //           res.data.data.map((d) => (d.createdAt = d.patientId.createdAt));
    //           res.data.data.map(
    //             (d) => (d.mrn = d.patientId.identifier[0].value)
    //           );
    //           res.data.data.map((d) => {
    //             d.patientId.telecom.map((a) => {
    //               if (a.system === "mobile") {
    //                 return (d.phoneNo = a.value);
    //               }
    //             });
    //           });
    //           var sortedObjs = _.sortBy(res.data.data, "createdAt").reverse();
    //           setTableData(sortedObjs);
    //           // var sortedObjs = _.sortBy(res.data.data, 'date').reverse()
    //           // setTableData(res.data.data)
    //         } else {
    //           setTableData(" ");
    //         }
    //       }
    //     })
    //     .catch((e) => {
    //       console.log("error after searching patient request", e);
    //     });
    // } else if (a.length == 0) {
    //   getPatientData();
    // }
  };

  const handleTabsChange = ( event, newValueIndex ) =>
  {
    console.log( "**newValueIndex: ", newValueIndex );
    console.log( "**tabsModel: ", tabsModel );
    setTabsModel(
      newValueIndex,
      {
        ...tabsModel,
        value: newValueIndex,
      },
      true
    );
  };

  const handleInnerTabsChange = ( event, newInnerValueIndex ) =>
  {
    setTabsModel(
      newInnerValueIndex,
      {
        ...tabsModel,
        innerValue: newInnerValueIndex,
      },
      false
    );
  };

  return (
    <div
      style={ {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        position: "fixed",
        width: "100%",
        height: "100%",
        backgroundColor: "rgb(19 213 159)",
        overflowY: "scroll",
      } }
    >
      <Header history={ props.history } />
      {showDialog && dialogContent && (
        <DialogComponent
          contents={ dialogContent }
          handleDialog={ setShowDialog }
        />
      ) }
      <div className="cPadding">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 col-sm-6">
              <TextField
                select
                fullWidth
                id={ id }
                name={ label }
                value={ selectedValue }
                label={ label }
                variant="filled"
                className="dropDownStyle"
                onChange={ ( e ) =>
                  setDropdownModel( {
                    ...dropdownModel,
                    selectedValue: e.target.value,
                  } )
                }
                InputProps={ {
                  className: classes.input,
                  classes: {
                    input: classes.input,
                  },
                  disableUnderline: true,
                } }
              >
                {/* { val.dropdownOptions.map( ( item ) => ( */ }
                { items.length &&
                  items.map( ( item ) => (
                    <MenuItem key={ "safcid" } value={ item }>
                      {item }
                    </MenuItem>
                  ) ) }
                {/* ) ) } */ }
              </TextField>
            </div>
          </div>
        </div>
      </div>

      <div className={ classesForTabs.root }>
        <Tabs
          id={ tabsId }
          classes={ {
            root: classesForTabs.root,
            scroller: classesForTabs.scroller,
          } }
          value={ value }
          onChange={ handleTabsChange }
          textColor="primary"
          TabIndicatorProps={ {
            style: { background: "#12387a" },
          } }
          centered={ false }
          variant="scrollable"
          fullWidth={ true }
        >
          { tabs &&
            tabs.length &&
            tabs.map( ( tab, i ) => (
              <Tab
                style={ {
                  color: "white",
                  borderRadius: 15,
                  outline: "none",
                  color: value === i ? "#12387a" : "#3B988C",
                } }
                label={ tab }
              />
            ) ) }
        </Tabs>
      </div>

      <div className={ classesForTabs.root }>
        { ( innerTabs && innerValue !== null && innerTabs.length && (
          <Tabs
            id={ "inner" + tabsId }
            classes={ {
              root: classesForTabs.root,
              scroller: classesForTabs.scroller,
            } }
            value={ innerValue }
            onChange={ handleInnerTabsChange }
            textColor="primary"
            TabIndicatorProps={ {
              style: { background: "#12387a" },
            } }
            centered={ false }
            variant="scrollable"
            fullWidth={ true }
          >
            {innerTabs.map( ( tab, i ) => (
              <Tab
                style={ {
                  color: "white",
                  borderRadius: 15,
                  outline: "none",
                  color: innerValue === i ? "#12387a" : "#3B988C",
                } }
                label={ tab }
              />
            ) ) }
          </Tabs>
        ) ) ||
          undefined }
      </div>

      <div
        className={ `${ "container-fluid" } ${ classes.root }` }
        style={ {
          marginTop: "25px",
          paddingLeft: "10px",
          paddingRight: "10px",
        } }
      >
        <div
          className="row"
          style={ {
            marginLeft: 27,
            marginRight: 27,
          } }
        >
          <div
            className="col-md-12 col-sm-12 col-12"
            style={ dropdownStyles.textFieldPadding }
          >
            <TextField
              className="textInputStyle"
              id="searchPatientQuery"
              type="text"
              variant="filled"
              label="Search Patient by Name / MRN / National ID / Mobile Number"
              name={ "searchPatientQuery" }
              value={ searchPatientQuery }
              onChange={ handlePatientSearch }
              InputLabelProps={ {
                classes: {
                  root: classes.label,
                  focused: classes.focusedLabel,
                  error: classes.erroredLabel,
                },
              } }
              InputProps={ {
                endAdornment: (
                  <InputAdornment position="end">
                    <AccountCircle />
                  </InputAdornment>
                ),
                className: classes.input,
                classes: { input: classes.input },
                disableUnderline: true,
              } }
            />
          </div>
        </div>
      </div>

      <div
        style={ {
          flex: 4,
          display: "flex",
          flexDirection: "column",
          marginLeft: 40,
          marginRight: 40,
        } }
      >
        <div>
          { tableData !== " " ? (
            <div>
              <div>
                { actions && (
                  <CustomTable
                    tableData={ tableData }
                    tableDataKeys={ tableDataKeys }
                    tableHeading={ tableHeading }
                    action={ actions }
                    handleView={ handleView }
                    borderBottomColor={ "#60d69f" }
                    borderBottomWidth={ 20 }
                  />
                ) }
              </div>
              <div
                style={ {
                  marginTop: 20,
                  marginBottom: 20,
                } }
              >
                <img
                  onClick={ () => window.history.back() }
                  src={ Back }
                  style={ {
                    width: 45,
                    height: 35,
                    cursor: "pointer",
                  } }
                />
              </div>
            </div>
          ) : (
            <div className="row " style={ { marginTop: "25px" } }>
              <div className="col-11">
                <h3
                  style={ {
                    color: "white",
                    textAlign: "center",
                    width: "100%",
                    position: "absolute",
                  } }
                >
                  Opps...No Data Found
                </h3>
              </div>
              <div className="col-1" style={ { marginTop: 45 } }>
                <img
                  onClick={ () => window.history.back() }
                  src={ Back }
                  style={ {
                    maxWidth: "60%",
                    height: "auto",
                    cursor: "pointer",
                  } }
                />
              </div>
            </div>
          ) }
        </div>
      </div>
    </div>
  );
};

export default Blockchain;
