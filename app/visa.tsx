import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Appbar, List, ProgressBar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const VisaInfo: React.FC = () => {
  const router = useRouter();
  const [expanded, setExpanded] = useState<number | null>(null);
  const [tasks, setTasks] = useState([
    'Do Anmeldung (city registration)',
    'Get health insurance proof',
    'Open blocked account (Sperrkonto)',
    'Print all visa forms',
    'Collect biometric passport photos',
    'Book visa appointment',
    'Prepare financial proof (bank or scholarship)',
  ]);
  const [taskProgress, setTaskProgress] = useState<boolean[]>(Array(7).fill(false));
  const [newTask, setNewTask] = useState<string>('');

  const visaFAQ = [
    {
      question: 'Where do I book my visa appointment in Duisburg?',
      answer:
        'You need to book your appointment through the Ausländerbehörde Duisburg website. Appointments fill up fast, so check frequently. Emergency appointments are available for urgent cases.',
    },
    {
      question: 'What documents do I need for a student visa extension?',
      answer:
        'You’ll typically need your passport, a completed visa application form, your city registration (Anmeldung), proof of finances (blocked account or scholarship letter), university enrollment certificate, and health insurance proof.',
    },
    {
      question: 'How early should I book my appointment?',
      answer:
        'Ideally 2–3 months before your current visa expires. Duisburg appointments can take weeks to get, so don’t wait until the last minute!',
    },
    {
      question: 'What happens if I miss my visa deadline?',
      answer:
        'If you stay in Germany without a valid visa or residence permit, you risk fines or deportation. Contact the Ausländerbehörde immediately if you realize your visa will expire soon and you have no appointment.',
    },
  ];

  const checklist1 = [
    'Passport (valid)',
    'Biometric passport photos',
    'Completed visa application form',
    'Proof of finances (blocked account, scholarship, etc.)',
    'University enrollment certificate',
    'Health insurance certificate',
    'City registration (Anmeldung)',
  ];

  const toggleTask = (index: number) => {
    const updatedProgress = [...taskProgress];
    updatedProgress[index] = !updatedProgress[index];
    setTaskProgress(updatedProgress);
  };

  const addNewTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setTaskProgress([...taskProgress, false]);
      setNewTask('');
    }
  };

  const progress = taskProgress.filter((done) => done).length / taskProgress.length;

  const handleAccordionPress = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F0F8F5' }}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={28} onPress={() => router.back()} />
        <Text style={styles.logo}>Visa Info</Text>
        <Ionicons name="notifications-outline" size={26} />
      </View>

      <ScrollView contentContainerStyle={{ backgroundColor: '#F0F8F5', paddingBottom: 50 }}>
        {/* VISA FAQ */}
        <Text style={styles.sectionTitle}>📄 Visa FAQ – Duisburg</Text>
        <View style={styles.faqContainer}>
          {visaFAQ.map((item, index) => {
            const isOpen = expanded === index;
            return (
              <List.Accordion
                key={index}
                title={item.question}
                expanded={isOpen}
                onPress={() => handleAccordionPress(index)}
                titleStyle={styles.accordionTitle}
                style={[styles.accordion, isOpen && styles.accordionExpanded]}
                rippleColor="rgba(13,152,106,0.08)"
                theme={{ colors: { background: '#FFFFFF' } }} // override dark theme
              >
                <List.Item
                  title={item.answer}
                  titleNumberOfLines={20}
                  titleStyle={{ color: '#2E7D32' }}
                  style={{ backgroundColor: '#F7FDFB' }}
                />
              </List.Accordion>
            );
          })}
        </View>

        <View style={styles.break} />

        {/* CHECKLIST 1 */}
        <Text style={styles.sectionTitle}>👜 Checklist: What to Bring for Visa Appointment</Text>
        {checklist1.map((item, idx) => (
          <View key={idx} style={styles.listItem}>
            <Ionicons name="checkmark-circle-outline" size={20} color="#4CAF50" />
            <Text style={styles.listText}>{item}</Text>
          </View>
        ))}

        <View style={styles.break} />

        {/* CHECKLIST 2 */}
        <Text style={styles.sectionTitle}>✅ Legal Tasks To Do After Arrival</Text>
        {tasks.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={[styles.taskItem, taskProgress[idx] && styles.taskItemDone]}
            onPress={() => toggleTask(idx)}
          >
            <Ionicons
              name={taskProgress[idx] ? 'checkbox' : 'square-outline'}
              size={22}
              color={taskProgress[idx] ? '#4CAF50' : '#555'}
            />
            <Text
              style={[
                styles.taskText,
                taskProgress[idx] && { textDecorationLine: 'line-through', color: '#4CAF50' },
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Progress Bar */}
        <View style={{ marginTop: 16 }}>
          <Text style={{ textAlign: 'center' }}>{Math.round(progress * 100)}% Complete</Text>
          <ProgressBar
            progress={progress}
            color="#66BB6A"
            style={{ height: 10, borderRadius: 10, marginHorizontal: 16 }}
          />
        </View>

        {/* Add New Task */}
        <View style={styles.addTaskContainer}>
          <TextInput
            placeholder="Add new task..."
            value={newTask}
            onChangeText={setNewTask}
            style={styles.input}
            placeholderTextColor="#888"
          />
          <TouchableOpacity onPress={addNewTask} style={styles.addButton}>
            <Ionicons name="add" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default VisaInfo;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginTop: 40,
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  logo: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0D986A',
  },
  faqContainer: {
    backgroundColor: '#F0F8F5',
    paddingVertical: 10,
  },
  accordion: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#CDE9DF',
  },
  accordionExpanded: {
    backgroundColor: '#DEF3EB',
  },
  accordionTitle: {
    color: '#0D986A',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 18,
    marginBottom: 8,
    paddingHorizontal: 16,
    color: '#1B5E20',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    paddingHorizontal: 18,
  },
  listText: {
    marginLeft: 8,
    color: '#333',
  },
  break: {
    height: 1,
    backgroundColor: '#A5D6A7',
    marginVertical: 14,
    marginHorizontal: 20,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  taskItemDone: {
    backgroundColor: '#E8F5E9',
  },
  taskText: {
    marginLeft: 8,
    color: '#333',
  },
  addTaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginHorizontal: 16,
    marginBottom: 40,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#A5D6A7',
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#66BB6A',
    borderRadius: 6,
    marginLeft: 8,
    padding: 8,
  },
});
