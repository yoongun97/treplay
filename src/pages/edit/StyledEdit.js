import styled from 'styled-components';

export const PostImg = styled.div`
  flex: 0 0 calc(20% - 32px);
  text-align: center;
  margin: auto;
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 400px;
  margin: auto;
`;

export const EditText = styled.textarea`
  display: flex;
  height: 300px;
  width: 500px;
  margin: auto;
`;

export const EditContainer = styled.div`
  display: flex;
  height: 150px;
  width: 500px;
  margin: auto;
  white-space: nowrap;
  border: 1px solid black;
  overflow-x: auto;
`;

export const ImageAddContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
`;

export const ImageAddButton = styled.input`
  display: flex;
  align-items: center;
  width: 300px;
  height: 30px;
  margin-top: 20px;
`;

export const EditContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

export const ButtonContainer = styled.div`
  margin-top: 16px;
`;

export const AdditionalImageContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

export const ImagePreview = styled.div`
  flex: 1;
`;

export const ImageInfo = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ImageTitle = styled.p`
  margin: 0;
  flex: 1;
`;

export const DeleteButton = styled.button`
  background-color: transparent;
  border: 1px soild black;
  cursor: pointer;
  margin-left: 5px;
`;

export const ImageAddButtonLabel = styled.label`
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 4px;
  display: inline-block;
  text-align: center;
  width: 30%;
  margin-bottom: 10px;
  &:hover {
    background-color: #2980b9;
  }
`;
