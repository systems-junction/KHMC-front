import React, { useState, useEffect } from "react";
import Blockchain from "./Blockchain";
import {
  wmsDropdownItems as dropdownItems,
  dropdownModel,
  generateTableModel,
  generateTabsModel,
} from "../../../models";

export default function WMS(props) {
  const {
    wmsDropdownItems,
    wmsTabs: tabs,
    innerTabs,
    wmsTableData: tableData,
  } = dropdownItems;
  const [gridData, setGridData] = useState(tableData);
  const [ddModel, setDDModel] = useState(
    dropdownModel("wmsDropdownId", "WMS", wmsDropdownItems, wmsDropdownItems[0])
  );
  const [tabsModel, setTabsModel] = useState(
    generateTabsModel("wmsTabsId", 0, null, tabs, [], true)
  );
  const [tableModel, setTableModel] = useState({});
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTableData = (selectedTabIndex, model, mainTabSelected = true) => {
    console.log("tabs: ", tabs);
    console.log("tab index: ", selectedTabIndex);
    console.log(
      "selectedTabIndex: ",
      gridData.map((t, i) => t[tabs[i]])
    );
    console.log("gridData: ", gridData);
    let tableModel;
    const mappedTableData = gridData.map((t, i) =>
      t[tabs[selectedTabIndex]]
        ? {
            [tabs[selectedTabIndex]]: {
              ...t[tabs[selectedTabIndex]],
              selected: true,
            },
          }
        : { [tabs[i]]: { ...t[tabs[i]], selected: false } }
    );
    setGridData(mappedTableData);
    console.log("**mappedTableData: ", mappedTableData);
    const filteredSelectedTabTableData = mappedTableData
      .map((d) => d[tabs[selectedTabIndex]] && d[tabs[selectedTabIndex]])
      .filter((d) => d && d.selected && d);
    console.log(
      "**filteredSelectedTabTableData: ",
      filteredSelectedTabTableData
    );
    // For main tab data filteration
    if (!filteredSelectedTabTableData.some((d) => d.innerTabs)) {
      tableModel = getTabData(filteredSelectedTabTableData, selectedTabIndex);
    }
    // For inner tab data filteration
    else if (
      filteredSelectedTabTableData.some((d) => d.innerTabs) &&
      mainTabSelected
    ) {
      const getInnerTabs = filteredSelectedTabTableData[0].innerTabs;
      if (mainTabSelected) {
        tableModel = getInnerTabData(getInnerTabs, 0, model);
      } else if (!mainTabSelected) {
        tableModel = getInnerTabData(getInnerTabs, selectedTabIndex, model);
      }
    }
    console.log("tableModel: ", tableModel);
    setTableModel(tableModel);
  };

  const getTabData = (filteredData, selectedTabIndex) => {
    console.log("filteredData: ", filteredData);
    const { data, heading, actions, tableDataKeys } = filteredData[0];
    return getTableData(data, heading, tableDataKeys, actions, true);
  };

  const getInnerTabData = (getInnerTabs, innerIndex, model) => {
    console.log("*getInnerTabs: ", getInnerTabs);
    const tabData = getInnerTabs.filter((t) => t[innerTabs[innerIndex]])[0][
      innerTabs[innerIndex]
    ];
    console.log("*tabData: ", tabData);
    const { data, heading, tableDataKeys, actions } = tabData;
    setTabsModel({
      ...model,
      innerValue: innerIndex,
      mainTabSelected: false,
    });
    return getTableData(data, heading, tableDataKeys, actions);
  };

  const getTableData = (data, heading, tableDataKeys, actions, selected) => {
    return generateTableModel(data, heading, tableDataKeys, actions, selected);
  };

  const handleTabsModel = (index, model, mainTabSelected) => {
    const modifiedModel = {
      ...model,
      innerTabs: innerTabs,
      mainTabSelected: mainTabSelected,
    };
    setTabsModel(modifiedModel);
    handleTableData(index, model, mainTabSelected);
  };

  useEffect(() => {
    handleTableData(selectedTab);
  }, [selectedTab]);

  return (
    <div>
      {tableModel && Object.entries(tableModel).length && (
        <Blockchain
          dropdownModel={ddModel}
          setDropdownModel={setDDModel}
          tabsModel={tabsModel}
          setTabsModel={(index, model, mainTabSelected) =>
            handleTabsModel(index, model, mainTabSelected)
          }
          getChangedTabIndex={(index, mainTabSelected) => console.log("fazool")}
          tableModel={tableModel}
        />
      )}
    </div>
  );
}
