let codeDic = {
  "SKY_A01": "맑음",
  "SKY_A02": "구름 조금",
  "SKY_A03": "구름 많음",
  "SKY_A04": "구름 많음 + 비",
  "SKY_A05": "구름 많음 + 눈",
  "SKY_A06": "구름 많음 + 비 + 눈",
  "SKY_A07": "흐림",
  "SKY_A08": "흐림 + 비",
  "SKY_A09": "흐림 + 눈",
  "SKY_A10": "흐름 + 비 + 눈",
  "SKY_A11": "흐림 + 낙뢰",
  "SKY_A12": "뇌우 + 비",
  "SKY_A13": "뇌우 + 눈",
  "SKY_A14": "뇌우 + 비 + 눈"
}

let nameDic = {}

for (let key in codeDic) {
  let value = codeDic[key];
  nameDic[value] = key;
}

export default class SkyCodeConverter {
  static codeToName(code) {
    if (codeDic.hasOwnProperty(code)) {
      return codeDic[code];
    }
    return null;
  }

  static nameToCode(name) {
    if (nameDic.hasOwnProperty(name)) {
      return nameDic[name];
    }
    return null;
  }
}