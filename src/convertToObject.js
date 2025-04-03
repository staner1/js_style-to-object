'use strict';

/**
 * @param {string} sourceString
 *
 * @return {object}
 */
function convertToObject(sourceString) {
  let arrayElements = sourceString.split(';');

  arrayElements = arrayElements
    .filter((item) => item.includes(':'))
    .reduce((prev, item) => {
      const brakeIndex = item.indexOf(':');

      const keyResult = item
        .slice(0, brakeIndex)
        .replaceAll(' ', '')
        .replaceAll('\n', '')
        .replaceAll('\t', '');

      const valueResult = () => {
        const result = item.slice(brakeIndex + 1, item.length);

        let arrayLetters = result.split('');

        if (arrayLetters[0] === '\n') {
          arrayLetters.splice(0, 1);
        }

        let newResult = '';

        if (!arrayLetters.includes(',')) {
          arrayLetters = arrayLetters
            .join('')
            .replaceAll('\n', '')
            .replaceAll('"', '')
            .replaceAll('\t', '')
            .split('');

          const firstNonSpaceIndex = arrayLetters.findIndex(
            (char) => char !== ' ',
          );
          const lastNonSpaceIndex = arrayLetters.findLastIndex(
            (char) => char !== ' ',
          );

          newResult = arrayLetters
            .slice(firstNonSpaceIndex, lastNonSpaceIndex + 1)
            .join('');
        }

        if (arrayLetters.includes(',')) {
          const filterCallback = (letter, index) => {
            return index >= arrayLetters.findIndex((char) => char !== ' ');
          };

          newResult = arrayLetters.filter(filterCallback).join('');
        }

        return newResult;
      };

      return {
        ...prev,
        [keyResult]: `${valueResult()}`,
      };
    }, {});

  return arrayElements;
}

module.exports = convertToObject;
