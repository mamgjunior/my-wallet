import React, { useState } from "react";
import logoImg from '../../assets/logo.svg';

import Input from "../../components/Input";
import { useAuth } from "../../hooks/auth";

import {
    Container,
    Logo,
    Form,
    FormTitle
} from "./styles";

const SignIn: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const { signIn } = useAuth();

    return (
        <Container>
            <Logo>
                <img src={logoImg} alt="Minha Carteira" />
                <h2>Minha Carteira</h2>
            </Logo>
            <Form onSubmit={() => signIn(email, password)}>
                <FormTitle>Entrar</FormTitle>
                <Input
                    type="email"
                    placeholder="E-Mail"
                    required
                    onChange={(element) => setEmail(element.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(element) => setPassword(element.target.value)}
                />
                <button type="submit">Acessar</button>
            </Form>
        </Container>
    );
}

export default SignIn;