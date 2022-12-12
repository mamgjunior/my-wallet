import React from "react";
import {
    Bar,
    Cell,
    Tooltip,
    BarChart,
    ResponsiveContainer
} from "recharts";
import formatCurrency from "../../utils/formatCurrency";

import {
    Container,
    SideLeft,
    SideRight,
    LegendContainer,
    Legend
} from "./styles";

interface IBarChartComponentProps {
    title: string;
    data: {
        name: string;
        amount: number;
        percent: number;
        color: string;
    }[]
}

const BarChartComponent: React.FC<IBarChartComponentProps> = ({
    title,
    data
}) => {
    return (
        <Container>
            <SideLeft>
                <h2>{title}</h2>
                <LegendContainer>
                    {
                        data.map((item, index) => (
                            <Legend
                                key={index}
                                color={item.color}
                            >
                                <div>{`${item.percent}%`}</div>
                                <span>{item.name}</span>
                            </Legend>
                        ))
                    }
                </LegendContainer>
            </SideLeft>

            <SideRight>
                <ResponsiveContainer>
                    <BarChart
                        data={data}
                    >
                        <Bar
                            dataKey="amount"
                        >
                            {
                                data.map((indicator) => (
                                    <Cell
                                        key={indicator.name}
                                        fill={indicator.color}
                                        cursor="point"
                                    />
                                ))
                            }
                        </Bar>
                        {/* <Tooltip formatter={(value) => formatCurrency(Number(value))} /> */}
                    </BarChart>
                </ResponsiveContainer>
            </SideRight>
        </Container>
    );
}

export default BarChartComponent;