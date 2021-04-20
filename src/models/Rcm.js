const rcmDropdownItems = [
  "Patients Registration",
  "Patients Assessment",
  "Patient Diagnosis",
  "RD Assessment & Diagnosis",
  "Insurance Claims",
  "EC Assessment & Diagnosis",
  "Patient Discharge",
  "Orders",
];

const tabsData = [
  {
    name: "Patients Registration", tabs: [ "Basic Info", "Payment Info", "Insurance Info" ], allTabData:
      [
        {
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
            " ",
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
            view: false,
          },
        },
        {
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
        {
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
        }
      ],
    endpointURL: "/getHistoryPatient?info=PatientInfo"
  },
  {
    name: "Patients Assessment", tabs: [ "Vital Signs", "Physical Examination", "Triage" ],
    allTabData: [
      {
        data: [
          { transactionID: "", recordID: "", dateTime: "", details: "", performedBy: "" }
        ],
        heading: [
          "Transaction ID",
          "Record ID",
          "Date/Time",
          "Details",
          "Performed By",
          "Action"
        ],
        tableDataKeys: [
          "transactionID",
          "recordID",
          "dateTime",
          "details",
          "performedBy"
        ],
        actions: {
          view: true,
        },
      },
      {
        data: [
          { transactionID: "", recordID: "", dateTime: "", details: "", performedBy: "" }
        ],
        heading: [
          "Transaction ID",
          "Record ID",
          "Date/Time",
          "Details",
          "Performed By",
          "Action",
        ],
        tableDataKeys: [
          "transactionID",
          "recordID",
          "dateTime",
          "details",
          "performedBy"
        ],
        actions: {
          view: true,
        },
      },
      {
        data: [
          { transactionID: "", recordID: "", dateTime: "", details: "", performedBy: "" }
        ],
        heading: [
          "Transaction ID",
          "Record ID",
          "Date/Time",
          "Details",
          "Performed By",
          "Action"
        ],
        tableDataKeys: [
          "transactionID",
          "recordID",
          "dateTime",
          "details",
          "performedBy"
        ],
        actions: {
          view: true,
        },
      },
    ], endpointURL: "/getHistoryEDR?info=EDR"
  },
  {
    name: "Patient Diagnosis", tabs: [ "RD notes", "Medication", "Lab", "Radiology", "Consultation" ], allTabData: [
      {
        data: [
          {
            transactionID: "",
            rDNoteID: "",
            dateTime: "",
            iCDCPTCodes: "",
            mrn: "",
            patientName: "",
            rDName: "",
            notes: ""
          }
        ],
        heading: [
          "Transaction ID",
          "RD Note ID",
          "Date / Time",
          "ICD / CPT Codes",
          "MRN",
          "Patient Name",
          "RD Name",
          "Notes",
          "Action"
        ],
        tableDataKeys: [
          "transactionID",
          "rDNoteID",
          "dateTime",
          "iCDCPTCodes",
          "mrn",
          "patientName",
          "rDName",
          "notes"
        ],
        actions: {
          view: true,
        },
      },
      {
        data: [
          {
            transactionID: "",
            orderID: "",
            dateTime: "",
            itemsDescription: "",
            mrn: "",
            patientName: "",
            orderedBy: "",
          }
        ],
        heading: [
          "Transaction ID",
          "Order ID",
          "Date / Time",
          "Items/Description",
          "MRN",
          "Patient Name",
          "Ordered By",
          "Action"
        ],
        tableDataKeys: [
          "transactionID",
          "orderID",
          "dateTime",
          "itemsDescription",
          "mrn",
          "patientName",
          "orderedBy"
        ],
        actions: {
          view: true,
        },
      },
      {
        data: [
          {
            transactionID: "",
            orderID: "",
            dateTime: "",
            itemsDescription: "",
            mrn: "",
            patientName: "",
            orderedBy: "",
          }
        ],
        heading: [
          "Transaction ID",
          "Order ID",
          "Date / Time",
          "Items/Description",
          "MRN",
          "Patient Name",
          "Ordered By",
          "Action"
        ],
        tableDataKeys: [
          "transactionID",
          "orderID",
          "dateTime",
          "itemsDescription",
          "mrn",
          "patientName",
          "orderedBy"
        ],
        actions: {
          view: true,
        },
      },
      {
        data: [
          {
            transactionID: "",
            orderID: "",
            dateTime: "",
            serviceDescription: "",
            mrn: "",
            patientName: "",
            orderedBy: "",
          }
        ],
        heading: [
          "Transaction ID",
          "Order ID",
          "Date / Time",
          "Service/Description",
          "MRN",
          "Patient Name",
          "Ordered By",
          "Action"
        ],
        tableDataKeys: [
          "transactionID",
          "orderID",
          "dateTime",
          "serviceDescription",
          "mrn",
          "patientName",
          "orderedBy"
        ],
        actions: {
          view: true,
        },
      },
      {
        data: [
          {
            transactionID: "",
            orderID: "",
            dateTime: "",
            requestedBy: "",
            mrn: "",
            patientName: "",
            consultant: ""
          }
        ],
        heading: [
          "Transaction ID",
          "Request ID",
          "Date / Time",
          "Requested By",
          "MRN",
          "Patient Name",
          "Consultant",
          "Action"
        ],
        tableDataKeys: [
          "transactionID",
          "requestID",
          "dateTime",
          "requestedBy",
          "mrn",
          "patientName",
          "consultant"
        ],
        actions: {
          view: true,
        },
      },
    ], endpointURL: "/getHistoryEDR?info=EDR"
  },
  {
    name: "RD Assessment & Diagnosis", tabs: [ "RD notes", "Medication", "Lab", "Radiology", "Consultation", "Discharge" ], allTabData: [
      {
        data: [
          {
            transactionID: "",
            rDNoteID: "",
            dateTime: "",
            iCDCPTCodes: "",
            mrn: "",
            patientName: "",
            rDName: "",
            notes: ""
          }
        ],
        heading: [
          "Transaction ID",
          "RD Note ID",
          "Date / Time",
          "ICD / CPT Codes",
          "MRN",
          "Patient Name",
          "RD Name",
          "Notes",
          "Action"
        ],
        tableDataKeys: [
          "transactionID",
          "rDNoteID",
          "dateTime",
          "iCDCPTCodes",
          "mrn",
          "patientName",
          "rDName",
          "notes"
        ],
        actions: {
          view: true,
        },
      },
      {
        data: [
          {
            transactionID: "",
            orderID: "",
            dateTime: "",
            itemsDescription: "",
            mrn: "",
            patientName: "",
            orderedBy: "",
          }
        ],
        heading: [
          "Transaction ID",
          "Order ID",
          "Date / Time",
          "Items/Description",
          "MRN",
          "Patient Name",
          "Ordered By",
          "Action"
        ],
        tableDataKeys: [
          "transactionID",
          "orderID",
          "dateTime",
          "itemsDescription",
          "mrn",
          "patientName",
          "orderedBy"
        ],
        actions: {
          view: true,
        },
      },
      {
        data: [
          {
            transactionID: "",
            orderID: "",
            dateTime: "",
            itemsDescription: "",
            mrn: "",
            patientName: "",
            orderedBy: "",
          }
        ],
        heading: [
          "Transaction ID",
          "Order ID",
          "Date / Time",
          "Items/Description",
          "MRN",
          "Patient Name",
          "Ordered By",
          "Action"
        ],
        tableDataKeys: [
          "transactionID",
          "orderID",
          "dateTime",
          "itemsDescription",
          "mrn",
          "patientName",
          "orderedBy"
        ],
        actions: {
          view: true,
        },
      },
      {
        data: [
          {
            transactionID: "",
            orderID: "",
            dateTime: "",
            serviceDescription: "",
            mrn: "",
            patientName: "",
            orderedBy: "",
          }
        ],
        heading: [
          "Transaction ID",
          "Order ID",
          "Date / Time",
          "Service/Description",
          "MRN",
          "Patient Name",
          "Ordered By",
          "Action"
        ],
        tableDataKeys: [
          "transactionID",
          "orderID",
          "dateTime",
          "serviceDescription",
          "mrn",
          "patientName",
          "orderedBy"
        ],
        actions: {
          view: true,
        },
      },
      {
        data: [
          {
            transactionID: "",
            orderID: "",
            dateTime: "",
            requestedBy: "",
            mrn: "",
            patientName: "",
            consultant: ""
          }
        ],
        heading: [
          "Transaction ID",
          "Request ID",
          "Date / Time",
          "Requested By",
          "MRN",
          "Patient Name",
          "Consultant",
          "Action"
        ],
        tableDataKeys: [
          "transactionID",
          "requestID",
          "dateTime",
          "requestedBy",
          "mrn",
          "patientName",
          "consultant"
        ],
        actions: {
          view: true,
        },
      },
      {
        data: [
          {
            notesSummary: "",
            dischargeMedication: "",
            dateTime: "",
            generatedBy: "",
            transactionID: "",
          }
        ],
        heading: [
          "Notes / Summary",
          "Discharge Medication",
          "Date / Time",
          "Gernerated by",
          "Transaction ID",
          "Action"
        ],
        tableDataKeys: [
          "notesSummary",
          "dischargeMedication",
          "dateTime",
          "generatedBy",
          "transactionID"
        ],
        actions: {
          view: true,
        },
      }
    ], endpointURL: "/getHistoryEDR?info=EDR"
  },
  {
    name: "Insurance Claims", tabs: [ "Pre-approval", "Claims" ], allTabData: [
      {
        data: [
          {
            requestID: "",
            dateTime: "",
            patientInfo: "",
            vendor: "",
            requestInfo: "",
            transactionID: ""
          }
        ],
        heading: [
          "Request ID",
          "Date / Time",
          "Patient Info",
          "Vendor",
          "Request Info",
          "Transaction ID",
          "Action"
        ],
        tableDataKeys: [
          "requestID",
          "dateTime",
          "patientInfo",
          "vendor",
          "requestInfo",
          "transactionID"
        ],
        actions: {
          view: true,
        },
      },
      {
        data: [
          {
            requestID: "",
            dateTime: "",
            patientInfo: "",
            vendor: "",
            claimInfo: "",
            transactionID: ""
          }
        ],
        heading: [
          "Request ID",
          "Date / Time",
          "Patient Info",
          "Vendor",
          "Claim Info",
          "Transaction ID",
          "Action"
        ],
        tableDataKeys: [
          "requestID",
          "dateTime",
          "patientInfo",
          "vendor",
          "claimInfo",
          "transactionID"
        ],
        actions: {
          view: true,
        },
      }
    ], endpointURL: "/getHistoryEDR?info=EDR"
  },
  {
    name: "EC Assessment & Diagnosis", tabs: [ "EC notes", "Medication", "Lab", "Radiology" ], allTabData: [
      {
        data: [
          {
            dateTime: "",
            requestId: "",
            patientInfo: "",
            requester: "",
            performedBy: "",
            consultationNotes: "",
            transactionID: ""
          }
        ],
        heading: [
          "Date / Time",
          "Request Id",
          "Patient Info",
          "Requester",
          "Performed by",
          "Consultation Notes",
          "Transaction ID",
          "Action"
        ],
        tableDataKeys: [
          "dateTime",
          "requestId",
          "patientInfo",
          "requester",
          "performedBy",
          "consultationNotes",
          "transactionID"
        ],
        actions: {
          view: true,
        },
      },
      {
        data: [
          {
            transactionID: "",
            orderID: "",
            dateTime: "",
            itemsDescription: "",
            mrn: "",
            patientName: "",
            orderedBy: "",
          }
        ],
        heading: [
          "Transaction ID",
          "Order ID",
          "Date / Time",
          "Items/Description",
          "MRN",
          "Patient Name",
          "Ordered By",
          "Action"
        ],
        tableDataKeys: [
          "transactionID",
          "orderID",
          "dateTime",
          "itemsDescription",
          "mrn",
          "patientName",
          "orderedBy"
        ],
        actions: {
          view: true,
        },
      },
      {
        data: [
          {
            transactionID: "",
            orderID: "",
            dateTime: "",
            itemsDescription: "",
            mrn: "",
            patientName: "",
            orderedBy: "",
          }
        ],
        heading: [
          "Transaction ID",
          "Order ID",
          "Date / Time",
          "Items/Description",
          "MRN",
          "Patient Name",
          "Ordered By",
          "Action"
        ],
        tableDataKeys: [
          "transactionID",
          "orderID",
          "dateTime",
          "itemsDescription",
          "mrn",
          "patientName",
          "orderedBy"
        ],
        actions: {
          view: true,
        },
      },
      {
        data: [
          {
            transactionID: "",
            orderID: "",
            dateTime: "",
            serviceDescription: "",
            mrn: "",
            patientName: "",
            orderedBy: "",
          }
        ],
        heading: [
          "Transaction ID",
          "Order ID",
          "Date / Time",
          "Service/Description",
          "MRN",
          "Patient Name",
          "Ordered By",
          "Action"
        ],
        tableDataKeys: [
          "transactionID",
          "orderID",
          "dateTime",
          "serviceDescription",
          "mrn",
          "patientName",
          "orderedBy"
        ],
        actions: {
          view: true,
        },
      },
    ], endpointURL: "/getHistoryEDR?info=EDR"
  },
  {
    name: "Patient Discharge", tabs: [ "Notes/Summary", "Discharge Medication", "Date/Time", "Generated by", "Discharge Request Id", "Transaction ID" ], allTabData: [
      {
        data: [

        ],
        heading: [],
        tableDataKeys: [],
        actions: {
          view: false,
        },
      },
      {
        data: [
          {
            iCTCode: "",
            khmcCode: "",
            itemInfo: "",
            orderedBy: "",
            patientInfo: "",
            transactionID: ""
          }
        ],
        heading: [
          "ICT Code",
          "KHMC Code",
          "Item Info",
          "Ordered by",
          "Patient info",
          "Transaction ID",
          "Action"
        ],
        tableDataKeys: [
          "iCTCode",
          "khmcCode",
          "itemInfo",
          "orderedBy",
          "patientInfo",
          "transactionID"
        ],
        actions: {
          view: true,
        },
      },
      {
        data: [

        ],
        heading: [],
        tableDataKeys: [],
        actions: {
          view: false,
        },
      },
      {
        data: [

        ],
        heading: [],
        tableDataKeys: [],
        actions: {
          view: false,
        },
      },
      {
        data: [

        ],
        heading: [],
        tableDataKeys: [],
        actions: {
          view: false,
        },
      },
      {
        data: [

        ],
        heading: [],
        tableDataKeys: [],
        actions: {
          view: false,
        },
      },
    ], endpointURL: "/getHistoryEDR?info=EDR"
  },
  {
    name: "Orders", tabs: [ "medical", "non-medical" ], allTabData: [
      {
        data: [
          {
            iCTCode: "",
            khmcCode: "",
            itemInfo: "",
            orderedBy: "",
            patientInfo: "",
            transactionID: ""
          }
        ],
        heading: [
          "ICT Code",
          "KHMC Code",
          "Item Info",
          "Ordered by",
          "Patient Info",
          "Transaction ID",
          "Action"
        ],
        tableDataKeys: [
          "iCTCode",
          "khmcCode",
          "itemInfo",
          "orderedBy",
          "patientInfo",
          "transactionID"
        ],
        actions: {
          view: true,
        },
      },
      {
        data: [
          {
            iCTCode: "",
            khmcCode: "",
            itemInfo: "",
            orderedBy: "",
            patientInfo: "",
            transactionID: ""
          }
        ],
        heading: [
          "ICT Code",
          "KHMC Code",
          "Item Info",
          "Ordered by",
          "Patient Info",
          "Transaction ID",
          "Action"
        ],
        tableDataKeys: [
          "iCTCode",
          "khmcCode",
          "itemInfo",
          "orderedBy",
          "patientInfo",
          "transactionID"
        ],
        actions: {
          view: true,
        },
      }
    ], endpointURL: "/getHistoryEDR?info=EDR"
  }
];

const tableData = [
  {

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

export default {
  rcmDropdownItems,
  tabsData,
  tableData,
};
