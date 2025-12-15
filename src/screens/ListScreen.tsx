import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, TextInput, TouchableOpacity, FlatList, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Contact } from '../types';
import { db } from '../firebase';
import { ref, push, remove, onValue } from 'firebase/database';
import { MaterialIcons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'List'>;

export default function ListScreen({ navigation }: Props) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [form, setForm] = useState({ name: '', phone: '', email: '', note: '' });

  useEffect(() => {
    if (!db) {
      console.error('Database not initialized');
      Alert.alert('Error', 'Database connection failed');
      return;
    }
    try {
      const contactsRef = ref(db, 'contacts');
      const unsubscribe = onValue(contactsRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const contactArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          })) as Contact[];
          setContacts(contactArray);
        } else {
          setContacts([]);
        }
      });
      return unsubscribe;
    } catch (error) {
      console.error('Error setting up listener:', error);
      Alert.alert('Error', 'Failed to load contacts');
    }
  }, []);

  const add = async () => {
    if (!form.name.trim() || !form.phone.trim()) {
      Alert.alert('Validation', 'Name and phone are required');
      return;
    }
    try {
      const contactsRef = ref(db, 'contacts');
      await push(contactsRef, {
        ...form,
        createdAt: new Date().toISOString(),
      });
      setForm({ name: '', phone: '', email: '', note: '' });
      Alert.alert('Success', 'Contact added');
    } catch (error) {
      Alert.alert('Error', 'Failed to add contact');
    }
  };

  const deleteContact = async (id: string) => {
    try {
      const contactRef = ref(db, `contacts/${id}`);
      await remove(contactRef);
      Alert.alert('Success', 'Contact deleted');
    } catch (error) {
      Alert.alert('Error', 'Failed to delete contact');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={form.name}
          onChangeText={(text) => setForm({ ...form, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={form.phone}
          onChangeText={(text) => setForm({ ...form, phone: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={form.email}
          onChangeText={(text) => setForm({ ...form, email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Note"
          value={form.note}
          onChangeText={(text) => setForm({ ...form, note: text })}
        />
        <TouchableOpacity style={styles.addBtn} onPress={add}>
          <Text style={styles.addText}>Add Contact</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id || ''}
        renderItem={({ item }) => (
          <View style={styles.contactItem}>
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{item.name}</Text>
              <Text style={styles.contactPhone}>{item.phone}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Edit', { id: item.id! })}>
              <MaterialIcons name="edit" size={24} color="#007AFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteContact(item.id!)}>
              <MaterialIcons name="delete" size={24} color="#FF3B30" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  form: { padding: 20, backgroundColor: '#fff' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 8, marginBottom: 10 },
  addBtn: { backgroundColor: '#34C759', padding: 12, borderRadius: 8, alignItems: 'center' },
  addText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  contactItem: { flexDirection: 'row', padding: 15, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee', alignItems: 'center' },
  contactInfo: { flex: 1 },
  contactName: { fontSize: 16, fontWeight: '600' },
  contactPhone: { fontSize: 14, color: '#666', marginTop: 4 },
});
