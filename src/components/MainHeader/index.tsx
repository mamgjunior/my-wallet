import React, { useMemo, useState } from "react";

import emojis from "../../utils/emojis";
import { getNumberEmoji } from "../../utils/funcoes";
import Toggle from "../Toggle/indice";

import { useTheme } from "../../hooks/theme";

import {
    Container,
    Profile,
    Welcome,
    UserName,
} from "./styles";

const MainHeader: React.FC = () => {
    const { toggleTheme, theme } = useTheme();
    const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false);

    const handleChangeTheme = () => {
        setDarkTheme(!darkTheme);
        toggleTheme();
    }

    const emoji = useMemo(() => {
        return emojis[getNumberEmoji(emojis.length)];
    }, []);

    return (
        <Container>
            <Toggle
                labelLeft="Light"
                labelRight="Dark"
                checked={darkTheme}
                onChange={handleChangeTheme}
            />

            <Profile>
                <Welcome>Olá, {emoji}</Welcome>
                <UserName>Marcos Maia</UserName>
            </Profile>
        </Container>
    );
}

export default MainHeader;