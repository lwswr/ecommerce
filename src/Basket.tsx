import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AppState, BasketItem } from "./App";
import { removeItemFromBasket } from "./appSlice";
import { BasketItemComp } from "./BasketItemComp";

const BasketColumn = styled.div`
  width: 21%;
  z-index: 9;
`;

const BasketItemsWindow = styled.div`
  background: rgb(240, 239, 239);
  margin: 30px 35px 20px 20px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  padding: 0.5rem 0.5rem 0.1rem 0.5rem;
`;

const Total = styled.div`
  background: white;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;

const calculateTotal = (array: BasketItem[]) => {
  let total = 0;
  for (let i = 0; i < array.length; i++) {
    total = array[i].storeItem.price * array[i].quantity + total;
  }
  return total.toFixed(2);
};

export const Basket = ({ basketItems }: { basketItems: BasketItem[] }) => {
  const { toggleBasket } = useSelector(selectState);
  const dispatch = useDispatch();

  return (
    <BasketColumn>
      {toggleBasket ? (
        <BasketItemsWindow>
          {basketItems.map((basketItem) => {
            return (
              <BasketItemComp
                key={basketItem.storeItem.id}
                basketItem={basketItem}
                onDelete={(_id) => dispatch(removeItemFromBasket({ id: _id }))}
              />
            );
          })}
          <Total>Total - £{calculateTotal(basketItems)}</Total>
        </BasketItemsWindow>
      ) : null}
    </BasketColumn>
  );
};

const selectState = ({ state }: { state: AppState }) => state;
