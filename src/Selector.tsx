import * as React from "react";
import { SortOption, sortOptions } from "./appSlice";
import styled from "styled-components";

const Select = styled.select`
  display: flex;
  z-index: 15;
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  margin: 1rem 0 1rem 0;
  color: rgba(0, 96, 151, 0.8);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

export const Selector = ({
  selectedOption,
  value,
  onChange,
}: {
  selectedOption: Readonly<SortOption[]>;
  value: SortOption;
  onChange: (value: SortOption) => void;
}) => {
  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        <Select
          value={value ?? selectedOption}
          onChange={(e) => onChange(e.target.value as any)}
        >
          {sortOptions.map((option) => {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          })}
        </Select>
      </div>
    </div>
  );
};
