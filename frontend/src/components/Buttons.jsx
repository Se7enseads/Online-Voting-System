function Buttons({ id, removeCandidate }) {
  const handleDelete = () => {
    fetch(`http://localhost:5555/api/candidate/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        removeCandidate(id);
      });
  };
  return (
    <div>
      <button>Update</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
export default Buttons;
