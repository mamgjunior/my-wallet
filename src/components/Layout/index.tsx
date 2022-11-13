import React from "react";

import Aside from "../Aside";
import MainHeader from "../MainHeader";
import Content from "../Content";

import { Grid } from "./styles";

interface IProps{
    children: React.ReactNode;
}


const Layout: React.FC<IProps> = ({ children }) => {
    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Content >
                { children }
            </Content>
        </Grid>
    );
}

export default Layout;