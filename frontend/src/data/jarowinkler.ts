export default function jaroWinklerDistance(s1: string, s2: string, p = 0.1) {
  // Jaro distance computation
  const len1 = s1.length;
  const len2 = s2.length;
  const matchDistance = Math.floor(Math.max(len1, len2) / 2) - 1;
  const s1Matches = new Array(len1);
  const s2Matches = new Array(len2);
  let matchingChars = 0;

  for (let i = 0; i < len1; i++) {
    const start = Math.max(0, i - matchDistance);
    const end = Math.min(i + matchDistance + 1, len2);

    for (let j = start; j < end; j++) {
      if (s2Matches[j]) continue;
      if (s1[i] !== s2[j]) continue;

      s1Matches[i] = true;
      s2Matches[j] = true;
      matchingChars++;
      break;
    }
  }

  if (!matchingChars) return 0;

  // Compute transpositions
  let transpositions = 0;
  let j = 0;

  for (let i = 0; i < len1; i++) {
    if (!s1Matches[i]) continue;

    while (!s2Matches[j]) j++;

    if (s1[i] !== s2[j]) transpositions++;

    j++;
  }

  transpositions /= 2;

  // Jaro distance
  const jaroDistance =
    (matchingChars / len1 +
      matchingChars / len2 +
      (matchingChars - transpositions) / matchingChars) /
    3;

  // Jaro-Winkler distance
  const prefixLength = Math.min(4, s1.length, s2.length);

  let jaroWinklerDistance =
    jaroDistance + prefixLength * p * (1 - jaroDistance);

  return jaroWinklerDistance;
}
