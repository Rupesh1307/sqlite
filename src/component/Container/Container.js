import React from 'react';
import {View} from 'react-native';

const Container = ({children, backgroundColor, style, ...rest}) => {
  return (
    <View style={[style, {backgroundColor: backgroundColor}]} {...rest}>
      {children}
    </View>
  );
};

export default Container;
