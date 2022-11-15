import React from "react";

import ContentHeader from "../../components/ContentHeader/indext";
import SelectInput from "../../components/SelectInput";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";

import { Container, Content } from "./styles";

const List: React.FC = () => {
    const options = [
        { value: 'Marcos', label: 'Marcos' },
        { value: 'Suyanne', label: 'Suyanne' },
        { value: 'Loweyne', label: 'Loweyne' },
        { value: 'Deivid', label: 'Deivid' },
        { value: 'Esther', label: 'Esther' },
    ];

    return (
        <Container>
            <ContentHeader
                title="Saídas"
                lineColor="#E44C4E"
            >
                <SelectInput options={ options } />
            </ContentHeader>

            <Content>
                <HistoryFinanceCard 
                    tagColor="#E44C4E"
                    title="Conta de Luz"
                    subtitle="14/11/2022"
                    amount="R$ 125,00"
                />
            </Content>
        </Container>
    );
}

export default List;