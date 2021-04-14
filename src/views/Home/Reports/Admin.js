import React, { useState, useEffect } from "react";
import Blockchain from "./Blockchain";
import
{
  wmsDropdownItems as dropdownItems,
  dropdownModel,
  generateTableModel,
  generateTabsModel,
} from "../../../models";

export default function Admin ( props )
{
  const {
    wmsDropdownItems,
    wmsTabs: tabs,
    innerTabs,
    wmsTableData: tableData,
  } = dropdownItems;
  const [ gridData, setGridData ] = useState( tableData );
  const [ ddModel, setDDModel ] = useState(
    dropdownModel( "wmsDropdownId", "WMS", wmsDropdownItems, wmsDropdownItems[ 0 ] )
  );
  const [ tabsModel, setTabsModel ] = useState(
    generateTabsModel( "wmsTabsId", 0, tabs, null, [], true )
  );
  const [ tableModel, setTableModel ] = useState( {} );
  const [ selectedTab, setSelectedTab ] = useState( 0 );
  const [ currentMainTabSelected, setCurrentMainSelected ] = useState();

  const handleTableData = ( selectedTabIndex, model, mainTabSelected = true ) =>
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
    tableModel = toGetFilteredDataTabelModel( filteredData, model, mainTabSelected, selectedTabIndex );
    setTableModel( tableModel );
  };

  const toGetFilteredDataTabelModel = ( filteredData, model, mainTabSelected, selectedTabIndex ) =>
  {
    let tableModel;
    if ( !filteredData.some( ( d ) => d.innerTabs ) )
    {
      tableModel = getTabData( filteredData, model, mainTabSelected, selectedTabIndex );
    }
    // For inner tab data filteration
    else if (
      filteredData.some( ( d ) => d.innerTabs ) )
    {
      const getInnerTabs = filteredData[ 0 ].innerTabs;
      if ( mainTabSelected )
      {
        toSetTabsModel( model, mainTabSelected, innerTabs, 0 );
        tableModel = getInnerTabData( getInnerTabs, 0, model );
      } else if ( !mainTabSelected )
      {
        toSetTabsModel( model, false, innerTabs, selectedTabIndex );
        tableModel = getInnerTabData( getInnerTabs, selectedTabIndex, model );
      }
    }
    return tableModel;
  }

  const getTabData = ( filteredData, model, mainTabSelected, selectedTabIndex ) =>
  {
    const { data, heading, actions, tableDataKeys } = filteredData[ 0 ];
    toSetTabsModel( model, mainTabSelected, [], null );
    return getTableData( data, heading, tableDataKeys, actions, true );
  };

  const getInnerTabData = ( getInnerTabs, innerIndex, model ) =>
  {
    const tabData = getInnerTabs.filter( ( t ) => t[ innerTabs[ innerIndex ] ] )[ 0 ][
      innerTabs[ innerIndex ]
    ];
    const { data, heading, tableDataKeys, actions } = tabData;
    return getTableData( data, heading, tableDataKeys, actions );
  };

  const getTableData = ( data, heading, tableDataKeys, actions, selected ) =>
  {
    return generateTableModel( data, heading, tableDataKeys, actions, selected );
  };

  const handleTabsModel = ( index, model, mainTabSelected ) =>
  {
    handleTableData( index, model, mainTabSelected );
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
    handleTableData( selectedTab, tabsModel );
  }, [ selectedTab ] );

  return (
    <div>
      {tableModel && Object.entries( tableModel ).length && (
        <Blockchain
          dropdownModel={ ddModel }
          setDropdownModel={ setDDModel }
          tabsModel={ tabsModel }
          setTabsModel={ ( index, model, mainTabSelected ) =>
            handleTabsModel( index, model, mainTabSelected )
          }
          tableModel={ tableModel }
        />
      ) }
    </div>
  );
}
