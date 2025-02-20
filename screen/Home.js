import { StyleSheet, Text, View, FlatList, Pressable, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URL } from '../constants/url';

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data } = await axios.get(URL.FETCH_URL);
        setArticles(data || []);
      } catch (error) {
        console.error('Erreur lors de la récupération des articles :', error.message);
      }
    };
    fetchArticles();
  }, []);

  const renderPlayerItem = ({ item }) => (
    <Pressable>
      <View style={styles.itemContainer}>
        <Text>{item?.name || 'Inconnu'} : {item?.email || 'Email non disponible'}</Text>
      </View>
    </Pressable>
  );

  const renderArticleItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.articleTitle}>{item?.name || 'Nom non disponible'}</Text>
      <Text>Catégorie : {item?.category || 'Non spécifié'}</Text>
      <Text>Marque : {item?.brand || 'Non spécifiée'}</Text>
      <Text>Prix : {item?.price ? `${item.price} €` : 'Non disponible'}</Text>
      {item?.picture?.img ? (
        <Image source={{ uri: item.picture.img }} style={styles.articleImage} />
      ) : (
        <Text>Aucune image disponible</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des articles</Text>
      <FlatList
        data={articles}
        keyExtractor={(item) => (item?._id ? item._id.toString() : Math.random().toString())}
        renderItem={renderArticleItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  articleImage: {
    width: 100,
    height: 100,
    marginTop: 5,
  },
});
