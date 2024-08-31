import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Balls} from './Balls';
import {ClearInput} from './ClearInput';

interface Props {
  setFromFocussed: (fromFocussed: boolean) => void;
  fromBlur: () => void;
  fromFocussed: boolean;
  setFrom: Dispatch<SetStateAction<string>>;
  setToFocussed: (toFocussed: boolean) => void;
  toBlur: () => void;
  setTo: Dispatch<SetStateAction<string>>;
  toFocussed: boolean;
  to: string;
  from: string;
  toInputRef: React.MutableRefObject<TextInput | undefined>;
}
export const InputsModal = ({
  setFromFocussed,
  fromBlur,
  fromFocussed,
  setFrom,
  setToFocussed,
  toBlur,
  setTo,
  toFocussed,
  to,
  from,
  toInputRef,
}: Props) => {
  return (
    <View style={styles.inputsContainer}>
      <View style={styles.fromInputContainer}>
        <Balls
          color="#41F861"
          style={{position: 'absolute', top: 8, left: 15}}
        />
        <TextInput
          onFocus={() => setFromFocussed(true)}
          onBlur={() => fromBlur()}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            ...styles.fromInput,
            shadowOffset: {
              width: 0,
              height: fromFocussed ? 6 : 0,
            },
            shadowOpacity: fromFocussed ? 0.25 : 0,
            elevation: fromFocussed ? 6 : 0,
            borderColor: '#EDEDED',
            borderWidth: fromFocussed ? 0 : 1,
          }}
          selectTextOnFocus
          placeholder="¿Por dónde pasamos por ti?"
          numberOfLines={1}
          value={from}
          onChangeText={value => setFrom(value)}
        />
        {fromFocussed && from && <ClearInput onPress={setFrom} />}
      </View>

      <View style={styles.toInputContainer}>
        <Balls
          color="#F85633"
          style={{position: 'absolute', top: 8, left: 15}}
        />
        <TextInput
          autoFocus
          ref={toInputRef}
          onFocus={() => setToFocussed(true)}
          onBlur={() => toBlur()}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            ...styles.fromInput,
            shadowOffset: {
              width: 0,
              height: toFocussed ? 6 : 0,
            },
            shadowOpacity: toFocussed ? 0.25 : 0,
            elevation: toFocussed ? 6 : 0,
            borderColor: '#EDEDED',
            borderWidth: toFocussed ? 0 : 1,
          }}
          placeholder="¿Por dónde pasamos por ti?"
          numberOfLines={1}
          value={to}
          onChangeText={value => setTo(value)}
        />
        {toFocussed && to && <ClearInput onPress={setTo} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputsContainer: {},
  fromInputContainer: {},
  fromInput: {
    borderRadius: 25,
    marginHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    height: 50,
    fontSize: 14,
    color: 'black',
    paddingLeft: 45,
  },
  toInputContainer: {},
});
