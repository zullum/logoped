# Components

React components organized by feature and audience.

## Structure

- **kid/** - Components for children's interface (large, colorful, playful)
- **parent/** - Components for parent/therapist dashboard (professional, data-focused)
- **shared/** - Reusable components used across both interfaces
- **ui/** - Base UI components (buttons, cards, inputs, etc.)

## Guidelines

- Keep components small and focused (single responsibility)
- All components must be TypeScript with proper props typing
- Kid components must have minimum 60dp touch targets
- Use NativeWind className for styling, inline style only for fonts
- Export components from index files for clean imports
