/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { ToastsStore } from 'react-toasts';
import {
  addVendorUrl,
  updateVendorUrl,
  addShippingTermUrl,
  updateShippingTermUrl
} from '../../public/endpoins';
import ws from '../../variables/websocket';
import ShippingTerm from '../ShippingTerm/shippingTerm';

const styles = {
  inputContainer: {
    marginTop: '2%'
  }
};

function AddEditVendor(props) {
  const modalStyle = {
    backgroundColor: '#5074f4',
    borderRadius: 30,
    height: '80%',
    marginLeft: '15%',
    marginRight: '15%',
    marginTop: '5%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
    position: 'fixed'
  };

  const initialState = {
    _id: '',
    englishName: '',
    arabicName: '',
    telephone1: '',
    telephone2: '',
    contactEmail: '',
    address: '',
    country: '',
    city: '',
    zipcode: '',
    pobox: '',
    faxno: '',
    taxno: '',
    contactPersonName: '',
    contactPersonTelephone: '',
    contactPersonEmail: '',
    paymentTerms: '',
    rating: '',
    status: '',
    cls: '',
    subClass: ''
  };

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value
    };
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    _id,
    englishName,
    arabicName,
    telephone1,
    telephone2,
    contactEmail,
    address,
    country,
    city,
    zipcode,
    pobox,
    faxno,
    taxno,
    contactPersonName,
    contactPersonTelephone,
    contactPersonEmail,
    paymentTerms,
    rating,
    status,
    subClass,
    cls
  } = state;

  const onChangeValue = e => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  function validateForm() {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let x =
      englishName.length > 0 &&
      telephone1.length > 10 &&
      address.length > 0 &&
      pobox.length > 0 &&
      zipcode.length > 0 &&
      taxno.length > 0 &&
      contactPersonName.length > 0 &&
      contactPersonTelephone.length > 10 &&
      subClass.length > 0 &&
      cls.length > 0 &&
      status.length > 0;

    if (contactEmail && contactPersonEmail === '') {
      return x && re.test(contactEmail);
    } else if (contactPersonEmail && contactEmail === '') {
      return x && re.test(contactPersonEmail);
    } else if (contactPersonEmail && contactEmail) {
      return x && re.test(contactPersonEmail) && re.test(contactEmail);
    } else if (telephone2) {
      return x && telephone2.length > 10;
    } else {
      return x;
    }
  }

  const [comingFor, setcomingFor] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [openShippingTermModal, setOpenShippingTermModal] = useState(false);
  const [shippingTermsData, setShippingTermsData] = useState([]);
  const [modeForShippingTerms, setModeForShippingTerms] = useState('add');

  const [mainClasses, setClasses] = useState('');

  const [statues, setStatuses] = useState('');

  const [subClasses, setSubClasses] = useState('');

  useEffect(() => {
    setcomingFor(props.history.location.state.comingFor);
    setClasses(props.history.location.state.mainClasses);
    setStatuses(props.history.location.state.statues);
    setSubClasses(props.history.location.state.subClasses);

    const selectedRec = props.history.location.state.selectedItem;
    if (selectedRec) {
      Object.entries(selectedRec).map(([key, val]) => {
        if (val && typeof val === 'object') {
          dispatch({ field: key, value: val._id });
        } else {
          dispatch({ field: key, value: val });
        }
      });
    }
  }, []);

  const handleCancel = () => {
    props.history.goBack();
  };

  const handleAdd = () => {
    setIsFormSubmitted(true);
    if (validateForm()) {
      const params = {
        englishName,
        arabicName,
        telephone1,
        telephone2,
        contactEmail,
        address,
        country,
        city,
        zipcode,
        pobox,
        faxno,
        taxno,
        contactPersonName,
        contactPersonTelephone,
        contactPersonEmail,
        paymentTerms,
        rating,
        status,
        cls,
        subClass
      };
      axios
        .post(addVendorUrl, params)
        .then(res => {
          if (res.data.success) {
            console.log('response is', res.data.data._id);
            if (shippingTermsData.length > 0) {
              addShippingTerms(res.data.data._id);
            } else {
              props.history.goBack();
            }
            ws.send('add_vendor');
          } else if (!res.data.success) {
            ToastsStore.error(res.data.error);
          }
        })
        .catch(e => {
          console.log('error after adding vendor', e);
        });
    }
  };

  const addShippingTerms = (id, data = shippingTermsData) => {
    // shippingTermsData
    // for (let i = 0; i < shippingTermsData.length; i++) {
    var data = {
      shippingTermsData: data,
      vendorId: id
    };
    axios
      .post(addShippingTermUrl, data)
      .then(res => {
        if (res.data.success) {
          console.log(res.data.data);
          props.history.goBack();
        } else if (!res.data.success) {
          ToastsStore.error(res.data.error);
        }
      })
      .catch(e => {
        console.log('error while adding shipping term ', e);
      });
  };

  const handleEdit = () => {
    setIsFormSubmitted(true);
    if (validateForm()) {
      const params = {
        _id,
        englishName,
        arabicName,
        telephone1,
        telephone2,
        contactEmail,
        address,
        country,
        city,
        zipcode,
        pobox,
        faxno,
        taxno,
        contactPersonName,
        contactPersonTelephone,
        contactPersonEmail,
        paymentTerms,
        rating,
        status,
        cls,
        subClass
      };
      axios
        .put(updateVendorUrl, params)
        .then(res => {
          if (res.data.success) {
            // console.log('response is', res.data.data._id);
            if (shippingTermsData.length > 0) {
              let withId = [];
              let withOutId = [];

              for (let i = 0; i < shippingTermsData.length; i++) {
                if (shippingTermsData[i]._id) {
                  withId.push(shippingTermsData[i]);
                } else {
                  withOutId.push(shippingTermsData[i]);
                }
              }
              editShippingTerms(_id, withId);
              addShippingTerms(_id, withOutId);
            } else {
              props.history.goBack();
            }
          } else if (!res.data.success) {
            ToastsStore.error(res.data.error);
          }
        })
        .catch(e => {
          console.log('error after updating vendor', e);
        });
    }
  };

  const editShippingTerms = (id, withId) => {
    // shippingTermsData
    // for (let i = 0; i < shippingTermsData.length; i++) {
    var data = {
      shippingTermsData: withId,
      vendorId: id
    };
    axios
      .put(updateShippingTermUrl, data)
      .then(res => {
        if (res.data.success) {
          console.log(res.data.data);
          //   props.history.goBack();
        } else if (!res.data.success) {
          ToastsStore.error(res.data.error);
        }
      })
      .catch(e => {
        console.log('error while adding shipping term ', e);
      });
  };

  const addShippingTerm = () => {
    setOpenShippingTermModal(true);
  };

  const editShippingTerm = () => {
    setOpenShippingTermModal(true);
    setModeForShippingTerms('edit');
  };

  const addPaymetTerm = () => {};

  const hideShippingModel = (data = shippingTermsData) => {
    console.log(data);
    setShippingTermsData(data);
    setOpenShippingTermModal(false);
  };

  const hideModel = () => {
    setOpenShippingTermModal(false);
  };

  return (
    <div className="container">
      <h1>
        <span> {comingFor === 'add' ? 'Add' : 'Edit'}</span>
      </h1>
      <div className="row">
        <div className="col-md-6" style={styles.inputContainer}>
          <TextField
            fullWidth
            id="englishName"
            name="englishName"
            label="English Name"
            type="text"
            variant="outlined"
            value={englishName}
            onChange={onChangeValue}
            error={!englishName && isFormSubmitted}
          />
        </div>

        <div className="col-md-6" style={styles.inputContainer}>
          <TextField
            fullWidth
            id="arabicName"
            name="arabicName"
            label="Arabic Name"
            type="text"
            variant="outlined"
            value={arabicName}
            onChange={onChangeValue}
            // error={!englishName && isFormSubmitted}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-4" style={styles.inputContainer}>
          <TextField
            fullWidth
            id="telephone1"
            name="telephone1"
            label="Telephone 1"
            type="number"
            variant="outlined"
            value={telephone1}
            onChange={onChangeValue}
            error={!telephone1 && isFormSubmitted}
          />
        </div>

        <div className="col-md-4" style={styles.inputContainer}>
          <TextField
            fullWidth
            id="telephone2"
            name="telephone2"
            label="Telephone 2"
            type="number"
            variant="outlined"
            value={telephone2}
            onChange={onChangeValue}
          />
        </div>

        <div className="col-md-4" style={styles.inputContainer}>
          <TextField
            fullWidth
            id="contactEmail"
            name="contactEmail"
            label="Contact Email"
            type="email"
            variant="outlined"
            value={contactEmail}
            onChange={onChangeValue}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-12" style={styles.inputContainer}>
          <TextField
            fullWidth
            id="address"
            name="address"
            label="Address"
            type="text"
            variant="outlined"
            value={address}
            onChange={onChangeValue}
            error={!address && isFormSubmitted}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-4" style={styles.inputContainer}>
          <TextField
            fullWidth
            id="zipcode"
            name="zipcode"
            label="Zip Code"
            type="number"
            variant="outlined"
            value={zipcode}
            onChange={onChangeValue}
            error={!zipcode && isFormSubmitted}
          />
        </div>
        <div className="col-md-4" style={styles.inputContainer}>
          <TextField
            fullWidth
            id="city"
            name="city"
            label="City"
            type="text"
            variant="outlined"
            value={city}
            onChange={onChangeValue}
          />
        </div>
        <div className="col-md-4" style={styles.inputContainer}>
          <TextField
            fullWidth
            id="country"
            name="country"
            label="Country"
            type="text"
            variant="outlined"
            value={country}
            onChange={onChangeValue}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-4" style={styles.inputContainer}>
          <TextField
            fullWidth
            id="pobox"
            name="pobox"
            label="PO BOX"
            type="number"
            variant="outlined"
            value={pobox}
            onChange={onChangeValue}
            error={!pobox && isFormSubmitted}
          />
        </div>

        <div className="col-md-4" style={styles.inputContainer}>
          <TextField
            fullWidth
            id="faxno"
            name="faxno"
            label="Fax No"
            type="number"
            variant="outlined"
            value={faxno}
            onChange={onChangeValue}
          />
        </div>

        <div className="col-md-4" style={styles.inputContainer}>
          <TextField
            fullWidth
            id="taxno"
            name="taxno"
            label="Tax No"
            type="number"
            variant="outlined"
            value={taxno}
            onChange={onChangeValue}
            error={!taxno && isFormSubmitted}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-4" style={styles.inputContainer}>
          <TextField
            fullWidth
            id="contactPersonName"
            name="contactPersonName"
            label="Contact Person Name"
            type="text"
            variant="outlined"
            value={contactPersonName}
            onChange={onChangeValue}
            error={!contactPersonName && isFormSubmitted}
          />
        </div>

        <div className="col-md-4" style={styles.inputContainer}>
          <TextField
            fullWidth
            id="contactPersonTelephone"
            name="contactPersonTelephone"
            label="Contact Person TelePhone"
            type="number"
            variant="outlined"
            value={contactPersonTelephone}
            onChange={onChangeValue}
            error={!contactPersonTelephone && isFormSubmitted}
          />
        </div>

        <div className="col-md-4" style={styles.inputContainer}>
          <TextField
            fullWidth
            id="contactPersonEmail"
            name="contactPersonEmail"
            label="Contact Person Email"
            type="email"
            variant="outlined"
            value={contactPersonEmail}
            onChange={onChangeValue}
            error={!contactPersonEmail && isFormSubmitted}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6" style={styles.inputContainer}>
          <InputLabel id="buHead-label">Class</InputLabel>
          <Select
            fullWidth
            id="cls"
            name="cls"
            value={cls}
            onChange={onChangeValue}
            label="Class"
            error={!cls && isFormSubmitted}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {mainClasses &&
              mainClasses.map(val => {
                return (
                  <MenuItem key={val.key} value={val.key}>
                    {val.value}
                  </MenuItem>
                );
              })}
          </Select>
        </div>

        <div className="col-md-6" style={styles.inputContainer}>
          <InputLabel id="buName-label">Sub Class</InputLabel>
          <Select
            fullWidth
            id="subClass"
            name="subClass"
            value={subClass}
            onChange={onChangeValue}
            label="Sub Class"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {subClasses &&
              subClasses.map(val => {
                if (val.parent === cls)
                  return (
                    <MenuItem key={val.key} value={val.key}>
                      {val.value}
                    </MenuItem>
                  );
              })}
          </Select>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6" style={styles.inputContainer}>
          <TextField
            fullWidth
            id="paymentTerms"
            name="paymentTerms"
            label="Payment Terms"
            type="text"
            variant="outlined"
            value={paymentTerms}
            onChange={onChangeValue}
          />
        </div>
        <div className="col-md-6" style={styles.inputContainer}>
          <TextField
            fullWidth
            id="rating"
            name="rating"
            label="Rating"
            type="text"
            variant="outlined"
            value={rating}
            onChange={onChangeValue}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6" style={styles.inputContainer}>
          <InputLabel id="buName-label">Status</InputLabel>
          <Select
            fullWidth
            id="status"
            name="status"
            value={status}
            onChange={onChangeValue}
            label="Status"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {statues &&
              statues.map(val => {
                return (
                  <MenuItem key={val.key} value={val.key}>
                    {val.value}
                  </MenuItem>
                );
              })}
          </Select>
        </div>
      </div>

      {/* shipping terms modal */}
      <Modal
        open={openShippingTermModal}
        // open={true}
        style={modalStyle}
        onClose={() => setOpenShippingTermModal(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div
          style={{
            backgroundColor: '#e2e2e2',
            height: '100%',
            display: 'flex',
            flex: 1,
            flexDirection: 'column'
          }}
        >
          <div
            style={{
              display: 'flex',
              flex: 1,
              justifyContent: 'flex-start',
              marginLeft: 40,
              alignItems: 'center'
            }}
          >
            <h3 className="modal-heading" style={{ color: 'black' }}>
              Shipping Term(s)
            </h3>
          </div>

          <div
            className="popup-body"
            style={{ display: 'flex', flex: 7, flexDirection: 'column' }}
          >
            <ShippingTerm
              hideShippingModel={hideShippingModel}
              modeForShippingTerms={modeForShippingTerms}
              selectedVendor={_id}
              shippingTermsData={shippingTermsData}
              hideModel={hideModel}
            />
          </div>
        </div>
      </Modal>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={styles.inputContainer}>
          <Button onClick={handleCancel} variant="contained">
            Cancel
          </Button>
        </div>

        <div className="addEditBtnDiv">
          {comingFor === 'add' ? (
            <>
              <Button
                className="mr10"
                onClick={addShippingTerm}
                variant="contained"
              >
                Add Shipping Term(s)
              </Button>
              <Button
                className="mr10"
                onClick={addPaymetTerm}
                variant="contained"
              >
                Add Payment Term(s)
              </Button>
              <Button
                className="pl30 pr30"
                disabled={!validateForm()}
                onClick={handleAdd}
                variant="contained"
                color="primary"
              >
                Add
              </Button>
            </>
          ) : (
            <>
              <Button
                className="mr10"
                onClick={editShippingTerm}
                variant="contained"
              >
                Edit Shipping Term(s)
              </Button>
              <Button
                className="mr10"
                onClick={addPaymetTerm}
                variant="contained"
              >
                Edit Payment Term(s)
              </Button>
              <Button
                className="pl30 pr30"
                disabled={!validateForm()}
                onClick={handleEdit}
                variant="contained"
                color="primary"
              >
                Edit
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default AddEditVendor;
