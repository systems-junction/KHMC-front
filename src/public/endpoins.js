const baseUrl = 'http://localhost:8080/api';
export const socketUrl = 'ws://localhost:8080';

// auth endpoints
export const loginUrl = `${baseUrl}/auth/login`;

// items endpoints
export const getItemsUrl = `${baseUrl}/item/getitems`;
export const addItemUrl = `${baseUrl}/item/additem`;
export const updateItemUrl = `${baseUrl}/item/updateitem`;
export const deleteItemUrl = `${baseUrl}/item/deleteitem`;
export const getSearchedItemUrl = `${baseUrl}/item/getsearcheditems`;

// bu inventory endpoints
export const getBuInventoryUrl = `${baseUrl}/buinventory/getbuinventory`;
export const addBuInventoryUrl = `${baseUrl}/buinventory/addbuinventory`;
export const updateBuInventoryUrl = `${baseUrl}/buinventory/updatebuinventory`;
export const deleteBuInventoryUrl = `${baseUrl}/buinventory/deletebuinventory`;

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

// functional unit
export const getFunctionalUnitUrl = `${baseUrl}/functionalunit/getfunctionalunits`;
export const getFunctionalUnitLogsUrl = `${baseUrl}/functionalunit/getfunctionalunitlogs`;
export const addFunctionalUnitUrl = `${baseUrl}/functionalunit/addfunctionalunit`;
export const updateFunctionalUnitUrl = `${baseUrl}/functionalunit/updatefunctionalunit`;
export const deleteFunctionalUnitUrl = `${baseUrl}/functionalunit/deletefunctionalunit`;

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

// receive items
export const getMaterialReceivingUrl = `${baseUrl}/materialreceiving/getmaterialreceivings`;
export const addMaterialReceivingUrl = `${baseUrl}/materialreceiving/addmaterialreceiving`;
export const deleteMaterialReceivingUrl = `${baseUrl}/materialreceiving/deletematerialreceiving`;
export const updateMaterialReceivingUrl = `${baseUrl}/materialreceiving/updatematerialreceiving`;

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

// system admin
export const getSystemAdminUrl = `${baseUrl}/systemadmin/getsystemadmin`;
export const addSystemAdminUrl = `${baseUrl}/systemadmin/addsystemadmin`;
export const deleteSystemAdminUrl = `${baseUrl}/systemadmin/deletesystemadmin`;
export const updateSystemAdminUrl = `${baseUrl}/systemadmin/updatesystemadmin`;
