import React, { useMemo, useState, useEffect } from "react";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";

import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";

import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";
import formatParametroData from "../../utils/formatParametroData";

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

interface IData {
    id: string;
    description: string;
    amountFormatted: string;
    frequency: string;
    dateFormatted: string;
    tagcolor: string;
}

const List: React.FC<IRouteParams> = ({ match }) => {
    const [data, setData] = useState<IData[]>([]);

    const [monthSelected, setMonthSelected] = useState<string>(formatParametroData("mes"));
    const [yearSelected, setYearSelected] = useState<string>(formatParametroData());

    const { type } = match.params;
    const title = useMemo(() => {
        return type === "entry-balance"? "Entradas": "Saídas";
    },[type]);

    const lineColor = useMemo(() => {
        return type === "entry-balance"? "#F7931B": "#E44C4E";
    },[type]);

    const listData = useMemo(() => {
        return type === "entry-balance"? gains: expenses;
    },[type]);

    useEffect(() => {
        const filteredData = listData.filter(item => {
            const date = new Date(item.date);
            const year = String(date.getFullYear());
            const month = String(date.getMonth() + 1);
            
            return month === monthSelected && year === yearSelected;
        });

        const formattedData = filteredData.map(item => {
            return {
                id: String(new Date().getTime()) + item.amount,
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                dateFormatted: formatDate(item.date),
                tagcolor: item.frequency === "recorrente"? "#4E41F0": "#E44C4E"
            }
        });

        setData(formattedData);
    },[listData, monthSelected, yearSelected]);

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
                <SelectInput options={months} onchange={e => setMonthSelected(e.target.value)} defaultValue={monthSelected} />
                <SelectInput options={years} onchange={e => setYearSelected(e.target.value)} defaultValue={yearSelected} />
            </ContentHeader>

            <Filters>
                <button type="button" className="tag-filter tag-filter-recurrent">Recorrentes</button>
                <button type="button" className="tag-filter tag-filter-eventual">Eventuais</button>
            </Filters>

            <Content>
                {
                    data.map(item =>(
                        <HistoryFinanceCard
                            key={item.id}
                            tagColor={item.tagcolor}
                            title={item.description}
                            subtitle={item.dateFormatted}
                            amount={item.amountFormatted}
                        />        
                    ))
                }            
            </Content>
        </Container>
    );
}

export default List;