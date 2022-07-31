import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { getAuth } from '@firebase/auth';

import Layout from './Layout';
import Home from '../../page/Home';
import Learn from '../../page/Learn';
import Sources from '../../page/Sources';
import Insights from '../../page/Insights';
import Leaderboard from '../../page/Leaderboard';
import Settings from '../../page/Settings';
import Account from '../../page/Account';
import Base from '../../page/Base';

export default function PageRoutes() {
    const location = useLocation();

    const [user, setUser] = useState(getAuth().currentUser);
    
    getAuth().onAuthStateChanged(user => {
        setUser(user);
    });

    if (user) {
        return (
            <AnimatePresence exitBeforeEnter>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Layout Element={Home} />} />
                    <Route path="/learn" element={<Layout Element={Learn} />} />
                    <Route path="/sources" element={<Layout Element={Sources} />} />
                    <Route path="/insights" element={<Layout Element={Insights} />} />
                    <Route path="/leaderboard" element={<Layout Element={Leaderboard} />} />
                    <Route path="/settings" element={<Layout Element={Settings} />} />
                    <Route path="/account" element={<Layout Element={Account} />} />
                </Routes>
            </AnimatePresence>
        )
    } else {
        return <Base />
    }
}