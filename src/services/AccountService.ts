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

export async function getAllAccounts(): Promise<Account[]> | null {
    console.info("Getting all accounts from main process");
    const response = await req.get<APIResponse>("/api/accounts");
    const {data} = response.data;
    assertIsAccounts(data);
    return data;
}

export async function getAccountById(accountId: string): Promise<Account> {
    console.info("Getting account by id from main process");
    const response = await req.get(`/api/accounts/${accountId}`);
    const {data} = response.data;
    return data;
}