// import clientPromise from '.';

// let client;
// let db;
// let profiles;

// async function init() {
//   if (db) return;
//   try {
//     client = await clientPromise;
//     db = await client.db();
//     profiles = await db.collection('profiles');
//   } catch (error) {
//     throw new Error('Failed to establish connection to database');
//   }
// }

// (async () => {
//   await init();
// })();

// export async function getProfiles() {
//   try {
//     await init();
//     const result = await profiles
//       .find({})
//       .limit(20)
//       .map((user) => ({ ...user, _id: user._id.toString() }))
//       .toArray();

//     return { profiles: result };
//   } catch (error) {
//     return { error: 'Failed to fetch profiles!' };
//   }
// }
