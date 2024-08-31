import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {StyleProp, ViewStyle} from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  withSequence,
} from 'react-native-reanimated';

interface Props {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}
export const CarImage = ({style, onPress}: Props) => {
  const scaleValue = useSharedValue(1);

  const startAnimation = () => {
    scaleValue.value = withSequence(
      withSpring(1.2, {damping: 8, stiffness: 40}),
      withSpring(1.0, {damping: 8, stiffness: 40}),
      withSpring(1.2, {damping: 8, stiffness: 40}),
      withSpring(1.0, {damping: 8, stiffness: 40}),
      // Puedes agregar más repeticiones según sea necesario
    );
  };

  useEffect(() => {
    startAnimation();
  }, []); // Iniciar la animación cuando el componente se monta

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        elevation: 6,
      }}>
      <Animated.Image
        source={require('../assets/car.png')} // Asegúrate de proporcionar la ruta correcta a tu imagen
        style={{
          width: 100,
          height: 100,
          ...(style as any),
          transform: [{scale: scaleValue}],
        }}
      />
      {/* <Image
        style={{...(style as any)}}
        source={require('../assets/car.png')}
      /> */}
    </TouchableOpacity>
  );
};
