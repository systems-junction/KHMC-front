/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Notification from 'components/Snackbar/Notification.js';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { addBuStockInLogUrl, updateBuStockInLogUrl } from '../../public/endpoins';


const useStyles = makeStyles(styles);

const styles = {
  inputContainer: {
    marginTop: '2%'
  }
};

function AddEditBuReturn(props) {
    const initialState ={
        _id: "",
        buRepRequestId: "",
        itemId: "",
        qty: "",
        buPrice: "",
        salePrice: "",
        batchNo: "",
        expiryDate: "",
        timeStamp:"",
        staffId:"",
        items: [],
        staffs:[],
        buRepRequests: []
    }

    function reducer(state, { field, value}){
        return{
            ...state,
            [field] : value
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const { _id, buRepRequestId, itemId, qty, buPrice, salePrice, batchNo, expiryDate, staffId, timeStamp, items, staffs, buRepRequests } = state;

    const onChangeValue = ((e)=>{ 
        dispatch({field: e.target.name, value: e.target.value});
    });

    function validateForm() {
        // return buPrice && batchNo && batchNo.length > 0;
        return true;
    }

    const [comingFor, setcomingFor] = useState('');
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const [errorMsg, setErrorMsg] = useState("");
    const [openNotification, setOpenNotification] = useState(false);
  


    useEffect(() => {
        setcomingFor(props.history.location.state.comingFor);
        const selectedRec = props.history.location.state.selectedItem;
        if(selectedRec){
            Object.entries(selectedRec).map(([key,val])=>{
                if(val && typeof val === 'object'){
                    dispatch({field: key, value: val._id});
                }
                else{
                    dispatch({field: key, value: val});
                }
            })
        }
        if(props.history.location.state.items){
            dispatch({field: 'items', value: props.history.location.state.items});
        }
        if(props.history.location.state.staff){
            dispatch({field: 'staffs', value: props.history.location.state.staff});
        }
        if(props.history.location.state.buRepRequest){
            dispatch({field: 'buRepRequests', value: props.history.location.state.buRepRequest});
        }
    }, []);

    const handleCancel = () => {
        props.history.goBack();
    };

    const handleAdd = () => {
        setIsFormSubmitted(true);
        // if (buPrice && batchNo && batchNo.length > 0) {
        const params = {
            buRepRequestId, 
            itemId,
            qty, 
            buPrice,
            salePrice, 
            batchNo, 
            expiryDate, 
            staffId, 
            timeStamp

        };
        axios
            .post(addBuStockInLogUrl, params)
            .then(res => {
            if (res.data.success) {
                props.history.goBack();
            } else if (!res.data.success) {
                setOpenNotification(true);
            }
            })
            .catch(e => {
            console.log('error after adding bu inventory', e);
            setOpenNotification(true);
            setErrorMsg('Error while adding the item');
            });
        // }
    };

    const handleEdit = () => {
        setIsFormSubmitted(true);
        // if (buPrice && batchNo && batchNo.length > 0) {
        const params = {
            _id,
            buRepRequestId, 
            itemId,
            qty, 
            buPrice,
            salePrice, 
            batchNo, 
            expiryDate, 
            staffId, 
            timeStamp
        };
        axios
            .put(updateBuStockInLogUrl, params)
            .then(res => {
            if (res.data.success) {
                props.history.goBack();
            } else if (!res.data.success) {
                setOpenNotification(true);
            }
            })
            .catch(e => {
            console.log('error after adding bu inventory', e);
            setOpenNotification(true);
            setErrorMsg('Error while editing the item');
            });
        // }
    };

    if (openNotification) {
        setTimeout(() => {
        setOpenNotification(false);
        setErrorMsg('');
        }, 2000);
    }

    const onChangeDate = value => {
        dispatch({ field: 'timeStamp', value });
    };

    return (
        <div className="container">
            <h1>
                <span> {comingFor === 'add' ? 'Add' : 'Edit'}</span>
            </h1>
            <div className="row">
                <div className="col-md-4" style={styles.inputContainer}>
                    <InputLabel id="buRepRequestId-label">Business Unit</InputLabel>
                    <Select
                        fullWidth
                        labelId="buRepRequestId-label"
                        id="buRepRequestId"
                        name="buRepRequestId"
                        value={buRepRequestId}
                        onChange={onChangeValue}
                        label="Business Unit"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {buRepRequests.map((val)=>{
                            return <MenuItem key={val._id} value={val._id}>{val.status}</MenuItem>
                        })}
                    </Select>  
                </div>

                <div className="col-md-4" style={styles.inputContainer}>
                    <InputLabel id="itemId-label">Item</InputLabel>
                    <Select
                        fullWidth
                        labelId="itemId-label"
                        id="itemId"
                        name="itemId"
                        value={itemId}
                        onChange={onChangeValue}
                        label="Item"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {items.map((val, key)=>{
                            return <MenuItem key={val._id} value={val._id}>{val.name}</MenuItem>
                        })}
                    </Select>            
                </div>

                <div className="col-md-4" style={styles.inputContainer}>
                    <TextField
                        fullWidth
                        id="qty"
                        name="qty"
                        label="Quantity"
                        type="number"
                        min="0"
                        variant="outlined"
                        value={qty}
                        onChange={onChangeValue}
                        error={!qty && isFormSubmitted}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-md-4" style={styles.inputContainer}>
                <MuiPickersUtilsProvider fullWidth utils={DateFnsUtils}>
                    <DateTimePicker
                    fullWidth
                    inputVariant="outlined"
                    onChange={onChangeDate}
                    value={timeStamp ? timeStamp : new Date()}
                    />
                </MuiPickersUtilsProvider>
                </div>

                <div className="col-md-4" style={styles.inputContainer}>
                    <TextField
                        fullWidth
                        id="buPrice"
                        name="buPrice"
                        label="Business Unit Price"
                        type="number"
                        variant="outlined"
                        value={buPrice}
                        onChange={onChangeValue}
                    />
                </div>
                <div className="col-md-4" style={styles.inputContainer}>
                    <TextField
                        fullWidth
                        id="batchNo"
                        name="batchNo"
                        label="Batch Number"
                        type="text"
                        variant="outlined"
                        value={batchNo}
                        onChange={onChangeValue}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-4" style={styles.inputContainer}>
                    <InputLabel id="staff-label">Staff</InputLabel>
                    <Select
                        fullWidth
                        labelId="staff-label"
                        id="staffId"
                        name="staffId"
                        value={staffId}
                        onChange={onChangeValue}
                        label="Staff"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {staffs.map((val, key)=>{
                            return <MenuItem key={val._id} value={val._id}>{val.firstName}</MenuItem>
                        })}
                    </Select>  
                </div>
                <div className="col-md-4" style={styles.inputContainer}>
                    <TextField
                        fullWidth
                        id="salePrice"
                        name="salePrice"
                        label="Sale Price"
                        type="number"
                        variant="outlined"
                        value={salePrice}
                        onChange={onChangeValue}
                    />
                </div>
            </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={styles.inputContainer}>
            <Button onClick={handleCancel} variant="contained">
                Cancel
            </Button>
            </div>

            <div
            style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '2%'
            }}
            >
            {comingFor === 'add' ? (
                <Button
                style={{ paddingLeft: 30, paddingRight: 30 }}
                disabled={!validateForm()}
                onClick={handleAdd}
                variant="contained"
                color="primary"
                >
                {' '}
                Add{' '}
                </Button>
            ) : (
                <Button
                style={{ paddingLeft: 30, paddingRight: 30 }}
                disabled={!validateForm()}
                onClick={handleEdit}
                variant="contained"
                color="primary"
                >
                {' '}
                Edit{' '}
                </Button>
            )}
            </div>
        </div>

        <Notification msg={errorMsg} open={openNotification} />
        </div>
    );
}
export default AddEditBuReturn;
