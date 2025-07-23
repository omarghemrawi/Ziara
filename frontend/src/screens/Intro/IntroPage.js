import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function TypewriterLines({ lines, speed = 100, onComplete }) {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [out, setOut]     = useState(lines.map(() => ''));

  useEffect(() => {
    if (lineIdx >= lines.length) {
      onComplete?.();
      return;
    }
    const text = lines[lineIdx].text;
    if (charIdx < text.length) {
      const t = setTimeout(() => {
        setOut(o => {
          const c = [...o];
          c[lineIdx] = text.slice(0, charIdx + 1);
          return c;
        });
        setCharIdx(i => i + 1);
      }, speed);
      return () => clearTimeout(t);
    } else {
      const p = setTimeout(() => {
        setLineIdx(l => l + 1);
        setCharIdx(0);
      }, speed * 8);
      return () => clearTimeout(p);
    }
  }, [charIdx, lineIdx, lines, speed, onComplete]);

  return (
    <View style={styles.textContainer}>
      {lines.map((ln, i) => (
        <Text key={i} style={ln.style}>{out[i]}</Text>
      ))}
    </View>
  );
}

export default function IntroPage() {
  const navigation = useNavigation();
  // إذا في تهيئة أو تحميل بيانات، استخدم state:
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // محاكاة عملية تحميل (مثلاً تحميل خطوط باقية)،
    // هنا فاضية مباشرة نعتبرها جاهزة:
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  const lines = [
    { text: 'Welcome', style: styles.welcome },
    { text: 'To',      style: styles.to      },
    { text: 'ZIARA',   style: styles.ziara   },
  ];

  return (
    <View style={styles.container}>
      <TypewriterLines
        lines={lines}
        speed={120}
        onComplete={() => navigation.replace('Home')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9C54A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
  },
  welcome: {
    // استخدم خط النظام أو أي خط قمت بربطه يدوياً
    fontSize: 40,
    color: '#FFF',
    fontWeight: 'bold',
  },
  to: {
    fontSize: 28,
    color: '#FFF',
    marginVertical: 8,
  },
  ziara: {
    fontSize: 48,
    color: '#FFF',
    fontWeight: 'bold',
  },
});
