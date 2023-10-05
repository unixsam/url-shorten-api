# URL Shortener

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

A URL shortener service built with Node.js and MySQL.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Getting Started

### Prerequisites

- Node.js and npm installed
- MySQL database set up

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/url-shortener.git
   cd url-shortener

2. Install dependencies:

    ```bash
    npm install

3. Create a .env file with your database configuration:

    ```bash
    PORT=3000
    DB_HOST=localhost
    DB_USER=your_mysql_user
    DB_PASSWORD=your_mysql_password
    DB_DATABASE=url_shortener

Run the application:

npm start

## Usage

- Shorten a URL by sending a POST request to `/shorten`.
- View the list of URLs by sending a GET request to `/urls`.
- Redirect to the original URL by visiting `/:short_url`.

## API Endpoints

1. POST `/shorten`: Shorten a URL.

    - Request Body:

        ```json
        {
        "original_url": "https://example.com"
        }

    - Response:

        ```json
        {
        "short_url": "abc123",
        "original_url": "https://example.com",
        "click_count": 0,
        "created_at": "2023-10-05T00:00:00Z",
        "updated_at": "2023-10-05T00:00:00Z"
        }

2. GET `/urls`: List all shortened URLs.
    - Response:

        ```json
        [
        {
            "short_url": "abc123",
            "original_url": "https://example.com",
            "click_count": 0,
            "created_at": "2023-10-05T00:00:00Z",
            "updated_at": "2023-10-05T00:00:00Z"
        },
        {
            "short_url": "xyz789",
            "original_url": "https://another-example.com",
            "click_count": 3,
            "created_at": "2023-10-06T00:00:00Z",
            "updated_at": "2023-10-06T00:00:00Z"
        }
        ]

## Database Schema
The application uses a MySQL database with the following schema:

```bash
CREATE TABLE urls (
    id INT AUTO_INCREMENT PRIMARY KEY,
    original_url VARCHAR(255) NOT NULL,
    short_url VARCHAR(10) NOT NULL UNIQUE,
    click_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

### Migrate

To create the database table, you can run the following command:

```bash
npx knex migrate:latest


## Contributing
Contributions are welcome! Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests to us.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.

## Acknowledgments
ShortID - Library for generating short, unique, non-sequential IDs.


