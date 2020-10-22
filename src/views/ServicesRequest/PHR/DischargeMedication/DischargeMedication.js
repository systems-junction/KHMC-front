import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'

// import Snackbar from '../../components/Snackbar/Snackbar'
// import Notification from '../../components/Snackbar/Notification.js'

import AddAlert from '@material-ui/icons/AddAlert'

import { Redirect } from 'react-router-dom'
import axios from 'axios'
import cookie from 'react-cookies'

import Header from '../../../../components/Header/Header'

// import RCM from '../../assets/img/business_Unit.png'
// import WMS from '../../assets/img/WMS.png'
// import wh_inventory from '../../assets/img/WH Inventory.png'
// import purchase_order from '../../assets/img/Purchase Order.png'
// import purchase_request from '../../assets/img/purchase request.png'
// import FIN from '../../assets/img/FIN.png'
// import Control_Room from '../../../../assets/img/Control_Room.png'
// import FunctionalUnit from '../../assets/img/Functional Unit.png'
// import Vendor from '../../../../assets/img/Vendot.png'
// import ReceiveItem from '../../assets/img/Receive Item.png'
// import MaterialReceiving from '../../assets/img/Material Receiving.png'
import WMS_Back from '../../../../assets/img/WMS_Back.png'
// import ReturnItem from '../../assets/img/Return Item.png'
// import PatientRegistration from '../../assets/img/PatientRegistration.png'
// import EDR from '../../assets/img/EDR.png'
// import Resident from '../../assets/img/ResidentDoctor.png'
// import ECR from '../../assets/img/ECR.png'
// import Services from '../../assets/img/ServicesRequest.png'

// import Items from '../../assets/img/Items.png'
import PHR from '../../../../assets/img/PHR.png'
import DM from '../../../../assets/img/Discharge Medication.png'
import EDR from '../../../../assets/img/EDR.png'
import IPR from '../../../../assets/img/IPR.png'
import OPR from '../../../../assets/img/OPR.png'
import React, { useEffect } from 'react'
import { render } from 'react-dom'
import Back from '../../../../assets/img/Back_Arrow.png'

// import KHMC_White from '../../assets/img/KHMC_White.png'

// import Influence_white from '../../assets/img/Influence_white.png'

import MenuTree from '../../../../components/MenuTree/MenuTree'

const admin = [
  { img: DM, text: 'Discharge Medication' },
  {
    img: EDR,
    text: 'EDR',
    path: '/home/rcm/sr/phr/dischargemedication/edr',
  },
  {
    img: IPR,
    text: 'IPR',
    path: '/home/rcm/sr/phr/dischargemedication/ipr',
  },

  {
    text: '',
    path: '',
  },

  {
    text: '',
    path: '',
  },

  {
    text: '',
    path: '',
  },

  {
    text: '',
    path: '',
  },

  {
    text: '',
    path: '',
  },
]

const buHead = [
  { img: PHR, text: 'PHR' },
  {
    img: EDR,
    text: 'EDR',
    path: '/home/rcm/sr/phr/edr',
  },
  {
    img: IPR,
    text: 'IPR',
    path: '/home/rcm/sr/phr/ipr',
  },

  {
    text: '',
    path: '',
  },

  {
    text: '',
    path: '',
  },

  {
    text: '',
    path: '',
  },

  {
    text: '',
    path: '',
  },

  {
    text: '',
    path: '',
  },
]

const committeeMember = [
  { img: PHR, text: 'PHR' },
  {
    img: EDR,
    text: 'EDR',
    path: '/home/rcm/sr/phr/edr',
  },
  {
    img: IPR,
    text: 'IPR',
    path: '/home/rcm/sr/phr/ipr',
  },

  {
    text: '',
    path: '',
  },

  {
    text: '',
    path: '',
  },

  {
    text: '',
    path: '',
  },

  {
    text: '',
    path: '',
  },

  {
    text: '',
    path: '',
  },
]

const accountsMember = [
  { img: PHR, text: 'PHR' },
  {
    img: EDR,
    text: 'EDR',
    path: '/home/rcm/sr/phr/edr',
  },
  {
    img: IPR,
    text: 'IPR',
    path: '/home/rcm/sr/phr/ipr',
  },

  {
    text: '',
    path: '',
  },

  {
    text: '',
    path: '',
  },

  {
    text: '',
    path: '',
  },

  {
    text: '',
    path: '',
  },

  {
    text: '',
    path: '',
  },
]

const warehouseMember = [
  { img: PHR, text: 'PHR' },
  {
    img: EDR,
    text: 'EDR',
    path: '/home/rcm/sr/phr/edr',
  },
  {
    img: IPR,
    text: 'IPR',
    path: '/home/rcm/sr/phr/ipr',
  },

  {
    text: '',
    path: '',
  },

  {
    text: '',
    path: '',
  },

  {
    text: '',
    path: '',
  },

  {
    text: '',
    path: '',
  },

  {
    text: '',
    path: '',
  },
]

const warehouseIncharge = [
  { img: PHR, text: 'PHR' },
  {
    img: EDR,
    text: 'EDR',
    path: '/home/rcm/sr/phr/edr',
  },
  {
    img: IPR,
    text: 'IPR',
    path: '/home/rcm/sr/phr/ipr',
  },

  {
    text: '',
    path: '',
  },

  {
    text: '',
    path: '',
  },

  {
    text: '',
    path: '',
  },

  {
    text: '',
    path: '',
  },

  {
    text: '',
    path: '',
  },
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
          // backgroundColor: '#2B62CC',
          // backgroundImage: `url("${WMS_Back}")`,
          background: 'rgb(42,98,205)',
          background:
            'linear-gradient(25deg, rgba(42,98,205,1) 0%, rgba(4,76,207,1) 33%, rgba(0,45,130,1) 66%, rgba(0,33,106,1) 100%)',
          backgroundSize: '100%',
        }}
      >
        <Header history={this.props.history}/>

        <MenuTree
          history={this.props.history}
          options={
            userType && userType.type === 'BU Head'
              ? buHead
              : userType && userType.type === 'admin'
              ? admin
              : userType && userType.type === 'Committe Member'
              ? committeeMember
              : userType && userType.type === 'Accounts Member'
              ? accountsMember
              : userType && userType.type === 'Warehouse Member'
              ? warehouseMember
              : userType && userType.type === 'Warehouse Incharge'
              ? warehouseIncharge
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
