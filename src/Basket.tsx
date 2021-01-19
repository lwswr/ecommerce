import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { BasketItem, removeItemFromBasket } from "./appSlice";
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

const Block = styled.div`
  background: white;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;

const calculateTotal = (arr: BasketItem[]) => {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total = arr[i].storeItem.price * arr[i].quantity + total;
  }
  return total.toFixed(2);
};

export const Basket = ({ basketItems }: { basketItems: BasketItem[] }) => {
  const toggleBasketView = useSelector(selectToggle);
  const dispatch = useDispatch();

  return (
    <BasketColumn>
      {toggleBasketView ? (
        <BasketItemsWindow>
          {basketItems.length > 0 ? (
            <div>
              {basketItems.map((basketItem) => {
                return (
                  <BasketItemComp
                    key={basketItem.storeItem.id}
                    basketItem={basketItem}
                    onDelete={(_id) =>
                      dispatch(removeItemFromBasket({ id: _id }))
                    }
                  />
                );
              })}
            </div>
          ) : (
            <Block>There are no items in the basket</Block>
          )}
          <Block>Total - £{calculateTotal(basketItems)}</Block>
        </BasketItemsWindow>
      ) : null}
    </BasketColumn>
  );
};

const selectToggle = (toggleBasket: { toggleBasket: boolean }) => toggleBasket;
