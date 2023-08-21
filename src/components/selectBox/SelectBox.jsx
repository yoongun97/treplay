import React, { useState } from "react";
import {
  DropdownWrapper,
  DropdownHeader,
  DropdownList,
  DropdownItem,
  StBox,
} from "./StyledSelectBox";
import { useAtom } from "jotai";
import { postAtom } from "../../store/postAtom";

function SelectBox() {
  const nations = ["미국", "일본", "한국"];
  const category = ["맛집", "관광명소", "숙박"];
  const [isActive, setIsActive] = useState(false);
  const [isActive1, setIsActive1] = useState(false);
  const [selectedNation, setSelectedNation] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [post, setPost] = useAtom(postAtom);

  const handleNationClick = (option) => {
    setSelectedNation(option);
    setIsActive(false);
    setPost({ ...post, nation: option });
  };

  const handleCategoryClick = (option) => {
    setSelectedCategory(option);
    setIsActive1(false);
    setPost({ ...post, category: option });
  };
  console.log(post);
  return (
    <StBox>
      <DropdownWrapper>
        <DropdownHeader
          onClick={() => {
            setIsActive(!isActive);
          }}
        >
          <span>{selectedNation || "선택하세요"}</span>
          <span>🔽</span>
        </DropdownHeader>
        {isActive && (
          <DropdownList>
            {nations.map((option) => (
              <DropdownItem
                key={option}
                onClick={() => {
                  handleNationClick(option);
                }}
              >
                {option}
              </DropdownItem>
            ))}
          </DropdownList>
        )}
      </DropdownWrapper>
      <DropdownWrapper>
        <DropdownHeader
          onClick={() => {
            setIsActive1(!isActive1);
          }}
        >
          <span>{selectedCategory || "선택하세요"}</span>
          <span>🔽</span>
        </DropdownHeader>
        {isActive1 && (
          <DropdownList>
            {category.map((option) => (
              <DropdownItem
                key={option}
                onClick={() => {
                  handleCategoryClick(option);
                }}
              >
                {option}
              </DropdownItem>
            ))}
          </DropdownList>
        )}
      </DropdownWrapper>
    </StBox>
  );
}

export default SelectBox;
