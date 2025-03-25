# birthday-reminder-app

AltSchool Africa Third Semester Assignments 2
An automated application that sends birthday wishes to customers via email.

## Features

- Simple UI to collect customer name, email, and date of birth
- Daily check (7:00 AM) for customer birthdays
- Automatic personalized email sending
- Customer information display

## Tech Stack

- **Frontend**: HTML, Tailwind, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Email**: Nodemailer with Gmail
- **Scheduling**: node-cron

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Abiodun001-world/birthday-reminder-app.git
   cd birthday-reminder-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file:

   ```
   EMAIL=your-gmail@gmail.com
   EMAIL_PASSWORD=your-app-password
   ```

   > Note: Use Gmail app password, not regular password

4. Start MongoDB and the application:

   ```bash
   npm start
   ```

5. Access at `http://localhost:3000`

## How It Works

1. **Collect Data**: Frontend form stores customer info in MongoDB
2. **Daily Check**: Cron job runs at 7:00 AM to find today's birthdays
3. **Send Emails**: Automated emails sent to birthday celebrants

## API Endpoints

### GET `/api/users`

Returns a list of all registered users.

### POST `/api/users`

Creates a new user.

Request body:

```json
{
  "username": "Michael Paul",
  "email": "michael@example.com",
  "dateOfBirth": "2025-03-15"
}
```

## License

MIT
