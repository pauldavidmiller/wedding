export default function levenshtein(s1: string, s2: string): number {
  const len1 = s1.length;
  const len2 = s2.length;

  // Create a distance matrix
  const distanceMatrix: number[][] = Array.from(
    Array(len1 + 1),
    () => new Array(len2 + 1)
  );

  // Initialize the matrix
  for (let i = 0; i <= len1; i++) {
    distanceMatrix[i][0] = i; // Cost of deletions
  }
  for (let j = 0; j <= len2; j++) {
    distanceMatrix[0][j] = j; // Cost of insertions
  }

  // Populate the matrix
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1; // No cost if characters match

      distanceMatrix[i][j] = Math.min(
        distanceMatrix[i - 1][j] + 1, // Deletion
        distanceMatrix[i][j - 1] + 1, // Insertion
        distanceMatrix[i - 1][j - 1] + cost // Substitution
      );
    }
  }

  // The Levenshtein distance is found in the bottom-right cell
  return distanceMatrix[len1][len2];
}
