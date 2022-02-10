import React from "react";

import { 
    Container,
    TitleContainer,
    Controllers
} from "./styles";

const Content: React.FC = () => {
    return (
        <Container>
            <TitleContainer>
                <h3>Meu Titulo</h3>
            </TitleContainer>
            <Controllers>
                <button type="button">Botão A</button>
                <button type="button">Botão B</button>
            </Controllers>
        </Container>        
    );
}

export default Content;