import {Transaction} from "../model/Transaction";

export interface TransactionAPI {
    create: (accountId: string, transaction: Transaction) => Promise<Transaction>;
}