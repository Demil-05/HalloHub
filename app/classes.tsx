import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Appbar, Card } from 'react-native-paper';

const resources = [
  {
    title: 'Lehr-Moodle',
    url: 'https://lehre.moodle.uni-due.de/',
    description: 'Access your courses, materials, and assignments — all in one place.',
  },
  {
    title: 'HISinOne',
    url: 'https://campus.uni-due.de/cm/pages/cs/sys/portal/hisinoneStartPage.faces',
    description: 'Manage your student data, exam registrations, and more.',
  },
  {
    title: 'LSF',
    url: 'https://lsf.uni-due.de/',
    description: 'Browse course catalogs, schedules, and module overviews.',
  },
  {
    title: 'MyUDE App',
    url: 'https://www.uni-due.de/myude/',
    description: 'Your university in your pocket — grades, news, calendar, and more.',
  },
  {
    title: 'StudyDrive',
    url: 'https://www.studydrive.net/',
    description: 'Find shared notes, past exams, and connect with fellow students.',
  },
  {
    title: 'Studo',
    url: 'https://www.studo.com/',
    description: 'Organize your uni life: calendar, emails, to-dos, and more.',
  },
];

const ClassesScreen: React.FC = () => {
  const router = useRouter();

  const openLink = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      alert(`Cannot open URL: ${url}`);
    }
  };

  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle="dark-content" />

      <Appbar.Header style={styles.appBar}>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Classes & Tools" titleStyle={styles.headerTitle} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        {resources.map((item, index) => (
          <View key={index} style={styles.resourceContainer}>
            <Text style={styles.description}>{item.description}</Text>
            <TouchableOpacity onPress={() => openLink(item.url)}>
              <Card style={styles.card}>
                <View style={styles.cardContent}>
                  <Ionicons name="link-outline" size={22} color="#0D986A" />
                  <Text style={styles.linkText}>{item.title}</Text>
                </View>
              </Card>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#E8F5E9',
  },
  appBar: {
    backgroundColor: '#fff',
    elevation: 0,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#0D986A',
  },
  content: {
    padding: 16,
  },
  resourceContainer: {
    marginBottom: 20,
  },
  description: {
    fontSize: 20,
    color: '#0c1411',
    marginBottom: 6,
    paddingHorizontal: 8,
    fontStyle: 'italic',
  },
  card: {
    backgroundColor: '#C8E6C9',
    borderRadius: 10,
    elevation: 2,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
    color: '#1B5E20',
  },
});

export default ClassesScreen;