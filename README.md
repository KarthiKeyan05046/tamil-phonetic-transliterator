# Tamil Transliterator

A TypeScript library for converting Tamil text to English transliteration. This package provides accurate and context-aware transliteration of Tamil characters to their English equivalents.


![Tamil Transliteration Example](https://i0.wp.com/indiannewslink.co.nz/wp-content/uploads/2022/11/gy.jpg?resize=425%2C269&ssl=1)

## Features

- Converts Tamil text to English transliteration
- Handles complex Tamil grammar rules
- Supports special cases and compound characters
- Context-aware transliteration
- Object-level conversion support
- TypeScript support with full type definitions.

## Installation

```bash
npm install tamil-transliterator
# or
yarn add tamil-transliterator
```

## Usage

### Basic Text Transliteration

```typescript
import translite from 'tamil-transliterator';

const tamilText = "வணக்கம்";
const englishText = translite(tamilText);
console.log(englishText); // Output: "vanakkam"
```

### Converting Objects

```typescript
import { convertTamilObjectToEnglish } from 'tamil-transliterator';

const tamilObject = {
  greeting: "வணக்கம்",
  name: "ராஜா",
  message: "நல்வரவு"
};

const englishObject = convertTamilObjectToEnglish(tamilObject);
console.log(englishObject);
// Output:
// {
//   greeting: "vanakkam",
//   name: "raaja",
//   message: "nalvaravu"
// }
```

## API

### `translite(tamilText: string): string`

Converts Tamil text to English transliteration.

- **Parameters:**
  - `tamilText`: The Tamil text to transliterate
- **Returns:** The transliterated English text

### `convertTamilObjectToEnglish(obj: Record<string, string>): Record<string, string>`

Converts an object containing Tamil text values to English transliteration.

- **Parameters:**
  - `obj`: An object with Tamil text values
- **Returns:** A new object with transliterated English values

## Features

- Handles all Tamil vowels and consonants
- Supports special characters and punctuation
- Maintains proper Tamil grammar rules
- Handles compound characters and special cases
- Preserves spaces and formatting
- TypeScript support with full type definitions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this package in your projects.

## Support

If you encounter any issues or have questions, please open an issue in the GitHub repository.
