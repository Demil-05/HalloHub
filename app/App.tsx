// App.tsx
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

type CategoryKey = 'uni' | 'housing' | 'legal' | 'jobs' | 'merch';

interface CardData {
  title: string;
  subtitle: string;
}

interface Category {
  key: CategoryKey;
  label: string;
  icon: string; // Icon name for MaterialCommunityIcons or Ionicons
  cards: CardData[];
  accent: string; // color for highlight
}

// ------------------------------
// Content definition per category
// ------------------------------
const CATEGORIES: Category[] = [
  {
    key: 'uni',
    label: 'Uni',
    icon: 'school-outline',
    accent: '#009688',
    cards: [
      { title: 'Classes and Exams', subtitle: 'Stay on top of your study schedule' },
      { title: 'Events and Social Media', subtitle: 'Connect with student groups' },
      { title: 'Registration Tips', subtitle: 'Must‑know shortcuts' },
      { title: 'Scholarships', subtitle: 'Find funding opportunities' },
    ],
  },
  {
    key: 'housing',
    label: 'Housing',
    icon: 'home-outline',
    accent: '#FFC107',
    cards: [
      { title: 'Websites', subtitle: 'Where to search flats' },
      { title: 'Landlord Warning Signs', subtitle: 'Know before you sign' },
      { title: 'Neighbour Etiquette', subtitle: 'Live in harmony' },
      { title: 'Deposit Checklist', subtitle: 'Get your money back' },
    ],
  },
  {
    key: 'legal',
    label: 'Legal',
    icon: 'scale-balance',
    accent: '#673AB7',
    cards: [
      { title: 'Visa Basics', subtitle: 'Permits explained' },
      { title: 'Work Regulations', subtitle: 'Student jobs 101' },
      { title: 'Insurance', subtitle: 'Health & liability' },
      { title: 'Templates', subtitle: 'Letters & more' },
    ],
  },
  {
    key: 'jobs',
    label: 'Jobs',
    icon: 'briefcase-outline',
    accent: '#3F51B5',
    cards: [
      { title: 'CV Templates', subtitle: 'German‑style CV' },
      { title: 'Interview Prep', subtitle: 'Common questions' },
      { title: 'Networking Events', subtitle: 'Meet recruiters' },
      { title: 'Websites and FAQs', subtitle: 'Find what is meant for you' },
    ],
  },
  {
    key: 'merch',
    label: 'Merch',
    icon: 'cart-outline',
    accent: '#795548',
    cards: [
      { title: 'Discount Partners', subtitle: 'Save money' },
      { title: 'Uni Hoodies', subtitle: 'Rep your faculty' },
      { title: 'Starter Kits', subtitle: 'First‑semester box' },
      { title: 'More Deals', subtitle: 'Flash sales' },
    ],
  },
];

export default function App() {
  const [selected, setSelected] = useState<CategoryKey>('uni');

  const currentCategory = CATEGORIES.find((c) => c.key === selected)!;
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* ---------- HEADER ---------- */}
      <View style={styles.header}>
        <Ionicons name="menu" size={28} />
        <Text style={styles.logo}>Hallo<Text style={styles.hub}>Hub</Text></Text>
        <Ionicons name="notifications-outline" size={26} />
      </View>

      {/* ---------- HERO / BANNER ---------- */}
      <View style={styles.banner}>
        <Text>
            <Image source={require('./banner-img.png')} style={styles.image}/>
        </Text>
      </View>

        

    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
      {/* ---------- SEARCH BOX ---------- */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#777" style={{ marginRight: 6 }} />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#999"
          style={{ flex: 1, paddingVertical: 0 }}
        />
        <Ionicons name="scan-outline" size={22} color="#777" />
      </View>

      {/* ---------- CATEGORY TABS ---------- */}
      <FlatList
        data={CATEGORIES}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabList}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setSelected(item.key)}
          >
            <MaterialCommunityIcons
              name={item.icon as any}
              size={24}
              color={selected === item.key ? item.accent : '#444'}
            />
            <Text
              style={[
                styles.tabLabel,
                selected === item.key && { color: item.accent, fontWeight: '600' },
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* ---------- CONTENT CARDS ---------- */}
      {currentCategory.cards.map((card) => (
        <TouchableOpacity
          key={card.title}
          style={styles.card}
          onPress={() => {
            if (card.title === 'Landlord Warning Signs' && selected === 'housing') {
              router.push('/warningSigns');
            } 
            else if ( selected==='legal' && card.title === 'Visa Basics') {
              router.push('/visa')
            } 
            else if ( selected==='legal' && card.title === 'Visa Basics') {
              router.push('/visa')
            } 
            else if ( selected==='legal' && card.title === 'Insurance') {
              router.push('/insurance')
            } 
            else if ( selected==='legal') {
              router.push('/legalfaq')
            } 
            else if ( selected==='housing' && card.title== 'Neighbour Etiquette') {
              router.push('/neighbourEtiq')
            }
            else if ( selected==='housing' && card.title== 'Deposit Checklist') {
              router.push('/depositfaq')
            }
            else if ( selected==='jobs' && card.title== 'Websites and FAQs') {
              router.push('/jobfaq')
            }
            else if ( selected==='uni' && card.title== 'Classes and Exams') {
              router.push('/classes')
            }
          }}
        >
          <View style={[styles.cardAccent, { backgroundColor: currentCategory.accent }]} />
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{card.title}</Text>
            <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
          </View>
          <View style={styles.cardAction}>
            <Ionicons name="add" size={26} />
          </View>
        </TouchableOpacity>
      ))}

      </ScrollView>

      {/* ---------- BOTTOM NAVIGATION (placeholder) ---------- */}
     <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => router.push('/')}>
          <Ionicons name="home" size={24} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/map')}>
          <Ionicons name="location" size={24} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="person-outline" size={24} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ------------------------------
// Styles
// ------------------------------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    marginTop: 40,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 4,
    justifyContent: 'space-between',
  },
  logo: { fontSize: 22, fontWeight: '700', color: '#98C13F'},
  hub: {
    color: '#0D986A' 
  },

  banner: {
    width: width - 32,
    height: 220,
    marginHorizontal: 18,
    backgroundColor: '#F9D7BD',
    marginTop: 20,
    borderRadius: 10,
    resizeMode: 'cover',
    marginBottom: 20,
    flexDirection: 'row', 
    flexWrap: 'wrap',
  },
  
  image: {
    width: width - 32,
    height: 220,
    borderRadius: 10,
  },

  bannerTitle: { fontSize: 20, fontWeight: '700', color: '#1E1E1E' },
  bannerSubtitle: { marginTop: 4, fontSize: 14, color: '#333' },

  searchBox: {
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 42,
  },

  tabList: { paddingHorizontal: 12, marginTop: 12 },
  tab: { alignItems: 'center', marginHorizontal: 23 },
  tabLabel: { fontSize: 12, marginTop: 4, color: '#444' },

  card: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 14,
    borderRadius: 14,
    backgroundColor: '#E6F2ED',
    overflow: 'hidden',
  },

  cardAccent: { width: 4, height: '100%' },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    paddingHorizontal: 12,
    paddingTop: 16,
  },
  cardSubtitle: { fontSize: 13, color: '#555', paddingHorizontal: 12, paddingBottom: 8 },
  cardAction: {
    width: 54,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff3',
    borderLeftWidth: 1,
    borderLeftColor: '#ddd',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
});