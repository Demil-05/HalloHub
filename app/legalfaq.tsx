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

  const faqData: { question: string; answer: string }[] = [
    {
      question: 'What should I do if I get a public transport fine?',
      answer:
        ' Pay it before the deadline to avoid late fees. You’ll get payment details on the fine notice. If you think it was a mistake, contact the transport authority quickly.',
    },
    {
      question: 'Can I contest a fine?',
      answer:
        'Yes, but act fast. Write a formal email explaining your situation and provide evidence (like a valid ticket if you had one but forgot it).',
    },
    {
      question: ' Where can I get help with legal issues as a student?',
      answer:
        'Your university often has a student advice center or legal aid for students. Some student unions (AStA) offer free legal consultations.',
    },
    {
      question: 'What happens if I ignore a fine?',
      answer:
        'Ignoring a fine can lead to higher penalties, debt collection, or legal action. Always deal with fines as soon as possible.',
    },
  ];

  const handleAccordionPress = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  return (

    <View>

      <StatusBar barStyle="dark-content" />

      {/* ---------- HEADER ---------- */}
      
    <View style={styles.header}>
     <Ionicons name="arrow-back" size={28} onPress={() => router.back()} />
     <Text style={styles.logo}>Legal Processes FAQs</Text>
     <Ionicons name="notifications-outline" size={26} />
    </View>

    <ScrollView contentContainerStyle={{flexGrow: 1}}>

      {/* ---------- HERO / BANNER ---------- */}
      <View style={styles.banner}>
        <Text>
            <Image source={require('./legal-img.png')} style={styles.image}/>
        </Text>
      </View>

      <ScrollView style={styles.container}>
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
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({

  header: {
      flexDirection: 'row',
      marginTop: 50,
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 2,
      justifyContent: 'space-between',
    },
    
    logo: { fontSize: 22, fontWeight: '700', color: '#98C13F' },

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
    color: '#0D986A' 
    },
  
    banner: {
      width: width - 32,
      height: 180,
      marginHorizontal: 18,
      backgroundColor: '#fff',
      marginTop: 20,
      borderRadius: 10,
      resizeMode: 'cover',
      marginBottom: 10,
      flexDirection: 'row', 
      flexWrap: 'wrap',
    },
    
  image: {
    width: width - 32,
    height: 180,
    borderRadius: 10,
  },
  
  bannerTitle: { fontSize: 20, fontWeight: '700', color: '#1E1E1E' },
  bannerSubtitle: { marginTop: 4, fontSize: 14, color: '#333' },

  container: {
    flex: 1,
    backgroundColor: '#E8F5E9', // Light greenish background
    padding: 10,
  },
});

export default FAQScreen;