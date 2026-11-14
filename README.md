# KamatiHub

### Simplifying Committee and Event Management

KamatiHub is a web-based committee management platform designed to help organizations coordinate activities, manage members, organize events, assign tasks, and track financial activities from one centralized dashboard.

The project aims to simplify committee operations through an organized, accessible, and user-friendly digital platform.

## Overview

Managing committees often involves coordinating people, events, responsibilities, and finances across different communication channels.

KamatiHub aims to bring these activities together in one platform, improving organization, visibility, and collaboration.

## Key Features

- **Dashboard:** Overview of committee activities and important information.
- **Committee Management:** Organize and manage committees.
- **Event Management:** Create and manage committee events.
- **Member Management:** Maintain committee membership records.
- **Task Management:** Coordinate responsibilities and track progress.
- **Fund Tracking:** Organize and monitor committee financial activities.
- **Authentication:** Secure user access through token-based authentication.
- **Role-Based Access:** Support different levels of user permissions.

*Features are being developed progressively.*

## Technology Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Vite
- Lucide React

### Backend
- Python
- Django
- Django REST Framework
- Django REST Framework Simple JWT

### Database
- SQLite (development)

### Development Tools
- Git and GitHub
- Visual Studio Code
- Postman

## Project Structure

```text
KamatiHub/
├── backend/
│   ├── accounts/
│   ├── committees/
│   └── config/
├── public/
├── src/
│   ├── components/
│   └── data/
├── .gitignore
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm
- Python
- Git

### Frontend Setup

```bash
npm install
npm run dev
```

### Backend Setup

Open a separate terminal:

```bash
cd backend
```

Activate your Python virtual environment on Windows:

```powershell
.\venv\Scripts\Activate.ps1
```

Install backend dependencies if a `requirements.txt` is available:

```bash
pip install -r requirements.txt
```

Run database migrations:

```bash
python manage.py migrate
```

Start the Django development server:

```bash
python manage.py runserver
```

## Project Status

**Currently in Development**

KamatiHub is under active development. Features, documentation, and functionality will continue to improve as the project progresses.

## Author

**Yusuf Seif Hamisi**

Computer Science Student  
University of Dar es Salaam (UDSM)

GitHub: [@yusufHamisi](https://github.com/yusufHamisi)

---

Building practical solutions through software engineering.