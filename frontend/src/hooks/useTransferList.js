// frontend/src/hooks/useTransferList.js

import { useState } from 'react';
import { getCollection } from '../services/movieService';

export function useTransferList() {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [dataType, setDataType] = useState('');

  const fetchData = async (route) => {
    try {
      const datas = await getCollection(route);
      setData(datas);
    } catch (error) {
      console.error(`Error fetching ${route}:`, error);
    }
  };

  const handleOpenModal = (type) => {
    setDataType(type);
    setOpenModal(true);
    fetchData(type);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setDataType('');
    setData([]);
  };

  return {
    openModal,
    data,
    dataType,
    handleOpenModal,
    handleCloseModal,
  };
}
