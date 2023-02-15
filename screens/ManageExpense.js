import { useContext, useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import ExpenseForm from "../components/ExpenseForm/ExpenseForm";
import LoadingOverlay from '../components/ui/LoadingOverlay'
import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpenseContext } from "../store/expenses-context";
import { deleteExpenses, storeExpense, updateExpenses } from "../util/http";
import ErrorOverlay from "../components/ui/ErrorOverlay";
const ManageExpense = ({ route, navigation }) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState()
    const expensesCtx = useContext(ExpenseContext);
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;
    const selectedExpense = expensesCtx.expenses.find((expense) => expense.id === editedExpenseId)
    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense",
        });
    }, [isEditing, navigation]);
    async function deleteExpenseHandler() {
        setIsSubmitting(true)
        try {
            await deleteExpenses(editedExpenseId)
            expensesCtx.deleteExpense(editedExpenseId);
            navigation.goBack();
        } catch (error) {
            setError("Could not delete expense - please try again later!")
            setIsSubmitting(false)
        }
    };
    const cancelExpenseHandler = () => {
        navigation.goBack();
    };
    async function confirmExpenseHandler(expenseData) {
        setIsSubmitting(true)
        try {
            if (isEditing) {
                expensesCtx.updateExpense(editedExpenseId, expenseData);
                await updateExpenses(editedExpenseId, expenseData)
            } else {
                const id = await storeExpense(expenseData)
                expensesCtx.addExpense({ ...expenseData, id: id });
            }
            navigation.goBack();
        } catch (error) {
            setError("Could not save data - please try again later!")
            setIsSubmitting(false)
        }
    };
    if (isSubmitting) {
        return <LoadingOverlay />
    }

    if (error && !isSubmitting) {
        return <ErrorOverlay message={error}/>
    }
    return (
        <View style={styles.container}>
            <ExpenseForm
                onCancel={cancelExpenseHandler}
                onSubmit={confirmExpenseHandler}
                submitButtonLabel={isEditing ? "Upadte" : "Add"}
                defaultValue={selectedExpense}
            />
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon="trash"
                        color={GlobalStyles.colors.error500}
                        size={36}
                        onPress={deleteExpenseHandler}
                    />
                </View>
            )}
        </View>
    );
};

export default ManageExpense;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: "center",
    },
});
