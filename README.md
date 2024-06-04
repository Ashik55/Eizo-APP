# EIZO.ai - AI image generation app

## Steps to run backend on local machine

Ask for the `.env` file and place it in the `next` folder.

```
cd next
yarn && yarn dev
```

## Steps to run React Native app

We use expo devclient to run the app on iOS simulator.
Unzip the file like "build-1712304292156.tar.gz" in expo folder and drag and drop the "EIZOai.app" to iOS simulator.

```
cd expo
yarn && yarn start:local
```

You can check package.json for more commands.

## Deploy backend

```
// just run in root folder
yarn deploy
```

Figma design: https://www.figma.com/file/OXUkpH5YZAi2nuZPjh2PVI/logo?type=design&node-id=299%3A2&mode=design&t=oAakOCquHaVXmDJf-1
Supabase Database: https://supabase.com/dashboard/project/rzjjwzbelffmxifrrgtv
Google Cloud Storage: https://console.cloud.google.com/storage/browser/eizoai;tab=objects?forceOnBucketsSortingFiltering=true&authuser=2&hl=ja&project=eizo-413609&prefix=&forceOnObjectsSortingFiltering=false
