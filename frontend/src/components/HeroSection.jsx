import React, { useState, useEffect } from "react";
import axios from "axios";
import endpoints from "../services/endpoints";
import { useSelector } from "react-redux";
import TaskDetailsPopup from "./TaskDetailsPopup"; // Import the new component

const { CREATE_TASK, GET_TASK_LIST, UPDATE_TASK, DELETE_TASK, MARK_AS_COMPLETED } = endpoints;

const HeroSection = () => {
  const { user, token } = useSelector((state) => state.auth);
  console.log(token)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null); // State for the selected task
  const [filter, setFilter] = useState(""); // State for filtering
  const [sort, setSort] = useState("due_date"); // State for sorting

  const fetchTaskList = async (page = 1, filter = "", sort = "due_date") => {
    try {
      const response = await axios.get(GET_TASK_LIST, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { page, limit: 20, filter, sort },
      });
      const tasksWithCompletionStatus = response.data.data.tasks.map((task) => ({
        ...task,
        completed: task.status === "Completed",
      }));
      setTaskList(tasksWithCompletionStatus);
      setTotalPages(response.data.data.totalPages);
      setCurrentPage(response.data.data.currentPage);
    } catch (error) {
      console.error("Error fetching task list:", error);
    }
  };

  useEffect(() => {
    fetchTaskList(currentPage, filter, sort);
  }, [currentPage, filter, sort]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(
          `${UPDATE_TASK}/${editTaskId}`,
          { title, description, due_date: dueDate, created_by: user._id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEditMode(false);
        setEditTaskId(null);
      } else {
        await axios.post(
          CREATE_TASK,
          { title, description, due_date: dueDate, created_by: user._id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setTitle("");
      setDescription("");
      setDueDate("");
      fetchTaskList();
    } catch (error) {
      console.error("Error creating or updating task:", error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`${DELETE_TASK}/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTaskList();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEdit = (task) => {
    setEditMode(true);
    setEditTaskId(task._id);
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(new Date(task.due_date).toISOString().split('T')[0]);
  };

  const handleMarkAsCompleted = async (taskId) => {
    try {
      await axios.put(`${MARK_AS_COMPLETED}/${taskId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTaskList((prevTaskList) =>
        prevTaskList.map((task) =>
          task._id === taskId ? { ...task, completed: true, status: "Completed" } : task
        )
      );
    } catch (error) {
      console.error("Error marking task as completed:", error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleClosePopup = () => {
    setSelectedTask(null);
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="w-full h-auto m-auto">
      <div className="w-[40%] h-auto m-auto">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg">
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
          >
            {editMode ? 'Update Task' : 'Create Task'}
          </button>
        </form>
      </div>
      <div className="mt-6 w-full h-auto">
        <div className="flex justify-between mb-4">
          <div className="flex gap-4">
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filter by title..."
              className="px-3 py-2 border rounded shadow-sm"
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-3 py-2 border rounded shadow-sm"
            >
              <option value="due_date">Sort based on</option>
              <option value="title">Title</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>
        <h2 className="text-gray-700 text-lg font-semibold mb-4">Task List</h2>
        <div className="flex gap-5 flex-wrap">
          {taskList.map((task) => (
            <div
              key={task._id}
              className="w-[30%] bg-white p-4 rounded shadow-md border border-gray-200 cursor-pointer"
              onClick={() => handleTaskClick(task)}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {task.title}
              </h3>
              <h3 className="font-semibold text-gray-900 mb-2">
                {capitalizeFirstLetter(task.status)}
              </h3>
              <p className="text-gray-600 mb-2">{task.description}</p>
              <p className="text-gray-500">
                Due Date: {new Date(task.due_date).toLocaleDateString()}
              </p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMarkAsCompleted(task._id);
                  }}
                  className={`${
                    task.completed ? "bg-gray-400" : "bg-green-500"
                  } text-white px-3 py-1 rounded ${
                    task.completed ? "cursor-not-allowed" : "hover:bg-green-600"
                  }`}
                  disabled={task.completed}
                >
                  {task.completed ? "Task Completed" : "Mark as Completed"}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(task);
                  }}
                  className="bg-blue-500 text-white px-3 py-1 rounded ml-2 hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(task._id);
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded ml-2 hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6 mb-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
      {selectedTask && (
        <TaskDetailsPopup task={selectedTask} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default HeroSection;
