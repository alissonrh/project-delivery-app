import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import StatusContext from './StatusContext';
import { Put } from '../api/requests';

function StatusProvider({ children }) {
  const [status, setStatus] = useState('Pendente');
  const [idOrder, setIdOrder] = useState('');

  useEffect(() => {
    const putStatus = async () => {
      if (status !== 'Pendente') await Put(`/seller/orders/${idOrder}`, { status });
    };
    putStatus();
  }, [status]);

  const contextStatus = useMemo(() => ({
    status,
    setStatus,
    idOrder,
    setIdOrder,
  }), [status]);

  return (
    <StatusContext.Provider value={ contextStatus }>
      { children }
    </StatusContext.Provider>
  );
}

export default StatusProvider;

StatusProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
