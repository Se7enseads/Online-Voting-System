import { toast } from 'react-toastify';

function Buttons({ id, removeCandidate }) {
  const handleDelete = () => {
    fetch(`http://localhost:5555/api/candidate/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        // Show a toast when the candidate is deleted
        toast.success('Candidate deleted successfully', {
          position: 'top-right',
          autoClose: 3000, // Auto-close the toast after 3 seconds
        });
        removeCandidate(id);
      });
  };

  return (
    <div className="mt-3 flex">
      <button
        className="rounded bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
}

export default Buttons;
