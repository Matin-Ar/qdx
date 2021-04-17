import React, { Component } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import AvatarMaker from "./AvatarMaker";
import ReactModal from "react-modal";
import DashboardForm from "./DashboardForm";

const reactModalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#1b212d",
    zIndex: 100,
  },
  content: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: "40px",
    left: "40px",
    right: "40px",
    bottom: "40px",
    border: "1px solid #ffc000",
    background: "#fff",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "20px",
    backgroundColor: "#121621",
  },
};

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleModleClose = this.handleModleClose.bind(this);
    this.handleModleOpen = this.handleModleOpen.bind(this);
    this.state = {
      ModalIsOpen: false,
    };
  }
  handleModleClose() {
    this.setState({
      ModalIsOpen: false,
    });
  }
  handleModleOpen() {
    this.setState({
      ModalIsOpen: true,
    });
  }
  render() {
    return (
      <div>
        <DashboardForm handleModleOpen={this.handleModleOpen} />
        <ReactModal
          isOpen={
            this.state.ModalIsOpen
            /* Boolean describing if the modal should be shown or not. */
          }
          onRequestClose={this.handleModleClose}
          style={reactModalStyles}
          className="modal-content"
        >
          <AvatarMaker
            handleModleClose={this.handleModleClose}
            handleRerender={this.handleRerender}
          ></AvatarMaker>
        </ReactModal>
      </div>
    );
  }
}
