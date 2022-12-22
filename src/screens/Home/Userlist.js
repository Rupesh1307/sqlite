import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Text, Container, Divider} from '../../component';

const UserList = ({userdata}) => {
  const _renderItem = ({item}) => {
    return (
      <Container style={styles.itemContainer}>
        <Text fontSize={16} color={'#333'}>
          {item.username}
        </Text>
        <Text fontSize={12} color={'#949494'}>
          {item.email}
        </Text>
      </Container>
    );
  };
  return (
    <Container style={styles.container}>
      <FlatList
        data={userdata}
        renderItem={_renderItem}
        keyExtractor={(item, index) => `userList_${index}`}
        ItemSeparatorComponent={Divider}
      />
    </Container>
  );
};

export default UserList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    padding: 8,
  },
});
