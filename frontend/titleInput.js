class TitleInput extends HTMLElement {
    constructor() {
        super();

        this._root = this.attachShadow({
            mode: "open"
        });

        this._root.innerHTML = `
            <style>
                input {
                    width: 100%;
                    font-size: 1.5em;
                    display: block;
                    background: #fff;
                    border: none;
                    border-bottom: 1px solid #ccc;
                    transition: 200ms border-color;
                }

                input:focus {
                    border-bottom: 1px solid #000;
                }
            </style>
            <input type="text" value="List title" />
        `;
    }
}

customElements.define("title-input", TitleInput);
export default TitleInput;