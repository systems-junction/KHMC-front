import React, { useEffect, useState, useReducer } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import tableStyles from '../../assets/jss/material-dashboard-react/components/tableStyle.js'
import Header from '../../components/Header/Header'
import business_Unit from '../../assets/img/Purchase Order.png'
import Back_Arrow from '../../assets/img/Back_Arrow.png'
import cookie from 'react-cookies'
import axios from 'axios'
import {
    updateEdrIpr
} from '../../public/endpoins'
import '../../assets/jss/material-dashboard-react/components/TextInputStyle.css'
import Notification from '../../components/Snackbar/Notification.js'
import CustomTable from '../../components/Table/Table'

const tableHeadingForTriage = [
    'Date/Time',
    'Doctor',
    'Triage Level',
    'General Appearance',
    'Head Neck',
    'Neurological',
    'Respiratory',
    'Cardiac',
    'Abdomen',
    ''
]
const tableDataKeysForTriage = [
    'date',
    'doctorName',
    'triageLevel',
    'generalAppearance',
    'headNeck',
    'neurological',
    'respiratory',
    'cardiac',
    'abdomen'
]

const styles = {
    stylesForButton: {
        color: 'white',
        cursor: 'pointer',
        borderRadius: 15,
        backgroundColor: '#2c6ddd',
        width: '120px',
        height: '45px',
        outline: 'none',
    },
}

const useStylesForTabs = makeStyles({
    root: {
        flexGrow: 1,
    },
})

const useStyles = makeStyles(tableStyles)

function TriageAndAssessment(props) {
    const classes = useStyles()
    const initialState = {
        triageAssessmentArray: '',

        triageLevel: 'N/A',
        generalAppearance: 'N/A',
        headNeck: 'N/A',
        respiratory: 'N/A',
        cardiac: 'N/A',
        abdomen: 'N/A',
        neurological: 'N/A',

        generalAppearanceText: null,
        headNeckText: null,
        respiratoryText: null,
        cardiacText: null,
        abdomenText: null,
        neurologicalText: null,
    }


    function reducer(state, { field, value }) {
        return {
            ...state,
            [field]: value,
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    const {
        triageAssessmentArray,

        triageLevel,
        generalAppearance,
        headNeck,
        respiratory,
        cardiac,
        abdomen,
        neurological,

        generalAppearanceText,
        headNeckText,
        respiratoryText,
        cardiacText,
        abdomenText,
        neurologicalText,
    } = state

    const classesForTabs = useStylesForTabs()

    const [value, setValue] = React.useState(0)
    const [id, setId] = React.useState('')
    const [currentUser, setCurrentUser] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setsuccessMsg] = useState('')
    const [requestType, setrequestType] = useState('')
    const [openNotification, setOpenNotification] = useState(false)
    const [MRN, setMRN] = useState('')

    useEffect(() => {
        setCurrentUser(cookie.load('current_user'))

        const selectedRec = props.history.location.state.selectedItem
        console.log("In triage : ", selectedRec.patientId.profileNo)
        setMRN(selectedRec.patientId.profileNo)
        setId(selectedRec._id)
        setrequestType(selectedRec.requestType)

        if (selectedRec.triageAssessment) {
            selectedRec.triageAssessment.map(
                (d) => (d.doctorName = d.requester ? d.requester.firstName + ' ' + d.requester.lastName : ''))
            dispatch({ field: "triageAssessmentArray", value: selectedRec.triageAssessment.reverse() })
        }

    }, [])

    const onCheckedValue = (e) => {
        if (e.target.value === "generalAppearanceText") {
            dispatch({ field: "generalAppearanceText", value: "" })
        }
        else if (e.target.value === "respiratoryText") {
            dispatch({ field: "respiratoryText", value: "" })
        }
        else if (e.target.value === "neurologicalText") {
            dispatch({ field: "neurologicalText", value: "" })
        }
        else if (e.target.value === "headNeckText") {
            dispatch({ field: "headNeckText", value: "" })
        }
        else if (e.target.value === "abdomenText") {
            dispatch({ field: "abdomenText", value: "" })
        }
        else if (e.target.value === "cardiacText") {
            dispatch({ field: "cardiacText", value: "" })
        }
        else {
            dispatch({ field: "generalAppearanceText", value: null })
            dispatch({ field: "respiratoryText", value: null })
            dispatch({ field: "neurologicalText", value: null })
            dispatch({ field: "headNeckText", value: null })
            dispatch({ field: "abdomenText", value: null })
            dispatch({ field: "cardiacText", value: null })
        }
        dispatch({ field: e.target.name, value: e.target.value })
    }

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const onNext = () => {
        setValue(value + 1)
    }

    const onSpecify = (e) => {
        if (e.target.name === "generalAppearance") {
            dispatch({ field: "generalAppearanceText", value: e.target.value })
        }
        else if (e.target.name === "headNeck") {
            dispatch({ field: "headNeckText", value: e.target.value })
        }
        else if (e.target.name === "respiratory") {
            dispatch({ field: "respiratoryText", value: e.target.value })
        }
        else if (e.target.name === "abdomen") {
            dispatch({ field: "abdomenText", value: e.target.value })
        }
        else if (e.target.name === "neurological") {
            dispatch({ field: "neurologicalText", value: e.target.value })
        }
        else if (e.target.name === "cardiac") {
            dispatch({ field: "cardiacText", value: e.target.value })
        }
        dispatch({ field: e.target.name, value: e.target.value })
    }

    const handleSubmitAssessment = (e) => {
        let triageAssessment = []

        triageAssessment = [
            ...triageAssessmentArray,
            {
                requester: currentUser.staffId,
                triageLevel: triageLevel,
                generalAppearance: generalAppearance,
                headNeck: headNeck,
                respiratory: respiratory,
                cardiac: cardiac,
                abdomen: abdomen,
                neurological: neurological,
            },
        ]
        console.log(e)
        const params = {
            _id: id,
            requestType,
            triageAssessment: triageAssessment
        }
        console.log(params, "params")
        axios.put(updateEdrIpr, params)
            .then((res) => {
                if (res.data.success) {
                    console.log("Update Patient data patient assessment: ", res.data.data)
                    props.history.push({
                        pathname: 'success',
                        state: { message: `Triage & Assessment for patient MRN ${res.data.data.patientId.profileNo} added successfully` },
                    })
                } else if (!res.data.success) {
                    setOpenNotification(true);
                    setErrorMsg("Error in Submitting Assessment");
                }
            })
            .catch((e) => {
                console.log("error after submitting Assessment", e);
                setOpenNotification(true);
                setErrorMsg("Error while submitting Assessment");
            });
    }

    if (openNotification) {
        setTimeout(() => {
            setOpenNotification(false)
            setErrorMsg('')
            setsuccessMsg('')
        }, 2000)
    }

    return (
        <div
            style={{
                backgroundColor: '#60d69f',
                position: 'fixed',
                display: 'flex',
                width: '100%',
                height: '100%',
                flexDirection: 'column',
                flex: 1,
                overflowY: 'scroll',
            }}
        >
            <Header />

            <div className='cPadding'>
                <div className='subheader'>
                    <div>
                        <img src={business_Unit} />
                        <div style={{ flex: 4, display: 'flex', alignItems: 'center' }}>
                            <h3 style={{ color: 'white', fontWeight: '700' }}>
                                {'Triage & Assessment'}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className={classesForTabs.root}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="primary"
                        TabIndicatorProps={{ style: { background: '#12387a' } }}
                        centered
                    >
                        <Tab
                            style={{
                                color: 'white',
                                borderRadius: 15,
                                outline: 'none',
                                color: value === 0 ? "#12387a" : '#3B988C',
                            }}
                            label='Triage Level'
                        />
                        <Tab
                            style={{
                                color: 'white',
                                borderRadius: 15,
                                outline: 'none',
                                color: value === 1 ? "#12387a" : '#3B988C',
                            }}
                            label='Physical Examination'
                        />
                        <Tab
                            style={{
                                color: 'white',
                                borderRadius: 15,
                                outline: 'none',
                                color: value === 2 ? "#12387a" : '#3B988C',
                            }}
                            label='History'
                        />
                    </Tabs>
                </div>

                {value === 0 ? (
                    <>
                        <div
                            style={{
                                flex: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                backgroundColor: 'white',
                                marginTop: '25px',
                                marginBottom: '25px',
                                padding: '25px',
                                borderRadius: '25px',
                            }}
                            className='container-fluid'
                        >
                            <div className='row'>
                                <label style={{ paddingLeft: '15px' }}>
                                    <strong>Triage Level</strong>
                                </label>
                            </div>
                            <div onChange={onCheckedValue} value={triageLevel}>
                                <div className='row'>
                                    <div className='col-md-4'>
                                        <input
                                            type='radio'
                                            name='triageLevel'
                                            value='Resuscitation'
                                            checked={triageLevel === 'Resuscitation'}
                                        />
                                        <label for='male'>&nbsp;&nbsp;1 - Resuscitation</label>
                                    </div>
                                    <div className='col-md-4'>
                                        <input
                                            type='radio'
                                            name='triageLevel'
                                            value='Emergent'
                                            checked={triageLevel === 'Emergent'}
                                        />
                                        <label for='male'>&nbsp;&nbsp;2 - Emergent</label>
                                    </div>
                                    <div className='col-md-4'>
                                        <input type='radio' name='triageLevel'
                                            value='Urgent'
                                            checked={triageLevel === 'Urgent'}
                                        />
                                        <label for='male'>&nbsp;&nbsp;3 - Urgent</label>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-4'>
                                        <input
                                            type='radio'
                                            name='triageLevel'
                                            value='LessUrgent'
                                            checked={triageLevel === 'LessUrgent'}
                                        />
                                        <label for='male'>&nbsp;&nbsp;4 - Less Urgent</label>
                                    </div>
                                    <div className='col-md-4'>
                                        <input
                                            type='radio'
                                            name='triageLevel'
                                            value='NonUrgent'
                                            checked={triageLevel === 'NonUrgent'}
                                        />
                                        <label for='male'>&nbsp;&nbsp;5 - Non Urgent</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    flex: 1,
                                    justifyContent: 'flex-end',
                                    marginTop: '2%',
                                    marginBottom: '2%',
                                    paddingRight: '32px',
                                }}
                                className='container-fluid'
                            >
                                <div className='row'>
                                    <Button
                                        style={styles.stylesForButton}
                                        //disabled={!validateFormType1()}
                                        onClick={onNext}
                                        variant='contained'
                                        color='primary'
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : value === 1 ? (
                    <>
                        <div
                            style={{
                                flex: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                backgroundColor: 'white',
                                marginTop: '25px',
                                marginBottom: '25px',
                                padding: '25px',
                                borderRadius: '25px',
                            }}
                        >
                            <div className='container-fluid'>
                                <div className='row'>
                                    <label style={{ paddingLeft: '15px' }}>
                                        <strong>General Appearance</strong>
                                    </label>
                                </div>
                                <form
                                    className='form-inline row'
                                    role='form'
                                    onChange={onCheckedValue}
                                    value={generalAppearance}
                                >
                                    <div className='form-group col-md-3'>
                                        <div class='radio'>
                                            <label class='radio-inline control-label'>
                                                <input
                                                    type='radio'
                                                    name='generalAppearance'
                                                    value='Good'
                                                    checked={generalAppearance === 'Good'}
                                                />
                                                    &nbsp;&nbsp;Good
                                                </label>
                                        </div>
                                    </div>
                                    <div className='form-group col-md-3'>
                                        <div class='radio'>
                                            <label class='radio-inline control-label'>
                                                <input type='radio' name='generalAppearance' value='Sick'
                                                    checked={generalAppearance === 'Sick'}
                                                />
                                                    &nbsp;&nbsp;Sick
                                                </label>
                                        </div>
                                    </div>
                                    <div className='form-group col-md-3'>
                                        <div class='radio'>
                                            <label class='radio-inline control-label'>
                                                <input
                                                    type='radio'
                                                    name='generalAppearance'
                                                    value='Pain'
                                                    checked={generalAppearance === 'Pain'}
                                                />
                                                    &nbsp;&nbsp;Pain
                                                </label>
                                        </div>
                                    </div>
                                    <div className='form-group col-md-3'>
                                        <div class='radio'>
                                            <label class='radio-inline control-label'>
                                                <input
                                                    type='radio'
                                                    name='generalAppearance'
                                                    value='generalAppearanceText'
                                                    checked={generalAppearanceText !== null}
                                                />
                                                    &nbsp;&nbsp;Other
                                            </label>
                                        </div>
                                    </div>
                                </form>
                                {/* <form
                                    className='form-inline row'
                                    role='form'
                                    onChange={onCheckedValue}
                                    value={generalAppearance}
                                > */}
                                <div className='form-group col-md-12'>
                                    <input
                                        style={{ outline: 'none', backgroundColor: '#F7F5F5' }}
                                        disabled={generalAppearanceText === null}
                                        type='text'
                                        placeholder='Specify'
                                        onChange={onSpecify}
                                        name='generalAppearance'
                                        value={generalAppearanceText}
                                        className='control-label textInputStyle'
                                    />
                                </div>
                                {/* </form> */}
                            </div>
                            <br />
                            <div className='container-fluid'>
                                <div className='row'>
                                    <label style={{ paddingLeft: '15px' }}>
                                        <strong>Head and Neck</strong>
                                    </label>
                                </div>
                                <form
                                    className='form-inline row'
                                    role='form'
                                    onChange={onCheckedValue}
                                    value={headNeck}
                                >
                                    <div className='form-group col-md-3'>
                                        <div class='radio'>
                                            <label class='radio-inline control-label'>
                                                <input type='radio' name='headNeck' value='Normal'
                                                    checked={headNeck === 'Normal'}
                                                />
                                                &nbsp;&nbsp;Normal
                                            </label>
                                        </div>
                                    </div>
                                    <div className='form-group col-md-3'>
                                        <div class='radio'>
                                            <label class='radio-inline control-label'>
                                                <input type='radio' name='headNeck' value='Line'
                                                    checked={headNeck === 'Line'}
                                                />
                                                &nbsp;&nbsp;Line
                                            </label>
                                        </div>
                                    </div>
                                    <div className='form-group col-md-3'>
                                        <div class='radio'>
                                            <label class='radio-inline control-label'>
                                                <input
                                                    type='radio'
                                                    name='headNeck'
                                                    value='Thyroid Enlargement'
                                                    checked={headNeck === 'Thyroid Enlargement'}
                                                />
                                                    &nbsp;&nbsp;Thyroid Enlargement
                                                </label>
                                        </div>
                                    </div>
                                    <div className='form-group col-md-3'>
                                        <div class='radio'>
                                            <label class='radio-inline control-label'>
                                                <input type='radio' name='headNeck' value='headNeckText'
                                                    checked={headNeckText !== null}
                                                />
                                                    &nbsp;&nbsp;Other
                                                </label>
                                        </div>
                                    </div>
                                </form>
                                {/* <form className='form-inline row' role='form' onChange={onCheckedValue}
                                    value={headNeck}> */}
                                <div className='form-group col-md-12'>
                                    <input
                                        style={{ outline: 'none', backgroundColor: '#F7F5F5' }}
                                        disabled={headNeckText === null}
                                        type='text'
                                        onChange={onSpecify}
                                        placeholder='Specify'
                                        name='headNeck'
                                        value={headNeckText}
                                        className='control-label textInputStyle'
                                    />
                                </div>
                                {/* </form> */}
                            </div>
                            <br />
                            <div className='container-fluid'>
                                <div className='row'>
                                    <label style={{ paddingLeft: '15px' }}>
                                        <strong>Respiratory</strong>
                                    </label>
                                </div>
                                <form
                                    className='form-inline row'
                                    role='form'
                                    onChange={onCheckedValue}
                                    value={respiratory}
                                >
                                    <div className='form-group col-md-3'>
                                        <div class='radio'>
                                            <label class='radio-inline control-label'>
                                                <input type='radio' name='respiratory' value='GBAE'
                                                    checked={respiratory === 'GBAE'}
                                                />
                                                    &nbsp;&nbsp;GBAE
                                            </label>
                                        </div>
                                    </div>
                                    <div className='form-group col-md-3'>
                                        <div class='radio'>
                                            <label class='radio-inline control-label'>
                                                <input
                                                    type='radio'
                                                    name='respiratory'
                                                    value='Wheezing'
                                                    checked={respiratory === 'Wheezing'}
                                                />
                                                    &nbsp;&nbsp;Wheezing
                                            </label>
                                        </div>
                                    </div>
                                    <div className='form-group col-md-3'>
                                        <div class='radio'>
                                            <label class='radio-inline control-label'>
                                                <input
                                                    type='radio'
                                                    name='respiratory'
                                                    value='Crackles'
                                                    checked={respiratory === 'Crackles'}
                                                />
                                                    &nbsp;&nbsp;Crackles
                                            </label>
                                        </div>
                                    </div>
                                    <div className='form-group col-md-3'>
                                        <div class='radio'>
                                            <label class='radio-inline control-label'>
                                                <input
                                                    type='radio'
                                                    name='respiratory'
                                                    value='Crepitation'
                                                    checked={respiratory === 'Crepitation'}
                                                />
                                                    &nbsp;&nbsp;Crepitation
                                            </label>
                                        </div>
                                    </div>
                                </form>
                                <div className='row'>
                                    <form className='form-inline' role='form'
                                        onChange={onCheckedValue}
                                        value={respiratory}
                                    >
                                        <div className='form-group col-md-3'>
                                            <div class='radio'>
                                                <label class='radio-inline control-label'>
                                                    <input type='radio' name='respiratory' value='respiratoryText'
                                                        checked={respiratoryText !== null}
                                                    />
                                                    &nbsp;&nbsp;Other
                                            </label>
                                            </div>
                                        </div>
                                    </form>
                                    <div className='form-group col-md-9'>
                                        <input
                                            style={{ outline: 'none', backgroundColor: '#F7F5F5' }}
                                            disabled={respiratoryText === null}
                                            type='text'
                                            placeholder='Specify'
                                            onChange={onSpecify}
                                            name='respiratory'
                                            value={respiratoryText}
                                            className='control-label textInputStyle'
                                        />
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className='container-fluid'>
                                <div className='row'>
                                    <label style={{ paddingLeft: '15px' }}>
                                        <strong>Cardiac</strong>
                                    </label>
                                </div>
                                <form
                                    className='form-inline row'
                                    role='form'
                                    onChange={onCheckedValue}
                                    value={cardiac}
                                >
                                    <div className='form-group col-md-4 col-sm-4'>
                                        <div class='radio'>
                                            <label class='radio-inline control-label'>
                                                <input
                                                    type='radio'
                                                    name='cardiac'
                                                    value='Normal S1, S2'
                                                    checked={cardiac === 'Normal S1, S2'}
                                                />
                                                    &nbsp;&nbsp;Normal S1, S2
                                                </label>
                                        </div>
                                    </div>
                                    <div className='form-group col-md-4 col-sm-4'>
                                        <div class='radio'>
                                            <label class='radio-inline control-label'>
                                                <input type='radio' name='cardiac' value='No Murmurs'
                                                    checked={cardiac === 'No Murmurs'}
                                                />
                                                    &nbsp;&nbsp;No Murmurs
                                                </label>
                                        </div>
                                    </div>
                                    <div className='form-group col-md-4 col-sm-4'>
                                        <div class='radio'>
                                            <label class='radio-inline control-label'>
                                                <input type='radio' name='cardiac' value='cardiacText'
                                                    checked={cardiacText !== null}
                                                />
                                                    &nbsp;&nbsp;Other
                                                </label>
                                        </div>
                                    </div>
                                </form>
                                {/* <form className='form-inline row' role='form'
                                    onChange={onCheckedValue}
                                    value={cardiac}
                                > */}
                                <div className='form-group col-md-12'>
                                    <input
                                        style={{ outline: 'none', backgroundColor: '#F7F5F5' }}
                                        disabled={cardiacText === null}
                                        type='text'
                                        placeholder='Specify'
                                        onChange={onSpecify}
                                        name='cardiac'
                                        value={cardiacText}
                                        className='control-label textInputStyle'
                                    />
                                </div>
                                {/* </form> */}
                            </div>
                            <br />
                            <div className='container-fluid'>
                                <div className='row'>
                                    <label style={{ paddingLeft: '15px' }}>
                                        <strong>Abdomen</strong>
                                    </label>
                                </div>
                                <form
                                    className='form-inline row'
                                    role='form'
                                    onChange={onCheckedValue}
                                    value={abdomen}
                                >
                                    <div className='form-group col-md-3'>
                                        <div class='radio'>
                                            <label class='radio-inline control-label'>
                                                <input type='radio' name='abdomen' value='Soft Lax'
                                                    checked={abdomen === 'Soft Lax'}
                                                />
                                                    &nbsp;&nbsp;Soft Lax
                                                </label>
                                        </div>
                                    </div>
                                    <div className='form-group col-md-3'>
                                        <div class='radio'>
                                            <label class='radio-inline control-label'>
                                                <input
                                                    type='radio'
                                                    name='abdomen'
                                                    value='No Tenderness'
                                                    checked={abdomen === 'No Tenderness'}
                                                />
                                                    &nbsp;&nbsp;No Tenderness
                                                </label>
                                        </div>
                                    </div>
                                    <div className='form-group col-md-3'>
                                        <div class='radio'>
                                            <label class='radio-inline control-label'>
                                                <input type='radio' name='abdomen' value='Murphy +ve'
                                                    checked={abdomen === 'Murphy +ve'}
                                                />
                                                    &nbsp;&nbsp;Murphy +ve
                                                </label>
                                        </div>
                                    </div>
                                    <div className='form-group col-md-3'>
                                        <div class='radio'>
                                            <label class='radio-inline control-label'>
                                                <input
                                                    type='radio'
                                                    name='abdomen'
                                                    value='Rebound +ve'
                                                    checked={abdomen === 'Rebound +ve'}
                                                />
                                                    &nbsp;&nbsp;Rebound +ve
                                                </label>
                                        </div>
                                    </div>
                                </form>
                                <div class="row">
                                    <form className='form-inline' role='form'
                                        onChange={onCheckedValue}
                                        value={abdomen}
                                    >
                                        <div className='form-group col-md-3'>
                                            <div class='radio'>
                                                <label class='radio-inline control-label'>
                                                    <input type='radio' name='abdomen' value='abdomenText'
                                                        checked={abdomenText !== null}
                                                    />
                                                    &nbsp;&nbsp;Other
                                                </label>
                                            </div>
                                        </div>
                                    </form>
                                    <div className='col-md-9'>
                                        <input
                                            style={{ outline: 'none', backgroundColor: '#F7F5F5' }}
                                            disabled={abdomenText === null}
                                            type='text'
                                            placeholder='Specify'
                                            onChange={onSpecify}
                                            name='abdomen'
                                            value={abdomenText}
                                            className=' textInputStyle'
                                        />
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className='container-fluid'>
                                <div className='row'>
                                    <label style={{ paddingLeft: '15px' }}>
                                        <strong>Neurological</strong>
                                    </label>
                                </div>
                                <form
                                    className='form-inline row'
                                    role='form'
                                    onChange={onCheckedValue}
                                    value={neurological}
                                >
                                    <div className='form-group col-md-3'>
                                        <div class='radio'>
                                            <label class='radio-inline control-label'>
                                                <input
                                                    type='radio'
                                                    name='neurological'
                                                    value='Conscious'
                                                    checked={neurological === 'Conscious'}
                                                />
                                                    &nbsp;&nbsp;Conscious
                                                </label>
                                        </div>
                                    </div>
                                    <div className='form-group col-md-3'>
                                        <div class='radio'>
                                            <label class='radio-inline control-label'>
                                                <input
                                                    type='radio'
                                                    name='neurological'
                                                    value='Oriented'
                                                    checked={neurological === 'Oriented'}
                                                />
                                                    &nbsp;&nbsp;Oriented
                                                </label>
                                        </div>
                                    </div>
                                    <div className='form-group col-md-3'>
                                        <div class='radio'>
                                            <label class='radio-inline control-label'>
                                                <input
                                                    type='radio'
                                                    name='neurological'
                                                    value='Weakness'
                                                    checked={neurological === 'Weakness'}
                                                />
                                                    &nbsp;&nbsp;Weakness
                                                </label>
                                        </div>
                                    </div>
                                    <div className='form-group col-md-3'>
                                        <div class='radio'>
                                            <label class='radio-inline control-label'>
                                                <input type='radio' name='neurological' value='neurologicalText'
                                                    checked={neurologicalText !== null}
                                                />
                                                    &nbsp;&nbsp;Other
                                                </label>
                                        </div>
                                    </div>
                                </form>
                                {/* <form className='form-inline row' role='form'
                                    onChange={onCheckedValue}
                                    value={neurological}
                                > */}
                                    <div classNames='col-md-12'>
                                        <input
                                            style={{ outline: 'none', backgroundColor: '#F7F5F5' }}
                                            disabled={neurologicalText === null}
                                            type='text'
                                            placeholder='Specify'
                                            onChange={onSpecify}
                                            name='neurological'
                                            value={neurologicalText}
                                            className='textInputStyle'
                                        />
                                    </div>
                                {/* </form> */}
                            </div>
                        </div>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    flex: 1,
                                    justifyContent: 'flex-end',
                                    marginTop: '2%',
                                    marginBottom: '2%',
                                    paddingRight: '32px',
                                }}
                                className='container-fluid'
                            >
                                <div className='row'>
                                    <Button
                                        style={styles.stylesForButton}
                                        //disabled={!validateFormType1()}
                                        onClick={handleSubmitAssessment}
                                        variant='contained'
                                        color='primary'
                                    >
                                        Submit
                                        </Button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : value === 2 ? (
                    <div
                        style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
                        className='container-fluid'
                    >
                        <div className='row' style={{ marginTop: '20px' }}>
                            {triageAssessmentArray !== 0 ? (
                                <CustomTable
                                    tableData={triageAssessmentArray}
                                    tableDataKeys={tableDataKeysForTriage}
                                    tableHeading={tableHeadingForTriage}
                                    borderBottomColor={'#60d69f'}
                                    borderBottomWidth={20}
                                />
                            ) : (
                                    undefined
                                )}
                        </div>
                    </div>
                ) : (
                                undefined
                            )}

                <Notification msg={errorMsg} open={openNotification} success={successMsg} />

                <div style={{ marginBottom: 20, marginTop: 50 }}>
                    <img
                        onClick={() => props.history.goBack()}
                        src={Back_Arrow}
                        style={{ width: 45, height: 35, cursor: 'pointer' }}
                    />
                </div>
            </div>
        </div>
    )
}
export default TriageAndAssessment
