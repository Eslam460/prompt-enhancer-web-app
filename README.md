# 🚀 Prompt Enhancer

A modern, interactive web application that helps you optimize AI prompts for programming, design, and research using AI-powered enhancement through OpenRouter API.

![Prompt Enhancer](https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=400&fit=crop)

## ✨ Features

- **🎯 Multi-Category Support**: Optimize prompts for different use cases:
  - Programming (code generation, debugging, optimization)
  - Design (UI/UX, image generation)
  - Research (knowledge retrieval, structured responses)
  - General queries

- **🎨 Modern UI/UX**: 
  - Glassmorphism design with backdrop blur effects
  - Responsive layout for all screen sizes
  - Dark/Light mode toggle
  - Smooth animations with Framer Motion

- **💾 Prompt History**: 
  - Stores last 10 enhanced prompts locally
  - Quick copy and delete actions
  - Automatic timestamp tracking

- **📋 Export Options**:
  - Copy enhanced prompts to clipboard
  - Download as text files
  - One-click sharing

- **⚡ Real-time Enhancement**: 
  - Powered by OpenRouter API
  - Fast response times
  - Detailed explanations for improvements

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Components**: Shadcn/UI
- **Animations**: Framer Motion
- **API**: OpenRouter AI
- **Type Safety**: TypeScript
- **Font**: Inter (Google Fonts)

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd prompt-enhancer
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Set up environment variables**:
   
   Create a `.env.local` file in the root directory:
   ```bash
   cp .env.local.example .env.local
   ```

   Then edit `.env.local` and add your OpenRouter API key:
   ```env
   OPENROUTER_API_KEY=your_api_key_here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

   > **Getting your OpenRouter API key:**
   > 1. Visit [https://openrouter.ai](https://openrouter.ai)
   > 2. Sign up or log in to your account
   > 3. Navigate to [API Keys](https://openrouter.ai/keys)
   > 4. Create a new API key and copy it
   > 5. Paste it in your `.env.local` file

4. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

1. **Select a Category**: Choose from Programming, Design, Research, or General
2. **Enter Your Prompt**: Type or paste your prompt in the input area
3. **Enhance**: Click the "Enhance Prompt" button
4. **Review Results**: See the enhanced prompt with explanation
5. **Export**: Copy to clipboard or download as a text file
6. **History**: View your last 10 enhanced prompts in the sidebar

## 🏗️ Project Structure

```
prompt-enhancer/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── enhance/
│   │   │       └── route.ts        # OpenRouter API integration
│   │   ├── globals.css             # Global styles & theme
│   │   ├── layout.tsx              # Root layout
│   │   └── page.tsx                # Main page
│   ├── components/
│   │   ├── ui/                     # Shadcn/UI components
│   │   ├── HeroSection.tsx         # Landing hero section
│   │   ├── Navbar.tsx              # Navigation bar
│   │   ├── Sidebar.tsx             # Category sidebar
│   │   ├── PromptInput.tsx         # Prompt input form
│   │   ├── ResultsCard.tsx         # Enhanced results display
│   │   ├── HistoryPanel.tsx        # History sidebar
│   │   └── ThemeProvider.tsx       # Dark/Light mode provider
│   └── lib/
│       ├── api.ts                  # API helper functions
│       └── utils.ts                # Utility functions
├── .env.local.example              # Environment variables template
├── package.json
└── README.md
```

## 🎨 Customization

### Theme Colors
Edit `src/app/globals.css` to customize the color scheme:
```css
:root {
  --primary: oklch(0.205 0 0);
  --secondary: oklch(0.97 0 0);
  /* ... more colors */
}
```

### AI Model
Change the AI model in `src/app/api/enhance/route.ts`:
```typescript
model: "meta-llama/llama-3.1-8b-instruct:free", // Change this
```

Available models on OpenRouter:
- `meta-llama/llama-3.1-8b-instruct:free` (Current)
- `anthropic/claude-3-haiku`
- `openai/gpt-3.5-turbo`
- And many more at [OpenRouter Models](https://openrouter.ai/models)

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- Digital Ocean App Platform

**Important**: Don't forget to set your environment variables on the deployment platform!

## 📝 API Usage

The app uses OpenRouter's free tier by default. For production use, consider:
- Upgrading to a paid plan for better rate limits
- Implementing rate limiting
- Adding user authentication
- Caching responses

## 🔒 Security Notes

- Never commit your `.env.local` file
- Keep your API keys secure
- Use environment variables for all sensitive data
- Implement rate limiting for production
- Consider adding authentication for user-specific features

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [OpenRouter](https://openrouter.ai) - AI API platform
- [Shadcn/UI](https://ui.shadcn.com) - UI components
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Next.js](https://nextjs.org) - React framework
- [Tailwind CSS](https://tailwindcss.com) - CSS framework

## 📧 Support

For support, please open an issue in the GitHub repository or contact the maintainers.

---

**Built with ❤️ using Next.js, TypeScript, and AI**