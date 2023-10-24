import {Platform} from 'react-native';
import {
  hasNotch as getIfHasNotch,
  hasDynamicIsland as getIfHasDynamicIsland,
} from 'react-native-device-info';

const getStatusBarHeight = (safe?: boolean) => {
  return Platform.select({
    ios: getIfHasNotch() ? (getIfHasDynamicIsland() ? 44 : 30) : 20,
    android: 0, //StatusBar.currentHeight,
  }) as number;
};

export const STATUS_BAR_HEIGHT = getStatusBarHeight();
