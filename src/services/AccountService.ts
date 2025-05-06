import {Account} from "../types/model/Account";
import {requestHandler} from "../utils/RequestHandler";
import {APIResponse} from "../types/APIResponse";

const req = requestHandler();

function assertIsAccounts(accountsData: unknown): asserts accountsData is Account[] {
    console.info("Executing assertIsAccounts");
    console.log(typeof accountsData);
    if (!Array.isArray(accountsData)) {
        throw new Error("Account is not an array");
    }

    if (accountsData?.length === 0) {
        throw new Error("Accounts is empty");
    }

    return;
}

function assertIsAccount(accountData: unknown): asserts accountData is Account {
    console.info("Executing assertIsAccount");
    console.log(typeof accountData);
    if (!Array.isArray(accountData)) {
        throw new Error("Received data is not an array");
    }

    if (accountData.length > 1) {
        throw new Error("Received more than 1 details");
    }

    return;
}

export async function createAccount(account: Account): Promise<Account> {
    console.info("Creating new account from main process");
    const response = await req.post<APIResponse>('api/accounts', {
        accountBalance: account.balance,
        accountAlias: account.alias,
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const {data} = response.data;
    assertIsAccount(data);
    return data[0];
}

export async function getAllAccounts(): Promise<Account[]> | null {
    console.info("Getting all accounts from main process");
    const response = await req.get<APIResponse>("/api/accounts");
    const {data} = response.data;
    assertIsAccounts(data);
    return data;
}

export async function getAccountById(accountId: string): Promise<Account> {
    console.info("Getting account by id from main process");
    const response = await req.get<APIResponse>(`/api/accounts/${accountId}`);
    const {data} = response.data;
    assertIsAccount(data);
    return data[0];
}

export async function updateAccount(account: Account, accountId: string): Promise<Account> {
    console.info("Updating account from main process");
    const response = await req.put<APIResponse>(`api/accounts/${accountId}`, {
        "accountAlias": account.alias,
        "accountBalance": account.balance,
    });
    const {data} = response.data;
    assertIsAccount(data);
    return data[0];
}

export async function deleteAccount(accountId: string): Promise<void> {
    console.info("Deleting account from main process");
    await req.delete<APIResponse>(`/api/accounts/${accountId}`);
    return new Promise(resolve => resolve());
}
