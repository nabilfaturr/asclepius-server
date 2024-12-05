import { Firestore } from "@google-cloud/firestore";

const FIRESTORE_KEY_PATH = process.env.FIRESTORE_KEY_PATH!;

if (!FIRESTORE_KEY_PATH) {
  throw new Error("FIRESTORE_KEY_PATH is not defined");
}

const firestore = new Firestore({
  keyFilename: FIRESTORE_KEY_PATH,
  projectId: "submissionmlgc-nabilfaturr",
});

export default firestore;
