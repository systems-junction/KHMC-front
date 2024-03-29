const local = "http://localhost:4000/api";
const notificationsUrl = "http://localhost:4000";
const stagingDigitalOcean = "https://dev.khmc-staging.online/api";
const StagingDigitalOceanUploadsUrl = "https://dev.khmc-staging.online/";

const baseUrl = stagingDigitalOcean;
// const baseUrl = local;
const BlockChainBaseUrl = "http://167.99.248.234:8000/api";
const blockChainAdminBaseUrl = "http://167.99.248.234:8001/api";
export const socketUrl = "wss://dev.khmc-staging.online:4001";
// export const socketUrl = "ws:///192.168.18.28:4001";
// export const socketUrlForWebRTC = "ws:///192.168.18.28:4002";

// export const audioURL = "http:///192.168.18.28:4000";
export const audioURL = "https://dev.khmc-staging.online";
// export const uploadsUrl = "http:///192.168.18.28:4000/uploads/";
export const uploadsUrl = StagingDigitalOceanUploadsUrl;

// auth endpoints
export const loginUrl = `${baseUrl}/auth/login`;
export const resetPassword = `${baseUrl}/auth/resetpassword`;
export const changePassword = `${baseUrl}/auth/passwordchange`;

export const addSubscriber = `${baseUrl}/subscriber/postsubscriber`;

// notificationCenter Endpoints
export const markNotification = `${baseUrl}/notifications/updatenotifications`;
export const getNotifications = `${baseUrl}/notifications/getnotifications`;

// login/logout recording endpoints
export const recordLogin = `${baseUrl}/loginRecord/createLogin`;
export const recordLogout = `${baseUrl}/loginRecord/recordLogout`;

// items endpoints
export const getItemsUrl = `${baseUrl}/item/getitems`;
export const addItemUrl = `${baseUrl}/item/additem`;
export const updateItemUrl = `${baseUrl}/item/updateitem`;
export const deleteItemUrl = `${baseUrl}/item/deleteitem`;
export const getSearchedItemUrl = `${baseUrl}/item/getsearcheditems`;
export const getSearchedPharmaceuticalItemsUrl = `${baseUrl}/item/getsearcheditemsp`;
export const getSearchedItemsNonPharmaceuticalUrl = `${baseUrl}/item/getsearcheditemsnp`;
export const getSearchedNonPharmaceuticalItemsUrl = `${baseUrl}/item/getsearcheditemsnm`;

// patient endpoints
export const getPatientById = `${baseUrl}/patient/getpatient`;
export const getPatientByProfileNo = `${baseUrl}/patient/getpatientbyprofileno`;
export const getPatientUrl = `${baseUrl}/patient/getpatient`;
export const getPatientUrlById = `${baseUrl}/patient/getpatient`;
export const addPatientUrl = `${baseUrl}/patient/addpatient`;
export const deletePatientUrl = `${baseUrl}/patient/deletepatient`;
export const updatePatientUrl = `${baseUrl}/patient/updatepatient`;
export const generateEDR = `${baseUrl}/edr/addedr`;
export const generateIPR = `${baseUrl}/ipr/addipr`;
export const getVendorApproval = `${baseUrl}/insurance/verify`;
export const getpatientHistoryPre = `${baseUrl}/patient/getpatienthistorypre`;
export const getpatientHistory = `${baseUrl}/patient/getpatienthistory`;
export const getPatientEdrUrl = `${baseUrl}/edr/getedrpatient`;
export const getPatientIprUrl = `${baseUrl}/ipr/getiprpatient`;

export const searchpatient = `${baseUrl}/patient/searchpatient`;
export const updateEdrIpr = `${baseUrl}/patient/updateEdrIpr`;
export const updateEdrIprItem = `${baseUrl}/patient/updateEdrIprItem`;
export const searchPatientsURL = `${baseUrl}/patient/getpatientall`;
// for notifications
export const notifyTriage = `${baseUrl}/patient/triage`;
export const notifyPharmacy = `${baseUrl}/patient/pharmacy`;
export const notifyLab = `${baseUrl}/patient/lab`;
export const notifyRad = `${baseUrl}/patient/rad`;
export const notifyConsultation = `${baseUrl}/patient/consultation`;
export const notifyDischarge = `${baseUrl}/patient/discharge`;

// reimbursement endpoints
export const getSearchedpatient = `${baseUrl}/reimbursementclaim/getpatient`;
export const getSearchDischargedPatient = `${baseUrl}/reimbursementclaim/getpatientdischarge`;
export const addClaim = `${baseUrl}/reimbursementclaim/addclaim`;
export const getedripr = `${baseUrl}/reimbursementclaim/getedripr`;
export const getClaim = `${baseUrl}/reimbursementclaim/getclaim`;
export const updateClaim = `${baseUrl}/reimbursementclaim/updateclaim`;
export const getInsuredPatients = `${baseUrl}/reimbursementclaim/getpatientinsurance`;
export const getpatienthistoryUrl = `${baseUrl}/reimbursementclaim/getpatienthistory`;

// pre-approval Endpoints
export const getPreApproval = `${baseUrl}/par/getedrandipr`;
export const addPreApproval = `${baseUrl}/par/addpar`;
export const updatePreApproval = `${baseUrl}/par/updatepar`;
// export const getSearchedpatient = `${baseUrl}/reimbursementclaim/getpatient`

// EDR endpoints
export const getEDRUrl = `${baseUrl}/edr/getedr`;
export const getSingleEDRPatient = `${baseUrl}/edr/getedr`;
export const addEDR = `${baseUrl}/edr/addedr`;
export const deleteEDR = `${baseUrl}/edr/deleteedr/:_id`;
export const updateEDR = `${baseUrl}/edr/updateedr`;
export const getEDRDischargeUrl = `${baseUrl}/dischargerequest/getedrdischarge`;

//IPR endpoints
export const getIPRUrl = `${baseUrl}/ipr/getipr`;
export const getSingleIPRPatient = `${baseUrl}/ipr/getipr`;
export const addIPR = `${baseUrl}/ipr/addipr`;
export const deleteIPR = `${baseUrl}/ipr/deleteipr/:_id`;
export const updateIPR = `${baseUrl}/ipr/updateipr`;
export const addfollowup = `${baseUrl}/ipr/addfollowup`;

// warehouse endpoints
export const getWhInventoryUrl = `${baseUrl}/warehouseinventory/getWhInventory`;
export const addWhInventoryUrl = `${baseUrl}/warehouseinventory/addWhInventory`;
export const updateWhInventoryUrl = `${baseUrl}/warehouseinventory/updateWhInventory`;
export const deleteWhInventoryUrl = `${baseUrl}/warehouseinventory/deleteWhInventory`;

// bu inventory endpoints
export const getBuInventoryUrl = `${baseUrl}/buinventory/getbuinventory`;
export const getBuInventoryByIdUrl = `${baseUrl}/buinventory/getbuinventorybyid`;
export const addBuInventoryUrl = `${baseUrl}/buinventory/addbuinventory`;
export const updateBuInventoryUrl = `${baseUrl}/buinventory/updatebuinventory`;
export const deleteBuInventoryUrl = `${baseUrl}/buinventory/deletebuinventory`;

// fu inventory endpoints
export const getFuInventoryUrl = `${baseUrl}/fuinventory/getfuinventory`;
export const getFuInventoryByFUIdUrl = `${baseUrl}/fuinventory/getfuinventory`;
export const addFuInventoryUrl = `${baseUrl}/fuinventory/addfuinventory`;
export const updateFuInventoryUrl = `${baseUrl}/fuinventory/updatefuinventory`;
export const deleteFuInventoryUrl = `${baseUrl}/fuinventory/deletefuinventory`;

// bu rep request
export const getBuRepRequestUrl = `${baseUrl}/bureprequest/getbureprequest`;
export const addBuRepRequestUrl = `${baseUrl}/bureprequest/addbureprequest`;
export const updateBuRepRequestUrl = `${baseUrl}/bureprequest/updatebureprequest`;
export const deleteBuRepRequestUrl = `${baseUrl}/bureprequest/deletebureprequest`;

// bu rep request details
export const getBuRepRequestDetailsUrl = `${baseUrl}/bureprequestdetails/getbureprequestdetails`;
export const addBuRepRequestDetailsUrl = `${baseUrl}/bureprequestdetails/addbureprequestdetails`;
export const updateBuRepRequestDetailsUrl = `${baseUrl}/bureprequestdetails/updatebureprequestdetails`;
export const deleteBuRepRequestDetailsUrl = `${baseUrl}/bureprequestdetails/deletebureprequestdetails`;

// bu return
export const getBuReturnUrl = `${baseUrl}/bureturn/getbureturn`;
export const addBuReturnUrl = `${baseUrl}/bureturn/addbureturn`;
export const updateBuReturnUrl = `${baseUrl}/bureturn/updatebureturn`;
export const deleteBuReturnUrl = `${baseUrl}/bureturn/deletebureturn`;

// business unit
export const getBusinessUnitUrl = `${baseUrl}/businessunit/getbusinessunit`;
export const getBusinessUnitLogsUrl = `${baseUrl}/businessunit/getbusinessunitlogs`;
export const addBusinessUnitUrl = `${baseUrl}/businessunit/addbusinessunit`;
export const updateBusinessUnitUrl = `${baseUrl}/businessunit/updatebusinessunit`;
export const deleteBusinessUnitUrl = `${baseUrl}/businessunit/deletebusinessunit`;
export const getBusinessUnitUrlWithHead = `${baseUrl}/businessunit/gethead`;

// functional unit
export const getFunctionalUnitUrl = `${baseUrl}/functionalunit/getfunctionalunits`;
export const getFunctionalUnitByIdUrl = `${baseUrl}/functionalunit/getfubyid`;
export const getFunctionalUnitLogsUrl = `${baseUrl}/functionalunit/getfunctionalunitlogs`;
export const addFunctionalUnitUrl = `${baseUrl}/functionalunit/addfunctionalunit`;
export const updateFunctionalUnitUrl = `${baseUrl}/functionalunit/updatefunctionalunit`;
export const deleteFunctionalUnitUrl = `${baseUrl}/functionalunit/deletefunctionalunit`;
export const getFunctionalUnitFromHeadIdUrl = `${baseUrl}/functionalunit/gethead`;
export const getFUFromBUUrl = `${baseUrl}/functionalunit/getwithbu`;

// bu stock in log
export const getBuStockInLogUrl = `${baseUrl}/bustockinlog/getbustockinlog`;
export const addBuStockInLogUrl = `${baseUrl}/bustockinlog/addbustockinlog`;
export const updateBuStockInLogUrl = `${baseUrl}/bustockinlog/updatebustockinlog`;
export const deleteBuStockInLogUrl = `${baseUrl}/bustockinlog/deletebustockinlog`;

// bu stock out log
export const getBuStockOutLogUrl = `${baseUrl}/bustockoutlog/getbustockoutlog`;
export const addBuStockOutLogUrl = `${baseUrl}/bustockoutlog/addbustockoutlog`;
export const updateBuStockOutLogUrl = `${baseUrl}/bustockoutlog/updatebustockoutlog`;
export const deleteBuStockOutLogUrl = `${baseUrl}/bustockoutlog/deletebustockoutlog`;

// vendor
export const getVendorUrl = `${baseUrl}/vendor/getvendors`;
export const addVendorUrl = `${baseUrl}/vendor/addvendor`;
export const updateVendorUrl = `${baseUrl}/vendor/updatevendor`;
export const deleteVendorUrl = `${baseUrl}/vendor/deletevendor`;

// purchase request
export const getPurchaseRequestUrl = `${baseUrl}/purchaserequest/getpurchaserequests`;
export const addPurchaseRequestUrl = `${baseUrl}/purchaserequest/addpurchaserequest`;
export const updatePurchaseRequestUrl = `${baseUrl}/purchaserequest/updatepurchaserequest`;
export const deletePurchaseRequestUrl = `${baseUrl}/purchaserequest/deletepurchaserequest`;
export const getPurchaseRequestItemQtyUrl = `${baseUrl}/purchaserequest/getcurrqty`;

// shipping term
export const getShippingTermUrl = `${baseUrl}/shippingterm/getshippingterms`;
export const addShippingTermUrl = `${baseUrl}/shippingterm/addshippingterm`;
export const updateShippingTermUrl = `${baseUrl}/shippingterm/updateShippingTerm`;
export const deleteShippingTermUrl = `${baseUrl}/shippingterm/deleteShippingTerm`;

//purchasing Request items

export const getPurchasingRequestItemUrl = `${baseUrl}/purchaserequest/getPurchaseRequestItems`;
export const addPurchasingRequestItemUrl = `${baseUrl}/purchaserequest/addpurchaserequestitem`;
export const updatePurchasingRequestItemUrl = `${baseUrl}/purchaserequest/updatepurchaserequestitem`;
// export const deletePurchasingRequestItemUrl= `${baseUrl}/shippingterm/deleteShippingTerm`;

// purchase orders
export const getPurchaseOrderUrl = `${baseUrl}/purchaseorder/getpurchaseorders`;
export const addPurchaseOrderUrl = `${baseUrl}/purchaseorder/addpurchaseorder`;
export const deletePurchaseOrderUrl = `${baseUrl}/purchaseorder/deletepurchaseorder`;
export const updatePurchaseOrderUrl = `${baseUrl}/purchaseorder/updatepurchaseorder`;

// receive items
export const getReceiveItemsUrl = `${baseUrl}/receiveitem/getreceiveitems`;
export const addReceiveItemsUrl = `${baseUrl}/receiveitem/addreceiveitem`;
export const deleteReceiveItemsUrl = `${baseUrl}/receiveitem/deletereceiveitem`;
export const updateReceiveItemsUrl = `${baseUrl}/receiveitem/updatereceiveitem`;

// material receivings
export const getMaterialReceivingUrl = `${baseUrl}/materialreceiving/getmaterialreceivings`;
export const getMaterialReceivingUrlSearch = `${baseUrl}/materialreceiving/getmaterialreceivingskey`;
export const addMaterialReceivingUrl = `${baseUrl}/materialreceiving/addmaterialreceiving`;
export const deleteMaterialReceivingUrl = `${baseUrl}/materialreceiving/deletematerialreceiving`;
export const updateMaterialReceivingUrl = `${baseUrl}/materialreceiving/updatematerialreceiving`;
export const getSingleMaterialReceivingUrl = `${baseUrl}/materialReceiving/getmaterialreceivings`;

// staff Types
export const getStaffTypeUrl = `${baseUrl}/stafftype/getstafftype`;
export const addStaffTypeUrl = `${baseUrl}/stafftype/addstafftype`;
export const deleteStaffTypeUrl = `${baseUrl}/stafftype/deletestafftype`;
export const updateStaffTypeUrl = `${baseUrl}/stafftype/updatestafftype`;

// staffs
export const getStaffUrl = `${baseUrl}/staff/getstaff`;
export const addStaffUrl = `${baseUrl}/staff/addstaff`;
export const deleteStaffUrl = `${baseUrl}/staff/deletestaff`;
export const updateStaffTUrl = `${baseUrl}/staff/updatestaff`;

// accessLevel
export const getAccessLevelUrl = `${baseUrl}/accesslevel/getaccesslevel`;
export const addAccessLevelUrl = `${baseUrl}/accesslevel/addaccesslevel`;
export const deleteAccessLevelUrl = `${baseUrl}/accesslevel/deleteaccesslevel`;
export const updateAccessLevelUrl = `${baseUrl}/accesslevel/updateaccesslevel`;

// system admin
export const getSystemAdminUrl = `${baseUrl}/systemadmin/getsystemadmin`;
export const addSystemAdminUrl = `${baseUrl}/systemadmin/addsystemadmin`;
export const deleteSystemAdminUrl = `${baseUrl}/systemadmin/deletesystemadmin`;
export const updateSystemAdminUrl = `${baseUrl}/systemadmin/updatesystemadmin`;

//receive items requests for accounts
export const getReceiveRequestsUrl = `${baseUrl}/account/getaccounts`;
export const getReceiveRequestsSearch = `${baseUrl}/account/getaccount`;
// export const addSystemAdminUrl = `${baseUrl}/systemadmin/addsystemadmin`;
// export const deleteSystemAdminUrl = `${baseUrl}/systemadmin/deletesystemadmin`;
export const updateReceiveRequestsUrl = `${baseUrl}/account/updateaccounts`;

// replenishment request for FU
export const getReplenishmentRequestUrlFU = `${baseUrl}/replenishmentRequest/getreplenishmentrequestsFU`;
export const getReplenishmentRequestUrlFUSearch = `${baseUrl}/replenishmentRequest/getreplenishmentrequests`;
export const addReplenishmentRequestUrl = `${baseUrl}/replenishmentRequest/addreplenishmentrequest`;
export const deleteReplenishmentRequestUrl = `${baseUrl}/replenishmentRequest/deletereplenishmentrequests`;
export const updateReplenishmentRequestUrl = `${baseUrl}/replenishmentRequest/updatereplenishmentrequest`;
export const getSingleReplenishmentRequestUrl = `${baseUrl}/replenishmentRequest/getreplenishmentrequests`;
export const getCurrentQtyForFURepRequestUrl = `${baseUrl}/replenishmentRequest/getcurrentitemquantityfu`;

// receive item for FU
export const getReceiveRequestFUUrl = `${baseUrl}/receiveitemfu/getreceiveitemsfu`;
export const addReceiveRequestFUUrl = `${baseUrl}/receiveitemfu/addreceiveitemfu`;
export const deleteReceiveRequestFUUrl = `${baseUrl}/receiveitemfu/deletereceiveitemfu`;
export const updateReceiveRequestFUUrl = `${baseUrl}/receiveitemfu/updatereceiveitemfu`;

// replenishment request for BU
export const getRepRequestUrlBUForPharmaceutical = `${baseUrl}/replenishmentRequestBU/getreplenishmentrequestsbup`;
export const getRepRequestUrlBUForNonPharmaceutical = `${baseUrl}/replenishmentRequestBU/getreplenishmentrequestsbunp`;
export const addReplenishmentRequestUrlBU = `${baseUrl}/replenishmentRequestBU/addreplenishmentrequestbu`;
export const deleteReplenishmentRequestUrlBU = `${baseUrl}/replenishmentRequestBU/deletereplenishmentrequestbu`;
export const updateReplenishmentRequestUrlBU = `${baseUrl}/replenishmentRequestBU/updatereplenishmentrequestbu`;
export const getSingleReplenishmentRequestUrlBU = `${baseUrl}/replenishmentRequestBU/getreplenishmentrequestsbu`;
export const getCurrentQtyForBURepRequestUrl = `${baseUrl}/replenishmentRequestBU/getcurrentitemquantitybu`;

// receive item for BU
export const getReceiveRequestBUUrl = `${baseUrl}/receiveitembu/getreceiveitemsbu`;
export const addReceiveRequestBUUrl = `${baseUrl}/receiveitembu/addreceiveitembu`;
export const deleteReceiveRequestBUUrl = `${baseUrl}/receiveitembu/deletereceiveitembu`;
export const updateReceiveRequestBUUrl = `${baseUrl}/receiveitembu/updatereceiveitembu`;

// internal items return
export const getInternalReturnRequestsBU = `${baseUrl}/internalreturnrequest/getinternalreturnrequestsbu`;
export const getInternalReturnRequestsFU = `${baseUrl}/internalreturnrequest/getinternalreturnrequestsfu`;
export const getInternalReturnRequestById = `${baseUrl}/internalreturnrequest/getinternalreturnrequest`;
export const addInternalReturnRequest = `${baseUrl}/internalreturnrequest/addinternalreturnrequest`;
export const deleteInternalReturnRequest = `${baseUrl}/internalreturnrequest/deleteinternalreturnrequest`;
export const updateInternalReturnRequest = `${baseUrl}/internalreturnrequest/updateinternalrequest`;

// external Retunrs
export const getExternalReturnRequests = `${baseUrl}/externalreturnrequest/getexternalreturnrequests`;
export const getExternalReturnRequestById = `${baseUrl}/externalreturnrequest/getexternalreturnrequest`;
export const addExternalReturnRequest = `${baseUrl}/externalreturnrequest/addexternalreturnrequest`;
export const deleteExternalReturnRequest = `${baseUrl}/externalreturnrequest/deleteexternalreturnrequest`;
export const updateExternalReturnRequest = `${baseUrl}/externalreturnrequest/updateexternalrequest`;

// radiology services
export const getRadiologyServiceUrl = `${baseUrl}/radiologyservice/getradiologyservice`;
export const addRadiologyServiceUrl = `${baseUrl}/radiologyservice/addradiologyservice`;
export const deleteRadiologyServiceUrl = `${baseUrl}/radiologyservice/deleteradiologyservice`;
export const updateRadiologyServiceUrl = `${baseUrl}/radiologyservice/updateradiologyservice`;
export const getSearchedRadiologyService = `${baseUrl}/radiologyservice/getsearchedradiology`;

// laboratory services
export const getLaboratoryServiceUrl = `${baseUrl}/laboratoryservice/getlaboratoryservice`;
export const addLaboratoryServiceUrl = `${baseUrl}/laboratoryservice/addlaboratoryservice`;
export const deleteLaboratoryServiceUrl = `${baseUrl}/laboratoryservice/deletelaboratoryservice`;
export const updateLaboratoryServiceUrl = `${baseUrl}/laboratoryservice/updatelaboratoryservice`;
export const getSearchedLaboratoryService = `${baseUrl}/laboratoryservice/getsearchedlabs`;

// surgery services
export const getSurgeryServiceUrl = `${baseUrl}/surgeryservice/getsurgeryservice`;
export const addSurgeryServiceUrl = `${baseUrl}/surgeryservice/addsurgeryservice`;
export const deleteSurgeryServiceUrl = `${baseUrl}/surgeryservice/deletesurgeryservice`;
export const updateSurgeryServiceUrl = `${baseUrl}/surgeryservice/updatesurgeryservice`;

// nursing services
export const getNursingServiceUrl = `${baseUrl}/nurseservice/getnurseservice`;
export const addNursingServiceUrl = `${baseUrl}/nurseservice/addnurseservice`;
export const deleteNursingServiceUrl = `${baseUrl}/nurseservice/deletenurseservice`;
export const updateNursingServiceUrl = `${baseUrl}/nurseservice/updatenurseservice`;
export const getSearchedNurseService = `${baseUrl}/nurseservice/getsearchednurse`;

// ECR
export const getECRFromEDRUrl = `${baseUrl}/ecr/getecrfromedr`;
export const getECRFromIPRUrl = `${baseUrl}/ecr/getecrfromipr`;
export const deleteECRUrl = `${baseUrl}/ecr/deleteecr`;
export const updateECRUrl = `${baseUrl}/ecr/updateecr`;
export const getECRUrl = `${baseUrl}/ecr/getecr`;
export const addECRUrl = `${baseUrl}/ecr/addecr`;
export const getAllExternalConsultantsUrl = `${baseUrl}/staff/getexternalconsultant`;
export const getExternalConsultantsNames = `${baseUrl}/staff/getexternalconsultantname`;

// PHR
export const getPHREDRUrl = `${baseUrl}/edr/getphredr`;
export const getPHRIPRUrl = `${baseUrl}/ipr/getphripr`;
export const getRREDRUrl = `${baseUrl}/edr/getrredr`;
export const getRRIPRUrl = `${baseUrl}/ipr/getrripr`;
export const getLREDRUrl = `${baseUrl}/edr/getlredr`;
export const getLRIPRUrl = `${baseUrl}/ipr/getlripr`;
export const getOPRFromPharmacyUrl = `${baseUrl}/opr/getoprfrompharmacy`;
export const getOPRFromLabUrl = `${baseUrl}/opr/getoprfromlab`;
export const getOPRFromRadiologyUrl = `${baseUrl}/opr/getoprfromradiology`;
export const generateOPR = `${baseUrl}/opr/addopr`;
export const updateOPR = `${baseUrl}/opr/updateopr`;
export const getOPRById = `${baseUrl}/opr/getopr`;
export const updateRROPRById = `${baseUrl}/opr/updaterad`;
export const updateLROPRById = `${baseUrl}/opr/updatelab`;
export const getPHROPRById = `${baseUrl}/opr/getphroprbyid`;
export const updatePHROPRById = `${baseUrl}/opr/updatephr`;

// LR by ID
export const getLRById = `${baseUrl}/edr/getlredr`;
export const updateLRById = `${baseUrl}/edr/updatelab`;
export const getLRIPRById = `${baseUrl}/ipr/getlripr`;
export const updateLRIPRById = `${baseUrl}/ipr/updatelab`;
export const getRROPRById = `${baseUrl}/opr/getrroprbyid`;
export const getLROPRById = `${baseUrl}/opr/getlroprbyid`;

// RR by ID
export const getRRById = `${baseUrl}/edr/getrredr`;
export const updateRRById = `${baseUrl}/edr/updaterad`;
export const getRRIPRById = `${baseUrl}/ipr/getrripr`;
export const updateRRIPRById = `${baseUrl}/ipr/updaterad`;

// PHR by ID
export const getPHRById = `${baseUrl}/edr/getphredr`;
export const updatePHRById = `${baseUrl}/edr/updatephr`;
export const getPHRIPRById = `${baseUrl}/ipr/getphripr`;
export const updatePHRIPRById = `${baseUrl}/ipr/updatephr`;

//Add Discharge Request
export const AddDischargeRequestUrl = `${baseUrl}/dischargerequest/adddischarge`;

// Discharge Medication
export const getDischargeEDRUrl = `${baseUrl}/edr/getdischargeedr`;
export const getDischargeIPRUrl = `${baseUrl}/ipr/getdischargeipr`;
export const updateDischargeEDRUrl = `${baseUrl}/edr/updatedischarge`;
export const updateDischargeIPRUrl = `${baseUrl}/ipr/updatedischarge`;

// Patient FHIR
export const addPatientFHIRUrl = `${baseUrl}/patient/addpatientfhir`;
export const updatePatientFHIRUrl = `${baseUrl}/patient/updatepatientfhir`;

// get RRIPR
export const getRRPatient = `${baseUrl}/ipr/getrrpatient`;
export const getRRPatientById = `${baseUrl}/ipr/getrrpatientbyid`;

// get RR
export const getRRByIdURL = `${baseUrl}/ipr/getrrbyid`;
export const updateRRByIdURL = `${baseUrl}/ipr/updaterr`;

// get LR
export const getLRPatient = `${baseUrl}/ipr/getlrpatient`;
export const getLRByIdURL = `${baseUrl}/ipr/getlrbyid`;
export const updateLRByIdURL = `${baseUrl}/ipr/updatelr`;

// get PHR
export const getPHRPatient = `${baseUrl}/ipr/getphrpatient`;
export const getPHRByIdURL = `${baseUrl}/ipr/getphrbyid`;
export const updatePHRRByIdURL = `${baseUrl}/ipr/updatephrbyid`;

// get Discharge
export const getDischarge = `${baseUrl}/ipr/getdischarge`;
export const getDischargeByIdURL = `${baseUrl}/ipr/getdischargebyid`;
export const updateDischargeByIdURL = `${baseUrl}/ipr/updatedischargebyid`;

// getEDRIPRByID
export const getIPREDRById = `${baseUrl}/ipr/getipredrbyid`;

// searchPatients
export const searchPatients = `${baseUrl}/patient/searchpatient`;

//http://localhost:4000/api/ipr/getallconsultations
//get consultation
export const getallconsultations = `${baseUrl}/ipr/getallconsultations`;

//patient clearance

export const getPatientClearanceURL = `${baseUrl}/patientclearance/getpatientclearance`;
export const addPatientClearanceURL = `${baseUrl}/patientclearance/addpatientclearance`;
export const getPatientClearanceByIdURL = `${baseUrl}/patientclearance/getpatientclearance/:id`;
export const updatePatientClearanceURL = `${baseUrl}/patientclearance/updatepatientclearance`;

// icd code

export const getIcd = `${baseUrl}/codes/geticdcat`;

//Reports
export const trackingPO = `${baseUrl}/reports/trackingpo`;

//Expired Items
export const expiredItemsWarehouse = `${baseUrl}/reports/expireditemswh`;
export const expiredItemsFU = `${baseUrl}/reports/expireditemsfu`;

//Nearly Expired Items
export const nearlyExpiredItemsWarehouse = `${baseUrl}/reports/nearlyexpireditemswh`;
export const nearlyExpiredItemsFU = `${baseUrl}/reports/nearlyexpireditemsfu`;

//Disposed Items
// export const nearlyExpiredItemsWarehouse = `${baseUrl}/reports/disposed`;
export const disposedItemsFU = `${baseUrl}/reports/disposeditems`;

//Consumption Balance
export const consumptionBalanceWarehouse = `${baseUrl}/reports/consumptionBalance`;
export const consumptionBalanceFU = `${baseUrl}/reports/consumptionBalance`;

//Slow moving items
export const slowMovingItemsWarehouse = `${baseUrl}/reports/slowmovingwh`;
export const slowMovingItemsFU = `${baseUrl}/reports/slowmovingfu`;

//WH transfer
export const warehouseTransfer = `${baseUrl}/reports/whtransfer`;
// export const slowMovingItemsFU = `${baseUrl}/reports/slowmovingfu`;

//Stock level for warehosue
export const stockLevelsWarehouse = `${baseUrl}/reports/stocklevelswh`;

//Stock level for fu
export const stockLevelsFU = `${baseUrl}/reports/stocklevelsfu`;

//Supplier Fulfillment PO
export const supplierfulfillmentPO = `${baseUrl}/reports/supplierfulfillmentpo`;
export const createChat = `${baseUrl}/chatroom/createchat`;
export const deleteChat = `${baseUrl}/chatroom/deletechat`;
export const uploadChatFile = `${baseUrl}/chatroom/uploadchatfile`;

//Margin Levels
export const createMargin = `${baseUrl}/margin/createmargin`;
export const getMargin = `${baseUrl}/margin/getmargin`;

// dashboard

export const committeeMember = `${baseUrl}/reports/acmdashboard`;
export const purchasingOfficer = `${baseUrl}/reports/purchasingofficerdashboard`;
export const wareHouseInventoryKeeper = `${baseUrl}/reports/whikdashboard`;
export const functionalUnitInventoryKeeper = `${baseUrl}/reports/fuikdashboard`;
export const cashier = `${baseUrl}/reports/cashierdashboard`;
export const insuranceDepartment = `${baseUrl}/reports/icmdashboard`;
export const radiologyDepartment = `${baseUrl}/reports/rtdashboard`;
export const labTechnician = `${baseUrl}/reports/ltdashboard`;
export const pharmacist = `${baseUrl}/reports/pharmacistdashboard`;
export const registrationOfficer = `${baseUrl}/reports/rodashboard`;
export const registuredNurse = `${baseUrl}/reports/nursedashboard`;
export const consultant = `${baseUrl}/reports/consultantdashboard`;
export const doctor = `${baseUrl}/reports/doctordashboard`;

//active patient

export const getActivePatients = `${baseUrl}/patient/getpatientactive`;

//triage
export const changeTriageStatus = `${baseUrl}/patient/triageStatus`;

// patients info
export const getPatientsInfo = `${BlockChainBaseUrl}`;

export const getAdmin = `${blockChainAdminBaseUrl}`;
