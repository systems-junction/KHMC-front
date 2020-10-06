/*eslint-disable*/
import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// table

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Notification from "../../components/Snackbar/Notification.js";
import ConfirmationModal from "../../components/Modal/confirmationModal";
import plus_icon from "../../assets/img/Plus.png";
import axios from "axios";
import Back from "../../assets/img/Back_Arrow.png";
import Loader from "react-loader-spinner";

import CustomTable from "../../components/Table/Table";

import {
  getFuInventoryUrl,
  deleteFuInventoryUrl,
  getFuInventoryByFUIdUrl,
  getFunctionalUnitFromHeadIdUrl,
} from "../../public/endpoins";

import Header from "../../components/Header/Header";

import Add_New from "../../assets/img/Add_New.png";
import functional_Unit from "../../assets/img/Functional Unit.png";

import Search from "../../assets/img/Search.png";
import Control_Room from "../../assets/img/Control_Room.png";

import Edit from "../../assets/img/Edit.png";

import Inactive from "../../assets/img/Inactive.png";

import Active from "../../assets/img/Active.png";

import Fingerprint from '../../assets/img/fingerprint.png'
import AccountCircle from '@material-ui/icons/SearchOutlined'
import InputAdornment from '@material-ui/core/InputAdornment'
import BarCode from '../../assets/img/Bar Code.png'
import TextField from '@material-ui/core/TextField'

import business_Unit from "../../assets/img/Functional Unit.png";
import cookie from "react-cookies";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },

  tableData: {
    fontSize: "0.8125rem",
    fontWeight: "400",
    fontFamily: "Ubuntu",
  },
  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 5,
    background: "#2c6ddd",
    // width: "140px",
    height: "45px",
    outline: "none",
  },
};

const useStyles = makeStyles(styles);

const stylesInput = {
  textFieldPadding: {
    paddingLeft: 0,
    paddingRight: 5,
  },


}

const useStylesForInput = makeStyles((theme) => ({
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    '&:after': {
      borderBottomColor: 'black',
    },
    '&:hover': {
      backgroundColor: 'white',
    },
    '&:disabled': {
      color: 'gray',
    },
  },


}))

const tableHeading = [
  "Functional Unit Name",
  "Item Code",
  "Item Name",
  "Qty",
  "Maximum Level",
  "Reorder Level",
  "Minimum Level",
  "Actions",
];
const tableDataKeys = [
  ["fuId", "fuName"],
  ["itemId", "itemCode"],
  ["itemId", "name"],
  "qty",
  "maximumLevel",
  "reorderLevel",
  "minimumLevel",
];
const actions = { edit: true, delete: false };

export default function BuInventory(props) {
  const classes = useStyles();
  const classesInput = useStylesForInput()

  const [buInventories, setBuInventories] = useState("");
  const [items, setItems] = useState("");
  const [businessUnit, setBusinessUnit] = useState("");
  const [deleteItem, setdeleteItem] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [openNotification, setOpenNotification] = useState(false);
  const [functionalUnits, setFunctionalUnits] = useState("");
  const [searchPatientQuery, setSearchPatientQuery] = useState('')


  const [currentUser, setCurrentUser] = useState(cookie.load("current_user"));

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false);
      setErrorMsg("");
    }, 2000);
  }

  function getFuInventory() {
    let url = `${getFuInventoryUrl}`;
    axios
      .get(
        // `${getFuInventoryByFUIdUrl}/${props.history.location.state.selectedItem._id}`
        url
      )
      .then((res) => {
        if (res.data.success) {
          console.log("response for inventory", res.data.data);
          if (currentUser.staffTypeId.type === "admin") {
            setBuInventories(res.data.data.fuInventory);
          } else {
            let temp = res.data.data.fuInventory.filter(
              (inventory) => inventory.fuId.fuHead === currentUser.staffId
            );
            setBuInventories(temp);
          }
          setItems(res.data.data.items);
          setBusinessUnit(res.data.data.functionalUnit);
        } else if (!res.data.success) {
          setErrorMsg(res.data.error);
          setOpenNotification(true);
        }
        return res;
      })
      .catch((e) => {
        console.log("error: ", e);
      });
  }

  function getFuInventoryById() {
    console.log(currentUser);
    axios
      .get(`${getFuInventoryByFUIdUrl}/${currentUser.functionalUnit._id}`)
      .then((res) => {
        if (res.data.success) {
          console.log("response for inventory", res.data.data);
          if (currentUser.staffTypeId.type === "admin") {
            setBuInventories(res.data.data.fuInventory);
          } else {
            // let temp = res.data.data.fuInventory.filter(
            //   (inventory) => inventory.fuId.fuHead === currentUser.staffId
            // );
            // setBuInventories(temp);
            setBuInventories(res.data.data.fuInventory);
          }
          setItems(res.data.data.items);
          setBusinessUnit(res.data.data.functionalUnit);
        } else if (!res.data.success) {
          setErrorMsg(res.data.error);
          setOpenNotification(true);
        }
        return res;
      })
      .catch((e) => {
        console.log("error: ", e);
      });
  }

  function getFUFromHead() {
    console.log("current user", currentUser);
    axios
      .get(getFunctionalUnitFromHeadIdUrl + "/" + currentUser.staffId)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data);
          setFunctionalUnits(res.data.data[0]);
        } else if (!res.data.success) {
          setErrorMsg(res.data.error);
          setOpenNotification(true);
        }
        return res;
      })
      .catch((e) => {
        console.log("error: ", e);
      });
  }

  useEffect(() => {
    if (props.match.path === "/home/wms/fus/fuinventory") {
      getFuInventoryById();
    } else {
      getFuInventory();
      // getFUFromHead();
    }
  }, []);

  const addNewItem = () => {
    let path = "";

    if (props.match.path === "/home/controlroom/fus/fuinventory/:id") {
      path = `add/${props.match.params.id}`;
    } else {
      path = `fuinventory/add`;
    }
    props.history.push({
      pathname: path,
      state: {
        comingFor: "add",
        items,
        businessUnit,
        fuId: functionalUnits,
      },
    });
  };

  function handleEdit(rec) {
    // let path = `fuinventory/edit`;

    let path = "";

    if (props.match.path === "/home/controlroom/fus/fuinventory/:id") {
      path = `edit/${props.match.params.id}`;
    } else {
      path = `fuinventory/edit`;
    }

    props.history.push({
      pathname: path,

      state: {
        comingFor: "edit",
        selectedItem: rec,
        items,
        businessUnit,
        fuId: functionalUnits,
      },
    });
  }

  function handleDelete(id) {
    setModalVisible(true);
    setdeleteItem(id);
  }

  function deleteBuInventory() {
    const params = {
      _id: deleteItem._id,
    };

    axios
      .delete(deleteFuInventoryUrl + "/" + params._id)

      .then((res) => {
        if (res.data.success) {
          setdeleteItem("");
          setModalVisible(false);
          window.location.reload(false);
        } else if (!res.data.success) {
          setErrorMsg(res.data.error);
          setOpenNotification(true);
        }
        return res;
      })
      .catch((e) => {
        console.log("error while deletion ", e);
      });
  }

  // console.log(props);

  const handlePatientSearch =  (e) => {
    const a = e.target.value.replace(/[^\w\s]/gi, '')
    setSearchPatientQuery(a)
    if (a.length >= 3) {
       axios
        .get(
          `${getFuInventoryByFUIdUrl}/${currentUser.functionalUnit._id}/${a}`
        )
        .then((res) => {
          if (res.data.success) {
            if (res.data.data.length > 0) {
              console.log(res.data.data)
              setBuInventories(res.data.data.fuInventory);
            } else {
              setBuInventories(res.data.data.fuInventory);
            }
          }
        })
        .catch((e) => {
          console.log('error after searching patient request', e)
        })
    }

    else if(a.length == 0){ 
      console.log("less");
      getFuInventoryById();
    }
    
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
        backgroundColor: "#60d69f",
        overflowY: "scroll",
      }}
    >
      <Header />

      <div className="cPadding">
        <div className="subheader">
          <div>
            <img src={business_Unit} />
            <h4>Functional Unit Inventory</h4>
          </div>

          <div>
            <Button
              onClick={addNewItem}
              style={styles.stylesForButton}
              variant="contained"
              color="primary"
            >
              <img src={plus_icon} style={styles.stylesForIcon} />
              &nbsp;&nbsp;
              <strong>Add New</strong>
            </Button>
          </div>
        </div>


        <div className='row' style={{marginLeft: '0px', marginRight: '0px', marginTop: '20px'}}>
            <div
              className='col-md-12 col-sm-9 col-8'
              style={stylesInput.textFieldPadding}
            >
              <TextField
                className='textInputStyle'
                id='searchPatientQuery'
                type='text'
                variant='filled'
                label='Search by Item Name/ Item Code'
                name={'searchPatientQuery'}
                value={searchPatientQuery}
                onChange={handlePatientSearch} 
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <AccountCircle />
                    </InputAdornment>
                  ),
                  className: classesInput.input,
                  classes: { input: classesInput.input },
                  disableUnderline: true,
                }}
              />
            </div>

            <div
              className='col-md-1 col-sm-2 col-2'
              style={{
                ...stylesInput.textFieldPadding,
              }}
            >
              
            </div>

            <div
              className='col-md-1 col-sm-1 col-2'
              style={{
                ...stylesInput.textFieldPadding,
              }}
            >
              
            </div>
            </div>



        {buInventories !== "" ? (
          <div>
            <div>
              <CustomTable
                tableData={buInventories}
                tableDataKeys={tableDataKeys}
                tableHeading={tableHeading}
                action={actions}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                borderBottomColor={"#60d69f"}
                borderBottomWidth={20}
              />
            </div>

            <ConfirmationModal
              modalVisible={modalVisible}
              msg="Are you sure want to delete the record?"
              hideconfirmationModal={() => setModalVisible(false)}
              onConfirmDelete={() => deleteBuInventory()}
              setdeleteItem={() => setdeleteItem("")}
            />
            <div style={{ marginBottom: 20 }}>
              <img
                onClick={() => props.history.goBack()}
                src={Back}
                style={{
                  width: 45,
                  height: 35,
                  cursor: "pointer",
                }}
              />
            </div>
            <Notification msg={errorMsg} open={openNotification} />
          </div>
        ) : (
          <div className="LoaderStyle">
            <Loader type="TailSpin" color="red" height={50} width={50} />
          </div>
        )}
      </div>
    </div>
  );
}
