export interface UserIdentity {
    userName: string;
    userEmail: string;
    userTimezone: string;
    roles: Map<string, null>;
    tokenExp: number;
}