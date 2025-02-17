import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import ScreenLayout from '../components/ScreenLayout';

const AnalyzeScreen = () => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  // Fonction pour analyser un message avec l'API
  const analyzeMessage = async () => {
    setLoading(true);
    setResult(''); // Réinitialiser l'affichage précédent

    try {
      const response = await fetch('http://localhost:8000/check-phishing/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: inputText,
        }),
      });

      const data = await response.json();

      if (data && data.is_phishing) {
        setResult(data.message);
      } else {
        setResult('✅ Ce message semble sûr.');
      }
    } catch (error) {
      setResult('❌ Erreur de connexion. Veuillez réessayer.');
      console.error('Erreur lors de l\'analyse:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenLayout title="Analyze">
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>🔍 Analyse un message suspect :</Text>

      <TextInput
        placeholder="Colle ton message ici..."
        value={inputText}
        onChangeText={setInputText}
        style={{
          borderWidth: 1,
          padding: 10,
          marginVertical: 10,
          borderRadius: 5,
          minHeight: 100,
        }}
        multiline
      />

      <Button title="Analyser" onPress={analyzeMessage} disabled={loading} />

      {loading && <Text>⏳ Analyse en cours...</Text>}
      {result !== '' && <Text style={{ fontSize: 16, marginTop: 10 }}>{result}</Text>}
    </ScreenLayout>
  );
};

export default AnalyzeScreen;