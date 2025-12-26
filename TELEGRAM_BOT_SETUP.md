# 🚀 Telegram Bot Setup Guide for Muvr Mini App

This guide will help you create and configure a Telegram Bot for your Muvr fitness Mini App.

## 📋 Prerequisites

- Telegram account
- Domain with HTTPS (for webhook)
- Node.js server (for webhook handling)

## 🔧 Step 1: Create Telegram Bot

### 1.1 Contact @BotFather

1. Open Telegram and search for `@BotFather`
2. Start a chat with BotFather
3. Send `/newbot` command

### 1.2 Configure Bot

```
BotFather: Alright, a new bot. How are we going to call it? Please choose a name for your bot.
You: Muvr Fitness Bot

BotFather: Good. Now let's choose a username for your bot. It must end in `bot`. Like this: TetrisBot or tetris_bot.
You: muvr_fitness_bot

BotFather: Done! Congratulations on your new bot. You will find it at t.me/muvr_fitness_bot. You can now add a description, about section and profile picture for your bot, see /help for a list of commands. By the way, when you've finished creating your cool bot, ping our Bot Support if you want a better username for it. Just make sure the bot is fully operational before you do this.

Use this token to access the HTTP API:
1234567890:ABCdefGHIjklMNOpqrsTUVwxyz

Keep your token secure and store it safely, it can be used by anyone to control your bot.
```

### 1.3 Save Your Bot Token

Save the token you received. You'll need it for the next steps.

## 🔧 Step 2: Configure Bot Commands

### 2.1 Set Bot Commands

Send this to @BotFather:

```
/setcommands

Choose a bot to change the list of commands.
Select: @muvr_fitness_bot

Enter a list of bot commands. The following format is accepted:

command1 - Description
command2 - Another description

start - Start the Muvr fitness app
activities - Browse fitness activities
create - Create a new fitness activity
profile - View your fitness profile
help - Get help with Muvr
```

### 2.2 Set Bot Description

Send this to @BotFather:

```
/setdescription

Choose a bot to change the description.
Select: @muvr_fitness_bot

Enter the new description for your bot:
Connect with fitness enthusiasts and join activities in your area. Browse, create, and join fitness activities with like-minded people.
```

### 2.3 Set Bot About

Send this to @BotFather:

```
/setabouttext

Choose a bot to change the about section.
Select: @muvr_fitness_bot

Enter the new about section for your bot:
🏃‍♂️ Muvr - Social Fitness Platform

Connect with fitness enthusiasts in your area and join exciting activities!

🎯 Features:
• Browse fitness activities
• Join group workouts
• Create your own activities
• Connect with like-minded people

Start your fitness journey today!
```

## 🔧 Step 3: Create Mini App

### 3.1 Create Mini App with @BotFather

Send this to @BotFather:

```
/newapp

Choose a bot to create a Web App for.
Select: @muvr_fitness_bot

Enter the title of your Web App:
Muvr - Social Fitness

Enter the short description of your Web App:
Connect with fitness enthusiasts and join activities in your area

Enter the description of your Web App:
🏃‍♂️ Muvr is a social fitness platform that helps you connect with fitness enthusiasts in your area. Browse, join, and create fitness activities with like-minded people.

🎯 What you can do:
• Browse fitness activities by sport type
• Join group workouts and activities
• Create your own fitness events
• Connect with fitness enthusiasts
• Track your fitness journey

Perfect for finding workout partners, joining sports groups, and staying motivated with your fitness goals!

Enter the URL of your Web App:
https://your-domain.com

Enter the URL of the photo for your Web App:
https://your-domain.com/images/muvr_logo.png
```

### 3.2 Configure Mini App Settings

After creating the Mini App, you can configure additional settings:

```
/setapptitle

Choose a bot to change the Web App title.
Select: @muvr_fitness_bot

Enter the new title for your Web App:
Muvr - Social Fitness
```

```
/setappshortname

Choose a bot to change the Web App short name.
Select: @muvr_fitness_bot

Enter the new short name for your Web App:
Muvr
```

```
/setappdescription

Choose a bot to change the Web App description.
Select: @muvr_fitness_bot

Enter the new description for your Web App:
Connect with fitness enthusiasts and join activities in your area. Browse, join, and create fitness activities with like-minded people.
```

## 🔧 Step 4: Configure Environment Variables

### 4.1 Create .env file

Create a `.env` file in your project root:

```env
# Telegram Bot Configuration
REACT_APP_TELEGRAM_BOT_TOKEN=your_bot_token_here
REACT_APP_MINI_APP_URL=https://your-domain.com
REACT_APP_WEBHOOK_URL=https://your-domain.com/webhook
REACT_APP_WEBHOOK_SECRET=your_webhook_secret_here

# Firebase Configuration (existing)
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
```

### 4.2 Update src/config/telegram-bot.ts

Replace the placeholder values in `src/config/telegram-bot.ts`:

```typescript
export const TELEGRAM_BOT_CONFIG = {
  BOT_TOKEN: process.env.REACT_APP_TELEGRAM_BOT_TOKEN || 'your_actual_bot_token',
  BOT_USERNAME: 'muvr_fitness_bot', // Your actual bot username
  MINI_APP_URL: process.env.REACT_APP_MINI_APP_URL || 'https://your-actual-domain.com',
  // ... rest of the config
};
```

## 🔧 Step 5: Deploy Your App

### 5.1 Build and Deploy

```bash
# Build your app
npm run build

# Deploy to your hosting service (Vercel, Netlify, etc.)
# Make sure your domain has HTTPS
```

### 5.2 Set Webhook (Optional)

If you want to handle bot interactions server-side, set up a webhook:

```bash
# Set webhook URL
curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-domain.com/webhook",
    "secret_token": "your_webhook_secret"
  }'
```

## 🔧 Step 6: Test Your Mini App

### 6.1 Test in Telegram

1. Open your bot: `t.me/muvr_fitness_bot`
2. Send `/start`
3. Click the "Open Muvr" button
4. Your Mini App should launch

### 6.2 Test Features

- ✅ App launches correctly
- ✅ Theme adapts to Telegram
- ✅ Navigation works
- ✅ Authentication works
- ✅ Activities load
- ✅ All features function properly

## 🔧 Step 7: Bot Commands Implementation

### 7.1 Basic Commands

Your bot will respond to these commands:

- `/start` - Welcome message with app button
- `/activities` - Show activity categories
- `/create` - Guide to create activity
- `/profile` - Link to user profile
- `/help` - Help information

### 7.2 Customize Messages

Update the messages in `src/config/telegram-bot.ts` to match your app's branding and features.

## 🔧 Step 8: Advanced Configuration

### 8.1 Add Bot to Groups

Users can add your bot to groups to share activities:

```
/addgroup

Choose a bot to add to groups.
Select: @muvr_fitness_bot
```

### 8.2 Configure Privacy Mode

```
/setprivacy

Choose a bot to change group privacy settings.
Select: @muvr_fitness_bot

Choose a new group privacy setting:
Disable
```

### 8.3 Set Bot Commands Menu

```
/setmenubutton

Choose a bot to change the menu button.
Select: @muvr_fitness_bot

Enter the text for the menu button:
🏃‍♂️ Open Muvr
```

## 🎯 Expected Result

After following this guide, you should have:

1. ✅ A working Telegram Bot (`@muvr_fitness_bot`)
2. ✅ A Mini App that launches from the bot
3. ✅ Proper bot commands and responses
4. ✅ Integration with your Muvr app
5. ✅ Professional bot appearance and functionality

## 🚀 Launch Experience

When users interact with your bot, they'll see:

1. **Welcome Message**: Professional introduction to Muvr
2. **App Button**: "🏃‍♂️ Open Muvr" button
3. **Mini App Launch**: Your app opens in Telegram
4. **Seamless Experience**: Full app functionality within Telegram

## 📱 Mini App Features

Your Mini App will have:

- ✅ **Telegram Theme Integration**: Adapts to user's theme
- ✅ **Native Telegram UI**: Uses Telegram's UI components
- ✅ **Haptic Feedback**: Provides tactile feedback
- ✅ **Smooth Navigation**: Back button and navigation
- ✅ **Data Sharing**: Can send data back to bot
- ✅ **Professional UX**: Polished user experience

## 🔍 Troubleshooting

### Common Issues:

1. **Bot not responding**: Check bot token and webhook
2. **Mini App not loading**: Verify HTTPS and domain
3. **Theme not working**: Check Telegram Web App initialization
4. **Authentication issues**: Ensure Firebase config is correct

### Support:

- Telegram Bot API: https://core.telegram.org/bots/api
- Mini Apps Documentation: https://core.telegram.org/bots/webapps
- BotFather Commands: https://core.telegram.org/bots#6-botfather

## 🎉 Success!

Your Muvr Mini App is now ready to launch in Telegram! Users can discover, join, and create fitness activities directly within the Telegram ecosystem. 