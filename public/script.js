// Creating the constant variables for the tabs and tab content pages
const tabs = document.querySelectorAll('[data-tab-target]');
const tabContents = document.querySelectorAll('[data-tab-content]');

// Adding click event listeners to the tabs
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.tabTarget);

    // Removing 'active' class from all tab content elements
    tabContents.forEach(tabContent => {
      tabContent.classList.remove('active');
    });

    // Removing 'active' class from all tabs
    tabs.forEach(tab => {
      tab.classList.remove('active');
    });

    // Adding 'active' class to the clicked tab and target tab content
    tab.classList.add('active');
    target.classList.add('active');
  });
});

// Function to create a new movie item
function createMovieItem(movie) {
  var movieItem = document.createElement("div");
  movieItem.classList.add("movie-item");

  var movieContent = "<div class='movie-item'>";

  if (movie.cover) {
    var coverURL = URL.createObjectURL(movie.cover);
    movieContent += "<img src='" + coverURL + "' alt='Movie Cover' width='200'>";
  }

  movieContent += "<div class='movie-details'>" +
    "<span>Title:</span> " + movie.title + "<br>" +
    "<span>Genre:</span> " + movie.genre + "<br>" +
    "<span>Duration:</span> " + movie.duration + " minutes<br>" +
    "<span>Rating:</span> " + movie.rating + "<br>" +
    "<span>Emotional Trigger:</span> " + movie.emotion + "<br>" +
    "<span>Triggers:</span> " + movie.triggers.join(", ") + "<br>" +
    "</div></div>";

  movieItem.innerHTML = movieContent;

  return movieItem;
}

// Function to add a new movie
function addMovie() {
  // Retrieving values from input fields
  var title = document.getElementById("movie-title").value;
  var genreSelect = document.getElementById("genre-assigned");
  var genre = genreSelect.options[genreSelect.selectedIndex].value;
  var duration = document.getElementById("movie-duration").value;
  var rating = document.getElementById("movie-rating").value;
  var emotion = document.getElementById("movie-emotion").value;
  var triggers = document.querySelectorAll('input[name="triggers"]:checked');
  var triggerValues = Array.from(triggers).map(function(trigger) {
    return trigger.value;
  });
  var cover = document.getElementById("movie-cover").files[0];

  // Creating a movie object with the input values
  var movie = {
    title: title,
    genre: genre,
    duration: duration,
    rating: rating,
    emotion: emotion,
    triggers: triggerValues,
    cover: cover
  };

  // Creating a movie item and appending it to the movie list
  var movieItem = createMovieItem(movie);
  document.getElementById("movie-list").appendChild(movieItem);

  // Clearing the input fields
  document.getElementById("movie-title").value = "";
  document.getElementById("genre-assigned").value = "";
  document.getElementById("movie-duration").value = "";
  document.getElementById("movie-rating").value = "";
  document.getElementById("movie-emotion").value = "1";
  triggers.forEach(function(trigger) {
    trigger.checked = false;
    updateTriggerCount(trigger.value);
  });
  document.getElementById("movie-cover").value = "";

  // Updating genre count and genre list in the overview tab
  genres[genre]++;
  updateGenreList();

  // Updating trigger list in the overview tab
  displayTriggerList();
}

// Adding event listener to the movie form submission
document.getElementById("movie-form").addEventListener("submit", function(event) {
  event.preventDefault();
  addMovie();
});

// Function to display the trigger list in the overview tab
function displayTriggerList() {
  var triggerListContainer = document.getElementById("trigger-overview");
  var triggerListHTML = "<h3>List of Triggers:</h3>";

  var triggers = document.querySelectorAll('input[name="triggers"]');
  triggers.forEach(function(trigger, index) {
    var triggerName = trigger.value;
    var triggerCount = trigger.dataset.count || 0;
    triggerListHTML += "<p>" + (index + 1) + ". " + triggerName + ": " + triggerCount + " times</p>";
  });

  triggerListContainer.innerHTML = triggerListHTML;
}

// Function to update the trigger count
function updateTriggerCount(triggerName) {
  var trigger = document.querySelector('input[name="triggers"][value="' + triggerName + '"]');
  if (trigger) {
    var count = parseInt(trigger.dataset.count) || 0;
    count++;
    trigger.dataset.count = count;
  }
}

// Function to update the genre list in the overview tab
function updateGenreList() {
  var genreListContainer = document.getElementById("genre-overview");
  var genreListHTML = "<h3>List of Genres:</h3>";

  // Looping through the genres object to generate the genre list
  for (const genre in genres) {
    if (genres.hasOwnProperty(genre)) {
      genreListHTML += "<p>" + genre + ": " + genres[genre] + " times</p>";
    }
  }

  genreListContainer.innerHTML = genreListHTML;
}

// Define initial empty object of genres
var genres = {};

// Loop through genre options to initialize genre counts
var genreOptions = document.getElementById("genre-assigned").options;
for (var i=0; i < genreOptions.length; i++) {
  var genreName = genreOptions[i].value;
  genres[genreName] = 0;
}

// Call the function initially to display the trigger and genre lists
displayTriggerList();
updateGenreList();

// Create chart.js chart
var ctx = document.getElementById('chart').getContext('2d');
var chart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['☺️', '😃', '😐', '😟', '😢'],
    datasets: [{
      label: 'Emotional Trigger Rating',
      data: [
        countEmotion('lowSmile'), countEmotion('smile'), countEmotion('neutral'),
        countEmotion('frown'), countEmotion('sob'),
      ],
      backgroundColor: [
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(153, 102, 255, 0.2)',
      ],
      borderColor: [
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1
    }]
  },
  options: {}
});

// Count the number of occurrences of each emotion
function countEmotion(emotion) {
  var count = 0;
  var emotionalTriggers = document.querySelectorAll('#movie-emotion option');
  emotionalTriggers.forEach(function (trigger) {
    if (trigger.value === emotion) {
      count++;
    }
  });
  return count;
}
