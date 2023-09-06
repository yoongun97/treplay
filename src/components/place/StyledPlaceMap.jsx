import { styled } from "styled-components";
export const MapContainer = styled.div`
  position: relative;
  margin: 80px 0 60px;
`;
export const MapBox = styled.div`
  width: 100%;
  height: 460px;
`;
export const AddressBox = styled.div`
  position: absolute;
  top: -40px;
  transform: translateX(50%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 640px;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #e5e5e5;
  background-color: #fff;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
  font-size: 14px;
  font-weight: 400;
  word-break: keep-all;

  & > button {
    flex-shrink: 0;
    margin-left: 20px;
    width: 100px;
    height: 32px;
    border-radius: 30px;
    border: none;
    background-color: #0a58be;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
  }
`;

export const PlaceName = styled.div`
  height: 26px;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 3px;
`;
