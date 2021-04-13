import React from "react";
import DefaultAvatar from "../assets/DefaultAvatar.jpg";
import AvatarEditor from "react-avatar-editor";

class AvatarMaker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myImage: "",
    };
  }
  onClickSave = () => {
    if (this.editor) {
      // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
      // drawn on another canvas, or added to the DOM.
      const canvas = this.editor.getImage();
      const canvasURI = canvas.toDataURL();
      console.log(canvasURI);
      this.setState({ myImage: canvasURI });

      // If you want the image resized to the canvas size (also a HTMLCanvasElement)
      const canvasScaled = this.editor.getImageScaledToCanvas();
    }
  };

  setEditorRef = (editor) => (this.editor = editor);

  render() {
    return (
      <div>
        <AvatarEditor
          ref={this.setEditorRef}
          image={DefaultAvatar}
          width={250}
          height={250}
          border={50}
          scale={1.2}
        />
        <button onClick={this.onClickSave}>save </button>
        <img src={this.state.myImage} />
      </div>
    );
  }
}

export default AvatarMaker;
