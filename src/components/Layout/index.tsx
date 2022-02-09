import React from "react";

import { Container } from "./styles";

import Content from "../Content";
import Aside from "../Aside";
import MainHeader from "../MainHeader";

const Layout: React.FC = () => {
    return (
        <Container>
            <MainHeader />
            <Aside />
            <Content />
        </Container>        
    );
}

export default Layout;