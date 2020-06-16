// import React, { useEffect, useState, useReducer } from "react";
// import TextField from "@material-ui/core/TextField";
// import Select from "@material-ui/core/Select";
// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
// import Button from "@material-ui/core/Button";
// import axios from "axios";
// import Notification from "../../components/Snackbar/Notification.js";
// import { addItemUrl, updateItemUrl } from "../../public/endpoins";
// import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
// import DateFnsUtils from "@date-io/date-fns";
// import Header from "../../components/Header/Header";
// import items from "../../assets/img/Items Mgmt.png";
// import view_all from "../../assets/img/view_all.png";
// import Back_Arrow from "../../assets/img/Back_Arrow.png";

// import "../../assets/jss/material-dashboard-react/components/TextInputStyle.css";

// const unit = [
//   {
//     key: "kg",
//     value: "Kg",
//   },
//   {
//     key: "mg",
//     value: "Mg",
//   },
//   {
//     key: "cm",
//     value: "Cm",
//   },
//   {
//     key: "dm",
//     value: "Dm",
//   },
// ];
// const con = [
//   {
//     key: "true",
//     value: "Yes",
//   },
//   {
//     key: "false",
//     value: "No",
//   },
// ];
// const styles = {
//   // inputContainer: {
//   //   marginTop: 25,
//   //   backgroundColor: "white",
//   //   borderRadius: 5,
//   //   paddingTop: 5,
//   //   paddingBottom: 5,
//   //   paddingLeft: 5,
//   //   paddingRight: 5,
//   // },

//   inputContainer: {
//     marginTop: 25,
//   },

//   inputContainerForDropDown: {
//     marginTop: 35,
//     backgroundColor: "white",
//     borderRadius: 10,
//     paddingLeft: 10,
//     paddingRight: 10,
//     paddingTop: 2,
//   },
// };

// function AddItems(props) {
//   const initialState = {
//     _id: "",
//     requestNo: "",
//     generatedBy: "",
//     timeStamp: "",
//     requestReason: "",
//     receiptUnit: "",
//     issueUnit: "",
//     vendorId: "",
//     purchasePrice: "",
//     minimumLevel: "",
//     maximumLevel: "",
//     reorderLevel: "",
//     vendors: [],
//     units: [],
//     cls: "",
//     grandSubClass: "",
//     comments: "",
//     tax: "",
//     receiptUnitCost: "",
//     issueUnitCost: "",
//     scientificName: "",
//     tradeName: "",
//     temperature: "",
//     humidity: "",
//     expiration: "",
//     lightSensitive: "",
//     resuableItem: "",
//     storageCondition: "",
//   };

//   function reducer(state, { field, value }) {
//     return {
//       ...state,
//       [field]: value,
//     };
//   }
//   const [state, dispatch] = useReducer(reducer, initialState);

//   const {
//     _id,
//     name,
//     description,
//     subClass,
//     itemCode,
//     receiptUnit,
//     issueUnit,
//     vendorId,
//     purchasePrice,
//     maximumLevel,
//     minimumLevel,
//     reorderLevel,
//     units,
//     cls,
//     grandSubClass,
//     comments,
//     tax,
//     receiptUnitCost,
//     issueUnitCost,
//     scientificName,
//     tradeName,
//     temperature,
//     humidity,
//     expiration,
//     lightSensitive,
//     resuableItem,
//     storageCondition,
//   } = state;
//   const [comingFor, setcomingFor] = useState("");
//   const [isFormSubmitted, setIsFormSubmitted] = useState(false);

//   const [mainClasses, setClasses] = useState("");
//   const [subClasses, setSubClasses] = useState("");
//   const [childSubClass, setChildSubClasses] = useState("");

//   const [vendorsArray, setVendorsArray] = useState("");

//   const [msg, setMsg] = useState("");
//   const [tr, setTr] = useState(false);

//   useEffect(() => {
//     setcomingFor(props.history.location.state.comingFor);
//     setClasses(props.history.location.state.classes);
//     setSubClasses(props.history.location.state.subClasses);
//     setChildSubClasses(props.history.location.state.grandSubClasses);
//     setVendorsArray(props.history.location.state.vendors);

//     const selectedRec = props.history.location.state.selectedItem;
//     if (selectedRec) {
//       Object.entries(selectedRec).map(([key, val]) => {
//         if (val && typeof val === "object") {
//           dispatch({ field: key, value: val._id });
//         } else {
//           dispatch({ field: key, value: val });
//         }
//       });
//     }

//     if (props.history.location.state.vendors) {
//       dispatch({
//         field: "vendors",
//         value: props.history.location.state.vendors,
//       });
//     }
//     if (props.history.location.state.units) {
//       dispatch({ field: "units", value: props.history.location.state.units });
//     }
//   }, []);

//   const onChangeValue = (e) => {
//     dispatch({ field: e.target.name, value: e.target.value });
//   };
//   function onChangeDate(value, type) {
//     dispatch({ field: type, value });
//   }
//   function validateForm() {
//     const res =
//       name.length > 0 &&
//       description.length > 0 &&
//       subClass.length > 0 &&
//       itemCode.length > 0 &&
//       receiptUnit.length > 0 &&
//       receiptUnitCost.length > 0 &&
//       issueUnit.length > 0 &&
//       issueUnitCost.length > 0 &&
//       vendorId.length > 0 &&
//       purchasePrice > 0 &&
//       maximumLevel.length > 0 &&
//       minimumLevel.length > 0 &&
//       reorderLevel.length > 0 &&
//       cls.length > 0 &&
//       tax.length > 0 &&
//       grandSubClass.length > 0;

//     return res;
//   }
//   const handleCancel = () => {
//     props.history.goBack();
//   };

//   const handleAdd = () => {
//     setIsFormSubmitted(true);
//     if (validateForm()) {
//       const params = {
//         name,
//         description,
//         subClass,
//         itemCode,
//         receiptUnit,
//         issueUnit,
//         vendorId,
//         purchasePrice,
//         maximumLevel,
//         minimumLevel,
//         reorderLevel,
//         cls,
//         grandSubClass,
//         comments,
//         tax,
//         receiptUnitCost,
//         issueUnitCost,
//         scientificName,
//         tradeName,
//         temperature,
//         humidity,
//         expiration,
//         lightSensitive,
//         resuableItem,
//         storageCondition,
//       };
//       axios
//         .post(addItemUrl, params)
//         .then((res) => {
//           if (res.data.success) {
//             console.log("response after adding item", res);
//             props.history.goBack();
//           } else if (!res.data.success) {
//             setTr(true);
//           }
//         })
//         .catch((e) => {
//           console.log("error after adding item", e);
//           setTr(true);
//           setMsg("Error while adding the item");
//         });
//     }
//   };

//   const handleEdit = () => {
//     setIsFormSubmitted(true);
//     if (validateForm()) {
//       const params = {
//         _id,
//         name,
//         description,
//         subClass,
//         itemCode,
//         receiptUnit,
//         issueUnit,
//         vendorId,
//         purchasePrice,
//         maximumLevel,
//         minimumLevel,
//         reorderLevel,
//         cls,
//         grandSubClass,
//         comments,
//         tax,
//         receiptUnitCost,
//         issueUnitCost,
//         scientificName,
//         tradeName,
//         temperature,
//         humidity,
//         expiration,
//         lightSensitive,
//         resuableItem,
//         storageCondition,
//       };
//       axios
//         .put(updateItemUrl, params)
//         .then((res) => {
//           if (res.data.success) {
//             console.log("response after adding item", res);
//             props.history.goBack();
//           } else if (!res.data.success) {
//             setTr(true);
//           }
//         })
//         .catch((e) => {
//           console.log("error after adding item", e);
//           setTr(true);
//           setMsg("Error while updating the item");
//         });
//     }
//   };

//   if (tr) {
//     setTimeout(() => {
//       setTr(false);
//       setMsg("");
//     }, 2000);
//   }

//   return (
//     <div
//       style={{
//         backgroundColor: "#60d69f",
//         position: "fixed",
//         display: "flex",
//         width: "100%",
//         height: "100%",
//         flexDirection: "column",
//         flex: 1,
//         overflowY: "scroll",
//       }}
//     >
//       <Header />
//       <div className="cPadding">
//         <div className="subheader">
//           <div>
//             <img src={items} />
//             <h4>{comingFor === "AddItems" ? " Add Item" : " Edit Item"}</h4>
//           </div>

//           <div>
//             <img onClick={() => props.history.goBack()} src={view_all} />
//             {/* <img src={Search} /> */}
//           </div>
//         </div>
//         <div>
//           {/* <h1>{comingFor === 'EditItems' ? 'Edit Items' : 'Add Items'}</h1> */}
//           <div className="row">
//             <div className="col-md-6">
//               <div style={styles.inputContainer}>
//                 {/* <TextField
//                   fullWidth
//                   id="outlined-basic"
//                   label="Name"
//                   name="name"
//                   // variant="outlined"
//                   value={name}
//                   onChange={onChangeValue}
//                   error={!name && isFormSubmitted}
//                 /> */}

//                 <input
//                   type="text"
//                   placeholder="Name"
//                   name={"name"}
//                   value={name}
//                   onChange={onChangeValue}
//                   className="textInputStyle"
//                 />
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div style={styles.inputContainer}>
//                 {/* <TextField
//                   fullWidth
//                   id="outlined-basic"
//                   label="Item Code"
//                   // variant="outlined"
//                   name="itemCode"
//                   value={itemCode}
//                   type="text"
//                   onChange={onChangeValue}
//                   error={!itemCode && isFormSubmitted}
//                 /> */}

//                 <input
//                   type="number"
//                   placeholder="Item Code"
//                   name={"itemCode"}
//                   value={itemCode}
//                   onChange={onChangeValue}
//                   className="textInputStyle"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-md-12">
//               <div style={styles.inputContainer}>
//                 {/* <TextField
//                   fullWidth
//                   // multiline
//                   // rows={4}
//                   id="outlined-basic"
//                   label="Description"
//                   // variant="outlined"
//                   name="description"
//                   value={description}
//                   onChange={onChangeValue}
//                   multiline
//                   rows={3}
//                   error={!description && isFormSubmitted}
//                 /> */}

//                 <input
//                   type="text"
//                   placeholder="Description"
//                   name={"description"}
//                   value={description}
//                   onChange={onChangeValue}
//                   className="textInputStyle"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="row">
//             <div className="col-md-6">
//               <div style={styles.inputContainerForDropDown}>
//                 <InputLabel id="receiptUnit-label">Receipt Unit</InputLabel>
//                 <Select
//                   fullWidth
//                   labelId="receiptUnit-label"
//                   id="receiptUnit"
//                   name="receiptUnit"
//                   value={receiptUnit}
//                   onChange={onChangeValue}
//                   label="Receipt Unit"
//                   error={!receiptUnit && isFormSubmitted}
//                 >
//                   <MenuItem value="">
//                     <em>None</em>
//                   </MenuItem>
//                   {unit.map((val) => {
//                     return (
//                       <MenuItem key={val.key} value={val.key}>
//                         {val.value}
//                       </MenuItem>
//                     );
//                   })}
//                 </Select>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div style={styles.inputContainer}>
//                 {/* <TextField
//                   fullWidth
//                   id="receiptUnitCost"
//                   label="Reciept Unit Cost"
//                   name="receiptUnitCost"
//                   value={receiptUnitCost}
//                   type="number"
//                   onChange={onChangeValue}
//                   error={!receiptUnitCost && isFormSubmitted}
//                 /> */}

//                 <input
//                   type="number"
//                   placeholder="Receipt Unit Cost"
//                   name={"receiptUnitCost"}
//                   value={receiptUnitCost}
//                   onChange={onChangeValue}
//                   className="textInputStyle"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-md-6">
//               <div style={styles.inputContainerForDropDown}>
//                 <InputLabel id="issueUnit-label">Issue Unit</InputLabel>
//                 <Select
//                   fullWidth
//                   labelId="issueUnit-label"
//                   id="issueUnit"
//                   name="issueUnit"
//                   value={issueUnit}
//                   onChange={onChangeValue}
//                   label="Issue Unit"
//                   error={!issueUnit && isFormSubmitted}
//                 >
//                   <MenuItem value="">
//                     <em>None</em>
//                   </MenuItem>
//                   {unit.map((val) => {
//                     return (
//                       <MenuItem key={val.key} value={val.key}>
//                         {val.value}
//                       </MenuItem>
//                     );
//                   })}
//                 </Select>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div style={styles.inputContainer}>
//                 {/* <TextField
//                   fullWidth
//                   id="issueUnitCost"
//                   label="Issue Unit Cost"
//                   name="issueUnitCost"
//                   value={issueUnitCost}
//                   type="number"
//                   onChange={onChangeValue}
//                   error={!issueUnitCost && isFormSubmitted}
//                 /> */}

//                 <input
//                   type="number"
//                   placeholder="Issue Unit Cost"
//                   name={"issueUnitCost"}
//                   value={issueUnitCost}
//                   onChange={onChangeValue}
//                   className="textInputStyle"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-md-4">
//               <div style={styles.inputContainerForDropDown}>
//                 <InputLabel id="vendorId-label">Vendor</InputLabel>
//                 <Select
//                   fullWidth
//                   labelId="vendorId-label"
//                   id="vendorId"
//                   name="vendorId"
//                   value={vendorId}
//                   onChange={onChangeValue}
//                   label="Vendor"
//                   error={!vendorId && isFormSubmitted}
//                 >
//                   <MenuItem value="">
//                     <em>None</em>
//                   </MenuItem>
//                   {vendorsArray &&
//                     vendorsArray.map((val) => {
//                       return (
//                         <MenuItem key={val._id} value={val._id}>
//                           {val.englishName}
//                         </MenuItem>
//                       );
//                     })}
//                 </Select>
//               </div>
//             </div>

//             <div className="col-md-4">
//               <div style={styles.inputContainer}>
//                 {/* <TextField
//                   fullWidth
//                   label="Puschase Price"
//                   type="number"
//                   // variant="outlined"
//                   name="purchasePrice"
//                   value={purchasePrice}
//                   InputProps={{ inputProps: { min: 0 } }}
//                   onChange={onChangeValue}
//                   error={
//                     (!purchasePrice || purchasePrice < 0) && isFormSubmitted
//                   }
//                 /> */}

//                 <input
//                   type="number"
//                   placeholder="Purchase Price"
//                   name={"purchasePrice"}
//                   value={purchasePrice}
//                   onChange={onChangeValue}
//                   className="textInputStyle"
//                 />
//               </div>
//             </div>
//             <div className="col-md-4">
//               <div style={styles.inputContainer}>
//                 {/* <TextField
//                   fullWidth
//                   label="Tax"
//                   type="number"
//                   name="tax"
//                   value={tax}
//                   InputProps={{ inputProps: { min: 0 } }}
//                   onChange={onChangeValue}
//                   error={(!tax || tax < 0) && isFormSubmitted}
//                 /> */}
//                 <input
//                   type="number"
//                   placeholder="Tax"
//                   name={"tax"}
//                   value={tax}
//                   onChange={onChangeValue}
//                   className="textInputStyle"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-md-4">
//               <div style={styles.inputContainer}>
//                 {/* <TextField
//                   fullWidth
//                   label="Minimum Level"
//                   // variant="outlined"
//                   type="number"
//                   name="minimumLevel"
//                   value={minimumLevel}
//                   onChange={onChangeValue}
//                   error={!minimumLevel && isFormSubmitted}
//                 /> */}

//                 <input
//                   type="number"
//                   placeholder="Minimum Level"
//                   name={"minimumLevel"}
//                   value={minimumLevel}
//                   onChange={onChangeValue}
//                   className="textInputStyle"
//                 />
//               </div>
//             </div>

//             <div className="col-md-4">
//               <div style={styles.inputContainer}>
//                 {/* <TextField
//                   fullWidth
//                   id="maximumLevel"
//                   label="Maximum Level"
//                   // variant="outlined"
//                   name="maximumLevel"
//                   value={maximumLevel}
//                   type="number"
//                   onChange={onChangeValue}
//                   error={!maximumLevel && isFormSubmitted}
//                 /> */}
//                 <input
//                   type="number"
//                   placeholder="Maximum Level"
//                   name={"maximumLevel"}
//                   value={maximumLevel}
//                   onChange={onChangeValue}
//                   className="textInputStyle"
//                 />
//               </div>
//             </div>

//             <div className="col-md-4">
//               <div style={styles.inputContainer}>
//                 {/* <TextField
//                   fullWidth
//                   id="reorderLevel"
//                   label="Reorder Level"
//                   // variant="outlined"
//                   name="reorderLevel"
//                   type="number"
//                   value={reorderLevel}
//                   onChange={onChangeValue}
//                   error={!reorderLevel && isFormSubmitted}
//                 /> */}

//                 <input
//                   type="number"
//                   placeholder="Reorder Level"
//                   name={"reorderLevel"}
//                   value={reorderLevel}
//                   onChange={onChangeValue}
//                   className="textInputStyle"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-md-4">
//               <div style={styles.inputContainerForDropDown}>
//                 <InputLabel id="buHead-label">Class</InputLabel>
//                 <Select
//                   fullWidth
//                   id="cls"
//                   name="cls"
//                   value={cls}
//                   onChange={onChangeValue}
//                   label="Class"
//                   error={!cls && isFormSubmitted}
//                 >
//                   <MenuItem value="">
//                     <em>None</em>
//                   </MenuItem>
//                   {mainClasses &&
//                     mainClasses.map((val) => {
//                       return (
//                         <MenuItem key={val.key} value={val.key}>
//                           {val.value}
//                         </MenuItem>
//                       );
//                     })}
//                 </Select>
//               </div>
//             </div>

//             <div className="col-md-4">
//               <div style={styles.inputContainerForDropDown}>
//                 <InputLabel id="buName-label">Sub Class</InputLabel>
//                 <Select
//                   fullWidth
//                   id="subClass"
//                   name="subClass"
//                   value={subClass}
//                   onChange={onChangeValue}
//                   label="Sub Class"
//                   error={!subClass && isFormSubmitted}
//                 >
//                   <MenuItem value="">
//                     <em>None</em>
//                   </MenuItem>
//                   {subClasses &&
//                     subClasses.map((val) => {
//                       if (val.parent === cls)
//                         return (
//                           <MenuItem key={val.key} value={val.key}>
//                             {val.value}
//                           </MenuItem>
//                         );
//                     })}
//                 </Select>
//               </div>
//             </div>

//             <div className="col-md-4">
//               <div style={styles.inputContainerForDropDown}>
//                 <InputLabel id="buName-label">Grand Sub Class</InputLabel>
//                 <Select
//                   fullWidth
//                   id="grandSubClass"
//                   name="grandSubClass"
//                   value={grandSubClass}
//                   onChange={onChangeValue}
//                   label="Grand Sub Class"
//                   error={!grandSubClass && isFormSubmitted}
//                 >
//                   <MenuItem value="">
//                     <em>None</em>
//                   </MenuItem>
//                   {childSubClass &&
//                     childSubClass.map((val) => {
//                       if (val.parent === subClass)
//                         return (
//                           <MenuItem key={val.key} value={val.key}>
//                             {val.value}
//                           </MenuItem>
//                         );
//                     })}
//                 </Select>
//               </div>
//             </div>
//           </div>
//           <div className="row">
//             {(grandSubClass == "me_medicines" ||
//               grandSubClass == "cm_contrast" ||
//               grandSubClass == "mri_contrast") && (
//               <>
//                 <div className="col-md-4">
//                   <div style={styles.inputContainer}>
//                     {/* <TextField
//                       fullWidth
//                       id="scientificName"
//                       label="Scientific Name"
//                       name="scientificName"
//                       value={scientificName}
//                       onChange={onChangeValue}
//                     /> */}
//                     <input
//                       type="text"
//                       placeholder="Scientific Name"
//                       name={"scientificName"}
//                       value={scientificName}
//                       onChange={onChangeValue}
//                       className="textInputStyle"
//                     />
//                   </div>
//                 </div>
//                 <div className="col-md-4">
//                   <div style={styles.inputContainer}>
//                     {/* <TextField
//                       fullWidth
//                       id="tradeName"
//                       label="Trade Name"
//                       name="tradeName"
//                       value={tradeName}
//                       onChange={onChangeValue}
//                     /> */}

//                     <input
//                       type="text"
//                       placeholder="tradeName"
//                       name={"tradeName"}
//                       value={tradeName}
//                       onChange={onChangeValue}
//                       className="textInputStyle"
//                     />
//                   </div>
//                 </div>
//               </>
//             )}
//             {(subClass == "radiology_medicine" ||
//               grandSubClass == "me_medicines" ||
//               subClass == "laboratory_supplies" ||
//               (subClass == "medical_supplies" &&
//                 grandSubClass != "os_orthopedic")) && (
//               <>
//                 <div className="col-md-4">
//                   <div style={styles.inputContainer}>
//                     {/* <TextField
//                       fullWidth
//                       id="temperature"
//                       type="number"
//                       label="Temperature"
//                       name="temperature"
//                       value={temperature}
//                       onChange={onChangeValue}
//                     /> */}

//                     <input
//                       type="number"
//                       placeholder="Temperature"
//                       name={"temperature"}
//                       value={temperature}
//                       onChange={onChangeValue}
//                       className="textInputStyle"
//                     />
//                   </div>
//                 </div>
//               </>
//             )}
//             {(grandSubClass == "fs_food_supplies" ||
//               grandSubClass == "hs_house_keeping" ||
//               subClass == "radiology_medicine" ||
//               grandSubClass == "me_medicines" ||
//               subClass == "laboratory_supplies" ||
//               (subClass == "medical_supplies" &&
//                 grandSubClass != "os_orthopedic")) && (
//               <>
//                 <div className="col-md-4">
//                   <div style={styles.inputContainer}>
//                     {/* <TextField
//                       fullWidth
//                       id="humidity"
//                       type="number"
//                       label="Humidity"
//                       name="humidity"
//                       value={humidity}
//                       onChange={onChangeValue}
//                     /> */}
//                     <input
//                       type="number"
//                       placeholder="Humidity"
//                       name={"humidity"}
//                       value={humidity}
//                       onChange={onChangeValue}
//                       className="textInputStyle"
//                     />
//                   </div>
//                 </div>
//               </>
//             )}
//             {grandSubClass == "me_medicines" && (
//               <>
//                 <div className="col-md-4">
//                   <div style={styles.inputContainerForDropDown}>
//                     <InputLabel id="issueUnit-label">
//                       Light Sensitive
//                     </InputLabel>
//                     <Select
//                       fullWidth
//                       labelId="receiptUnit-label"
//                       id="lightSensitive"
//                       name="lightSensitive"
//                       value={lightSensitive}
//                       onChange={onChangeValue}
//                     >
//                       <MenuItem value="">
//                         <em>None</em>
//                       </MenuItem>
//                       {con.map((val) => {
//                         return (
//                           <MenuItem key={val.key} value={val.key}>
//                             {val.value}
//                           </MenuItem>
//                         );
//                       })}
//                     </Select>
//                   </div>
//                 </div>
//               </>
//             )}
//             {(grandSubClass == "ms_medical" ||
//               grandSubClass == "mei_medical" ||
//               grandSubClass == "cs_cardiac") && (
//               <>
//                 <div className="col-md-4">
//                   <div style={styles.inputContainerForDropDown}>
//                     <InputLabel id="issueUnit-label">Reusable</InputLabel>
//                     <Select
//                       fullWidth
//                       labelId="receiptUnit-label"
//                       id="resuableItem"
//                       name="resuableItem"
//                       value={resuableItem}
//                       onChange={onChangeValue}
//                     >
//                       <MenuItem value="">
//                         <em>None</em>
//                       </MenuItem>
//                       {con.map((val) => {
//                         return (
//                           <MenuItem key={val.key} value={val.key}>
//                             {val.value}
//                           </MenuItem>
//                         );
//                       })}
//                     </Select>
//                   </div>
//                 </div>
//               </>
//             )}
//             {(subClass == "food_beverage" ||
//               subClass == "laboratory_supplies" ||
//               subClass == "radiology_medicine" ||
//               grandSubClass == "housekeeping_supplies" ||
//               grandSubClass == "of_office" ||
//               grandSubClass == "mei_medical" ||
//               grandSubClass == "cs_cardiac" ||
//               (subClass == "medical_supplies" &&
//                 grandSubClass != "mei_medical")) && (
//               <>
//                 <div className="col-md-4">
//                   <div style={styles.inputContainer}>
//                     <InputLabel id="expiration-label">Expiration</InputLabel>
//                     <MuiPickersUtilsProvider
//                       className="input"
//                       utils={DateFnsUtils}
//                     >
//                       <DateTimePicker
//                         inputVariant="outlined"
//                         onChange={(val) => onChangeDate(val, "expiration")}
//                         fullWidth
//                         value={
//                           comingFor === "add"
//                             ? expiration
//                               ? expiration
//                               : new Date()
//                             : expiration
//                         }
//                       />
//                     </MuiPickersUtilsProvider>
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//           <div className="row">
//             <div className="col-md-12">
//               <div style={styles.inputContainer}>
//                 {/* <TextField
//                   fullWidth
//                   id="comments"
//                   label="Comments"
//                   name="comments"
//                   value={comments}
//                   multiline
//                   rows={3}
//                   onChange={onChangeValue}
//                 /> */}
//                 <textarea
//                   type="text"
//                   placeholder="Comments"
//                   name={"comments"}
//                   rows={3}
//                   value={comments}
//                   onChange={onChangeValue}
//                   className="textInputStyle"
//                 />
//               </div>
//             </div>
//           </div>
//           <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
//             {/* <div style={styles.buttonContainer}>
//             <Button onClick={handleCancel} variant="contained">
//               Cancel
//             </Button>
//           </div> */}

//             <div
//               style={{
//                 display: "flex",
//                 flex: 1,
//                 height: 50,
//                 justifyContent: "center",
//                 marginTop: "2%",
//                 marginBottom: "2%",
//               }}
//             >
//               {comingFor === "AddItems" ? (
//                 <Button
//                   style={{ width: "60%" }}
//                   disabled={!validateForm()}
//                   onClick={handleAdd}
//                   variant="contained"
//                   color="primary"
//                 >
//                   Add Item
//                 </Button>
//               ) : (
//                 <Button
//                   style={{ width: "60%" }}
//                   disabled={!validateForm()}
//                   onClick={handleEdit}
//                   variant="contained"
//                   color="primary"
//                 >
//                   Edit Item
//                 </Button>
//               )}
//             </div>
//           </div>
//           <Notification msg={msg} open={tr} />
//           <div style={{ marginBottom: 20 }}>
//             <img
//               onClick={() => props.history.goBack()}
//               src={Back_Arrow}
//               style={{ width: 60, height: 40, cursor: "pointer" }}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddItems;
