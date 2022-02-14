import React from "react";

import { Container } from "./styles";

interface ISelectInputProps {
    options: {
        value: string | number;
        label: string | number;
    }[],
    onchange(event: React.ChangeEvent<HTMLSelectElement>): void | undefined;
    defaultValue?: string | number;
}

const SelectInput: React.FC<ISelectInputProps> = ({ options, onchange, defaultValue }) => {
    return (
        <Container>
            <select onChange={onchange} defaultValue={defaultValue}>
                {
                    options.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))
                }
            </select>
        </Container> 
    );
}

export default SelectInput;