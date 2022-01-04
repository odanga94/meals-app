import React, { useEffect, useCallback } from "react";
import { ScrollView, View, Text, StyleSheet, Image } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import CustomHeaderButton from "../components/HeaderButton";
import DefaultText from "../components/DefaultText";
import { toggleFavorite } from "../store/actions/meals";

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailsScreen = (props) => {
  const { navigation } = props;
  const mealId = navigation.getParam("mealId");
  // console.log(mealId);
  const dispatch = useDispatch();

  const currentMealIsFavorite = useSelector((state) =>
    state.meals.favoriteMeals.some((meal) => meal.id === mealId)
  );
  const availableMeals = useSelector((state) => state.meals.meals);

  const selectedMeal = availableMeals.find((meal) => meal.id === mealId);

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    navigation.setParams({
      toggleFav: toggleFavoriteHandler,
    });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    navigation.setParams({
      isFav: currentMealIsFavorite,
    });
  }, [currentMealIsFavorite]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map((ingredient) => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map((step, index) => (
        <ListItem key={step}>
          {index + 1}. {step}
        </ListItem>
      ))}
    </ScrollView>
  );
};

MealDetailsScreen.navigationOptions = (navData) => {
  // const mealId = navData.navigation.getParam("mealId");
  //const selectedMeal = MEALS.find((meal) => meal.id === mealId);
  const mealTitle = navData.navigation.getParam("mealTitle");
  const toggleFavorite = navData.navigation.getParam("toggleFav");
  const isFavorite = navData.navigation.getParam("isFav");

  return {
    headerTitle: /* selectedMeal.title */ mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Favorite"
          iconName={isFavorite ? "ios-star" : "ios-star-outline"}
          onPress={() => toggleFavorite()}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    textAlign: "center",
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
});

export default MealDetailsScreen;
