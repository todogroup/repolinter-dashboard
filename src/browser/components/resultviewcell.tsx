import * as React from 'react';
import * as Modal from 'react-modal';

import ResultViewer from '../components/resultviewer';

interface Props {
  scanData: any;
}

interface State {
  modalIsOpen: boolean;
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '80%',
  },
};

Modal.setAppElement('body');

export default class ResultCell extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const jsonData = { data: JSON.parse(this.props.scanData) };
    return (
      <div className="center">
        <button className="btn" onClick={this.openModal}>
          Show Result
        </button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <ResultViewer result={jsonData} />
          <br />
          <button className="btn btn-dark" onClick={this.closeModal}>
            close
          </button>
        </Modal>
      </div>
    );
  }
}
