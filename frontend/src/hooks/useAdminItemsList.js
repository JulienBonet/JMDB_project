import { useEffect, useState } from 'react';

function useAdminItemsList({ fetchItems, deleteItem, onDeleteSuccess, searchKey = 'name' }) {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);

  const itemsPerPage = 50;

  useEffect(() => {
    fetchItems()
      .then((items) => {
        setData(items);
        setFilteredData(items);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching admin items:', error);
        setLoading(false);
      });
  }, [fetchItems]);

  const refresh = () => {
    fetchItems()
      .then((items) => {
        setData(items);
        setFilteredData(items);
      })
      .catch((error) => {
        console.error('Error refreshing admin items:', error);
      });
  };

  useEffect(() => {
    const filtered = data.filter(
      (item) => item[searchKey] && item[searchKey].toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, data, searchKey]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this work?');

    if (!confirmDelete) return;

    try {
      const status = await deleteItem(id);

      if (status === 204) {
        onDeleteSuccess?.();
        refresh();
      } else {
        console.error('error delete');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return {
    data,
    setData,
    loading,
    searchTerm,
    setSearchTerm,
    currentPage,
    filteredData,
    currentItems,
    totalPages,
    handlePageChange,
    refresh,
    handleDelete,
  };
}

export default useAdminItemsList;
