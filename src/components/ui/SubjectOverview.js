import React from 'react';
import { Stack } from '@mui/material';
import { SchoolOutlined, GradeOutlined, CategoryOutlined, SourceOutlined, InsightsOutlined, StickyNote2Outlined, ChevronRightOutlined } from '@mui/icons-material';

import classes from './SubjectOverview.module.css';
import ActionButton from './ActionButton';
import ContentStat from './ContentStat';

export default function SubjectOverview({ Content }) {
	// format of Content prop: {name: "OCR A Level Mathematics", notes: "notion", notesUrl: "https://google.com/", workingPercentage: 91, workingGrade: "A*", marksDue: 26, percentageChange: -3, color: "#774BAF"}
	const content = {name: "OCR A Level Mathematics", notes: "notion", notesUrl: "https://www.notion.so/Edexcel-Mathematics-e24f683571e04ced8237c9a7297f435c", workingPercentage: 91, workingGrade: "A*", marksDue: 26, percentageChange: -3, color: "#774BAF"};

	return (
		<div>
			<div className={classes.subjectInfo}>
				<span className={classes.subjectInfoDot} style={{ backgroundColor: content.color }}></span>
				<span className={classes.subjectInfoTitle}>{ content.name }</span>
				<ChevronRightOutlined className={classes.subjectInfoRightArrow} />
			</div>
			<Stack spacing="1rem" direction="row">
				<Stack spacing="1rem">
					<Stack spacing="1rem" direction="row">
						<ActionButton Icon={SchoolOutlined} Color="#567ECC" />
						<ActionButton Icon={GradeOutlined} Color="#D1477D" />
						<ActionButton Icon={CategoryOutlined} Color="#CC52BE" />
					</Stack>
					<Stack spacing="1rem" direction="row">
						<ActionButton Icon={SourceOutlined} Color="#69C458" />
						<ActionButton Icon={InsightsOutlined} Color="#C42754" />
						<ActionButton Icon={StickyNote2Outlined} Color="#3AEA15" Click={() => window.open(content.notesUrl)} />
					</Stack>
				</Stack>
				<ContentStat />
			</Stack>
		</div>
	)
}