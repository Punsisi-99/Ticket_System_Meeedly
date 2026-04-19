# Smart Support Ticket System Made from Noplin UIs by Meeedly

A scalable React-based Software Support Ticket System built for the Meeedly Software Engineering Internship Assignment. This project is designed for an enterprise SaaS support workflow, with emphasis on clean architecture, maintainability, and scalability.

## Project Overview

This application simulates an internal support ticketing system for a global enterprise SaaS platform. It allows users to create support tickets, helps support teams manage them from a dashboard, and supports conversation-based replies for issue handling.

The project was built with a strong focus on:
- scalable component design
- reusable UI structure
- practical ticket workflows
- clean state handling without external state libraries

This assignment required a system that supports ticket creation, ticket viewing with responses, and a management dashboard, while also demonstrating real-world engineering thinking beyond basic CRUD. 

## Features

- Create a support ticket with:
  - Title
  - Description
  - Ticket priotization
- View all tickets in a centralized dashboard
- Organize tickets by support-related attributes such as status, priority, or category
- View ticket conversations
- Add support responses
- Manage ticket workflows from a single interface
- UI designed for multi-organization SaaS usage

## Architecture Decisions

### 1. Component-Based Design
The application is built using reusable React components so that the UI remains modular and maintainable as the project grows.

### 2. Centralized Ticket State
Ticket data is managed in React state and passed through components in a predictable way. This keeps the project simple while remaining ready for future API integration.

### 3. Dashboard-Centered Workflow
Instead of forcing users to move through many disconnected screens, the design focuses on a management-friendly dashboard workflow for faster ticket handling.

### 4. Future Backend Readiness
The ticket structure is designed in a way that can later be connected to a real backend, database, authentication system, and role-based access control.

## Scalability Considerations

This project was designed with scalability in mind, as required in the assignment. 

Key considerations include:
- reusable components to reduce duplication
- structured ticket objects for easier backend mapping
- separation of ticket creation, listing, and response logic
- dashboard workflow that can scale for larger support teams
- code organization that supports future pagination, search, filtering, and API integration
- no external state libraries, keeping the solution lightweight and controlled

## Tech Stack

- React `^19.2.4`
- React DOM `^19.2.4`
- Vite `^8.0.1`

From the project configuration, the available scripts are development, build, lint, and preview commands. 

## Project Structure

Example structure:

```text
src/
├── components/
│   ├── common/
│   ├── dashboard/
│   └── tickets/
├── pages/
│   ├── TicketCreatePage.jsx
│   └── DashboardPage.jsx
├── data/
├── utils/
├── App.jsx
└── main.jsx
