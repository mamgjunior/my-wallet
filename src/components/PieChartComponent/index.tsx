import React from "react";

import {
    Pie,
    Cell,
    PieChart,
    ResponsiveContainer
} from "recharts";

import {
    Legend,
    SideLeft,
    SideRight,
    Container,
    LegendContainer
} from "./styles";

interface IPieChartComponent {
    data: {
        name: string;
        value: number;
        percent: number;
        color: string;
    }[];
}

const PieChartComponent: React.FC<IPieChartComponent> = ({ data }) => (
    <Container>
        <SideLeft>
            <h2>Relação</h2>
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
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="percent"
                    >
                        {
                            data.map((item, index) => (
                                <Cell 
                                    key={index}
                                    fill={item.color}
                                />
                            ))
                        }
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </SideRight>
    </Container >
);

export default PieChartComponent;