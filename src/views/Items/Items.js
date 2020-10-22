/*eslint-disable*/
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";

import Table from "../../components/Table/Table.js";
import axios from "axios";
import { getItemsUrl, deleteItemUrl } from "../../public/endpoins";
import Loader from "react-loader-spinner";
import Back_Arrow from "../../assets/img/Back_Arrow.png";
import SearchBar from "../../components/SearchBar/Searchbar.js";
import Header from "../../components/Header/Header";
import Add_New from "../../assets/img/Add_New.png";
import items from "../../assets/img/Items Mgmt.png";
import Search from "../../assets/img/Search.png";
import Control_Room from "../../assets/img/Control_Room.png";
import Edit from "../../assets/img/Edit.png";
import Inactive from "../../assets/img/Inactive.png";
import Active from "../../assets/img/Active.png";
import plus_icon from "../../assets/img/Plus.png";
import ConfirmationModal from "../../components/Modal/confirmationModal";

import "../../assets/jss/material-dashboard-react/components/loaderStyle.css";

const styles = {
  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 5,
    background: "#2c6ddd",
    width: "140px",
    height: "50px",
    outline: "none",
  },
};

const tableHeading = [
  "Item Code",
  "Item Name",
  "Sub Class",
  "Purchase Price",
  "Minimum Level",
  "Maximum Level",
  "Actions",
];

const tableDataKeys = [
  "itemCode",
  "name",
  "subClass",
  "purchasePrice",
  "minimumLevel",
  "maximumLevel",
];

const actions = { edit: true, delete: true };

export default function Items(props) {
  const [itemsArray, setItem] = useState("");
  const [vendors, setVendors] = useState("");
  const [units, setUnits] = useState("");
  const [deleteItem, setdeleteItem] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [classes, setClasses] = useState("");

  const [medClasses, setMedClass] = useState("");

  const [subClasses, setSubClasses] = useState("");

  const [grandSubClasses, setGrandSubClasses] = useState("");

  async function getItems() {
    axios
      .get(getItemsUrl)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data);
          setItem(res.data.data.items);
          setVendors(res.data.data.vendors);
          setUnits(res.data.data.functionalUnit);

          setClasses(res.data.data.classes);
          setMedClass(res.data.data.medClasses);
          setSubClasses(res.data.data.subClasses);
          setGrandSubClasses(res.data.data.grandSubClasses);
        }
        // else if (!res.data.success) {
        //   this.setState({ tr: true });
        // }
      })
      .catch((e) => {
        console.log("error is ", e);
      });
  }

  useEffect(() => {
    getItems();
  }, []);

  const addNewItem = () => {
    let path = `items/add`;
    props.history.push({
      pathname: path,
      state: {
        comingFor: "AddItems",
        vendors,
        units,
        classes,
        subClasses,
        grandSubClasses,
        medClasses,
      },
    });
  };

  function handleEdit(item) {
    let path = `items/edit`;
    props.history.push({
      pathname: path,
      state: {
        comingFor: "EditItems",
        selectedItem: item,
        vendors,
        units,
        classes,
        subClasses,
        grandSubClasses,
        medClasses,
      },
    });
  }

  function handleDelete(id) {
    setModalVisible(true);
    setdeleteItem(id);
  }

  function onConfirmDelete() {
    const params = {
      _id: deleteItem,
    };

    axios
      .delete(deleteItemUrl + "/" + params._id)
      .then((res) => {
        if (res.data.success) {
          setdeleteItem("");
          setModalVisible(false);
          window.location.reload(false);
        }
        // else if (!res.data.success) {
        //   this.setState({ tr: true });
        // }
        return res;
      })
      .catch((e) => {
        console.log("error while deletion ", e);
        setModalVisible(false);
        setdeleteItem("");
      });
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
      <Header history={props.history}/>
      <div className="cPadding">
        <div className="subheader">
          <div>
            <img src={items} />
            <h4>Items</h4>
          </div>

          <div>
            <Button
              onClick={addNewItem}
              style={styles.stylesForButton}
              variant="contained"
              color="primary"
            >
              <img src={plus_icon} className="icon-style" />
              &nbsp;&nbsp;
              <strong >Add New</strong>
            </Button>
            {/* <img src={Search} /> */}
          </div>
        </div>

        <div
          style={{
            flex: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="row">
            {itemsArray ? (
              <div className="container-fluid">
                <Table
                  tableData={itemsArray}
                  tableDataKeys={tableDataKeys}
                  tableHeading={tableHeading}
                  action={actions}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  borderBottomColor={"#60d69f"}
                  borderBottomWidth={20}
                />

                <ConfirmationModal
                  modalVisible={modalVisible}
                  msg="Are you sure want to delete the record?"
                  hideconfirmationModal={() => setModalVisible(false)}
                  onConfirmDelete={() => onConfirmDelete()}
                  setdeleteItem={() => setdeleteItem("")}
                />
                <div style={{ marginBottom: 20 }}>
                  <img
                    onClick={() => props.history.goBack()}
                    src={Back_Arrow}
                    style={{ width: 45, height: 35, cursor: "pointer" }}
                  />
                </div>
              </div>
            ) : (
              <div className="LoaderStyle">
                <Loader type="TailSpin" color="red" height={50} width={50} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
