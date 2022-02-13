import React from "react";

import {
    MdDashboard,
    MdArrowDownward,
    MdArrowUpward,
    MdExitToApp
} from "react-icons/md";

import Logo from "../../assets/logo.svg";

import { 
    Container,
    Header,
    LogoImg,
    Title,
    MenuContainer,
    MenuItem 
} from "./styles";

const Aside: React.FC = () => {
    return (
        <Container>
            <Header>
                <LogoImg src={Logo} alt="Logo Minha Carteira" />
                <Title>
                    Minha Carteira
                </Title>
            </Header>
            <MenuContainer>
                <MenuItem href="/dashboard">
                    <MdDashboard />
                    Dashboard
                </MenuItem>
                <MenuItem href="/list/entry-balance">
                    <MdArrowUpward />
                    Entradas
                </MenuItem>
                <MenuItem href="/list/exit-balance">
                    <MdArrowDownward />
                    Saídas
                </MenuItem>
                <MenuItem href="#">
                    <MdExitToApp />
                    Sair
                </MenuItem>
            </MenuContainer>
        </Container>        
    );
}

export default Aside;