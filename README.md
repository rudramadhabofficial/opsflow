# OpsFlow

> A full-stack task and field operations management platform built for coordinating teams, assigning work, tracking progress, and managing operational activities across web and mobile interfaces.

OpsFlow is a production-oriented full-stack application that provides a centralized platform for managing operational tasks, team workloads, deadlines, comments, evidence, and task status history.

The system consists of a React-based web dashboard, a React Native mobile application, a Node.js/Express backend, and a PostgreSQL database. Authentication and authorization are handled using JWT-based security and role-based access control.

---

## Overview

Managing operational tasks across teams often involves fragmented communication, spreadsheets, and manual status tracking. OpsFlow provides a structured workflow for creating, assigning, updating, and monitoring tasks from a centralized system.

The platform supports different user roles and provides separate interfaces optimized for web and mobile usage.

### Core capabilities

- Secure user authentication
- Role-based authorization
- Task creation and assignment
- Task status management
- Deadlines and task tracking
- Comments and operational updates
- Evidence/file upload support
- Task-status history
- Workload visibility
- RESTful API architecture
- PostgreSQL relational data model
- Mobile access through React Native
- Basic offline synchronization
- Centralized backend validation and error handling
- Docker-based local development
- Automated CI/CD checks through GitHub Actions

---

## Features

### Authentication & Authorization

OpsFlow uses JWT-based authentication to secure application access.

Features include:

- User registration and authentication
- Secure login flow
- JWT-based session authentication
- Protected API routes
- Role-based authorization
- Access control for protected operations
- Server-side request validation

---

### Task Management

Users can manage operational tasks throughout their lifecycle.

Task functionality includes:

- Create tasks
- Assign tasks to users
- View assigned tasks
- Update task status
- Set deadlines
- Track task progress
- Add comments
- Attach evidence
- View task history
- Monitor outstanding work

Tasks maintain a status history so that changes can be tracked over time.

---

### Workload Management

OpsFlow provides visibility into assigned work across users and teams.

The dashboard can be used to:

- Review assigned tasks
- Identify pending work
- Track active tasks
- Monitor approaching deadlines
- Review completed tasks
- Understand workload distribution

---

### Evidence & Comments

Operational tasks often require more than a simple status update.

OpsFlow supports:

- Task comments
- Operational updates
- Evidence attachments
- Task-specific activity information

This allows task progress to be documented directly within the platform.

---

### Web Dashboard

The web application provides a responsive interface for managing operational activities.

Built with:

- React
- TypeScript
- Redux Toolkit
- React Router
- HTML5
- CSS3

The dashboard provides centralized access to task and operational information.

---

### Mobile Application

OpsFlow includes a React Native mobile application designed for users who need to manage tasks away from a desktop environment.

The mobile application supports:

- Authentication
- Task viewing
- Task updates
- Status changes
- Comments
- Evidence-related workflows
- Basic offline synchronization

The mobile application is designed using Expo for streamlined React Native development.

---

### Offline Synchronization

The mobile application includes basic offline support for situations where network connectivity is temporarily unavailable.

The application can retain relevant local state and synchronize supported changes when connectivity is restored.

---

## Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| React | Web application UI |
| TypeScript | Static typing |
| Redux Toolkit | Application state management |
| React Router | Client-side routing |
| HTML5 | Application structure |
| CSS3 | Styling and responsive layout |

### Mobile

| Technology | Purpose |
|---|---|
| React Native | Mobile application |
| Expo | React Native development and tooling |
| TypeScript | Static typing |
| Redux Toolkit | State management |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | Backend runtime |
| Express.js | REST API framework |
| TypeScript | Backend type safety |
| JWT | Authentication |
| REST APIs | Client-server communication |
| Validation middleware | Request validation |
| Centralized error handling | Consistent API error responses |

### Database

| Technology | Purpose |
|---|---|
| PostgreSQL | Primary relational database |
| SQL | Data querying |
| Database relationships | Relational data modeling |
| Indexes | Query performance |
| Transactions | Data consistency |

### DevOps & Development

| Technology | Purpose |
|---|---|
| Docker | Containerization |
| Docker Compose | Local multi-service development |
| Git | Version control |
| GitHub | Source control and collaboration |
| GitHub Actions | CI/CD automation |
| Linux | Development/deployment environment |

---

## System Architecture

OpsFlow follows a client-server architecture with separate web, mobile, backend, and database layers.

```text
                         ┌─────────────────────┐
                         │     Web Client      │
                         │ React + TypeScript  │
                         └──────────┬──────────┘
                                    │
                                    │ REST API
                                    │
                         ┌──────────▼──────────┐
                         │      Backend        │
                         │ Node.js + Express   │
                         │     + TypeScript    │
                         └──────────┬──────────┘
                                    │
                                    │ SQL
                                    │
                         ┌──────────▼──────────┐
                         │     PostgreSQL      │
                         │      Database       │
                         └─────────────────────┘
                                    ▲
                                    │
                                    │ REST API
                                    │
                         ┌──────────┴──────────┐
                         │   Mobile Client     │
                         │ React Native + Expo │
                         └─────────────────────┘
