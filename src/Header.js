import React from 'react';
import { Helmet } from 'react-helmet';

export default function Header({ Title }) {
	return (
		<Helmet>
			<title>{Title ? `${Title} - Chore Nest` : 'Chore Nest'}</title>
			<meta name="title" content={Title ? `${Title} - Chore Nest` : 'Chore Nest'} />
		</Helmet>
	)
}