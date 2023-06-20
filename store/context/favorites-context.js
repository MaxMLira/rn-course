import { createContext, useState } from "react";
export const FavoritesContext =  createContext({
    ids: [],
    addFavorite: (id) =>{},
    removeFavorite: (id) => {}
});


function FavoritesContextProvider({children}){
    const [favoriteMealIds, setFavoriteMealsIds] = useState([]);
    function addFavorite(id){
        setFavoriteMealsIds((currentId ) => [...currentId, id]);
    }
    function removeFavorite(id){
        setFavoriteMealsIds((currentId ) => currentId.filter(mealId => mealId !== id));
    }
    const value = {
        ids: favoriteMealIds,
        addFavorite: addFavorite,
        removeFavorite: removeFavorite,
    }
    return<FavoritesContext.Provider value={value} >{children}</FavoritesContext.Provider>
}
export default FavoritesContextProvider;