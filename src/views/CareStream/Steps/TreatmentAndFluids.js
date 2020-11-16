import React from "react";
import patientRegister from "../../../assets/img/PatientRegistration.png";
import CareSteam from "../../../components/CareStream/CareStream";
import DropDown from "../../../components/CareStream/DropDown";

const dropDownArray = [
  { key: "carestream1", value: "Care Stream 1" },
  { key: "carestream2", value: "Care Stream 2" },
];

const arrayOfObjects = [
  { key: "key1", value: "value1" },
  { key: "key2", value: "value2" },
  { key: "key3", value: "value3" },
  { key: "key1", value: "value1" },
  { key: "key2", value: "value2" },
  { key: "key3", value: "value3" },
];

export default function Assign() {
  const dropDownHandler = () => {
    console.log("dropDownHandler");
  };
  return (
    <div>
      {["Inclusion Criteria", "Exclusion Criteria"].map((e) => {
        return <CareSteam title={e} checkBoxes={arrayOfObjects} />;
      })}
    </div>
  );
}
