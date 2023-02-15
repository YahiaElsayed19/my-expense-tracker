import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import { ExpenseContext } from "../store/expenses-context";
import { getDataMinusDate } from "../util/date";
import { fetchExpenses } from "../util/http";
const RecentExpenses = () => {
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState()
    const expensesCtx = useContext(ExpenseContext);
    useEffect(() => {
        async function getExpenses() {
            setIsFetching(true)
            try {
                const expenses = await fetchExpenses();
                expensesCtx.setExpenses(expenses)
            } catch (error) {
                setError("Could not fetch expenses")
            }
            setIsFetching(false)
        }
        getExpenses();
    }, []);
    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDataMinusDate(today, 7);
        return expense.date > date7DaysAgo;
    });
    if (isFetching) {
        return <LoadingOverlay />
    }

    if (error && !isFetching) {
        return <ErrorOverlay message={error} />
    }
    return (
        <ExpensesOutput
            expensesPeriod="Last 7 days"
            expenses={recentExpenses}
            fallBackText="No expenses registered for the last 7 days"
        />
    );
};

export default RecentExpenses;
