import React, {useEffect, useState} from 'react';
import {Account} from "../../types/model/Account";

const AccountPage: React.FC = () => {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Function to fetch account data
        const fetchAccounts = async () => {
            try {
                const response = await window.accountAPI.getAll();
                if (!response) {
                    throw new Error('Response was not found');
                }
                setAccounts(response); // Assuming data is an array of accounts
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchAccounts();
    }, []); // Empty dependency array means this runs once when the component mounts

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    async function fetchAccountById() {
        const res = await window.accountAPI.getById("ab087c6c-fb00-4504-8a77-ea8d66f94953");
        console.log(res);
    }

    return (
        <div>
            {accounts.map((account) => (
                <p key={account.accountId}>{account.alias}: {account.balance}</p> // Use a unique identifier for key
            ))}
            <button onClick={() => fetchAccountById()}>Get Account By Id</button>
        </div>
    );
};

export default AccountPage;