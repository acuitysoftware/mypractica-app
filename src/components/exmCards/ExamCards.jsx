import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const ExamCards = ({ item }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image_path }} style={styles.image} />
      <Text style={styles.title}>{item.name?.slice(0, 20)}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('examdetails', {
            examid: item.id,
          })
        }
      >
        <Text style={styles.buttonText}>Know Details</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    width: '48%',
    // backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
    // elevation: 2,
  },
  image: {
    width: '100%',
    height: 100,
    objectFit: 'contain',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 8,
  },
  button: {
    backgroundColor: '#756EF3',
    marginHorizontal: 10,
    marginBottom: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '500',
  },
});

export default ExamCards;
