import React, { useMemo } from "react";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";

import { 
    Container, 
    Content,
    Filters
} from "./styles";

interface IRouteParams {
    match: {
        params: {
            type: string;
        }
    }
}

const List: React.FC<IRouteParams> = ({ match }) => {
    const { type } = match.params;
    const title = useMemo(() => {
        return type === "entry-balance"? "Entradas": "Saídas";
    },[type]);

    const lineColor = useMemo(() => {
        return type === "entry-balance"? "#F7931B": "#E44C4E";
    },[type]);

    const months = [
        {value: 1, label: "JANEIRO"}, 
        {value: 2, label: "FEVEREIRO"},
        {value: 3, label: "MARÇO"},
        {value: 4, label: "ABRIL"},
        {value: 5, label: "MAIO"},
        {value: 6, label: 'JUNHO'}, 
        {value: 7, label: "JULHO"},
        {value: 8, label: "AGOSTO"},
        {value: 9, label: "SETEMBRO"},
        {value: 10, label: "OUTUBRO"},
        {value: 11, label: "NOVEMBRO"},
        {value: 12, label: "DEZEMBRO"},
    ]

    const years = [
        {value: 2022, label: "2022"}, 
        {value: 2021, label: "2021"},
        {value: 2020, label: "2020"},
        {value: 2019, label: "2019"},
        {value: 2018, label: "2018"},
        {value: 2017, label: '2017'}, 
        {value: 2016, label: "2016"},
        {value: 2015, label: "2015"},
        {value: 2014, label: "2014"},
    ]

    return (
        <Container>
            <ContentHeader title={title} lineColor={lineColor}>
                <SelectInput options={months} />
                <SelectInput options={years} />
            </ContentHeader>

            <Filters>
                <button type="button" className="tag-filter tag-filter-recurrent">Recorrentes</button>
                <button type="button" className="tag-filter tag-filter-eventual">Eventuais</button>
            </Filters>

            <Content>
                <HistoryFinanceCard
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