Steps to run backend

- `cd backend`
- `yarn && yarn dev`

Now follow ngrok setup instructions

- `https://ngrok.com/docs/getting-started/`
- Then run `ngrok http http://localhost:3000`
- Copy the https url and replace API_URL in Keys.ts

Deploy backend:

- `sudo su -`
- `cd eizo-app`
- `cd nextjs`
- `npm install --legacy-peer-deps`
- `npm run build`
- `pm2 restart eizo-app`

for carousel error
`ViewPropTypes will be removed from React Native`
https://stackoverflow.com/questions/71702392/viewproptypes-will-be-removed-from-react-native-migrate-to-viewproptypes-export

https://github.com/novitalabs/javascript-sdk/blob/main/examples/txt2ImgV3.js
