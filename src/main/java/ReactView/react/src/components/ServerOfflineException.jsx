import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Button } from '@chakra-ui/react';

function ServerOfflineException({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Server Offline</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          The server is currently offline. Please try again later.
        </ModalBody>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button colorScheme="blue" mr={3} onClick={onClose} >
          Close
        </Button>
        </div>
      </ModalContent>
    </Modal>
  );
}

export default ServerOfflineException;