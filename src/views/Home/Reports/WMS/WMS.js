import React, { useState, useEffect } from "react";
import Blockchain from "../Blockchain";
import Loader from "react-loader-spinner";
import
{
  wmsDropdownItems as dropdownItems,
  dropdownModel,
  generateTableModel,
  generateTabsModel,
} from "../../../../models";
import { getData } from './NetworkCall'

export default function WMS ( props )
{
  const {
    wmsDropdownItems,
    wmsTabsData: tabsData,
  } = dropdownItems;
  const [ ddModel, setDDModel ] = useState(
    dropdownModel( "wmsDropdownId", "WMS", wmsDropdownItems, wmsDropdownItems[ 0 ] )
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
    const selectedDropdownOptionIndex = wmsDropdownItems.indexOf( ddModel.selectedValue );
    const filteredHeading = tabsData[ selectedDropdownOptionIndex ].allTabData[ selectedTabIndex ].heading;
    const filteredTableDataKeys = tabsData[ selectedDropdownOptionIndex ].allTabData[ selectedTabIndex ].tableDataKeys;
    const filteredActions = tabsData[ selectedDropdownOptionIndex ].allTabData[ selectedTabIndex ].actions;
    tableModel = getTableData( data, filteredHeading, filteredTableDataKeys, filteredActions );
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
    const selectedDropdownOptionIndex = wmsDropdownItems.indexOf( ddModel.selectedValue );
    const handleData = async () =>
    {
      const filteredTabs = tabsData[ selectedDropdownOptionIndex ].tabs;
      setTabsModel( { ...tabsModel, tabs: filteredTabs, value: 0 } );
      const filteredData = await getData( tabsData[ selectedDropdownOptionIndex ].endpointURL, tabsData[ selectedDropdownOptionIndex ].name );
      setTableFilteredData( filteredData );
      handleTableData( 0, tabsModel, filteredData );
    }
    handleData();
  }, [ ddModel ] )

  return (
    <div
      style={ {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        position: "fixed",
        width: "100%",
        height: "100%",
        backgroundColor: "rgb(19 213 159)",
      } }
    >
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
      ) ) || <div
        className="row"
        style={ {
          marginTop: 25,
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        } }
      >
          <Loader
            type="TailSpin"
            color="white"
            height={ 50 }
            width={ 50 }
          />
        </div> }
    </div>
  );
}