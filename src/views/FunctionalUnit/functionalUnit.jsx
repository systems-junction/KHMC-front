/*eslint-disable*/
import React, { useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import styles from 'assets/jss/material-dashboard-react/components/tableStyle.js';
import CustomTable from '../../components/Table/Table';
import ConfirmationModal from '../../components/Modal/confirmationModal';
import axios from 'axios';
import { ToastsStore } from 'react-toasts';
import {
  getFunctionalUnitUrl,
  updateFunctionalUnitUrl
} from '../../public/endpoins';

import Loader from 'react-loader-spinner';

import cookie from 'react-cookies';

const useStyles = makeStyles(styles);

const tableHeading = [
  'Functional Unit Name',
  'FU Head',
  'Business Unit',
  'Status',
  'Action'
];
const tableDataKeys = [
  'fuName',
  ['fuHead', 'firstName'],
  ['buId', 'buName'],
  'status'
];
const actions = { edit: true, active: true };

export default function FunctionalUnit(props) {
  const classes = useStyles();
  const [functionalUnits, setFunctionalUnits] = useState('');
  const [businessUnits, setBusinessUnits] = useState('');
  const [staff, setStaff] = useState('');
  const [statues, setStatues] = useState('');
  const [deleteItem, setdeleteItem] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  function getFunctionalUnit() {
    axios
      .get(getFunctionalUnitUrl)
      .then(res => {
        if (res.data.success) {
          setFunctionalUnits(res.data.data.functionalUnits);
          setBusinessUnits(res.data.data.businessUnit);
          setStaff(res.data.data.staff);
          setStatues(res.data.data.statues);
        } else if (!res.data.success) {
          ToastsStore.error(res.data.error);
        }
      })
      .catch(e => {
        console.log('error: ', e);
      });
  }

  useEffect(() => {
    getFunctionalUnit();
  }, []);

  const addNewItem = () => {
    let path = `functionalunit/next/add`;
    props.history.push({
      pathname: path,
      state: {
        comingFor: 'add',
        statues,
        staff,
        businessUnits
      }
    });
  };

  function handleEdit(rec) {
    let path = `functionalunit/next/edit`;
    props.history.push({
      pathname: path,
      state: {
        comingFor: 'edit',
        selectedItem: rec,
        statues,
        staff,
        businessUnits
      }
    });
  }

  function handleStatus(id) {
    setModalVisible(true);
    setdeleteItem(id);
  }

  function deleteBuReturn() {
    const params = {
      _id: deleteItem
    };

    axios
      .delete(updateFunctionalUnitUrl + '/' + params._id)
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

  function activeBuReturn() {
    let t = functionalUnits.filter(item => {
      return item._id === deleteItem;
    });

    const temp = t[0];
    const currentUser = cookie.load('current_user');

    const params = {
      _id: temp._id,
      fuName: temp.fuName,
      description: temp.description,
      fuHead: temp.fuHead,
      buId: temp.buId,
      status: 'active',
      reason: '',
      updatedBy: currentUser.name,
      fuLogId: temp.fuLogId._id
    };
    axios
      .put(updateFunctionalUnitUrl, params)
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
    <div>
      {functionalUnits ? (
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
              tableData={functionalUnits}
              tableDataKeys={tableDataKeys}
              tableHeading={tableHeading}
              action={actions}
              handleEdit={handleEdit}
              handleStatus={handleStatus}
            />
          </div>

          <ConfirmationModal
            modalVisible={modalVisible}
            msg="Are you sure want to in active the record?"
            hideconfirmationModal={() => setModalVisible(false)}
            onConfirmDelete={() => activeBuReturn()}
            setdeleteItem={() => setdeleteItem('')}
          />
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
