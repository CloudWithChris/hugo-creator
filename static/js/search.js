// Define the configuration options for Fuse Search
var fuseOptions = {
  isCaseSensitive: false,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 3,
  shouldSort: true,
  findAllMatches: false,
  keys: [
    {
      "name": "title",
      weight: 0.6
    },
    {
      "name": "contents",
      weight: 0.2
    },
    {
      "name": "tags",
      weight: 0.2
    }
  ],
  location: 0,
  threshold: 0.2,
  distance: 200,
  ignoreFieldNorm: true
};

// Set searchQuery as the value in the Query String for
// the s parameter.
var searchQuery = findGetParameter("s");

// If there is a parameter from the above, execute the search.
if (searchQuery) {
  $("#search-query").append(searchQuery);
  executeSearch(searchQuery);
} else {
  $('#search-results').append("<p>Please enter a word or phrase above</p>");
}

// The Execute Search function loads the index.json file. It reads the data within, and
// passes it to FuseJS.
function executeSearch(searchQuery){
  $.getJSON( "/index.json", function( data ) {
    var fuse = new Fuse(data, fuseOptions);
    var result = fuse.search(searchQuery);

    // If there were results from the search, then display those to the user.
    if(result.length > 0){
      populateResults(result);
    } else {
      // Otherwise, let the user know that there were no matches found.
      $('#search-results').append("<p>No matches found</p>");
    }
  });
}

// This is the function that populates the results, once the 
// search itself has been executed.
function populateResults(result){
  // Loop through all of the results of the
  // search query
  $.each(result, function(key,value) {
    // Load the #search-result-template file definition from the search layout template
    var templateDefinition = $('#search-result-template').html();

    // Build the HTML output using the render function. Pass
    // in the templateDefinition, and an object of the current
    // result in our loop.
    var output = render(templateDefinition,
      {
        key:key,
        title:value.item.title,
        link:value.item.permalink,
        tags:value.item.tags,
        image:value.item.image,
        section:value.item.section,
        series:value.item.series,
        guests:value.item.guests,
        datePublished:value.item.datePublished,
        hosts:value.item.hosts
      });
    $('#search-results').append(output);
  })
}

// The render function effectively calls a set of patternReplacement 
// methods to convert the HTML Template String into a target fragment
// of HTML, which renders the actual results.
function render(templateString, data) {
  templateString = patternReplacementForIsset(data, templateString);
  templateString = patternReplacement(/\$\{\s*guest ([a-zA-Z]*) \s*\}(.*)\$\{\s*end guest\s*}/g, data, "guests", templateString, convertToGuestsOutput);
  templateString = patternReplacement(/\$\{\s*host ([a-zA-Z]*) \s*\}(.*)\$\{\s*end host\s*}/g, data, "hosts", templateString, convertToHostsOutput);

  // Now any conditionals removed we can do simple substitution
  var key, find, re;
  for (key in data) {
    find = '\\$\\{\\s*' + key + '\\s*\\}';
    re = new RegExp(find, 'g');
    templateString = templateString.replace(re, data[key]);
  }

  return templateString;
}

function patternReplacementForIsset(data, templateString) {
  var matches;
  var tmp = templateString;
  var pattern = /\$\{\s*isset ([a-zA-Z]*) \s*\}(.*)\$\{\s*end isset\s*}/g;
  while ((matches = pattern.exec(templateString)) !== null) {
    if (data[matches[1]]) {
      // If the data matches, then there is a valid key. That means
      // we want to leave the contents within the isset brackets.
      tmp = tmp.replace(matches[0],matches[2]);
    } else {
      // If not, it's not valid - so we want to leave the contents
      // empty (i.e. replicating that isset returned false)
      tmp = tmp.replace(matches[0],'');
    }
  }
  return tmp;
}

function patternReplacement(pattern, data, property, templateString, outputFormat) {
  var matches;
  var tmp = templateString;
  while ((matches = pattern.exec(templateString)) !== null) {
    console.log(data);
    if (outputFormat){
      tmp = tmp.replace(matches[0], outputFormat(data[property]));
    } else {
      tmp = tmp.replace(matches[0], data[property]);
    }
  }
  return tmp;
}

function convertToGuestsOutput(arrayOfPeople) {
  var htmlOutput = "";
  if (arrayOfPeople.length > 0) {
    arrayOfPeople.forEach(
      person => {
        htmlOutput = htmlOutput + '<a href="/guest/'+ convertToUrl(person) +'"><img src="/img/guests/'+ person +'.jpg" width="50" class="rounded-circle z-depth-2" alt="' + person +'" title="'+ person +'" /></a> '
      }
    )
  }

  return htmlOutput;
}

function convertToHostsOutput(arrayOfPeople) {
  var htmlOutput = "";
  if (arrayOfPeople && arrayOfPeople.length > 0) {
    arrayOfPeople.forEach(
      person => {
        htmlOutput = htmlOutput + '<a href="/host/'+ convertToUrl(person) +'">'+  person +'</a> '
      }
    )
  }

  return htmlOutput;
}

function convertToUrl(text){
  return text.replace(/ /g, '-').replace(/[,]/g,"").toLowerCase();
}

// The findGetParameter method finds the value associated
// with a given parameter in the URL.
function findGetParameter(parameterName) {
  var result = null,
      tmp = [];
  location.search
      .substr(1)
      .split("&")
      .forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
      });
  return result;
}