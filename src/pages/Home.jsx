import React from 'react'
import Header from '../components/Header'
import Section from '../components/Section'

import { useContext } from 'react';
import DataContext from '../DataContext';

const Home = () => {

    const { nowPlayingMovies, upcomingMovies, trendingMovies } = useContext(DataContext);

    return (
        <div>
            <Header />
            <Section name='Now Playing' movies={nowPlayingMovies} />
            <Section name='Upcoming' movies={upcomingMovies} />
            <Section name='Trending' movies={trendingMovies} />
        </div>
    )
}

export default Home
