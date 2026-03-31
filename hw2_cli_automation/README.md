# SauceDemo Playwright Automation Framework

A production-quality Playwright test framework for [SauceDemo](https://www.saucedemo.com/).

## Tech Stack
- **Playwright** - Test runner and automation library
- **TypeScript** - Language
- **Allure Report** - Advanced reporting
- **Docker** - Containerization
- **Dotenv** - Environment variables management

## Architecture
The project follows a strict **3-layer architecture**:
1. **POM (Page Object Model)**: Located in `src/pages`. Handles direct UI interactions.
2. **Steps (Flow Layer)**: Located in `src/steps`. Orchestrates POM methods into business flows and handles step logging.
3. **Tests**: Located in `tests`. Uses custom fixtures to access the step layer.

### Authentication
The framework uses **`storageState`** for efficient authentication.
- **Global Setup**: Logs in once using credentials from `.env` and saves the state to `storageState.json`.
- **Reuse**: Authenticated flows (Cart, Checkout) reuse this state to skip login UI steps.
- **Login Tests**: Specifically override the state to test the login process.

## Project Structure
```text
├── .github/workflows/   # CI configuration
├── src/
│   ├── fixtures/        # Custom Playwright fixtures
│   ├── pages/           # Page Object Models
│   ├── steps/           # Business logic / Flow layer
│   └── utils/           # Global setup and helpers
├── tests/               # Test suites
│   ├── auth/            # Login tests
│   ├── shopping/        # Cart tests
│   └── checkout/        # Checkout tests
├── .env                 # Local credentials
├── playwright.config.ts # Playwright configuration
├── Dockerfile           # Docker image definition
└── docker-compose.yml   # Docker orchestration
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- Docker (optional)

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (already provided in this setup):
   ```env
   SAUCE_USERNAME=standard_user
   SAUCE_PASSWORD=secret_sauce
   BASE_URL=https://www.saucedemo.com/
   ```

### Running Tests
- **All tests**: `npm run test`
- **With UI**: `npm run test:ui`
- **Specific suite**: `npx playwright test tests/auth`

### Reporting
The project uses Allure Report.
1. Generate report:
   ```bash
   npm run allure:generate
   ```
2. Open report:
   ```bash
   npm run allure:open
   ```
Or combine: `npm run allure:report`

### Docker Support
Run tests inside a container:
```bash
npm run docker:test
```

## Test Coverage
1. **Login Flow**: Valid/Invalid/Locked/Empty credentials (5 tests).
2. **Shopping Cart Flow**: Add/Remove/Badge count/Content correctness (5 tests).
3. **Checkout Flow**: E2E/Cancel stages/Validation/Price calculation (5 tests).

## Bugs Found
// TODO: Failing test - If any bugs are identified during execution, they will be marked here.
- (None currently identified in standard flow).
