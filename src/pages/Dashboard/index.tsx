import React from "react";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";

import { Container } from "./styles";

const Dashboard: React.FC = () => {
    const options = [
        {value: 'M', label: 'Marcos Maia'}, 
        {value: "S", label: "Suyanne Spinosa"},
        {value: "L", label: "Loweyne Maia"},
        {value: "D", label: "Deivid Spinosa"},
        {value: "I", label: "Ìris Esther"},        
    ]

    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#F7931B">
                <SelectInput options={options} />
            </ContentHeader>
        </Container>
    );
}

export default Dashboard;