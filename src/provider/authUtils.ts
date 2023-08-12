type Token = string | null | undefined;

const isLoggedIn = (token: Token): boolean => {
	return !!token;
};

export { isLoggedIn };
export { type Token };