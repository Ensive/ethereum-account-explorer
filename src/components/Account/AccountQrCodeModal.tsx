import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalContainer: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(8, 3, 4),
      position: 'relative',
    },
    modalBody: {
      textAlign: 'center',
    },
    modalClose: {
      position: 'absolute',
      top: theme.spacing(1),
      right: theme.spacing(1),
    },
  }),
);

interface IAccountQrCodeModalProps {
  address: string;
  modalOpen: boolean;
  onClose: () => void;
}

export default function AccountQrCodeModal({
  onClose,
  address,
  modalOpen,
}: IAccountQrCodeModalProps) {
  const classes = useStyles();
  const [qrCode, setQrCode] = useState<string>('');

  useEffect(() => {
    if (address) {
      generateQrCode();
    }
  }, [address]);

  return (
    <Modal
      open={modalOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className={classes.modal}
      closeAfterTransition
      disablePortal
      disableEnforceFocus
      disableAutoFocus
    >
      <Fade in={modalOpen}>
        <div className={classes.modalContainer}>
          <IconButton
            className={classes.modalClose}
            aria-label="close modal"
            color="default"
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>

          <h2 id="modal-title">{address}</h2>
          <br />
          <div className={classes.modalBody}>
            <p id="modal-description">Scan QR code</p>
            <img src={qrCode} alt="address qr code" />
          </div>
        </div>
      </Fade>
    </Modal>
  );

  async function generateQrCode() {
    try {
      const dataUrl = await QRCode.toDataURL(address);
      setQrCode(dataUrl);
    } catch (e) {
      console.error(e);
      // todo: error handling
    }
  }
}
