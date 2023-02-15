import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";
const ExpenseItem = ({ id, description, amount, date }) => {
    const navigation = useNavigation();
    const expensePressHandler = () => {
        navigation.navigate("ManageExpense",{
            expenseId:id,
        })
    }
    return (
        <Pressable onPress={expensePressHandler} style={({ pressed }) => pressed && styles.pressed}>
            <View style={styles.expenseItem}>
                <View>
                    <Text style={[styles.textBase, styles.description]}>{description}</Text>
                    <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>{amount.toFixed(2)}</Text>
                </View>
            </View>
        </Pressable>
    );
};

export default ExpenseItem;
const styles = StyleSheet.create({
    expenseItem: {
        flexDirection: "row",
        justifyContent: 'space-between',
        padding: 12,
        marginVertical: 8,
        borderRadius: 6,
        backgroundColor: GlobalStyles.colors.primary500,
        elevation: 4,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
    },
    textBase: {
        color: GlobalStyles.colors.primary50,
    },
    description: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        minWidth: 80,
    },
    amount: {
        fontWeight: "bold",
        color: GlobalStyles.colors.primary500,
    },
    pressed: {
        opacity: 0.75,
    },
})