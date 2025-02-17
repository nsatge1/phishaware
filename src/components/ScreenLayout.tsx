import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomNavigation  from './BottomNavigation';

const ScreenLayout = ({ title, children }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                  <Text style={styles.navItem}>🟰</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
          <Image
            source={require('../assets/logo.png')} // Assure-toi que l'image existe dans ce dossier
            style={styles.profileImage}
          />
        </View>

      {/* Contenu de la page */}
      <View style={styles.content}>
        {children}
      </View>

      {/* Barre de navigation */}
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#ddd',flexDirection: 'row',justifyContent: 'space-between',
      // Décalage uniquement pour iOS
          marginTop: Platform.OS === 'ios' ? 65 : 0,},
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  content: { flex: 1, padding: 16 },
  Item: {fontSize: 60},
  profileImage: {
      width: 60,
      height: 22,
      borderRadius: 20,
    },
});

export default ScreenLayout;