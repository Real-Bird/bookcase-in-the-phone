export function cls(...classnames: string[]) {
  return classnames.join(" ");
}

export function setSubject(subject: string) {
  switch (subject) {
    case "0":
      return "총류";
    case "1":
      return "철학";
    case "2":
      return "종교";
    case "3":
      return "사회학";
    case "4":
      return "자연과학";
    case "5":
      return "기술과학";
    case "6":
      return "예술";
    case "7":
      return "언어";
    case "8":
      return "문학";
    case "9":
      return "역사";
    default:
      return "-";
  }
}

function ch2pattern(ch: string) {
  const offset = 44032;

  if (/[가-힣]/.test(ch)) {
    const chCode = ch.charCodeAt(0) - offset;

    if (chCode % 28 > 0) {
      return ch;
    }
    const begin = Math.floor(chCode / 28) * 28 + offset;
    const end = begin + 27;
    return `[\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
  }

  if (/[ㄱ-ㅎ]/.test(ch)) {
    const con2syl: { [key: string]: number } = {
      ㄱ: "가".charCodeAt(0),
      ㄲ: "까".charCodeAt(0),
      ㄴ: "나".charCodeAt(0),
      ㄷ: "다".charCodeAt(0),
      ㄸ: "따".charCodeAt(0),
      ㄹ: "라".charCodeAt(0),
      ㅁ: "마".charCodeAt(0),
      ㅂ: "바".charCodeAt(0),
      ㅃ: "빠".charCodeAt(0),
      ㅅ: "사".charCodeAt(0),
    };
    const begin =
      con2syl[ch] || (ch.charCodeAt(0) - 12613) * 588 + con2syl["ㅅ"];
    const end = begin + 587;
    return `[${ch}\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
  }

  return escapeRegExp(ch);
}

export function createFuzzyMatcher(input: string) {
  const pattern = input.split("").map(ch2pattern).join(".*?");
  return new RegExp(pattern);
}

const reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
const reHasRegExpChar = RegExp(reRegExpChar.source);

function escapeRegExp(string: string) {
  return string && reHasRegExpChar.test(string)
    ? string.replace(reRegExpChar, "\\$&")
    : string || "";
}
