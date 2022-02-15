import React, { useMemo, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";

import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";

import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";
import formatParametroData from "../../utils/formatParametroData";
import listOfMonths from "../../utils/months";

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
    const [selectedFrequency, setSelectedFrequency] = useState(["recorrente", "eventual"]);

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

    const handleFrequencyClick = (frequency: string) => {
        const alreadySelected = selectedFrequency.findIndex(item => item === frequency);
        if(alreadySelected >= 0) {
            const filtered = selectedFrequency.filter(item => item !== frequency);
            setSelectedFrequency(filtered);
        } else {
            setSelectedFrequency((prev) => [... prev, frequency]);
        }
    };

    useEffect(() => {
        const filteredData = listData.filter(item => {
            const date = new Date(item.date);
            const year = String(date.getFullYear());
            const month = String(date.getMonth() + 1);
            
            return month === monthSelected && year === yearSelected && selectedFrequency.includes(item.frequency);
        });

        const formattedData = filteredData.map(item => {
            return {
                id: uuidv4(),
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                dateFormatted: formatDate(item.date),
                tagcolor: item.frequency === "recorrente"? "#4E41F0": "#E44C4E"
            }
        });

        setData(formattedData);
    },[listData, monthSelected, yearSelected, selectedFrequency]);

    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {
                value: index + 1,
                label: month
            }
        });
    }, []);

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

    }, [listData]);

    return (
        <Container>
            <ContentHeader title={title} lineColor={lineColor}>
                <SelectInput options={months} onchange={e => setMonthSelected(e.target.value)} defaultValue={monthSelected} />
                <SelectInput options={years} onchange={e => setYearSelected(e.target.value)} defaultValue={yearSelected} />
            </ContentHeader>

            <Filters>
                <button 
                    type="button" 
                    className={`tag-filter tag-filter-recurrent
                    ${selectedFrequency.includes("recorrente") && 'tag-actived'}`}
                    onClick={() => handleFrequencyClick("recorrente")}
                >
                    Recorrentes
                </button>
                <button 
                    type="button" 
                    className={`tag-filter tag-filter-eventual
                    ${selectedFrequency.includes("eventual") && 'tag-actived'}`}
                    onClick={() => handleFrequencyClick("eventual")}
                >
                    Eventuais
                </button>
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