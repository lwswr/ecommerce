import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreItem } from "./API";
import { AppState } from "./App";

const initialAppState: AppState = {
  storeItems: [],
  basketItems: [],
  toggleBasket: false,
  togglePopUp: false,
  popUpItem: {
    id: 1,
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
  },
};

const appSlice = createSlice({
  name: "appSlice",
  initialState: initialAppState,
  reducers: {
    // after api called on render payload of items is set to storeItems
    setData: (state, { payload }: PayloadAction<{ items: StoreItem[] }>) => {
      state.storeItems = payload.items;
    },
    // uses id
    addItemToBasket: (
      state: AppState,
      { payload }: PayloadAction<{ id: number; qty: number }>
    ) => {
      if (payload.id) {
        const isAlreadyInBasket = state.basketItems.some(
          (item) => item.storeItem.id === payload.id
        );
        if (isAlreadyInBasket === false) {
          const index: number = state.storeItems.findIndex(
            (_item) => _item.id === payload.id
          );
          state.basketItems.push({
            storeItem: state.storeItems[index],
            quantity: payload.qty,
          });
        }
      }
    },
    removeItemFromBasket: (
      state,
      { payload }: PayloadAction<{ id: number }>
    ) => {
      if (payload.id) {
        const index: number = state.basketItems.findIndex(
          (item) => item.storeItem.id === payload.id
        );
        if (payload.id > -1) state.basketItems.splice(index, 1);
      }
    },
    toggleBasket: (state, { payload }: PayloadAction<{ toggle: boolean }>) => {
      state.toggleBasket = !payload.toggle;
    },
    togglePopUp: (
      state,
      { payload }: PayloadAction<{ toggle: boolean; id: number }>
    ) => {
      if (payload.id) {
        const index: number = state.storeItems.findIndex(
          (item) => item.id === payload.id
        );
        state.popUpItem = state.storeItems[index];
        state.togglePopUp = !payload.toggle;
      }
    },
  },
});

export const {
  setData,
  addItemToBasket,
  removeItemFromBasket,
  toggleBasket,
  togglePopUp,
} = appSlice.actions;

export default appSlice.reducer;
