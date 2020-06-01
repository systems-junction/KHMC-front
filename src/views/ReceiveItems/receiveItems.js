/*eslint-disable*/
import React, { useState, useEffect } from 'react';
// @material-ui/core components
import Button from '@material-ui/core/Button';
import Notification from 'components/Snackbar/Notification.js';
import Paper from '@material-ui/core/Paper';
import CustomTable from '../../components/Table/Table';
import ConfirmationModal from '../../components/Modal/confirmationModal';
import axios from 'axios';
import {
  getReceiveItemsUrl,
  deleteReceiveItemsUrl
} from '../../public/endpoins';
import Loader from 'react-loader-spinner';

const tableHeading = [
  'Item Code',
  'Item Name',
  'Current Qty',
  'Required Qty',
  'Received Qty',
  'Batch No',
  'Unit',
  'Date',
  'Actions'
];
const tableDataKeys = [
  'itemCode',
  'itemName',
  'currentQty',
  'requiredQty',
  'receivedQty',
  'batchNumber',
  'unit',
  'date'
];

const actions = { edit: true, delete: true };

export default function PurchaseRequest(props) {
  const [purchaseRequests, setPurchaseRequest] = useState('');
  const [vendors, setVendor] = useState('');
  const [statues, setStatus] = useState('');
  const [items, setItems] = useState('');
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

  function getPurchaseRequests() {
    axios
      .get(getReceiveItemsUrl)
      .then(res => {
        if (res.data.success) {
          console.log(res.data.data.receiveItems);
          setPurchaseRequest(res.data.data.receiveItems);
          //   setVendor(res.data.data.vendor);
          //   setStatus(res.data.data.status);
          //   setItems(res.data.data.items);
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
    getPurchaseRequests();
  }, []);

  const addNewItem = () => {
    let path = `receiveitems/next/add`;
    props.history.push({
      pathname: path,
      state: { comingFor: 'add', vendors, statues, items }
    });
  };

  function handleEdit(rec) {
    let path = `receiveitems/next/edit`;
    props.history.push({
      pathname: path,
      state: { comingFor: 'edit', selectedItem: rec, vendors, statues, items }
    });
  }

  function handleDelete(id) {
    setModalVisible(true);
    setdeleteItem(id);
  }

  function deleteVendor() {
    const params = {
      _id: deleteItem
    };

    axios
      .delete(deleteReceiveItemsUrl + '/' + params._id)
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
      {purchaseRequests ? (
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
              tableData={purchaseRequests}
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
            onConfirmDelete={() => deleteVendor()}
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
