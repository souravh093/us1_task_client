# SkillSync

## Project Overview
SkillSync is a peer-to-peer skill-sharing platform that allows users to teach and learn new skills. Users can request a session, and the skill creator can accept the request and send a Google Meet link to conduct the lesson. The project includes two roles: user and admin.

Admins have the authority to delete users and view trends related to skills. Users have different dashboards where they can create skills and manage other related activities.

## Features
- Advanced Search, Filter, and Sort
- Role-based Dashboard
- Authentication
- Authorization
- Peer-to-Peer Skill Sharing
- Session Request
- Activity Management
- Skill Creating
- Admin Authority
- Review Meeting

## Skill Sharing Platform - Database Schema

### 1. User Management

#### User
Stores user details and roles.
- **id** (String, UUID, Primary Key) - Unique user ID
- **name** (String) - Full name
- **email** (String, Unique) - Email address
- **password** (String) - Hashed password
- **profilePhoto** (Text) - Profile picture URL
- **role** (Enum: USER, ADMIN) - User role
- **createdAt** (DateTime) - Account creation timestamp
- **updatedAt** (DateTime) - Last update timestamp

**Relations:**
- **Has One** - UserProfile
- **Has Many** - Skills, Sessions (as Requestor), Reviews

#### UserProfile
Stores additional user information.
- **id** (String, UUID, Primary Key)
- **bio** (String) - Short user biography
- **address** (String) - Location
- **userId** (String, Unique) - Foreign Key to **User**

**Relations:**
- **Belongs To** - User

### 2. Skill Management

#### Skill
Represents a skill a user offers.
- **id** (String, UUID, Primary Key)
- **name** (String) - Skill name
- **category** (Enum: PROGRAMMING, DESIGN, etc.) - Skill category
- **description** (String) - Skill details
- **requestCount** (Int, Default: 0) - Number of session requests
- **image** (Text) - Image URL
- **level** (Enum: BEGINNER, INTERMEDIATE, ADVANCED) - Skill level
- **userId** (String) - Foreign Key to **User**
- **createdAt** (DateTime)
- **updatedAt** (DateTime)

**Relations:**
- **Belongs To** - User
- **Has Many** - Sessions, Availability

#### Availability
Defines when a skill is available.
- **id** (String, UUID, Primary Key)
- **skillId** (String) - Foreign Key to **Skill**
- **dayOfWeek** (Enum: SUNDAY - SATURDAY)
- **status** (Enum: AVAILABLE, UNAVAILABLE)
- **startTime** (String)
- **endTime** (String)

**Relations:**
- **Belongs To** - Skill
- **Has Many** - Sessions

### 3. Session Management

#### Session
Tracks skill-sharing sessions.
- **id** (String, UUID, Primary Key)
- **skillId** (String) - Foreign Key to **Skill**
- **requestorId** (String) - Foreign Key to **User**
- **status** (Enum: PENDING, ACCEPTED, REJECTED, COMPLETED)
- **meetingLink** (Text, Nullable) - Google Meet link
- **availabilityId** (String) - Foreign Key to **Availability**
- **createdAt** (DateTime)
- **updatedAt** (DateTime)

**Relations:**
- **Belongs To** - Skill, Requestor (User), Availability
- **Has Many** - Reviews

### 4. Review System

#### Review
User feedback for sessions.
- **id** (String, UUID, Primary Key)
- **sessionId** (String) - Foreign Key to **Session**
- **rating** (Int) - Rating (1-5)
- **comment** (String) - Feedback
- **reviewerId** (String) - Foreign Key to **User**
- **createdAt** (DateTime)
- **updatedAt** (DateTime)

**Relations:**
- **Belongs To** - Session, Reviewer (User)

---

## Project Setup & Run Guide

### 1. Backend (Express.js, Prisma, TypeScript)

#### Setup
1. **Clone the repository:**
   ```sh
   git clone <repo_url> && cd backend
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables (`.env`):**
   ```sh
   DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
   JWT_SECRET="your_secret_key"
   ```
4. **Generate Prisma client & migrate database:**
   ```sh
   npx prisma migrate dev --name init
   ```
5. **Run the server:**
   ```sh
   npm run dev
   ```
   The API will be running at **http://localhost:5000**

### 2. Frontend (Next.js, TypeScript, Redux Toolkit)

#### Setup
1. **Navigate to the frontend directory:**
   ```sh
   cd ../frontend
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables (`.env.local`):**
   ```sh
   NEXT_PUBLIC_API_URL="http://localhost:5000"
   ```
4. **Run the frontend:**
   ```sh
   npm run dev
   ```
   The app will be running at **http://localhost:3000**
