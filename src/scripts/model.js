/*  eslint no-return-assign: "off"  */

import axios from "axios";

export const state = {
  trendingAnime: [],
  popularAnime: [],
  highestAnime: [],
  searchResults: [],
  detailAnime: {},
};

export const getTrendingAnime = async () => {
  await axios
    .get("https://kitsu.io/api/edge/trending/anime")
    .then((response) => (state.trendingAnime = response.data.data.slice(0, 3)))
    .catch((err) => console.log(err));
};

export const getPopularAnime = async () => {
  await axios
    .get("https://kitsu.io/api/edge/anime?sort=popularityRank&page[limit]=3")
    .then((response) => (state.popularAnime = response.data.data))
    .catch((err) => console.log(err));
};

export const getHighestAnime = async () => {
  await axios
    .get("https://kitsu.io/api/edge/anime?sort=-averageRating&page[limit]=3")
    .then((response) => (state.highestAnime = response.data.data))
    .catch((err) => console.log(err));
};

export const searchAnime = async (query) => {
  await axios
    .get(`https://kitsu.io/api/edge/anime?filter[text]=${query}`)
    .then((response) => (state.searchResults = response.data.data))
    .catch((err) => console.log(err));
};

export const getAnimeDetails = async (id) => {
  await axios
    .get(`https://kitsu.io/api/edge/anime/${id}?include=categories`)
    .then(
      (response) => (state.detailAnime = createDetailsObject(response.data))
    )
    .catch((err) => console.log(err));
};

const createDetailsObject = (obj) => ({
  coverImage: obj.data.attributes.coverImage?.large,
  posterImage: obj.data.attributes.posterImage.small,
  showType: obj.data.attributes.showType,
  status: obj.data.attributes.status,
  title: obj.data.attributes.canonicalTitle,
  genres: obj.included
    ?.map((item) => item.attributes.title)
    .sort()
    .slice(0, 3),
  videoID: obj.data.attributes.youtubeVideoId,
  rating: obj.data.attributes.averageRating,
  popularity: obj.data.attributes.popularityRank,
  synopsis: obj.data.attributes.synopsis,
  startDate: obj.data.attributes.startDate,
  endDate: obj.data.attributes.endDate,
  nextRelease: obj.data.attributes.nextRelease,
  episodeLength: obj.data.attributes.episodeLength,
  totalEps: obj.data.attributes.totalLength / obj.data.attributes.episodeLength,
  ageRating: obj.data.attributes.ageRating,
  ageRatingGuide: obj.data.attributes.ageRatingGuide,
});
