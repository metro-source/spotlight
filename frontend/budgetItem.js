import appState from "./appState";

class BudgetItem extends HTMLElement {
    constructor() {
        super();

        this._root = this.attachShadow({
            mode: "open"
        });

        this._label = this.getAttribute("label") || "Item";
        this._ves = this.getAttribute("ves") || 1;

        this.editingLabel = false;
        this.editingVes = false;

        this._root.innerHTML = `
        <style>
            :host {
                display: grid;
                grid-template-columns: auto 200px 200px;
                grid-template-rows: 75px;
                background-color: #ececec;
                padding: 5px;
            }

            h2 {
                margin: 0;
                padding: 23px 10px;
            }

            .money {
                font-size: 1.35em;
                font-weight: bold;
                padding: 25px 10px;
                color: #18b718;
            }

            .money::before {
                content: "$"
            }

            .money.ves {
                color: #000;
            }

            .money.ves::before {
                content: "VES ";
            }

            .money-input {
                width: 65%;
                display: inline;
                background: none;
                border: none;
                font-weight: bold;
                font-size: 1em;
                font-family: sans-serif;
            }
        </style>
        <h2>Test item</h2>
        <span id="ves" class="money ves">${this.ves}</span>
        <span id="usd" class="money">${this.usd.toFixed(2)}</span>
        `;
    }

    get ves() {
        return this._ves;
    }

    set ves(val) {
        this._ves = val;
        this._root.querySelector("#usd").innerHTML = this.usd.toFixed(2);
    }

    get usd() {
        return this._ves / appState.rate;
    }

    connectedCallback() {
        this._root.querySelector("#ves").addEventListener("click", () => {
            if(!this.editingVes) {
                this.startEditingVes();
            }
        });
    }

    startEditingVes() {
        this.editingVes = true;

        let input = document.createElement("input");
        input.autofocus = true;
        input.type = "number";
        input.id = "ves-input";
        input.className = "money-input";
        input.value = this.ves;


        input.addEventListener("keypress", (e) => {
            if(e.key === "Escape" || e.key === "Enter") {
                this.stopEditingVes();
            }
        });

        input.addEventListener("blur", () => this.stopEditingVes())

        input.addEventListener("input", (e) => {
            this.ves = e.target.value;
        });

        const vesContainer = this._root.querySelector("#ves");
        vesContainer.innerHTML = ``;
        vesContainer.appendChild(input);
    }

    stopEditingVes() {
        this.editingVes = false;

        this._root.querySelector("#ves").innerHTML = `${this.ves}`;
    }
}

customElements.define("budget-item", BudgetItem);

export default BudgetItem;