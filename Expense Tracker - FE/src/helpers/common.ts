export const getLocationValue = (pathname: string) => {
    return pathname === '/dashboard' ? 0 : pathname === '/transactions' ? 1 : 2;
}