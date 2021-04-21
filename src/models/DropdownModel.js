export const dropdownModel = (id, label, items, selectedValue) => {
  return {
    id: id,
    label: label,
    items: items,
    selectedValue: selectedValue,
  };
};

export default dropdownModel;
