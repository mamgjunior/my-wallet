import React, { useMemo, useState, useEffect } from "react";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";

import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";

import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";
import formatParametroData from "../../utils/formatParametroData";

import { Container, Content,Filters } from "./styles";

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

    const years = useMemo(() => {
        let uniqueYears: number[] = [];
        listData.forEach(item => {
            const year = new Date(item.date).getFullYear();
            if(!uniqueYears.includes(year)) uniqueYears.push(year)
        });

        return uniqueYears.map(item => {
            return {
                value: item,
                label: item
            }
        });

    }, []);

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