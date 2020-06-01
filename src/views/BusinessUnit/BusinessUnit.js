/*eslint-disable*/
import React, { useState, useEffect } from 'react';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Button from '@material-ui/core/Button';
import Table from '../../components/Table/Table.js';
import ConfirmationModal from '../../components/Modal/confirmationModal';
import axios from 'axios';
import { ToastsStore } from 'react-toasts';
import {
  getBusinessUnitUrl,
  deleteBusinessUnitUrl,
  updateBusinessUnitUrl
} from '../../public/endpoins';

import cookie from 'react-cookies';

const tableHeading = ['BU Name', 'Description', 'Bu Head', 'Status', 'Actions'];
const tableDataKeys = ['buName', 'description', ['buHead', 'firstName'], 'status'];
const actions = { edit: true, active: true };

export default function Items(props) {
  const [businessUnits, setBusinessUnits] = useState('');
  const [divisions, setDivisions] = useState('');
  const [deleteItem, setdeleteItem] = useState('');
  const [buHeads, setBUHeads] = useState('');
  const [status, setStatus] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  function getBusinessUnits() {
    axios
      .get(getBusinessUnitUrl)
      .then(res => {
        if (res.data.success) {
          setBusinessUnits(res.data.data.businessUnit);
          setBUHeads(res.data.data.buHeads);
          setStatus(res.data.data.statues);
          setDivisions(res.data.data.divisions);
        } else if (!res.data.success) {
          ToastsStore.error(res.data.error);
        }
        return res;
      })
      .catch(e => {
        console.log('error is ', e);
      });
  }

  useEffect(() => {
    getBusinessUnits();
  }, []);

  const addNewItem = () => {
    let path = `businessunit/next/add`;
    props.history.push({
      pathname: path,
      state: {
        comingFor: 'add',
        divisions,
        status,
        buHeads
      }
    });
  };

  function handleEdit(rec) {
    let path = `businessunit/next/edit`;
    props.history.push({
      pathname: path,
      state: {
        comingFor: 'edit',
        selectedItem: rec,
        divisions,
        status,
        buHeads
      }
    });
  }

  function handleDelete(id) {
    setModalVisible(true);
    setdeleteItem(id);
  }

  function deleteBusinessUnit() {
    const params = {
      _id: deleteItem
    };

    axios
      .delete(deleteBusinessUnitUrl + '/' + params._id)
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

  function handleStatus(id) {
    setModalVisible(true);
    setdeleteItem(id);
  }

  function activeBuReturn() {
    let t = businessUnits.filter(item => {
      return item._id === deleteItem;
    });

    console.log(t[0]);

    const temp = t[0];

    const currentUser = cookie.load('current_user');

    const params = {
      _id: temp._id,
      buName: temp.buName,
      description: temp.description,
      buHead: temp.buHead,
      status: 'active',
      updatedBy: currentUser.name,
      buLogsId: temp.buLogsId._id,
      reason: ''
    };

    axios
      .put(updateBusinessUnitUrl, params)
      .then(res => {
        if (res.data.success) {
          setdeleteItem('');
          setModalVisible(false);
          window.location.reload(false);
        } else if (!res.data.success) {
          ToastsStore.error(res.data.error);
        }
      })
      .catch(e => {
        console.log('error while deletion ', e);
      });
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
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

        {businessUnits ? (
          <Table
            tableData={businessUnits}
            tableDataKeys={tableDataKeys}
            tableHeading={tableHeading}
            status={status}
            buHeads={buHeads}
            action={actions}
            handleEdit={handleEdit}
            handleStatus={handleStatus}
          />
        ) : (
          undefined
        )}
      </GridItem>

      {/* <ConfirmationModal
        modalVisible={modalVisible}
        msg="Are you sure want to delete the record?"
        hideconfirmationModal={() => setModalVisible(false)}
        onConfirmDelete={() => deleteBusinessUnit()}
        setdeleteItem={() => setdeleteItem('')}
      /> */}

      <ConfirmationModal
        modalVisible={modalVisible}
        msg="Are you sure want to in active the record?"
        hideconfirmationModal={() => setModalVisible(false)}
        onConfirmDelete={() => activeBuReturn()}
        setdeleteItem={() => setdeleteItem('')}
      />
    </GridContainer>
  );
}
