import React,{useEffect} from 'react'
import Cookies from 'js-cookie'
import { BASE_URL } from '../../utils/backend_services';
import { useParams } from 'react-router-dom';

const DeleteBook = () => {

  const { id } = useParams();

  const token = Cookies.get('token');

  useEffect(() => {
    const deleteBook = async () => {
      try {
        const response = await fetch(`${BASE_URL}/books/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete the book');
        }

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error deleting the book:', error.message);
      }
    };

    deleteBook();
    setTimeout(() => {
      window.location.replace('/contributions');
    }, 1000);
  }, [token]);

  return (
    <div>
       { alert('Book deleted successfully')}
    </div>
  )
}

export default DeleteBook