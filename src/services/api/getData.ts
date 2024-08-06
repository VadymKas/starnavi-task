import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const getHeroes = (page: number) => {
  return axios(`${BASE_URL}/people/?page=${page}`);
};

const getHero = (id: string) => {
  return axios(`${BASE_URL}/people/${id}`);
};

const getFilms = (id: string) => {
  return axios(`${BASE_URL}/films/?characters=${id}`);
};

const getStarships = (id: string) => {
  return axios(`${BASE_URL}/starships/?pilots=${id}`);
};

export { getHeroes, getHero, getFilms, getStarships };
