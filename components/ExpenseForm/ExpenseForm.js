import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Input from "./Input";
import Button from "../ui/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";
const ExpenseForm = ({
    onCancel,
    onSubmit,
    submitButtonLabel,
    defaultValue,
}) => {
    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValue ? defaultValue.amount.toString() : "",
            isValid: true,
        },
        date: {
            value: defaultValue ? getFormattedDate(defaultValue.date) : "",
            isValid: true,
        },
        description: {
            value: defaultValue ? defaultValue.description : "",
            isValid: true,
        },
    });
    const inputChangeHandler = (inputIdentifier, enteredValue) => {
        setInputs((currInputs) => {
            return {
                ...currInputs,
                [inputIdentifier]: { value: enteredValue, isValid: true },
            };
        });
    };
    const submitHandler = () => {
        expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value,
        };
        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== "Invalid Date";
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            // Alert.alert("Invalid input", "please check your input value");
            setInputs((currInputs) => {
                return {
                    amount: { value: currInputs.amount.value, isValid: amountIsValid },
                    date: { value: currInputs.date.value, isValid: dateIsValid },
                    description: {
                        value: currInputs.description.value,
                        isValid: descriptionIsValid,
                    },
                };
            });
            return;
        }
        onSubmit(expenseData);
    };
    const formIsInValid =
        !inputs.amount.isValid ||
        !inputs.date.isValid ||
        !inputs.description.isValid;
    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input
                    style={styles.rowInput}
                    label="Amount"
                    invalid={!inputs.amount.isValid}
                    textInputConfig={{
                        keyboardType: "decimal-pad",
                        onChangeText: inputChangeHandler.bind(this, "amount"),
                        value: inputs.amount.value,
                    }}
                />
                <Input
                    style={styles.rowInput}
                    label="Date"
                    invalid={!inputs.date.isValid}
                    textInputConfig={{
                        placeholder: "YYYY-MM-DD",
                        maxLength: 10,
                        onChangeText: inputChangeHandler.bind(this, "date"),
                        value: inputs.date.value,
                    }}
                />
            </View>
            <Input
                label="Description"
                invalid={!inputs.description.isValid}
                textInputConfig={{
                    multiline: true,
                    onChangeText: inputChangeHandler.bind(this, "description"),
                    value: inputs.description.value,
                    // autoCorrect:false,// default true
                    // autoCapitalize:word,// default sentence
                }}
            />
            {formIsInValid && (
                <Text style={styles.errorText}>Invalid input values - please check your entered data!</Text>
            )}
            <View style={styles.buttonsContainer}>
                <Button style={styles.button} mode="flat" onPress={onCancel}>
                    Cancel
                </Button>
                <Button style={styles.button} onPress={submitHandler}>
                    {submitButtonLabel}
                </Button>
            </View>
        </View>
    );
};

export default ExpenseForm;
const styles = StyleSheet.create({
    form: {
        marginTop: 40,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
        marginVertical: 24,
    },
    inputsRow: {
        flexDirection: "row",
        justifyContent: "center",
    },
    rowInput: {
        flex: 1,
    },
    errorText: {
        textAlign: "center",
        color: GlobalStyles.colors.error500,
        margin: 8,
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16,
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
});
