import React, {
  Component,
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
} from 'react';
import OrderList from './kitchenOrder/OrderList';
import { connect } from 'react-redux';
import Navbar from './navbar2';
import socket from '../util/socket-io';
import { DragDropContext } from 'react-beautiful-dnd';
import { Dialog, DialogActions, DialogContent } from '@material-ui/core';

import useDialog from '../hooks/useDialog';
const KitchenOrderDialog = (props, ref) => {
  const [open, openDialog, closeDialog] = useDialog();

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
      props.socketRef
    );
  };

  const onCloseDialog = () => {
    closeDialog();
  };

  useImperativeHandle(ref, () => ({
    openDialog: () => {
      return openDialog();
    },
    closeDialog: () => closeDialog(),
  }));

  return (
    <Dialog open={open} onClose={onCloseDialog}>
      <DialogContent>
        <DragDropContext onDragEnd={onDragEnd}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: '60px',
              justifyContent: 'center',
            }}
          >
            {props.lists.map((list, idx) => {
              if (idx >= 2)
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
        </DragDropContext>
      </DialogContent>
    </Dialog>
  );
};

export default React.forwardRef(KitchenOrderDialog);
