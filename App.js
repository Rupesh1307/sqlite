import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Home from './src/screens/Home/Home';

// const Db = NativeModules.DataBase;

const App = () => {
  // (async () => {
  //   const result1 = await Db.OpenDatabase();
  //   console.log(result1);
  //   const result2 = await Db.CreateTable();
  //   console.log(result2);
  //   const result3 = await Db.Insert('singlife', 'singlife@gmail.com', 24);
  //   console.log(result3);
  //   const result4 = await Db.Read();
  //   console.log(result4);
  // })();

  return (
    <SafeAreaView style={styles.container}>
      <Home />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
