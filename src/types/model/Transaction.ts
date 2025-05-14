export interface Transaction {
    transactionId?: string;
    amount: number;
    type: string;
    date: string;
    description: string;
}