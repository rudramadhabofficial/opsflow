# OpsFlow

> A full-stack task and field operations management platform for assigning work, tracking progress, managing workloads, and coordinating operational activities across web and mobile applications.

OpsFlow is a multi-client full-stack application built with React, React Native, Node.js, Express, TypeScript, and PostgreSQL.

The platform provides a centralized workflow for creating and assigning tasks, tracking task status, managing deadlines, adding comments and evidence, and maintaining task history.

---

# How OpsFlow Works

OpsFlow connects a web dashboard and mobile application to a shared backend API and PostgreSQL database.

```text
                         ┌──────────────────────┐
                         │        USER          │
                         └──────────┬───────────┘
                                    │
                         ┌──────────▼───────────┐
                         │    Choose Platform    │
                         └──────────┬───────────┘
                                    │
                     ┌──────────────┴──────────────┐
                     │                             │
              ┌──────▼───────┐             ┌──────▼───────┐
              │  Web Client   │             │ Mobile Client│
              │ React + TS    │             │ React Native │
              └──────┬───────┘             └──────┬───────┘
                     │                             │
                     └──────────────┬──────────────┘
                                    │
                              REST API
                                    │
                         ┌──────────▼───────────┐
                         │       Backend        │
                         │ Node.js + Express    │
                         │     + TypeScript     │
                         └──────────┬───────────┘
                                    │
                    ┌───────────────┼────────────────┐
                    │               │                │
               JWT Auth       Authorization     Business Logic
                    │               │                │
                    └───────────────┼────────────────┘
                                    │
                         ┌──────────▼───────────┐
                         │      PostgreSQL      │
                         │       Database       │
                         └──────────────────────┘
````

### Request Flow

```text
User Action
    ↓
React Web / React Native
    ↓
REST API Request
    ↓
JWT Authentication
    ↓
Role & Permission Check
    ↓
Request Validation
    ↓
Backend Business Logic
    ↓
PostgreSQL
    ↓
API Response
    ↓
Client State Update
    ↓
Updated User Interface
```

---

# Core Task Workflow

The primary purpose of OpsFlow is to manage operational tasks from creation through completion.

```text
┌──────────────┐
│ Create Task  │
└──────┬───────┘
       ↓
┌──────────────┐
│ Task Details │
│ Title        │
│ Description  │
│ Deadline     │
└──────┬───────┘
       ↓
┌──────────────┐
│ Assign Task  │
│ to User      │
└──────┬───────┘
       ↓
┌──────────────┐
│    Pending   │
└──────┬───────┘
       ↓
┌──────────────┐
│  In Progress │
└──────┬───────┘
       ↓
┌──────────────────────────┐
│ Comments / Evidence /    │
│ Status Updates           │
└────────────┬─────────────┘
             ↓
       ┌─────────────┐
       │  Completed  │
       └──────┬──────┘
              ↓
       ┌─────────────┐
       │   History   │
       │ Recorded    │
       └─────────────┘
```

### Task Lifecycle

```text
CREATE
  ↓
ASSIGN
  ↓
PENDING
  ↓
IN PROGRESS
  ↓
UPDATE
  ↓
COMMENT / EVIDENCE
  ↓
COMPLETED
  ↓
STATUS HISTORY
```

Every supported status change is associated with the task history so that task progress can be reviewed over time.

---

# Authentication Workflow

OpsFlow uses JWT-based authentication to protect application resources.

```text
User
  │
  ▼
Enter Credentials
  │
  ▼
Login Request
  │
  ▼
Backend
  │
  ├── Validate Credentials
  │
  └── Check User
          │
          ▼
     Generate JWT
          │
          ▼
     Return Token
          │
          ▼
      Client
          │
          ▼
Protected API Request
          │
          ▼
     Verify JWT
          │
          ▼
 Check User Role / Permission
          │
     ┌────┴────┐
     │         │
 Authorized   Denied
     │         │
     ▼         ▼
Process     Error Response
Request
```

The authentication layer helps ensure that protected operations can only be performed by authenticated users with the appropriate permissions.

---

# Mobile Offline Workflow

The mobile application supports basic offline synchronization for supported operations when network connectivity is temporarily unavailable.

```text
              User Action
                  │
                  ▼
          ┌───────────────┐
          │ Network Check │
          └───────┬───────┘
                  │
          ┌───────┴────────┐
          │                │
       Online           Offline
          │                │
          ▼                ▼
     REST API         Store Supported
       Request         Change Locally
          │                │
          ▼                ▼
      Backend        Continue Working
          │                │
          ▼                ▼
     PostgreSQL       Connection Restored
          │                │
          ▼                ▼
      Response        Sync Pending Changes
          │                │
          └───────┬────────┘
                  ▼
           Update App State
```

This allows supported mobile workflows to continue during temporary connectivity interruptions and synchronize changes when the connection becomes available again.

---

# What Happens When a Task Is Updated?

A typical task update follows this process:

```text
1. User opens a task
          ↓
2. Client loads task information
          ↓
3. User changes task status
          ↓
4. Client sends authenticated REST request
          ↓
5. Backend verifies JWT
          ↓
6. Backend checks authorization
          ↓
7. Backend validates request
          ↓
8. Business logic processes update
          ↓
9. PostgreSQL updates task
          ↓
10. Status history is recorded
          ↓
11. Backend returns updated task
          ↓
12. Client updates application state
          ↓
13. User sees the updated task
```

---

# Features

## Authentication & Authorization

* User authentication
* JWT-based authentication
* Protected API routes
* Role-based authorization
* Request validation
* Controlled access to protected operations

---

## Task Management

* Create tasks
* Assign tasks to users
* View assigned tasks
* Update task status
* Manage deadlines
* Track task progress
* Add comments
* Attach evidence
* View task history
* Monitor outstanding work

---

## Workload Management

The platform provides visibility into operational workloads.

Users can review:

* Assigned tasks
* Pending tasks
* Active tasks
* Completed tasks
* Approaching deadlines
* Workload distribution

---

## Comments & Evidence

Tasks can contain additional operational information through:

* Comments
* Status updates
* Evidence attachments
* Task activity information

This keeps task-related information associated with the task instead of scattering it across unrelated communication channels.

---

## Web Dashboard

The web application provides a centralized interface for managing operational activities.

Built with:

* React
* TypeScript
* Redux Toolkit
* React Router
* HTML5
* CSS3

---

## Mobile Application

OpsFlow includes a React Native mobile application for users who need to manage operational tasks from mobile devices.

Built with:

* React Native
* Expo
* TypeScript
* Redux Toolkit

The mobile application provides supported task management functionality and basic offline synchronization.

---

# Technology Stack

## Frontend

| Technology    | Purpose                       |
| ------------- | ----------------------------- |
| React         | Web user interface            |
| TypeScript    | Static type safety            |
| Redux Toolkit | State management              |
| React Router  | Client-side routing           |
| HTML5         | Application structure         |
| CSS3          | Styling and responsive layout |

## Mobile

| Technology    | Purpose                  |
| ------------- | ------------------------ |
| React Native  | Mobile application       |
| Expo          | React Native development |
| TypeScript    | Static type safety       |
| Redux Toolkit | State management         |

## Backend

| Technology     | Purpose                        |
| -------------- | ------------------------------ |
| Node.js        | Backend runtime                |
| Express.js     | REST API framework             |
| TypeScript     | Type-safe backend development  |
| JWT            | Authentication                 |
| REST APIs      | Client-server communication    |
| Validation     | Request validation             |
| Error Handling | Centralized API error handling |

## Database

| Technology          | Purpose                       |
| ------------------- | ----------------------------- |
| PostgreSQL          | Primary relational database   |
| SQL                 | Database queries              |
| Indexes             | Query optimization            |
| Transactions        | Data consistency              |
| Relational Modeling | Structured data relationships |

## DevOps

| Technology     | Purpose                            |
| -------------- | ---------------------------------- |
| Docker         | Containerization                   |
| Docker Compose | Local service orchestration        |
| Git            | Version control                    |
| GitHub         | Source control                     |
| GitHub Actions | CI/CD automation                   |
| Linux          | Development/deployment environment |

---

# System Architecture

OpsFlow follows a layered client-server architecture.

```text
┌──────────────────────────────────────────────────────┐
│                    CLIENT LAYER                      │
│                                                      │
│   ┌──────────────────┐      ┌──────────────────┐   │
│   │   React Web App  │      │ React Native App │   │
│   └────────┬─────────┘      └────────┬─────────┘   │
└────────────┼─────────────────────────┼─────────────┘
             │                         │
             └───────────┬─────────────┘
                         │
                    HTTP / REST
                         │
┌────────────────────────▼─────────────────────────────┐
│                    API LAYER                         │
│                                                      │
│              Node.js + Express + TypeScript         │
│                                                      │
│   Authentication → Authorization → Validation       │
│                       ↓                              │
│                  Business Logic                      │
└────────────────────────┬─────────────────────────────┘
                         │
                         │ SQL
                         ▼
┌──────────────────────────────────────────────────────┐
│                  DATA LAYER                          │
│                                                      │
│                    PostgreSQL                        │
│                                                      │
│   Users → Tasks → Assignments → Comments             │
│                 → Evidence → Status History          │
└──────────────────────────────────────────────────────┘
```

---

# Database Design

OpsFlow uses PostgreSQL as its primary relational database.

The core data model represents users, roles, tasks, assignments, comments, evidence, and task-status history.

Conceptually:

```text
                     ┌────────────┐
                     │    Roles   │
                     └─────┬──────┘
                           │
                           │
                     ┌─────▼──────┐
                     │    Users   │
                     └─────┬──────┘
                           │
                           │ assigned to
                           ▼
                     ┌────────────┐
                     │   Tasks    │
                     └─────┬──────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
              ▼            ▼            ▼
        ┌──────────┐ ┌──────────┐ ┌───────────────┐
        │ Comments │ │ Evidence │ │ Status History│
        └──────────┘ └──────────┘ └───────────────┘
```

### Database considerations

* Relational data modeling
* Foreign-key relationships
* Database constraints
* Indexes for frequently queried fields
* Transactions where consistency is required
* Database migrations
* Seed data for development where configured

---

# API Architecture

The backend exposes RESTful APIs consumed by both the web and mobile applications.

The API uses standard HTTP methods and status codes.

Typical resource operations include:

```text
Authentication
POST    /api/auth/...

Tasks
POST    /api/tasks
GET     /api/tasks
GET     /api/tasks/:id
PATCH   /api/tasks/:id
DELETE  /api/tasks/:id

Comments
POST    /api/tasks/:id/comments

Evidence
POST    /api/tasks/:id/evidence

History
GET     /api/tasks/:id/history
```

> The exact routes available in the implementation should be checked against the backend source code.

### API principles

* RESTful resource design
* JSON request and response format
* JWT authentication
* Role-based authorization
* Input validation
* Standard HTTP status codes
* Centralized error handling
* Consistent API responses

---

# Project Structure

```text
opsflow/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── mobile/
│   ├── src/
│   ├── assets/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── database/
│   ├── migrations/
│   ├── seeds/
│   └── ...
│
├── docs/
│   └── screenshots/
│
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

> The exact directory structure depends on the implementation in the repository.

---

# Getting Started

## Prerequisites

Install the following:

* Node.js LTS
* npm
* Git
* Docker
* Docker Compose
* Expo-compatible development environment for the mobile application

Verify the installations:

```bash
node --version
npm --version
git --version
docker --version
docker compose version
```

---

# Clone the Repository

```bash
git clone https://github.com/rudramadhabofficial/opsflow.git
cd opsflow
```

---

# Environment Configuration

OpsFlow uses environment variables for environment-specific configuration and sensitive values.

Create the required environment files using the provided `.env.example` files.

Example:

```bash
cp .env.example .env
```

Example configuration:

```env
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Use the actual environment variables required by the application.

## Security

Never commit real credentials or secrets.

Do not commit:

```text
.env
.env.local
API keys
Database passwords
JWT secrets
Private credentials
```

Only safe example values should be included in `.env.example`.

---

# Running with Docker

If Docker Compose is configured for the project, start the services from the repository root:

```bash
docker compose up --build
```

To run in detached mode:

```bash
docker compose up --build -d
```

To stop the services:

```bash
docker compose down
```

To view running services:

```bash
docker compose ps
```

To view logs:

```bash
docker compose logs
```

---

# Running Services Individually

## Backend

```bash
cd backend
npm install
```

Configure the required environment variables and start the development server using the script configured in `package.json`.

For example:

```bash
npm run dev
```

---

## Frontend

Open another terminal:

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm run dev
```

---

## Mobile

Open another terminal:

```bash
cd mobile
npm install
```

Start Expo:

```bash
npx expo start
```

The application can then be opened using a compatible physical device or emulator.

---

# Database Setup

PostgreSQL must be running before the backend can access the database.

When using Docker Compose, PostgreSQL can be started through the project's container configuration.

Apply database migrations using the migration command configured by the project.

If seed data is available, run the configured seed command.

Example:

```bash
npm run migrate
npm run seed
```

> Use the exact commands provided by the project's `package.json`.

---

# Testing

Run the project's configured test suite from the relevant application directory.

Example:

```bash
npm test
```

If test coverage is configured:

```bash
npm run test:coverage
```

Before pushing changes, verify the project using the available test and build commands.

Example:

```bash
npm test
npm run build
```

---

# CI/CD

OpsFlow uses GitHub Actions for automated development checks where configured.

A typical workflow is:

```text
Developer Push
      ↓
GitHub Repository
      ↓
GitHub Actions
      ↓
Install Dependencies
      ↓
Validation / Linting
      ↓
Run Tests
      ↓
Build Application
      ↓
Workflow Result
```

This provides automated verification of changes before they are considered ready for integration or deployment.

---

# Docker Workflow

Docker provides a consistent environment for local application services.

```text
                 Docker Compose
                       │
          ┌────────────┴────────────┐
          │                         │
     ┌────▼─────┐             ┌─────▼─────┐
     │ Backend  │             │ PostgreSQL│
     │ Node.js  │────────────▶│ Database  │
     │ Express  │             └───────────┘
     └────┬─────┘
          │
          │ REST API
          │
     ┌────▼───────────────┐
     │ React Web / Mobile │
     └────────────────────┘
```

---

# Error Handling

The backend uses centralized error handling to provide consistent responses for common API failures.

Supported error scenarios include:

* Invalid requests
* Authentication failures
* Authorization failures
* Missing resources
* Validation errors
* Database errors
* Unexpected server errors

This keeps API error behavior consistent across different backend routes.

---

# Security

Security considerations include:

* JWT-based authentication
* Role-based authorization
* Protected API routes
* Request validation
* Environment-based secret configuration
* No hard-coded credentials
* Database constraints
* Controlled access to protected operations
* Centralized error handling

Sensitive configuration values are excluded from source control.

---

# Performance Considerations

The application uses several practices intended to maintain efficient application behavior.

These include:

* PostgreSQL indexes
* Structured database relationships
* Efficient database queries
* Client-side state management
* Reusable frontend components
* REST API separation
* Separation of frontend, mobile, backend, and database responsibilities

---

# Screenshots

Screenshots can be added to this section as the project evolves.

### Web Dashboard

![OpsFlow Dashboard](docs/screenshots/dashboard.png)

### Task Management

![Task Management](docs/screenshots/tasks.png)

### Task Details

![Task Details](docs/screenshots/task-details.png)

### Mobile Application

![OpsFlow Mobile](docs/screenshots/mobile.png)

> Replace these image paths with screenshots that actually exist in the repository.

---

# Development Workflow

A typical development workflow:

```bash
# Check current changes
git status

# Create a feature branch
git checkout -b feature/task-filtering

# Make changes

# Stage changes
git add .

# Commit changes
git commit -m "feat: add task filtering"

# Push branch
git push -u origin feature/task-filtering
```

### Example commit messages

```text
feat: add task assignment workflow
feat: implement mobile task updates
feat: add task status history
fix: handle expired authentication tokens
fix: improve task validation
refactor: simplify task service
test: add task API coverage
docs: improve setup instructions
```

---

# Engineering Decisions

## Shared Backend

Both the web and mobile applications communicate with the same backend API.

This avoids duplicating business logic across clients and provides a centralized location for:

* Authentication
* Authorization
* Validation
* Business rules
* Database operations

---

## PostgreSQL

PostgreSQL was selected as the primary database because the application's data has strong relational relationships between users, tasks, assignments, comments, evidence, and status history.

---

## TypeScript

TypeScript is used across the main application layers to improve type safety and reduce errors caused by inconsistent data structures.

---

## REST API

A REST-based API provides a clear communication layer between the clients and backend.

This also allows additional clients to consume the same backend services in the future.

---

## Docker

Docker helps standardize the local development environment and simplifies running application infrastructure consistently across different machines.

---

# Project Goals

OpsFlow was built to demonstrate practical full-stack engineering across multiple application layers.

```text
                    OPSFLOW
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
     FRONTEND        MOBILE         BACKEND
     React           React Native   Node.js
     TypeScript      Expo           Express
     Redux           TypeScript     TypeScript
        │              │              │
        └──────────────┼──────────────┘
                       │
                       ▼
                  REST APIs
                       │
                       ▼
                  PostgreSQL
                       │
                       ▼
              Docker + CI/CD
```

The project focuses on building and integrating a complete application rather than creating an isolated frontend or backend demonstration.

---
