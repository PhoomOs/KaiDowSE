import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';
import '../../collection/kitchen.css';

const OrderCard = ({ text, quantity, orderType, id, index }) => {
  return (
    <Draggable draggableId={String(id)} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card style={{ marginBottom: 8 }} id="card">
            <CardContent>
              <Typography gutterBottom>
                {text + ' x ' + quantity + 'โต๊ะ ' + orderType}
              </Typography>
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  );
};
export default OrderCard;
