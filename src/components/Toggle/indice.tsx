import React, { useState } from "react";

import {
    Container,
    ToggleLabel,
    ToggleSelector
} from "./styles";

const Toggle: React.FC = () => {

    const [mudou, setMudou ] = useState(true);
    return (
        <Container>
            <ToggleLabel>Light</ToggleLabel>
            <ToggleSelector 
                checked={ mudou }
                checkedIcon={ false }
                uncheckedIcon={ false }
                onChange={() => setMudou(!mudou)}
            />
            <ToggleLabel>Dark</ToggleLabel>
        </Container>
    );
}

export default Toggle;