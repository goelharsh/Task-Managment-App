const User = require("../models/user");
const Task = require("../models/task");
const helper = require("../config/api-responses");

exports.fetchAllTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 20, filter = "", sort = "due_date" } = req.query;

    const query = { created_by: userId };
    if (filter) {
      query.title = new RegExp(filter, 'i'); // Case-insensitive search
    }

    const taskList = await Task.find(query)
      .sort({ [sort]: 1 }) // 1 for ascending order
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalTasks = await Task.countDocuments(query);

    if (taskList.length === 0) {
      return helper.errorResponse(res, "Task list is empty");
    } else {
      return helper.successResponseWithData(
        res,
        "Task list fetched successfully",
        {
          tasks: taskList,
          totalTasks,
          totalPages: Math.ceil(totalTasks / limit),
          currentPage: page,
        }
      );
    }
  } catch (error) {
    helper.logMessage(error);
    return helper.catchErrorResponse(res, error);
  }
};


exports.fetchTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return helper.errorResponse(res, "No task found with related id");
    } else {
      return helper.successResponseWithData(
        res,
        "Task fetched successfully",
        task
      );
    }
  } catch (error) {
    helper.logMessage(error);
    return helper.catchErrorResponse(res, error);
  }
};

exports.createNewTask = async (req, res) => {
  try {
    const requiredFields = ["title", "description"];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return helper.validationError(
          res,
          `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
        );
      }
    }
    const userId = req.user.id;
    console.log(req.user.id);
    const { title, description, status, due_date } = req.body;
    
    // Set default due date to one day from the current date if not provided
    const defaultDueDate = () => {
      const date = new Date();
      date.setDate(date.getDate() + 1);
      return date;
    };

    const createTask = await Task.create({
      title,
      description,
      status,
      due_date: due_date || defaultDueDate(),
      created_by: userId,
    });

    if (!createTask) {
      return helper.errorResponse(res, "Cannot create task");
    } else {
      return helper.successResponseWithData(
        res,
        "Task created successfully",
        createTask
      );
    }
  } catch (error) {
    helper.logMessage(error);
    return helper.catchErrorResponse(res, error);
  }
};


exports.updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const { id } = req.params;

    // Ensure at least one field is provided for the update
    if (!title && !description && !status) {
      return helper.errorResponse(
        res,
        "At least one of title, description, or status must be provided"
      );
    }

    // Build the update object based on provided fields
    const updateFields = {};
    if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    if (status) updateFields.status = status;

    // Update the task and return the updated task
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      updateFields,
      { new: true } // Return the updated task
    );

    if (!updatedTask) {
      return helper.errorResponse(res, "Cannot update task");
    } else {
      return helper.successResponseWithData(
        res,
        "Task updated successfully",
        updatedTask
      );
    }
  } catch (error) {
    helper.logMessage(error);
    return helper.catchErrorResponse(res, error);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return helper.errorResponse(res, "Cannot delete task. Task not found.");
    } else {
      return helper.successResponse(res, "Task deleted successfully");
    }
  } catch (error) {
    helper.logMessage(error);
    return helper.catchErrorResponse(res, error);
  }
};

exports.markAsCompleted = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status: 'Completed' },
      { new: true }
    );

    if (!updatedTask) {
      return helper.errorResponse(res, "Cannot update task");
    } else {
      return helper.successResponseWithData(
        res,
        "Task marked as completed successfully",
        updatedTask
      );
    }
  } catch (error) {
    helper.logMessage(error);
    return helper.catchErrorResponse(res, error);
  }
};
