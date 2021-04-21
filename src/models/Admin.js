const adminDropdownItems = [
    "Staff",
    "FU / BU",
    "Items",
    "Vendors",
];

const adminTabsData = [
    {
        name: "Staff", tabs: [ "Role", "Staff Member" ], allTabData:
            [
                {
                    data: [
                        {
                            createdBy: "Miles",
                            dateTime: "08 - 03 - 2021 04:18",
                            roleName: "N/A",
                            transactionID: "MRNRID103211309",
                        },
                        {
                            createdBy: "Miles",
                            dateTime: "08 - 03 - 2021 04:18",
                            roleName: "N/A",
                            transactionID: "MRNRID103211309",
                        },
                        {
                            createdBy: "Miles",
                            dateTime: "08 - 03 - 2021 04:18",
                            roleName: "N/A",
                            transactionID: "MRNRID103211309",
                        },
                    ],
                    heading: [
                        "Created By",
                        "Date / Time",
                        "Role Name",
                        "Transaction ID",
                        "Action",
                    ],
                    tableDataKeys: [
                        "createdBy",
                        "dateTime",
                        "roleName",
                        "transactionID",
                    ],
                    actions: {
                        view: true,
                    },
                },
                {
                    data: [
                        {
                            createdBy: "Miles",
                            dateTime: "08 - 03 - 2021 04:18",
                            memberName: "N/A",
                            roleAssign: "",
                            transactionID: "MRNRID103211309",
                        },
                        {
                            createdBy: "Miles",
                            dateTime: "08 - 03 - 2021 04:18",
                            roleName: "N/A",
                            roleAssign: "",
                            transactionID: "MRNRID103211309",
                        },
                        {
                            createdBy: "Miles",
                            dateTime: "08 - 03 - 2021 04:18",
                            roleName: "N/A",
                            roleAssign: "",
                            transactionID: "MRNRID103211309",
                        },
                    ],
                    heading: [
                        "Created By",
                        "Date / Time",
                        "Member Name",
                        "Role Assign",
                        "Transaction ID",
                        "Action",
                    ],
                    tableDataKeys: [
                        "createdBy",
                        "dateTime",
                        "memberName",
                        "roleAssign",
                        "transactionID",
                    ],
                    actions: {
                        view: true,
                    },
                },
            ],
        endpointURL: "/getHistoryStaff?info=Staff"
    },
    {
        name: "FU / BU", tabs: [],
        allTabData: [
            {
                data: [
                    {
                        createdBy: "Miles",
                        dateTime: "08 - 03 - 2021 04:18",
                        itemsInfo: "N/A",
                        description: "William",
                        transactionID: "MRNRID103211309",
                    },
                    {
                        createdBy: "Emma",
                        dateTime: "08 - 03 - 2021 04:18",
                        itemsInfo: "N/A",
                        description: "William ",
                        transactionID: "MRNRID103211309",
                    },
                    {
                        createdBy: "Watson",
                        dateTime: "08 - 03 - 2021 04:18",
                        memberName: "N/A",
                        description: "William ",
                        transactionID: "MRNRID103211309",
                    },
                ],
                heading: [
                    "Created by",
                    "Date / Time",
                    "Member Name",
                    "Description",
                    "Transaction ID",
                    "Action",
                ],
                tableDataKeys: [
                    "createdBy",
                    "dateTime",
                    "memberName",
                    "description",
                    "transactionID",
                ],
                actions: {
                    view: true,
                },
            },
        ], endpointURL: "/getHistoryStaff?info=Staff"
    },
    {
        name: "Items", tabs: [], allTabData: [
            {
                data: [
                    {
                        createdBy: "",
                        dateTime: "",
                        itemName: "",
                        icdCode: "",
                        khmcCode: "",
                        transactionID: ""
                    }
                ],
                heading: [
                    "Created by",
                    "Date / Time",
                    "Item Name",
                    "ICD Code",
                    "KHMC Code",
                    "Transaction ID",
                    "Action",
                ],
                tableDataKeys: [
                    "createdBy",
                    "dateTime",
                    "itemName",
                    "icdCode",
                    "khmcCode",
                    "transactionID",
                ],
                actions: {
                    view: true,
                },
            },
        ], endpointURL: "/getHistoryItem?info=ItemInfo"
    },
    {
        name: "Vendors", tabs: [], allTabData: [
            {
                data: [
                    {
                        createdBy: "",
                        dateTime: "",
                        vendorName: "",
                        transactionID: "",
                    }
                ],
                heading: [
                    "Created by ",
                    "Date / Time",
                    "Vendor name",
                    "Transaction ID",
                    "Action",
                ],
                tableDataKeys: [
                    "createdBy",
                    "dateTime",
                    "vendorName",
                    "transactionID",
                ],
                actions: {
                    view: true,
                },
            },
        ], endpointURL: "/getHistoryItem?info=ItemInfo"
    },
];

export default {
    adminDropdownItems,
    adminTabsData,
};
