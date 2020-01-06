import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Fab, Modal } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'
import Uploader from './Uploader'

const styles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  },
}));

const UploadModal = () => {

  const classes = styles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return(
    <div>
      <Fab style={{
        zIndex: 1000,
        position: 'fixed',
        right: 10,
        bottom: 10
      }} size="small" color="secondary" aria-label="add" onClick={handleOpen}>
        <AddIcon />
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <div style={{
          width: '90%',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%)`,
        }} className={classes.paper}>
          <h5>Upload photos</h5>
          <Uploader handleAddImage={() => console.log('zupa')}/>
        </div>
      </Modal>
    </div>
  )
} 

export default UploadModal