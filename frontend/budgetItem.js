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
                grid-template-rows: minmax(75px, auto);
                background-color: #ececec;
                padding: 5px;
            }

            h2 {
                margin: 0;
            }

            #label {
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

            .disposable-input {
                width: 65%;
                display: inline;
                background: none;
                border: none;
                font-weight: bold;
                font-size: 1em;
                font-family: sans-serif;
            }

            #label-input {
                font-size: 1.5em;
                color: #333;
            }
        </style>

        <div tabindex=0 id="label"><h2>${this.label}</h2></div>
        <div tabindex=0 id="ves" class="money ves">${this.ves}</div>
        <div id="usd" class="money">${this.usd.toFixed(2)}</div>
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

        this._root.querySelector("#label").addEventListener("click", () => {
            if(!this.editingLabel) {
                this.startEditingLabel();
            }
        });
        
        this._root.querySelector("#label").addEventListener("focus", () => {
            if(!this.editingLabel) {
                this.startEditingLabel();
            }
        });

        this._root.querySelector("#ves").addEventListener("focus", () => {
            if(!this.editingVes) {
                this.startEditingVes();
            }
        });
    }

    startEditingVes() {
        this.editingVes = true;

        let input = document.createElement("input");
        input.autoFocus = true;
        input.type = "number";
        input.id = "ves-input";
        input.className = "disposable-input";
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

        // input.focus();
    }

    stopEditingVes() {
        this.editingVes = false;

        this._root.querySelector("#ves").innerHTML = `${this.ves}`;
    }

    get label() {
        return this._label;
    }

    set label(value) {
        this._label = value;
    }

    startEditingLabel() {
        this.editingLabel = true;

        let input = document.createElement("input");
        input.autofocus = true;
        input.type = "text";
        input.id = "label-input";
        input.className = "disposable-input";
        input.value = this.label;


        input.addEventListener("keypress", (e) => {
            if(e.key === "Escape" || e.key === "Enter") {
                this.stopEditingLabel();
            }
        });

        input.addEventListener("blur", () => this.stopEditingLabel())

        input.addEventListener("input", (e) => {
            this.label = e.target.value;
        });

        const labelContainer = this._root.querySelector("#label");
        labelContainer.innerHTML = ``;
        labelContainer.appendChild(input);

        input.focus();
    }

    stopEditingLabel() {
        this.editingLabel = false;

        const labelContainer = this._root.querySelector("#label");

        labelContainer.innerHTML = `<h2>${this.label}</h2>`;
    }
}

customElements.define("budget-item", BudgetItem);

export default BudgetItem;