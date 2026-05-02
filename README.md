# ECONOMINE

ECONOMINE is an interactive digital platform designed to guide individuals who have capital but lack business ideas or knowledge of how to start a business. It matches users with tailored business models, provides automated financial feasibility studies, and offers step-by-step interactive roadmaps for launching their ventures.

## Tech Stack

- **Frontend**: React, Tailwind CSS, React Router, Lucide React, Recharts
- **Backend**: Express.js (Serverless-ready)
- **Database**: SQLite (via `better-sqlite3`)
- **AI Integration**: Google Gemini API (`gemini-3-flash-preview`)

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the root directory (or use the provided `.env.example`) and add your Gemini API Key:

```env
GEMINI_API_KEY="your_gemini_api_key_here"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

Start the full-stack development server (Express + Vite):

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Core Features

1. **User Authentication & Onboarding**: Secure Login/Signup flow and a multi-step onboarding questionnaire gathering available capital, risk tolerance, and preferred industries.
2. **Smart Dashboard**: A personalized central hub greeting the user and displaying their generated business ideas and overall progress.
3. **AI Business Matchmaker**: Queries the Gemini API to return 3 tailored business ideas including a brief description, mini-SWOT analysis, and market potential.
4. **Financial Projection Module**: A dynamic UI component displaying a preliminary feasibility study (startup costs, operating costs, break-even point, and projected ROI).
5. **Interactive Roadmap UI**: A progress-tracking checklist outlining the legal and administrative steps to launch the selected business.
6. **Tiered Subscription UI**: A pricing page displaying 'Basic', 'Pro', and 'Enterprise' tiers.
