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

- **Next.js 15.5.2** with App Router
- **TypeScript 5** for type safety
- **Tailwind CSS 4** for styling
- **shadcn/ui** component library
- **Redux Toolkit 2.9.0** for state management
- **Lucide React** for icons
- **React 19.1.0** with modern features

### Backend & Database

- **Supabase** for database (PostgreSQL)
- **Supabase Auth** for authentication
- **Supabase Storage** for file uploads
- **Supabase Edge Functions** for serverless functions
- **Row Level Security (RLS)** for data protection

### Development Tools

- **ESLint 9** for code linting
- **TypeScript 5** for type checking
- **Turbopack** for fast development builds
- **Supabase CLI 2.39.2** for database management

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
- Git for version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ahmedgamalalzatary/mediflow-V2.git
   cd mediflowV2
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
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database Setup**

   ```bash
   # Initialize Supabase (if not done)
   npx supabase init

   # Link to your Supabase project
   npx supabase link --project-ref your-project-ref

   # Run migrations to set up the database
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
/signin, /signup           # Authentication pages
/patient/[userId]/*        # Patient dashboard with user-specific routes
/doctor/[userId]/*         # Doctor dashboard with user-specific routes
/admin/[userId]/*          # Admin dashboard with user-specific routes
/about, /contact, etc.     # Public marketing pages
```

### Dashboard Routing Pattern

- **Patient Routes**: `/patient/[userId]/appointments`, `/patient/[userId]/doctors`, etc.
- **Doctor Routes**: `/doctor/[userId]/schedule`, `/doctor/[userId]/patients`, etc.
- **Admin Routes**: `/admin/[userId]/analytics`, `/admin/[userId]/users`, etc.

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
- **Route protection** via Next.js middleware with role-based access
- **Role-based access control** throughout the application
- **Secure file storage** with organized Supabase Storage buckets
- **HIPAA-compliant data handling** for medical records

## 🧪 Testing

### Testing Strategy

- **Unit Tests**: Component and utility testing (Coming Soon)
- **Integration Tests**: Feature workflow testing (Coming Soon)
- **E2E Tests**: Critical user journey testing (Coming Soon)

### Running Tests

```bash
# Tests will be implemented in future versions
npm run test          # Run unit tests (Coming Soon)
npm run test:e2e      # Run E2E tests (Coming Soon)
npm run test:watch    # Watch mode (Coming Soon)
```

## 📚 Documentation

- **[AI Development Instructions](./docs/AI-Instructions.md)** - Comprehensive AI development guidelines
- **[Project Specifications](./docs/Idea.md)** - Detailed project requirements and architecture
- **[Database Schema](./supabase/migrations/)** - Database structure and migrations

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
npm run start
```

### Environment Variables Required

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## 🔮 Roadmap

### Current MVP Features ✅

- User authentication and profiles
- Doctor search and discovery
- Appointment booking system
- Basic medical records
- Text-based communication
- Review and rating system

### Future Enhancements 🔄

- **Video/audio consultations** - Enable virtual appointments
- **Advanced analytics dashboard** - Comprehensive reporting for all user types
- **Payment system integration** - Stripe/PayPal integration for appointment fees
- **OCR document processing** - Automatic medical document analysis
- **Mobile application** - React Native mobile app
- **Advanced search filters** - Location-based and popularity-based search
- **Real-time notifications** - Push notifications for appointments and messages
- **AI-powered features** - Smart appointment scheduling and health insights

## 🤝 Contributing

1. Fork the repository from [GitHub](https://github.com/ahmedgamalalzatary/mediflow-V2)
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the **feature-based architecture** pattern
- Use **TypeScript** for all new code with strict type checking
- Implement **comprehensive error handling** and validation
- Add **documentation** for new features and components
- Follow **security best practices** for healthcare data
- Update **tests** when implementing new functionality
- Ensure **responsive design** and accessibility compliance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the [GitHub repository](https://github.com/ahmedgamalalzatary/mediflow-V2/issues)
- Check the documentation in `/docs`
- Review the AI development instructions for development guidelines
- Contact the development team for technical support

## 🔗 Links

- **Repository**: [GitHub - mediflow-V2](https://github.com/ahmedgamalalzatary/mediflow-V2)
- **Live Demo**: Coming Soon
- **Documentation**: [docs/](./docs/)
- **Project Specifications**: [docs/Idea.md](./docs/Idea.md)

## 🙏 Acknowledgments

- **[Next.js](https://nextjs.org/)** team for the amazing React framework
- **[Supabase](https://supabase.com/)** for the comprehensive backend infrastructure
- **[shadcn/ui](https://ui.shadcn.com/)** for the beautiful and accessible component library
- **[Tailwind CSS](https://tailwindcss.com/)** for the utility-first styling framework
- **[Redux Toolkit](https://redux-toolkit.js.org/)** for efficient state management
- **[Lucide](https://lucide.dev/)** for the consistent icon system
- **[Radix UI](https://www.radix-ui.com/)** for accessible UI primitives

---

**Built with ❤️ for better healthcare accessibility**
