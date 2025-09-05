# AI Development Instructions for Mediflow

This document provides comprehensive guidelines for AI assistants working on the Mediflow healthcare platform. Follow these instructions when making modifications, adding features, or maintaining the codebase.

## 🏗️ Architecture Overview

Mediflow uses a **feature-based architecture** with the following core principles:
- Each feature is self-contained with its own components, hooks, services, store, and types
- Shared utilities go in `/lib`, `/hooks`, or `/components/shared`
- Business logic constants are centralized in `/lib/constants.ts`
- Type-safe Redux with RTK for state management
- Supabase for backend services (auth, database, storage)

## 📁 File Structure Rules

### When Adding New Features:
```
src/features/[feature-name]/
├── components/          # Feature-specific UI components
├── hooks/              # Feature-specific business logic hooks
├── services/           # API calls and external service integrations
├── store/              # Redux slice for this feature
├── types/              # TypeScript definitions for this feature
└── index.ts            # Selective exports (no export *)
```

### When Modifying Existing Features:
1. **Always check the feature's index.ts** - ensure new exports are added
2. **Update types first** - modify `types/[feature].types.ts` before implementation
3. **Update store if needed** - modify the Redux slice in `store/[feature]Slice.ts`
4. **Add to constants** - if introducing new status/enum values, add to `/lib/constants.ts`

## 🔧 Modification Guidelines by Type

### 1. Adding New Components

**Steps to Follow:**
1. Create component in appropriate feature's `components/` folder
2. Add TypeScript interfaces in feature's `types/` folder
3. Export component in feature's `index.ts` using selective export:
   ```typescript
   export { NewComponent } from './components/NewComponent';
   ```
4. If component uses new constants, add them to `/lib/constants.ts`
5. If component needs global state, update the feature's Redux slice

**Files to Touch:**
- `src/features/[feature]/components/NewComponent.tsx`
- `src/features/[feature]/types/[feature].types.ts` (if new types needed)
- `src/features/[feature]/index.ts` (add export)
- `src/lib/constants.ts` (if new constants needed)

### 2. Adding New API Endpoints

**Steps to Follow:**
1. Add endpoint constants to `/lib/constants.ts` under `API_ENDPOINTS`
2. Create service function in feature's `services/` folder
3. Add TypeScript types for request/response in feature's `types/` folder
4. Update Redux slice to handle new API states (loading, success, error)
5. Create custom hook in feature's `hooks/` folder if needed
6. Export new service and hook in feature's `index.ts`

**Files to Touch:**
- `src/lib/constants.ts` (add API endpoint)
- `src/features/[feature]/services/[feature]Service.ts`
- `src/features/[feature]/types/[feature].types.ts`
- `src/features/[feature]/store/[feature]Slice.ts`
- `src/features/[feature]/hooks/use[Feature].ts` (if needed)
- `src/features/[feature]/index.ts` (add exports)

### 3. Adding New Routes/Pages

**Steps to Follow:**
1. Determine route group: `(auth)`, `(dashboard)`, or `(landing)`
2. For dashboard routes, use role-based structure: `[role]/[feature]/page.tsx`
3. Add route constants to `/lib/constants.ts` under `ROUTES`
4. Update middleware.ts if route needs special auth handling
5. Import and use feature components from their index files

**Files to Touch:**
- `src/app/(group)/[path]/page.tsx`
- `src/lib/constants.ts` (add route constant)
- `middleware.ts` (if auth rules change)

### 4. Modifying Authentication/Authorization

**Critical Rules:**
1. **Never modify middleware.ts without understanding auth flow**
2. **Always update USER_ROLES in constants.ts if adding new roles**
3. **Auth changes must be tested across all role types**
4. **Update auth types in `features/auth/types/auth.types.ts`**

**Files to Touch:**
- `middleware.ts` (route protection logic)
- `src/lib/constants.ts` (USER_ROLES)
- `src/features/auth/types/auth.types.ts`
- `src/features/auth/store/authSlice.ts`
- Database schema (if new user types)

### 5. Adding New Database Tables/Schemas

**Steps to Follow:**
1. Create migration in `supabase/migrations/`
2. Update `src/types/database.types.ts` (generate from Supabase)
3. Add table-specific constants to `/lib/constants.ts`
4. Create or update relevant feature's types
5. Update RLS policies if needed

**Files to Touch:**
- `supabase/migrations/[timestamp]_[description].sql`
- `src/types/database.types.ts`
- `src/lib/constants.ts`
- `src/features/[feature]/types/[feature].types.ts`

## 🎯 Role-Based Development Rules

### Patient Features:
- **Allowed Actions**: Book appointments, view doctors, manage medical records, chat with doctors, leave reviews
- **Route Pattern**: `/patient/[feature]`
- **Key Features**: appointments, doctors, medical-history, messages, profile

### Doctor Features:
- **Allowed Actions**: Manage appointments, view patients, update schedule, chat with patients, view reviews
- **Route Pattern**: `/doctor/[feature]`
- **Key Features**: appointments, patients, schedule, messages, profile, reviews

### Admin Features:
- **Allowed Actions**: Manage users, verify doctors, view analytics, handle support
- **Route Pattern**: `/admin/[feature]`
- **Key Features**: users, verify-doctors, analytics, settings, support
- **Special Note**: No signup UI for admins (backend-only user creation)

## 🔒 Security Guidelines

### Authentication:
1. **Always use middleware for route protection**
2. **Check user roles in components when needed**
3. **Use Supabase RLS for database security**
4. **Never expose sensitive data in client-side code**

### Data Validation:
1. **Validate on both client and server side**
2. **Use TypeScript for compile-time safety**
3. **Add runtime validation for user inputs**
4. **Sanitize data before database operations**

## 📦 State Management Rules

### Redux Store:
1. **Each feature has its own slice**
2. **Use RTK Query for API calls when appropriate**
3. **Keep store normalized and flat**
4. **Use typed hooks from `/hooks/redux.ts`**

### Local State:
1. **Use useState for component-specific state**
2. **Use useReducer for complex local state**
3. **Avoid prop drilling - use Redux for shared state**

## 🎨 UI/UX Guidelines

### Component Creation:
1. **Use shadcn/ui components as base**
2. **Create feature-specific components in feature folders**
3. **Shared components go in `/components/shared`**
4. **Follow consistent naming: PascalCase for components**

### Styling:
1. **Use Tailwind CSS classes**
2. **Follow existing design patterns**
3. **Ensure responsive design**
4. **Maintain accessibility standards**

## 🧪 Testing Strategy

### When Adding Features:
1. **Test all user roles that can access the feature**
2. **Test authentication and authorization**
3. **Test error states and edge cases**
4. **Verify responsive design**

### When Modifying Existing Features:
1. **Test backward compatibility**
2. **Verify no regression in other features**
3. **Test all affected user flows**

## 🚨 Common Pitfalls to Avoid

### Architecture Violations:
- ❌ **Don't** put feature-specific logic in shared folders
- ❌ **Don't** import between features directly (use proper exports)
- ❌ **Don't** modify core files without understanding impact
- ❌ **Don't** hardcode values that should be in constants

### Security Issues:
- ❌ **Don't** bypass middleware authentication
- ❌ **Don't** expose sensitive data in client state
- ❌ **Don't** trust client-side validation alone
- ❌ **Don't** ignore TypeScript errors

### Performance Problems:
- ❌ **Don't** use `export *` in index files
- ❌ **Don't** create unnecessary re-renders
- ❌ **Don't** load all data at once (implement pagination)
- ❌ **Don't** ignore bundle size implications

## 📋 Checklist for Any Modification

### Before Starting:
- [ ] Understand the feature's current architecture
- [ ] Check if constants need updating
- [ ] Verify TypeScript types are adequate
- [ ] Review authentication requirements

### During Development:
- [ ] Follow feature-based architecture
- [ ] Use typed Redux hooks
- [ ] Add proper error handling
- [ ] Maintain consistent code style

### Before Completion:
- [ ] Update feature's index.ts exports
- [ ] Test across all relevant user roles
- [ ] Verify no TypeScript errors
- [ ] Check bundle size impact
- [ ] Ensure responsive design
- [ ] Validate accessibility

## 🔄 Integration Points

### Supabase Integration:
- **Auth**: Use `@supabase/ssr` for server-side auth
- **Database**: Use typed queries with database.types.ts
- **Storage**: Use for file uploads (medical records, profile images)
- **Real-time**: Use for chat functionality

### External Services:
- **Email**: Supabase Auth handles email verification
- **File Processing**: Basic upload only (no OCR in MVP)
- **Payments**: Not implemented in MVP

## 📚 Reference Files

### Always Check These Files When Making Changes:
- `src/lib/constants.ts` - All business logic constants
- `middleware.ts` - Authentication and routing logic
- `src/types/database.types.ts` - Database schema types
- `src/store/rootReducer.ts` - Redux store structure
- `agent.md` - Project specification and requirements

### Feature-Specific Reference:
- `src/features/[feature]/index.ts` - Available exports
- `src/features/[feature]/types/[feature].types.ts` - Type definitions
- `src/features/[feature]/store/[feature]Slice.ts` - State management

---

## 🎯 Quick Decision Matrix

| Task Type | Primary Files to Modify | Secondary Files | Testing Focus |
|-----------|-------------------------|-----------------|---------------|
| New Component | Feature components/, types/, index.ts | constants.ts | UI/UX, Props |
| New API | Feature services/, types/, store/ | constants.ts | Error handling, Types |
| New Route | app/(), constants.ts | middleware.ts | Auth, Role access |
| Auth Change | middleware.ts, auth/ | constants.ts | All roles, Security |
| DB Change | migrations/, database.types.ts | Feature types/ | Data integrity |
| UI Update | Feature components/ | shared components/ | Responsive, A11y |

Remember: **When in doubt, follow the existing patterns in the codebase. Consistency is key to maintainability.**

## Important Configuration Notes

### Supabase Settings
- **Email Confirmation**: DISABLED for development (no email verification required)
- **Authentication**: Users can sign up and immediately sign in
- **Database**: Profiles table auto-creates via trigger function
- **RLS Policies**: Configured for user data protection

### Authentication Flow
- Signup → Success message → Manual redirect to signin
- Signin → Auto redirect to role-based dashboard (/[role]/[role] pattern)
- No email verification step in development mode

### Dashboard Routing Structure
- Patient Dashboard: `/patient/[userId]`
- Doctor Dashboard: `/doctor/[userId]`  
- Admin Dashboard: `/admin/[userId]`
- URL Pattern: `/[role]/[id]` where [id] is the user's UUID
- File Structure: `/[role]/patient/page.tsx`, `/[role]/doctor/page.tsx`, `/[role]/admin/page.tsx`