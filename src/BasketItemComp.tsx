import * as React from "react";
import { BasketItem } from "./appSlice";
import styled from "styled-components";

const Item = styled.div`
  background: white;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-space-evenly;
  padding: 0.5rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;

const QtyAndPrice = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProductInterface = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid lightgrey;
`;

const Title = styled.div`
  font-size: 1rem;
  padding: 0.5rem 0 1rem 0;
`;

const Price = styled.div`
  font-size: 1rem;
`;

const Qty = styled.div`
  margin-left: 1rem;
  color: grey;
`;

const Button = styled.button`
  background: rgb(0, 137, 216);
  border: 1px solid rgb(0, 137, 216);
  transition: 0.2s;
  color: white;
  border-radius: 5px;
  padding: 5px;
  margin-left: 10px;
  :hover {
    background: rgb(0, 90, 173);
    border: 1px solid rgb(0, 90, 173);
  }
`;

export const BasketItemComp = ({
  basketItem,
  onDelete,
}: {
  basketItem: BasketItem;
  onDelete: (id: number) => void;
}) => {
  return (
    <Item>
      <Title>{basketItem.storeItem.title}</Title>
      <ProductInterface>
        <QtyAndPrice>
          <Price>£{basketItem.storeItem.price.toFixed(2)}</Price>
          <Qty>Qty {basketItem.quantity}</Qty>
        </QtyAndPrice>
        <Button onClick={() => onDelete(basketItem.storeItem.id)}>
          Delete
        </Button>
      </ProductInterface>
    </Item>
  );
};
