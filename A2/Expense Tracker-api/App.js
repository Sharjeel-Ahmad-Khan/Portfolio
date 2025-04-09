import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import axios from 'axios';

// Mock API URL (using JSONPlaceholder as a simple mock API)
const API_URL = 'https://jsonplaceholder.typicode.com/todos'; // We'll adapt this for transactions

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('expense'); // Default to expense

  // Fetch initial mock transactions (simulating an API call)
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Using JSONPlaceholder as a mock, we'll hardcode initial data for simplicity
        const mockTransactions = [
          { id: 1, description: 'Salary', amount: 2000, category: 'Salary', type: 'income', date: '2025-03-01' },
          { id: 2, description: 'Groceries', amount: 150, category: 'Food', type: 'expense', date: '2025-03-02' },
          { id: 3, description: 'Bus Fare', amount: 20, category: 'Transport', type: 'expense', date: '2025-03-03' },
        ];
        setTransactions(mockTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    fetchTransactions();
  }, []);

  // Calculate totals using reduce
  const totals = transactions.reduce(
    (acc, trans) => {
      if (trans.type === 'income') {
        acc.totalIncome += trans.amount;
      } else if (trans.type === 'expense') {
        acc.totalExpenses += trans.amount;
      }
      return acc;
    },
    { totalIncome: 0, totalExpenses: 0 }
  );
  totals.balance = totals.totalIncome - totals.totalExpenses;

  // Add a new transaction
  const addTransaction = () => {
    if (!description || !amount || !category) {
      alert('Please fill in all fields');
      return;
    }
    const newTransaction = {
      id: Date.now(), // Unique ID based on timestamp
      description,
      amount: parseFloat(amount),
      category,
      type,
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    };
    setTransactions([...transactions, newTransaction]);
    setDescription('');
    setAmount('');
    setCategory('');
  };

  // Delete a transaction
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((trans) => trans.id !== id));
  };

  // Render transaction item
  const renderTransactionItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <Text style={styles.transactionText}>
        {item.description} - ${item.amount.toFixed(2)} ({item.category} - {item.type}) [{item.date}]
      </Text>
      <Button title="Delete" color="#dc3545" onPress={() => deleteTransaction(item.id)} />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Expense Tracker</Text>

      {/* Add Transaction Form */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Category (e.g., Food, Salary)"
          value={category}
          onChangeText={setCategory}
        />
        <View style={styles.typeContainer}>
          <Button
            title="Income"
            color={type === 'income' ? '#28a745' : '#ccc'}
            onPress={() => setType('income')}
          />
          <Button
            title="Expense"
            color={type === 'expense' ? '#dc3545' : '#ccc'}
            onPress={() => setType('expense')}
          />
        </View>
        <Button title="Add Transaction" onPress={addTransaction} />
      </View>

      {/* Summary Section */}
      <View style={styles.summary}>
        <Text style={[styles.summaryText, { color: '#28a745' }]}>
          Total Income: ${totals.totalIncome.toFixed(2)}
        </Text>
        <Text style={[styles.summaryText, { color: '#dc3545' }]}>
          Total Expenses: ${totals.totalExpenses.toFixed(2)}
        </Text>
        <Text style={[styles.summaryText, { fontWeight: 'bold' }]}>
          Balance: ${totals.balance.toFixed(2)}
        </Text>
      </View>

      {/* Transaction List */}
      <FlatList
        data={transactions}
        renderItem={renderTransactionItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>No transactions found.</Text>}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  formContainer: { backgroundColor: '#fff', padding: 15, borderRadius: 5, marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  typeContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summary: { backgroundColor: '#fff', padding: 15, borderRadius: 5, marginBottom: 20, alignItems: 'center' },
  summaryText: { fontSize: 16, marginVertical: 5 },
  transactionItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 10, 
    marginBottom: 10, 
    backgroundColor: '#fff', 
    borderRadius: 5 
  },
  transactionText: { fontSize: 14, flexShrink: 1 },
  emptyText: { textAlign: 'center', color: '#666', marginTop: 20 },
});

export default App;