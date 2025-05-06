# Smart Home Automation System Simulator

A cross-platform mobile app and backend system simulating smart home device automation and monitoring. Built with **React Native (Expo)**, a **Python backend (Flask/Django)**, and **MySQL**, the app mimics the experience of managing a smart home through a sleek, modern UI.

## 📱 Overview

This simulator provides a polished mobile experience for controlling and monitoring a set of pre-defined smart home devices. The app consolidates various smart features—automation rules, energy usage, device insights—into a single, user-friendly dashboard. It is ideal for prototyping smart home interfaces, UI/UX experimentation, and understanding IoT-driven design patterns.

### 🔑 Key Features

- 📊 **Home Dashboard**: View and manage rooms that contain smart devices, toggle devices on/off, and customize user preferences.
- 💡 **Device Interaction**: View all connected smart devices with status indicators and categorized display.
- 🔍 **Search Functionality**: Easily explore devices and rooms.
- ⚙️ **User Settings**: Manage profile, notifications, and account-level preferences.
- 📶 **Offline Simulation**: No actual hardware is required; devices and behaviors are simulated.
- 🔐 **Auth Flow**: Includes login and registration screens for session control (optional extension).

## 🧱 Tech Stack

| Layer       | Technology            |
|------------|------------------------|
| Frontend   | React Native (Expo)    |
| Backend    | Python (Flask or Django) |
| Database   | MySQL                  |
| UI Theme   | Dark mode, custom palette (#FFB267, #282424, #211D1D, #393535, #FFFFFF) |

## 🗂️ Project Structure

```
smart-home-simulator/
├── assets/                  # App media (icons, images)
├── app/                     # Frontend views and navigation (Expo Router)
│   ├── home.tsx
│   ├── devices.tsx
│   ├── search.tsx
│   ├── settings.tsx
│   ├── login.tsx
│   └── register.tsx
├── components/              # Reusable UI components
├── backend/                 # Python backend (Flask or Django)
│   ├── api/
│   ├── models/
│   └── routes/
├── database/                # MySQL schema and setup
├── README.md
├── package.json             # Frontend dependencies
├── requirements.txt         # Backend dependencies
└── .gitignore
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** and **Expo CLI** for mobile development
- **Python 3.x**, **pip**, and **MySQL** for the backend
- Emulator or physical device (Android/iOS) for testing

### Frontend Setup

```bash
cd smart-home-simulator
cd SmartThingies
npm install
npx expo start
```


> Adjust environment variables and DB settings as needed in the backend config.

## 📸 Screens

- **Home**: Unified view of all smart insights.
- **Devices**: Interactive device tiles with status and type indicators.
- **Search**: Search bar and categorized results with manual add option.
- **Settings**: User profile management and logout functionality.

## 🛠️ Roadmap

- [ ] Add real-time device state syncing
- [ ] Enable CRUD for automation rules
- [ ] OAuth integration
- [ ] Cloud storage or Firebase for persistence

## 📄 License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.

