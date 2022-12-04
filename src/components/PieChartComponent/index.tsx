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

const PieChartComponent: React.FC = () => (
    <Container>
        <SideLeft>
            <h2>Relação</h2>
            <LegendContainer>
                <Legend
                    color="#F7931B"
                >
                    <div>5%</div>
                    <span>Entradas</span>
                </Legend>
                <Legend
                    color="#E44C4E"
                >
                    <div>95%</div>
                    <span>Saídas</span>
                </Legend>
            </LegendContainer>
        </SideLeft>

        {/* <SideRight>
            <ResponsiveContainer>
                <PieChart>
                    <Pie />
                </PieChart>
            </ResponsiveContainer>
        </SideRight> */}
    </Container>
);

export default PieChartComponent;