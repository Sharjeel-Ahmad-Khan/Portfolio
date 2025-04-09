import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LineChart } from 'react-native-chart-kit';

// Dummy Data
const transactions = [
  { id: '1', type: 'expense', category: 'Food', amount: 50, date: '2023-10-01' },
  { id: '2', type: 'income', category: 'Salary', amount: 2000, date: '2023-10-05' },
  { id: '3', type: 'expense', category: 'Transport', amount: 30, date: '2023-10-10' },
];

const spendingData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [500, 600, 700, 800, 900, 1000],
      color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
    },
  ],
};

// Dashboard Screen
const DashboardScreen = () => {
  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryText}>Total Income: ${totalIncome}</Text>
        <Text style={styles.summaryText}>Total Expenses: ${totalExpenses}</Text>
        <Text style={styles.summaryText}>Net Savings: ${totalIncome - totalExpenses}</Text>
      </View>
    </View>
  );
};

// Add Expense Screen
const AddExpenseScreen = ({ navigation }) => {
  const [amount, setAmount] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [date, setDate] = React.useState('');

  const handleAddExpense = () => {
    const newExpense = {
      id: String(transactions.length + 1),
      type: 'expense',
      category,
      amount: parseFloat(amount),
      date,
    };
    transactions.push(newExpense);
    navigation.navigate('Transactions');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Expense</Text>
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <Button title="Add Expense" onPress={handleAddExpense} />
    </View>
  );
};

// Transactions List Screen
const TransactionsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionCard}>
            <Text style={styles.transactionText}>
              {item.type === 'expense' ? 'Expense' : 'Income'}: {item.category}
            </Text>
            <Text style={styles.transactionText}>Amount: ${item.amount}</Text>
            <Text style={styles.transactionText}>Date: {item.date}</Text>
          </View>
        )}
      />
    </View>
  );
};

// Reports & Analytics Screen
const ReportsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reports & Analytics</Text>
      <LineChart
        data={spendingData}
        width={350}
        height={220}
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        }}
        bezier
      />
    </View>
  );
};

// Budget Settings Screen
const BudgetScreen = () => {
  const [budget, setBudget] = React.useState('');

  const handleSetBudget = () => {
    alert(`Budget set to $${budget}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Budget Settings</Text>
      <TextInput
        style={styles.input}
        placeholder="Monthly Budget"
        keyboardType="numeric"
        value={budget}
        onChangeText={setBudget}
      />
      <Button title="Set Budget" onPress={handleSetBudget} />
    </View>
  );
};

// Profile & Theme Settings Screen
const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile & Settings</Text>
      <Text style={styles.sectionTitle}>User Preferences</Text>
      <Text style={styles.profileText}>Name: SHARJEEL AHMAD KHAN </Text>
      <Text style={styles.profileText}>Email: Shargeel.8163@gmail.com</Text>
      <Button title="Change Theme" onPress={() => alert('Theme Changed')} />
    </View>
  );
};

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Dashboard') iconName = 'home';
        else if (route.name === 'AddExpense') iconName = 'plus';
        else if (route.name === 'Transactions') iconName = 'list';
        else if (route.name === 'Reports') iconName = 'bar-chart';
        else if (route.name === 'Budget') iconName = 'money';
        else if (route.name === 'Profile') iconName = 'user';
        return <Icon name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: '#007bff',
      inactiveTintColor: '#ccc',
    }}
  >
    <Tab.Screen name="Dashboard" component={DashboardScreen} />
    <Tab.Screen name="AddExpense" component={AddExpenseScreen} />
    <Tab.Screen name="Transactions" component={TransactionsScreen} />
    <Tab.Screen name="Reports" component={ReportsScreen} />
    <Tab.Screen name="Budget" component={BudgetScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

// Navigation Setup
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  summaryCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  transactionCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  transactionText: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  profileText: {
    fontSize: 16,
    marginBottom: 8,
  },
});