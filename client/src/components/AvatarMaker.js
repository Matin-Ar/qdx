import React from "react";
import DefaultAvatar from "../assets/DefaultAvatar.jpg";
import AvatarEditor from "react-avatar-editor";

class AvatarMaker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myImage: DefaultAvatar,
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
    }
  };

  setEditorRef = (editor) => (this.editor = editor);

  render(props) {
    return (
      <div>
        <div>
          <AvatarEditor
            ref={this.setEditorRef}
            image={DefaultAvatar}
            width={250}
            height={250}
            border={5}
            scale={1.2}
          />
        </div>

        <div className="avatar-input-file-wrapper">
          <input
            type="file"
            name="avatar-upload-input"
            id="avatar-upload-input"
          ></input>

          <label htmlFor="avatar-upload-input" className="avatar-upload-label">
            {" "}
            📥 لطفا آواتار خود را انتخاب نمایید
          </label>
          <span className="avatar-uploaded-file-tag">
            <span>
              {" "}
              <strong>فایل انتخاب شده :</strong>
              <span>هیج فایلی انتخاب نشده است</span>
            </span>
            <span className="avatar-uploaded-file-tag-desc">
              * حداکثر ظرفیت مجاز 1 مگابایت می باشد | فرمت های مجاز : jpeg , jpg
              , png
            </span>
          </span>
        </div>
        <div className="avatar-page-button-wrapper">
          <button className="avatar-page-button-upload">تایید و آپلود</button>
          <button
            className="avatar-page-button-cancel"
            onClick={this.props.handleModleClose}
          >
            لغو و بازگشت
          </button>
        </div>
      </div>
    );
  }
}

export default AvatarMaker;
