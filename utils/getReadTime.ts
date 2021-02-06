const AVERAGE_WORDS_PER_MINUTE = 200;

const removeWhiteSpace = (value: string) =>
  value.replace(/^\s+/, '').replace(/\s+$/, '');

const stripHTMLtags = (value: string) => {
  const pattern = '<\\w+(\\s+("[^"]*"|\\\'[^\\\']*\'|[^>])+)?>|<\\/\\w+>';
  const regex = new RegExp(pattern, 'gi');

  return value.replace(regex, '');
};

const getWordsReadTime = (value: string, wordsPerMinute: number) => {
  const pattern = '\\w+';
  const reg = new RegExp(pattern, 'g');

  const wordCount = (value.match(reg) || []).length;
  const wordTime = wordCount / wordsPerMinute;

  return {
    wordCount,
    wordTime,
  };
};

const getHumanReadableTime = (time: number) => {
  if (time < 0.5) {
    return 'Less than a minute';
  } else if (time >= 0.5 && time < 1.5) {
    return '1 min read';
  } else {
    return `${Math.ceil(time)} min read`;
  }
};

export const getReadTime = (
  value: string,
  wordsPerMinute = AVERAGE_WORDS_PER_MINUTE,
) => {
  const stripped = stripHTMLtags(removeWhiteSpace(value));
  const { wordCount, wordTime } = getWordsReadTime(stripped, wordsPerMinute);

  return {
    readingDuration: getHumanReadableTime(wordTime),
    wordCount,
    wordTime,
  };
};
