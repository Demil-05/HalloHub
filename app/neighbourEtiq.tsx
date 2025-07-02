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

  const handleAccordionPress = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  const faqData: { question: string; answer: string }[] = [
    {
      question: 'What are quiet hours (Ruhezeiten) in Germany and how do they affect me as a tenant?',
      answer:
        ' In Germany, strict quiet hours (Ruhezeiten) are part of daily life, especially in residential areas. These typically apply from 10 PM to 6 AM on weekdays, with all-day quiet on Sundays and public holidays. During these times, tenants are expected to avoid loud music, vacuuming, drilling, or any noisy activities. Even walking heavily on floors or doing laundry late at night can lead to complaints. If you ignore these rules, neighbors can report you to your landlord or even call the Ordnungsamt (local regulatory office), which can lead to official warnings or fines. Always check your rental agreement for house-specific quiet times too',
    },
    {
      question: 'Am I never allowed to have parties or play loud music?',
      answer:
        'Occasional small gatherings are fine, but regular loud parties can quickly become a problem. If you plan a party, inform your neighbors in advance and stick to quiet hours. Even with advance notice, you’re still legally required to reduce noise after 10 PM. For bigger events, some tenants post a small notice in the building hallway saying something like: "Small celebration on Saturday, sorry for any noise!" But legally, neighbors can still complain if the noise disturbs them.',
    },
    {
      question: 'How should I handle complaints from neighbors?',
      answer:
        'If a neighbor approaches you with a complaint, stay calm and listen carefully. Apologize and correct the issue immediately where possible (like turning down music or stopping loud activities). Repeated complaints could be reported to your landlord. In case the neighbor is being unreasonable or aggressive, document the interactions (dates and content) and, if needed, get legal advice from your student union or tenant association',
    },
    {
      question: 'Can I use shared spaces like hallways and balconies freely?',
      answer:
        'There are often building rules (Hausordnung) that cover shared spaces. For example: No blocking hallways with bikes or shoes. Keep balconies clean and avoid dripping water onto neighbors below. Do not barbecue on balconies without checking building policy (fire risk). Breaking these small rules can also lead to complaints or even penalties in some rental agreements.',
    },
  ];

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

      {/* ---------- HERO / BANNER ---------- */}
      <View style={styles.banner}>
        <Text>
            <Image source={require('./faq-img.png')} style={styles.image}/>
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