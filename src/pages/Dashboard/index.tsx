import React, { useMemo, useState } from "react";

import { Container, Content } from "./styles";

import ContentHeader from "../../components/ContentHeader/indext";
import SelectInput from "../../components/SelectInput";
import WalletBox from "../../components/WalletBox";

import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";

import listOfMonths from "../../utils/months";

const Dashboard: React.FC = () => {
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());

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

        [...expenses, ...gains].forEach(item => {
            const year = new Date(item.date).getFullYear();
            if (!uniqueYear.includes(year))
                uniqueYear.push(year);
        });

        return uniqueYear.map(year => {
            return {
                value: year, label: year,
            }
        });
    }, []);

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

    return (
        <Container>
            <ContentHeader
                title="Dashboard"
                lineColor="#F7931B"
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

            <Content>
                <WalletBox
                    color="#4E41F0"
                    title="Saldo"
                    amount={150.00}
                    footerlabel="Atualizado com base nas entradas e saídas"
                    icon="dolar"
                />

                <WalletBox
                    color="#F7931B"
                    title="Entradas"
                    amount={5000.00}
                    footerlabel="Atualizado com base nas entradas e saídas"
                    icon="arrowUp"
                />

                <WalletBox
                    color="#E44C4E"
                    title="Saídas"
                    amount={4850.00}
                    footerlabel="Atualizado com base nas entradas e saídas"
                    icon="arroeDown"
                />
            </Content>
        </Container>
    );
}

export default Dashboard;