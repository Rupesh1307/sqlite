import React from 'react-native';
import {TextInput, View, StyleSheet} from 'react-native';
import {Text} from '../index';

const TextField = ({
  lable,
  lableTextStyle,
  style,
  onChangeText,
  value,
  placeholder,
  secureTextEntry = false,
  borderRadius = 4,
  borderWidth = 1,
  marginTop,
  marginBottom,
  marginHorizontal,
  marginVertical,
  borderColor,
  ...rest
}) => {
  return (
    <View
      style={[
        styles.container,
        {marginTop, marginBottom, marginHorizontal, marginVertical},
      ]}>
      {lable && lable !== ' ' && <Text style={lableTextStyle}>{lable}</Text>}
      <View style={[styles.innerContainer]}>
        <TextInput
          style={[
            styles.textField,
            {borderColor: borderColor, borderRadius: borderRadius, borderWidth},
            style,
          ]}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          autoComplete="off"
          allowFontScaling={false}
          {...rest}
        />
      </View>
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  innerContainer: {
    width: '100%',
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    height: 45,
  },
  textField: {
    padding: 12,
    height: 45,
    width: '100%',
    backgroundColor: '#fff',
    fontSize: 14,
  },
});
