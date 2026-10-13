"use strict";
/**
 * Правила стайлгайда ДелоТрек, которые проверяются автоматически.
 * Каждое сообщение начинается с кода правила из руководства.
 * Слова в кавычках-ёлочках не проверяются: так в тексте упоминают примеры.
 */
const L = "А-Яа-яЁёA-Za-z";
const word = (body) => new RegExp(`(?<![${L}])(?:${body})(?![${L}])`, "g");

const PATTERNS = [
  { re: word("[Дд]анн(?:ый|ая|ое|ого|ому|ой|ую|ом)"), msg: "СТ-5: канцелярит «данный». Замените на «этот»." },
  { re: word("[Оо]существ[а-яё]*"), msg: "СТ-5: канцелярит «осуществлять». Используйте конкретный глагол." },
  { re: word("[Пп]роизв(?:ести|одить|одит|одится|едено|одят)"), msg: "СТ-5: канцелярит «производить». Используйте конкретный глагол." },
  { re: word("[Яя]вля(?:ется|ются)"), msg: "СТ-5: «является» — канцелярит. Используйте тире или перестройте предложение." },
  { re: word("[Дд]ля того,? чтобы"), msg: "СТ-5: замените «для того чтобы» на «чтобы»." },
  { re: word("[Вв] случае,? если"), msg: "СТ-5: замените «в случае если» на «если»." },
  { re: word("[Нн]еобходимо"), msg: "СТ-5: замените «необходимо» на «нужно»." },
  { re: word("[Вв] настоящее время"), msg: "СТ-5: замените «в настоящее время» на «сейчас»." },
  { re: word("[Сс]тоит отметить|[Кк]ак известно|[Нн]а самом деле|[Вв] целом"), msg: "СТ-7: вводная фраза без смысла. Удалите её." },
  { re: new RegExp(`(?<![${L}])(?:кликн(?!ите|уть)[а-яё]*|клика[а-яё]*|юзер[а-яё]*|таск(?:а|и|у|ой|ам|ами|ах)?|тикет[а-яё]*|апдейт[а-яё]*|пофикс[а-яё]*|пофикш[а-яё]*|баг(?:а|и|ов|ом|у|ами|ах)?|галочк[а-яё]*)(?![${L}])`, "gi"), msg: "ГЛ-1: жаргон. Замените слово по словарю в разделе «Словарь и глоссарий»." },
  { re: new RegExp(`(?<![${L}])[А-ЯЁ]{5,}(?![${L}])`, "g"), msg: "ОФ-5: не выделяйте текст заглавными буквами." },
  { re: /(?<![\w.])v\d+(?:\.\d+)*/g, msg: "ТР-3: номер версии пишите без буквы «v»." },
  { re: /!/g, msg: "СТ-2: не используйте восклицательный знак." },
  { re: /"/g, msg: "ОП-2: используйте кавычки-ёлочки «» вместо прямых." },
  { re: /\s(?:-|--)\s/g, msg: "ОП-3: между словами ставьте тире «—», а не дефис." },
];

const POLITE = word("Вы|Вас|Вам|Вами|Ваш[а-яё]*");

function insideGuillemets(text, index) {
  const before = text.slice(0, index);
  const open = (before.match(/«/g) || []).length;
  const close = (before.match(/»/g) || []).length;
  return open > close;
}

module.exports = function (context) {
  const { Syntax, RuleError, report, getSource, locator } = context;
  return {
    [Syntax.Str](node) {
      const text = getSource(node);
      for (const { re, msg } of PATTERNS) {
        re.lastIndex = 0;
        let m;
        while ((m = re.exec(text)) !== null) {
          if (insideGuillemets(text, m.index)) continue;
          report(node, new RuleError(msg, { padding: locator.range([m.index, m.index + m[0].length]) }));
        }
      }
      POLITE.lastIndex = 0;
      let m;
      while ((m = POLITE.exec(text)) !== null) {
        const before = text.slice(0, m.index);
        const sentenceStart = before.trim() === "" || /[.!?…»:]\s*$/.test(before);
        if (sentenceStart || insideGuillemets(text, m.index)) continue;
        report(node, new RuleError("СТ-1: пишите «вы» со строчной буквы.", {
          padding: locator.range([m.index, m.index + m[0].length]),
        }));
      }
    },
  };
};
