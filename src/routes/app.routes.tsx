import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../components/Layout";
import Dashboard from "../pages/Dashboard";
import List from "../pages/List";

const AppRoutes: React.FC = () => {
    return (
        <Layout>
            <BrowserRouter>
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/list/:type" element={<List />} />
                </Routes>
            </BrowserRouter>
        </Layout>
    );
}

export default AppRoutes;