import React, {useContext, useEffect, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text} from 'react-native';
import MaxVideoView from './MaxVideoView';
import MinVideoView from './MinVideoView';
import {MinUidConsumer} from '../Contexts/MinUidContext';
import {MaxUidConsumer} from '../Contexts/MaxUidContext';
import styles from '../Style';
import PropsContext from '../Contexts/PropsContext';
import {ClientRoleType} from 'react-native-agora';
import AudioLayout from './AudioLayout';
import useTimer from '../hooks/useTimer';
import {STATUS_BAR_HEIGHT} from '../Utils/statusBarHeight';

const PinnedVideo: React.FC = () => {
  const {rtcProps, styleProps} = useContext(PropsContext);
  const [width, setWidth] = useState(Dimensions.get('screen').width);
  const {dateStr} = useTimer(rtcProps.startedDate);

  useEffect(() => {
    Dimensions.addEventListener('change', () => {
      setWidth(Dimensions.get('screen').width);
    });
  });

  return (
    <>
      <MaxUidConsumer>
        {(maxUsers) =>
          maxUsers[0] ? ( // check if audience & live don't render if uid === local
            <MaxVideoView
              user={maxUsers[0]}
              key={maxUsers[0].uid}
              fallback={() => (
                <AudioLayout user={maxUsers[0]} max showUsername />
              )}
            />
          ) : null
        }
      </MaxUidConsumer>
      {rtcProps.startedDate ? (
        <Text style={pinnedVideoStyles.date}>{dateStr}</Text>
      ) : null}
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={{
          ...styles.minContainer,
          width: width,
          ...(styleProps?.minViewContainer as Object),
          paddingTop: STATUS_BAR_HEIGHT,
        }}>
        <MinUidConsumer>
          {(minUsers) =>
            minUsers.map((user) =>
              rtcProps.role === ClientRoleType.ClientRoleAudience &&
              user.uid === 'local' ? null : (
                <MinVideoView
                  user={user}
                  key={user.uid}
                  showOverlay={false}
                  Fallback={() => <AudioLayout user={user} showUsername />}
                />
              ),
            )
          }
        </MinUidConsumer>
      </ScrollView>
    </>
  );
};

const pinnedVideoStyles = StyleSheet.create({
  date: {
    position: 'absolute',
    right: 10,
    top: STATUS_BAR_HEIGHT + 20,
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PinnedVideo;
