import React from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  View,
  StyleSheet,
} from 'react-native';

const Button = ({
  children,
  isLoading,
  buttonBackgroundColor,
  buttonBorderColor,
  buttonBorderWidth,
  buttonWidth = '100%',
  padding,
  style,
  align = 'center',
  onPress,
  childrenContainerStyle,
  ...rest
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: buttonBackgroundColor,
          borderColor: buttonBorderColor,
          borderWidth: buttonBorderWidth,
          padding: padding,
          width: buttonWidth,
        },
        style,
      ]}
      onPress={onPress}
      {...rest}>
      <View
        style={[
          styles.buttonChildrenContainer,
          {
            width: buttonWidth,
            justifyContent: align,
          },
          childrenContainerStyle,
        ]}>
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          children
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 45,
  },
  buttonChildrenContainer: {
    flexDirection: 'row',
  },
  iconContainer: {
    marginRight: 5,
  },
});
