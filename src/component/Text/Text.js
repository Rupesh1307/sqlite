import React from 'react';
import {Text as BaseText, StyleSheet} from 'react-native';

const Text = ({children, style, color, fontSize, textAlign, ...rest}) => {
  return (
    <BaseText {...rest} style={[style, {color, fontSize, textAlign}]}>
      {children}
    </BaseText>
  );
};

export default Text;

const styles = StyleSheet.create({
  textStyle: {},
});
