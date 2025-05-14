import {Transaction} from "../types/model/Transaction";
import {requestHandler} from "../utils/RequestHandler";
import {APIResponse} from "../types/APIResponse";

const req = requestHandler();

function assertIsTransaction(transactionData: unknown): asserts transactionData is Transaction {
    console.info("Executing assertIsTransaction")
    if (!Array.isArray(transactionData)) {
        throw new Error("Expected an array of objects");
    }

    if (transactionData.length > 1) {
        throw new Error("Expected array of objects");
    }

}

export async function createTransaction(accountId: string, transaction: Transaction) {
    console.info("Creating new transaction...");
    const response = await req.post<APIResponse>(`/api/${accountId}/transaction`, transaction);
    const {data} = response.data;
    assertIsTransaction(data);
    return data[0];
}