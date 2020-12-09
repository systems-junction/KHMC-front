const mapDateToKeys = (val) => {
  if (
    val === "date" ||
    val === "createdAt" ||
    val === "dateGenerated" ||
    val === "updatedAt" ||
    val === "dateReceived" ||
    val === "expiryDate" ||
    (val[0] === "poId" && val[1] === "sentAt") ||
    val[1] === "expiryDate" ||
    val[1] === "expiryDatePerBatch"
  ) {
    return true;
  }
};

export default mapDateToKeys;
