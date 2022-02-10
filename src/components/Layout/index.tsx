import React from "react";

import { Container } from "./styles";

import Content from "../Content";
import Aside from "../Aside";
import MainHeader from "../MainHeader";

const Layout: React.FC = ({ children }) => {
    return (
        <Container>
            <MainHeader />
            <Aside />
            <Content>
                { children }
            </Content>
        </Container>        
    );
}

export default Layout;