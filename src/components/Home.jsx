import React, { Component } from 'react';
import { connect } from "react-redux"

import {
  Link
} from "react-router-dom";

import Modal from './UploadModal'
import { getImages } from "../actions"
import {
  GridListTile, 
  GridListTileBar, 
} from "@material-ui/core"
import { withStyles } from '@material-ui/core/styles';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  img: {
    margin: 5,
  },
  title: {
    position: 'absolute',
    bottom: 20
  },
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
                <GridListTile>
                  <img src={thumbnail_url} alt={filename} />
                  <GridListTileBar
                    title={filename}
                  />
                </GridListTile>
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
