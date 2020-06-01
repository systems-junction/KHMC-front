/*eslint-disable*/
import React, { useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Notification from 'components/Snackbar/Notification.js';
import Paper from '@material-ui/core/Paper';
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import CustomTable from '../../components/Table/Table';
import ConfirmationModal  from '../../components/Modal/confirmationModal';
import axios from 'axios';
import { getBuStockOutLogUrl, deleteBuStockOutLogUrl } from '../../public/endpoins';

import Loader from 'react-loader-spinner';

const useStyles = makeStyles(styles);

const tableHeading = [
  'Quantity',
  'Item Name',
  'Time Stamp',
  'Sale Price',
  'Action'
];
const tableDataKeys = [
    'qty',
    ['itemId', 'name'],
    'timeStamp',
    'salePrice'
];
const actions = {edit: true, delete: true};


export default function BuStockOutLog(props) {

    const classes = useStyles();
    const [items, setItems] = useState('');
    const [buStockOutLog, setBuStockOutLog] = useState('');
    const [staff, setStaff] = useState('');
    const [businessUnit, setBusinessUnit] = useState('');
    const [deleteItem, setdeleteItem] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [openNotification, setOpenNotification] = useState(false);

    if(openNotification) {
        setTimeout(() => {
        setOpenNotification(false);
        setErrorMsg("")
        }, 2000);
    }

    function getBuStockInLog() {
        axios.get(getBuStockOutLogUrl).then(res => {
            if(res.data.success) {
                setBuStockOutLog(res.data.data.buStockOutLog);
                setItems(res.data.data.items);
                setStaff(res.data.data.staff);
                setBusinessUnit(res.data.data.businessUnit);
            }
            else if (!res.data.success) {
                setErrorMsg(res.data.error)
                setOpenNotification(true);
            }
            return res;
        })
        .catch(e => {
            console.log('error: ', e);
        });
    }

    useEffect(() => {
        getBuStockInLog();
    }, []);

    const addNewItem = () => {
        let path = `bustockoutlog/next/add`;
        props.history.push({
            pathname: path,
            state: { comingFor: 'add', items, staff, businessUnit }
        });
    };

    function handleEdit(rec) {
        let path = `bustockoutlog/next/edit`;
        props.history.push({
            pathname: path,
            state: { comingFor: 'edit', selectedItem: rec, items, staff, businessUnit }
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

        axios.delete(deleteBuStockOutLogUrl + '/' + params._id).then(res => {
            if (res.data.success) {
            setdeleteItem('');
            setModalVisible(false);
            window.location.reload(false);
            }
            else if (!res.data.success) {
                setErrorMsg(res.data.error)
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
        {buStockOutLog ? (
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
                    tableData={buStockOutLog}
                    tableDataKeys={tableDataKeys}
                    tableHeading={tableHeading}
                    action={actions}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />                   
            </div>


            <ConfirmationModal modalVisible={modalVisible} 
                msg="Are you sure want to delete the record?"
                hideconfirmationModal={()=>setModalVisible(false)}
                onConfirmDelete={()=> deleteBuReturn()}
                setdeleteItem={()=>setdeleteItem('')}
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