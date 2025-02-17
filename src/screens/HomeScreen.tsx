import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ScreenLayout from '../components/ScreenLayout';
import axios from 'axios';
import { API_KEY_NEWS } from '@env';


const HomeScreen = () => {
  const navigation = useNavigation();
  const [lastScore, setLastScore] = useState<number | null>(null);
  const [latestNews, setLatestNews] = useState(null);
  useEffect(() => {
      const fetchLastScore = async () => {
        try {
          const storedScore = await AsyncStorage.getItem('lastQuizScore');
          if (storedScore !== null) {
            setLastScore(parseInt(storedScore, 10));
          }
        } catch (error) {
          console.error('Erreur en récupérant le score:', error);
        }
      };

      fetchLastScore();
  }, []);


  useEffect(() => {
      // Récupérer la dernière news depuis l'API
      const fetchLatestNews = async () => {
        try {
          const response = await axios.get(
            `https://newsapi.org/v2/everything?q=phishing&apiKey=${API_KEY_NEWS}`
          );
          const articles = response.data.articles;
          if (articles.length > 0) {
            setLatestNews(articles[0]); // Prend la première news
          }
        } catch (error) {
          console.error('Erreur en récupérant les actualités:', error);
        }
      };

      fetchLatestNews();
    }, []);


  return (
    <ScreenLayout title="PhishAware">
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome to PhishAware 🚀</Text>
      </View>

      <View style={styles.scoreContainer}>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreText}>🏆 Your Score : {lastScore !== null ? lastScore : 'Null'}%</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Quiz')}>
          <Text style={styles.buttonText}>Start Training</Text>
        </TouchableOpacity>
        {/* Carte de la dernière news avec image */}
          {latestNews && (
            <TouchableOpacity
              onPress={() => navigation.navigate('News')}
              style={styles.cardContainer}
            >
              {latestNews.urlToImage && (
                <Image
                  source={{ uri: latestNews.urlToImage }}
                  style={styles.cardImage}
                />
              )}
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>📰 {latestNews.title}</Text>
                <Text style={styles.cardDescription}>{latestNews.description}</Text>
                <Text style={styles.cardLink}>Voir plus...</Text>
              </View>
            </TouchableOpacity>
          )}
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  welcomeText: {
      fontSize: 24,
      fontWeight: 'bold',
    },
  subtitle: {
    fontSize: 16,
    color: 'gray',
  },
  scoreContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  scoreBox: {
    backgroundColor: '#E3E7ED',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#2E76F1',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  // Styles pour la carte de la news
    cardContainer: {
          padding: 15,
          borderWidth: 1,
          borderRadius: 10,
          marginVertical: 10,
          backgroundColor: '#f8f8f8',
          marginTop: 20,
        },
        cardImage: {
          width: 340,
          height: 200,
          padding: 10,
          borderRadius: 10,
        },
        cardTextContainer: {
          padding: 10,
        },
        cardTitle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        cardDescription: {
          fontSize: 14,
          color: '#555',
          marginTop: 5,
        },
        cardLink: {
          color: 'blue',
          marginTop: 5,
        },

});

export default HomeScreen;
