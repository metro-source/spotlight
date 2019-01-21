import "./index.css";

import StatusBar from "./statusBar";
import TitleInput from "./titleInput";
import BudgetItem from "./budgetItem";

import appState from "./appState";

let bar = new StatusBar();

document.querySelector("header").appendChild(bar);

fetch("/api/rate")
    .then(response => response.json())
    .then(rate => {
        appState.rate = rate.price_per_coin;
        bar.setAttribute("rate", appState.rate);
    });