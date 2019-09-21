import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card';
import './Deck.css';
const BASE_API_URL = "https://deckofcardsapi.com/api/deck";

class Deck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deck: null,
            drawn: []
        };
        this.getCard = this.getCard.bind(this);
    };

    async componentDidMount() {
        let deck = await axios.get(`${BASE_API_URL}/new/shuffle/`);
        this.setState({
            deck: deck.data
        })
    };

    async getCard() {
        let deck_id = this.state.deck.deck_id;
        try {
            let cardUrl = `${BASE_API_URL}/${deck_id}/draw/`;
            let cardRes = await axios.get(cardUrl);
            if(!cardRes.data.success) {
                throw new Error("No card remaining!");
            }

            let card = cardRes.data.cards[0];
            console.log(card)
            this.setState(st => ({
                drawn: [
                    ...st.drawn,
                    {
                        id: card.code,
                        image: card.image,
                        name: `${card.value} of ${card.suit}`
                    }
                ]
            }))
        } catch(err) {
            alert(err);
        }
        
    }

    render() {
        const cards = this.state.drawn.map(c => (
            <Card key={c.id} image={c.image} alt={c.name} />
        ))
        return(
            <div>
                <h1 className="Deck-title">Card Dealer</h1>
                <h2 className="Deck-title sub-title">A little 52 cards demo made with ReactJS</h2>
                <button className="Deck-btn" onClick={this.getCard}>Get Card!</button>
                <div className="Deck-cardarea">
                    {cards}
                </div>
            </div>
        );
    }
};

export default Deck;

