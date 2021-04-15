import React from "react";
import AvatarEditor from "react-avatar-editor";
import { startSetUserAvatar } from "./../Actions/user";
import { connect } from "react-redux";

export class AvatarMaker extends React.Component {
  constructor(props) {
    super(props);
    this.handleFileSelect = this.handleFileSelect.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleRotationChange = this.handleRotationChange.bind(this);
    this.handleScaleChange = this.handleScaleChange.bind(this);

    this.state = {
      myImage: `http://localhost:3001/users/${this.props.userId}/avatar`,
      uploadedFileName: "هیچ فایلی انتخاب نشده",
      file: "",
      imgRotation: 0,
      imgScale: 1,
    };
  }

  handleFileSelect(e) {
    this.setState({
      myImage: e.target.files[0],
      uploadedFileName: e.target.files[0].name,
      file: e.target.files[0],
    });
  }

  handleFileUpload(e) {
    let file = this.state.file;

    if (this.editor) {
      const canvas = this.editor.getImage().toDataURL();
      let profileImage = new Image();
      profileImage.crossOrigin = "anonymous";
      profileImage.src = canvas;
      console.log(profileImage);

      this.props.dispatch(startSetUserAvatar(profileImage)).then((res) => {
        console.log("res from .then -- avatar:", res);
        if (res === 200) {
          alert("آپلود با موفقیت انجام شد");
          this.props.handleModleClose();
        } else {
          alert(res);
        }
      });
    }
  }

  handleRotationChange(e) {
    this.setState({
      imgRotation: e.target.value,
    });
  }

  handleScaleChange(e) {
    this.setState({
      imgScale: e.target.value,
    });
  }

  setEditorRef = (editor) => (this.editor = editor);

  render(props) {
    return (
      <div>
        <div className="avatarEditor-wrapper">
          <AvatarEditor
            ref={this.setEditorRef}
            image={this.state.myImage}
            onChange
            width={250}
            height={250}
            border={5}
            scale={this.state.imgScale}
            rotate={this.state.imgRotation}
          />
          <div>
            <label for="image-rotation">
              image-rotation (between 0 and 360):
            </label>
            <input
              type="range"
              id="image-rotation"
              name="image-rotation"
              min="0"
              max="360"
              defaultValue="0"
              onChange={this.handleRotationChange}
            />

            <label for="image-scale">image-scale (between -2 and 2):</label>

            <input
              type="range"
              id="image-scale"
              name="image-scale"
              min="0.5"
              max="5"
              step="0.1"
              defaultValue="1"
              onChange={this.handleScaleChange}
            />
          </div>
        </div>

        <div className="avatar-input-file-wrapper">
          <input
            type="file"
            accept="image/*"
            name="avatar-upload-input"
            id="avatar-upload-input"
            onChange={this.handleFileSelect}
          ></input>

          <label htmlFor="avatar-upload-input" className="avatar-upload-label">
            {" "}
            📥 لطفا آواتار خود را انتخاب نمایید
          </label>
          <span className="avatar-uploaded-file-tag">
            <span>
              {" "}
              <strong>فایل انتخاب شده :</strong>
              <span>{this.state.uploadedFileName}</span>
            </span>
            <span className="avatar-uploaded-file-tag-desc">
              * حداکثر ظرفیت مجاز 1 مگابایت می باشد | فرمت های مجاز : jpeg , jpg
              , png
            </span>
          </span>
        </div>
        <div className="avatar-page-button-wrapper">
          <button
            className="avatar-page-button-upload"
            onClick={this.handleFileUpload}
          >
            تایید و آپلود
          </button>
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

const mapStateToProps = (state) => {
  return {
    userId: state.user.id,
  };
};

export default connect(mapStateToProps)(AvatarMaker);
