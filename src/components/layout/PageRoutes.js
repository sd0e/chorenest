import React, { useEffect, useState } from 'react';
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
import Loading from '../../page/Loading';

export default function PageRoutes() {
    const location = useLocation();
    
    const [user, setUser] = useState('Loading');
    
    useEffect(() => {
        getAuth().onAuthStateChanged(user => {
            setUser(user);
        });
    }, []);

    if (user && user !== 'Loading') {
		return (
			<AnimatePresence exitBeforeEnter>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Layout><Home /></Layout>} />
                    <Route path="/learn" element={<Layout><Learn /></Layout>} />
                    <Route path="/sources" element={<Layout><Sources /></Layout>} />
                    <Route path="/insights" element={<Layout><Insights /></Layout>} />
                    <Route path="/leaderboard" element={<Layout><Leaderboard /></Layout>} />
                    <Route path="/settings" element={<Layout><Settings /></Layout>} />
                    <Route path="/account" element={<Layout><Account /></Layout>} />
                </Routes>
            </AnimatePresence>
		)
	} else if (user !== 'Loading') {
		return (
            <AnimatePresence exitBeforeEnter>
                <Routes location={location} key={location.pathname}>
                    <Route path="*" element={<Base />} />
                </Routes>
            </AnimatePresence>
        )
	} else {
		return (
            <AnimatePresence exitBeforeEnter>
                <Routes location={location} key={location.pathname}>
                    <Route path="*" element={<Loading />} />
                </Routes>
            </AnimatePresence>
        )
	}
}