import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface Props {
  str?: string;
  customStyles?: Readonly<Record<string, any>>;
  customTextStyles?: Readonly<Record<string, any>>;
}

const DefaultPicture: React.FC<Props> = ({
  str,
  customStyles,
  customTextStyles,
}) => {
  return (
    <View style={[style.roundPicture, customStyles]}>
      <Text style={[style.text, customTextStyles]}>{str?.[0] || ''}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  roundPicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ffffff',
    backgroundColor: '#299CA8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'EBGaramond-ExtraBold',
    color: '#ffffff',
    fontSize: 30,
    lineHeight: 30,
  },
});

export default DefaultPicture;
