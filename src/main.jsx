import React from "react";
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import {store} from "./store";
import App from "./App.jsx";
import "./styles/index.css";

if ("serviceWorker" in window.navigator) {
    window.navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then(function (registration) {
            console.log("Registration successful, scope is:", registration.scope);
        })
        .catch(function (err) {
            console.log("Service worker registration failed, error:", err);
        });
}
console.log(window.navigator.serviceWorker.getRegistration());

// service-worker.js
self.addEventListener("install", (event) => {
    console.log("Service worker installed");
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);
