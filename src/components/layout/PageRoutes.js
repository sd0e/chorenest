import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Layout from './Layout';
import Home from '../../page/Home';
import Learn from '../../page/Learn';
import Sources from '../../page/Sources';
import Insights from '../../page/Insights';
import Leaderboard from '../../page/Leaderboard';
import Settings from '../../page/Settings';
import Account from '../../page/Account';

export default function PageRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence exitBeforeEnter>
            <Layout>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Home />} />
                    <Route path="/learn" element={<Learn />} />
                    <Route path="/sources" element={<Sources />} />
                    <Route path="/insights" element={<Insights />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/account" element={<Account />} />
                </Routes>
            </Layout>
        </AnimatePresence>
    )
}