/*eslint-disable*/
import React, { useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Notification from 'components/Snackbar/Notification.js';
import Paper from '@material-ui/core/Paper';
import styles from 'assets/jss/material-dashboard-react/components/tableStyle.js';
import CustomTable from '../../components/Table/Table';
import ConfirmationModal from '../../components/Modal/confirmationModal';
import axios from 'axios';
import { getBuReturnUrl, deleteBuReturnUrl } from '../../public/endpoins';

import Loader from 'react-loader-spinner';

const useStyles = makeStyles(styles);

const tableHeading = ['Item Name', 'Quantity', 'Action'];
const tableDataKeys = [['itemId', 'name'], 'qty'];
const actions = {edit: true, delete: true};

const dummyData = [
  {
    itemId: { _id: 1, name: 'First Item' },
    qty: '23'
  },
  {
    itemId: { _id: 2, name: 'Second Item' },
    qty: '20'
  },
//   {
//     itemsId: { _id: 3, name: 'Third Item' },
//     qty: '25'
//   },
//   {
//     itemsId: { _id: 1, name: 'First Item' },
//     qty: '30'
//   }
];

export default function WareHouseInventory(props) {
  const classes = useStyles();
  const [buReturn, setBuReturn] = useState('');
  const [items, setItems] = useState('');
  const [staff, setStaff] = useState('');
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

  // function getFunctionalUnit() {
  //     axios.get(getBuReturnUrl).then(res => {
  //         if(res.data.success) {
  //             setBuReturn(res.data.data.buReturn);
  //             setItems(res.data.data.items);
  //             setStaff(res.data.data.staff);
  //             setBusinessUnit(res.data.data.businessUnit);
  //         }
  //         else if (!res.data.success) {
  //             setErrorMsg(res.data.error)
  //             setOpenNotification(true);
  //         }
  //         return res;
  //     })
  //     .catch(e => {
  //         console.log('error: ', e);
  //     });
  // }

  // useEffect(() => {
  //     getFunctionalUnit();
  // }, []);

  const addNewItem = () => {
    let path = `warehouseinventory/next/add`;
    props.history.push({
      pathname: path,
      state: { comingFor: 'add', items, staff, businessUnit }
    });
  };

  function handleEdit(rec) {
    let path = `warehouseinventory/next/edit`;
    props.history.push({
      pathname: path,
      state: {
        comingFor: 'edit',
        selectedItem: rec,
        items,
        staff,
        businessUnit
      }
    });
  }

  function handleDelete(id) {
    setModalVisible(true);
    setdeleteItem(id);
  }

  function deleteBuReturn() {
    const params = {
      _id: deleteItem
    };

    axios
      .delete(deleteBuReturnUrl + '/' + params._id)
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
      {dummyData ? (
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

          <div>
            <CustomTable
              tableData={dummyData}
              tableDataKeys={tableDataKeys}
              tableHeading={tableHeading}
              action={actions}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </div>

          <ConfirmationModal
            modalVisible={modalVisible}
            msg="Are you sure want to delete the record?"
            hideconfirmationModal={() => setModalVisible(false)}
            onConfirmDelete={() => deleteBuReturn()}
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
