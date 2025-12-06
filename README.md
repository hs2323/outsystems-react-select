# OutSystems React Select
OutSystems component for the [React Select](https://react-select.com) component.

## 🚀 Project Structure

```text
/
├── public/
├── src/
│   └── components/
│       └── Counter.tsx
│   └── images/
│       └── image.png
│   └── pages/
│       └── counter.astro
│   └── styles/
│       └── index.css
└── package.json
```

### Pages
Each page inside of the pages file should represent an Island that will be imported into OutSystems.

### Components
The location of the component code.

### Images
Any image assets.

### Styles
Stylesheets that may apply to the component.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build distribution to `./dist/`                  |
| `npm run output`          | Build OutSystems production site to `./output/`  |
| `npm run preview`         | Preview build locally, before creating output    |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Testing

[Vitest](https://vitest.dev/) - Test runner framework.

### Unit and Integration Testing
- Run unit and integraiton testing with interactive reload:
```bash
npm run test
```
- Run unit and integration testing once:
```bash
npm run test:run
```

### End-to-end testing
- Install browsers
```bash
npm run test:e2e:install
```

- Run end-to-end testing with visual browser.

```bash
npm run ui:test:e2e
```

- Run end-to-end testing in the command line only.

```bash
npm run ui:test:e2e:run
```

## Converting to OutSystems

Once development is complete, run:
```bash
npm run output
```

This will create a set of files that will then need to be coverted to OutSystems components.
