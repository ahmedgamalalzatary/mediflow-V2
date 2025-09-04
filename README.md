# Mediflow - Healthcare Management Platform

A modern healthcare platform that connects patients with doctors for appointment booking, medical record management, and secure communication.

## 🏥 Overview

Mediflow is an MVP healthcare management system built with modern web technologies, focusing on core appointment management functionality with basic medical record storage and text-based communication between patients and doctors.

## ✨ Features

### 🔐 Authentication & User Management
- **Patient Registration**: Instant signup and access
- **Doctor Registration**: Basic registration with simplified verification
- **Role-based Access Control**: Separate dashboards for patients, doctors, and admins
- **Profile Management**: Comprehensive user profile updates

### 👩‍⚕️ Doctor Discovery & Search
- Search and filter doctors by specialty
- View detailed doctor profiles with qualifications and ratings
- Check doctor availability and consultation rates
- Browse doctor reviews from previous patients

### 📅 Appointment Management
**For Patients:**
- Create appointment requests with specific doctors
- Edit appointment times (subject to doctor approval)
- Cancel booked appointments
- View comprehensive appointment history

**For Doctors:**
- Receive and manage appointment requests
- Accept, decline, or propose changes to appointments
- Update availability schedules
- Manage consultation pricing

### 📋 Medical Records
- Save and view personal medical records (text-based)
- Upload medical documents and images
- Basic organization and management system
- Secure file storage with Supabase

### 💬 Communication System
- Text-only chat between patients and doctors
- Available after appointment confirmation
- Complete message history
- Real-time messaging capabilities

### ⭐ Review & Rating System
- Post-appointment reviews (1-5 stars + comments)
- Public display of doctor ratings
- Review history management

## 🛠️ Tech Stack

### Frontend
- **Next.js 15+** with App Router
- **TypeScript 5** for type safety
- **Tailwind CSS 4** for styling
- **shadcn/ui** component library
- **Redux Toolkit** for state management
- **Framer Motion** for animations

### Backend & Database
- **Supabase** for database (PostgreSQL)
- **Supabase Auth** for authentication
- **Supabase Storage** for file uploads
- **Supabase Edge Functions** for serverless functions

### Development Tools
- **ESLint** for code linting
- **TypeScript** for type checking
- **Turbopack** for fast development builds

## 🏗️ Architecture

Mediflow uses a **feature-based architecture** for optimal scalability and maintainability:

```
src/
├── features/              # Feature-based modules
│   ├── auth/             # Authentication system
│   ├── appointments/     # Appointment management
│   ├── chat/             # Communication system
│   ├── doctor-search/    # Doctor discovery
│   ├── medical-records/  # Records management
│   ├── reviews/          # Rating system
│   └── user-profile/     # Profile management
├── components/           # Shared UI components
├── lib/                  # Utilities and configurations
├── hooks/                # Custom React hooks
├── store/                # Redux store configuration
└── types/                # Global TypeScript definitions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mediflow
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database Setup**
   ```bash
   # Initialize Supabase (if not done)
   npx supabase init
   
   # Run migrations
   npx supabase db reset
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open Application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

### Key Directories

- **`src/app/`** - Next.js App Router pages and layouts
  - `(auth)/` - Authentication pages
  - `(dashboard)/` - Protected user dashboards
  - `(landing)/` - Public marketing pages
  - `api/` - API routes and webhooks

- **`src/features/`** - Feature-based modules
  - Each feature contains: `components/`, `hooks/`, `services/`, `store/`, `types/`

- **`src/components/`** - Shared components
  - `ui/` - shadcn/ui components
  - `shared/` - Application-wide components

- **`src/lib/`** - Utilities and configurations
  - `constants.ts` - Application constants
  - `supabase.ts` - Supabase client configuration
  - `utils.ts` - Utility functions

### Route Structure

```
/                          # Landing page
/signin, /signup           # Authentication
/patient/*                 # Patient dashboard
/doctor/*                  # Doctor dashboard  
/admin/*                   # Admin dashboard
/about, /contact, etc.     # Public pages
```

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Configured with Next.js rules
- **Prettier**: Integrated with ESLint
- **Import Aliases**: Use `@/` for clean imports

### State Management

- **Redux Toolkit** for global state
- **Typed hooks** in `src/hooks/redux.ts`
- **Feature-based slices** for organization

## 🔒 Security

- **Supabase RLS** (Row Level Security) for data protection
- **JWT-based authentication** with automatic token refresh
- **Route protection** via Next.js middleware
- **Role-based access control** throughout the application

## 🧪 Testing

### Testing Strategy
- **Unit Tests**: Component and utility testing
- **Integration Tests**: Feature workflow testing
- **E2E Tests**: Critical user journey testing

### Running Tests
```bash
npm run test          # Run unit tests
npm run test:e2e      # Run E2E tests
npm run test:watch    # Watch mode
```

## 📚 Documentation

- **[Agent Instructions](./docs/instructions.md)** - AI development guidelines
- **[API Documentation](./docs/api.md)** - API endpoints and usage
- **[Database Schema](./docs/database.md)** - Database structure and relationships

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables
3. Deploy automatically on push

### Manual Deployment
```bash
npm run build
npm run start
```

## 🔮 Roadmap

### Current MVP Features ✅
- User authentication and profiles
- Doctor search and discovery
- Appointment booking system
- Basic medical records
- Text-based communication
- Review and rating system

### Future Enhancements 🔄
- Video/audio consultations
- Advanced analytics dashboard
- Payment system integration
- OCR document processing
- Mobile application
- Advanced search filters
- Real-time notifications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the feature-based architecture
- Use TypeScript for all new code
- Add tests for new functionality
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation in `/docs`
- Review the agent instructions for development guidelines

## 🙏 Acknowledgments

- **Next.js** team for the amazing framework
- **Supabase** for the backend infrastructure
- **shadcn/ui** for the beautiful component library
- **Tailwind CSS** for the utility-first styling

---

**Built with ❤️ for better healthcare accessibility**
