import ServerOfflineException from '../components/ServerOfflineException';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function TestPage() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  return (
    <div>
      <button onClick={handleOpen}>Show Server Offline Message</button>
      <ServerOfflineException isOpen={isModalOpen} onClose={handleClose} />
    </div>
  );
}

export default TestPage;