import React from "react";
import logoImg from '../../assets/logo.svg';

import Input from "../../components/Input";
import { 
    Container, 
    Logo, 
    Form,
    FormTitle 
} from "./styles";

const SignIn: React.FC = () => {
    return (
        <Container>
            <Logo>
                <img src={logoImg} alt="Minha Carteira" />
                <h2>Minha Carteira</h2>
            </Logo>
            <Form>
                <FormTitle>Entrar</FormTitle>
                <Input type="email" placeholder="E-Mail" required/>
                <Input type="password" placeholder="Password" required/>
                <button type="submit">Acessar</button>
            </Form>
        </Container>
    );
}

export default SignIn;