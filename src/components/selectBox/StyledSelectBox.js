import { styled } from "styled-components";

export const StBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 40px;
  cursor: pointer;
`;
export const DropdownWrapper = styled.div`
  width: 220px;
  border: 1px solid #e5e5e5;
`;
export const DropdownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 220px;
  height: 46px;
  padding: 6px 12px;
  line-height: 46px;
  border: 1px solid
    ${(props) => (props.selected || props.isactive ? "#0A58BE" : "#e5e5e5")};
  color: ${(props) => (props.selected ? "#0a58be" : "#bfbfbf")};
`;
export const DropdownList = styled.div`
  background-color: white;
`;

export const DropdownItem = styled.div`
  position: relative;
  height: 34px;
  padding: 0 12px;
  text-align: left;
  font-size: 14px;
  font-weight: 500;
  line-height: 34px;
  cursor: pointer;
  &:hover {
    background-color: #f2f8ff;
  }

  &::after {
    content: "";
    width: 100%;
    height: 1px;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #e5e5e5;
  }
  &:first-child::before {
    content: "";
    width: 100%;
    height: 1px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #e5e5e5;
  }

  &:last-child::after {
    display: none;
  }
`;
