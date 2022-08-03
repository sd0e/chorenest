import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getAuth } from '@firebase/auth';

import Layout from './Layout';
import Home from '../../page/Home';
import Chores from '../../page/Chores';
import People from '../../page/People';
import Insights from '../../page/Insights';
import Leaderboard from '../../page/Leaderboard';
import Settings from '../../page/Settings';
import Account from '../../page/Account';
import Base from '../../page/Base';
import Loading from '../../page/Loading';
import fetch from '../../firebase/fetch';
import write from '../../firebase/write';

export default function PageRoutes() {
    const location = useLocation();
    
    const [user, setUser] = useState('Loading');
    const [pwaPopupOpen, setPwaPopupOpen] = useState(false);

    let lastTriggered = 0;

	const newLastTriggered = () => {
		lastTriggered = new Date().getTime();
	}
    
    useEffect(() => {
        // triggers every time the user's status changes
        getAuth().onAuthStateChanged(user => {
            // limit requests to every 20 ms
            if (!lastTriggered || new Date().getTime() - lastTriggered >= 20) {
                newLastTriggered();
                // last trigger was more than 20 ms ago
                
                setUser(user);

                if (user && user !== 'Loading') {
                    // display a popup to add a PWA app if not shown before and on mobile
                    // if (window.innerWidth < 550) {
                    //     fetch(`/users/${user.uid}/pwaAlertShown`).then(pwaAlertShown => {
                    //         if (!pwaAlertShown) {
                    //             setPwaPopupOpen(true);
                    //             write(`/users/${user.uid}/pwaAlertShown`, true);
                    //         }
                    //     });
                    // }
                };
            }
        });
    }, []);

    if (user && user !== 'Loading') {
		return (
			<AnimatePresence exitBeforeEnter>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Layout><Home /></Layout>} />
                    <Route path="/chores" element={<Layout><Chores /></Layout>} />
                    <Route path="/people" element={<Layout><People /></Layout>} />
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