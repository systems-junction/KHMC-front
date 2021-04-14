const rcmDropdownItems = [
  "Patients Registration",
  "patients Assessment",
  "Patient Diagnosis",
  "RD Assessment & Diagnosis",
  "Insurance Claims",
  "EC Assessment & Diagnosis",
  "Patient Discharge",
  "Orders",
];

const tabs = [ "Basic Info", "Payment Info", "Insurance Info" ];

const tableData = [
  {
    "Basic Info": {
      data: [
        {
          name: "Miles",
          mrn: "MRNRID103211307",
          phoneNumber: "+962-6965852",
          patientName: "Oscar",
          email: "jonson@gmail.com",
          address: "House No. 87 A1 Block New City Jordan",
          registrationDateTime: "08 - 03 - 2021 04:18",
          id: "115553",
        },
        {
          name: "Emma",
          mrn: "MRNRID103211308",
          phoneNumber: "+962-6965885",
          patientName: "Edward",
          email: "miles@gmail.com",
          address: "House No. 45 C1 Block New City Jordan",
          registrationDateTime: "08 - 03 - 2021 04:18",
          id: "211522",
        },
        {
          name: "Watson",
          mrn: "MRNRID103211309",
          phoneNumber: "+962-6965855",
          patientName: "William ",
          email: "Emma@gmail.com",
          address: "House No. 57 B1 Block New City Jordan",
          registrationDateTime: "08 - 03 - 2021 04:18",
          id: "211550",
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
      ],
      actions: {
        view: true,
      },
    },
  },
  {
    "Payment Info": {
      data: [
        {
          mrn: "MRNRID103211309",
          depositor: "Sammy",
          amount: "$ 500",
          dateTime: "08 - 04 - 2021 04:22",
        },
        {
          mrn: "MRNRID103211310",
          depositor: "Watson",
          amount: "$ 4000",
          dateTime: "08 - 04 - 2021 04:25",
        },
        {
          mrn: "MRNRID103211312",
          depositor: "Emma",
          amount: "$ 1400",
          dateTime: "08 - 04 - 2021 04:28",
        },
      ],
      heading: [ "MRN", "Depositor", "Amount", "Date/Time", " " ],
      tableDataKeys: [ "mrn", "depositor", "amount", "dateTime" ],
      actions: {
        view: false,
      },
    },
  },
  {
    "Insurance Info": {
      data: [
        {
          mrn: "MRNRID103211313",
          patientName: "Miles",
          insured: "true",
          unInsured: "false",
          coverageDetails: "Need to fix",
        },
        {
          mrn: "MRNRID103211314",
          patientName: "Williamson",
          insured: "true",
          unInsured: "true",
          coverageDetails: "Need to eliminate",
        },
        {
          mrn: "MRNRID103211315",
          patientName: "Emma",
          insured: "true",
          unInsured: "false",
          coverageDetails: "Change needed",
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
];

export default {
  rcmDropdownItems,
  tabs,
  tableData,
};
