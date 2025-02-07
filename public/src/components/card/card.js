class Card extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.votes = 0;
    }

    static get observedAttributes(){
        return ["name", "city", "image"]
    }

    attributeChangedCallback(propName,oldValue,newValue){
        this[propName] = newValue;
        this.render();
    }

    connectedCallback(){
        this.render();
        this.addEventListeners();
    }

    addEventListeners() {
        this.shadowRoot.querySelector('.vote-button').addEventListener('click', () => {
            this.votes++;
            this.updateVotes();
        });
    }

    updateVotes() {
        this.shadowRoot.querySelector('.vote-count').textContent = `${this.votes} votos`;
        const event = new CustomEvent('voteChanged', {
            detail: { votes: this.votes },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(event);
    }

    render(){
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="src/components/card/card.css">
        <div class="card-container">
            <img class="candidate-img" src="${this.image}" alt="${this.name}">
            <h2>${this.name}</h2>
            <h3>${this.city}</h3>
            <button class="vote-button">Votar</button>
            <span class="vote-count">${this.votes} votos</span>
        </div>
        `
    }
}

export default Card;