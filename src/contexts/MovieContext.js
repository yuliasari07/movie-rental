import React, { useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const MovieContext = React.createContext() 

export function useMovie() {
  return useContext(MovieContext)
}

export const MovieProvider = ({ children }) => {
  const [cart, setCart] = useLocalStorage("cart", [])

  function addMovie(movie) {
    setCart(prevCart => {
      if (prevCart.find(m => m.episode_id === movie.episode_id)) return prevCart
      return [...prevCart, movie ]
    })
  }

  function removeMovie(movie ) {
    setCart(prevCart => {
      return prevCart.filter(m => m.episode_id !== movie.episode_id)
    })
  }

  function resetCart() {
    setCart([])
  }

  return (
    <MovieContext.Provider value={{ cart, addMovie, removeMovie, resetCart}}>
      {children}
    </MovieContext.Provider>
    )
}