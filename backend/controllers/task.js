const User = require("../models/user");
const Task = require("../models/task");
const helper = require("../config/api-responses");

exports.fetchAllTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskList = await Task.find({ created_by: userId });
    if (taskList.length == 0) {
      return helper.errorResponse(res, "Task list is empty");
    } else {
      return helper.successResponseWithData(
        res,
        "Task list fetched successfully",
        taskList
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
    helper.logMessage(id)
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
    helper.logMessage("Printing user id", userId);
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
    const { taskId } = req.params;
    const deletedTask = await Task.findByIdAndDelete(taskId);
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
