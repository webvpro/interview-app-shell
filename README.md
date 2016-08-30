# interview-app-shell
Basic Express based app for serving up a React based application

## Basic Details
Install dependencies via "npm install". Then, start server via "npm start"
Running server can be accessed via localhost:3000

Work goes in the /client folder. Everything required in here is transpiled down from ES6/ES7 to standard ES5 using webpack and babel.

API is located at localhost:3000/api/incoming which serves up a json file. For response shape reference /server/mockData/incoming.json

Project should be forked from this repo and final version uploaded to applicant's GitHub account.

No CSS or layout requirements, focus on functionality and code quality. Code should be well written with consistent code style.

Project uses basic webpack + express based template allowing for use of ES6 and ES7. This is a React based app which uses Mobx for its internal state management (already implemented in project template).

## Project Requirements
App's purpose is to track near doomsday misses. By calling the /api/incoming endpoint, the app can get a response which includes all near earth objects (NEO) over a small date range (data pulled from NASA). The app will then display this data as follows:
- Users can select from the number of days they wish to see (1,2,3, etc) ranging from 1 - the total number of days returned by the api
- A selection of 1 will filter the data for only the first (earliest) day returned, a selection of 2 will filter for the earliest and the next earliest day, etc. 
- Default days selection is the total number of days returned by the api
- Resulting beginning and end days based upon days selected should be presented to the user
- The top of the application should present the user with aggregate information for the selected time range to include the following metrics:
  - Closest miss in miles based upon the selected time range
  - Fastest NEO in KPH based upon selected time range
  - Largest NEO in meters based upon selected time range
- App will display a table where each row represents a single near earth object recorded between the beginning and end dates (inclusive)
  - Column 1 will be the NEO name
  - Column 2 will be the NEO close approach date
  - Column 3 will be the relative velocity in KPH
  - Column 4 will be the miss distance in kilometers
  - Column 5 will be a link the user can click on to visit NASA's JPL info page on the NEO (nasa_jpl_url)
- Users should be able to click on column headers (except for Column 5) to sort and reverse sort the table based upon the column they clicked upon

## Restrictions:
Lodash / Underscore libraries are not permitted, data manipulation should use either built in JS Array or Immutable JS functions

## Tips:
We're not expecting you to update any of the code outside of the /client directory. You can call in extra packages if you wish, but your main focus should be on achieving the functionality above with the mindset of leaving design implementation for a later iteration.
Requirements above are listed in order of priority.
