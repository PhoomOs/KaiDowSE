import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Tabs, Tab, Grid } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import { PostAdd } from '@material-ui/icons';

import {
  GridListTile,
  GridList,
  Card,
  GridListTileBar,
} from '@material-ui/core';

import { connect, useDispatch } from 'react-redux';
import {
  addMenuItem,
  addMenuType,
  deleteMenuItem,
  deleteMenuType,
  getAllMenuItems,
  updateMenuItem,
  updateMenuType,
} from '../redux/action/menuAction';

import DialogAddMenu from './DialogAddMenu';
import DialogAddMenuType from './DialogAddMenuType';
import { v4 as uuidv4 } from 'uuid';
import NavbarAfterLogin from '../components/navbar2';
import DialogEditMenu from './DialogEditMenu';
import DialogDelType from './DialogDelType';
import { validateAddMenuType } from '../util/validation';
import { doSomething, falseDialog } from '../redux/action/uiAction';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '600',
    marginTop: '64px',
    display: 'flex',
    justifyContent: 'center',
  },
}));

const MenuNav = (props) => {
  const classes = useStyles();
  const [data, setData] = useState({
    menuTypes: [],
    menuItems: [],
  });
  const DialogDelTypeRef = useRef();
  const [tabs, setAddTab] = useState([<Tab />]);
  const [tabId, setTabId] = useState('ALL');

  const [tabsContent, setTabsContent] = useState([]);
  const dialogAddMenuTypeRef = useRef();
  const dialogEditMenuItemRef = useRef();
  const dialogAddMenuItemRef = useRef();
  const [stateEditDialog, setStateEditDialog] = useState([]);

  const [nameEdit, setNameEdit] = useState([]);
  const [priceEdit, setPriceEdit] = useState([]);
  const [typee, setTypee] = useState('');

  const [tabIdForDelete, setTabIdForDelete] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {};
  }, []);

  useEffect(() => {
    setData({
      menuTypes: props.menu.menuTypes,
      menuItems: props.menu.menuItems,
    });
  }, [props.menu]);

  useEffect(() => {
    if (tabId === 'ALL') {
      setTabsContent([]);
      data.menuItems.map((el) => setTabsContent((old) => [...old, el]));
    } else {
      setTabsContent([]);
      data.menuItems.map((el) => {
        if (el.menuType === tabId) {
          setTabsContent((old) => [...old, el]);
        }
      });
    }
    setAddTab([
      data.menuTypes !== undefined
        ? data.menuTypes.map((el) => (
            <Tab label={el.typeName} key={el.typeId} value={el.typeId} />
          ))
        : [],
    ]);
  }, [data, tabId]);

  const handleTabChange = useCallback(
    (event, newTabId) => {
      event.preventDefault();
      if (newTabId === 'addTab') {
        //********************************************************* */
        dialogAddMenuTypeRef.current.openDialog();
      } else {
        if (newTabId) setTabId(newTabId);
      }
    },
    [tabId]
  );

  const handleAddTab = () => {
    let typeName = dialogAddMenuTypeRef.current.getState();
    let isToggled = dialogAddMenuTypeRef.current.getTopping();
    const x = uuidv4();
    let obj = {
      typeName: typeName,
      typeId: x,
      isTopping: isToggled,
    };

    setData({
      ...data,
      menuTypes: [...data.menuTypes, obj],
    });

    //////gen typeID/////

    /////add Menu type to store(REDUX)////
    dialogAddMenuTypeRef.current.resetState();
    props.addMenuType(obj);
    dialogAddMenuTypeRef.current.closeDialog();
  };

  const handleEditMenu = (event) => {
    const dataForEdit2 = tabsContent.filter(
      (el) => el.menuId === event.target.id
    )[0];

    return (
      dataForEdit2.menuPrice !== undefined
        ? dataForEdit2.menuPrice.map((el) => {
            setNameEdit((qwe) => [...qwe, el.detail]);
            setPriceEdit((oldArray) => [...oldArray, el.price]);
          })
        : [],
      data.menuTypes !== undefined
        ? data.menuTypes.map((el) => {
            if (el.typeId === dataForEdit2.menuType) {
              setTypee(el.typeName);
            }
          })
        : [],
      setStateEditDialog(dataForEdit2),
      dialogEditMenuItemRef.current.openDialogEdit()
    );
  };

  const handleRemove = () => {
    setNameEdit([]);
    setPriceEdit([]);
    dialogEditMenuItemRef.current.getState();
    dialogEditMenuItemRef.current.closeDialogEdit();
  };
  return (
    <div>
      <DialogEditMenu
        ref={dialogEditMenuItemRef}
        dataEdit={stateEditDialog}
        dataType={data.menuTypes}
        detail={nameEdit}
        price={priceEdit}
        handleRe={handleRemove}
        typeName={typee}
        deleteMenu={deleteMenuItem}
      />
      {tabId !== 'ALL' ? (
        <DialogDelType
          ref={DialogDelTypeRef}
          tabId={tabId}
          actionDelete={props.deleteMenuType}
        />
      ) : (
        <Grid />
      )}
      <DialogAddMenu data={data} ref={dialogAddMenuItemRef} />
      <Grid container class={classes.root}>
        <Grid item sm={8}>
          <Card>
            <Tabs
              value={tabId}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="ALL" value="ALL" />
              {tabs.map((child) => child)}

              <Tab icon={<PostAdd />} value="addTab" />
              <DialogAddMenuType
                ref={dialogAddMenuTypeRef}
                onSuccess={handleAddTab}
              />
            </Tabs>
          </Card>

          <Card style={{ marginTop: 20 }}>
            <GridList
              cellHeight={120}
              cols={4}
              spacing={45}
              style={{
                width: 900,
                margin: '20px 15px 20px 25px',
              }}
            >
              {tabsContent.map((child) => (
                <GridListTile
                  key={child}
                  style={{
                    marginTop: 5,
                    width: '25%',
                    cursor: 'pointer',
                  }}
                >
                  <img
                    src={child.menuImg}
                    id={child.menuId}
                    onClick={handleEditMenu}
                  />

                  <GridListTileBar
                    title={child.menuName}
                    style={{ height: '25px' }}
                  />
                </GridListTile>
              ))}
            </GridList>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  menu: state.menu,
  UI: state.UI,
});

const mapActionsToProps = {
  addMenuItem,
  addMenuType,
  deleteMenuItem,
  deleteMenuType,
  getAllMenuItems,
  updateMenuItem,
  updateMenuType,
};

export default connect(mapStateToProps, mapActionsToProps)(MenuNav);
