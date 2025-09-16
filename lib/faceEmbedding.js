// import * as faceapi from "face-api.js";

// // Load models once (call this at app start)
// export async function loadFaceModels() {
//   const MODEL_URL = "/models"; // put models in /public/models
//   await Promise.all([
//     faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),   // detection
//     faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL), // embeddings
//     faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL), // landmarks
//   ]);
// }

// // Get face embedding from File/Blob
// export async function getFaceEmbedding(file) {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const img = await faceapi.bufferToImage(file);
//       const detections = await faceapi
//         .detectSingleFace(img)
//         .withFaceLandmarks()
//         .withFaceDescriptor();

//       if (!detections) {
//         reject("No face detected");
//         return;
//       }

//       // Float32Array → regular array (for MongoDB)
//       const embedding = Array.from(detections.descriptor);
//       resolve(embedding);
//     } catch (err) {
//       reject(err);
//     }
//   });
// }
