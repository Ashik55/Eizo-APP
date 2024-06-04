import sanityClient, { createClient } from "@sanity/client";

export default createClient({
  projectId: "1mgvbrdt", // you can find this in sanity.json
  dataset: "production", // or the name you chose in step 1
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: "2021-10-21", // use a UTC date string
  // token: 'sanity-auth-token', // or leave blank for unauthenticated usage
});
