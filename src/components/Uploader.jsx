import React from 'react'
import { connect } from "react-redux"
import DropzoneComponent from 'react-dropzone-component';
import "dropzone/dist/dropzone.css";
import "react-dropzone-component/styles/filepicker.css";
import { handleError } from '../actions' 

const url = `${process.env.REACT_APP_SERVER_URL}/uploads.json`

class Uploader extends React.Component {
  constructor(props) {
      super(props);

      this.djsConfig = {
          addRemoveLinks: true,
          acceptedFiles: "image/jpeg,image/png,image/gif",
          headers: { 'Authorization': localStorage.getItem('jwt') },
          resizeWidth: 800,
          resizeHeight: 800
      };

      this.componentConfig = {
          iconFiletypes: ['.jpg', '.png', '.gif'],
          showFiletypeIcon: true,
          postUrl: url,
      };

      this.callbackArray = [() => console.log('Hi!'), () => console.log('Ho!')];

      this.callback = () => console.log('Hello!');

      this.success = (file, response) => {
          debugger
      }

      this.removedfile = file => console.log('removing...', file);

      this.error = (_file, _message, error) => {
          if(error) this.props.handleError(error)
      }

      this.dropzone = null;
  }

  render() {
      const config = this.componentConfig;
      const djsConfig = this.djsConfig;

      const eventHandlers = {
          init: dz => this.dropzone = dz,
          drop: this.callbackArray,
          addedfile: this.callback,
          success: this.success,
          error: this.error,
          removedfile: this.removedfile
      }

      return <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} />
  }
}

const mapDispatchToProps = { handleError }

export default connect(null, mapDispatchToProps)(Uploader)
