import React, { Component, useEffect, useState, useRef } from 'react';
import OrderList from '../components/kitchenOrder/OrderList';
import { connect } from 'react-redux';

import socket from '../util/socket-io';
import { DragDropContext } from 'react-beautiful-dnd';
import {
  sortKitchen,
  setKitchenData,
  kitchenChange,
} from '../redux/action/kitchenAction';
import { orderChange, orderMenuChange } from '../redux/action/orderAction';
const KitchenManage = (props) => {
  // const socketRef = useRef();
  const onDragEnd = (result) => {
    const { destination, source, draggebleId } = result;
    if (!destination) {
      return;
    }
    props.sortKitchen(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggebleId,
      props.socket
    );
  };
  // useEffect(() => {
  //   socketRef.current = new socket();
  //   return () => {
  //     console.log('unmount orderList');
  //     socketRef.current.unListeningKitchen();
  //   };
  // }, []);

  // useEffect(() => {
  //   // console.log('store = ', props.user.store);
  //   if (props.user.store !== undefined) {
  //     // console.log('setDetail');
  //     socketRef.current.setDetail(
  //       props.user.store,
  //       props.kitchenChange,
  //       props.orderChange,
  //       props.orderMenuChange
  //     );
  //     socketRef.current.listeningKitchen();
  //   }
  // }, [props.user.store]);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: '60px',
            justifyContent: 'center',
          }}
        >
          {props.lists.map((list, idx) => {
            if (idx < 3)
              return (
                <OrderList
                  listID={list.id}
                  key={list.id}
                  title={list.title}
                  cards={list.cards}
                />
              );
          })}
        </div>
      </div>
    </DragDropContext>
  );
};

const mapStateToProps = (state) => ({
  lists: state.kitchen,
  user: state.user,
});

const mapActionsToProps = {
  sortKitchen,
  kitchenChange,
  setKitchenData,
  orderChange,
  orderMenuChange,
};
export default connect(mapStateToProps, mapActionsToProps)(KitchenManage);
