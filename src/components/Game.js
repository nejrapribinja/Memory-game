import React, { useEffect, useState } from "react";
import { Container, Button, Col, Row } from "react-bootstrap";
import { auth } from "../firebase-config";
import Card from './Card';
import Score from "./Score";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, setDoc, getDocs, collection } from 'firebase/firestore/lite';
import { app } from '../firebase-config';

const cardImages = [
    { "src": "/img/1.jpg", matched: false },
    { "src": "/img/2.png", matched: false },
    { "src": "/img/3.png", matched: false },
    { "src": "/img/4.png", matched: false },
    { "src": "/img/5.png", matched: false },
    { "src": "/img/6.jpg", matched: false }
]

const Game = () => {
    const [db, setDb] = useState(getFirestore(app))
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [bestSc, setBestSc] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [foundPairs, setFoundPairs] = useState(0)
    const [modalShow, setModalShow] = useState(false);
    const navigate = useNavigate();

    const user = auth.currentUser;

    const shuffleCards = () => {
        // dupliramo 6 slika
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)               // pravimo random niz, negativan-ostaje isti redoslijed, pozitivan-mijenjaju mjesta
            .map((card) => ({ ...card, id: Math.random() })) // dodajemo svakoj karti id

        setChoiceOne(null)
        setChoiceTwo(null)
        setCards(shuffledCards)
        setTurns(0)
    }

    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
    }

    const getScore = async () => {
        const querySnapshot = await getDocs(collection(db, "players"));
            querySnapshot.forEach((doc) => {
                if (doc.id === user.uid) {
                    setBestSc(doc.data().bestScore)
                } 
            });
    }

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true)
            if (choiceOne.src === choiceTwo.src) {
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.src === choiceOne.src) {
                            setFoundPairs(foundPairs + 1);
                            return { ...card, matched: true }
                        } else {
                            return card
                        }
                    })
                })
                resetTurn()
            } else {
                setTimeout(() => resetTurn(), 1000)
            }
        }
        if (foundPairs === 6) {
            if (bestSc > turns || bestSc === 0) {
                setBestSc(turns)
                setDoc(doc(db, "players", user.uid), {bestScore:turns});
            }

            setModalShow(true)
            setFoundPairs(0)
        }
    }, [choiceOne, choiceTwo])

    useEffect(() => {
        getScore()
        shuffleCards()
    }, [])


    return (
        <Container fluid className='d-flex align-items-center justify-content-center c'>
            <Row className='d-flex align-items-center justify-content-center'>
                <Col md={12}>
                    <p><b>Player:</b> {user.email}</p>
                    <p><b>Best score:</b> {bestSc}</p>
                    <p><b>Turns:</b> {turns}</p>
                    <Button onClick={()=>{shuffleCards(); getScore()}} style={{ marginBottom: '5px' }}>New Game</Button>
                    <Button onClick={() => { auth.signOut(); navigate('/') }} >Sing Out</Button>
                </Col>
            </Row>
            <Row className='d-flex align-items-center justify-content-center'>
                <Col md={7}>
                    <h1 className="text-center">Memory Game</h1>
                    <div className="card-grid">
                        {cards.map(card => (
                            <Card
                                key={card.id}
                                card={card}
                                handleChoice={handleChoice}
                                flipped={card === choiceOne || card === choiceTwo || card.matched}
                                disabled={disabled} />
                        ))}
                    </div>

                </Col>
                <Score
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    turns={turns}
                    shuffleCards={shuffleCards}
                    getScore={getScore}
                    bestScore={bestSc}
                />
            </Row>
        </Container>
    )
}

export default Game;