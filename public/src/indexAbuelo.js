import * as components from './components/indexPadre.js';
import { candidates } from './data/data.js';

customElements.define('my-card', components.Card);

class AppContainer extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.shadowRoot.innerHTML = `
        <style>
           .candidates-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    background-color: blue;
        }
            h1 {
                text-align: center;
                color: #333;
            }
        </style>
        <h1>Elecciones Presidente</h1>
        <div class="candidates-container">
            ${candidates
							.map(
								(candidate) => `
                <my-card
                    name="${candidate.name}"
                    city="${candidate.city}"
                    image="${candidate.image}"
                ></my-card>
            `
							)
							.join('')}
        </div>
        `;
	}
}

customElements.define('app-container', AppContainer);
