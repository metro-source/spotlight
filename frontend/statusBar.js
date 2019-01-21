class StatusBar extends HTMLElement {
    constructor() {
        super();
        
        const root = this.attachShadow({
            mode: "open"
        });

        this._rate = this.getAttribute("rate");

        root.innerHTML = `
            <style>
                :host {
                    display: grid;
                    grid-template-columns: 200px auto 100px;
                    grid-template-rows: 50px;
                    background: #010400;
                    color: #fff;
                }

                h1 {
                    margin: 0;
                    padding: 5px;
                }

                #rate {
                    display: block;
                    padding: 15px 0;
                    grid-column-start: 3;
                }
            </style>
        
            <h1>
            Spotlight
            </h1>
            <span id="rate">
            ${this.rate}
            </span>
        `;

        this._root = root;
    }

    static get observedAttributes() {
        return ['rate'];
    } 

    get rate() {
        return this._rate;
    }

    set rate(value) {
        this._rate = value;
        this._root.querySelector("#rate").innerHTML = `${this._rate} VES`
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(name);
        if(name === "rate") {
            this.rate = newValue;
        }
    }
}

customElements.define("status-bar", StatusBar);

export default StatusBar;