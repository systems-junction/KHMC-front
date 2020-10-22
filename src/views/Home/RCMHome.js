import { Redirect } from 'react-router-dom'
import cookie from 'react-cookies'
import Header from '../../components/Header/Header'
import WMS from '../../assets/img/WMS.png'
import RCM from '../../assets/img/RCM.png'
import wh_inventory from '../../assets/img/WH Inventory.png'
import purchase_order from '../../assets/img/Purchase Order.png'
import purchase_request from '../../assets/img/purchase request.png'
import Vendor from '../../assets/img/Vendot.png'
import ReceiveItem from '../../assets/img/Receive Item.png'
import WMS_Back from '../../assets/img/WMS_Back.png'
import ReturnItem from '../../assets/img/Return Item.png'
import PatientRegistration from '../../assets/img/PatientRegistration.png'
import EDR from '../../assets/img/EDR.png'
import IPR from '../../assets/img/IPR.png'
import Resident from '../../assets/img/ResidentDoctor.png'
import ECR from '../../assets/img/ECR.png'
import Services from '../../assets/img/ServicesRequest.png'
import InsuranceClaim from '../../assets/img/Insurance_Claim.png'
import assessmentIcon from '../../assets/img/PatientAssessment.png'
import patientCareIcon from '../../assets/img/PatientCare.png'
import Lab_RadIcon from '../../assets/img/Lab-Rad Request.png'
import AssessDiagIcon from '../../assets/img/Assessment & Diagnosis.png'
import DischargeIcon from '../../assets/img/Doctor - Discharge.png'
import CRIcon from '../../assets/img/Consultation Request.png'
import React from 'react'
import './MenuPage.css'
import Back from '../../assets/img/Back_Arrow.png'
import MenuTree from '../../components/MenuTree/MenuTree'

const admin = [
  { img: RCM, text: 'RCM' },
  {
    img: PatientRegistration,
    text: 'Patient Registration',
    path: '/home/rcm/patientListing',
  },
  {
    img: EDR,
    text: 'EDR',
    path: '/home/rcm/edr',
  },
  {
    img: IPR,
    text: 'IPR',
    path: '/home/rcm/ipr',
  },

  {
    img: Resident,
    text: 'Resident Doctor',
    path: '/home/rcm/rd',
  },

  {
    img: ECR,
    text: 'ECR',
    path: '/home/rcm/ecr',
  },

  {
    img: Services,
    text: 'Services Request',
    path: '/home/rcm/sr',
  },

  {
    img: InsuranceClaim,
    text: 'Insurance Claim',
    path: '/home/rcm/ic',
  },
]

const externalConsultant = [
  { img: RCM, text: 'RCM' },
  {
    img: ECR,
    text: 'ECR',
    path: '/home/rcm/ecr',
  },
]

const residentDoctor = [
  { img: RCM, text: 'RCM' },
  {
    img: Resident,
    text: 'Resident Doctor',
    path: '/home/rcm/rd',
  },
]

const doctorPhysician = [
  { img: RCM, text: 'RCM' },
  {
    img: AssessDiagIcon,
    text: 'Assessment & Diagnosis',
    path: '/home/rcm/rd/assessmentdiagnosis',
  },
  {
    img: Lab_RadIcon,
    text: 'Lab/Rad Request',
    path: '/home/rcm/rd/labradrequest',
  },
  {
    img: CRIcon,
    text: 'Consultation Request',
    path: '/home/rcm/rd/consultationrequest',
  },
  {
    img: DischargeIcon,
    text: 'Discharge',
    path: '/home/rcm/rd/dischargerequest',
  },
]

const registeredNurse = [
  { img: RCM, text: 'RCM' },
  {
    img: assessmentIcon,
    text: 'Patient Assessment',
    path: '/home/rcm/patientAssessment',
  },
  {
    img: patientCareIcon,
    text: 'Patient Care',
    path: '/home/rcm/patientCare',
  },
  {
    img: Lab_RadIcon,
    text: 'Lab/Rad Request',
    path: '/home/rcm/LabRadRequest',
  },
]

const accountsMember = [
  { img: WMS, text: 'WMS' },
  {
    img: ReceiveItem,
    text: 'Receive Requests',
    path: '/home/controlroom/wms/receiverequests',
  },
  { img: '', text: '', path: '' },
  { img: '', text: '', path: '' },
  { img: '', text: '', path: '' },

  { img: '', text: '', path: '' },

  {
    img: '',
    text: '',
    path: '',
  },
  { img: '', text: '', path: '' },
]

const warehouseMember = [
  { img: WMS, text: 'WMS' },
  {
    img: '',
    text: '',
    path: '',
  },
  { img: '', text: '', path: '' },
  { img: '', text: '', path: '' },
  { img: '', text: '', path: '' },

  { img: '', text: '', path: '' },

  {
    img: '',
    text: '',
    path: '',
  },
  { img: '', text: '', path: '' },
]

const warehouseIncharge = [
  { img: WMS, text: 'WMS' },
  {
    img: ReturnItem,
    text: 'Return Request',
    path: 'wms/materialreceiving/viewpo/externalreturn',
  },
  { img: '', text: '', path: '' },
  { img: '', text: '', path: '' },
  { img: '', text: '', path: '' },
  { img: '', text: '', path: '' },
  { img: '', text: '', path: '' },
  { img: '', text: '', path: '' },
]

class HomeScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      openApps: false,
      goBack: false,

      currentUser: '',
    }
  }

  componentDidMount() {
    this.setState({ currentUser: cookie.load('current_user') })
  }

  render() {
    if (this.state.goBack) {
      return <Redirect to={'/home'} />
    }

    const userType = this.state.currentUser.staffTypeId

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          position: 'fixed',
          width: '100%',
          height: '100%',
          backgroundColor: '#2B62CC',
          backgroundImage: `url("${WMS_Back}")`,
          backgroundSize: '100%',
        }}
      >
        <Header history={this.props.history}/>

        <MenuTree
          history={this.props.history}
          options={
            userType && userType.type === 'External Consultant'
              ? externalConsultant
              : userType && userType.type === 'admin'
              ? admin
              : userType && userType.type === 'Resident Doctor'
              ? residentDoctor
              : userType && userType.type === 'Accounts Member'
              ? accountsMember
              : userType && userType.type === 'Warehouse Member'
              ? warehouseMember
              : userType && userType.type === 'Warehouse Incharge'
              ? warehouseIncharge
              : userType && userType.type === 'Registered Nurse'
              ? registeredNurse
              : userType && userType.type === 'Doctor/Physician'
              ? doctorPhysician
              : admin
          }
        />

        <div
          style={{
            position: 'fixed',
            width: '100%',
            height: '10%',
            top: '90%',
          }}
        >
          <img
            onClick={() => this.props.history.goBack()}
            src={Back}
            style={{
              width: 45,
              height: 35,
              marginLeft: '5%',
              cursor: 'pointer',
            }}
          />
        </div>
      </div>
    )
  }
}

export default HomeScreen
