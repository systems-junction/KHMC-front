/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

import Table from '../../components/Table/Table.js';
import axios from 'axios';
import { getItemsUrl, deleteItemUrl } from '../../public/endpoins';
import Loader from 'react-loader-spinner';

import SearchBar from '../../components/SearchBar/Searchbar.js';

const tableHeading = [
  'Name',
  'Sub Class',
  'Vendor Name',
  'Purchase Price',
  'Minimum Level',
  'Maximum Level',
  'Actions'
];

const tableDataKeys = [
  'name',
  'subClass',
  ['vendorId', 'englishName'],
  'purchasePrice',
  'minimumLevel',
  'maximumLevel'
];

const actions = { edit: true, delete: true };

export default function Items(props) {
  const [itemsArray, setItem] = useState('');
  const [vendors, setVendors] = useState('');
  const [units, setUnits] = useState('');
  const [deleteItem, setdeleteItem] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [classes, setClasses] = useState('');
  const [subClasses, setSubClasses] = useState('');
  const [grandSubClasses, setGrandSubClasses] = useState('');

  async function getItems() {
    axios
      .get(getItemsUrl)
      .then(res => {
        if (res.data.success) {
          console.log(res.data.data);
          setItem(res.data.data.items);
          setVendors(res.data.data.vendors);
          setUnits(res.data.data.functionalUnit);

          setClasses(res.data.data.classes);
          setSubClasses(res.data.data.subClasses);
          setGrandSubClasses(res.data.data.grandSubClasses);
        }
        // else if (!res.data.success) {
        //   this.setState({ tr: true });
        // }
      })
      .catch(e => {
        console.log('error is ', e);
      });
  }

  useEffect(() => {
    getItems();
  }, []);

  const addNewItem = () => {
    let path = `items/next/add`;
    props.history.push({
      pathname: path,
      state: {
        comingFor: 'AddItems',
        vendors,
        units,
        classes,
        subClasses,
        grandSubClasses
      }
    });
  };

  function handleEdit(item) {
    let path = `items/next/edit`;
    props.history.push({
      pathname: path,
      state: {
        comingFor: 'EditItems',
        selectedItem: item,
        vendors,
        units,
        classes,
        subClasses,
        grandSubClasses
      }
    });
  }

  function handleDelete(id) {
    setModalVisible(true);
    setdeleteItem(id);
  }

  function onConfirmDelete() {
    const params = {
      _id: deleteItem
    };

    axios
      .delete(deleteItemUrl + '/' + params._id)
      .then(res => {
        if (res.data.success) {
          setdeleteItem('');
          setModalVisible(false);
          window.location.reload(false);
        }
        // else if (!res.data.success) {
        //   this.setState({ tr: true });
        // }
        return res;
      })
      .catch(e => {
        console.log('error while deletion ', e);
        setModalVisible(false);
        setdeleteItem('');
      });
  }

  return (
    <div>
      {itemsArray ? (
        <div className="container">
          <div className="row">
            <div
              className="col-md-6 col-sm-12 col-lg-8"
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingTop: '2%'
              }}
            >
              <Button
                onClick={addNewItem}
                style={{ width: 65, height: 65, borderRadius: 65 / 2 }}
                variant="contained"
                color="primary"
              >
                <i className="zmdi zmdi-plus zmdi-hc-3x"></i>
              </Button>
            </div>

            <div
              className="col-md-6 col-sm-12 col-lg-4"
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingTop: '2%'
              }}
            >
              <SearchBar placeHolder={'Search Items'} />
            </div>
          </div>

          <Table
            tableData={itemsArray}
            tableDataKeys={tableDataKeys}
            tableHeading={tableHeading}
            action={actions}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />

          <Modal
            open={modalVisible}
            style={{
              backgroundColor: '#72101e',
              borderRadius: 10,
              // width: '60%',
              height: '40%',
              marginLeft: '15%',
              marginRight: '15%',
              marginTop: '10%',
              // marginBottom:"10%",
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              flex: 1,
              position: 'fixed'
            }}
            // onClose={() => setModalVisible(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div>
              <h4
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontFamily: 'Ubuntu',
                  // fontSize: 25,
                  textAlign: 'center'
                }}
              >
                Are you sure want to delete the item?
              </h4>

              <div
                style={{
                  display: 'flex',
                  marginTop: '4%',
                  justifyContent: 'space-evenly'
                }}
              >
                <Button
                  onClick={() => {
                    setModalVisible(false);
                    setdeleteItem('');
                  }}
                  variant="contained"
                >
                  Cancel
                </Button>

                <Button
                  style={{ marginRight: '3%' }}
                  onClick={() => onConfirmDelete()}
                  variant="contained"
                  color="primary"
                >
                  Done
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      ) : (
        <div
          style={{
            width: '70%',
            height: '100%',
            position: 'fixed',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Loader type="TailSpin" color="red" height={50} width={50} />
        </div>
      )}
    </div>
  );
}
