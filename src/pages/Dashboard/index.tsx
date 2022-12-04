import React, { useMemo, useState } from "react";

import { Container, Content } from "./styles";

import ContentHeader from "../../components/ContentHeader/indext";
import SelectInput from "../../components/SelectInput";
import WalletBox from "../../components/WalletBox";
import MessageBox from "../../components/MessageBox";
import PieChartComponent from "../../components/PieChartComponent";

import happyImg from "../../assets/happy.svg";
import sadImg from "../../assets/sad.svg";
import grinningImg from "../../assets/grinning.svg";

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

    const totalExpenses = useMemo(() => {
        let total: number = 0;
        expenses.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if (month === monthSelected && year === yearSelected) {
                try {
                    total += Number(item.amount);
                } catch {
                    throw new Error('Invalid amount! Amount must be number.')
                }
            }
        });
        return total;
    }, [monthSelected, yearSelected]);

    const totalGains = useMemo(() => {
        let total: number = 0;
        gains.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if (month === monthSelected && year === yearSelected) {
                try {
                    total += Number(item.amount);
                } catch {
                    throw new Error('Invalid amount! Amount must be number.')
                }
            }
        });
        return total;
    }, [monthSelected, yearSelected]);

    const totalBalance = useMemo(() => {
        return totalGains - totalExpenses;
    }, [totalGains, totalExpenses]);

    const message = useMemo(() => {
        if (totalBalance < 0) {
            return {
                title: "Que triste!",
                description: "Neste mês, você gastou mais do que deveria.",
                footerText: "Verifique seus gastos e tente cortar algumas coisas desnecessárias.",
                icon: sadImg,
            }
        } else if (totalBalance === 0) {
            return {
                title: "Ufaa!",
                description: "Neste mês, você gastou exatamente o que ganhou.",
                footerText: "Tenha cuidado. No próximo mês tente poupar o seu dinheiro.",
                icon: grinningImg,
            }
        } else {
            return {
                title: "Muito bem!",
                description: "Sua carteira está positiva!",
                footerText: "Continue assim. Considere investir o seu saldo.",
                icon: happyImg,
            }
        }
    }, [totalBalance]);

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
                    defaultValue={monthSelected}
                    onChange={(e) => handleMonthSelected(e.target.value)}
                />
                <SelectInput
                    options={years}
                    defaultValue={yearSelected}
                    onChange={(e) => handleYearSelected(e.target.value)}
                />
            </ContentHeader>

            <Content>
                <WalletBox
                    color="#4E41F0"
                    title="Saldo"
                    amount={totalBalance}
                    footerlabel="Atualizado com base nas entradas e saídas"
                    icon="dolar"
                />

                <WalletBox
                    color="#F7931B"
                    title="Entradas"
                    amount={totalGains}
                    footerlabel="Atualizado com base nas entradas e saídas"
                    icon="arrowUp"
                />

                <WalletBox
                    color="#E44C4E"
                    title="Saídas"
                    amount={totalExpenses}
                    footerlabel="Atualizado com base nas entradas e saídas"
                    icon="arroeDown"
                />

                <MessageBox
                    title={message.title}
                    description={message.description}
                    footerText={message.footerText}
                    icon={message.icon}
                />

                <PieChartComponent />
            </Content>
        </Container>
    );
}

export default Dashboard;