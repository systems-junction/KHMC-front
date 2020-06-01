/*eslint-disable*/
import React, { useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// table

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Notification from 'components/Snackbar/Notification.js';
import ConfirmationModal from '../../components/Modal/confirmationModal';

import axios from 'axios';
import { getBuInventoryUrl, deleteBuInventoryUrl } from '../../public/endpoins';

import Loader from 'react-loader-spinner';

import CustomTable from '../../components/Table/Table.js';

const useStyles = makeStyles(styles);

const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0'
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF'
    }
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1'
    }
  },

  tableData: {
    fontSize: '0.8125rem',
    fontWeight: '400',
    fontFamily: 'Ubuntu'
  }
};

const tableHeading = ['Business Unit', 'Item Name', 'Qty', 'Actions'];
const tableDataKeys = [ ['buId', 'buName'], [ 'itemId', 'name'], 'qty'];
const actions = {edit: true, delete: true};

export default function BuInventory(props) {
  const classes = useStyles();
  const [buInventories, setBuInventories] = useState('');
  const [items, setItems] = useState('');
  const [businessUnit, setBusinessUnit] = useState('');
  const [deleteItem, setdeleteItem] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [openNotification, setOpenNotification] = useState(false);

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false);
      setErrorMsg('');
    }, 2000);
  }

  function getBuInventory() {
    axios.get(getBuInventoryUrl).then(res => {
        if (res.data.success) {
          setBuInventories(res.data.data.buInventory);
          setItems(res.data.data.items);
          setBusinessUnit(res.data.data.businessUnit);
        } else if (!res.data.success) {
          setErrorMsg(res.data.error);
          setOpenNotification(true);
        }
        return res;
      })
      .catch(e => {
        console.log('error: ', e);
      });
  }

  useEffect(() => {
    getBuInventory();
  }, []);

  const addNewItem = () => {
    let path = `buinventory/next/add`;
    props.history.push({
      pathname: path,
      state: { comingFor: 'add', items, businessUnit }
    });
  };

  function handleEdit(rec) {
    let path = `buinventory/next/edit`;
    props.history.push({
      pathname: path,
      state: { comingFor: 'edit', selectedItem: rec, items, businessUnit }
    });
  }

  function handleDelete(id) {
    setModalVisible(true);
    setdeleteItem(id);
  }

  function deleteBuInventory() {
    const params = {
      _id: deleteItem
    };

    axios
      .delete(deleteBuInventoryUrl + '/' + params._id)
      .then(res => {
        if (res.data.success) {
          setdeleteItem('');
          setModalVisible(false);
          window.location.reload(false);
        } else if (!res.data.success) {
          setErrorMsg(res.data.error);
          setOpenNotification(true);
        }
        return res;
      })
      .catch(e => {
        console.log('error while deletion ', e);
      });
  }

  return (
    <div>
      {buInventories !== '' ? (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button
                onClick={addNewItem}
                style={{ width: 65, height: 65, borderRadius: 65 / 2 }}
                variant="contained"
                color="primary"
              >
                <i className="zmdi zmdi-plus zmdi-hc-3x"></i>
              </Button>
            </div>
          </div>

          {/* table */}
          <div>
            <CustomTable
              tableData={buInventories}
              tableDataKeys={tableDataKeys}
              tableHeading={tableHeading}
              action={actions}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </div>

          {/* end table */}

          <ConfirmationModal
            modalVisible={modalVisible}
            msg="Are you sure want to delete the record?"
            hideconfirmationModal={() => setModalVisible(false)}
            onConfirmDelete={() => deleteBuInventory()}
            setdeleteItem={() => setdeleteItem('')}
          />

          <Notification msg={errorMsg} open={openNotification} />
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
