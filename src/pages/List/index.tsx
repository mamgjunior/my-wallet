import React from "react";

import ContentHeader from "../../components/ContentHeader/indext";
import SelectInput from "../../components/SelectInput";

import { Container } from "./styles";

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
                lineColor="#F7931B"
            >
                <SelectInput options={ options } />
            </ContentHeader>
        </Container>
    );
}

export default List;