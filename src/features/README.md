# Features

Feature-based modules following domain-driven design principles.

## Structure

- **words/** - Word database, categories, and management
- **activities/** - Learning activities (Picture Cards, Sound Matching, etc.)
- **progress/** - Progress tracking, analytics, and reporting
- **rewards/** - Reward system, achievements, and gamification

## Guidelines

- Each feature should be self-contained with its own components, hooks, and types
- Use React Query for data fetching and state management
- Export public API through index files
- Keep business logic separate from UI components
