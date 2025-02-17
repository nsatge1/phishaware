import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import ScreenLayout from '../components/ScreenLayout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const saveQuizScore = async (score: number) => {
  try {
    await AsyncStorage.setItem('lastQuizScore', score.toString());
  } catch (error) {
    console.error('Erreur en sauvegardant le score:', error);
  }
};

const questions = [
  { text: "Votre compte PayPal est suspendu. Cliquez ici pour réactiver.", isPhishing: true },
  { text: "Votre banque vous informe d'une transaction suspecte. Connectez-vous à votre espace client.", isPhishing: false },
  { text: "Vous avez gagné un iPhone ! Cliquez ici pour réclamer votre prix.", isPhishing: true }
];

const QuizScreen = () => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const fadeAnim = new Animated.Value(1);
  const navigation = useNavigation();

  const handleAnswer = (isPhishing) => {
    if (questions[index].isPhishing === isPhishing) {
      setScore(score + 1);
    }

    if (index < questions.length - 1) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }).start(() => {
        setIndex(index + 1);
        fadeAnim.setValue(1);
      });
    } else {
        saveQuizScore(((score + 1)/(questions.length))*100);
      alert(`Quiz terminé ! Score: ${score + 1}/${questions.length}`);
      navigation.navigate('Home');
    }
  };

  return (
    <ScreenLayout title="Quiz Phishing">
      <View style={styles.container}>
        <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
          <Text style={styles.question}>{questions[index].text}</Text>
        </Animated.View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.falseButton} onPress={() => handleAnswer(false)}>
            <Text style={styles.buttonText}>❌ Faux</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.trueButton} onPress={() => handleAnswer(true)}>
            <Text style={styles.buttonText}>✅ Vrai</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginTop: 20 },
  card: { padding: 20, backgroundColor: '#fff', borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10, elevation: 5, width: '80%' },
  question: { fontSize: 18, textAlign: 'center' },
  buttonContainer: { flexDirection: 'row', marginTop: 20 },
  falseButton: { backgroundColor: '#ff6b6b', padding: 15, borderRadius: 5, marginHorizontal: 10 },
  trueButton: { backgroundColor: '#4caf50', padding: 15, borderRadius: 5, marginHorizontal: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});

export default QuizScreen;
