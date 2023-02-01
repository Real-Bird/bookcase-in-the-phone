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
