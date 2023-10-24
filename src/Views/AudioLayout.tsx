import React, {useContext, useEffect, useRef, useState} from 'react';
import Image from 'react-native-fast-image';
import RtmContext from '../Contexts/RtmContext';
import PropsContext, {UidInterface} from '../Contexts/PropsContext';
import {StyleSheet, Text, View} from 'react-native';
import DefaultPicture from './DefaultPicture';
import Username from './Usernames';
import useTimer from '../hooks/useTimer';

const AudioLayout: React.FC<{
  user: UidInterface;
  style?: React.CSSProperties;
  max?: boolean;
  showUsername?: boolean;
}> = (props) => {
  const {pictures, usernames} = useContext(RtmContext);
  const {rtmProps, styleProps} = useContext(PropsContext);
  const {user, max, showUsername} = props;

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        {pictures[user.uid] ? (
          <Image
            source={{uri: pictures[user.uid]}}
            style={[styles.image, max ? styles.bigImage : {}]}
          />
        ) : (
          <DefaultPicture str={usernames[user.uid]} />
        )}
        {showUsername ? <Username user={user} /> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#299CA8',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  center: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: '#ffffff',
    backgroundColor: '#299CA8',
  },
  bigImage: {
    width: 150,
    height: 150,
  },
});

export default AudioLayout;
