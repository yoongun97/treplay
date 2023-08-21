import { styled } from "styled-components";

export const StBox = styled.div`
  display: flex;
  width: 500px;
  height: 50px;
  overflow: hidden;
`;

export const DropdownWrapper = styled.div`
  width: 200px;
  height: 40px;
  border: 1px solid #ccc;
`;

export const DropdownHeader = styled.div`
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`;

export const DropdownList = styled.div`
  border-top: 1px solid #ccc;
  position: absolute;
  width: 200px;
  border: 1px solid #ccc;
  background-color: #ffffff;
`;

export const DropdownItem = styled.div`
    padding:10pxcursor:pointer;
    &:hover{
        background-color: lightgray;
    }
`;
