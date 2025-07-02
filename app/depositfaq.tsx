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
      question: 'What is the purpose of a rental deposit (Kaution) in Germany?',
      answer:
        ' The rental deposit (Kaution) is a financial safety for landlords, usually equal to 2-3 months cold rent (without utilities). It covers unpaid rent, damages, or missing keys when you move out. By law, landlords must keep this deposit in a separate, interest-bearing account and return it (plus interest) within 6 months to 1 year after you move out, depending on whether there are unresolved issues like utility bill finalization.',
    },
    {
      question: 'How can I ensure I get my full deposit back?',
      answer:
        'Before moving out: Deep clean the apartment (floors, kitchen appliances, windows, bathroom tiles, etc.). Repair small damages (fill nail holes, replace broken light bulbs, fix paint scratches if required by your contract). Check your contract: Some contracts require professional painting or carpet cleaning. Attend a final inspection (Übergabeprotokoll) with your landlord and ask for a signed copy noting the apartments condition.',
    },
    {
      question: ' What should I expect during the final apartment inspection?',
      answer:
        'The landlord will walk through the apartment and check for: Damage beyond normal wear and tear ,Cleanliness, Any missing items (e.g., light fixtures, shelves that were part of the original rental), Make sure you do the walk-through together, and request a written handover protocol. This document protects you from being blamed for future damages.',
    },
    {
      question: 'How long will it take to get my deposit back?',
      answer:
        'Landlords in Germany are allowed up to 6 months (sometimes up to 12 months) to return your deposit. This time is mainly to settle pending costs like utility bills (Nebenkosten). If after a reasonable time you don’t get it back and there’s no explanation, send a formal written demand. If that doesn’t help, contact a tenant protection association (Mieterverein) for legal help.',
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
        <Appbar.BackAction onPress={() => router.back()} />

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