/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Notification from 'components/Snackbar/Notification.js';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { addBuRepRequestUrl, updateBuRepRequestUrl } from '../../public/endpoins';


const useStyles = makeStyles(styles);

const styles = {
  inputContainer: {
    marginTop: '2%'
  }
};

function AddEditBuRepRequest(props) {
    const initialState ={
        _id: "",
        buId: "",
        requesterStaffId: "",
        timeStamp: "",
        status: "",
        staffs: [],
        businessUnits: []
    }

    function reducer(state, { field, value}){
        return{
            ...state,
            [field] : value
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const { _id, buId, requesterStaffId, timeStamp, status, staffs, businessUnits } = state;

    const onChangeValue = ((e)=>{
        dispatch({field: e.target.name, value: e.target.value});
    });

    const onChangeDate = value => {
        dispatch({ field: 'timeStamp', value });
    };

    function validateForm() {
        return status && status.length >0;
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
                if (val && typeof val === 'object') {
                    dispatch({ field: key, value: val._id });
                } else {
                    dispatch({ field: key, value: val });
                }
            })
        }
        if(props.history.location.state.staff) {
            dispatch({ field: 'staffs', value: props.history.location.state.staff });
        }
        if(props.history.location.state.businessUnit) {
            dispatch({field: 'businessUnits',value: props.history.location.state.businessUnit});
        }
    }, []);

    const handleCancel = () => {
        props.history.goBack();
    };


    const handleAdd = () => {
        setIsFormSubmitted(true);
        if(status){
            const params = { buId, requesterStaffId, timeStamp, status };
            axios.post(addBuRepRequestUrl, params).then(res => {
                if (res.data.success) {
                    props.history.goBack();
                }
                else if (!res.data.success) {
                    setOpenNotification(true);
                }
            }).catch(e => {
                    console.log('error after adding bu inventory', e);
                    setOpenNotification(true)
                    setErrorMsg("Error while adding the item")
            });
        }
    };

    const handleEdit = () => {
        setIsFormSubmitted(true);
        if(status){
            const params = { _id, buId, requesterStaffId, timeStamp, status };
            axios.put(updateBuRepRequestUrl, params).then(res => {
                if (res.data.success) {
                    props.history.goBack();
                }
                else if (!res.data.success) {
                    setOpenNotification(true);
                }
            }).catch(e => {
                console.log('error after adding bu inventory', e);
                setOpenNotification(true);
                setErrorMsg("Error while editing the item")
            });
        }
    };


    if(openNotification) {
        setTimeout(() => {
        setOpenNotification(false);
        setErrorMsg("")
        }, 2000);
    }


    return (
        <div className="container">
        <h1><span> {comingFor === 'add' ? 'Add': 'Edit'}</span></h1>

        <div className="row">
            <div className="col-md-4" style={styles.inputContainer}>
                <InputLabel id="bu_id-label">Business Unit</InputLabel>
                <Select
                    fullWidth
                    labelId="bu_id-label"
                    id="bu_id"
                    name="buId"
                    value={buId}
                    onChange={onChangeValue}
                    label="Business Unit"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {businessUnits.map((val) => {
                        return (
                            <MenuItem key={val._id} value={val._id}>
                                {val.buName}
                            </MenuItem>
                        );
                    })}
                </Select>
            </div>

            <div className="col-md-4" style={styles.inputContainer}>
                <InputLabel id="requesterStaffId-label">Staff</InputLabel>
                <Select
                    fullWidth
                    labelId="requesterStaffId-label"
                    id="requesterStaffId"
                    name="requesterStaffId"
                    value={requesterStaffId}
                    onChange={onChangeValue}
                    label="Staff"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {staffs.map((val) => {
                        return (
                            <MenuItem key={val._id} value={val._id}>
                                {val.firstName}
                            </MenuItem>
                        );
                    })}
                </Select>
            </div>

            <div className="col-md-4" style={styles.inputContainer}>
                <MuiPickersUtilsProvider fullWidth utils={DateFnsUtils}>
                    <DateTimePicker
                        fullWidth
                        name="timeStamp"
                        inputVariant="outlined"
                        onChange={onChangeDate}
                        value={timeStamp ? timeStamp : new Date()}
                    />
                </MuiPickersUtilsProvider>
            </div>
        </div>

        <div className="row">          
            <div className="col-md-4" style={styles.inputContainer}>
                <TextField
                    fullWidth
                    id="status"
                    name="status"
                    label="Status"
                    type="text"
                    variant="outlined"
                    value={status}
                    onChange={onChangeValue}
                    error={!status && isFormSubmitted}
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

export default AddEditBuRepRequest;
