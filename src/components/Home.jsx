import React, { Component } from 'react';
import { connect } from "react-redux"
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
        <Modal />
        {this.props.images.map(image => (
          <div style={styles.image}>
            <GridListTile key={image.thumbnail_url}>
              <img src={image.thumbnail_url} alt={image.filename} />
              <GridListTileBar
                title={image.filename}
              />
            </GridListTile>
          </div>
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
