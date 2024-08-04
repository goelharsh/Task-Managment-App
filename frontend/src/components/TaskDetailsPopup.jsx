import React from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import endpoints from "../services/endpoints";

const { GET_USER_DETAILS } = endpoints;

const TaskDetailsPopup = ({ task, onClose, user }) => {
  const [userDetails, setUserDetails] = React.useState(null);

  React.useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${GET_USER_DETAILS}/${task.created_by}`);
        setUserDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [task.created_by]);

  if (!task) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-[50%]">
        <h2 className="text-2xl font-semibold mb-4">Task Details</h2>
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{task.title}</h3>
          <p className="text-gray-600 mb-2">{task.description}</p>
          <p className="text-gray-500">Due Date: {new Date(task.due_date).toLocaleDateString()}</p>
          <p className="text-gray-500">Status: {task.status}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Created By</h3>
          {userDetails ? (
            <div>
              <p className="text-gray-700">Name: {userDetails.name}</p>
              <p className="text-gray-700">Email: {userDetails.email}</p>
            </div>
          ) : (
            <div>
            <p className="text-gray-700">Name: {user.name}</p>
            <p className="text-gray-700">Email: {user.email}</p>
          </div>
          )}
        </div>
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TaskDetailsPopup;
