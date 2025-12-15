import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, TextInput, TouchableOpacity, Text, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Contact } from '../types';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

type Props = NativeStackScreenProps<RootStackParamList, 'Edit'>;

export default function EditScreen({ route, navigation }: Props) {
  const { id } = route.params;
  const [form, setForm] = useState<Contact>({ name: '', phone: '', email: '', note: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContact = async () => {
      try {
        const docSnapshot = await getDoc(doc(db, 'contacts', id));
        if (docSnapshot.exists()) {
          setForm(docSnapshot.data() as Contact);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load contact');
      } finally {
        setLoading(false);
      }
    };
    loadContact();
  }, [id]);

  const save = async () => {
    if (!form.name.trim() || !form.phone.trim()) {
      Alert.alert('Validation', 'Name and phone are required');
      return;
    }
    try {
      await updateDoc(doc(db, 'contacts', id), form);
      Alert.alert('Success', 'Contact updated');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update contact');
    }
  };

  if (loading) return <View style={styles.container}><Text>Loading...</Text></View>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={form.name}
          onChangeText={(text) => setForm({ ...form, name: text })}
        />
        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={form.phone}
          onChangeText={(text) => setForm({ ...form, phone: text })}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={form.email}
          onChangeText={(text) => setForm({ ...form, email: text })}
        />
        <Text style={styles.label}>Note</Text>
        <TextInput
          style={styles.input}
          placeholder="Note"
          value={form.note}
          onChangeText={(text) => setForm({ ...form, note: text })}
          multiline
        />
        <TouchableOpacity style={styles.saveBtn} onPress={save}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  center: { justifyContent: 'center' },
  label: { fontSize: 14, fontWeight: '600', marginTop: 12, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 8, marginBottom: 15 },
  saveBtn: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  saveText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
