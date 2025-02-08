export type NavItem = {
    id: string;
    icon: string;
    label: string;
    meta?: string;
    route?: string;
    class?: string;
    onClick?: (...params: any) => void;
    children?: NavItem[];
};
