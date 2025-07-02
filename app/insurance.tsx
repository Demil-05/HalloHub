import React, { useState } from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, Animated, Easing, ScrollView, Dimensions } from 'react-native';
import { Appbar, List } from 'react-native-paper';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const InsuranceScreen: React.FC = () => {
  const router = useRouter();
  const [expanded, setExpanded] = useState<number | null>(null);
  const [flipAnim] = useState(new Animated.Value(0));
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const handlePressFAQ = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  const flipCard = (index: number) => {
    if (flippedIndex === index) {
      Animated.timing(flipAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start(() => setFlippedIndex(null));
    } else {
      setFlippedIndex(index);
      Animated.timing(flipAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start();
    }
  };

  const insuranceData = [
    {
      name: 'TK (Techniker Krankenkasse)',
      front: '✅ ~€120/month\n✅ English Support\n✅ Good App\n✅ Bonus Programs',
      back: '✅ Free preventive checkups\n✅ Dental coverage\n✅ Mental health programs\n✅ [Sign Up](https://www.tk.de/english)',
    },
    {
      name: 'AOK',
      front: '✅ ~€120/month\n✅ Local Offices Everywhere\n✅ Good for Families\n✅ Basic Coverage',
      back: '✅ Preventive health programs\n✅ Good doctor network\n✅ Less English Support\n✅ [Sign Up](https://www.aok.de/)',
    },
    {
      name: 'Barmer',
      front: '✅ ~€120/month\n✅ Good App\n✅ Fitness Programs\n✅ English Service Hotline',
      back: '✅ Digital doctor chat\n✅ Health bonus system\n✅ Good student support\n✅ [Sign Up](https://www.barmer.de/)',
    },
  ];

  const faqData = [
    {
      question: 'Do I need health insurance as a student?',
      answer: 'Yes! It’s mandatory for all students in Germany to have health insurance. You cannot enroll at university without proof.',
    },
    {
      question: 'What is the difference between public and private insurance?',
      answer: 'Public (gesetzliche) is affordable, covers most things, and has standardized costs. Private (private) may be cheaper short-term but expensive later. As a student, public insurance is usually safer.',
    },
    {
      question: 'When should I register?',
      answer: 'Before your university enrollment and definitely before your visa appointment. Your uni will ask for an insurance certificate.',
    },
    {
      question: 'Can I switch insurance later?',
      answer: 'Yes, but there are minimum membership periods (usually 12 months). Make sure to read cancellation rules first.',
    },
  ];

  const interpolatedFlip = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={styles.wrapper}>
      <Appbar.Header style={styles.appBar}>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Health Insurance Guide" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Text style={styles.sectionTitle}>Top Public Insurance Options 📋</Text>

        {insuranceData.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => flipCard(index)} activeOpacity={0.9}>
            <Animated.View
              style={[
                styles.card,
                flippedIndex === index && { transform: [{ rotateY: interpolatedFlip }] },
              ]}
            >
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardText}>
                {flippedIndex === index ? item.back : item.front}
              </Text>
              {flippedIndex === index && (
                <Text
                  style={styles.linkText}
                  onPress={() => Linking.openURL(item.back.match(/\((.*?)\)/)?.[1] || '')}
                >
                  ➡ Visit website
                </Text>
              )}
            </Animated.View>
          </TouchableOpacity>
        ))}

        <Text style={styles.sectionTitle}>Student Insurance FAQs 💡</Text>

        {faqData.map((item, index) => (
          <List.Accordion
            key={index}
            title={item.question}
            expanded={expanded === index}
            onPress={() => handlePressFAQ(index)}
            titleStyle={styles.accordionTitle}
            style={styles.accordion}
          >
            <List.Item title={item.answer} titleNumberOfLines={10} />
          </List.Accordion>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#E8F5E9', // Pastel green background
  },
  appBar: {
    backgroundColor: '#A5D6A7',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 20,
    color: '#1B5E20',
  },
  card: {
    backgroundColor: '#C8E6C9',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  cardText: {
    fontSize: 14,
    marginTop: 8,
    color: '#33691E',
  },
  linkText: {
    color: '#1E88E5',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  
  accordion: {
    backgroundColor: '#A5D6A7',
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 5,
  },
  accordionTitle: {
    color: '#1B5E20',
    fontWeight: 'bold',
  },
});

export default InsuranceScreen;