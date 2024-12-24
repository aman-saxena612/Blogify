# MERN Stack Blog Website

This is a **MERN Stack Blog Website** where users can log in, create blogs with text and images, comment on posts, delete comments, view their profile page, and search for blogs by title. It is built using **ReactJS**, **NodeJS**, **ExpressJS**, and **MongoDB**.

## Features

- User authentication (Login/Signup)
- Post blogs with text and images
- Comment on blog posts
- Delete comments
- Profile page showing only the user's own blogs
- Search functionality to find blog posts by their title

## Tech Stack

- **Frontend:** ReactJS
- **Backend:** NodeJS, ExpressJS
- **Database:** MongoDB

## Getting Started

Follow these steps to run the project locally:

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running locally or a cloud database setup

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/blog-website.git
   cd blog-website

cd backend
npm install

cd ../frontend
npm install

cd backend
npm start

cd ../frontend
npm start

```env configurations:
MONGO_URL=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
PORT=8002
SECRET="your-secret-key"
