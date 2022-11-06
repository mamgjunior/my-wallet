import React from "react";

import Aside from "../Aside";
import MainHeader from "../MainHeader";
import Content from "../Content";

import { Grid } from "./styles";


const Layout: React.FC = () => {
    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Content />
        </Grid>
    );
}

export default Layout;