import React from "react"
import CareSteam from "../../../components/CareStream/CareStream"
import patientRegister from "../../../assets/img/PatientRegistration.png"

const arrayOfObjects = [
  { key: "key1", value: "value1" },
  { key: "key2", value: "value2" },
  { key: "key3", value: "value3" },
  { key: "key1", value: "value1" },
  { key: "key2", value: "value2" },
  { key: "key3", value: "value3" },
]

export default function Assign() {
  return (
    <div>
      <div className="subheader" style={{ marginLeft: "-10px" }}>
        <img src={patientRegister} />
        <div style={{ flex: 4, display: "flex", alignItems: "center" }}>
          <h4 style={{ color: "white", fontWeight: "700" }}>
            Treatment Orders
          </h4>
        </div>
      </div>

      <CareSteam title="" checkBoxes={arrayOfObjects} />

      <div className="subheader" style={{ marginLeft: "-10px" }}>
        <img src={patientRegister} />
        <div style={{ flex: 4, display: "flex", alignItems: "center" }}>
          <h4 style={{ color: "white", fontWeight: "700" }}>IV Fluids</h4>
        </div>
      </div>

      <CareSteam title="" checkBoxes={arrayOfObjects} />
    </div>
  )
}
