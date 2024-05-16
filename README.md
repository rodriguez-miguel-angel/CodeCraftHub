# User Management Service

This User Management Service is a Node.js application that allows users to register, login, and manage their profiles using MongoDB as the database.

## Features

- User Registration
- User Login
- Update User Profile
- Secure Authentication with JWT
- MongoDB Database Integration

## Installation

1. Clone the repository
2. Install dependencies using `npm install`
3. Set up a MongoDB database and configure the connection in the `.env` file
4. Start the application using `npm start`

## Usage

- Register a new user: `POST /api/users/register`
- Login with existing user: `POST /api/users/login`
- Update user profile: `PUT /api/users/:username`

## Environment Variables

Make sure to set the following environment variables in a `.env` file:

```
PORT=3000
MONGODB_URI="mongodb://your_username:your_password@localhost:27017/your_database"
SECRET_KEY=your_secret_key
```

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature`)
6. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributors
Coursera. IBM. IBM Watson. WatsonX. GPT-3. Miguel Angel Rodriguez.