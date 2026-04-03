# 💰 FinTrack - Modern Finance Dashboard

FinTrack is a comprehensive, responsive, and visually stunning finance tracking application built with React, Vite, and Tailwind CSS. It empowers users to manage their transactions, visualize spending patterns, and gain smart financial insights.

## ✨ Features

- **📊 Interactive Dashboard**: Real-time summary cards and data visualizations using Recharts.
- **🔐 Role-Based Access Control**: Switch between **Admin** (Full CRUD) and **Viewer** (Read-only) roles.
- **📈 Data Visualization**: 
  - Balance Trend Area Chart
  - Category-wise Spending Pie Chart
- **💸 Transaction Management**:
  - Full CRUD operations (Add, Edit, Delete) for Admins.
  - Advanced filtering by category, type, and search.
  - Multi-column sorting.
- **💡 Smart Insights**:
  - Highest spending category analysis.
  - Saving rate calculation.
  - Average daily spending tracking.
- **🌓 Dark Mode**: Seamless dark/light mode transition with persistent state.
- **📱 Mobile Responsive**: Optimized for all screen sizes with a fluid sidebar and header.
- **📥 Data Export**: Export your transaction history as CSV or JSON.
- **💾 Local Persistence**: All data is saved to `localStorage` for a persistent experience.

## 🚀 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Motion](https://motion.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Date Handling**: [date-fns](https://date-fns.org/)

## 🛠️ Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/finance-dashboard.git
   cd finance-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 📖 How to Use

1. **Dashboard**: View your overall financial health at a glance.
2. **Transactions**: Use the "Transactions" tab to manage your records.
3. **Roles**: Toggle between "Viewer" and "Admin" in the header to test role-based permissions.
4. **Dark Mode**: Click the sun/moon icon in the header to switch themes.
5. **Add Transaction**: Click "Add New" (Admin only) to record a new income or expense.

## 🛡️ Role-Based Features

- **Admin**:
  - Add new transactions.
  - Edit existing transactions.
  - Delete transactions.
  - Export data.
- **Viewer**:
  - View all dashboard metrics.
  - View and filter transactions.
  - Export data.
  - *Cannot* modify any data.

## 🚀 Deployment

This project is ready to be deployed on **Vercel** or **Netlify**.
- Simply connect your GitHub repository to the platform.
- The build command is `npm run build` and the output directory is `dist`.

## 🤝 Challenges & Solutions

- **State Persistence**: Used `useEffect` hooks to sync state with `localStorage`, ensuring data survives page refreshes.
- **Complex Filtering**: Implemented a custom `useFilters` hook to handle multi-criteria filtering and sorting efficiently with `useMemo`.
- **Responsive Charts**: Utilized `ResponsiveContainer` from Recharts to ensure charts adapt to different screen widths.

## 🔮 Future Improvements

- [ ] Integration with real banking APIs (Plaid).
- [ ] Multi-currency support.
- [ ] Budget setting and goal tracking.
- [ ] Monthly PDF report generation.

---
Built with ❤️ for the Frontend Developer Intern Assignment.
