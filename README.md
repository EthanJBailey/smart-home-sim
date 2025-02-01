# Smart Home Automation System Simulator

A Python-based simulator for controlling and monitoring virtual devices in a smart home environment. This project uses Tkinter for the GUI and object-oriented programming (OOP) principles to manage devices, rooms, and automation rules.

## Description

The Smart Home Automation System Simulator allows users to control and monitor virtual devices such as lights, thermostats, and security cameras. The application features a user-friendly Tkinter dashboard that displays the current status of devices, enables users to toggle devices, and allows the creation of automation rules.

This project simulates a real-world smart home system where devices can be grouped by rooms, controlled individually or in bulk, and used with automation rules to trigger actions based on certain conditions (like time of day or motion detection).

Key features include:
- Control and monitor devices like lights, thermostats, and cameras
- Device grouping by rooms
- Support for automation rules (e.g., turning on lights at sunset)
- Simple energy usage tracking and analytics
- Event-driven programming and flexible, extensible system design

## Project Structure

Here’s the basic directory structure for the project:

```
smart-home-simulator/
├── assets/               # Images, icons, and other media for the GUI
├── src/                  # Python source code
│   ├── __init__.py       # Make this a package
│   ├── main.py           # Entry point for the GUI app
│   ├── device.py         # Device class
│   ├── room.py           # Room class
│   ├── automation.py     # Automation rule class
│   └── dashboard.py      # GUI logic using Tkinter
├── requirements.txt      # List of dependencies
├── .gitignore            # Ignore unnecessary files (e.g., pycache, venv)
├── README.md             # Project documentation
└── LICENSE               # License file if applicable
```
## Requirements

This project requires Python 3.x and the following dependencies:

- **Tkinter**: A built-in Python library for creating graphical user interfaces.
- **Pillow**: Python Imaging Library for handling images (used for icons or media in the GUI).
- **matplotlib**: For potential future analytics or data visualization features.

You can install the required dependencies by running:

```bash
pip install -r requirements.txt
