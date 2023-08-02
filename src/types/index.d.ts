export type IUser = {
    id:number;
    name: string;
    address: string;
    is_active: boolean;
}

export type IAuth = {
    token: string | null;
    expires: string | null;
}
