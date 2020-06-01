/* eslint-disable react/jsx-indent */
/* eslint-disable no-unused-expressions */
import React from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

export default function ConfirmationModal(props) {
    const modalStyle = {
        backgroundColor: '#72101e',
        borderRadius: 10,
        height: '40%',
        marginLeft: '15%',
        marginRight: '15%',
        marginTop: '10%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        flex: 1,
        position: 'fixed'
    }

    const headingStyle = {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'Ubuntu'
    }

    const innerDivStyle = {
        display: 'flex',
        marginTop: '4%',
        justifyContent: 'space-evenly'
    }

    return(
        <Modal
            open={props.modalVisible}
            style={modalStyle}
            onClose={() => props.hideconfirmationModal()}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div>
                <h4 style={headingStyle}>
                    {props.msg}
                </h4>

                <div style={innerDivStyle}>
                    <Button onClick={() => {props.hideconfirmationModal();props.setdeleteItem('');}} variant="contained">
                        Cancel
                    </Button>

                    <Button
                        style={{ marginRight: '3%' }}
                        onClick={() => props.onConfirmDelete()}
                        variant="contained"
                        color="primary"
                    >
                        Done
                    </Button>
                </div>
            </div>
        </Modal>
    );

}