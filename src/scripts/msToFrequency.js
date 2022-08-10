export default function msToFrequency(ms) {
	if (ms % (604800000 * 365) === 0) {
		// every x years
		const years = ms / (604800000 * 365);
		return years === 1 ? 'year' : `${years} years`;
	} else if (ms % 604800000 === 0) {
		// every x weeks
		const weeks = ms / 604800000;
		return weeks === 1 ? 'week' : `${weeks} weeks`;
	} else if (ms % 86400000 === 0) {
		// every x days
		const days = ms / 86400000;
		return days === 1 ? 'day' : `${days} days`;
	}
}