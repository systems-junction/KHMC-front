import { Redirect } from 'react-router-dom'
import cookie from 'react-cookies'
import Header from '../../components/Header/Header'
import InsuranceClaim from '../../assets/img/Insurance_Claim.png'
import PreApproval from '../../assets/img/Pre-Approval.png'
import Reimbursement from '../../assets/img/Re-Inbursement.png'
import WMS_Back from '../../assets/img/WMS_Back.png'
import React from 'react'
import Back from '../../assets/img/Back_Arrow.png'
import MenuTree from '../../components/MenuTree/MenuTree'

const admin = [
  { img: InsuranceClaim , text: 'Insurance Claim' },
  {
    img: PreApproval,
    text: 'Pre Approval',
    path: '/home/rcm/ic/pa',
  },
  {
    img: Reimbursement,
    text: 'Re Imbursement',
    path: '/home/rcm/ic/ri',
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
    { img: InsuranceClaim , text: 'Insurance Claim' },
    {
      img: PreApproval,
      text: 'Pre Approval',
      path: '/home/rcm/ic/pa',
    },
    {
      img: Reimbursement,
      text: 'Re Imbursement',
      path: '/home/rcm/ic/ri',
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
    { img: InsuranceClaim , text: 'Insurance Claim' },
  {
    img: PreApproval,
    text: 'Pre Approval',
    path: '/home/rcm/ic/pa',
  },
  {
    img: Reimbursement,
    text: 'Re Imbursement',
    path: '/home/rcm/ic/ri',
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
    { img: InsuranceClaim , text: 'Insurance Claim' },
    {
      img: PreApproval,
      text: 'Pre Approval',
      path: '/home/rcm/ic/pa',
    },
    {
      img: Reimbursement,
      text: 'Re Imbursement',
      path: '/home/rcm/ic/ri',
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
    { img: InsuranceClaim , text: 'Insurance Claim' },
  {
    img: PreApproval,
    text: 'Pre Approval',
    path: '/home/rcm/ic/pa',
  },
  {
    img: Reimbursement,
    text: 'Re Imbursement',
    path: '/home/rcm/ic/ri',
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
    { img: InsuranceClaim , text: 'Insurance Claim' },
    {
      img: PreApproval,
      text: 'Pre Approval',
      path: '/home/rcm/ic/pa',
    },
    {
      img: Reimbursement,
      text: 'Re Imbursement',
      path: '/home/rcm/ic/ri',
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
          backgroundColor: '#2B62CC',
          backgroundImage: `url("${WMS_Back}")`,
          backgroundSize: '100%',
        }}
      >
        <Header />

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
