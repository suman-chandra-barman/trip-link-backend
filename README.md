# Travel Buddy Matching

## Overview

Travel Buddy Matching is a web application designed to help travelers find compatible travel buddies for their adventures. Whether you're planning a solo trip and want to meet fellow travelers along the way or seeking companions for a specific trip, this application provides a platform to connect with like-minded individuals.

## Live URL

The application is currently deployed at: [Live URL](https://travel-buddy-matching-ten.vercel.app/)

## Project Functionality Video

Watch this video to understand the functionality of the Travel Buddy Matching application:

[Project Functionality Video](https://drive.google.com/file/d/1S9K8Epoah1TwTbUnOP4DtZQJzvmAfxIY/view)

## Features

- **User Registration and Authentication:** Secure user registration and authentication using JWT (JSON Web Tokens).
- **User Profiles:** Users can create and update their profiles, including details such as bio, age, and more.
- **Trip Creation:** Users can create trips, specifying details such as destination, start and end dates, budget, and activities.
- **Travel Buddy Requests:** Users can send and receive travel buddy requests for specific trips.
- **Matching Algorithm:** Advanced algorithms match users based on compatibility factors like destination preferences, travel dates, and shared interests.
- **Error Handling:** Proper error handling implemented throughout the application with informative error responses.
- **API Endpoints:** RESTful API endpoints for various functionalities such as user registration, login, trip creation, buddy requests, and more.

## Technology Stack

- **Programming Language:** TypeScript
- **Web Framework:** Express.js
- **Object Relational Mapping (ORM):** Prisma with PostgreSQL
- **Authentication:** JWT (JSON Web Tokens)

## Prerequisites

Before setting up the application, ensure you have the following installed on your system:

- Node.js 
- npm 
- PostgreSQL 

## Getting Started

1. **Clone the Repository:**

    ```
    git clone https://github.com/your-username/travel-buddy-matching.git
    ```

2. **Install Dependencies:**

    ```
    cd travel-buddy-matching
    npm install
    ```

3. **Set up Environment Variables:**

    Create a `.env` file in the root directory and add the following environment variables:

    ```
    PORT=3000
    DATABASE_URL=postgresql://username:password@localhost:5432/travel_buddy_db
    JWT_SECRET=your_jwt_secret
    ```

    Replace `username`, `password`, and `your_jwt_secret` with your PostgreSQL credentials and a secret key for JWT.

4. **Run Migrations:**

    ```
    npx prisma migrate dev --name init
    ```

5. **Start the Server:**

    ```
    npm run dev
    ```

6. **Access the Application:**

    Open your web browser and navigate to `http://localhost:3000` to access the application.

