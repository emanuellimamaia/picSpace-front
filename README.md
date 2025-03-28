# PicSpace - AI-Powered Image Gallery

PicSpace is a modern web application that leverages artificial intelligence to organize and manage your image gallery. Built with Next.js and featuring a beautiful, responsive design, it offers intelligent image tagging and efficient organization capabilities.

![PicSpace Homepage](public/home-gallery.png)

## Features

- 🤖 AI-powered image recognition and tagging
- 🎨 Modern, responsive UI with Framer Motion animations
- 🔍 Intelligent search functionality
- 🔒 Secure authentication system
- 📱 Mobile-first design
- 🎯 Efficient image organization

## Tech Stack

- **Frontend Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod
- **API Integration**: SWR for data fetching

## Prerequisites

- Node.js 18.x or later
- npm or yarn package manager
- AWS S3 bucket (for image storage)
- Environment variables configured

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_API_URL=your_api_url
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
AWS_BUCKET_NAME=your_bucket_name
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/pic-space-front.git
cd pic-space-front
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Architecture

### Directory Structure

```
src/
├── app/
│   ├── (auth)/           # Authentication routes
│   ├── (home)/           # Home page
│   └── _modules/         # Feature modules
│       ├── auth/         # Authentication module
│       └── gallery/      # Gallery module
├── components/           # Shared components
├── hooks/               # Custom hooks
├── lib/                 # Utility functions
└── store/              # State management
```

### Key Components

- **Authentication Module**: Handles user sign-in and sign-up
- **Gallery Module**: Manages image upload, organization, and search
- **Shared Components**: Reusable UI components
- **Custom Hooks**: Custom React hooks for common functionality

## Future Improvements

### Short Term

- [ ] Menu
- [ ] Edit Tags
- [ ] Edit Profile
- [ ] Recovery Password
- [ ] Add E2E Tests

### Medium Term

- [ ] Group Photos
- [ ] Add Albums
- [ ] Add Support for Multiple Storage Providers
- [ ] Add Video Support
- [ ] Implement Video Analysis

### Long Term

- [ ] Add Real-time Collaboration Support
- [ ] Implement Recommendation System
- [ ] Add Multi-language Support

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
