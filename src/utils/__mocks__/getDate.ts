export const getDate = (date: number): string => {
	return new Date(date).toISOString();
};
