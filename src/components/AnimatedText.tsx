import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface AnimatedTextProps {
  text: string;
}

export const AnimatedText = ({text}: AnimatedTextProps) => {
  const [visibleLetters, setVisibleLetters] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLetters(prev => (prev < text.length ? prev + 1 : prev));
    }, 100); // ajusta la velocidad de aparición de las letras según tus preferencias

    return () => clearInterval(timer);
  }, [text]);

  const visibleText = text.slice(0, visibleLetters);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{visibleText}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {position: 'absolute', left: 30, top: 5},
  text: {fontSize: 16, color: '#5f5f5f'},
});
