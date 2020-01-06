import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getImage, resetImageView, updateFilename, deleteImage } from '../actions'
import { Button, TextField } from '@material-ui/core';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  image: {
    alignSelf: 'center'
  },
  actions: {
    alignSelf: 'center',
    padding: 20,
    display: 'flex',
  },
  link: {
    textDecoration: 'none'
  },
  button: {
    margin: 5
  },
  title: {
    width: 200,
    paddingTop: 7
  },
  titleField: {
    width: 200
  }
}

class ImageView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      renameAction: false,
      originalBasename: '',
      basename: '',
      extension: '',
      filename: '',
      errorText: ''
    }
  }

  componentDidUpdate = (props) => {
    console.log(props)
    if(props.selectedImage && props.selectedImage.filename !== this.state.filename) {
      const { filename } = props.selectedImage
      const extension = filename.substr(filename.lastIndexOf('.'));
      const basename = filename.replace(extension, '')
      this.setState({ extension, basename, filename, originalBasename: basename })  
    }
  }

  componentDidMount = () => {
    const { id } = this.props.match.params
    this.props.getImage(id)
  }

  componentWillUnmount = () => {
    this.props.resetImageView()
  }

  filenameChange = (e) => {
    e.preventDefault()

    const basename = e.target.value
    const errorText = (!basename ? 'Filename is empty' : '') 
    this.setState({ basename, errorText })
  }


  renderTitle = () => {
    const { filename } = this.props.selectedImage
    const { basename, errorText } = this.state
    return(
      this.state.renameAction ?
        <TextField 
          style={styles.titleField} 
          onChange={this.filenameChange} 
          value={basename}
          error={!!errorText}
          helperText={errorText}
        />
      :
      <div style={styles.title}>{filename}</div>
    )
  }

  renameActionOff = () => {
    this.setState({
      renameAction: false,
      basename: this.state.originalBasename
    })
  }

  applyFilename = () => {
    const { basename, extension } = this.state
    const filename = basename + extension

    this.props.updateFilename({...this.props.selectedImage, filename: filename})
    this.setState({ renameAction: false })
  }

  deleteImage = () => {
    const result = window.confirm('Are you sure to remove image?')
    if(result) {
      const { selectedImage, history, deleteImage } = this.props
      const { id } = selectedImage
      deleteImage(id, history)
    }
  }

  renderActions = () => {
    const { errorText, basename, originalBasename } = this.state
    return(
      this.state.renameAction ?
        <div>
          <Button 
            onClick={this.renameActionOff} 
            size='small'
            variant="outlined"
            color='primary'
            style={styles.button}
          >
              Cancel
          </Button>
          <Button 
            onClick={this.applyFilename} 
            size='small' 
            variant="outlined" 
            color='primary'
            disabled={(!!errorText || basename === originalBasename)}
            style={styles.button}
          >
            Save
          </Button>
        </div>
      :
        <Button 
          onClick={() => this.setState({ renameAction: true })} 
          size='small' 
          variant="outlined" 
          color='primary'
          style={styles.button}
        >
          Rename
        </Button>
    )
  }


  render = () => {
    const { selectedImage } = this.props
    if(selectedImage) {
      const { image_url, filename } = selectedImage

      return(
        <div style={styles.container}>
          <div style={styles.actions}>
            {this.renderTitle()}<br/>
            {this.renderActions()}
            <Link style={styles.link} to='/'>
              <Button 
                size='small' 
                variant="outlined" 
                color='primary'
                style={styles.button}
              >Close</Button>
            </Link>
            <Button 
              size='small'
              variant="outlined"
              color='secondary'
              style={styles.button}
              onClick={this.deleteImage}
            >
              Remove
            </Button>
          </div>
          <div style={styles.image}>
            <img src={image_url} alt={filename} />
          </div>
        </div>
      )
    } else {
      return <div></div>
    }
    
  }
}

const mapStateToProps = (state) => {
  const { selectedImage } = state.images

  return { selectedImage }
}

const mapDispatchToProps = { getImage, resetImageView, updateFilename, deleteImage }

export default connect(mapStateToProps, mapDispatchToProps)(ImageView)
