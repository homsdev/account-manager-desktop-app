// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import {ipcRenderer, contextBridge} from "electron";
import {AccountAPI} from "./types/api/AccountAPI";
import {Account} from "./types/model/Account";
import {TransactionAPI} from "./types/api/TransactionAPI";
import {Transaction} from "./types/model/Transaction";

const accountAPI: AccountAPI = {
    create: async (account: Account): Promise<Account> => await ipcRenderer.invoke("Account:save", account),
    getAll: async (): Promise<Account[]> => await ipcRenderer.invoke("Account:getAll"),
    getById: async (id): Promise<Account> => await ipcRenderer.invoke("Account:getById", id),
    deleteById: async (id: string): Promise<void> => await ipcRenderer.invoke("Account:deleteById", id),
    update: async (account: Account, accountId: string): Promise<Account> =>
        await ipcRenderer.invoke("Account:update", account, accountId),
}

const transactionAPI: TransactionAPI = {
    create: async (accountId: string, transaction: Transaction) =>
        await ipcRenderer.invoke("Transaction:create", accountId, transaction)
}

contextBridge.exposeInMainWorld("accountAPI", accountAPI);
contextBridge.exposeInMainWorld("transactionAPI", transactionAPI);