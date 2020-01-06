import React, { Component } from 'react';
import { connect } from "react-redux"
import {
  Link
} from "react-router-dom";

import Modal from './UploadModal'
import { getImages } from "../actions"
import { withStyles } from '@material-ui/core/styles';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: 5
  },
  image: {
    margin: 5,
    position: 'relative'
  },
  title: {
    textDecoration: 'none',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'black',
    color: 'white',
    opacity: 0.7
  },
  titleText: {
    marginLeft: 10
  }
}

class Home extends Component {
  componentDidMount = () => {
    this.props.getImages()
  }

  render = () => {
    return(
      <div style={styles.container}>
        <Modal/>
          {this.props.images.map(({id, filename, thumbnail_url}) => (
            <Link key={id} to={`/images/${id}`} state={{filename }}>
              <div style={styles.image}>
                <img src={thumbnail_url} alt={filename} />
                <div style={styles.title}>
                  <p style={styles.titleText}>{filename}</p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    )
  }
}

const mapDispatchToProps = { getImages }

const mapStateToProps = (state) => {
  const { images } = state.images

  return { images }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home))
