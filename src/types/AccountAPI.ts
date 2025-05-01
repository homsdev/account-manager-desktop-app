import {Account} from "./model/Account";

export interface AccountAPI {
    getAll: () => Promise<Account[]>;
    getById: (id: string) => Promise<Account>;
}