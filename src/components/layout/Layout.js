import React from 'react';
import { getAuth } from '@firebase/auth';

import classes from './Layout.module.css';
import LeftBar from '../ui/LeftBar';
import Base from '../../page/Base';

export default function Layout({ Element }) {
    const [user, setUser] = useState('Loading');
    
    getAuth().onAuthStateChanged(user => {
        setUser(user);
    });

	if (user) {
		return (
			<div className={classes.layoutOuter}>
				<div className={classes.leftBarHolder}>
					<LeftBar />
				</div>
				<div className={classes.pageHolder}>
					<Element />
				</div>
			</div>
		)
	} else if (user !== 'Loading') {

	}
}