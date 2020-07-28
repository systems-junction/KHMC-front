const local = 'http://localhost:4000/api'
const live = 'https://test.khmc-staging.com/api'

// const baseUrl = "http://localhost:4000/api";

// const baseUrl = "http://192.168.10.20:4000/api";

const baseUrl = local;

// export const socketUrl = "ws://localhost:4001";
// export const socketUrl = "ws://192.168.10.20:4001";


export const socketUrl = "wss://test.khmc-staging.com:4001";


// auth endpoints
export const loginUrl = `${baseUrl}/auth/login`

export const addSubscriber = `${baseUrl}/subscriber/postsubscriber`

// items endpoints
export const getItemsUrl = `${baseUrl}/item/getitems`
export const addItemUrl = `${baseUrl}/item/additem`
export const updateItemUrl = `${baseUrl}/item/updateitem`
export const deleteItemUrl = `${baseUrl}/item/deleteitem`
export const getSearchedItemUrl = `${baseUrl}/item/getsearcheditems`
export const getSearchedPharmaceuticalItemsUrl = `${baseUrl}/item/getsearcheditemsp`
export const getSearchedNonPharmaceuticalItemsUrl = `${baseUrl}/item/getsearcheditemsnp`

// patient endpoints
export const getPatientById = `${baseUrl}/patient/getpatient/:id`
export const getPatientUrl = `${baseUrl}/patient/getpatient`
export const addPatientUrl = `${baseUrl}/patient/addpatient`
export const deletePatientUrl = `${baseUrl}/patient/deletepatient`
export const updatePatientUrl = `${baseUrl}/patient/updatepatient`
export const generateEDR = `${baseUrl}/edr/addedr`

// EDR endpoints
export const getEDRUrl = `${baseUrl}/EDR/getEDRs`
export const getSingleEDRPatient = `${baseUrl}/EDR/getSingleEDRPatient`

// warehouse endpoints
export const getWhInventoryUrl = `${baseUrl}/warehouseinventory/getWhInventory`
export const addWhInventoryUrl = `${baseUrl}/warehouseinventory/addWhInventory`
export const updateWhInventoryUrl = `${baseUrl}/warehouseinventory/updateWhInventory`
export const deleteWhInventoryUrl = `${baseUrl}/warehouseinventory/deleteWhInventory`

// bu inventory endpoints
export const getBuInventoryUrl = `${baseUrl}/buinventory/getbuinventory`
export const getBuInventoryByIdUrl = `${baseUrl}/buinventory/getbuinventorybyid`
export const addBuInventoryUrl = `${baseUrl}/buinventory/addbuinventory`
export const updateBuInventoryUrl = `${baseUrl}/buinventory/updatebuinventory`
export const deleteBuInventoryUrl = `${baseUrl}/buinventory/deletebuinventory`

// fu inventory endpoints
export const getFuInventoryUrl = `${baseUrl}/fuinventory/getfuinventory`
export const getFuInventoryByFUIdUrl = `${baseUrl}/fuinventory/getfuinventory`
export const addFuInventoryUrl = `${baseUrl}/fuinventory/addfuinventory`
export const updateFuInventoryUrl = `${baseUrl}/fuinventory/updatefuinventory`
export const deleteFuInventoryUrl = `${baseUrl}/fuinventory/deletefuinventory`

// bu rep request
export const getBuRepRequestUrl = `${baseUrl}/bureprequest/getbureprequest`
export const addBuRepRequestUrl = `${baseUrl}/bureprequest/addbureprequest`
export const updateBuRepRequestUrl = `${baseUrl}/bureprequest/updatebureprequest`
export const deleteBuRepRequestUrl = `${baseUrl}/bureprequest/deletebureprequest`

// bu rep request details
export const getBuRepRequestDetailsUrl = `${baseUrl}/bureprequestdetails/getbureprequestdetails`
export const addBuRepRequestDetailsUrl = `${baseUrl}/bureprequestdetails/addbureprequestdetails`
export const updateBuRepRequestDetailsUrl = `${baseUrl}/bureprequestdetails/updatebureprequestdetails`
export const deleteBuRepRequestDetailsUrl = `${baseUrl}/bureprequestdetails/deletebureprequestdetails`

// bu return
export const getBuReturnUrl = `${baseUrl}/bureturn/getbureturn`
export const addBuReturnUrl = `${baseUrl}/bureturn/addbureturn`
export const updateBuReturnUrl = `${baseUrl}/bureturn/updatebureturn`
export const deleteBuReturnUrl = `${baseUrl}/bureturn/deletebureturn`

// business unit
export const getBusinessUnitUrl = `${baseUrl}/businessunit/getbusinessunit`
export const getBusinessUnitLogsUrl = `${baseUrl}/businessunit/getbusinessunitlogs`
export const addBusinessUnitUrl = `${baseUrl}/businessunit/addbusinessunit`
export const updateBusinessUnitUrl = `${baseUrl}/businessunit/updatebusinessunit`
export const deleteBusinessUnitUrl = `${baseUrl}/businessunit/deletebusinessunit`
export const getBusinessUnitUrlWithHead = `${baseUrl}/businessunit/gethead`

// functional unit
export const getFunctionalUnitUrl = `${baseUrl}/functionalunit/getfunctionalunits`
export const getFunctionalUnitByIdUrl = `${baseUrl}/functionalunit/getfubyid`
export const getFunctionalUnitLogsUrl = `${baseUrl}/functionalunit/getfunctionalunitlogs`
export const addFunctionalUnitUrl = `${baseUrl}/functionalunit/addfunctionalunit`
export const updateFunctionalUnitUrl = `${baseUrl}/functionalunit/updatefunctionalunit`
export const deleteFunctionalUnitUrl = `${baseUrl}/functionalunit/deletefunctionalunit`
export const getFunctionalUnitFromHeadIdUrl = `${baseUrl}/functionalunit/gethead`
export const getFUFromBUUrl = `${baseUrl}/functionalunit/getwithbu`

// bu stock in log
export const getBuStockInLogUrl = `${baseUrl}/bustockinlog/getbustockinlog`
export const addBuStockInLogUrl = `${baseUrl}/bustockinlog/addbustockinlog`
export const updateBuStockInLogUrl = `${baseUrl}/bustockinlog/updatebustockinlog`
export const deleteBuStockInLogUrl = `${baseUrl}/bustockinlog/deletebustockinlog`

// bu stock out log
export const getBuStockOutLogUrl = `${baseUrl}/bustockoutlog/getbustockoutlog`
export const addBuStockOutLogUrl = `${baseUrl}/bustockoutlog/addbustockoutlog`
export const updateBuStockOutLogUrl = `${baseUrl}/bustockoutlog/updatebustockoutlog`
export const deleteBuStockOutLogUrl = `${baseUrl}/bustockoutlog/deletebustockoutlog`

// vendor
export const getVendorUrl = `${baseUrl}/vendor/getvendors`
export const addVendorUrl = `${baseUrl}/vendor/addvendor`
export const updateVendorUrl = `${baseUrl}/vendor/updatevendor`
export const deleteVendorUrl = `${baseUrl}/vendor/deletevendor`

// purchase request
export const getPurchaseRequestUrl = `${baseUrl}/purchaserequest/getpurchaserequests`
export const addPurchaseRequestUrl = `${baseUrl}/purchaserequest/addpurchaserequest`
export const updatePurchaseRequestUrl = `${baseUrl}/purchaserequest/updatepurchaserequest`
export const deletePurchaseRequestUrl = `${baseUrl}/purchaserequest/deletepurchaserequest`
export const getPurchaseRequestItemQtyUrl = `${baseUrl}/purchaserequest/getcurrqty`

// shipping term
export const getShippingTermUrl = `${baseUrl}/shippingterm/getshippingterms`
export const addShippingTermUrl = `${baseUrl}/shippingterm/addshippingterm`
export const updateShippingTermUrl = `${baseUrl}/shippingterm/updateShippingTerm`
export const deleteShippingTermUrl = `${baseUrl}/shippingterm/deleteShippingTerm`

//purchasing Request items

export const getPurchasingRequestItemUrl = `${baseUrl}/purchaserequest/getPurchaseRequestItems`
export const addPurchasingRequestItemUrl = `${baseUrl}/purchaserequest/addpurchaserequestitem`
export const updatePurchasingRequestItemUrl = `${baseUrl}/purchaserequest/updatepurchaserequestitem`
// export const deletePurchasingRequestItemUrl= `${baseUrl}/shippingterm/deleteShippingTerm`;

// purchase orders
export const getPurchaseOrderUrl = `${baseUrl}/purchaseorder/getpurchaseorders`
export const addPurchaseOrderUrl = `${baseUrl}/purchaseorder/addpurchaseorder`
export const deletePurchaseOrderUrl = `${baseUrl}/purchaseorder/deletepurchaseorder`
export const updatePurchaseOrderUrl = `${baseUrl}/purchaseorder/updatepurchaseorder`

// receive items
export const getReceiveItemsUrl = `${baseUrl}/receiveitem/getreceiveitems`
export const addReceiveItemsUrl = `${baseUrl}/receiveitem/addreceiveitem`
export const deleteReceiveItemsUrl = `${baseUrl}/receiveitem/deletereceiveitem`
export const updateReceiveItemsUrl = `${baseUrl}/receiveitem/updatereceiveitem`

// material receivings
export const getMaterialReceivingUrl = `${baseUrl}/materialreceiving/getmaterialreceivings`
export const addMaterialReceivingUrl = `${baseUrl}/materialreceiving/addmaterialreceiving`
export const deleteMaterialReceivingUrl = `${baseUrl}/materialreceiving/deletematerialreceiving`
export const updateMaterialReceivingUrl = `${baseUrl}/materialreceiving/updatematerialreceiving`
export const getSingleMaterialReceivingUrl = `${baseUrl}/materialReceiving/getmaterialreceivings`

// staff Types
export const getStaffTypeUrl = `${baseUrl}/stafftype/getstafftype`
export const addStaffTypeUrl = `${baseUrl}/stafftype/addstafftype`
export const deleteStaffTypeUrl = `${baseUrl}/stafftype/deletestafftype`
export const updateStaffTypeUrl = `${baseUrl}/stafftype/updatestafftype`

// staffs
export const getStaffUrl = `${baseUrl}/staff/getstaff`
export const addStaffUrl = `${baseUrl}/staff/addstaff`
export const deleteStaffUrl = `${baseUrl}/staff/deletestaff`
export const updateStaffTUrl = `${baseUrl}/staff/updatestaff`

// accessLevel
export const getAccessLevelUrl = `${baseUrl}/accesslevel/getaccesslevel`
export const addAccessLevelUrl = `${baseUrl}/accesslevel/addaccesslevel`
export const deleteAccessLevelUrl = `${baseUrl}/accesslevel/deleteaccesslevel`
export const updateAccessLevelUrl = `${baseUrl}/accesslevel/updateaccesslevel`

// system admin
export const getSystemAdminUrl = `${baseUrl}/systemadmin/getsystemadmin`
export const addSystemAdminUrl = `${baseUrl}/systemadmin/addsystemadmin`
export const deleteSystemAdminUrl = `${baseUrl}/systemadmin/deletesystemadmin`
export const updateSystemAdminUrl = `${baseUrl}/systemadmin/updatesystemadmin`

//receive items requests for accounts
export const getReceiveRequestsUrl = `${baseUrl}/account/getaccounts`
// export const addSystemAdminUrl = `${baseUrl}/systemadmin/addsystemadmin`;
// export const deleteSystemAdminUrl = `${baseUrl}/systemadmin/deletesystemadmin`;
export const updateReceiveRequestsUrl = `${baseUrl}/account/updateaccounts`

// replenishment request for FU
export const getReplenishmentRequestUrlFU = `${baseUrl}/replenishmentRequest/getreplenishmentrequestsFU`
export const addReplenishmentRequestUrl = `${baseUrl}/replenishmentRequest/addreplenishmentrequest`
export const deleteReplenishmentRequestUrl = `${baseUrl}/replenishmentRequest/deletereplenishmentrequests`
export const updateReplenishmentRequestUrl = `${baseUrl}/replenishmentRequest/updatereplenishmentrequest`
export const getSingleReplenishmentRequestUrl = `${baseUrl}/replenishmentRequest/getreplenishmentrequests`
export const getCurrentQtyForFURepRequestUrl = `${baseUrl}/replenishmentRequest/getcurrentitemquantityfu`

// receive item for FU
export const getReceiveRequestFUUrl = `${baseUrl}/receiveitemfu/getreceiveitemsfu`
export const addReceiveRequestFUUrl = `${baseUrl}/receiveitemfu/addreceiveitemfu`
export const deleteReceiveRequestFUUrl = `${baseUrl}/receiveitemfu/deletereceiveitemfu`
export const updateReceiveRequestFUUrl = `${baseUrl}/receiveitemfu/updatereceiveitemfu`

// replenishment request for BU
export const getRepRequestUrlBUForPharmaceutical = `${baseUrl}/replenishmentRequestBU/getreplenishmentrequestsbup`
export const getRepRequestUrlBUForNonPharmaceutical = `${baseUrl}/replenishmentRequestBU/getreplenishmentrequestsbunp`
export const addReplenishmentRequestUrlBU = `${baseUrl}/replenishmentRequestBU/addreplenishmentrequestbu`
export const deleteReplenishmentRequestUrlBU = `${baseUrl}/replenishmentRequestBU/deletereplenishmentrequestbu`
export const updateReplenishmentRequestUrlBU = `${baseUrl}/replenishmentRequestBU/updatereplenishmentrequestbu`
export const getSingleReplenishmentRequestUrlBU = `${baseUrl}/replenishmentRequestBU/getreplenishmentrequestsbu`
export const getCurrentQtyForBURepRequestUrl = `${baseUrl}/replenishmentRequestBU/getcurrentitemquantitybu`

// receive item for BU
export const getReceiveRequestBUUrl = `${baseUrl}/receiveitembu/getreceiveitemsbu`
export const addReceiveRequestBUUrl = `${baseUrl}/receiveitembu/addreceiveitembu`
export const deleteReceiveRequestBUUrl = `${baseUrl}/receiveitembu/deletereceiveitembu`
export const updateReceiveRequestBUUrl = `${baseUrl}/receiveitembu/updatereceiveitembu`

// internal items return
export const getInternalReturnRequestsBU = `${baseUrl}/internalreturnrequest/getinternalreturnrequestsbu`
export const getInternalReturnRequestsFU = `${baseUrl}/internalreturnrequest/getinternalreturnrequestsfu`
export const getInternalReturnRequestById = `${baseUrl}/internalreturnrequest/getinternalreturnrequest`
export const addInternalReturnRequest = `${baseUrl}/internalreturnrequest/addinternalreturnrequest`
export const deleteInternalReturnRequest = `${baseUrl}/internalreturnrequest/deleteinternalreturnrequest`
export const updateInternalReturnRequest = `${baseUrl}/internalreturnrequest/updateinternalrequest`

// external Retunrs
export const getExternalReturnRequests = `${baseUrl}/externalreturnrequest/getexternalreturnrequests`
export const getExternalReturnRequestById = `${baseUrl}/externalreturnrequest/getexternalreturnrequest`
export const addExternalReturnRequest = `${baseUrl}/externalreturnrequest/addexternalreturnrequest`
export const deleteExternalReturnRequest = `${baseUrl}/externalreturnrequest/deleteexternalreturnrequest`
export const updateExternalReturnRequest = `${baseUrl}/externalreturnrequest/updateexternalrequest`

// radiology services
export const getRadiologyServiceUrl = `${baseUrl}/radiologyservice/getradiologyservice`
export const addRadiologyServiceUrl = `${baseUrl}/radiologyservice/addradiologyservice`
export const deleteRadiologyServiceUrl = `${baseUrl}/radiologyservice/deleteradiologyservice`
export const updateRadiologyServiceUrl = `${baseUrl}/radiologyservice/updateradiologyservice`

// laboratory services
export const getLaboratoryServiceUrl = `${baseUrl}/laboratoryservice/getlaboratoryservice`
export const addLaboratoryServiceUrl = `${baseUrl}/laboratoryservice/addlaboratoryservice`
export const deleteLaboratoryServiceUrl = `${baseUrl}/laboratoryservice/deletelaboratoryservice`
export const updateLaboratoryServiceUrl = `${baseUrl}/laboratoryservice/updatelaboratoryservice`

// surgery services
export const getSurgeryServiceUrl = `${baseUrl}/surgeryservice/getsurgeryservice`
export const addSurgeryServiceUrl = `${baseUrl}/surgeryservice/addsurgeryservice`
export const deleteSurgeryServiceUrl = `${baseUrl}/surgeryservice/deletesurgeryservice`
export const updateSurgeryServiceUrl = `${baseUrl}/surgeryservice/updatesurgeryservice`

// nursing services
export const getNursingServiceUrl = `${baseUrl}/nurseservice/getnurseservice`
export const addNursingServiceUrl = `${baseUrl}/nurseservice/addnurseservice`
export const deleteNursingServiceUrl = `${baseUrl}/nurseservice/deletenurseservice`
export const updateNursingServiceUrl = `${baseUrl}/nurseservice/updatenurseservice`

// ECR
export const getECRUrl = `${baseUrl}/ecr/getecr`
export const addECRUrl = `${baseUrl}/ecr/addecr`
export const deleteECRUrl = `${baseUrl}/ecr/deleteecr`
export const updateECRUrl = `${baseUrl}/ecr/updateecr`
