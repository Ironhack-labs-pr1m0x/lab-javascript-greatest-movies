// ✅ Iteration 1: All directors? - Get the array of all directors.
// ✅ _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors. How could you "clean" a bit this array and make it unified (without duplicates)?

function getAllDirectors(movies) {
  const directors = movies.map((movie) => {
    return movie.director;
  });

  return [...new Set(directors)];
}

// ✅ Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?

function howManyMovies(movies) {
  return movies.filter((movie) => {
    return (
      movie.director === 'Steven Spielberg' && movie.genre.includes('Drama')
    );
  }).length;
}

howManyMovies(movies);

// ✅ Iteration 3: All rates average - Get the average of all rates with 2 decimals

function ratesAverage(movies) {
  if (movies.length === 0) return 0;
  const avgRating =
    movies.reduce((total, movie) => {
      return movie.rate > 0 ? total + movie.rate : total;
    }, 0) / movies.length;

  return Number(avgRating.toFixed(2));
}

ratesAverage(movies);

// ✅ Iteration 4: Drama movies - Get the average of Drama Movies

const dramaMoviesRate = (movies) => {
  const dramaMovieRatings = movies
    .filter((movie) => {
      return movie.genre.includes('Drama');
    })
    .map((movie) => {
      return movie.rate;
    });

  if (dramaMovieRatings.length === 0) return 0;

  const dramaMoviesAvg =
    dramaMovieRatings.reduce((total, movie) => {
      return total + movie;
    }) / dramaMovieRatings.length;

  const roundedRatings = dramaMoviesAvg.toFixed(2);

  return Number(roundedRatings);
};

dramaMoviesRate(movies);

// ✅ Iteration 5: Ordering by year - Order by year, ascending (in growing order)
const orderByYear = (movies) => {
  const moviesClone = [...movies];
  const sortedArr = moviesClone.sort((a, b) => {
    return a.year - b.year;
  });

  const newerOrder = sortedArr.sort((a, b) => {
    if (a.year !== b.year) return 0;
    return a.title.localeCompare(b.title);
  });

  return newerOrder;
};

orderByYear(movies);

// ✅ Iteration 6: Alphabetic Order - Order by title and print the first 20 titles

const orderAlphabetically = (movies) => {
  const moviesClone = [...movies];
  const movieTitels = moviesClone.map((movie) => movie.title);

  const sortedMovieTitels = movieTitels.sort((a, b) => {
    return a.localeCompare(b);
  });

  return sortedMovieTitels.length < 20
    ? sortedMovieTitels
    : sortedMovieTitels.slice(0, 20);
};

orderAlphabetically(movies);

// ✅ BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes

const hoursToMinutes = (movie) => {
  let totalMinutes = 0;

  if (!movie.duration.includes(' ')) {
    if (movie.duration.includes('min')) {
      const minutes = movie.duration.replace('min', '');
      totalMinutes += Number(minutes);
    } else {
      const hours = movie.duration.replace('h', '');
      totalMinutes += Number(hours[0] * 60);
    }
  } else {
    const [hours, minutes] = movie.duration
      .replace(/\min|h|\b/g, '')
      .split(' ');

    totalMinutes += Number(hours * 60);
    totalMinutes += Number(minutes);
  }

  return { ...movie, duration: totalMinutes };
};

const turnHoursToMinutes = (movies) => {
  const moviesClone = [...movies];

  return moviesClone.map((movie) => {
    return hoursToMinutes(movie);
  });
};

turnHoursToMinutes(movies);

// ✅ BONUS - Iteration 8: Best yearly rate average - Best yearly rate average

const bestYearAvg = (movies) => {
  const moviesClone = [...movies];

  if (movies.length === 0) return null;

  let movieYears = {};

  moviesClone.forEach((el) => {
    movieYears[el.year] = [];
  });

  moviesClone.forEach((el) => {
    movieYears[el.year].push(el.rate);
  });

  const keys = Object.keys(movieYears);

  let moviesArray = [];

  keys.forEach((el) => {
    const averageYearRating =
      movieYears[el].reduce((acc, val) => {
        return acc + val;
      }, 0) / movieYears[el].length;
    moviesArray.push({ year: el, rating: averageYearRating });
  });

  const sortedMovies = moviesArray.sort((a, b) => {
    return b.rating - a.rating;
  });

  return `The best year was ${sortedMovies[0].year} with an average rate of ${sortedMovies[0].rating}`;
};

bestYearAvg(movies);
