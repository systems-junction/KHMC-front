/*eslint-disable*/
import React, { useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import styles from '../../assets/jss/material-dashboard-react/components/tableStyle.js';
import CustomTable from '../../components/Table/Table';
import ConfirmationModal from '../../components/Modal/confirmationModal';
import axios from 'axios';
import Header from '../../components/Header/Header';
import vendor from '../../assets/img/Vendot.png';
import Add_New from '../../assets/img/Add_New.png';
import Search from '../../assets/img/Search.png';
import Table from '../../components/Table/Table.js';
import {
  getVendorUrl,
  deleteVendorUrl,
  socketUrl
} from '../../public/endpoins';
import ws from '../../variables/websocket';
import { ToastsStore } from 'react-toasts';

import Loader from 'react-loader-spinner';

const useStyles = makeStyles(styles);

const tableHeading = [
  'Name',
  'Phone Number',
  'Contact Person',
  'Email',
  'Action'
];
const tableDataKeys = [
  'englishName',
  'telephone1',
  'contactPersonName',
  'contactEmail'
];

const actions = { edit: true, delete: true };

export default function Vendor(props) {
  const classes = useStyles();
  const [vendors, setVendor] = useState('');
  const [deleteItem, setdeleteItem] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [mainClasses, setClasses] = useState('');

  const [statues, setStatuses] = useState('');

  const [subClasses, setSubClasses] = useState('');

  ws.onmessage = message => {
    if (message.data == 'add_vendor') {
      getVendors();
      console.log('inside check');
    }
    // console.log(`Received: ${message.data}`);
  };

  function getVendors() {
    axios
      .get(getVendorUrl)
      .then(res => {
        if (res.data.success) {
          setVendor(res.data.data.vendor);
          setStatuses(res.data.data.statues);
          setClasses(res.data.data.classes);
          setSubClasses(res.data.data.subClasses);
        } else if (!res.data.success) {
          ToastsStore.error(res.data.error);
        }
        return res;
      })
      .catch(e => {
        console.log('error: ', e);
      });
  }

  useEffect(() => {
    getVendors();
  }, []);

  const addNewItem = () => {
    let path = `vendor/add/`;
    props.history.push({
      pathname: path,
      state: {
        comingFor: 'add',
        statues: statues,
        mainClasses: mainClasses,
        subClasses: subClasses
      }
    });
  };

  function handleEdit(rec) {
    let path = `vendor/edit`;
    props.history.push({
      pathname: path,
      state: {
        comingFor: 'edit',
        selectedItem: rec,
        statues: statues,
        mainClasses: mainClasses,
        subClasses: subClasses
      }
    });
  }

  function handleDelete(id) {
    setModalVisible(true);
    setdeleteItem(id);
  }
  function handleStatus(id) {
    setModalVisible(true);
    setdeleteItem(id);
  }
  function deleteVendor() {
    const params = {
      _id: deleteItem
    };

    axios
      .delete(deleteVendorUrl + '/' + params._id)
      .then(res => {
        if (res.data.success) {
          setdeleteItem('');
          setModalVisible(false);
          window.location.reload(false);
        } else if (!res.data.success) {
          ToastsStore.error(res.data.error);
        }
        return res;
      })
      .catch(e => {
        console.log('error while deletion ', e);
      });
  }

  return (
    // <div>
    //   {vendors ? (
    //     <div>
    //       <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    //         <div style={{ display: 'flex', alignItems: 'center' }}>
    //           <Button
    //             onClick={addNewItem}
    //             style={{ width: 65, height: 65, borderRadius: 65 / 2 }}
    //             variant="contained"
    //             color="primary"
    //           >
    //             <i className="zmdi zmdi-plus zmdi-hc-3x"></i>
    //           </Button>
    //         </div>
    //       </div>

    //       <div>
    //         <CustomTable
    //           tableData={vendors}
    //           tableDataKeys={tableDataKeys}
    //           tableHeading={tableHeading}
    //           action={actions}
    //           handleEdit={handleEdit}
    //           handleDelete={handleDelete}
    //         />
    //       </div>

    //       <ConfirmationModal
    //         modalVisible={modalVisible}
    //         msg="Are you sure want to delete the record?"
    //         hideconfirmationModal={() => setModalVisible(false)}
    //         onConfirmDelete={() => deleteVendor()}
    //         setdeleteItem={() => setdeleteItem('')}
    //       />
    //     </div>
    //   ) : (
    //     <div
    //       style={{
    //         width: '70%',
    //         height: '100%',
    //         position: 'fixed',
    //         display: 'flex',
    //         justifyContent: 'center'
    //       }}
    //     >
    //       <Loader type="TailSpin" color="red" height={50} width={50} />
    //     </div>
    //   )}
    // </div>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        position: 'fixed',
        width: '100%',
        height: '100%',
        backgroundColor: '#60d69f',
        overflowY: 'scroll'
      }}
    >
      <div style={{ alignItems: 'center', flex: 1, display: 'flex' }}>
        <Header />
      </div>

      <div style={{ alignItems: 'center', flex: 0.5, display: 'flex' }}>
        <div
          style={{
            flex: 0.5,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <img src={vendor} style={{ maxWidth: '100%', height: 'auto' }} />
        </div>

        <div style={{ flex: 4, display: 'flex', alignItems: 'center' }}>
          <h4
            style={{ color: 'white', fontFamily: 'Ubuntu', fontWeight: '500' }}
          >
            Vendor Unit
          </h4>
        </div>

        <div
          style={{
            display: 'flex',
            flex: 1.5,
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        >
          <div style={{ flex: 1.5, display: 'flex' }}>
            <img
              onClick={addNewItem}
              src={Add_New}
              style={{ width: '100%', height: '100%', cursor: 'pointer' }}
            />
          </div>

          <div style={{ flex: 1, display: 'flex' }}>
            <img src={Search} style={{ width: '60%', height: '60%' }} />
          </div>
        </div>
      </div>

      <div
        style={{
          flex: 4,
          display: 'flex',
          flexDirection: 'column',
          marginLeft: '3%',
          marginRight: '3%'
        }}
      >
        {Vendor ? (
          <Table
            tableData={vendors}
            tableDataKeys={tableDataKeys}
            tableHeading={tableHeading}
            status={status}
            action={actions}
            handleEdit={handleEdit}
            handleStatus={handleStatus}
            borderBottomColor={'#60d69f'}
            borderBottomWidth={20}
          />
        ) : (
          undefined
        )}
      </div>
      <ConfirmationModal
        modalVisible={modalVisible}
        msg="Are you sure want to in active the record?"
        hideconfirmationModal={() => setModalVisible(false)}
        onConfirmDelete={() => activeBuReturn()}
        setdeleteItem={() => setdeleteItem('')}
      />
    </div>
  );
}
