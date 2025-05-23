# Project Cost Tracker

A React application to track project costs including items and other expenses. This project uses Firebase for backend services and Redux Toolkit for state management.

## GitHub Repository

You can clone or fork this repository using the following commands:

```bash
# Clone the repository
git clone https://github.com/sasankkona/project-cost-tracker.git

# Or fork the repository on GitHub and then clone your fork
git clone https://github.com/your-username/project-cost-tracker.git
```

## File Structure

```
project-cost-tracker/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── ItemForm.js
│   │   ├── ItemList.js
│   │   ├── LogoutButton.js
│   │   ├── OtherCostForm.js
│   │   ├── OtherCostList.js
│   │   └── ProtectedRoute.js
│   ├── pages/
│   │   ├── Dashboard.js
│   │   ├── Login.js
│   │   └── Signup.js
│   ├── slices/
│   │   ├── authSlice.js
│   │   ├── itemsSlice.js
│   │   ├── otherCostsSlice.js
│   │   └── store.js
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── firebase.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Bonus Points

- Uses Firebase for authentication and data storage.
- Implements Redux Toolkit for efficient state management.
- Includes protected routes for authenticated user access.
- Responsive and user-friendly UI components.
- Well-structured and modular codebase for scalability.
- Includes testing setup with React Testing Library.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).
