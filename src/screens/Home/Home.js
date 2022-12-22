import React, {useState, useReducer, useEffect} from 'react';
import {StyleSheet, Modal, NativeModules} from 'react-native';
import {Text, TextField, Button, Container} from '../../component';
import {initialState, reducer} from './States';
import validationServices from '../../utils/Validation/rules';
import {message} from '../../utils/Validation/msg';
import UserList from './Userlist';

const Db = NativeModules.DataBase;

function Home() {
  const [formData, dispatch] = useReducer(reducer, initialState);
  const [isVisible, setVisible] = useState(false);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    (async () => {
      const openDb = await Db.OpenDatabase();
      console.log(openDb);
      const create = await Db.CreateTable();
      console.log(create);
      await readData();
    })();
  }, []);

  const readData = async () => {
    const result = await Db.Read();
    // console.log(result);
    setUserData(result);
  };

  const insert = async (username, email) => {
    const result = await Db.Insert(username, email, 24);
    // console.log(result);
    if (result.status) {
      readData();
    }
  };

  const onClickSubmit = async () => {};

  const onClickSave = async () => {
    const uError = validationServices.userNameValidation(formData.userName);
    const eError = validationServices.emailValidation(formData.email);
    if (uError || eError) {
      dispatch({type: 'userNameError', payload: uError});
      dispatch({type: 'emailError', payload: eError});
      return;
    }
    dispatch({type: 'userNameError', payload: null});
    dispatch({type: 'emailError', payload: null});
    dispatch({type: 'userName', payload: null});
    dispatch({type: 'email', payload: null});
    await insert(formData.userName, formData.email);
  };

  const handleTextChange = (key, value) => {
    switch (key) {
      case 'userName':
        dispatch({type: 'userName', payload: value});
        dispatch({
          type: 'userNameError',
          payload: validationServices.userNameValidation(
            value,
            message.userName,
          ),
        });
        break;
      case 'email':
        dispatch({type: 'email', payload: value});
        dispatch({
          type: 'emailError',
          payload: validationServices.emailValidation(value),
        });
        break;
      case 'password':
        dispatch({type: 'password', payload: value});
        break;
    }
  };

  return (
    <Container style={styles.container}>
      <TextField
        lable={'Username'}
        placeholder="jhon"
        value={formData.userName}
        onChangeText={text => handleTextChange('userName', text)}
      />
      {formData.userNameError && (
        <Text color={'#ff0000'} fontSize={12}>
          {formData.userNameError}
        </Text>
      )}
      <TextField
        lable={'Email'}
        value={formData.email}
        placeholder="abc@gmail.com"
        marginTop={16}
        onChangeText={text => handleTextChange('email', text)}
      />
      {formData.emailError && (
        <Text color={'#ff0000'} fontSize={12}>
          {formData.emailError}
        </Text>
      )}
      <Button
        buttonBackgroundColor={'#0000FF'}
        style={styles.btnStyle}
        onPress={() => onClickSave()}>
        <Text color={'#fff'}>Save</Text>
      </Button>

      <UserList userdata={userData} />

      <Modal visible={isVisible} transparent={true}>
        <Container
          style={styles.modalViewStyle}
          backgroundColor="rgba(52, 52, 52, 0.8)">
          <Container style={styles.popupContainer} backgroundColor="#fff">
            <Text fontSize={14} textAlign="center" style={styles.msgTextStyle}>
              Please Enter Password
            </Text>
            <TextField
              value={formData.password}
              placeholder="**********"
              marginTop={8}
              onChangeText={text => handleTextChange('password', text)}
            />
            <Button
              buttonBackgroundColor={'#0000FF'}
              style={styles.btnStyle}
              onPress={onClickSubmit}>
              <Text color={'#fff'}>Submit</Text>
            </Button>
          </Container>
        </Container>
      </Modal>
    </Container>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  btnStyle: {
    marginVertical: 16,
  },
  modalViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  popupContainer: {
    paddingVertical: 16,
    borderRadius: 8,
    width: '100%',
    paddingHorizontal: 16,
  },
  msgTextStyle: {
    fontWeight: '700',
  },
});
