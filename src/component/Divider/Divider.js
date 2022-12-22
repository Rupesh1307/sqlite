import React from 'react';
import {View, StyleSheet} from 'react-native';

const Divider = ({dividerColor = '#333', style}) => {
  return (
    <View style={[styles.divider, {backgroundColor: dividerColor}, style]} />
  );
};

export default Divider;
const styles = StyleSheet.create({
  divider: {
    width: '100%',
    height: 1,
  },
});
