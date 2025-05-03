import {Account} from "./model/Account";

export interface AccountAPI {
    create: (account: Account) => Promise<Account>;
    getAll: () => Promise<Account[]>;
    getById: (id: string) => Promise<Account>;
    deleteById: (id: string) => Promise<void>;
    update: (account: Account) => Promise<Account>;
}