# Pen-nd-Pixel Server

This is the server component of the Pen-nd-Pixel project.

## Server Information

The Pen-nd-Pixel server is built using [Node.js](https://nodejs.org/) and [Express.js](https://expressjs.com/). It provides the backend functionality for the Pen-nd-Pixel application.

## Routes

Base URL- /api/v1
The server exposes the following routes:

** password constraint -> minimum length of password to be 8

- Auth Routes (parent route : /api/v1/auth)

/register POST (name,email and password are required, providing Profile image is optional otherwise it will be set to a default image gravatar)

/login POST (email and password are required)

/logout DELETE (no requirement from body)

/verify-email POST 
(just redirect this request to backend if email is verified a confirmation message will be send as 'Email Verified')
(This request will have to be sent from the link mailed to the user) 

/forgot-password POST (email is required from body, then a reset password mail will be sent and which will redirect to reset-password route)

/reset-password?token=()&email=() POST 
(this token and email query link will be sent to the user via email)

/upload-image POST (for uploading the profile image of user to cloud) (this returns an 'url' of the uploaded image that you want to send while making a register request)

Please refer to the server code for more details on each route implementation.

## Getting Started

To get started with the Pen-nd-Pixel server, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/Pen-nd-Pixel.git`
2. Install dependencies: `npm install`
3. Start the server: `npm start`

Make sure to configure the necessary environment variables before starting the server.

## Contributing

Contributions to the Pen-nd-Pixel server are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).