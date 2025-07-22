import React, { useRef, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import OnboardingItem from './OnboardingItem';
import onboardingScreens from './OnboardingData';

const { width } = Dimensions.get('window');

export default function OnboardingScreen({ navigation }) {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSkip = () => {
    navigation.replace('Welcome'); // Navigate to Home 
  };

  const handleNext = () => {
    if (currentIndex < onboardingScreens.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      handleSkip();
    }
  };

  const isEven = currentIndex % 2 !== 0; 
  const buttonBackgroundColor = isEven ? '#A75D3E' : '#20374c';
  const skipColor=isEven?'#000000':'#ffffff';
//   const bottonPaddingHorizontal=currentIndex==4?  70: 70;

  return (
    <View style={styles.container}>
    
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={[styles.skipText,{color:skipColor}]}>Skip</Text>
      </TouchableOpacity>

     
      <FlatList
        ref={flatListRef}
        data={onboardingScreens}
        renderItem={({ item, index }) => (
          <OnboardingItem item={item} index={index} />
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={e =>
          setCurrentIndex(Math.round(e.nativeEvent.contentOffset.x / width))
        }
      />

    
      <View style={styles.bottom}>
        <TouchableOpacity
          style={[styles.nextBtn, { backgroundColor: buttonBackgroundColor }]}
          onPress={handleNext}
        >
          <Text style={styles.nextText}>
            {currentIndex === onboardingScreens.length - 1
              ? 'Finish'
              : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 25,
    zIndex: 1,
  },
  skipText: {
    fontSize: 16,

  },
  bottom: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  nextBtn: {
paddingHorizontal:70,
    paddingVertical: 12,
    borderRadius: 35,
  },
  nextText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
