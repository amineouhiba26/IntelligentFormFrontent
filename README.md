# 💚 Intelligent Form - Frontend

Hey there! Welcome to our smart form application. This is a React-based web app that helps users find the right form for their needs without any hassle.

## 🎯 What Does It Do?

Instead of making users navigate through complex menus to find the right form, our app uses AI to understand what they want in plain language. Just type what you need, and we'll guide you to the perfect form!

**Example:** 
- Type: "I want to donate monthly" → Gets the donation form
- Type: "I need to volunteer on weekends" → Gets the volunteer signup form
- Type: "I have a question" → Gets the contact form

## ✨ Features

### 🤖 Smart Mission Detection
The app analyzes what users write and automatically selects the right form for them. No more confusing navigation!

### 🎨 Beautiful UI/UX
- **Modern Design**: Clean, colorful gradients and smooth animations
- **Easy to Read**: Large, bold text and clear buttons
- **Responsive**: Works great on phones, tablets, and computers
- **Dark Mode**: Easy on the eyes, day or night
- **Floating Animations**: Subtle movements that make the interface feel alive

### 🔒 Security
- **reCAPTCHA Protection**: Keeps bots away and ensures real humans are submitting forms
- **Form Validation**: Makes sure all required information is filled in correctly

### 📋 Dynamic Forms
Each mission type has its own custom form:
- **Donations**: Amount, frequency, payment method
- **Volunteering**: Skills, availability, preferences
- **Contact**: Name, email, message
- **Information Requests**: Specific details needed

### 📊 Admin Features
- **View Submissions**: See all form submissions in one place
- **Edit Fields**: Customize form fields without touching code
- **Statistics**: Track how many forms are submitted

## 🚀 How It Works

1. **Welcome Screen**: User sees a friendly prompt asking what they need
2. **Write Request**: They type their request in plain language
3. **CAPTCHA Check**: Quick verification to prevent spam
4. **Loading Animation**: Beautiful animation while AI processes the request
5. **Custom Form**: The perfect form appears based on their needs
6. **Confirmation**: Success message with all their details

## 🎨 UI/UX Highlights

### Color Scheme
- **Primary**: Emerald, Teal, and Cyan gradients (trustworthy and fresh)
- **Accent**: Rose, Pink, and Red for important elements (warm and inviting)
- **Neutral**: Clean whites and grays with excellent contrast

### Design Elements
- **Rounded Corners**: Soft, friendly feel with rounded edges everywhere
- **Shadows**: Depth and dimension with beautiful shadows
- **Blur Effects**: Modern glassmorphism with backdrop blur
- **Gradients**: Eye-catching color transitions
- **Animations**: Smooth hover effects and floating elements

### User Experience
- **Clear CTAs**: Big, obvious "Continue" buttons
- **Visual Feedback**: Hover effects show what's clickable
- **Error Handling**: Friendly error messages in simple language
- **Loading States**: Users always know what's happening
- **Back Button**: Easy to start over if needed
- **Progress Indication**: Clear steps from start to finish

## 🛠️ Tech Stack

- **React** - The main framework for building the UI
- **Vite** - Super fast build tool and dev server
- **Tailwind CSS** - For beautiful, responsive styling
- **React Hook Form** - Easy and efficient form management
- **Radix UI** - Accessible, high-quality UI components
- **Lucide Icons** - Clean, modern icon set
- **Google reCAPTCHA** - Spam and bot protection
- **Framer Motion** - Smooth animations

## 📦 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/amineouhiba26/IntelligentFormFrontent.git
cd IntelligentFormFrontent
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory:
```env
VITE_API_URL=https://your-backend-url.com/api
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
```

To get your reCAPTCHA keys:
1. Go to [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Register a new site with reCAPTCHA v2
3. Add your domain (use `localhost` for development)
4. Copy the Site Key to your `.env` file

### 4. Run the Development Server
```bash
npm run dev
```

Open your browser to `http://localhost:5173` and you're ready to go!

### 5. Build for Production
```bash
npm run build
```

## 🌐 Deployment

This app is deployed on Vercel. Every push to the main branch automatically triggers a new deployment!

## 📱 Responsive Design

The interface adapts beautifully to all screen sizes:
- **Mobile (< 768px)**: Single column layout, large touch-friendly buttons
- **Tablet (768px - 1024px)**: Optimized spacing and layout
- **Desktop (> 1024px)**: Full experience with decorative elements

## 🎯 User Journey

Here's what happens when someone uses the app:

```
🏠 Landing Page
    ↓
✍️ Type Your Request in Plain Language
    ↓
🤖 Complete CAPTCHA Verification
    ↓
⚡ AI Analyzes Your Request
    ↓
📋 Perfect Custom Form Appears
    ↓
📝 Fill Out the Form
    ↓
✅ Submit
    ↓
�� Beautiful Confirmation Page
```

## 💡 Why This Approach?

Traditional forms can be frustrating. Users often:
- Don't know which form to choose
- Fill out the wrong form
- Give up because navigation is too complicated

Our solution:
- ✅ Just ask users what they need in their own words
- ✅ AI figures out the right form
- ✅ Everyone gets exactly what they need
- ✅ Less confusion = More completed forms = Happy users! 😊

## 🎨 Design Philosophy

We built this with three principles in mind:

1. **Simplicity First**: If a user has to think too hard, we've failed
2. **Beautiful by Default**: Good design builds trust
3. **Accessible to All**: Everyone should be able to use this, regardless of ability

## 📂 Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components (buttons, inputs, etc.)
│   ├── dynamic-form.jsx # Smart form that adapts to each mission
│   ├── prompt-input.jsx # Initial landing page with AI prompt
│   ├── loading-page.jsx # Beautiful loading animation
│   ├── confirmation-page.jsx # Success confirmation
│   └── submissions-page.jsx  # Admin view for all submissions
├── lib/                 # Utilities and helpers
│   ├── api.js          # Backend API calls
│   ├── detect-mission.js # AI mission detection logic
│   └── missions-schema.json # Form field configurations
└── App.jsx             # Main app component
```

## 🔧 Customization

### Adding a New Form Type

1. Edit `src/lib/missions-schema.json`
2. Add your new mission with title, description, and fields
3. Update the mission detection logic in `src/lib/detect-mission.js`
4. That's it! The form will automatically appear

### Changing Colors

All colors are defined in `tailwind.config.js`. Just modify the theme and the entire app updates!

## 🤝 Contributing

We welcome contributions! Here's how:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit (`git commit -m 'Add some amazing feature'`)
5. Push (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 🐛 Found a Bug?

Please open an issue with:
- What you expected to happen
- What actually happened
- Steps to reproduce
- Screenshots if possible

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with love for the Nuit de l'Info 2025
- Icons by [Lucide](https://lucide.dev)
- UI components from [Radix UI](https://www.radix-ui.com)
- Styled with [Tailwind CSS](https://tailwindcss.com)

---

Made with 💚 by [Amine Ouhiba](https://github.com/amineouhiba26)

**Live Demo**: [https://intelligent-form-frontent-zdve.vercel.app](https://intelligent-form-frontent-zdve.vercel.app)
