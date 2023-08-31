import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import TopButton from "./TopButton";
import { styled } from "styled-components";
function Layout() {
  return (
    <Container>
      <ContainerInner>
        <Header />
        <Outlet />
        <Footer />
      </ContainerInner>
      <TopButton />
    </Container>
  );
}
export default Layout;
const Container = styled.div`
  position: relative;
`;
const ContainerInner = styled.div`
  max-width: 1920px;
  width: 100%;
  margin: 0 auto;
`;
