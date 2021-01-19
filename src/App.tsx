import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getAPIData, StoreItem } from "./API";
import {
  addItemToBasket,
  setData,
  toggleBasket,
  togglePopUp,
} from "./appSlice";
import { Basket } from "./Basket";
import { BasketNav } from "./BasketNav";
import { DetailedItem } from "./DetailedItem";
import { AddDispatch } from "./store";
import { StoreItems } from "./StoreItems";
import { SVGs } from "./SVGs";

export type BasketItem = {
  storeItem: StoreItem;
  quantity: number;
};

export type AppState = {
  storeItems: StoreItem[];
  basketItems: BasketItem[];
  toggleBasket: boolean;
  togglePopUp: boolean;
  popUpItem: StoreItem;
};

const MainContainer = styled.div`
  width: 100vw;
  height: 100%;
`;

const TopNav = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  height: 60px;
  z-index: 14;
`;

const DropDown = styled.div`
  position: fixed;
  margin-top: 4rem;
  z-index: 12;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const LoadingCon = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = styled.div`
  font-size: 75px;
  padding: 3rem;
  border-radius: 200px;
  background: rgba(0, 137, 216, 0.8);
  color: white;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 30px;
`;

function App() {
  const dispatch = useDispatch<AddDispatch>();
  const state: AppState = useSelector(selectState);

  useEffect(() => {
    async function getData() {
      try {
        const response: StoreItem[] = await getAPIData();
        dispatch(setData({ items: response }));
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [dispatch]);

  return (
    <MainContainer>
      <SVGs />
      <TopNav>
        <BasketNav
          toggle={(_toggle) => {
            dispatch(toggleBasket({ toggle: _toggle }));
          }}
        />
      </TopNav>
      {state.toggleBasket ? (
        <DropDown>
          <Basket basketItems={state.basketItems} />
        </DropDown>
      ) : null}
      {state.storeItems.length === 0 ? (
        <LoadingCon>
          <Loading>Loading...</Loading>
        </LoadingCon>
      ) : (
        <div
          style={{
            display: "flex",
            height: "100%",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          {state.togglePopUp ? (
            <DetailedItem
              item={state.popUpItem}
              addItem={(_id, _qty) =>
                dispatch(addItemToBasket({ id: _id, qty: _qty }))
              }
              togglePU={(_toggle, _id) => {
                dispatch(togglePopUp({ toggle: _toggle, id: _id }));
              }}
            />
          ) : (
            <StoreItems
              storeItems={state.storeItems}
              addItem={(_id, _qty) => {
                dispatch(addItemToBasket({ id: _id, qty: _qty }));
              }}
              togglePU={(_toggle, _id) => {
                dispatch(togglePopUp({ toggle: _toggle, id: _id }));
              }}
            />
          )}
        </div>
      )}
    </MainContainer>
  );
}

const selectState = ({ state }: { state: AppState }) => state;

export default App;
