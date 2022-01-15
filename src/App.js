import Home from 'components/Home/Home';
import { Switch, Route } from 'react-router-dom';
import ContactDetailsPage from './components/ContactDetailsPage/ContactDetailsPage.jsx';

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/:contactId">
          <ContactDetailsPage />
        </Route>
      </Switch>
    </>
  );
};

export default App;
