import React, { useState, useEffect } from "react";
import Blockchain from "./Blockchain";
import {
  rcmDropdownItems as dropdownItems,
  dropdownModel,
  generateTableModel,
  generateTabsModel,
} from "../../../models";

export default function WMS(props) {
  const {
    rcmDropdownItems,
    tabs,
    tableData,
    tableHeading,
    tableDataKeys,
  } = dropdownItems;
  const [ddModel, setDDModel] = useState(
    dropdownModel("rcmDropdownId", "RCM", rcmDropdownItems, rcmDropdownItems[0])
  );
  const [tabsModel, setTabsModel] = useState(
    generateTabsModel("rcmTabsId", 0, tabs)
  );
  const [tableModel, setTableModel] = useState({});
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTableData = (selectedTabIndex) => {
    const defaultTableData = tableData.filter((t) => t[tabs[selectedTabIndex]]);
    console.log("defaultTableData: ", defaultTableData);
    const tableModel = generateTableModel(
      defaultTableData[0][tabs[selectedTabIndex]],
      defaultTableData[0].heading,
      defaultTableData[0].tableDataKeys,
      defaultTableData[0].actions
    );
    setTableModel(tableModel);
  };

  useEffect(() => {
    handleTableData(selectedTab);
  }, [selectedTab]);

  return (
    <div>
      {Object.entries(tableModel).length && (
        <Blockchain
          dropdownModel={ddModel}
          setDropdownModel={setDDModel}
          tabsModel={tabsModel}
          setTabsModel={setTabsModel}
          getChangedTabIndex={(index) => setSelectedTab(index)}
          tableModel={tableModel}
          // setTableModel={setTableModel}
        />
      )}
    </div>
  );
}
