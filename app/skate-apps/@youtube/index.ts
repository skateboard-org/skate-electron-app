import { google } from 'googleapis';

const oAuth2Client = new google.auth.OAuth2(
  YOUR_CLIENT_ID,
  YOUR_CLIENT_SECRET,
  YOUR_REDIRECT_URL
);

// AIzaSyB09k1pcFzrsFruFAE1PhTgf6nJovVoMII

// initialize the Youtube API library
const youtube = google.youtube({
  version: 'v3',
  auth: oAuth2Client
});

export default async function youtube(
  expression: string
): Promise<Text | ErrorType> {
  return new Promise((resolve, reject) => {
    const res = youtube.search.list({
      part: 'id,snippet',
      q: 'Node.js on Google Cloud'
    });
    resolve(res);
  });
}
