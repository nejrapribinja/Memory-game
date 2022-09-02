import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Score(props) {

  const newGame = () => {
    props.onHide();
    props.shuffleCards();
    props.getScore();
  }
  
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Memory Game
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Turns: {props.turns}</p>
        <p>Best score: {props.bestScore}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={newGame}>New Game</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Score;