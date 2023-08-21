import { atom } from "jotai";

export const postAtom = atom({
  nation: "",
  category: "",
  placeName: "",
  placeLocation: "",
  postContent: "",
  date: null,
  author: null,
  uid: null,
  postImgs: [],
});
