import React from "react";

import { Container } from "./styles";

import ContentHeader from "../../components/ContentHeader/indext";
import SelectInput from "../../components/SelectInput";

const Dashboard: React.FC = () => {
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
                title="Dashboard"
                lineColor="#fff"
            >
                <SelectInput 
                    options={ options } 
                    onChange={() => {}}
                />
            </ContentHeader>
        </Container>
    );
}

export default Dashboard;