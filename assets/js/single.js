var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");

var getRepoIssues = function(repo) {
  var apiUrl = `https://api.github.com/repos/${repo}/issues?direction=asc`;
  fetch(apiUrl).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        displayIssues(data);
        // check if api has paginated issues
        if (response.headers.get("Link")) {
          displayWarning(repo);
        }
      });
    } else {
      alert("There was a problem with your request!");
    }
  });
};

var displayIssues = function(issues) {
  if (issues.length === 0) {
    issueContainerEl.textContent = "This repo has no open issues!";
    return;
  }
  for(var i = 0; i < issues.length; i++) {
    //create a link element to take users to the issue on github
    var issueEl = document.createElement("a");
    issueEl.classList = "list-item flex-row justify-space-between align-center";
    issueEl.setAttribute("href", issues[i].html_url);
    issueEl.setAttribute("target","_blank");
    
    // create a span to hold issue title
    var titleEl = document.createElement("span");
    titleEl.textContent = issues[i].title;
    issueEl.appendChild(titleEl);
    //create a type element
    var typeEl = document.createElement("span");

    //check to see if issue is a pull request
    if (issues[i].pull_request) {
      typeEl.textContent = "(Pull Request)";
    } 
    else {
      typeEl.textContent = "(Issue)";
    }
    issueEl.appendChild(typeEl);

    issueContainerEl.appendChild(issueEl);
  }
};

var displayWarning = function(repo) {
  // add text to warning container
  limitWarningEl.textContent = "This repo has over 30 issues. To see more issues, visit: ";
  var linkEl = document.createElement("a");
  linkEl.textContent = "See More Issues on Github.com";
  linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
  linkEl.setAttribute("target", "_blank");
  limitWarningEl.appendChild(linkEl);
};

getRepoIssues("facebook/react");