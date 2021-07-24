import React from 'react';
import OrderCard from './OrderCard';
import { Droppable } from 'react-beautiful-dnd';
import { Typography } from '@material-ui/core';

const kitchenOrderList = ({ title, cards, listID }) => {
  return (
    <Droppable droppableId={String(listID)}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{
            backgroundColor: '#F7C830',
            borderRadius: 3,
            padding: 8,
            width: 300,
            marginRight: 8,
            height: '100%',
          }}
        >
          <Typography
            style={{
              fontWeight: 900,
              marginBottom: 10,
              marginLeft: 5,
              fontSize: 20,
            }}
          >
            {title}
          </Typography>
          {cards.map((card, index) => (
            <OrderCard
              key={card.id}
              index={index}
              text={card.name}
              quantity={card.quantity}
              orderType={card.orderType}
              id={card.id}
            ></OrderCard>
          ))}
          {provided.placeholder}
          {/* <OrderButton listID={listID} /> ตรงนี้คือส่วนของการเพิ่มข้อมูล */}
        </div>
      )}
    </Droppable>
  );
};
export default kitchenOrderList;
