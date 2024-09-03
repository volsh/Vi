# Task Management Application

## Background Story
You're part of a team developing an internal Task Management Application for efficient project tracking. As a developer, your role is to create a scalable, user-friendly system that enables team members to manage tasks effectively. This project simulates a real-world development environment, allowing you to showcase your full-stack development skills.

![359092102-535ee090-8335-4b47-a8a0-e62200a3d1f8](https://github.com/user-attachments/assets/8de5fc9e-3926-4fb1-b98e-3543c2c8e33e)
(a very basic sketch of a task management application for visualization)

## Task Definition

### Objective
Your objective is to develop a full-stack Task Management Application that provides the following capabilities:

- **Task Creation:** Users can create new tasks with relevant details like title, description, due date, priority, and task owner.
- **Task Management:** The application should allow users to view, update, delete, and filter tasks based on various criteria like status, priority, and due date.
- **Task Details View:** Users can click on a task to see more detailed information.

### Frontend Requirements
- **Task Creation Form:** Implement a form with local state management for adding new tasks. The form should include fields for task title, description, due date, priority, and task owner.
- **Global State Management:** Use Recoil to manage the global state of tasks, enabling operations like adding, updating, and deleting tasks.
- **Task List:** Display tasks in a list format with options to filter and sort them based on different attributes (e.g., due date, status). Each task in the list should show only the main attributes (e.g., title, due date, priority) for a quick overview.
- **Task Details View:** Allow users to click on a task to view its full detailed information, including all attributes of the task.
- **Walkthrough:** Create a comprehensive walkthrough document that explains the frontend development method, architecture, key features, and how to start and use the application.

### Backend Requirements
- **RESTful API:** Develop a RESTful API that provides CRUD (Create, Read, Update, Delete) operations for managing tasks.
  - **GET /tasks:** Retrieve the list of tasks. Consider implementing a way to return only necessary fields for the task list view to optimize performance.
  - **GET /tasks/:id:** Retrieve a specific task by its ID, returning all fields for the detailed view.
  - **POST /tasks:** Create a new task.
  - **PUT /tasks/:id:** Update an existing task.
  - **DELETE /tasks/:id:** Delete a task by ID.
- **MVC Structure:** Organize your code using the Model-View-Controller pattern to ensure maintainability and scalability.
- **Walkthrough:** Include a section in your walkthrough document that explains the backend development method, architecture, and key features.

#### Initial Setup
The project includes a mock database file containing 1,000 tasks (`tasks.json`). Your initial setup should recognize and utilize these tasks as the application's starting dataset. This will allow you to focus on implementing the application's core features right from the start.

- **File:** `server/_mockDB/tasks.json`

## Assignment Goals

### What You Will Be Tested On
- **Code Quality:** We'll evaluate the clarity, efficiency, and organization of your code. Clean, readable, and well-documented code is highly valued.
- **Frontend Skills:** Your ability to build a responsive and user-friendly interface will be tested. We'll look at how effectively you use:
  - **Vite.js**
  - **Recoil** for state management
  - Either **Material-UI (MUI v5)** or **SCSS Modules** for styling
- **Backend Skills:** We'll assess your ability to design and implement a robust RESTful API using:
  - **Node.js** with **Express**
  - **MVC pattern**
- **State Management:** How well you manage and manipulate the global state with **Recoil** will be a key factor in your evaluation.
- **Problem-Solving:** Your approach to implementing features like task filtering, sorting, and handling complex data structures will be examined.
- **Documentation Skills:** The quality and comprehensiveness of your walkthrough document will be evaluated. This includes how well you explain the application's architecture, features, and usage instructions.
- **Folder Structure:** Your ability to organize the project files in a logical and efficient manner.

### Bonus Points
- Handling edge cases and potential errors gracefully.
- Providing additional features like user authentication or advanced filtering options.
- Any other improvement that you think is relevant for this project.

## Conclusion
This project is your opportunity to demonstrate your full-stack development capabilities in building a complete web application from scratch. It encompasses both frontend and backend aspects, allowing you to showcase your skills in creating a practical and efficient task management solution.
