import './App.css';
import { Helmet } from 'react-helmet';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LegacyEditPage from './pages/legacy/EditPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import ArticlePage from './pages/ArticlePage';
import EditPage from './pages/EditPage';
import DebugPage from './pages/DebugPage';

function App() {
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Binote</title>
      </Helmet>
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/article">
            <ArticlePage />
          </Route>
          <Route path="/edit/:id">
            <EditPage />
          </Route>
          <Route exact path="/edit">
            <Redirect to="/edit/draft" />
          </Route>
          <Route path="/debug">
            <DebugPage />
          </Route>
          <Route path="/legacy/edit">
            <LegacyEditPage />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
