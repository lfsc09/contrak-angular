import { AuthUser } from '../app/infra/gateways/login/login-gateway.model';

interface User {
    name: string;
    email: string;
    password: string;
    roles: string[];
    tz: string;
}

export class LoginFakerData {
    static readonly users: User[] = [
        {
            name: 'Master Grill',
            email: 'master@gmail.com',
            password: '123456',
            roles: [],
            tz: '-03:00',
        },
    ];

    static getUser(email: string, password: string): AuthUser | null {
        const user = this.users.find((user) => user.email === email && user.password === password);
        if (!user) return null;
        return {
            userName: user.name,
            userEmail: user.email,
            userTz: user.tz,
            roles: [...user.roles],
            tokenExp: new Date().getTime() + 1000 * 60 * 60 * 5,
        };
    }
}
