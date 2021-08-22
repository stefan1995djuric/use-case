import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import LanguageProvider from "./containers/LanguageProvider";
import { ConnectedRouter } from "connected-react-router";
import history from "./utils/history";
import configureStore from "./configureStore";
import { translationMessages } from "./i18n";

const initialState = {};
const store = configureStore(initialState, history);

const MOUNT_NODE = document.getElementById("root");

const render = (messages) => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE
  );
};

if (module.hot) {
  module.hot.accept(["./i18n"], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

if (!window.Intl) {
  new Promise((resolve) => {
    resolve(import("intl"));
  })
    .then(() => Promise.all([import("intl/locale-data/jsonp/en.js")]))
    .then(() => render(translationMessages))
    .catch((err) => {
      throw err;
    });
} else {
  render(translationMessages);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
