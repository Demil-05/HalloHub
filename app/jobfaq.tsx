import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Appbar, List } from 'react-native-paper';

const { width } = Dimensions.get('window');

const FAQScreen: React.FC = () => {
  const router = useRouter();
  const [expanded, setExpanded] = useState<number | null>(null);

  const handlePress = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  const faqData = [
    {
      question: 'Where can I find part-time student jobs?',
      answer:
        'Check websites like jobmensa.de, studentjob.de, and your university’s internal job portal.',
    },
    {
      question: 'Can international students work in Germany?',
      answer:
        'Yes, but there are limits. Typically, non-EU students can work 120 full days or 240 half days per year without special permission.',
    },
    {
      question: 'What is a HiWi job?',
      answer:
        '"HiWi" stands for Hilfswissenschaftler/in, meaning a student assistant. These jobs are usually research, tutoring, or office support roles at your university.',
    },
    {
      question: 'Where can I find job search support?',
      answer:
        'Check your university’s career center, attend job fairs, and join student Facebook or WhatsApp groups where people often post job openings.',
    },
  ];

  const handleAccordionPress = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle="dark-content" />

      {/* ---------- HEADER ---------- */}
      <View style={styles.header}>
        <Ionicons name="menu" size={28} />
        <Text style={styles.logo}>
          Hallo<Text style={styles.hub}>Hub</Text>
        </Text>
        <Ionicons name="notifications-outline" size={26} />
      </View>

      {/* ---------- BACK ACTION ---------- */}
      <Appbar.Header style={styles.appBar}>
        <Appbar.BackAction onPress={() => router.back()} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* ---------- HERO / BANNER ---------- */}
        <View style={styles.banner}>
          <Image source={require('./websites-img.png')} style={styles.image} />
        </View>

        {/* ---------- FAQ ACCORDIONS ---------- */}
        <View style={styles.faqContainer}>
          {faqData.map((item, index) => {
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#E8F5E9',
  },
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
  hub: {
    color: '#0D986A',
  },
  appBar: {
    backgroundColor: '#fff',
    height: 30,
    elevation: 0,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  banner: {
    width: width - 32,
    height: 180,
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width - 32,
    height: 180,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  container: {
    paddingHorizontal: 10,
    paddingTop: 6,
  },
});

export default FAQScreen;
