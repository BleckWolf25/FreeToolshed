/**
 * @file toolsRegistry.ts
 *
 * @version 2.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Master registry containing definitions, icons, categories, short summaries, and route paths for all 21 tools
 *
 * @description
 * Serves as the central metadata registry mapping tool identifiers to routes, component names,
 * descriptions, short summaries, categories, and search tags.
 *
 * @since 01/08/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import {
  CodeOutlined,
  FileSyncOutlined,
  LinkOutlined,
  FontSizeOutlined,
  KeyOutlined,
  SafetyCertificateOutlined,
  LockOutlined,
  NumberOutlined,
  ExperimentOutlined,
  FileTextOutlined,
  BgColorsOutlined,
  QrcodeOutlined,
  CompressOutlined,
  DiffOutlined,
  ScheduleOutlined,
  ClockCircleOutlined,
  TableOutlined,
  PictureOutlined,
  AudioOutlined,
  BorderOutlined
} from '@ant-design/icons-vue';

export interface ToolItem {
  id: string;
  name: string;
  shortDesc: string;
  description: string;
  path: string;
  component: string;
  icon: any;
  category: string;
  tags: string[];
}

// ---------- TOOL REGISTRY
export const toolsRegistry: ToolItem[] = [
  {
    id: 'json-formatter',
    name: 'JSON Formatter & Validator',
    shortDesc: 'Format & Validate JSON',
    description:
      'Format, minify, validate, and inspect JSON documents with detailed error details.',
    path: '/tools/json-formatter',
    component: 'JsonFormatter',
    icon: CodeOutlined,
    category: 'Formatters & Parsers',
    tags: ['json', 'format', 'minify', 'validate', 'prettify', 'beautify']
  },
  {
    id: 'base64-converter',
    name: 'Base64 Encoder & Decoder',
    shortDesc: 'Encode & Decode Base64',
    description: 'Convert text and binary files to Base64 format and decode Base64 data strings.',
    path: '/tools/base64-converter',
    component: 'Base64Converter',
    icon: FileSyncOutlined,
    category: 'Encoders & Decoders',
    tags: ['base64', 'encode', 'decode', 'file', 'binary', 'text']
  },
  {
    id: 'url-converter',
    name: 'URL Encoder & Decoder',
    shortDesc: 'Encode & Decode URLs',
    description: 'Encode/decode URLs and inspect query parameters, protocol, hostname, and path.',
    path: '/tools/url-converter',
    component: 'UrlConverter',
    icon: LinkOutlined,
    category: 'Encoders & Decoders',
    tags: ['url', 'encode', 'decode', 'uri', 'params', 'query']
  },
  {
    id: 'text-case-converter',
    name: 'Text Case Converter',
    shortDesc: 'Transform Text Case',
    description:
      'Transform text to UPPERCASE, lowercase, camelCase, snake_case, kebab-case, PascalCase, etc.',
    path: '/tools/text-case-converter',
    component: 'TextCaseConverter',
    icon: FontSizeOutlined,
    category: 'Text & Code',
    tags: ['text', 'case', 'camelcase', 'snake_case', 'kebab-case', 'pascalcase', 'uppercase']
  },
  {
    id: 'password-generator',
    name: 'Strong Password Generator',
    shortDesc: 'Generate Secure Passwords',
    description:
      'Generate secure random passwords with configurable length, character sets, and entropy score.',
    path: '/tools/password-generator',
    component: 'PasswordGenerator',
    icon: KeyOutlined,
    category: 'Generators',
    tags: ['password', 'generator', 'security', 'random', 'secret']
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator (MD5, SHA)',
    shortDesc: 'Calculate Cryptographic Hashes',
    description:
      'Calculate cryptographic checksums including MD5, SHA-1, SHA-256, and SHA-512 for text/files.',
    path: '/tools/hash-generator',
    component: 'HashGenerator',
    icon: SafetyCertificateOutlined,
    category: 'Generators',
    tags: ['hash', 'md5', 'sha1', 'sha256', 'sha512', 'crypto', 'checksum']
  },
  {
    id: 'jwt-decoder',
    name: 'JWT Token Decoder',
    shortDesc: 'Decode JWT Claims',
    description:
      'Decode JSON Web Token headers and payloads with expiration status and signature validation.',
    path: '/tools/jwt-decoder',
    component: 'JwtDecoder',
    icon: LockOutlined,
    category: 'Encoders & Decoders',
    tags: ['jwt', 'token', 'decode', 'auth', 'bearer', 'signature']
  },
  {
    id: 'uuid-generator',
    name: 'UUID / GUID Generator',
    shortDesc: 'Generate UUID Identifiers',
    description: 'Generate version 1 and version 4 Universally Unique Identifiers in bulk.',
    path: '/tools/uuid-generator',
    component: 'UuidGenerator',
    icon: NumberOutlined,
    category: 'Generators',
    tags: ['uuid', 'guid', 'v4', 'v1', 'generator', 'random']
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester & Evaluator',
    shortDesc: 'Test Regular Expressions',
    description:
      'Test Regular Expressions in real-time with group capture breakdown and cheat sheet.',
    path: '/tools/regex-tester',
    component: 'RegexTester',
    icon: ExperimentOutlined,
    category: 'Text & Code',
    tags: ['regex', 'regexp', 'match', 'test', 'pattern', 'expression']
  },
  {
    id: 'markdown-converter',
    name: 'Markdown to HTML Converter',
    shortDesc: 'Convert Markdown HTML',
    description: 'Live preview GitHub-flavored Markdown and export clean HTML code.',
    path: '/tools/markdown-converter',
    component: 'MarkdownConverter',
    icon: FileTextOutlined,
    category: 'Formatters & Parsers',
    tags: ['markdown', 'md', 'html', 'preview', 'gfm', 'converter']
  },
  {
    id: 'color-converter',
    name: 'Color Code Converter & Picker',
    shortDesc: 'Convert Color Values',
    description: 'Convert between HEX, RGB, HSL, and analyze WCAG accessibility contrast ratios.',
    path: '/tools/color-converter',
    component: 'ColorConverter',
    icon: BgColorsOutlined,
    category: 'Web & Misc',
    tags: ['color', 'hex', 'rgb', 'hsl', 'picker', 'contrast', 'wcag']
  },
  {
    id: 'qrcode-generator',
    name: 'QR Code Generator',
    shortDesc: 'Generate QR Codes',
    description: 'Create customizable QR Codes for URLs/text and export as PNG or SVG images.',
    path: '/tools/qrcode-generator',
    component: 'QrCodeGenerator',
    icon: QrcodeOutlined,
    category: 'Generators',
    tags: ['qr', 'qrcode', 'barcode', 'generator', 'image', 'svg', 'png']
  },
  {
    id: 'minifier',
    name: 'Code Minifier (JSON, CSS, JS)',
    shortDesc: 'Compress Source Code',
    description: 'Minify and compress JSON, CSS, and JavaScript code to optimize payload size.',
    path: '/tools/minifier',
    component: 'Minifier',
    icon: CompressOutlined,
    category: 'Formatters & Parsers',
    tags: ['minify', 'compress', 'js', 'css', 'json', 'beautify']
  },
  {
    id: 'diff-checker',
    name: 'Text Diff Comparison',
    shortDesc: 'Compare Text Snippets',
    description:
      'Compare two text snippets side-by-side or inline to highlight additions and deletions.',
    path: '/tools/diff-checker',
    component: 'DiffChecker',
    icon: DiffOutlined,
    category: 'Text & Code',
    tags: ['diff', 'compare', 'text', 'match', 'patch', 'side-by-side']
  },
  {
    id: 'cron-explainer',
    name: 'Cron Expression Explainer',
    shortDesc: 'Explain Cron Schedules',
    description:
      'Parse cron schedules into plain human-readable sentences and view upcoming execution dates.',
    path: '/tools/cron-explainer',
    component: 'CronExplainer',
    icon: ScheduleOutlined,
    category: 'Web & Misc',
    tags: ['cron', 'schedule', 'expression', 'explain', 'crontab', 'time']
  },
  {
    id: 'unix-timestamp',
    name: 'Unix Timestamp Converter',
    shortDesc: 'Convert Epoch Timestamps',
    description:
      'Convert Unix epoch timestamps (seconds & ms) to human dates, UTC, ISO 8601, and back.',
    path: '/tools/unix-timestamp',
    component: 'UnixTimestamp',
    icon: ClockCircleOutlined,
    category: 'Web & Misc',
    tags: ['unix', 'timestamp', 'epoch', 'date', 'time', 'iso8601']
  },
  {
    id: 'yaml-parser',
    name: 'YAML / TOML / JSON Parser',
    shortDesc: 'Parse YAML TOML',
    description:
      'Parse and transform between YAML, TOML, and JSON formats with validation checking.',
    path: '/tools/yaml-parser',
    component: 'YamlParser',
    icon: CodeOutlined,
    category: 'Formatters & Parsers',
    tags: ['yaml', 'toml', 'json', 'convert', 'parser', 'validate']
  },
  {
    id: 'csv-to-json',
    name: 'CSV to JSON Converter',
    shortDesc: 'Convert CSV Spreadsheets',
    description:
      'Convert CSV spreadsheets to JSON arrays with customizable delimiters and table preview.',
    path: '/tools/csv-to-json',
    component: 'CsvToJson',
    icon: TableOutlined,
    category: 'Formatters & Parsers',
    tags: ['csv', 'json', 'excel', 'convert', 'table', 'delimiter']
  },
  {
    id: 'image-metadata',
    name: 'Image Metadata / EXIF Viewer',
    shortDesc: 'Inspect EXIF Data',
    description:
      'Inspect image properties, resolution, mime type, and EXIF camera metadata client-side.',
    path: '/tools/image-metadata',
    component: 'ImageMetadata',
    icon: PictureOutlined,
    category: 'Web & Misc',
    tags: ['image', 'metadata', 'exif', 'camera', 'dimensions', 'photo']
  },
  {
    id: 'morse-translator',
    name: 'Morse Code Translator',
    shortDesc: 'Translate Morse Code',
    description: 'Translate text to Morse code and play audio tones using Web Audio API.',
    path: '/tools/morse-translator',
    component: 'MorseTranslator',
    icon: AudioOutlined,
    category: 'Text & Code',
    tags: ['morse', 'code', 'translator', 'audio', 'sound', 'beeps']
  },
  {
    id: 'ascii-art-generator',
    name: 'ASCII Art Text Generator',
    shortDesc: 'Render ASCII Banners',
    description: 'Render text as ASCII art banners with customizable FIGlet font styles.',
    path: '/tools/ascii-art-generator',
    component: 'AsciiArtGenerator',
    icon: BorderOutlined,
    category: 'Generators',
    tags: ['ascii', 'art', 'banner', 'figlet', 'text', 'font']
  },
  {
    id: 'code-unminifier',
    name: 'Code UnMinifier & Beautifier',
    shortDesc: 'Unminify JSON CSS JS HTML SQL',
    description:
      'Format, beautify, and unminify compressed JSON, CSS, JavaScript, HTML, and SQL snippets.',
    path: '/tools/code-unminifier',
    component: 'CodeUnminifier',
    icon: CodeOutlined,
    category: 'Formatters & Parsers',
    tags: ['unminify', 'beautify', 'format', 'js', 'css', 'json', 'html', 'sql', 'prettify']
  }
];
