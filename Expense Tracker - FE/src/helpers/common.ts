export const getLocationValue = (pathname: string) => {
    return pathname === '/' ? 0 : pathname === '/transactions' ? 1 : 2;
}