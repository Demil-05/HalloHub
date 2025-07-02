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
      question: 'Should I pay a deposit before signing anything?',
      answer:
        'Never pay before you’ve seen the contract and fully understand the terms. Scammers often ask for upfront payments without official documentation.',
    },
    {
      question: 'What are red flags during a house viewing?',
      answer:
        'Be cautious if the landlord rushes you, avoids answering questions, or refuses to show paperwork like the rental contract or deposit terms.',
    },
    {
      question: 'What if the apartment looks different from the ad?',
      answer:
        'That’s a major warning sign. If the photos don’t match or the apartment seems like a completely different place, consider walking away.',
    },
    {
      question: 'How do I check if the landlord is legit?',
      answer:
        'Research the landlord online, ask for official ID, and check if their name matches the property ownership records if possible.',
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
        <Ionicons name="menu" size={28} />
        <Text style={styles.logo}>Hallo<Text style={styles.hub}>Hub</Text></Text>
        <Ionicons name="notifications-outline" size={26} />
      </View>

    <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Appbar.BackAction onPress={() => router.back()}/>

      {/* ---------- HERO / BANNER ---------- */}
      <View style={styles.banner}>
        <Text>
            <Image source={require('./faq-img.png')} style={styles.image}/>
        </Text>
      </View>
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
  header: {
      flexDirection: 'row',
      marginTop: 50,
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 2,
      justifyContent: 'space-between',
    },
    logo: { fontSize: 22, fontWeight: '700', color: '#98C13F' },

    hub: {
    color: '#0D986A' 
    },
  
    banner: {
      width: width - 20,
      height: 220,
      marginHorizontal: 18,
      marginTop: 20,
      marginLeft: 20,
      borderRadius: 10,
      resizeMode: 'cover',
      marginBottom: 20,
    },
    
  image: {
    width: width - 32,
    alignContent: 'center',
    height: 200,
    borderRadius: 10,
  },

  container: {
    flex: 1,
    backgroundColor: '#E8F5E9', // Light greenish background
    padding: 10,
  },
});

export default FAQScreen;