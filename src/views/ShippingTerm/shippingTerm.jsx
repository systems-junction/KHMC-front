/*eslint-disable*/
import React, { useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import styles from 'assets/jss/material-dashboard-react/components/tableStyle.js';
import CustomTable from '../../components/Table/Table';
import ConfirmationModal from '../../components/Modal/confirmationModal';
import axios from 'axios';
import {
  getShippingTermUrl,
  deleteShippingTermUrl,
  addShippingTermUrl
} from '../../public/endpoins';
import Loader from 'react-loader-spinner';
import { ToastsStore } from 'react-toasts';
import RcIf from 'rc-if';

export default function ShippingTerm(props) {
  const [shippingTerms, setShippingTerms] = useState([{ description: '' }]);
  const [deleteItem, setdeleteItem] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  function getShippingTerms() {
    axios
      .get(getShippingTermUrl + '/' + props.selectedVendor)
      .then(res => {
        if (res.data.success) {
          if (res.data.data.shippingTerm.length > 0) {
            // setShippingTerms(res.data.data.shippingTerm);
            // if (props.shippingTermsData.length > 0) {
            //   setShippingTerms('');

            let removed = [];

            for (let i = 0; i < props.shippingTermsData.length; i++) {
              let found = false;
              for (let j = 0; j < res.data.data.shippingTerm.length; j++) {
                if (
                  props.shippingTermsData[i].description ===
                  res.data.data.shippingTerm[j].description
                ) {
                  found = true;
                  console.log(props.shippingTermsData[i]);
                }
              }
              if (!found) {
                console.log(props.shippingTermsData[i]);

                removed.push(props.shippingTermsData[i]);
              }
            }
            console.log(removed);
            let temp = res.data.data.shippingTerm.concat(removed);
            setShippingTerms(temp);
            // }
          } else {
            setShippingTerms([{ description: '' }]);
          }
        } else if (!res.data.success) {
          ToastsStore.error(res.data.error);
        }
      })
      .catch(e => {
        console.log('error: ', e);
      });
  }

  useEffect(() => {
    if (
      props.shippingTermsData.length > 0 &&
      props.modeForShippingTerms !== 'edit'
    ) {
      setShippingTerms(props.shippingTermsData);
    }

    if (props.modeForShippingTerms === 'edit') {
      getShippingTerms();
    }
  }, []);

  const addNewShippingTerm = () => {
    setShippingTerms(prevState => [...prevState, { description: '' }]);
  };

  function onChangeValue(e, index) {

    let x = '';
    let temp = [];

    for (let i = 0; i < shippingTerms.length; i++) {
      if (index === i) {
        x = shippingTerms[i];
      }
    }

    x.description = e.target.value;

    for (let i = 0; i < shippingTerms.length; i++) {
      if (i === index) {
        temp.push(x);
      } else {
        temp.push(shippingTerms[i]);
      }
    }

    setShippingTerms(temp);
  }

  function handleDelete(id, index) {
    if (id) {
      // If record exist in database then remove it from database
      axios
        .delete(deleteShippingTermUrl + '/' + id)
        .then(res => {
          if (res.data.success) {
            let temp = shippingTerms.filter(item => {
              return item._id !== id;
            });
            setShippingTerms(temp);
          } else if (!res.data.success) {
            ToastsStore.error(res.data.error);
          }
          return res;
        })
        .catch(e => {
          console.log('error while deletion ', e);
        });
    } else {
      // If record not exist in database then remove it locally
      let tempArr = shippingTerms;
      tempArr.splice(index, 1);
      setShippingTerms([...tempArr]);
    }
  }

  function addShippingTerms() {
    let temp = [];

    for (let i = 0; i < shippingTerms.length; i++) {
      if (shippingTerms[i].description !== '') {
        temp.push(shippingTerms[i]);
      }
    }

    // for (let i = 0; i < temp.length; i++) {
    //   axios.post(addShippingTermUrl, temp[i])
    //     .then(res => {
    //       if (res.data.success) {

    //       } else if (!res.data.success) {
    //         ToastsStore.error(res.data.error);
    //       }
    //       return res;
    //     })
    //     .catch(e => {
    //       console.log('error while deletion ', e);
    //     });
    // }

    props.hideShippingModel(temp);
  }

  return (
    <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
      {shippingTerms ? (
        <div
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column'
          }}
        >
          <div
            style={{
              display: 'flex',
              flex: 3,
              flexDirection: 'column',
              maxHeight: 350,
              overflowY: 'scroll',
              overflowX: 'hidden'
            }}
          >
            {shippingTerms.map((prop, index, arr) => {
              return (
                <div
                  className="row ml10 mb10 justify-content-md-center"
                  key={index}
                  style={{}}
                >
                  <div
                    className="col-sm-9 col-xs-9 "
                    style={{
                      marginTop: 1,
                      justifyContent: 'center',
                      display: 'flex'
                    }}
                  >
                    <TextField
                      style={{ width: '85%' }}
                      name="description"
                      label=""
                      type="text"
                      variant="outlined"
                      value={prop.description}
                      onChange={e => onChangeValue(e, index)}
                      error={!prop.description && isFormSubmitted}
                    />
                  </div>
                  <div
                    className="col-xs-3 col-sm-3"
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <RcIf if={arr.length > 1}>
                      <span
                        onClick={() => handleDelete(prop._id, index)}
                        style={{ cursor: 'pointer' }}
                      >
                        <i className="ml10 zmdi zmdi-delete zmdi-hc-2x"></i>
                      </span>
                    </RcIf>

                    <RcIf if={arr.length - 1 === index}>
                      <span
                        onClick={addNewShippingTerm}
                        style={{ cursor: 'pointer', marginLeft: '10%' }}
                      >
                        <i className="ml10 zmdi zmdi-plus-circle zmdi-hc-2x"></i>
                      </span>
                    </RcIf>
                  </div>
                </div>
              );
            })}
          </div>

          {/* <ConfirmationModal modalVisible={modalVisible} 
                    msg="Are you sure want to delete the record?"
                    hideconfirmationModal={()=>setModalVisible(false)}
                    onConfirmDelete={()=> deleteShippingTerm()}
                    setdeleteItem={()=>setdeleteItem('')}
                /> */}

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginLeft: 30,
              marginRight: 30,

              flex: 0.5,
              alignItems: 'center'
            }}
          >
            <div style={styles.inputContainer}>
              <Button onClick={() => props.hideModel()} variant="contained">
                Cancel
              </Button>
            </div>

            <div style={{ marginLeft: 20 }}>
              <Button
                onClick={() => addShippingTerms()}
                variant="contained"
                color="primary"
              >
                Add
              </Button>
            </div>
          </div>
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
