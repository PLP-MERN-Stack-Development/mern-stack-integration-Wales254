# BlogHub - Modern Blog Platform

A full-stack blog platform built with React, Node.js, Express, and PostgreSQL.

## Features

### Authentication
- User registration and login with JWT authentication
- Secure password hashing with bcryptjs
- Token-based authentication with automatic session management

### Blog Posts
- Create, read, update, and delete blog posts
- Rich text content with featured images
- Post categories for organization
- Draft and publish functionality
- Author attribution with profile information

### User Interaction
- Threaded comment system with replies
- Like/unlike posts
- User profiles with customizable bio and profile pictures
- View posts by author or category

### Content Discovery
- Browse all published posts
- Filter posts by category
- Search functionality
- Pagination for better performance
- Related posts suggestions

## Tech Stack

### Frontend
- **React** with TypeScript
- **Wouter** for client-side routing
- **TanStack Query** for data fetching and caching
- **Tailwind CSS** for styling
- **Shadcn UI** components
- **date-fns** for date formatting

### Backend
- **Node.js** with **Express**
- **PostgreSQL** database with Drizzle ORM
- **JWT** for authentication
- **Multer** for file uploads
- **bcryptjs** for password hashing

## Getting Started

### Prerequisites
- Node.js 20 or higher
- PostgreSQL database (automatically provided on Replit)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Push database schema:
```bash
npm run db:push
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Users
- `GET /api/users/:id` - Get user by ID
- `PATCH /api/users/:id` - Update user profile (requires auth)
- `DELETE /api/users/:id` - Delete user (requires auth)

### Posts
- `GET /api/posts` - Get all posts (supports filtering and pagination)
- `GET /api/posts/:id` - Get post by ID
- `POST /api/posts` - Create new post (requires auth)
- `PATCH /api/posts/:id` - Update post (requires auth)
- `DELETE /api/posts/:id` - Delete post (requires auth)

### Comments
- `GET /api/posts/:postId/comments` - Get comments for a post
- `POST /api/posts/:postId/comments` - Create comment (requires auth)
- `DELETE /api/comments/:id` - Delete comment (requires auth)

### Likes
- `POST /api/posts/:postId/like` - Toggle like on post (requires auth)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (requires auth)

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities and context providers
│   │   └── hooks/         # Custom React hooks
├── server/                # Backend Express application
│   ├── routes.ts          # API route definitions
│   ├── storage.ts         # Database operations
│   ├── auth.ts            # Authentication utilities
│   └── db.ts              # Database connection
├── shared/                # Shared types and schemas
│   └── schema.ts          # Database schema definitions
└── uploads/               # User-uploaded files
```

## Database Schema

The application uses PostgreSQL with the following main tables:

- **users** - User accounts and profiles
- **posts** - Blog post content and metadata
- **categories** - Post categories
- **comments** - Post comments with threading support
- **likes** - Post likes/reactions

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open Drizzle Studio for database management

### Adding New Features

1. Define types in `shared/schema.ts`
2. Update storage interface in `server/storage.ts`
3. Add API routes in `server/routes.ts`
4. Create frontend components in `client/src/components`
5. Add pages in `client/src/pages`

## Security Features

- Password hashing with bcrypt (10 rounds)
- JWT tokens with 7-day expiration
- Authorization middleware for protected routes
- Input validation with Zod schemas
- SQL injection protection via Drizzle ORM
- File upload validation and size limits

## Deployment

The application is designed to run on Replit and can be published directly from the platform. For other hosting providers:

1. Ensure PostgreSQL database is configured
2. Set environment variables (DATABASE_URL, JWT_SECRET)
3. Run `npm run build`
4. Start with `npm start`

## License

MIT License - feel free to use this project for learning or as a starter template.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.
