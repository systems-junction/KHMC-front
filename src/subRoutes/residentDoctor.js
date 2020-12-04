import React from "react";
import cookie from "react-cookies";
import { Route, Switch, Router, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import NotFound from "../components/NotFound/NotFound";
import ResidentDoctor from "../views/ResidentDoctor/ResidentDoctor";
import EDR from "../views/ResidentDoctor/EDR/EDR";
import ViewEDR from "../views/ResidentDoctor/EDR/viewEDR";
import DischargeRequest from "../views/ResidentDoctor/EDR/DischargeRequest";
import AddDischargeMed from "../views/ResidentDoctor/EDR/addDischargeMed";
import AddEDR from "../views/ResidentDoctor/EDR/addEditEDR";
import EDRTriageAndAssessment from "../views/ResidentDoctor/EDR/TriageAndAssessment";
import IPR from "../views/ResidentDoctor/IPR/IPR";
import LabRadRequest from "../views/PatientAssessmentCareLabRad/PatientAssessmentCareLabRad";
import PatientHistoryLabRadRequest from "../views/PatientHistory/PatientHistory";
import viewReport from "../components/ViewLabRadReport/ViewLabRadReport";
import AssessmentAndDiagnosis from "../views/PatientAssessmentCareLabRad/PatientAssessmentCareLabRad";
import viewReportAssDia from "../components/ViewLabRadReport/ViewLabRadReport";
import PatientHistoryAD from "../views/PatientHistory/PatientHistory";
import viewReportCons from "../components/ViewLabRadReport/ViewLabRadReport";
import triageAssessment from "../views/TriageAndAssessment/TriageAndAssessment";
import triageAssessmentAssessDiagnosis from "../views/TriageAndAssessment/TriageAndAssessment";
import ViewSingleTriage from "../views/TriageAndAssessment/ViewSingleTriage";

import AssessmentDiagnosisPatientHistory from "../views/PatientHistory/PatientHistory";
import triageAssessmentConRequest from "../views/TriageAndAssessment/TriageAndAssessment";
import Discharge from "../views/ResidentDoctor/Discharge/DischargeRequest";
import ConsultationRequest from "../views/PatientAssessmentCareLabRad/PatientAssessmentCareLabRad";
import PatientHistoryConsultationRequest from "../views/PatientHistory/PatientHistory";

import AddPharm from "../views/InPatient/InPatientPharm";
import AddPharmacy from "../views/InPatient/InPatientPharm";
import AddPharmLab from "../views/InPatient/InPatientPharm";
import AddDischargeMedication from "../views/ResidentDoctor/Discharge/addDischargeMed";
import ViewIPR from "../views/ResidentDoctor/IPR/viewIPR";
import iprDischargeRequest from "../views/ResidentDoctor/IPR/DischargeRequest";
import iprAddDischargeMed from "../views/ResidentDoctor/IPR/addDischargeMed";
import addViewFollowUp from "../views/ResidentDoctor/IPR/addViewFollowUp";
import AddIPR from "../views/ResidentDoctor/IPR/addEditIPR";
import IPRTriageAndAssessment from "../views/ResidentDoctor/IPR/TriageAndAssessment";
import SuccessScreen from "../components/SuccessScreen/SuccessScreen";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [currentUser, setCurrentUser] = React.useState(
    cookie.load("current_user")
  );

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser.staffTypeId.type === "admin" ||
        currentUser.staffTypeId.type === "Committe Member" ||
        currentUser.staffTypeId.type === "Accounts Member" ||
        currentUser.staffTypeId.type === "Warehouse Member" ? (
          <Component {...props} />
        ) : (
          <Redirect to="notfound" />
        )
      }
    />
  );
};

class WMSRoutes extends React.PureComponent {
  render() {
    return (
      <Switch>
        {/* <PrivateRoute
          path={`${this.props.match.url}/staff`}
          component={StaffRoutes}
        /> */}

        <Route
          exact
          path={`${this.props.match.url}`}
          component={ResidentDoctor}
        />
        <Route exact path={`${this.props.match.url}/edr`} component={EDR} />
        <Route exact path={`${this.props.match.url}/ipr`} component={IPR} />
        <Route
          exact
          path={`${this.props.match.url}/labradrequest`}
          component={LabRadRequest}
        />

        <Route
          exact
          path={`${this.props.match.url}/labradrequest/triageAssessment`}
          component={triageAssessment}
        />
        <Route
          exact
          path={`${this.props.match.url}/labradrequest/triageAssessment/view`}
          component={ViewSingleTriage}
        />

        <Route
          exact
          path={`${this.props.match.url}/labradrequest/viewReport`}
          component={viewReport}
        />

        <Route
          exact
          path={`${this.props.match.url}/assessmentdiagnosis`}
          component={AssessmentAndDiagnosis}
        />
        <Route
          exact
          path={`${this.props.match.url}/assessmentdiagnosis/success`}
          component={SuccessScreen}
        />
        <Route
          exact
          path={`${this.props.match.url}/assessmentdiagnosis/viewReport`}
          component={viewReportAssDia}
        />

        <Route
          exact
          path={`${this.props.match.url}/assessmentdiagnosis/add`}
          component={AddPharmacy}
        />

        <Route
          exact
          path={`${this.props.match.url}/assessmentdiagnosis/triageAssessment`}
          component={triageAssessmentAssessDiagnosis}
        />

        <Route
          exact
          path={`${this.props.match.url}/assessmentdiagnosis/triageAssessment/view`}
          component={ViewSingleTriage}
        />
        <Route
          exact
          path={`${this.props.match.url}/consultationrequest/triageAssessment/view`}
          component={ViewSingleTriage}
        />
        {/* <Route
          exact
          path={`${this.props.match.url}/patientAssessment/triageAssessment/view`}
          component={ViewSingleTriage}
        /> */}
        {/* <Route
          exact
          path={`${this.props.match.url}/patientCare/triageAssessment/view`}
          component={ViewSingleTriage}
        /> */}
        <Route
          exact
          path={`${this.props.match.url}/LabRadRequest/triageAssessment/view`}
          component={ViewSingleTriage}
        />

        <Route
          exact
          path={`${this.props.match.url}/assessmentdiagnosis/patientHistory`}
          component={PatientHistoryAD}
        />

        <Route
          exact
          path={`${this.props.match.url}/labradrequest/patientHistory`}
          component={PatientHistoryLabRadRequest}
        />

        <Route
          exact
          path={`${this.props.match.url}/consultationrequest/patientHistory`}
          component={PatientHistoryConsultationRequest}
        />

        <Route
          exact
          path={`${this.props.match.url}/consultationrequest/patientHistory/viewReport`}
          component={viewReportCons}
        />

        <Route
          exact
          path={`${this.props.match.url}/patienthistory`}
          component={AssessmentDiagnosisPatientHistory}
        />
        <Route
          exact
          path={`${this.props.match.url}/assessmentdiagnosis/patientHistory/viewReport`}
          component={viewReportAssDia}
        />

        <Route
          exact
          path={`${this.props.match.url}/dischargerequest`}
          component={Discharge}
        />

        <Route
          exact
          path={`${this.props.match.url}/consultationrequest`}
          component={ConsultationRequest}
        />

        <Route
          exact
          path={`${this.props.match.url}/labradrequest/add`}
          component={AddPharmLab}
        />
        <Route
          exact
          path={`${this.props.match.url}/labradrequest/success`}
          component={SuccessScreen}
        />

        <Route
          exact
          path={`${this.props.match.url}/consultationrequest/viewReport`}
          component={viewReportCons}
        />
        <Route
          exact
          path={`${this.props.match.url}/consultationrequest/success`}
          component={SuccessScreen}
        />

        <Route
          exact
          path={`${this.props.match.url}/consultationrequest/add`}
          component={AddPharm}
        />

        <Route
          exact
          path={`${this.props.match.url}/consultationrequest/triageAssessment`}
          component={triageAssessmentConRequest}
        />

        <Route
          exact
          path={`${this.props.match.url}/dischargerequest/addDischargeRequest`}
          component={AddDischargeMedication}
        />
        <Route
          exact
          path={`${this.props.match.url}/dischargerequest/success`}
          component={SuccessScreen}
        />
        <Route
          exact
          path={`${this.props.match.url}/ipr/viewIPR/add`}
          component={AddIPR}
        />

        <Route
          exact
          path={`${this.props.match.url}/ipr/viewIPR/followUp`}
          component={addViewFollowUp}
        />

        <Route
          exact
          path={`${this.props.match.url}/ipr/viewIPR`}
          component={ViewIPR}
        />

        <Route
          exact
          path={`${this.props.match.url}/edr/viewEDR`}
          component={ViewEDR}
        />
        <Route
          exact
          path={`${this.props.match.url}/edr/viewEDR/add`}
          component={AddEDR}
        />

        <Route
          exact
          path={`${this.props.match.url}/edr/viewEDR/dischargerequest`}
          component={DischargeRequest}
        />

        <Route
          exact
          path={`${this.props.match.url}/edr/viewEDR/dischargerequest/addDischargeRequest`}
          component={AddDischargeMed}
        />
        <Route
          exact
          path={`${this.props.match.url}/ipr/viewIPR/dischargerequest`}
          component={iprDischargeRequest}
        />

        <Route
          exact
          path={`${this.props.match.url}/ipr/viewIPR/dischargerequest/addDischargeRequest`}
          component={iprAddDischargeMed}
        />

        <Route
          path={`${this.props.match.url}/edr/viewEDR/TriageAndAssessment`}
          component={EDRTriageAndAssessment}
        />

        <Route
          path={`${this.props.match.url}/ipr/viewIPR/TriageAndAssessment`}
          component={IPRTriageAndAssessment}
        />

        <Route path={`${this.props.match.url}/notfound`} component={NotFound} />

        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default WMSRoutes;
