import "./App.css";
import React from "react";
import { connect } from "react-redux";
import { clearLiked, clearSearch, clearUser } from "./redux/actions";
import ProtectedRoute from "./shared/protectedRoute";
import {
  BrowserRouter as Router,
  NavLink,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import Liked from "./components/liked";
import Login from "./components/login";
import Search from "./components/search";
import { Button, AppBar } from "@material-ui/core";

function App({ username, clearLiked, clearSearch, clearUser }) {
  return (
    <Router>
      <nav>
        {/* If logged in, show search page. If not logged in, show log in page. */}
        {!username && (
          // <AppBar position="fixed">
          //   <Button
          //     component={NavLink}
          //     variant="contained"
          //     color="primary"
          //     activeClassName="active"
          //     to="/login"
          //   >
          //     Login
          //   </Button>
          // </AppBar>
          <NavLink activeClassName="active" to="/login">
            Login
          </NavLink>
        )}
        {username && (
          <>
            <NavLink activeClassName="active" to="/search">
              Search
            </NavLink>
            <NavLink activeClassName="active" to="/liked">
              Liked
            </NavLink>
            <NavLink
              activeClassName="active"
              to="/login"
              onClick={() => {
                clearLiked();
                clearSearch();
                clearUser();
              }}
            >
              Logout
            </NavLink>
          </>
        )}
      </nav>
      <main>
        <Switch>
          <ProtectedRoute path="/login" reqUser={false} component={Login} />
          <Route path="/login">
            <Login />
          </Route>
          <ProtectedRoute path="/search" reqUser={true} component={Search} />
          <ProtectedRoute path="/liked" reqUser={true} component={Liked} />
          <Route path="*">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

function mapStateToProps(state) {
  return {
    username: state.user.username,
  };
}

const mapDispatchToProps = {
  clearLiked,
  clearUser,
  clearSearch,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
