/*eslint-disable*/
import React, { useState, useEffect } from 'react';
// core components

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

import Header from '../../components/Header/Header';

import Add_New from '../../assets/img/Add_New.png';
import business_Unit from '../../assets/img/business_Unit.png';

import Search from '../../assets/img/Search.png';
import Control_Room from '../../assets/img/Control_Room.png';

import Edit from '../../assets/img/Edit.png';

import Inactive from '../../assets/img/Inactive.png';

import Active from '../../assets/img/Active.png';

import cookie from 'react-cookies';
import BusinessUnit from '../../subRoutes/business_unit.js';

import {
  SwipeableList,
  SwipeableListItem
} from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

import { useSwipeable, Swipeable } from 'react-swipeable';

const tableHeading = ['BU Name', 'Description', 'Bu Head', 'Status', 'Actions'];
const tableDataKeys = [
  'buName',
  'description',
  ['buHead', 'firstName'],
  'status'
];
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
    let path = `bus/add`;
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
    let path = `bus/edit`;
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
          <img
            src={business_Unit}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>

        <div style={{ flex: 4, display: 'flex', alignItems: 'center' }}>
          <h4
            style={{ color: 'white', fontFamily: 'Ubuntu', fontWeight: '500' }}
          >
            Business Unit
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

      {/* <div
        style={{
          height: 60,
          display: 'flex',
          backgroundColor: 'blue',
          borderRadius: 15,
          marginLeft: '2%',
          marginRight: '2%',
         
        }}
      >
        {tableHeading.map((prop, key) => {
          return (
            <div
              style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <h6
                style={{
                  color: 'white',
                  fontFamily: 'Ubuntu',
                  fontWeight: '700',
                }}
                key={key}
              >
                {prop}
              </h6>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginLeft: '2%',
          marginRight: '2%',
          display: 'flex',
          flex: 4,
          paddingTop: 20
        }}
      >
        {businessUnits ? (
          <SwipeableList style={{}}>
            {businessUnits.map(item => {
              return (
                <div style={{}}>
                  <SwipeableListItem
                    scrollStartThreshold={1}
                    threshold={0.25}
                    swipeLeft={{
                      content: (
                        <div style={{  }}>
                          Revealed content during swipe
                        </div>
                      ),
                      action: () => console.info('swipe action triggered')
                    }}
                    swipeRight={{
                      content: <div>Revealed content during swipe</div>,
                      action: () => console.info('swipe action triggered')
                    }}
                    onSwipeProgress={progress =>{}
                      // console.info(`Swipe progress: ${progress}%`)
                    }
                  >
                    <div
                      style={{
                        display: 'flex',
                        flex: 1, borderRadius: 20,
                      }}
                
                    >
                      <div
                        style={{
                          display: 'flex',
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        {item.buName}
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        {item.description}
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        {item.buHead.firstName}
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        {item.status === 'active' ? (
                          <img
                            src={Active}
                            style={{ width: '40%', height: '80%' }}
                          />
                        ) : (
                          <img
                            src={Inactive}
                            style={{ width: '40%', height: '80%' }}
                          />
                        )}
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <img
                          onClick={() => handleEdit(item)}
                          src={Edit}
                          style={{ width: 50, height: 50 }}
                        />
                      </div>
                    </div>
                  </SwipeableListItem>

                  <div style={{ height: 20, width: '100%' }} />
                </div>
              );
            })}
          </SwipeableList>
        ) : (
          <h3>Not found</h3>
        )}
      </div> */}
    </div>
  );
}
