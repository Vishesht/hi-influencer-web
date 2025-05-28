import intents from "./intents.json";

function preprocess(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .split(/\s+/);
}

function buildVocab(intents) {
  const vocab = new Set();
  for (const intent of intents) {
    for (const pattern of intent.patterns) {
      preprocess(pattern).forEach((word) => vocab.add(word));
    }
  }
  return Array.from(vocab);
}

function bow(text, vocab) {
  const words = preprocess(text);
  return vocab.map((word) => words.filter((w) => w === word).length);
}

function cosineSimilarity(vec1, vec2) {
  const dot = vec1.reduce((acc, val, i) => acc + val * vec2[i], 0);
  const mag1 = Math.sqrt(vec1.reduce((acc, val) => acc + val * val, 0));
  const mag2 = Math.sqrt(vec2.reduce((acc, val) => acc + val * val, 0));
  return mag1 && mag2 ? dot / (mag1 * mag2) : 0;
}

function predictClass(message, intents, vocab) {
  const inputVec = bow(message, vocab);
  let maxSim = 0;
  let matchedTag = null;

  for (const intent of intents) {
    for (const pattern of intent.patterns) {
      const patternVec = bow(pattern, vocab);
      const sim = cosineSimilarity(inputVec, patternVec);
      if (sim > maxSim) {
        maxSim = sim;
        matchedTag = intent.tag;
      }
    }
  }

  return matchedTag || "unknown";
}

function getResponse(tag, intents) {
  const intent = intents.find((i) => i.tag === tag);
  if (!intent) return "Sorry, I didn't get that.";
  const responses = intent.responses;
  return responses[Math.floor(Math.random() * responses.length)];
}

// 🔄 Full chatbot interaction
export function getChatbotReply(message) {
  const vocab = buildVocab(intents.intents);
  const tag = predictClass(message, intents.intents, vocab);
  return getResponse(tag, intents.intents);
}
