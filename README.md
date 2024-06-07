
# Ecommerce Project

![Ecommerce Project Logo](link-to-logo.png)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

This is a car purchasing project using technologies like React, Prisma, and Axios. It includes features for user/order administration, product listings, and order processing using Stripe. The project leverages a robust backend to handle data storage and transactions, ensuring a smooth car buying experience.

## Features

- User authentication and authorization
- Product listing and search
- Shopping cart and checkout process
- Order history and management
- Responsive design for mobile and desktop

## Installation

Step-by-step instructions on how to set up the project.

### Prerequisites

- **Operating System**: Windows, macOS, or Linux
- **Node.js**: v14.x or higher
- **npm**: v6.x or higher
- **PostGreSQL**: v16.x or higher

### Dependencies

The project uses the following libraries and frameworks:

- Axios: For making HTTP requests.
- React: A JavaScript library for building user interfaces.
- React Router: For routing in React applications.
- Material-UI (MUI): For React UI components.
- Stripe: For payment processing.
- Webhooks: For handling real-time updates from Stripe.
- bcrypt: For hashing passwords.
- JWT (jsonwebtoken): For creating and verifying JSON Web Tokens.
- Prisma: For database ORM and migrations.
- nodemon: For automatically restarting the server during development.

### Setup

1. **Clone the repository:**
    ```sh
    git clone https://github.com/JSilva314/capstone_ecommerce_site
    ```

2. **Navigate to the project directory:**
    ```sh
    cd capstone_ecommerce_site
    ```

3. **Install dependencies:**
    ```sh
    npm install
    ```

4. **Configure the project:**
    - Copy the example environment file and update it with your settings:
      ```sh
      cp .env.example .env
      ```
    - Edit the `.env` file to set your environment variables.

5. **Database Setup:**
    - Run migrations to set up the database schema:
      ```sh
      npx prisma migrate dev
      ```
    - Seed the database with initial data (if applicable):
      ```sh
      node seed.js
      ```

6. **Start the project:**
    ```sh
    npm start
    ```

Your project should now be up and running at `http://localhost:3000`.

## Usage

This site allows the user to purchase vehicles (1 per user & transaction). This can also be tailored to suit other ecommerce needs.

```sh
# Run the project
npm run dev
```

## Configuration

```sh
# Example configuration
```

## Contributing

Follow these guidelines below to contribute to this repository.

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add new feature'`)
5. Push to the branch (`git push origin feature-branch`)
6. Open a pull request

## License


## Contact

Provide contact information for users who may have questions or need support.

- GitHub: [JSilva314](https://github.com/JSilva314)
- GitHub: [leosstheleo](https://github.com/leosstheleo)
- GitHub: [BancroftH](https://github.com/BancroftH)

---
