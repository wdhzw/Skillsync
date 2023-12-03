# course-project-team-13

course-project-team-13 created by GitHub Classroom

## SkillSync

SkillSync is a platform that allows users to showcase their skills, discover new ones, and connect with like-minded individuals.

## Table of Contents

- [List of Implemented Features](#list-of-implemented-features)
- [Getting Started](#getting-started)

## List of Implemented Features

### Register
- New users can join SkillSync by providing personal details, including their personal information, the skills they want to share and learn.
- Postcode integration with Google Maps API (currently inactive due to billing requirements).
- Users can upload a personal avatar.

### Login
- Existing users log in using their username and password.
- Redirects to ViewProfile page after successful login.
- Error handling for unsuccessful login attempts.

### Admin Login
- Special login for administrators with username `admin` and password `admin123`.
- Admin privileges include user and skill management. If admin login, can see the hidden edit button and a hidden delete button for each skill in the skill list, and can see a hidden edit button for every user in the userlist.

### Users
- User can see a list of users with their name, location, avatar and skills to share and learn.
- Browse user profiles in the SkillSync community.
- Filter, search, and sort user profiles.
- View and edit personal user profiles.

### Skills
- Access a list of skills.
- View detailed information about each skill.
- Integration with mySkillsFuture API for skill-related career information.

### Chats
- Direct chat functionality with other users.
- Start a new chat by clicking the chat button when viewing that user's profile.
- View past chats and continue conversations.
- Search functionality for finding users in chat.
- Navigate to user profiles from chats by clicking small user avatar on the chat header.


### Recommended Users
- Receive user suggestions based on skills and preferences.
- Algorithmic recommendations for expanding personal networks.

### Integration
- SkillsFuture integration for career and course suggestions.
- Google Maps API integration for location-based features (currently inactive).

## Getting Started

Navigate to the skillsync folder and follow the instructions provided to set up and run the project.
