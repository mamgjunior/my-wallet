import React from "react";
import {
    Line,
    XAxis,
    Tooltip,
    LineChart,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

import {
    Header,
    Legend,
    Container,
    LegendContainer,
} from "./styles";

interface IHistoryChart {
    data: {
        month: string;
        amountEntry: number;
        amountOutput: number;
    }[],
    lineColorAmountEntry: string;
    lineColorAmountOutput: string;
}

const HistoryChart: React.FC<IHistoryChart> = ({
    data,
    lineColorAmountEntry,
    lineColorAmountOutput
}) => (
    <Container>
        <Header>
            <h2>Histórico de saldo</h2>
            <LegendContainer>
                <Legend
                    color={lineColorAmountEntry}
                >
                    <div></div>
                    <span>Entradas</span>
                </Legend>
                <Legend
                    color={lineColorAmountOutput}
                >
                    <div></div>
                    <span>Saídas</span>
                </Legend>
            </LegendContainer>
        </Header>

        <ResponsiveContainer>
            <LineChart
                data={data}
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#CECECE" />
                <XAxis dataKey="month" stroke="#CECECE" />
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="amountEntry"
                    name="Entradas"
                    stroke={lineColorAmountEntry}
                    dot={{ r: 5 }}
                    activeDot={{ r: 8 }}
                />
                <Line
                    type="monotone"
                    dataKey="amountOutput"
                    name="Saídas"
                    stroke={lineColorAmountOutput}
                    dot={{ r: 5 }}
                    activeDot={{ r: 8 }}
                />
            </LineChart>
        </ResponsiveContainer>
    </Container>
);

export default HistoryChart;