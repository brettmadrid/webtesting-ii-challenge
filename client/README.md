write tests that simulate as much as possible the manual process you would take to test.

1. start yarn test to see if test module is running.  add --watch to json to keep it running.

2. yarn add react-testing-library --dev and yarn add jest-dom

3. import { render } from 'react-testing-library'; // add to app.test.js
   import 'jest-dom/extend-expect';

  this will allow for the automatic mounting and unmounting of the component

4. add to app.test.js the following test to make sure the app loads:

  it('renders without crashing', () => {
    render(<App.js />)
  })

5. To ensure that the component being tested can fail and that the test properly reports the fail, temporarily disable some part of the component that is vital to it's working properly. This should result in a failed test.  The repair the temporary code and ensure that the test passes.

6. The next simple test is to see if what it is rendering is correct. The render method also returns a useful getByText method that can be used to look for any text appearing on the component when it renders.

  it('displays hello world', () => {
    const { getByText } = render(<App />)
    //getByText('Hello World'); // case sensitive
    getByText(/hello world/i); // use regex to make case insensitive
  })

  run the test - it should fail because there is no 'Hello World' output text in app.js
  add the output text and re-run.  It should pass.

7. There is also a queryByText method and it is not as specific as getByText. For instance, this would pass since the text being looked for does indeed exist:

  it('displays hello world', () => {
    const { queryByText } = render(<App />)
    queryByText(/hello orld/i); // note missing w
  })

8. To be able to test React components at a deeper level:

  yarn add jest-dom // https://github.com/gnapse/jest-dom for list of matchers

9. in app.test.js import:

  import 'jest-dom/extend-expect'; // extends the list of matchers jest uses

10. in app.test.js, now that jest-dom is installed, use the toBeInTheDocument matcher. Refactor to look like:

  it('displays hello world', () => {
    const { queryByText } = render(<App />);
    const text = queryByText(/hello world/i);
    expect(text).toBeInTheDocument();
  })

11. To test for a button click, first create the test so that it fails, then add the button and get the test to pass.  Test for a button named 'greet' then when pressed displays 'greetings':

  it('should display 'greetings' when the greet button is clicked', () => {
  // render the page
    const { getByText } = render(<App />);
  // find the button
    const button = getByText(/greet/i); // getByText used to make test fail if button doesn't exist
  // click the button
  // find the greeting
  })

  now save and the test should fail since the button has not been added to app.js yet.
  then add a button and the test should pass!

12. Now fill in the click the button test. To test events, add fireEvent to the react-testing-library import in app.test.js:

  import { render, fireEvent } from 'react-testing-library';

  now add the following click test code:

  // click the button
  fireEvent.click(button) // pass in something clickable and it fires it

13. Now test if the greeting is displayed when the button is clicked.  First set up the test, so it fails, then wire up the button to display the greeting and the retest should pass.

  // find the greeting
  getByText(/greetings/i);

  now run the test, it should fail.

  Now add a button to app.js that displays 'greetings' and the retest should pass

14. Create folder called players and create the following files in it:

  Players.js - functional component that displays "Players List"
  Players.test.js - compy imports from app.test.js (don't need ReactDom).  Import Players.js

15. in Players.test.js create a describe outer wrapper:

  describe('The Players Component', () => {

  })

16. Create a test to see if it renders:

  it('should render without crashing', () => {
    render (<Players />)
  });

17. Create test to see if it displays 'Players List':

  it('should display Player List', () => {
    const { getByText } = render(<Players />);
    const text = getByText(/player list/i);
    expect(text).toBeInTheDocument();
  })

18. Now create an array in Players.js

    const { players = 0 } = props

  now map over the list of players:

    {Players.map(p => (
        <div key={p.id}>{p.name}</div>
    ))}

19. Now create a test looking for a default message when there are no players:

  it('should display default message when there are no players', () => {
    const { getByText } = render(<Players />)
    getByText(/no players available/i)
  })

20. run the test, it should fail since 'no players available' does not exist yet. After test fails, add the text logic to Players.js just above the return line:

  if (!players || !players.length) {
    return <div>no players available</div>
  }

  note: before running, xit out the test checking for a player list since these two test opposite returns

21. Now alter the test looking for 'players list' to be displayed to be more precise, testing for 'players list' to only appear if there is at least one player. Create a players array and pass it in:

  it('should display Player List when there are players', () => {
    const players = [
      {id: 1, name: 'Sam'},
      {id: 2, name: 'Bilbo'},
      {id: 3, name: 'Frodo'},
    ];

    const { getByText } = render(<Players players={players}/>);
    const text = getByText(/player list/i);
    expect(text).toBeInTheDocument();
  })

  note: now xit out the test looking for 'no players available'

22. To test for actual players showing up first add the className='data-testid' to the div element in the map. This classname is specific to the react-testing-library.

  {players.map(p => (
    <div data-testid='player-name' key={p.id}>{p.name}</div>
  ))}

23. Now in Players.test.js add the test:

  it('should render a list of players', () => {
    const players = [
      {id: 1, name: 'Sam'},
      {id: 2, name: 'Bilbo'},
      {id: 3, name: 'Frodo'},
    ];

    const { getAllByTestId } = render(<Players players={players}/>);

    const playerDivs = getAllByTestId('player-name');

    expect (playerDivs.length).toBe(players.length);

    // get names from sample data
    const playerNames = players.map(p => p.name);

    // get names from our divs - textContent gets innerHTML text content
    const divContent = playerDivs.map(d => d.textContent);

    expect(playerNames).toEqual(divContent);
  })

  before running the test, need to put cleanup() at the end of the earlier test where the list of players was created since if both tests run it will fail.