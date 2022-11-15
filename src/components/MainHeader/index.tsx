import { type } from "os";
import React, { useMemo } from "react";

import emojis from "../../utils/emojis";
import Toggle from "../Toggle/indice";
import { getNumberEmoji } from "../../utils/funcoes";

import { 
    Container,
    Profile,
    Welcome,
    UserName
} from "./styles";

const MainHeader: React.FC = () => {

    const emoji = useMemo(() => {
        return emojis[getNumberEmoji(emojis.length)];
    }, []);

    return (
        <Container>
            <Toggle />

            <Profile>
                <Welcome>Olá, { emoji }</Welcome>
                <UserName>Marcos Maia</UserName>
            </Profile>
        </Container>
    );
}

export default MainHeader;