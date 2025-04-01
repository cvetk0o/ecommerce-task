# Ecommerce Project

This is an **Ecommerce** project built with [Next.js](https://nextjs.org), designed for a seamless shopping experience.

## 🚀 Getting Started

### **Installation**
First, install dependencies (preferably using Yarn):
```bash
yarn install
# or
npm install
# or
pnpm install
```

### **Run the development server**
```bash
yarn dev
# or
npm run dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

## 🔧 Environment Variables
This project uses environment variables for configuration. Create a `.env.local` file and add the following:
```env
NEXT_FAKESTORE_API=https://fakestoreapi.com/
NEXT_LOCAL_CURRENCY="RSD"
NEXT_BRAND_NAME="Ecommerce"
```
- `NEXT_FAKESTORE_API`: The API endpoint for fetching product data.
- `NEXT_LOCAL_CURRENCY`: The currency displayed in the store (default: RSD).
- `NEXT_BRAND_NAME`: The brand name displayed throughout the application.

## 🛠 Features
- **Main Page**: Displays a list of products.
- **Category Pages**: Filter products by category.
- **Cart Context & Pages**: Manage shopping cart functionality.
- **Wishlist Context & Page**: Save favorite products for later.
- **Dark/Light Theme**: Toggle between light and dark mode.
- **Promo Code Option**: Apply discount codes; available test codes: `DISCOUNT20`, `TEST_DISCOUNT`.
- **Unit Testing**: Implemented with Jest.
- **Fetches Products** from [FakeStore API](https://fakestoreapi.com/)
- **Responsive Design** for mobile & desktop.
- **Optimized Fonts** using [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts).
- **Prettier & ESLint Setup** for consistent code formatting and linting.
- **Husky Hooks** to enforce pre-commit checks.

## 📏 Code Quality
This project follows best practices with:
- **Prettier**: Automatically formats code.
- **ESLint**: Ensures code quality and best practices.
- **Husky**: Runs pre-commit hooks to check linting and formatting before committing changes.

### **Setup Linter & Formatter**
To manually run linting and formatting:
```bash
yarn lint
yarn format
```

## 📚 Learn More
To learn more about Next.js, check out these resources:
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - interactive Next.js tutorial.

## 🚀 Deployment
The easiest way to deploy your Next.js app is with [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---
Made with ❤️ using Next.js