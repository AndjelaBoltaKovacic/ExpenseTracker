
export type User = {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    premiumUser: boolean,
    createdAt: Date,
    updatedAt: Date,
    v: number,
    session: string,
    iat: number,
    exp: number
}

export type UserContextType = {
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
}
