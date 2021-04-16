import React, { useState, useEffect } from "react";
import Blockchain from "./Blockchain";
import
{
  rcmDropdownItems as dropdownItems,
  dropdownModel,
  generateTableModel,
  generateTabsModel,
} from "../../../models";
import { getPatientsInfoData } from './NetworkCall'

export default function RCM ( props )
{
  const {
    rcmDropdownItems,
    tabsData,
  } = dropdownItems;
  const [ ddModel, setDDModel ] = useState(
    dropdownModel( "rcmDropdownId", "RCM", rcmDropdownItems, rcmDropdownItems[ 0 ] )
  );
  const [ tabsModel, setTabsModel ] = useState(
    generateTabsModel( "rcmTabsId", 0, tabsData[ 0 ].tabs )
  );
  const defaultTabs = tabsData[ 0 ].tabs;
  const [ gridData, setGridData ] = useState( tabsData );
  const [ tableModel, setTableModel ] = useState( {} );
  const [ selectedTab, setSelectedTab ] = useState( 0 );
  const [ currentMainTabSelected, setCurrentMainSelected ] = useState();
  const [ tableFilteredData, setTableFilteredData ] = useState( [] );

  const handleTableData = ( selectedTabIndex, model, data, mainTabSelected = true ) =>
  {
    let tableModel;
    // To toggle selected tab value if main tab is selected
    console.log( "ddModel.selectedValue: ", ddModel.selectedValue );
    console.log( '*&selectedTabIndex: ', selectedTabIndex );
    const selectedDropdownOptionIndex = rcmDropdownItems.indexOf( ddModel.selectedValue );
    const filteredHeading = tabsData[ selectedDropdownOptionIndex ].allTabData[ selectedTabIndex ].heading;
    const filteredTableDataKeys = tabsData[ selectedDropdownOptionIndex ].allTabData[ selectedTabIndex ].tableDataKeys;
    const filteredActions = tabsData[ selectedDropdownOptionIndex ].allTabData[ selectedTabIndex ].actions;
    console.log( 'Filtered Content: ', filteredHeading, filteredTableDataKeys, filteredActions );
    tableModel = getTableData( data, filteredHeading, filteredTableDataKeys, filteredActions );
    console.log( "tableModel: ", tableModel );
    setTableModel( tableModel );
  };

  const getTableData = ( data, heading, tableDataKeys, actions ) =>
  {
    return generateTableModel( data, heading, tableDataKeys, actions );
  };

  const handleTabsModel = ( index, model, mainTabSelected ) =>
  {
    setTabsModel( model );
    handleTableData( index, model, tableFilteredData, mainTabSelected );
  };

  useEffect( () =>
  {
    const selectedDropdownOptionIndex = rcmDropdownItems.indexOf( ddModel.selectedValue );
    console.log( "ddModel: ", ddModel );
    console.log( "selectedDropdownOptionIndex: ", selectedDropdownOptionIndex );
    console.log( "useEffect endpointURL: ", tabsData[ selectedDropdownOptionIndex ].endpointURL );
    const handleData = async () =>
    {
      const filteredTabs = tabsData[ selectedDropdownOptionIndex ].tabs;
      console.log( "filteredTabs: ", filteredTabs );
      setTabsModel( { ...tabsModel, tabs: filteredTabs, value: 0 } );
      console.log( "tabsData[ selectedDropdownOptionIndex ]: ", tabsData[ selectedDropdownOptionIndex ].name );
      const filteredData = await getPatientsInfoData( tabsData[ selectedDropdownOptionIndex ].endpointURL, tabsData[ selectedDropdownOptionIndex ].name );
      console.log( "filteredData: ", filteredData );
      setTableFilteredData( filteredData );
      handleTableData( 0, tabsModel, filteredData );
    }
    handleData();
  }, [ ddModel ] )

  return (
    <div>
      { ( tableModel && Object.entries( tableModel ).length && (
        <Blockchain
          dropdownModel={ ddModel }
          setDropdownModel={ setDDModel }
          tabsModel={ tabsModel }
          setTabsModel={ ( index, model, mainTabSelected ) =>
            handleTabsModel( index, model, mainTabSelected ) }
          tableModel={ tableModel }
          handleViewData={ tableFilteredData }
        />
      ) ) || undefined }
    </div>
  );
}
