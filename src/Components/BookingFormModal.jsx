/* eslint-disable react/prop-types */

import { useDispatch } from "react-redux";
import { createBooking } from "../Store/bookingSlice";

const BookingFormModal = ({ onClose, selectedShowtime, movieName }) => {
  const dispatch = useDispatch();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const username = formData.get('username');
    const phoneNumber = formData.get('phoneNumber');
    const email = formData.get('email');

    const showtimeId = selectedShowtime.id
    const movieId = selectedShowtime.movieId

    dispatch(createBooking({ movieId, showtimeId, username, phoneNumber, email }));
    onClose()
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Book Your Tickets</h2>
        <h3>{movieName}</h3>
        <p>{new Date(selectedShowtime.dateTime).toLocaleString()}</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input type="text" name="username" className="w-full px-3 py-2 border rounded" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <input type="text" name="phoneNumber" className="w-full px-3 py-2 border rounded" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" name="email" className="w-full px-3 py-2 border rounded" required />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded mr-2">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
              Book Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingFormModal;
