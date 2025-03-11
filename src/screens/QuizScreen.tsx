import React, { useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Alert, Linking } from 'react-native';
import ScreenLayout from '../components/ScreenLayout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const saveQuizScore = async (score) => {
  try {
    await AsyncStorage.setItem('lastQuizScore', score.toString());
  } catch (error) {
    console.error('Erreur en sauvegardant le score:', error);
  }
};

const questions = {
  facile: [
    {
      text: "[SMS] DHL : Votre colis est en attente. Réglez les frais ici avant retour à l’expéditeur :",
      isPhishing: true,
      explanation: "Les transporteurs ne demandent jamais de payer des frais supplémentaires via un lien.",
      url: "https://dhl-suivi-colis.com"
    },
    {
      text: "[Messenger] Hey, j’ai trouvé une vieille photo de toi, regarde 😱",
      isPhishing: true,
      explanation: "Les escroqueries sur les réseaux sociaux utilisent souvent la curiosité pour inciter à cliquer.",
      url: "https://facebook-photos-securite.com"
    },
    {
      text: "[SMS] Votre médecin : Bonjour, votre rendez-vous est confirmé pour demain à 14h.",
      isPhishing: false,
      explanation: "Les rappels de rendez-vous médicaux sont légitimes, mais vérifiez toujours l'expéditeur.",
      url: ""
    },
    {
      text: "[WhatsApp] Salut, c’est moi, j’ai changé de numéro. Tu peux me faire un virement ici ? Je galère…",
      isPhishing: true,
      explanation: "Les fraudeurs se font passer pour des proches en détresse pour obtenir de l’argent.",
      url: "https://urgence-virement.com"
    },
    {
      text: "[SMS] SNCF : Votre train pour Lyon partira à 15h12, voie 4. Bon voyage !",
      isPhishing: false,
      explanation: "Les transporteurs envoient ce type de notifications en cas d’achat de billet.",
      url: ""
    },
    {
      text: "[WhatsApp] Hey, tu veux gagner 500€ en répondant à un simple sondage ? Inscris-toi ici :",
      isPhishing: true,
      explanation: "Les arnaques aux faux sondages sont fréquentes et volent souvent des données personnelles.",
      url: "https://sondage-recompense.com"
    }
    ],
  moyen: [
    {
      text: "[SMS] Votre carte bancaire a été bloquée. Cliquez ici pour la réactiver immédiatement :",
      isPhishing: true,
      explanation: "Les banques ne demandent jamais la réactivation d'une carte par SMS.",
      url: "https://ma-banqueblockage.com"
    },
    {
      text: "[Email] Spotify : Nous avons détecté une connexion inhabituelle. Vérifiez votre compte ici :",
      isPhishing: true,
      explanation: "Regardez toujours l’adresse e-mail de l’expéditeur et ne cliquez pas sur un lien suspect.",
      url: "https://spotify-alertes.com"
    },
    {
      text: "[SMS] Orange : Votre facture du mois est disponible. Consultez-la depuis votre espace client.",
      isPhishing: false,
      explanation: "Les opérateurs envoient des notifications de facturation, mais l’URL doit être officielle.",
      url: "https://www.orange.fr/moncompte"
    },
    {
      text: "[Instagram] Ton compte va être désactivé pour non-respect des règles. Fais appel ici :",
      isPhishing: true,
      explanation: "Instagram ne contacte pas les utilisateurs de cette manière.",
      url: "https://instagram-support-verif.com"
    },
    {
      text: "[Email] Université : Rappel, votre inscription aux examens doit être validée avant vendredi.",
      isPhishing: false,
      explanation: "Les universités envoient ce genre de rappels, mais il faut vérifier l'expéditeur.",
      url: "https://intranet.universite.com"
    },
    {
      text: "[Email] PayPal : Confirmation de votre virement de 30€ à Jean Dupont.",
      isPhishing: false,
      explanation: "Si vous avez fait un virement récemment, ce message est normal.",
      url: "https://www.paypal.com/activity"
    },

  ],
  difficile: [
    {
      text: "[SMS] Papa : 'Je suis bloqué au poste de police, peux-tu envoyer de l’argent ici :'",
      isPhishing: true,
      explanation: "Les escrocs imitent des proches pour manipuler émotionnellement.",
      url: "https://urgence-transfert.com"
    },
    {
      text: "[Email] Amazon : Une tentative de connexion suspecte a été détectée. Vérifiez votre compte ici :",
      isPhishing: true,
      explanation: "Amazon ne demande jamais de confirmation de connexion par e-mail avec un lien inconnu.",
      url: "https://amazon-verification.com"
    },
    {
      text: "[Email] Microsoft : Un accès non autorisé a été détecté. Confirmez votre identité :",
      isPhishing: true,
      explanation: "Vérifiez toujours le domaine officiel de Microsoft avant de cliquer.",
      url: "https://microsoft-security-check.com"
    },
    {
      text: "[Email] RH Entreprise : Bonjour, nous mettons à jour nos accès internes. Merci de vous reconnecter ici :",
      isPhishing: false,
      explanation: "Si le mail provient bien du service RH et pointe vers un site interne officiel, c’est légitime.",
      url: "https://intranet.entreprise.com"
    },
    {
      text: "[Messenger] Un ami t’a identifié sur une vidéo, clique ici pour voir !",
      isPhishing: true,
      explanation: "Ces messages mènent souvent à des sites frauduleux qui volent des identifiants Facebook.",
      url: "https://facebook-video-virale.com"
    },
    {
      text: "[WhatsApp] Nouveau programme de parrainage Netflix ! Inscris-toi et gagne 6 mois gratuits :",
      isPhishing: true,
      explanation: "Netflix ne propose pas ce type de promotions par message.",
      url: "https://netflix-offre-promo.com"
    },
    {
      text: "[SMS] Chronopost : Votre colis arrive demain. Suivez sa progression ici :",
      isPhishing: false,
      explanation: "Les services de livraison envoient ce type de message, mais assurez-vous que l'URL est officielle.",
      url: "https://www.chronopost.fr/suivi"
    },
    {
      text: "[Email] Votre relevé bancaire du mois est disponible sur votre espace client.",
      isPhishing: false,
      explanation: "Les banques envoient ce genre de message, mais vérifiez toujours le domaine avant de cliquer.",
      url: "https://www.ma-banque.com"
    }
  ]

};


const QuizScreen = () => {
  const [level, setLevel] = useState(null); // Niveau du quiz (facile, moyen, difficile)
  const [index, setIndex] = useState(0); // Index de la question actuelle
  const [score, setScore] = useState(0); // Score
  const fadeAnim = new Animated.Value(1);
  const navigation = useNavigation();

  // Choisir un niveau
  const handleLevelSelection = (chosenLevel) => {
    setLevel(chosenLevel);
    setIndex(0);
    setScore(0);
  };

  if (!level) {
    return (
      <ScreenLayout title="Choisir un niveau">
        <View style={styles.container}>
          <Text style={styles.title}>Choisissez votre niveau</Text>
          <TouchableOpacity style={styles.levelButton} onPress={() => handleLevelSelection('facile')}>
            <Text style={styles.buttonText}>🐣 Facile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.levelButton} onPress={() => handleLevelSelection('moyen')}>
            <Text style={styles.buttonText}>🚀 Moyen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.levelButton} onPress={() => handleLevelSelection('difficile')}>
            <Text style={styles.buttonText}>🔥 Difficile</Text>
          </TouchableOpacity>
        </View>
      </ScreenLayout>
    );
  }

  const currentQuestions = questions[level];

  const handleAnswer = (isPhishing) => {
    if (currentQuestions[index].isPhishing === isPhishing) {
      setScore(score + 1);
    } else {
      Alert.alert("❌ Mauvaise réponse", currentQuestions[index].explanation);
    }

    if (index < currentQuestions.length - 1) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }).start(() => {
        setIndex(index + 1);
        fadeAnim.setValue(1);
      });
    } else {
      saveQuizScore((score / currentQuestions.length) * 100);
      Alert.alert(`Quiz terminé !`, `Score : ${score}/${currentQuestions.length}`, [
        { text: "Retour à l'accueil", onPress: () => navigation.navigate('Home') }
      ]);
    }
  };

  return (
    <ScreenLayout title={`Quiz Phishing - ${level.charAt(0).toUpperCase() + level.slice(1)}`}>
      <View style={styles.container}>
        <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
          <Text style={styles.question}>{currentQuestions[index].text}</Text>
          <Text style={styles.url}>{currentQuestions[index].url}</Text>
        </Animated.View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.falseButton} onPress={() => handleAnswer(true)}>
            <Text style={styles.buttonText}>❌ Faux</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.trueButton} onPress={() => handleAnswer(false)}>
            <Text style={styles.buttonText}>✅ Vrai</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginTop: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  levelButton: { backgroundColor: '#3498db', padding: 15, borderRadius: 10, margin: 10, width: '80%', alignItems: 'center' },
  card: { padding: 25, backgroundColor: '#fff', borderRadius: 5, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10, elevation: 5, width: '90%' },
  question: { fontSize: 18, textAlign: 'center' },
  url: { fontSize: 18, textAlign: 'center', textDecorationLine: 'underline', color: 'blue' },
  buttonContainer: { flexDirection: 'row', marginTop: 20 },
  falseButton: { backgroundColor: '#ff6b6b', padding: 15, borderRadius: 5, marginHorizontal: 10 },
  trueButton: { backgroundColor: '#4caf50', padding: 15, borderRadius: 5, marginHorizontal: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});

export default QuizScreen;