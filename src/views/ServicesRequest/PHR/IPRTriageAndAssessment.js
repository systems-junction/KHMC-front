import React, { useEffect, useState, useReducer } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import tableStyles from '../../../assets/jss/material-dashboard-react/components/tableStyle.js'
import Header from '../../../components/Header/Header'
import business_Unit from '../../../assets/img/Purchase Order.png'
import Back_Arrow from '../../../assets/img/Back_Arrow.png'
import '../../../assets/jss/material-dashboard-react/components/TextInputStyle.css'

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
    triageLevel: '',
    goodAppearance: '',
    specify: '',
    headAndNeck: '',
    respiratory: '',
    cardiac: '',
    abdomen: '',
    neurological: '',
  }

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const {
    triageLevel,
    goodAppearance,
    specify,
    headAndNeck,
    respiratory,
    cardiac,
    abdomen,
    neurological,
  } = state

  const classesForTabs = useStylesForTabs()

  const [value, setValue] = React.useState(0)

  const onCheckedValue = (e) => {
    console.log(e.target.value)
    dispatch({ field: e.target.name, value: e.target.value })
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const onNext = () => {
    setValue(value + 1)
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
      <Header history={props.history}/>

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
            TabIndicatorProps={{style: {background:'#12387a'}}}
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
              className='container'
            >
              <div className='row'>
                <label style={{ paddingLeft: '15px' }}>
                  <strong>Triage Level</strong>
                </label>
              </div>
              <div onChange={onCheckedValue}>
                <div className='row'>
                  <div className='col-md-4'>
                    <input
                      type='radio'
                      name='triageLevel'
                      value='1 - Resucsitation'
                    />
                    <label for='male'>&nbsp;&nbsp;1 - Resucsitation</label>
                  </div>
                  <div className='col-md-4'>
                    <input
                      type='radio'
                      name='triageLevel'
                      value='2 - Emergent'
                    />
                    <label for='male'>&nbsp;&nbsp;2 - Emergent</label>
                  </div>
                  <div className='col-md-4'>
                    <input type='radio' name='triageLevel' value='3 - Urgent' />
                    <label for='male'>&nbsp;&nbsp;3 - Urgent</label>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-4'>
                    <input
                      type='radio'
                      name='triageLevel'
                      value='4 - Less urgent'
                    />
                    <label for='male'>&nbsp;&nbsp; 4 - Less urgent</label>
                  </div>
                  <div className='col-md-4'>
                    <input
                      type='radio'
                      name='triageLevel'
                      value='5 - Non urgent'
                    />
                    <label for='male'>&nbsp;&nbsp; 5 - Non urgent</label>
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
                className='container'
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
        ) : (
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
              className='container'
            >
              <div>
                <div className='row'>
                  <label style={{ paddingLeft: '10px' }}>
                    <strong>General Appearance</strong>
                  </label>
                </div>
                <form
                  class='form-inline row'
                  role='form'
                  onChange={onCheckedValue}
                >
                  <div class='form-group col-md-2'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input
                          type='radio'
                          name='goodAppearance'
                          value='Good'
                        />
                        &nbsp;&nbsp;Good
                      </label>
                    </div>
                  </div>
                  <div class='form-group col-md-2'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input type='radio' name='goodAppearance' value='Ill' />
                        &nbsp;&nbsp;Ill
                      </label>
                    </div>
                  </div>
                  <div class='form-group col-md-2'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input
                          type='radio'
                          name='goodAppearance'
                          value='Pain'
                        />
                        &nbsp;&nbsp;Pain
                      </label>
                    </div>
                  </div>
                  <div class='form-group col-md-2'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input
                          type='radio'
                          name='goodAppearance'
                          value='Other'
                        />
                        &nbsp;&nbsp;Other
                      </label>
                    </div>
                  </div>
                  <div class='form-group col-md-2'>
                    <input
                      style={{ outline: 'none', backgroundColor: '#F7F5F5' }}
                      type='text'
                      placeholder='Specify'
                      name={'specify'}
                      value={specify}
                      className='form-control textInputStyle'
                      // maxlength='5'
                      // data-rule-required='true'
                      // contenteditable='false'
                    />
                  </div>
                </form>
              </div>
              <div class='container'>
                <div className='row'>
                  <label style={{ paddingLeft: '15px' }}>
                    <strong>Head and Neck</strong>
                  </label>
                </div>
                <form
                  class='form-inline row'
                  role='form'
                  onChange={onCheckedValue}
                >
                  <div class='form-group col-md-2'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input type='radio' name='headAndNeck' value='Normal' />
                        &nbsp;&nbsp;Normal
                      </label>
                    </div>
                  </div>
                  <div class='form-group col-md-2'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input type='radio' name='headAndNeck' value='Line' />
                        &nbsp;&nbsp;Line
                      </label>
                    </div>
                  </div>
                  <div class='form-group col-md-2'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input
                          type='radio'
                          name='headAndNeck'
                          value='Thyroid'
                        />
                        &nbsp;&nbsp;Thyroid
                      </label>
                    </div>
                  </div>
                  <div class='form-group col-md-2'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input type='radio' name='headAndNeck' value='Other' />
                        &nbsp;&nbsp;Other
                      </label>
                    </div>
                  </div>
                  <div class='form-group col-md-2'>
                    <input
                      style={{ outline: 'none', backgroundColor: '#F7F5F5' }}
                      type='text'
                      placeholder='Specify'
                      name={'specify'}
                      value={specify}
                      className='form-control textInputStyle'
                      // maxlength='5'
                      // data-rule-required='true'
                      // contenteditable='false'
                    />
                  </div>
                </form>
              </div>

              <div class='container'>
                <div className='row'>
                  <label style={{ paddingLeft: '15px' }}>
                    <strong>Respiratory</strong>
                  </label>
                </div>
                <form
                  class='form-inline row'
                  role='form'
                  onChange={onCheckedValue}
                >
                  <div class='form-group col-md-2'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input type='radio' name='respiratory' value='GBAE' />
                        &nbsp;&nbsp;GBAE
                      </label>
                    </div>
                  </div>
                  <div class='form-group col-md-2'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input
                          type='radio'
                          name='respiratory'
                          value='Wheezing'
                        />
                        &nbsp;&nbsp;Wheezing
                      </label>
                    </div>
                  </div>
                  <div class='form-group col-md-2'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input type='radio' name='respiratory' value='Other' />
                        &nbsp;&nbsp;Other
                      </label>
                    </div>
                  </div>
                  <div class='form-group col-md-2'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input
                          type='radio'
                          name='respiratory'
                          value='Crackles'
                        />
                        &nbsp;&nbsp;Crackles
                      </label>
                    </div>
                  </div>
                  <div class='form-group col-md-2'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input
                          type='radio'
                          name='respiratory'
                          value='Crepitation'
                        />
                        &nbsp;&nbsp;Crepitation
                      </label>
                    </div>
                  </div>
                </form>
              </div>

              {/* <div class='container'>
                <form class='form-inline row' onChange={onCheckedValue}>
                  <div class='form-group col-md-12'>
                    <input
                      style={{ outline: 'none', backgroundColor: '#F7F5F5' }}
                      type='text'
                      placeholder='Specify'
                      name={'specify'}
                      value={specify}
                      className='form-control textInputStyle'
                    />
                  </div>
                </form>
              </div> */}
              <br />
              <div className='container'>
                <form class='form-inline row' role='form'>
                  <div className='form-group col-md-12'>
                    <input
                      style={{ outline: 'none', backgroundColor: '#F7F5F5' }}
                      type='text'
                      placeholder='Specify'
                      name={'specify'}
                      value={specify}
                      className='control-label textInputStyle'
                      onChange={onCheckedValue}
                    />
                  </div>
                </form>
              </div>

              <br />

              <div class='container'>
                <div className='row'>
                  <label style={{ paddingLeft: '15px' }}>
                    <strong>Cardiac</strong>
                  </label>
                </div>
                <form
                  class='form-inline row'
                  role='form'
                  onChange={onCheckedValue}
                >
                  <div class='form-group col-md-2'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input
                          type='radio'
                          name='cardiac'
                          value='Normal S1, S2'
                        />
                        &nbsp;&nbsp;Normal S1, S2
                      </label>
                    </div>
                  </div>
                  <div class='form-group col-md-2'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input type='radio' name='cardiac' value='No Murmurs' />
                        &nbsp;&nbsp;No Murmurs
                      </label>
                    </div>
                  </div>
                  <div class='form-group col-md-2'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input type='radio' name='cardiac' value='Other' />
                        &nbsp;&nbsp;Other
                      </label>
                    </div>
                  </div>
                  <div class='form-group col-md-2'>
                    <input
                      style={{ outline: 'none', backgroundColor: '#F7F5F5' }}
                      type='text'
                      placeholder='Specify'
                      name={'specify'}
                      value={specify}
                      className='form-control textInputStyle'
                      // maxlength='5'
                      // data-rule-required='true'
                      // contenteditable='false'
                    />
                  </div>
                </form>
              </div>

              <div class='container'>
                <div className='row'>
                  <label style={{ paddingLeft: '15px' }}>
                    <strong>Abdomen</strong>
                  </label>
                </div>
                <form
                  class='form-inline row'
                  role='form'
                  onChange={onCheckedValue}
                >
                  <div class='form-group col-md-2'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input type='radio' name='abdomen' value='Soft Lax' />
                        &nbsp;&nbsp;Soft Lax
                      </label>
                    </div>
                  </div>
                  <div class='form-group col-md-2'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input
                          type='radio'
                          name='abdomen'
                          value='No Tenderness'
                        />
                        &nbsp;&nbsp;No Tenderness
                      </label>
                    </div>
                  </div>
                  <div class='form-group col-md-2'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input type='radio' name='abdomen' value='Murphy +ve' />
                        &nbsp;&nbsp;Murphy +ve
                      </label>
                    </div>
                  </div>
                  <div class='form-group col-md-2'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input
                          type='radio'
                          name='abdomen'
                          value='Rebound +ve'
                        />
                        &nbsp;&nbsp;Rebound +ve
                      </label>
                    </div>
                  </div>
                  <div class='form-group col-md-2'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input type='radio' name='abdomen' value='Other' />
                        &nbsp;&nbsp;Other
                      </label>
                    </div>
                  </div>
                  <div class='col-md-2'>
                    <input
                      style={{ outline: 'none', backgroundColor: '#F7F5F5' }}
                      type='text'
                      placeholder='Specify'
                      name={'specify'}
                      value={specify}
                      className=' textInputStyle'
                      //maxlength='5'
                      // data-rule-required='true'
                      // contenteditable='false'
                    />
                  </div>
                </form>
              </div>

              <div class='container'>
                <div className='row'>
                  <label style={{ paddingLeft: '15px' }}>
                    <strong>Neurological</strong>
                  </label>
                </div>
                <form
                  class='form-inline row'
                  role='form'
                  onChange={onCheckedValue}
                >
                  <div class='form-group col-md-2'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input
                          type='radio'
                          name='neurological'
                          value='Conscious'
                        />
                        &nbsp;&nbsp;Conscious
                      </label>
                    </div>
                  </div>
                  <div class='form-group col-md-2'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input
                          type='radio'
                          name='neurological'
                          value='Oriented'
                        />
                        &nbsp;&nbsp;Oriented
                      </label>
                    </div>
                  </div>
                  <div class='form-group col-md-2'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input
                          type='radio'
                          name='neurological'
                          value='Weakness'
                        />
                        &nbsp;&nbsp;Weakness
                      </label>
                    </div>
                  </div>
                  <div class='form-group col-md-2'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input type='radio' name='neurological' value='Other' />
                        &nbsp;&nbsp;Other
                      </label>
                    </div>
                  </div>
                  <div class='form-group col-md-2'>
                    <input
                      style={{ outline: 'none', backgroundColor: '#F7F5F5' }}
                      type='text'
                      placeholder='Specify'
                      name={'specify'}
                      value={specify}
                      className='form-control textInputStyle'
                      // maxlength='5'
                      // data-rule-required='true'
                      // contenteditable='false'
                    />
                  </div>
                </form>
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
                className='container'
              >
                <div className='row'>
                  <Button
                    style={styles.stylesForButton}
                    //disabled={!validateFormType1()}
                    //onClick={onClick}
                    variant='contained'
                    color='primary'
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* <Notification msg={errorMsg} open={openNotification} /> */}

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
