import React, { useMemo, useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import ContentHeader from "../../components/ContentHeader/indext";
import SelectInput from "../../components/SelectInput";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";

import { Container, Content, Filters } from "./styles";

import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";

import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";
import listOfMonths from "../../utils/months";

interface IData {
    id: string;
    description: string;
    amountFormatted: string;
    frequency: string;
    dateFormatted: string;
    tagColor: string;
}

const List: React.FC = () => {
    const { type } = useParams();

    const [data, setData] = useState<IData[]>([]);
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());
    const [frequencyFilterSelected, setFrequencyFilterSelected] = useState(['recorrente', 'eventual']);


    const pageData = useMemo(() => {
        return type === 'entry-balance' ? {
            title: 'Entradas',
            lineColor: '#F7931B',
            listData: gains,
        } : {
            title: 'Saídas',
            lineColor: '#E44C4E',
            listData: expenses,
        };
    }, [type]);

    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {
                value: index + 1,
                label: month,
            }
        });
    }, []);

    const years = useMemo(() => {
        let uniqueYear: number[] = [];

        pageData.listData.forEach(item => {
            const year = new Date(item.date).getFullYear();
            if (!uniqueYear.includes(year))
                uniqueYear.push(year);
        });

        return uniqueYear.map(year => {
            return {
                value: year, label: year,
            }
        });
    }, [pageData.listData]);

    const handleFrequencyClick = (frequency: string) => {
        const alreadySelected = frequencyFilterSelected.findIndex(item => item === frequency);

        if (alreadySelected >= 0) {
            const filtered = frequencyFilterSelected.filter(item => item !== frequency);
            setFrequencyFilterSelected(filtered);
        } else {
            setFrequencyFilterSelected((prev) => [...prev, frequency]);
        }
    }

    const handleMonthSelected = (month: string) => {
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        } catch {
            throw new Error('Invalid month value.')
        }
    }

    const handleYearSelected = (year: string) => {
        try {
            const parseYear = Number(year);
            setYearSelected(parseYear);
        } catch {
            throw new Error('Invalid year value.')
        }
    }

    useEffect(() => {
        const filteredData = pageData.listData.filter(item => {
            const date = new Date(item.date);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return month === monthSelected && year === yearSelected && frequencyFilterSelected.includes(item.frequency);
        });

        const response = filteredData.map((item, index) => {
            return {
                id: String(index),
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                dateFormatted: formatDate(item.date),
                tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E',
            }
        });
        setData(response);
    }, [pageData.listData, monthSelected, yearSelected, frequencyFilterSelected]);

    return (
        <Container>
            <ContentHeader
                title={pageData.title}
                lineColor={pageData.lineColor}
            >
                <SelectInput
                    options={months}
                    onChange={(e) => handleMonthSelected(e.target.value)}
                    defaultValue={monthSelected}
                />
                <SelectInput
                    options={years}
                    onChange={(e) => handleYearSelected(e.target.value)}
                    defaultValue={yearSelected}
                />
            </ContentHeader>

            <Filters>
                <button
                    type="button"
                    className={`
                        tag-filter tag-filter-recurrent
                        ${frequencyFilterSelected.includes('recorrente') && 'tag-actived'}    
                    `}
                    onClick={() => handleFrequencyClick('recorrente')}
                >
                    Recorrentes
                </button>

                <button
                    type="button"
                    className={`
                        tag-filter tag-filter-eventual
                        ${frequencyFilterSelected.includes('eventual') && 'tag-actived'}
                    `}
                    onClick={() => handleFrequencyClick('eventual')}
                >
                    Eventuais
                </button>
            </Filters>

            <Content>
                {
                    data.map(item => (
                        <HistoryFinanceCard
                            key={item.id}
                            tagColor={item.tagColor}
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