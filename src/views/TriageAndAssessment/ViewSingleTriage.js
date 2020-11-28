import React, { useEffect, useState } from "react";

import TAA from "../../assets/img/Purchase Order.png";

import ViewROS from "../DHR/DCD/ViewROS/ViewROS.js";

function ViewSingleTriage() {
  return <ViewROS heading={"Triage & Assessment"} icon={TAA} />;
}

export default ViewSingleTriage;
