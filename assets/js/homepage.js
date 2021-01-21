// ~~~ Global Variables ~~~
// DOM elements
var  userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTermEl = document.querySelector("#repo-search-term");

var getUserRepos = function(user) {
  // format the api url
  var apiUrl = `http://api.github.com/users/${user}/repos`;
  // make a request to the url
  fetch(apiUrl)
    .then(function(response) {
      if(response.ok) {
        // then convert response to json
        response.json()
        // then show me the data
        .then(function(data) {
          displayRepos(data, user);
        });
      } else {
        alert("Error: " + response.statusText)
      }
    })
    .catch(function(error) {
      alert("Unable to connect to GitHub");
    });
};

var displayRepos = function(repos, searchTerm) {
  // check if api returned any repos
  if(repos.length === 0) {
    repoContainerEl.textContent = "No repositories found.";
    return;
  }
  // clear old content
    repoContainerEl.textContent = "";
    repoSearchTermEl.textContent = searchTerm
  // loop over repos
  for (let i = 0; i < repos.length; i++) {
    // format repo name
    var repoName = repos[i].owner.login + "/" + repos[i].name;

    // create a container for each repo
    var repoEl = document.createElement("div");
    repoEl.classList = "list-item flex-row justify-space-between align-center";

    // create a span element to hold repository name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;
    // append to container
    repoEl.appendChild(titleEl);

    // create a status element
    var statusEl = document.createElement("span")
    statusEl.classList = "flex-row align-center"
    // check if current repo has issues or not
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)"
    } else {
      statusEl.innerHTML = 
        "<i class='fas fa-check-square status-icon icon-success'></i>"
    }
    // append to container
    repoEl.appendChild(statusEl);
    
    //append container to the DOM
    repoContainerEl.appendChild(repoEl);
  }
};

// ~~~ Event Handlers ~~~
var formSubmitHandler = function(event) {
  event.preventDefault();
  var username = nameInputEl.value.trim();
  if (username) {
    // pass user name into the getUserRepos()
    getUserRepos(username);
    // clear form input
    nameInputEl.value = "";
  } else {
    alert("Please enter a GitHub username");
  }
};

// ~~~ Event Listeners ~~~
userFormEl.addEventListener("submit",formSubmitHandler);