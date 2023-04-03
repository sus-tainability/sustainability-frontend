![EXPORT - BetterEarth Render](https://user-images.githubusercontent.com/29945147/229603439-724f05b5-b63b-4a76-a912-f1511ca9e83d.png)
# EcoQuest

The application is a community-based game that promotes sustainable living by engaging users in activities that encourage responsible consumption. Upon completing these events, users can earn credits that can be redeemed for prizes.

## Inital setup

**Prerequisites NodeJS LTS v16.17.0**

1. Install nvm on your machine
2. run `nvm install v16.17.0`
3. run `nvm use`
4. Run `npm install` in the working directory to install required packages
5. Reference `.env.example` and create your own `.env` file
6. Run `npm run start` to start the server on localhost

## Documentation

- [**Live Site**](http://sus-tainability.netlify.app)
- [**Figma Design**](https://www.figma.com/file/RElz1keXSeEx1dNBfV8eJv/SUS-App?node-id=1-4&t=983beEaJZGVNWOhF-0)

### File Structure and Naming Convention

```
src/
├─ api/
│  ├─ ApiHandler.ts
│  ├─ ApiService.ts
├─ assets/
├─ components/
│  ├─ ExampleComponent/
│  │  ├─ ExampleComponent.tsx
│  │  ├─ index.ts
├─ constants/
├─ pages/
│  ├─ Home/
│  │  ├─ Home.tsx
│  │  ├─ index.ts
├─ utils/
│  ├─ hooks/
│  ├─ contexts/
│  ├─ miscellaneous.ts
```

### Commit Message Convention

- Use [Gitmoji](https://gitmoji.dev/) to add emojis to your commit messages
- Use the following format for your commit messages
  - :sparkles: `feat: add new feature`
  - :bug: `fix: fix a bug`
  - :recycle: `refactor: refactor code`
  - :art: `style: change styling`
  - :fire: `chore: remove unused code`
  - :memo: `docs: update documentation`
  - :package: `package: update package`
  - :rocket: `deploy: deploy to production`
  - :wastebasket: `waste: remove unused code`
