<div align="center">

# 🩺 Smart Healthcare System

### Next-Generation AI-Powered Healthcare & Clinical Management Platform

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://smart-healthcare-phi.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](./LICENSE)

<br />

**[🌐 Explore Live Application](https://smart-healthcare-phi.vercel.app/) · [📖 API Documentation](#-api-documentation) · [👥 Team & Contributors](#-team--contributors)**

</div>

---

## 🌐 Live Demo Link

The application is fully deployed and accessible live on Vercel:

👉 **[https://smart-healthcare-phi.vercel.app/](https://smart-healthcare-phi.vercel.app/)**

---

## 📖 Overview

**Smart Healthcare System** is a modern, full-stack enterprise healthcare platform designed to streamline patient-doctor interaction, automate clinical workflows, and offer real-time intelligent health analytics. Powered by **Next.js 16**, **FastAPI**, and **Google Gemini AI**, the system connects patients, healthcare professionals, and system administrators into one seamless digital ecosystem.

From tracking vital metrics like heart rate and blood glucose to scheduling specialist consultations, monitoring daily medicine compliance, and generating AI-driven diagnostic risk scores, the platform provides end-to-end digital health management.

> ⚕️ **Medical Disclaimer:** *Smart Healthcare System is designed for health tracking, appointment coordination, and educational AI assistance. It does not replace professional medical diagnosis, advice, or emergency medical services.*

---

## ✨ Key Features

| Category | Highlight Features |
|---|---|
| 📅 **Smart Appointment Booking** | Seamless online scheduling with specialist doctors, real-time availability slots, and instant status updates (`Pending`, `Confirmed`, `Completed`, `Cancelled`). |
| 📈 **Health Metrics Tracking** | Dynamic dashboards for logging and visualizing vital health indicators: Heart Rate (BPM), Blood Pressure (Systolic/Diastolic), Blood Glucose, and Sleep Duration. |
| 🤖 **AI Health Assistant** | Interactive 24/7 chatbot powered by **Google Gemini AI** providing context-aware health answers, symptom analysis, and preventive care guidance. |
| ⚠️ **Predictive Risk Assessment** | Machine-learning model & heuristic algorithms that calculate comprehensive health risk scores based on user vitals and medical history. |
| 💊 **Medication Management** | Daily prescription tracking with one-click dose mark-as-taken triggers, frequency logs, and compliance analytics. |
| 🩺 **Clinical Doctor Dashboard** | Dedicated interface for medical practitioners to manage patient appointment queues, update consultation statuses, and view patient health logs. |
| 🛡️ **Role-Based Access & Security** | JWT (JSON Web Tokens) authentication with fine-grained RBAC enforcing strict isolation between Patient, Doctor, and Admin access levels. |
| 📊 **Interactive Analytics** | Real-time trend visualizers built with **Recharts** for historical health progress and patient vitals tracking. |
| 📱 **Cross-Platform Responsive UI** | Modern, accessible, mobile-first design styled using **Tailwind CSS 4** and **Lucide Icons**. |

---

## 👥 User Roles & Permissions

The system enforces granular Role-Based Access Control (RBAC) across three distinct user categories:

```
                            ┌──────────────────────────────────┐
                            │    Smart Healthcare Ecosystem    │
                            └────────────────┬─────────────────┘
                                             │
         ┌───────────────────────────────────┼───────────────────────────────────┐
         ▼                                   ▼                                   ▼
┌──────────────────┐               ┌──────────────────┐               ┌──────────────────┐
│   🧑‍⚕️ PATIENT     │               │   👨‍⚕️ DOCTOR     │               │   🛡️ ADMIN       │
├──────────────────┤               ├──────────────────┤               ├──────────────────┤
│ • Book Appointments              │ • View Patient Queue             │ • System Monitoring
│ • Log Health Vitals              │ • Confirm/Cancel Consults        │ • User Management
│ • Medicine Trackers              │ • Update Clinical Logs           │ • Platform Analytics
│ • AI Chat Assistant              │ • Patient History Access         │ • Audit Oversight
└──────────────────┘               └──────────────────┘               └──────────────────┘
```

### 🧑‍⚕️ 1. Patient Role
* **Appointment Scheduling:** Search available doctors by specialization, select convenient time slots, and submit booking requests.
* **Health Vitals Monitoring:** Log daily physiological metrics (heart rate, blood pressure, glucose levels, sleep patterns) with historical charts.
* **Medication Compliance:** Record prescribed medications, set dosage frequencies, and mark daily doses as completed.
* **AI Medical Assistant:** Access 24/7 conversational AI support for symptom inquiry and general wellness advice.
* **Personal Health Logs:** Review comprehensive historical medical records and risk scoring diagnostics.

### 👨‍⚕️ 2. Doctor Role
* **Schedule & Queue Management:** View daily, weekly, and upcoming appointment requests organized by patient urgency and time slots.
* **Appointment Action Center:** Confirm, reschedule, mark as completed, or cancel consultations with direct feedback to patients.
* **Patient Health Record Review:** Inspect patient-consented health metrics, historical vitals, and medication history prior to consultations.
* **Clinical Notes & Logs:** Update consultation logs and provide prescription notes post-appointment.

### 🛡️ 3. Admin Role
* **System Monitoring & Oversight:** Real-time visibility into active server metrics, API endpoint performance, and database health.
* **User & Role Management:** Manage user profiles, verify credentialed medical practitioners, and handle account status activations/deactivations.
* **Platform Analytics:** Access aggregated population health trends, system usage statistics, and appointment fulfillment metrics.
* **Audit & Security Compliance:** Maintain platform security standards, monitor authentication logs, and ensure strict data privacy.

---

## 🔄 Complete Project Use Cases

Here are the primary step-by-step workflow scenarios illustrating how users interact with the Smart Healthcare platform:

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│ SCENARIO 1: Patient Onboarding, Vital Logging & AI Risk Assessment                          │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
  [Patient] -> Registers/Logins to Patient Dashboard
     │
     ├──> Navigates to "Health Metrics" -> Inputs Vitals (BP: 120/80, Heart Rate: 72 BPM, Glucose: 95 mg/dL)
     ├──> Visualizes real-time metric trends via interactive Recharts graphs
     ├──> Navigates to "AI Risk Assessment" -> Clicks "Calculate Risk Score"
     └──> Receives AI-generated Risk Profile (Low Risk / Healthy) with personalized recommendations
```

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│ SCENARIO 2: Appointment Booking & Clinical Consultation Workflow                            │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
  [Patient] -> Opens "Book Appointment" -> Selects Cardiology -> Chooses Doctor & Time Slot
     │
     ├──> System creates appointment with status `Pending`
     │
  [Doctor] -> Logs into Doctor Clinical Portal -> Sees new appointment in "Pending Queue"
     │
     ├──> Inspects Patient Vitals & Health History
     ├──> Clicks "Confirm Appointment" -> Status changes to `Confirmed`
     ├──> Conducts Consultation -> Updates Consultation Status to `Completed` with prescription notes
     └──> [Patient] receives completion confirmation on their dashboard feed
```

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│ SCENARIO 3: Medication Tracking & Daily Compliance                                         │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
  [Patient] -> Navigates to "Medicine Tracker"
     │
     ├──> Adds new medication: "Amoxicillin 500mg" (Frequency: Twice Daily)
     ├──> Receives daily dose checklist on dashboard
     ├──> Clicks "Mark Dose as Taken" when medication is consumed
     └──> Progress bar updates to reflect 100% daily compliance
```

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│ SCENARIO 4: Administrative Oversight & System Monitoring                                     │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
  [Admin] -> Accesses Secure Admin Panel
     │
     ├──> Reviews system operational metrics (API response times, server load, DB storage)
     ├──> Manages user roster: Approves new Doctor registrations & verifies medical licenses
     └──> Generates high-level system utilization reports and audit activity logs
```

---

## 🛠️ Tech Stack

### 🎨 Frontend Framework & UI
* **Framework:** [Next.js 16.3.0](https://nextjs.org/) (App Router, Server Components & Client Hooks)
* **Library:** [React 19.2.8](https://react.dev/)
* **Language:** [TypeScript 5.x](https://www.typescriptlang.org/) (Strict Type Safety)
* **Styling:** [Tailwind CSS 4.x](https://tailwindcss.com/) (Utility-First Responsive Styling)
* **Data Visualization:** [Recharts 3.x](https://recharts.org/) (Interactive Health Charts)
* **Icons:** [Lucide React](https://lucide.dev/)

### ⚡ Backend API & Core Engine
* **Framework:** [FastAPI 0.110+](https://fastapi.tiangolo.com/) (High-Performance Asynchronous Python Web Framework)
* **Server:** [Uvicorn 0.28+](https://www.uvicorn.org/) (ASGI Server Execution) / Gunicorn (Production)
* **Validation:** [Pydantic v2](https://docs.pydantic.dev/) (Data Validation & Schema Enforcement)
* **Authentication:** JWT (JSON Web Tokens) with `python-jose` & `passlib` / `bcrypt`
* **Export Engine:** [ReportLab](https://www.reportlab.com/) (Medical Report PDF Generation)

### 🗄️ Database & Storage
* **Database:** SQLite 3 (Development) / PostgreSQL (Production ready with `psycopg2-binary`)
* **ORM:** [SQLAlchemy 2.0+](https://www.sqlalchemy.org/) (Relational Mapping & Database Queries)

### 🤖 AI & Analytics
* **LLM Integration:** [Google Gemini AI API](https://ai.google.dev/) (24/7 AI Health Chat Assistant & Clinical Text Parsing)
* **Data Science:** Scikit-Learn, Pandas, NumPy (Health Risk Scoring & Metrics Processing)

### 🚀 Hosting & Infrastructure
* **Frontend Hosting:** [Vercel](https://vercel.com/) (Automated Deployment Pipeline)
* **Backend Hosting:** Render / Cloud VPS (REST API Deployment)
* **Version Control:** Git & GitHub

---

## 📁 Project Directory Structure

```
smart-healthcare/
│
├── 📂 backend/                     # FastAPI Asynchronous Python Backend
│   └── app/
│       ├── api/                    # API Route Handlers
│       │   ├── auth.py             # User Authentication & JWT logic
│       │   ├── appointments.py     # Appointment CRUD & status transitions
│       │   ├── health_metrics.py   # Health vitals tracking & analytics
│       │   └── medicines.py        # Medication tracking endpoints
│       ├── database/               # Database Engine & Session Configuration
│       │   └── database.py         # SQLAlchemy engine & sessionmaker
│       ├── models/                 # SQLAlchemy Database ORM Models
│       ├── schemas/                # Pydantic Schemas for Input/Output Validation
│       ├── services/               # Business Logic & AI Integration
│       └── main.py                 # FastAPI Application Entrypoint & CORS Policy
│
├── 📂 frontend/                    # Next.js 16 TypeScript Frontend
│   └── src/app/
│       ├── page.tsx                # Public Landing Page
│       ├── layout.tsx              # Root App Layout & Providers
│       ├── login/                  # Login Screen
│       ├── register/               # User Registration Screen
│       └── dashboard/              # Protected Dashboard Ecosystem
│           ├── layout.tsx          # Dashboard Shell (Sidebar + Navigation)
│           ├── patient/            # Patient Vitals & Health Dashboard
│           ├── doctor/             # Doctor Clinical Portal & Queue Management
│           ├── admin/              # System Monitoring & Admin Oversight
│           ├── ai-assistant/       # 24/7 AI Chat Assistant Interface
│           ├── risk-assessment/    # AI Health Risk Diagnostic Tool
│           ├── medicines/          # Prescription & Medicine Tracker
│           ├── book-appointment/   # Doctor Search & Booking Interface
│           └── team/               # Project Contributors Page
│
├── 📂 docs/                        # Project Documentation & Screenshots
├── requirements.txt                # Python Backend Dependencies
├── Procfile                        # Production Server Process Commands
├── render.yaml                     # Render Cloud Deployment Blueprint
├── run_project.bat                 # One-Click Launch Script (Windows)
├── run_backend.bat                 # Backend Launch Script
└── run_frontend.bat                # Frontend Launch Script
```

---

## 🚀 Getting Started & Installation Guide

Follow these steps to set up and run the Smart Healthcare System locally on your environment.

### Prerequisites

Ensure you have the following installed on your machine:
* **Node.js** 18.x or higher -> [Download Node.js](https://nodejs.org/)
* **Python** 3.11 or higher -> [Download Python](https://python.org/)
* **Git** -> [Download Git](https://git-scm.com/)

---

### Step 1: Clone the Repository

```bash
git clone https://github.com/Raviguptaji9565/smart-healthcare.git
cd smart-healthcare
```

---

### Step 2: Configure & Launch Backend

```bash
# 1. Create a Python Virtual Environment
python -m venv backend/venv

# 2. Activate Virtual Environment
# On Windows (PowerShell):
backend\venv\Scripts\Activate.ps1
# On macOS/Linux:
source backend/venv/bin/activate

# 3. Install Python Dependencies
pip install -r requirements.txt

# 4. Set Up Backend Environment Variables
cp backend/.env.example backend/.env   # Create .env from template
```

Configure your `backend/.env` file:
```env
SECRET_KEY=your_super_secret_jwt_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
GEMINI_API_KEY=your_google_gemini_api_key_here
```

Start the FastAPI server:
```bash
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
> ⚡ Backend will be available at: `http://localhost:8000`

---

### Step 3: Configure & Launch Frontend

Open a new terminal window:

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install Node Dependencies
npm install

# 3. Configure Frontend Environment Variables
```

Create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Start the Next.js development server:
```bash
npm run dev
```
> 🌐 Frontend will be accessible at: `http://localhost:3000`

---

### Step 4: One-Click Launch (Windows Quick Start) ⚡

If you are on Windows, you can launch both Frontend and Backend concurrently with a single command:

```bat
run_project.bat
```

---

## 📡 Local Server Endpoints & Documentation

| Service | Access URL | Description |
|---|---|---|
| 🌐 **Web Frontend** | `http://localhost:3000` | Next.js Web Interface |
| ⚡ **REST API Engine** | `http://localhost:8000` | FastAPI Base Backend |
| 📖 **Interactive OpenAPI Docs** | `http://localhost:8000/docs` | Swagger UI API Explorer |
| 📚 **ReDoc Documentation** | `http://localhost:8000/redoc` | OpenAPI Reference |

---

## 👥 Team & Contributors

This project was architected, developed, and deployed with passion by a dedicated 4-member full-stack engineering team:

<div align="center">

### 👑 Project Leadership

</div>

| Member | Profile & Links | Role & Core Contributions |
|---|---|---|
| 👑 **Ravi Gupta** | [![GitHub](https://img.shields.io/badge/GitHub-Raviguptaji9565-181717?style=flat&logo=github)](https://github.com/Raviguptaji9565) | **Project Owner & Full-Stack Architect**<br />• System Architecture Design & Project Roadmap<br />• FastAPI Core Setup, JWT Auth & RBAC Security<br />• Next.js 16 App Router Integration & Routing<br />• Deployment Lead (Vercel & Render Integration) |

---

<div align="center">

### 👥 Engineering Team

</div>

| Member | Profile & Links | Role & Core Contributions |
|---|---|---|
| 🤖 **Dhuru Madhuwal** | [![GitHub](https://img.shields.io/badge/GitHub-dhurumadhuwal420-181717?style=flat&logo=github)](https://github.com/dhurumadhuwal420) | **AI/ML & Health Intelligence Specialist**<br />• Google Gemini AI Integration & Prompt Engineering<br />• Health Risk Assessment Algorithm & Diagnostics<br />• AI Health Assistant Chatbot Interface & Logic |
| 🎨 **Shikhar Srivastava** | [![GitHub](https://img.shields.io/badge/GitHub-Shikhrsrivastavji-181717?style=flat&logo=github)](https://github.com/Shikhrsrivastavji) | **Frontend & UI/UX Developer**<br />• Tailwind CSS 4 Design System & Styling<br />• Landing Page & Responsive Dashboard Shell<br />• Patient & Doctor Navigation Layouts |
| 🗄️ **Sachin Yadav** | [![GitHub](https://img.shields.io/badge/GitHub-yadavsachin0011-181717?style=flat&logo=github)](https://github.com/yadavsachin0011) | **Backend Engine & Database Engineer**<br />• SQLAlchemy ORM Data Models & Migrations<br />• Pydantic Schema Validation & Endpoints<br />• Appointments & Medication Reminders Logic |

---

## 🤝 Contributing

Contributions are always welcome! If you'd like to improve the Smart Healthcare System:

1. **Fork** the repository.
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a **Pull Request**.

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for full details.

---

<div align="center">

**Designed & Developed with ❤️ by the Smart Healthcare Team**

⭐ **If you find this repository useful, please consider giving it a star!** ⭐

[![GitHub stars](https://img.shields.io/github/stars/Raviguptaji9565/smart-healthcare?style=social)](https://github.com/Raviguptaji9565/smart-healthcare/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Raviguptaji9565/smart-healthcare?style=social)](https://github.com/Raviguptaji9565/smart-healthcare/network/members)

</div>
