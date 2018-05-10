// @flow

const fs = require("fs");

// const configs = [{ type: "singlePhotoLike", count: 200 }];
// const configs = [
//   { type: "multiPhotoLike", count: 40, minPhotoCount: 2, maxPhotoCount: 7 },
//   { type: "singlePhotoLike", count: 100 },
//   { type: "multiLike", count: 25, minPhotoCount: 2, maxPhotoCount: 7 }
// ];
// const configs = [{ type: "multiLike", count: 150, minPhotoCount: 2, maxPhotoCount: 6 }];
// const configs = [{ type: "multiPhotoLike", count: 50, minPhotoCount: 6, maxPhotoCount: 20 }];

const configs = [{ type: "feed", count: 1000 }];

const urlsPath = "./urls.json";
const urls = JSON.parse(fs.readFileSync(urlsPath, "utf8"));
const generatedFile = "./generated.json";
let result = [];

for (let idx = 0; idx < configs.length; idx++) {
  const config = configs[idx];
  if (config.type === "singlePhotoLike") {
    generateSinglePhoto(config.count);
  } else if (config.type === "multiPhotoLike") {
    generateMultiPhoto({
      count: config.count,
      minPhotoCount: config.minPhotoCount,
      maxPhotoCount: config.maxPhotoCount
    });
  } else if (config.type === "multiLike") {
    generateMultiLike({
      count: config.count,
      minPhotoCount: config.minPhotoCount,
      maxPhotoCount: config.maxPhotoCount
    });
  } else if (config.type === "feed") {
    generateFeedData(config.count);
  }
}

function generateFeedData(count) {
  let offset = result.length;
  for (let idx = 0; idx < count; idx++) {
    let ratio = Math.random();
    if (ratio < 0.2) {
      ratio = 0.2;
    }
    const obj = { type: "feed", url: urls[offset] + "?r480x480", ratio: ratio };
    result.push(obj);
    offset += 1;
  }
}

function generateMultiLike({ count, minPhotoCount, maxPhotoCount }) {
  let counter = 0;
  const imageSize = "?r240x240";
  let offset = result.length;
  while (counter < count) {
    const photoCount = minPhotoCount + Math.random() * (maxPhotoCount - minPhotoCount);
    const leftUrl = urls[offset];
    offset += 1;
    const rightUrl = urls[offset];
    offset += 1;
    let multiUrls = [];
    for (let idx = 0; idx < photoCount; idx++) {
      multiUrls.push(urls[offset] + imageSize);
      offset += 1;
    }
    result.push({
      type: "multiLike",
      username: "@hov",
      leftUrl: leftUrl + imageSize,
      title: "@hov liked your photo " + leftUrl,
      rightUrl: rightUrl + imageSize,
      photos: multiUrls
    });
    counter++;
  }
}

function generateMultiPhoto({ count, minPhotoCount, maxPhotoCount }) {
  let counter = 0;
  const imageSize = "?r240x240";
  let offset = result.length;
  while (counter < count) {
    const photoCount = minPhotoCount + Math.random() * (maxPhotoCount - minPhotoCount);
    const leftUrl = urls[offset];
    offset += 1;
    const rightUrl = urls[offset];
    offset += 1;
    let multiUrls = [];
    for (let idx = 0; idx < photoCount; idx++) {
      multiUrls.push(urls[offset] + imageSize);
      offset += 1;
    }
    result.push({
      type: "multiPhotoLike",
      username: "@hov",
      leftUrl: leftUrl + imageSize,
      title: "@hov liked your photo " + leftUrl,
      rightUrl: rightUrl + imageSize,
      photos: multiUrls
    });
    counter++;
  }
}

function generateSinglePhoto(count) {
  for (let idx = result.length; idx < result.length + 2 * count; idx += 2) {
    const leftUrl = urls[idx];
    const rightUrl = urls[idx + 1];
    const imageSize = "?r240x240";
    result.push({
      type: "singlePhoto",
      username: "@hov",
      leftUrl: leftUrl + imageSize,
      title: "@hov liked your photo " + leftUrl,
      rightUrl: rightUrl + imageSize
    });
  }
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // $FlowFixMe
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

result = shuffle(result);

fs.writeFileSync(generatedFile, JSON.stringify(result, undefined, 2));
