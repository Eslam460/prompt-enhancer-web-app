# 🚀 Prompt Enhancer

A modern, interactive web application that helps you optimize AI prompts for programming, design, and research using AI-powered enhancement through OpenRouter API.

![Prompt Enhancer](https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=400&fit=crop)

## ✨ Features

- **🔑 Dynamic API Key Management**: 
  - Set your own OpenRouter API key through intuitive UI
  - No need to edit .env files
  - Secure local storage (browser-based)
  - Automatic fallback to environment variables

- **🤖 Advanced Model Selection**:
  - Browse all available OpenRouter models in real-time
  - Filter by Free/Paid models with separate tabs
  - View model details (context length, pricing, description)
  - Real-time model switching without page reload
  - Visual indicators for free models

- **🎯 Multi-Category Support**: Optimize prompts for different use cases:
  - **Programming**: Code generation, debugging, optimization with SOLID principles
  - **Design**: UI/UX, accessibility standards (WCAG), responsive design
  - **Research**: Academic research, citation standards, credible sources
  - **General**: Clear objectives, structured outputs, quality requirements

- **🎨 Modern UI/UX**: 
  - Glassmorphism design with backdrop blur effects
  - Responsive layout for all screen sizes
  - Dark/Light mode toggle
  - Smooth animations with Framer Motion
  - Improved navbar (non-overlapping content)

- **💾 Prompt History**: 
  - Stores last 10 enhanced prompts locally
  - Quick copy and delete actions
  - Automatic timestamp tracking
  - Category labels

- **📋 Export Options**:
  - Copy enhanced prompts to clipboard
  - Download as text files
  - One-click sharing

- **⚡ Real-time Enhancement**: 
  - Powered by OpenRouter API with multiple models
  - Fast response times
  - Detailed explanations for improvements
  - Enhanced system prompts for better results

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Components**: Shadcn/UI + Radix UI
- **Animations**: Framer Motion
- **State Management**: React Context API
- **Local Storage**: Browser localStorage for settings persistence
- **API**: OpenRouter AI (dynamic model support)
- **Type Safety**: TypeScript 5
- **Icons**: Lucide React
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

3. **Set up API key** (Two options):
   
   **Option A - Through UI (Recommended):**
   1. Run the development server (see step 4)
   2. Click the Settings icon (⚙️) in the navbar
   3. Enter your OpenRouter API key
   4. Select your preferred AI model (Free or Paid)
   
   **Option B - Environment Variable (Optional):**
   
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
   > 5. Enter it through the Settings UI or paste in `.env.local`

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

1. **Configure Settings** (First time):
   - Click the Settings icon (⚙️) in the top-right navbar
   - Enter your OpenRouter API key
   - Browse and select your preferred AI model (Free or Paid tabs)
   - Settings are automatically saved to your browser

2. **Select a Category**: Choose from Programming, Design, Research, or General

3. **Enter Your Prompt**: Type or paste your prompt in the input area
   - See your current model displayed above the input area
   - Character count displayed in real-time

4. **Enhance**: Click the "Enhance Prompt" button
   - Watch the loading animation while AI processes your prompt
   - Results use your selected model and enhanced system prompts

5. **Review Results**: 
   - See the enhanced prompt with detailed explanation
   - Understand what improvements were made and why

6. **Export**: 
   - Copy to clipboard with one click
   - Download as a text file for later use
   - Add to history for quick access

7. **History**: 
   - View your last 10 enhanced prompts in the sidebar
   - Quick copy, view details, or delete entries
   - Filter by category and timestamp

## 🏗️ Project Structure

```
prompt-enhancer/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── enhance/
│   │   │   │   └── route.ts        # Enhanced prompt API (dynamic model support)
│   │   │   └── models/
│   │   │       └── route.ts        # NEW: Fetches available OpenRouter models
│   │   ├── globals.css             # Global styles & theme
│   │   ├── layout.tsx              # Root layout with SettingsProvider
│   │   └── page.tsx                # Main page with improved padding
│   ├── components/
│   │   ├── ui/                     # Shadcn/UI components (Button, Dialog, etc.)
│   │   ├── HeroSection.tsx         # Landing hero section
│   │   ├── Navbar.tsx              # Navigation bar with Settings button
│   │   ├── Sidebar.tsx             # Category sidebar
│   │   ├── PromptInput.tsx         # Prompt input with model indicator
│   │   ├── ResultsCard.tsx         # Enhanced results display
│   │   ├── HistoryPanel.tsx        # History sidebar
│   │   ├── ThemeProvider.tsx       # Dark/Light mode provider
│   │   ├── SettingsDialog.tsx      # NEW: API key & model configuration UI
│   │   └── ModelSelector.tsx       # NEW: Model selection with Free/Paid tabs
│   ├── contexts/
│   │   └── SettingsContext.tsx     # NEW: Global settings state management
│   ├── hooks/
│   │   └── useSettings.ts          # NEW: Custom hook for settings access
│   ├── lib/
│   │   ├── api.ts                  # API helper functions (enhanced)
│   │   ├── system-prompts.ts       # NEW: Enhanced system prompts library
│   │   └── utils.ts                # Utility functions
│   └── types/
│       └── models.ts               # NEW: TypeScript type definitions
├── .env.local.example              # Environment variables template
├── package.json
└── README.md
```

### New Files & Enhancements:

**New Files (7):**
- `src/app/api/models/route.ts` - Fetches OpenRouter models
- `src/contexts/SettingsContext.tsx` - Settings state management
- `src/components/SettingsDialog.tsx` - Settings UI
- `src/components/ModelSelector.tsx` - Model selection component
- `src/lib/system-prompts.ts` - Improved system prompts
- `src/types/models.ts` - Type definitions
- `src/hooks/useSettings.ts` - Settings hook

**Enhanced Files (6):**
- `src/app/api/enhance/route.ts` - Now supports dynamic models
- `src/components/Navbar.tsx` - Added Settings button
- `src/app/page.tsx` - Fixed padding issue
- `src/app/layout.tsx` - Added SettingsProvider
- `src/components/PromptInput.tsx` - Shows current model
- `src/lib/api.ts` - Supports apiKey and model params

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

### AI Model Selection
**Easy Way (Recommended):**
- Click Settings (⚙️) in navbar
- Browse and select from 100+ available models
- Filter by Free/Paid tabs
- See model details (context length, pricing)

**All models are fetched dynamically from OpenRouter**, including:
- Free models: Llama, Mistral, Gemini Flash, etc.
- Paid models: GPT-4, Claude, Gemini Pro, etc.

Visit [OpenRouter Models](https://openrouter.ai/models) for full list.

### System Prompts
Customize system prompts in `src/lib/system-prompts.ts`:
```typescript
export const SYSTEM_PROMPTS = {
  programming: "Your custom programming prompt...",
  design: "Your custom design prompt...",
  research: "Your custom research prompt...",
  general: "Your custom general prompt...",
};
```

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

## 📝 API Usage & Best Practices

### Free vs Paid Models
- **Free models**: Great for testing and personal use (no cost)
- **Paid models**: Better performance, larger context windows (requires credits)

### Production Considerations
- **Rate Limiting**: Implement rate limiting for production deployments
- **User Authentication**: Add auth to track usage per user
- **API Key Security**: Never commit API keys to version control
- **Caching**: Cache responses for identical prompts to reduce costs
- **Error Handling**: Implement robust error handling for API failures
- **Monitoring**: Track API usage and costs through OpenRouter dashboard

### OpenRouter Credits
- Free models: Always free, no credits needed
- Paid models: Purchase credits at [OpenRouter](https://openrouter.ai/credits)
- Check pricing: Each model has different per-token costs
- Set budget limits in OpenRouter dashboard

## 🔒 Security Notes

- **Never commit** your `.env.local` file or API keys to Git
- **API keys** are stored in browser localStorage (client-side only)
- **Environment variables** are used as fallback for server-side keys
- **Use HTTPS** in production to encrypt data transmission
- **Implement rate limiting** for production deployments
- **Add authentication** for multi-user production systems
- **Validate inputs** to prevent injection attacks
- **Monitor API usage** through OpenRouter dashboard

## 🆕 Recent Updates (Latest Version)

### Major Features Added:
✅ **Dynamic API Key Management** - Configure API keys through UI  
✅ **Model Selection Interface** - Browse and select from 100+ models  
✅ **Free/Paid Model Filtering** - Separate tabs for easy navigation  
✅ **Enhanced System Prompts** - Significantly improved prompt quality  
✅ **Settings Persistence** - Auto-save settings to localStorage  
✅ **Model Indicator** - See current model in prompt input  
✅ **Fixed Navbar Padding** - Content no longer overlaps  
✅ **Improved Documentation** - Comprehensive README updates  

### Technical Improvements:
- New Context API for global settings management
- TypeScript types for OpenRouter models
- Dedicated API endpoint for fetching models
- Enhanced error handling and loading states
- Better UI/UX with visual feedback
- Modular code structure with better separation of concerns

### System Prompt Enhancements:
- **Programming**: Added SOLID principles, security best practices, testing requirements
- **Design**: Added WCAG accessibility, responsive breakpoints, animation guidelines
- **Research**: Added citation standards, source credibility checks, structured formats
- **General**: Added comprehensive quality criteria, evaluation metrics, output specifications

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