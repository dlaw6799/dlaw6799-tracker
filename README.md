
# Movie Tracking Website

Welcome to my website! I have provided a platform for movie enthusiasts to create their own personalized movie list, rate films based on emotional triggers, and track what has triggered them the most. 
## Documentation

Design Process:

Throughout the development of the Movie Tracking website, I followed a process to incorporate the desired features and functionality. It was important to me to ensure there was functionality to the website before styling it.

**Setting up Form Functionality**:
   When starting the development process, I knew the importance of creating working form to collect movie details, as this served as the foundation for the whole website. By using HTML, CSS, and JavaScript, I created a form that allows users to input information about a movie such as the movie title, genre, duration, rating, emotional triggers, and even upload a cover photo. To handle the form submission and process the entered data, I incorporated the following code snippets:

   Originally i had text input for a few fields including genres and duration. The stars functionality was originally a radio button scale from 1-5 before it was modified to reflect a better data input model.

   HTML Form: A wide arrange of different methods were used to create this form, such as text input, selection options, radio buttons, lists etc.
   ```html
    <form id="movie-form">
        <input type="text" id="movie-title" placeholder="Movie title" required> <!-- Input field for movie title -->
        <label for="genre-assigned">Genre:</label> <!-- Label for genre selection -->
        <select id="genre-assigned"> <!-- Dropdown for selecting genre -->
          <!-- Genre options -->
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="Animation">Animation</option>
          <option value="Comedy">Comedy</option>
          <option value="Crime">Crime</option>
          <option value="Documentary">Documentary</option>
          <option value="Drama">Drama</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Historical">Historical</option>
          <option value="Horror">Horror</option>
          <option value="Musical">Musical</option>
          <option value="Mystery">Mystery</option>
          <option value="Romance">Romance</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Thriller">Thriller</option>
          <option value="War">War</option>
          <option value="Western">Western</option>
          <option value="Biographical">Biographical</option>
          <option value="Family">Family</option>
          <option value="Sports">Sports</option>
          <option value="Supernatural">Supernatural</option>
          <option value="Psychological">Psychological</option>
          <option value="Suspense">Suspense</option>
          <option value="Noir">Noir</option>
          <option value="Satire">Satire</option>
        </select>
        <input type="number" id="movie-duration" placeholder="Duration (minutes)" required> <!-- Input field for movie duration -->
        <label for="movie-rating">Rating:</label> <!-- Label for movie rating selection -->
        <select id="movie-rating"> <!-- Dropdown for selecting movie rating -->
          <!-- Rating options -->
          <option value="⭐">⭐</option>
          <option value="⭐⭐">⭐⭐</option>
          <option value="⭐⭐⭐">⭐⭐⭐</option>
          <option value="⭐⭐⭐⭐">⭐⭐⭐⭐</option>
          <option value="⭐⭐⭐⭐⭐">⭐⭐⭐⭐⭐</option>
        </select>
        <label for="movie-emotion">Emotional Trigger Rating:</label> <!-- Label for emotional trigger rating selection -->
        <select id="movie-emotion"> <!-- Dropdown for selecting emotional trigger rating -->
          <!-- Emotional trigger rating options -->
          <option value="😁">😁(Low)</option>
          <option value="😃">😃</option>
          <option value="😐">😐</option>
          <option value="😟">😟</option>
          <option value="😢">😢 (High)</option>
        </select>
        <p>Triggers:</p>
        <div class="checkbox-container">
          <div class="column">
            <!-- Checkbox options for triggers -->
            <div>
              <label for="trigger-assault">
                <input type="checkbox" id="trigger-assault" name="triggers" value="Sexual assault"> Sexual Assault
              </label>
            </div>
            <div>
              <label for="trigger-abuse">
                <input type="checkbox" id="trigger-abuse" name="triggers" value="Abuse"> Abuse
              </label>
            </div>
            <div>
              <label for="trigger-child-abuse">
                <input type="checkbox" id="trigger-child-abuse" name="triggers" value="Child abuse/pedophilia/incest"> Child abuse/pedophilia/incest
              </label>
            </div>
            <div>
              <label for="trigger-animal-cruelty">
                <input type="checkbox" id="trigger-animal-cruelty" name="triggers" value="Animal cruelty or animal death"> Animal cruelty or animal death
              </label>
            </div>
            <div>
              <label for="trigger-self-harm-suicide">
                <input type="checkbox" id="trigger-self-harm-suicide" name="triggers" value="Self-harm and suicide"> Self-harm and suicide
              </label>
            </div>
            <!-- ... other trigger options ... -->
          </div>
          <div class="column">
            <!-- More checkbox options for triggers -->
            <div>
              <label for="trigger-eating-disorders">
                <input type="checkbox" id="trigger-eating-disorders" name="triggers" value="Eating disorders, body hatred, and fat phobia"> Eating disorders
              </label>
            </div>
            <div>
              <label for="trigger-violence">
                <input type="checkbox" id="trigger-violence" name="triggers" value="Violence"> Violence
              </label>
            </div>
            <div>
              <label for="trigger-pornographic-content">
                <input type="checkbox" id="trigger-pornographic-content" name="triggers" value="Pornographic content"> Pornographic content
              </label>
            </div>
            <div>
              <label for="trigger-kidnapping">
                <input type="checkbox" id="trigger-kidnapping" name="triggers" value="Kidnapping and abduction"> Kidnapping and abduction
              </label>
            </div>
            <div>
              <label for="trigger-homophobia">
                <input type="checkbox" id="trigger-homophobia" name="triggers" value="Homophobia and heterosexism"> Homophobia
              </label>
            </div>
            <!-- ... other trigger options ... -->
          </div>
        </div>
       <p>  </p>  <!-- Empty paragraph line to create a space -->
        <input type="file" id="movie-cover" accept="image/*"> <!-- Input field for uploading movie cover image -->
        <input type="button" value="Add Movie" onclick="addMovie()"> <!-- Button to add the movie -->
      </form>
   ```

   JavaScript Form Submission Handling: 
In JavaScript, I implemented form submission handling to ensure that user input from the movie form is captured and processed accurately.
   ```javascript
   document.getElementById("movie-form").addEventListener("submit", function(event) {
     event.preventDefault();
     addMovie();
   });
   ```

   JavaScript Movie Data Processing:
   ```javascript
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
   ```
The JavaScript code, which handles form submission and invokes the `addMovie()` function, allows for data processing and insertion of the movie into the correct tab.

**Incorporating Tabs Functionality**:
   To enhance adhere to single page architecture requirmeents and provide easy navigation between different sections of the website, I decided to incorporate tab functionality. After examining an example provided by the teaching team, which implemented tab switching using data attributes, I thought it suitable for my website. Here's an explanation of the implementation:

   HTML Tab Structure:
   ```html
   <div class="tabs">
     <div class="tab" data-tab-target="#track-tab-content">Track</div>
     <div class="tab" data-tab-target="#overview-tab-content">Overview</div>
   </div>

   <div id="track-tab-content" class="tab-content">
     <!-- Movie items will be dynamically inserted here -->
   </div>

   <div id="overview-tab-content" class="tab-content">
     <!-- Overview statistics will be displayed here -->
   </div>
   ```

   JavaScript Tab Switching:
   ```javascript
   const tabs = document.querySelectorAll('.tab');
   const tabContents = document.querySelectorAll('.tab-content');

   tabs.forEach(tab => {
     tab.addEventListener('click', () => {
       const target = document.querySelector(tab.dataset.tabTarget);

       tabContents.forEach(tabContent => {
         tabContent.classList.remove('active');
       });

       tabs.forEach(tab => {
         tab.classList.remove('active');
       });

       tab.classList.add('active');
       target.classList.add('active');
     });
   });
   ```

By adopting this tab structure in the HTML and utilizing JavaScript to handle tab switching, the code now allows users to switch between the "Track" and "Overview" tabs by clicking on the corresponding tab elements.

**Upload Photos Section**:
   I decided to implement an upload photos section, so that users could see the covers of the movies they had watched. I introduced an input element of type "file" within the movie form to facilitate this functionality. To handle file selection and display a preview of the chosen photo, I integrated the

 following JavaScript code:

   HTML Photo Upload Input:
   ```html
   <input type="file" id="movie-cover" accept="image/*">
   ```

   JavaScript Photo Preview:
   ```javascript
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

  // Updating genre count and genre
   ```

   By including the "file" input type in the HTML form and attaching a change event listener to it, I allowed users to select a cover photo from their device. The JavaScript code then captures the selected file and enables the display of a preview, providing users with confirmation of their photo selection.

**Organizing Information into Tabs**:
   After users submit the movie form and provide their movie details, I wanted to ensure that the information is organized and displayed correctly within the appropriate tabs. The "tracked films" tab should showcase the movies tracked by the user, including their details and cover photos, while the "Overview" tab should provide a summary of the user's movie statistics. To achieve this, I implemented the following code snippets:

   JavaScript Movie Item Creation:
   ```javascript
   function createMovieItem(movie) {
     const movieItem = document.createElement('div');
     // Create the movie item structure using movie details
     // ...
     return movieItem;
   }
   ```

   JavaScript Adding Movie to Track Tab:
   ```javascript
   function addMovieToTrackTab(movie) {
     const trackTabContent = document.getElementById('track-tab-content');
     const movieItem = createMovieItem(movie);
     trackTabContent.appendChild(movieItem);
   }
   ```

   JavaScript Adding Movie Statistics to Overview Tab:
   ```javascript
   function updateOverviewStatistics() {
     const overviewTabContent = document.getElementById('overview-tab-content');
     // Calculate movie statistics (e.g., emotional triggers, genres, etc.)
     // ...
     // Update the overview tab with the statistics
     // ...
   }
   ```

   By designing the `createMovieItem()` function, I ensured the generation of the HTML structure for each movie item using the provided movie details. The `addMovieToTrackTab()` function inserts the created movie item into the track tab's content. The `updateOverviewStatistics()` function calculates the movie statistics, such as emotional triggers and genres, and updates the overview tab with the relevant information. Through these implementations, I successfully organized the movie information within their respective tabs.

**Emotional Triggers and Genres in Overview**:
   To provide users with tracking capabilities into their movie preferences, I decided to incorporate the tracking of emotional triggers and genres, y counting the occurrences of different trigger values and genres submitted by users. Here are the code snippets illustrating the implementation:

   JavaScript Emotional Trigger Counting:
   ```javascript
   function updateTriggerCount(triggerName) {
     const trigger = document.querySelector('input[name="triggers"][value="' + triggerName + '"]');
     if (trigger) {
       let count = parseInt(trigger.dataset.count) || 0;
       count++;
       trigger.dataset.count = count;
     }
   }
   ```

   JavaScript Genre Counting:
   ```javascript
   function updateGenreCount(genreName) {
     const genre = document.querySelector('input[name="genres"][value="' + genreName + '"]');
     if (genre) {
       let count = parseInt(genre.dataset.count) || 0;
       count++;
       genre.dataset.count = count;
     }
   }
   ```

   By implementing these JavaScript functions, I enabled the tracking and counting of emotional triggers and genres submitted by users.

 The `updateTriggerCount()` function increments the count of a specific trigger, while the `updateGenreCount()` function does the same for genres. These counts are then utilized to provide users with statistics in the "Overview" tab.

 
**Emotional Rating display**:
I wanted to include the overal ratings from the emotional rating in the form and display it in the overview. I was unable to get this functioning properly, it creates a lot of white space, but i left it in as a place holder even though it isnt functioning.

 ```javascript
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
```
Although this didnt work, it would have served as the basis for the overal rating to be displayed in the overview section too.

**Styling the Website for User Appeal**:
   Once I had established a functional skeletal structure for my website, I turned my attention to enhancing its visual appeal through CSS styling. By creating an attractive and visually pleasing interface, I aimed to provide users with an engaging and enjoyable experience. Here are the key aspects of my approach:

   - **CSS Styling for Layout and Typography**:
     I utilized CSS to define the overall layout of the website, including the positioning and arrangement of elements. By setting appropriate margins, padding, and widths, I ensured a well-organized and visually balanced design. Additionally, I carefully selected fonts, font sizes, and line heights to ensure optimal readability and aesthetic appeal.

     ```css
     /* Example CSS for layout and typography */
     .container {
       margin: 0 auto;
       max-width: 960px;
       padding: 20px;
     }

     h1 {
       font-size: 32px;
       line-height: 1.2;
       font-weight: bold;
     }
     ```

**Color Scheme and Visual Hierarchy**:
     By utilizing a consistent color palette, I created visual harmony and conveyed a unified brand identity. I also employed color contrast effectively to highlight important elements and establish a clear visual hierarchy.

     ```css
     /* Example CSS for color scheme */
     body {
       background-color: #f7f7f7;
     }

     .primary-button {
       background-color: #ff5500;
       color: #ffffff;
     }

     .movie-title {
       color: #333333;
       font-weight: bold;
     }
     ```




## Deployment

This project was initially created on replit as i was unable to get my server to run with node server.js, but after some trial and error i was able to get it to work with the below code.

```
  npm start
  node server.js
```

The user should be able to get the website up and running with this code