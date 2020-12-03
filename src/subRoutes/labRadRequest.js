import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "../components/NotFound/NotFound";
import labRadRequest from "../views/PatientAssessmentCareLabRad/PatientAssessmentCareLabRad";
import triageAssessment from "../views/TriageAndAssessment/TriageAndAssessment";
import viewLabRadReport from "../components/ViewLabRadReport/ViewLabRadReport";
import SuccessScreen from "../components/SuccessScreen/SuccessScreen";
import PatientHistory from "../views/PatientHistory/PatientHistory";
import ViewSingleTriage from "../views/TriageAndAssessment/ViewSingleTriage";

class LabRadRequest extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route
          exact
          path={`${this.props.match.url}`}
          component={labRadRequest}
        />
        <Route
          exact
          path={`${this.props.match.url}/triageAssessment`}
          component={triageAssessment}
        />
        <Route
          exact
          path={`${this.props.match.url}/triageAssessment/view`}
          component={ViewSingleTriage}
        />

        <Route
          path={`${this.props.match.url}/viewReport`}
          component={viewLabRadReport}
        />

        <Route
          path={`${this.props.match.url}/patienthistory`}
          component={PatientHistory}
        />
        <Route
          path={`${this.props.match.url}/success`}
          component={SuccessScreen}
        />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default LabRadRequest;
