// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import {ipcRenderer, contextBridge} from "electron";
import {AccountAPI} from "./types/AccountAPI";
import {Account} from "./types/model/Account";

const accountAPI: AccountAPI = {
    getAll: async (): Promise<Account[]> => await ipcRenderer.invoke("Account:getAll"),
    getById: async (id): Promise<Account> => await ipcRenderer.invoke("Account:getById", id),
}

contextBridge.exposeInMainWorld("accountAPI", accountAPI);
