# My attempt at Mimo Frontend Coding Challenge

## How to test
- I encourage you to go read the code - I added comments to explain certain things.
- Install Node.js, clone the repository locally
- Open a terminal and run (within the project root directory) $ npm i
- Run $ npm run dev
- Open the provided localhost URL and test the app
- Also run the unit tests: $ npm test

## Stack
- Vite to quickly set up a simple node.js React.js app scaffold
- Zustand state management library for simple state management, without overkill. Used its persist middleware to save lesson and progress data
- Jest for easy unit tests

## Disclaimer / restrictions
Since the challenge description didn't encourage going beyond specifications, I refrained from a number of otherwise industry starndard aspect of a similar app, such as:
- Routing, because of the app's simplicity
- Separating the UI into separate components, since App.tsx is < 100 lines, and each of the conditional UI bits are simple enogh to be together. In this case, organizing them into a separate components/ folder and their dedicated files would needlessly complicate readibility 
- Eslint config / similar. Since this is not a collaboration, nor a project intended to be re-used by others, nor maintained. If it was otherwise, it would be beneficial to help enforce coding conventions and avoid re-format commit bloat.
- Authentication within the app
- Authentication to API
- Input sanitation
- Snapshot unit testing of the UI - the entire app is in a small component with not much logic within the UI. If there were re-used components I would introduce snaphot tests.
- Documentation - aside from this readme, a more robust app would benefot from documenting e.g. util functions' parameters, output, state management, app organization, etc.
- Fancy UI - I re-used much of the vite-react app's boilerplate styling, as the challenge description did not encourage going beyond this. I added a loading spinner to a button for good measure :)
- SEO & miscellaneous Head meta tags
- CI / CD / deployment
- A11Y - In production it would make sense to add aria tags, roles, labels to the UI so students would better understand what is on the screen, what they can do, and what is happening
- Any further logic related to "Lesson completion event". I store lession completion timestamps in the persistant state. It would make sense to save them on the backend or display them in a nice format within the UI but the specification runs short on this topic. The developed solution is intended to be a good foundation to either.

> If you are looking for any detail that I haven't covered or worked on, please feel free to reach out! I'd be more than happy to elaborate on the reason and my past experience.

*Thank you for the exciting challenge! I enjoyed the algorithm problem regarding the insertion of the input field, as well as getting hands-on with Vite and Zustand.*

