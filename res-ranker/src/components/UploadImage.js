import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { addNewPhoto } from '../store/actions/'
import { connect } from 'react-redux'

class UploadImage extends Component {
  state = {
    files: []
  };

  upload = (payload) => {
    console.log(payload);
    console.log(this.props.photos);
    let toState = [...this.props.photos, payload]
    this.props.addPhotoFunction(toState)
  }

  onDrop = (files) => {
    // Get existing files from state
    // (or just the empty array if there are no files in state)
    var currentFiles = this.state.files;
    console.log(currentFiles);
    // Push file(s) from function parameters to `currentFiles` array
    const [newFiles] = files;
    currentFiles = [...currentFiles, newFiles]
    // Assign files dropped into component into state
    this.setState({
     files: currentFiles
    });

    // Attempt to upload the files.
    // If you want to upload after a button click, move the code
    // below to its own function and have it run after button click.
    if (files.length) {
      let formPayLoad = new FormData();

      // I'm using "avatar" here for the attribute name of the model that
      // will store the image. Change the first parameter of the 'append' function
      // below to be the name of the attribute name that fits your Rails model.
      console.log(files[files.length - 1]);
      console.log(formPayLoad);
      formPayLoad.append("images", files[files.length - 1]);
      console.log(formPayLoad);

      // Pass the data to your own defined upload function
      // that makes the call to your API. Make sure you put the
      // formPayLoad in the body of the request.
      this.upload(formPayLoad);
    }
  }

  render() {
    return (
      <div className="upload-image-component">
        <Dropzone
          onDrop={this.onDrop}
          multiple={true}
        >
          <p>Upload File</p>
        </Dropzone>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    photos: state.photos
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPhotoFunction: addedPhotos => dispatch(addNewPhoto(addedPhotos))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadImage)
