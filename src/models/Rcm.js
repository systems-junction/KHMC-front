const rcmDropdownItems = [
  "patients Assessment",
  "Patient Diagnosis",
  "RD Assessment & Diagnosis",
  "Insurance Claims",
  "EC Assessment & Diagnosis",
  "Patient Discharge",
  "Orders",
];

const tabs = ["Basic Info", "Payment Info", "Insurance Info"];

const tableData = [
  {
    "Basic Info": [
      {
        name: "name1",
        mrn: "mrn1",
        phone: "phone1",
        patientName: "patientName1",
        email: "email1",
        address: "address1",
        registrationDateTime: "registrationDateTime1",
        id: "id1",
        transactionId: "transactionId1",
      },
      {
        name: "name2",
        mrn: "mrn2",
        phone: "phone2",
        patientName: "patientName2",
        email: "email2",
        address: "address2",
        registrationDateTime: "registrationDateTime2",
        id: "id2",
        transactionId: "transactionId2",
      },
      {
        name: "name3",
        mrn: "mrn3",
        phone: "phone3",
        patientName: "patientName3",
        email: "email3",
        address: "address3",
        registrationDateTime: "registrationDateTime3",
        id: "id3",
        transactionId: "transactionId3",
      },
    ],
    heading: [
      "Name",
      "MRN",
      "Phone",
      "Email",
      "Address",
      "Registration Date/Time",
      "ID (Record ID)",
      "Transaction ID",
      "Action",
    ],
    tableDataKeys: [
      "name",
      "mrn",
      "phone",
      "email",
      "address",
      "registrationDateTime",
      "id",
      "transactionId",
    ],
    actions: {
      view: true,
    },
  },
  {
    "Payment Info": [
      {
        mrn: "mrn1",
        depositor: "Depositor1",
        amount: "Amount1",
        dateTime: "DateTime1",
      },
      {
        mrn: "mrn2",
        depositor: "Depositor2",
        amount: "Amount2",
        dateTime: "DateTime2",
      },
      {
        mrn: "mrn3",
        depositor: "Depositor3",
        amount: "Amount3",
        dateTime: "DateTime3",
      },
    ],
    heading: ["MRN", "Depositor", "Amount", "Date/Time", " "],
    tableDataKeys: ["mrn", "depositor", "amount", "dateTime"],
    actions: {
      view: false,
    },
  },
  {
    "Insurance Info": [
      {
        mrn: "mrn1",
        patientName: "patientName1",
        insured: "Insured1",
        unInsured: "UnInsured1",
        coverageDetails: "CoverageDetails1",
      },
      {
        mrn: "mrn2",
        patientName: "patientName2",
        insured: "Insured2",
        unInsured: "UnInsured2",
        coverageDetails: "CoverageDetails2",
      },
      {
        mrn: "mrn3",
        patientName: "patientName3",
        insured: "Insured3",
        unInsured: "UnInsured3",
        coverageDetails: "CoverageDetails3",
      },
    ],
    heading: [
      "MRN",
      "Patient Name",
      "Insured",
      "Un-Insured",
      "Coverage Details",
      " ",
    ],
    tableDataKeys: [
      "mrn",
      "patientName",
      "insured",
      "unInsured",
      "coverageDetails",
    ],
    actions: {
      view: false,
    },
  },
];

const tableHeading = [
  "Name",
  "MRN",
  "Phone",
  "Email",
  "Address",
  "Registration Date/Time",
  "ID (Record ID)",
  "Transaction ID",
  "Action",
];

const tableDataKeys = [
  "name",
  "mrn",
  "phone",
  "email",
  "address",
  "registrationDateTime",
  "id",
  "transactionId",
];

export default {
  rcmDropdownItems,
  tabs,
  tableData,
  tableHeading,
  tableDataKeys,
};
