# Wallpaper Discover Bot 🖼️
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/bGxhLT?referralCode=XK46yN)

Discover stunning wallpapers directly on Telegram with the Wallpaper Discover Bot. Powered by WallHaven, this bot provides high-quality backgrounds to refresh your device's look. Simply interact with the bot, pick a theme (e.g., "nature", "urban", "minimalist"), and receive a curated selection in seconds.

## Features:
- Direct access to Unsplash's vast library.
- High-resolution wallpapers.
- User-friendly interaction.
- Regular updates with new wallpapers.

## Getting Started

### Prerequisites

Ensure you have Node.js installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/diegormirhan/wallpaper-discover-bot.git
   ```

2. Navigate to the project directory:
   ```bash
   cd wallpaper-discover-bot
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add the following environment variables:
   ```
   WALLHAVEN_TOKEN=YOUR_UNSPLASH_ACCESS_KEY
   TELEGRAM_API=YOUR_TELEGRAM_API_KEY
   DATABASE_URL=YOUR_DATABASE_URL
   ADMIN_ID=YOUR_ADMIN_ID
   ADMIN_PASSWORD=YOUR_ADMIN_PASSWORD
   ```

5. Start the bot:
   ```bash
   npm run dev
   ```

## Scripts

- **start**: Runs the bot.
- **api-test**: Executes API tests.
- **bot-test**: Executes bot-related tests.
- **dev**: Runs the bot in development mode with nodemon.

## Dependencies

- axios: Making HTTP requests.
- dotenv: Loading environment variables.
- mongodb: MongoDB driver for Node.js.
- node-telegram-bot-api: Telegram Bot API for Node.js.

## Dev Dependencies

- jest: Testing framework.
- nodemon: Monitor for changes in source and automatically restart your server.

## License

This project is licensed under the MIT License.

---
