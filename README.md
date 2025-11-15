# 🧚 Lease Fairy

> Empowering renters to understand their leases and protect their rights through AI-powered lease analysis.

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)



## 📖 About Lease Fairy

Lease Fairy is an AI-powered platform that translates complex lease agreements into simple, actionable information for renters. We protect tenants from exploitation and empower them to understand and assert their rights.

### 🎯 Core Problem

Renters sign complex housing leases without fully understanding the terms, leaving them vulnerable to:
- Hidden fees
- Unfair clauses
- Lost security deposits
- Undermined rights and peace of mind

### 💡 Our Solution

An intelligent platform that makes lease comprehension accessible to everyone through AI-powered analysis, plain-language explanations, and proactive guidance.

---

## ✨ Features

### MVP Features (Implemented)

#### 🔍 **1. AI Lease Overview**
- Upload PDF/document leases
- Automated text extraction and analysis
- Simplified summaries of key contract terms
- Visual presentation of lease structure
- Identification of:
  - Agreement type and duration
  - Payment schedules and amounts
  - Hidden fees
  - Tenant vs. Landlord responsibilities
  - Critical dates

#### 🚩 **2. Contract Red Flags**
- Clause-by-clause risk assessment
- Legal compliance checking
- Visual highlighting of concerning language
- Severity rating system
- Detailed explanations of each concern
- Negotiation suggestions

#### 📚 **3. Legal Jargon Translator**
- Interactive term highlighting
- Pop-up definitions in plain language
- Contextual explanations
- Multilingual support

#### ❓ **4. Standard "What If" Moments**
- Pre-built scenario library (early termination, repairs, etc.)
- Contract-specific answers based on actual lease terms
- Visual decision trees for complex situations
- Clear explanation of rights and responsibilities

#### 💬 **5. Ask Lease Fairy Chatbot**
- Natural language processing
- Lease-specific knowledge base
- Conversation history
- Follow-up question suggestions
- Reduces need for external legal consultations

### 🚀 Post-MVP Features (Roadmap)

- **Key Date Notifications** - Alert system for critical lease dates
- **Local Tenant Rights Guide** - Location-specific tenant protections
- **Document Storage & Organization** - Secure cloud storage for housing documents

---

## 🛠️ Tech Stack

This project is built with modern web technologies:

- **Framework:** [Vite](https://vitejs.dev/) - Lightning-fast build tool
- **Language:** [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **UI Library:** [React 18](https://react.dev/) - Component-based UI
- **Component Library:** [shadcn/ui](https://ui.shadcn.com/) - Beautiful, accessible components
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- **Backend:** [Supabase](https://supabase.com/) - PostgreSQL database & authentication
- **AI/ML:** Natural Language Processing for lease analysis
- **Document Processing:** OCR and PDF parsing capabilities

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js) or [bun](https://bun.sh/)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up environment variables**
   
   Copy the `.env` file and configure your environment variables:
   ```bash
   cp .env .env.local
   ```
   
   Required environment variables:
   - Supabase credentials
   - API keys for AI services
   - Other service credentials

4. **Start the development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` to see the application running.

---

## 📂 Project Structure

```
lease-fairy/
├── src/
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── types/          # TypeScript type definitions
│   └── main.tsx        # Application entry point
├── supabase/           # Supabase configuration
├── public/             # Static assets
├── .env                # Environment variables
└── package.json        # Dependencies and scripts
```

---

## 🎨 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

This project uses:
- ESLint for code linting
- TypeScript for type safety
- Prettier (recommended) for code formatting

---

## 🌐 Deployment

### Deploy with Lovable

1. Open your project in [Lovable](https://lovable.dev)
2. Click on **Share → Publish**
3. Your app will be deployed automatically

### Custom Domain

To connect a custom domain:
1. Navigate to **Project > Settings > Domains**
2. Click **Connect Domain**
3. Follow the setup instructions



## 🔐 Security & Privacy

- **End-to-end encryption** for all lease documents
- **GDPR/CCPA compliance** built-in
- **Data minimization** principles
- **User-controlled data retention**
- No sharing of personal information


## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is built with [Lovable](https://lovable.dev) and follows their terms of service.

---

## 📞 Support

- **Documentation:** Check the docs folder
- **Issues:** Open a GitHub issue
- **Questions:** Contact the development team

---

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev) - AI-powered development platform
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

---

## 🗺️ Roadmap

- [x] MVP Features (Lease Overview, Red Flags, Jargon Translator)
- [x] Chatbot Integration
- [ ] Key Date Notifications
- [ ] Local Tenant Rights Database
- [ ] Document Storage System
- [ ] Mobile Native Apps
- [ ] Multi-language Support Expansion
- [ ] Integration with Property Management Systems

---

<div align="center">

**Made with ❤️ for renters everywhere**


</div>**# 🧚 Lease Fairy

> Empowering renters to understand their leases and protect their rights through AI-powered lease analysis.

![Claude API](https://img.shields.io/badge/Powered%20by-Claude%20API-5A67D8)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)

---

## 🤖 AI-Powered by Claude API

**This application leverages Anthropic's Claude API with Retrieval-Augmented Generation (RAG) architecture for intelligent lease analysis.**

### Key AI Integration:
- **🧠 Claude API Integration**: Powers all AI features including lease analysis, red flag detection, and natural language interactions
- **📑 RAG Architecture**: Combines Claude's language understanding with domain-specific legal knowledge for accurate lease interpretation
- **⚡ Real-time Analysis**: Instant processing of lease documents with context-aware responses
- **💬 Intelligent Chatbot**: Natural conversations about lease terms using Claude's advanced language model
- **🎯 Precision Extraction**: Claude API extracts and interprets complex legal language with high accuracy

The RAG implementation allows Lease Fairy to:
1. Retrieve relevant legal information and tenant rights data
2. Augment Claude's responses with lease-specific context
3. Generate accurate, personalized answers based on actual lease content
4. Maintain conversation context for follow-up questions

---

## 📖 About Lease Fairy

Lease Fairy is an AI-powered platform that translates complex lease agreements into simple, actionable information for renters. We protect tenants from exploitation and empower them to understand and assert their rights.

### 🎯 Core Problem

Renters sign complex housing leases without fully understanding the terms, leaving them vulnerable to:
- Hidden fees
- Unfair clauses
- Lost security deposits
- Undermined rights and peace of mind

### 💡 Our Solution

An intelligent platform that makes lease comprehension accessible to everyone through AI-powered analysis, plain-language explanations, and proactive guidance.

---

## ✨ Features

### MVP Features (Implemented)

#### 🔍 **1. AI Lease Overview**
- Upload PDF/document leases
- Automated text extraction and analysis
- Simplified summaries of key contract terms
- Visual presentation of lease structure
- Identification of:
  - Agreement type and duration
  - Payment schedules and amounts
  - Hidden fees
  - Tenant vs. Landlord responsibilities
  - Critical dates

#### 🚩 **2. Contract Red Flags**
- Clause-by-clause risk assessment
- Legal compliance checking
- Visual highlighting of concerning language
- Severity rating system
- Detailed explanations of each concern
- Negotiation suggestions

#### 📚 **3. Legal Jargon Translator**
- Interactive term highlighting
- Pop-up definitions in plain language
- Contextual explanations
- Multilingual support

#### ❓ **4. Standard "What If" Moments**
- Pre-built scenario library (early termination, repairs, etc.)
- Contract-specific answers based on actual lease terms
- Visual decision trees for complex situations
- Clear explanation of rights and responsibilities

#### 💬 **5. Ask Lease Fairy Chatbot**
- Natural language processing
- Lease-specific knowledge base
- Conversation history
- Follow-up question suggestions
- Reduces need for external legal consultations

### 🚀 Post-MVP Features (Roadmap)

- **Key Date Notifications** - Alert system for critical lease dates
- **Local Tenant Rights Guide** - Location-specific tenant protections
- **Document Storage & Organization** - Secure cloud storage for housing documents

---

## 🛠️ Tech Stack

This project is built with modern web technologies and cutting-edge AI:

### 🤖 AI & Machine Learning
- **[Claude API](https://www.anthropic.com/api) (Anthropic)** - Advanced language model for lease analysis
- **RAG (Retrieval-Augmented Generation)** - Custom implementation for context-aware responses
- **Natural Language Processing** - For understanding legal terminology and user queries
- **Document Processing** - OCR and PDF parsing capabilities

### 💻 Frontend & UI
- **Framework:** [Vite](https://vitejs.dev/) - Lightning-fast build tool
- **Language:** [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **UI Library:** [React 18](https://react.dev/) - Component-based UI
- **Component Library:** [shadcn/ui](https://ui.shadcn.com/) - Beautiful, accessible components
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS

### 🗄️ Backend & Data
- **Backend:** [Supabase](https://supabase.com/) - PostgreSQL database & authentication
- **Vector Storage** - For RAG implementation and semantic search
- **API Integration** - Claude API endpoints for AI processing

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js) or [bun](https://bun.sh/)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up environment variables**
   
   Copy the `.env` file and configure your environment variables:
   ```bash
   cp .env .env.local
   ```
   
   Required environment variables:
   ```env
   # Claude API Configuration (REQUIRED)
   VITE_ANTHROPIC_API_KEY=your_claude_api_key_here
   
   # Supabase Configuration
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Other service credentials
   ```
   
   **Important:** Get your Claude API key from [Anthropic Console](https://console.anthropic.com/)

4. **Start the development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` to see the application running.

---

## 📂 Project Structure

```
lease-fairy/
├── src/
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── types/          # TypeScript type definitions
│   └── main.tsx        # Application entry point
├── supabase/           # Supabase configuration
├── public/             # Static assets
├── .env                # Environment variables
└── package.json        # Dependencies and scripts
```

---

## 🏗️ RAG Architecture

### How Lease Fairy Uses RAG with Claude API

Our Retrieval-Augmented Generation implementation combines the power of Claude's language model with domain-specific legal knowledge:

```
┌─────────────────┐
│  Lease Upload   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Text Extract   │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Vector Embedding & Storage     │
│  (Lease-specific knowledge base) │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│      User Query/Question         │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Semantic Search & Retrieval     │
│  (Find relevant lease sections)  │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│     Claude API Processing        │
│  (Context + User Query)          │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│   Intelligent Response           │
│   (Lease-specific answer)        │
└──────────────────────────────────┘
```

### RAG Components:

1. **Document Ingestion**: Lease PDFs are processed and chunked into semantic sections
2. **Vector Embeddings**: Text chunks are converted to embeddings for similarity search
3. **Retrieval**: User queries retrieve relevant lease sections from vector storage
4. **Augmentation**: Retrieved context is combined with the user's question
5. **Generation**: Claude API generates accurate, context-aware responses

This approach ensures:
- ✅ Responses based on actual lease content
- ✅ High accuracy in legal interpretation
- ✅ Context-aware follow-up conversations
- ✅ Reduced hallucination risks
- ✅ Personalized tenant guidance

---

## 🎨 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

This project uses:
- ESLint for code linting
- TypeScript for type safety
- Prettier (recommended) for code formatting

---

## 🌐 Deployment

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory, ready to be deployed to any static hosting service.

### Deployment Options

- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Drag and drop the `dist/` folder or connect via Git
- **AWS S3 + CloudFront**: For enterprise-grade hosting
- **Any static hosting service**: The built files are standard HTML/CSS/JS

### Custom Domain

Configure your DNS settings to point to your hosting provider. Most services provide easy domain connection through their dashboards.

---

## 🔐 Security & Privacy

- **End-to-end encryption** for all lease documents
- **GDPR/CCPA compliance** built-in
- **Data minimization** principles
- **User-controlled data retention**
- No sharing of personal information

---

## 📋 Feature Tracking

### Success Metrics

**AI Lease Overview:**
- ✅ Extraction accuracy >95%
- 📊 User comprehension improvement tracking
- ⏱️ Time saved vs. manual review

**Contract Red Flags:**
- 🎯 Problematic clause identification rate
- 📈 User actions based on flags
- 📉 Reduction in disputes

**Legal Jargon Translator:**
- 📚 >90% legal term coverage
- 👆 User engagement with definitions
- 🧠 Reduced terminology confusion

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the MIT License.

---

## 📞 Support

- **Documentation:** Check the docs folder
- **Issues:** Open a GitHub issue
- **Questions:** Contact the development team

---

## 🙏 Acknowledgments

- **Powered by [Anthropic Claude API](https://www.anthropic.com/api)** - Advanced AI language model
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

**Special thanks to Anthropic for providing Claude API access for this tenant rights project.**

---

## 🗺️ Roadmap

- [x] MVP Features (Lease Overview, Red Flags, Jargon Translator)
- [x] Chatbot Integration
- [ ] Key Date Notifications
- [ ] Local Tenant Rights Database
- [ ] Document Storage System
- [ ] Mobile Native Apps
- [ ] Multi-language Support Expansion
- [ ] Integration with Property Management Systems

---

<div align="center">

**Made with ❤️ for renters everywhere**

[Report Bug](https://github.com/YOUR_USERNAME/lease-fairy/issues) • [Request Feature](https://github.com/YOUR_USERNAME/lease-fairy/issues)

</div>
