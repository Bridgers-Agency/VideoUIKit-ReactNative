import React, {useContext} from 'react';
import {RenderModeType, RtcSurfaceView} from 'react-native-agora';
import styles from '../Style';
import PropsContext, {UidInterface} from '../Contexts/PropsContext';
import {StyleSheet, View} from 'react-native';
import ImageIcon from '../Controls/ImageIcon';
import Username from './Usernames';

// const LocalView = RtcLocalView.SurfaceView;
// const RemoteView = RtcRemoteView.SurfaceView;

interface MaxViewInterface {
  user: UidInterface;
  fallback?: React.ComponentType;
  startedDate?: Date | null;
}
/**
 * MaxVideoView takes in a user and renders the video
 */
const MaxVideoView: React.FC<MaxViewInterface> = (props) => {
  const {styleProps, rtcProps} = useContext(PropsContext);
  const {maxViewStyles} = styleProps || {};
  const Fallback = props.fallback;

  return (
    <React.Fragment>
      {/* !rtcProps.disableRtm && <Username user={props.user} /> */}
      {props.user.uid === 'local' ? (
        props.user.video ? (
          <RtcSurfaceView
            style={{...styles.fullView, ...(maxViewStyles as object)}}
            canvas={{renderMode: RenderModeType.RenderModeFit, uid: 0}}
          />
        ) : Fallback ? (
          <Fallback />
        ) : (
          <DefaultFallback />
        )
      ) : props.user.video ? (
        <>
          <RtcSurfaceView
            style={{...styles.fullView, ...(maxViewStyles as object)}}
            canvas={{
              renderMode: RenderModeType.RenderModeFit,
              uid: props.user.uid as number,
            }}
          />
        </>
      ) : Fallback ? (
        <Fallback />
      ) : (
        <DefaultFallback />
      )}
    </React.Fragment>
  );
};

const DefaultFallback = () => {
  const {styleProps} = useContext(PropsContext);
  const {videoPlaceholderContainer} = styleProps || {};
  return (
    <View style={[style.placeholderContainer, videoPlaceholderContainer]}>
      <ImageIcon
        name={'videocamOff'}
        style={[styles.placeholderIcon, styleProps?.videoPlaceholderIcon]}
      />
    </View>
  );
};

const style = StyleSheet.create({
  placeholderContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
});

export default MaxVideoView;
