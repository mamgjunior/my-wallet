import React from "react";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";

import { Container, Content } from "./styles";

const List: React.FC = () => {
    const options = [
        {value: 'M', label: 'Marcos Maia'}, 
        {value: "S", label: "Suyanne Spinosa"},
        {value: "L", label: "Loweyne Maia"},
        {value: "D", label: "Deivid Spinosa"},
        {value: "I", label: "Ìris Esther"},        
    ]

    return (
        <Container>
            <ContentHeader title="Saídas" lineColor="#E44C4E">
                <SelectInput options={options} />
            </ContentHeader>

            <Content>
                <HistoryFinanceCard 
                    cardColor="#313862"
                    tagColor="#E44C4E"
                    title="Conta de Luz"
                    subtitle="11/02/2022"
                    amount="R$ 130,25"
                />
            </Content>
        </Container>
    );
}

export default List;