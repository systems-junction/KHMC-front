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
    tabs,
    tableData,
  } = dropdownItems;
  console.log( '*tabs: ', tabs )
  const [ ddModel, setDDModel ] = useState(
    dropdownModel( "rcmDropdownId", "RCM", rcmDropdownItems, rcmDropdownItems[ 0 ] )
  );
  const [ tabsModel, setTabsModel ] = useState(
    generateTabsModel( "rcmTabsId", 0, tabs )
  );
  const [ gridData, setGridData ] = useState( tableData );
  const [ tableModel, setTableModel ] = useState( {} );
  const [ selectedTab, setSelectedTab ] = useState( 0 );
  const [ currentMainTabSelected, setCurrentMainSelected ] = useState();
  const [ tableFilteredData, setTableFilteredData ] = useState( [] );

  const handleTableData = ( selectedTabIndex, model, data, mainTabSelected = true ) =>
  {
    let tableModel;
    // To toggle selected tab value if main tab is selected
    const mappedTableData = mainTabSelected && gridData.map( ( t, i ) =>
      t[ tabs[ selectedTabIndex ] ]
        ? {
          [ tabs[ selectedTabIndex ] ]: {
            ...t[ tabs[ selectedTabIndex ] ],
            selected: true,
          },
        }
        : { [ tabs[ i ] ]: { ...t[ tabs[ i ] ], selected: false } }
    );
    // To set new mapped data if main tab is selected
    mainTabSelected && setGridData( mappedTableData );
    const filteredSelectedTabTableData = mainTabSelected && mappedTableData
      .map( ( d ) => d[ tabs[ selectedTabIndex ] ] && d[ tabs[ selectedTabIndex ] ] )
      .filter( ( d ) => d && d.selected && d );
    mainTabSelected && setCurrentMainSelected( filteredSelectedTabTableData );
    // To get current Main tab selected
    const filteredData = mainTabSelected ? filteredSelectedTabTableData : currentMainTabSelected;
    // For main tab data filteration
    tableModel = toGetFilteredDataTabelModel( filteredData, model, data, mainTabSelected, selectedTabIndex );
    setTableModel( tableModel );
  };

  const toGetFilteredDataTabelModel = ( filteredData, model, data, mainTabSelected, selectedTabIndex ) =>
  {
    let tableModel;
    if ( !filteredData.some( ( d ) => d.innerTabs ) )
    {
      tableModel = getTabData( filteredData, model, data, mainTabSelected, selectedTabIndex );
    }
    return tableModel;
  }

  const getTabData = ( filteredData, model, data, mainTabSelected, selectedTabIndex ) =>
  {
    const { heading, actions, tableDataKeys } = filteredData[ 0 ];
    toSetTabsModel( model, mainTabSelected, [], null );
    return getTableData( data, heading, tableDataKeys, actions, true );
  };

  const getTableData = ( data, heading, tableDataKeys, actions, selected ) =>
  {
    return generateTableModel( data, heading, tableDataKeys, actions, selected );
  };

  const handleTabsModel = ( index, model, mainTabSelected ) =>
  {
    // toSetTabsModel( model, mainTabSelected, innerTabs );
    handleTableData( index, model, tableFilteredData, mainTabSelected );
  };

  const toSetTabsModel = ( model, mainTabSelected, innerTabs, innerValue ) =>
  {
    const modifiedModel = {
      ...model,
      innerTabs: innerTabs,
      innerValue: innerValue,
      mainTabSelected: mainTabSelected,
    };
    setTabsModel( modifiedModel );
  }

  useEffect( () =>
  {
    const handleData = async () =>
    {
      console.log( 'in useEffect' )
      const filteredData = await getPatientsInfoData();
      console.log( "**filteredData: ", filteredData );
      setTableFilteredData( filteredData );
      handleTableData( selectedTab, tabsModel, filteredData );
    }
    handleData();
  }, [ selectedTab ] );

  return (
    <div>
      { tableModel && Object.entries( tableModel ).length && (
        <Blockchain
          dropdownModel={ ddModel }
          setDropdownModel={ setDDModel }
          tabsModel={ tabsModel }
          setTabsModel={ ( index, model, mainTabSelected ) =>
            handleTabsModel( index, model, mainTabSelected ) }
          tableModel={ tableModel }
          handleViewData={ tableFilteredData }
        />
      ) }
    </div>
  );
}
