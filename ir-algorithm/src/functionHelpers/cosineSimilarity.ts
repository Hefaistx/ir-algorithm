function cosineSimilarity(string1: string, string2: string): number {
    const words1: string[] = string1.split(' ');
    const words2: string[] = string2.split(' ');
  
    const uniqueWords: Set<string> = new Set([...words1, ...words2]);
  
    const vector1: number[] = Array.from(uniqueWords, word =>
      words1.filter(w => w === word).length
    );
    const vector2: number[] = Array.from(uniqueWords, word =>
      words2.filter(w => w === word).length
    );
  
    const dotProduct: number = vector1.reduce((sum, value, index) => sum + value * vector2[index], 0);
  
    const magnitude1: number = Math.sqrt(vector1.reduce((sum, value) => sum + value ** 2, 0));
    const magnitude2: number = Math.sqrt(vector2.reduce((sum, value) => sum + value ** 2, 0));
  
    const cosineSimilarity: number = dotProduct / (magnitude1 * magnitude2);
  
    return cosineSimilarity;
  }
  
  
  //const string1: string = 'Ini adalah contoh string pertama.';
  //const string2: string = 'Ini adalah contoh string kedua.';
  
  //const similarity: number = cosineSimilarity(string1, string2);
  
  export default cosineSimilarity;
  