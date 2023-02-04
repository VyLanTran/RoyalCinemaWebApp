import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'
import requests from './Requests'

const DataContext = createContext();

export function DataProvider({ children }) {

    const [movies, setMovies] = useState(
        !localStorage.getItem("movies") ?
            [{
                nowPlayingMovies: [],
                upcomingMovies: [],
                trendingMovies: [],
                allMovies: []
            }] :
            JSON.parse(localStorage.getItem("movies"))
    );

    useEffect(() => {

        const fetchNowPlaying = axios.get(requests.requestNowPlaying)
        const fetchUpcoming = axios.get(requests.requestUpcoming)
        const fetchTrending = axios.get(requests.requestTrending)
        Promise.all([fetchNowPlaying, fetchUpcoming, fetchTrending]).then(([res1, res2, res3]) => {
            setMovies(
                {
                    nowPlayingMovies: res1.data.results,
                    upcomingMovies: res2.data.results,
                    trendingMovies: res3.data.results,
                    allMovies: res1.data.results.concat(res2.data.results).concat(res3.data.results)
                }
            )
        })

    }, [])

    useEffect(() => {
        localStorage.setItem("movies", JSON.stringify(movies))
    }, [movies])



    const nowPlayingMovies = movies.nowPlayingMovies
    const upcomingMovies = movies.upcomingMovies
    const trendingMovies = movies.trendingMovies
    const allMovies = movies.allMovies


    return (
        <DataContext.Provider value={{ nowPlayingMovies, upcomingMovies, trendingMovies, allMovies }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;