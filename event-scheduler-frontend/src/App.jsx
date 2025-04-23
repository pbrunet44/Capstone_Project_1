// Created by Philip Brunet

import { useEffect, useState } from "react";
import "./App.css";
import Alert from "./components/Alert";
import AlertContext from "./context/AlertContext";
import TokenContext from "./context/TokenContext";
import PageRouter from "./routes/PageRouter";
import axios from "axios";

export const noAlert = {
  msg: null,
  isErr: null,
};

const oneDaySecs = 24 * 60 * 60;

const serverUrl = import.meta.env.VITE_SERVER_URL;
const api = axios.create({
  baseURL: serverUrl,
});

api.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("jwt"));
    if (token) {
      config.headers.Authorization = `Bearer ${token.value}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const setCookie = (name, value, maxAge) => {
  document.cookie = `${name}=${value};max-age=${maxAge};path=/`;
};
const getCookie = (name) => {
  const c = document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)");
  return c ? c.pop() : "";
};

function App() {
  const [alert, setAlert] = useState(noAlert);
  const [jwt, setJwt] = useState(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("jwt"));
    const now = new Date();
    if (token && now.toISOString() < token.expires) {
      setJwt(token);
    } else if (token) {
      localStorage.removeItem("jwt");
    }
  }, []);
  useEffect(() => {
    if (alert.msg) {
      const timer = setTimeout(() => {
        setAlert(noAlert);
      }, 3000);
    }
  }, [alert.msg]);
  return (
    <div className="app">
      <TokenContext.Provider value={{ jwt: jwt, setJwt: setJwt }}>
        <AlertContext.Provider value={{ alert: alert, setAlert: setAlert }}>
          <PageRouter />
          {alert.msg && <Alert msg={alert.msg} isErr={alert.isErr} />}
        </AlertContext.Provider>
      </TokenContext.Provider>
    </div>
  );
}

export default App;
export { getCookie, setCookie, oneDaySecs, api };

//The following websites were referenced while making this code:
//https://stackoverflow.com/questions/51109559/get-cookie-with-react
//https://colordesigner.io/gradient-generator
//https://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript
//https://lodash.com/docs
//https://www.w3schools.com/html/html_tables.asp
//https://www.geeksforgeeks.org/reactjs-usenavigate-hook/
//https://www.codingdeft.com/posts/react-checkbox/
//https://stackoverflow.com/questions/25797048/how-to-pass-in-a-react-component-into-another-react-component-to-transclude-the
//https://www.w3schools.com/tags/tag_select.asp
//https://www.npmjs.com/package/react-select
//https://github.com/JedWatson/react-select/issues/3215
//https://stackoverflow.com/questions/43495696/how-to-set-a-default-value-in-react-select
//https://stackoverflow.com/questions/7551113/how-do-i-set-path-while-saving-a-cookie-value-in-javascript
//https://mobilepalette.colorion.co/
//https://www.w3schools.com/cssref/pr_font_weight.php
//https://www.w3schools.com/cssref/css3_pr_justify-content.php
//https://stackoverflow.com/questions/3314989/can-i-make-a-button-not-submit-a-form
//https://www.w3schools.com/cssref/pr_border-bottom.php
//https://stackoverflow.com/questions/4148499/how-to-style-a-checkbox-using-css#4148544
//https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
//https://stackoverflow.com/questions/4062001/can-you-set-a-border-opacity-in-css
//https://stackoverflow.com/questions/31217268/center-div-on-the-middle-of-screen
//https://www.w3schools.com/Jsref/jsref_includes_array.asp
//https://vitest.dev/guide/browser/locators.html
//https://bobbyhadz.com/blog/react-testing-library-find-by-classname
//https://blog.logrocket.com/testing-react-router-usenavigate-hook-react-testing-library/#testing-usenavigate-hook-jestmock
//https://stackoverflow.com/questions/66284286/react-jest-mock-usenavigate
//https://vitest.dev/api/vi.html#vi-mock
//https://colorcodes.io/red/light-red-color-codes/
//https://stackoverflow.com/questions/4147112/how-to-jump-to-top-of-browser-page
//https://stackoverflow.com/questions/13384808/how-do-i-set-up-mailto-for-bcc-only
//https://vite.dev/guide/env-and-mode
//https://stackoverflow.com/questions/49579028/adding-an-env-file-to-a-react-project
//https://medium.com/@preetigusain9173/how-to-allow-cookies-to-be-shared-across-domains-eb1a0aee5af3
//https://www.sohamkamani.com/javascript/localstorage-with-ttl-expiry/
//https://stackoverflow.com/questions/13715561/compare-iso-8601-date-strings-in-javascript
