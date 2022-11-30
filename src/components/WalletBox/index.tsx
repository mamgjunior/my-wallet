import React from "react";

import dollarImg from "../../assets/dolar.svg";
import arrowUpImg from "../../assets/arrow-up.svg";
import arrowDownImg from "../../assets/arrow-down.svg";

import { Container } from "./styles";

interface IWalletBoxProps {
    title: string;
    amount: number;
    footerlabel: string;
    icon: 'dolar' | 'arrowUp' | 'arroeDown';
    color: string;
}

const WalletBox: React.FC<IWalletBoxProps> = ({
    title,
    amount,
    footerlabel,
    icon,
    color,
}) => {
    return (
        <Container>

        </Container>
    );
}

export default WalletBox;