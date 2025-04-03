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

          for (let i = 0; i < arrayLetters.length; i++) {
            if (i === 0 && arrayLetters[i] === ' ') {
              arrayLetters.splice(i, 1);
              i--;
              continue;
            }

            if (i === arrayLetters.length - 1 && arrayLetters[i] === ' ') {
              newResult = newResult.slice(0, -1);
              arrayLetters.splice(i, 1);
              i -= 2;
              continue;
            }

            newResult += arrayLetters[i];
          }
        }

        if (arrayLetters.includes(',')) {
          for (let i = 0; i < arrayLetters.length; i++) {
            if (i === 0 && arrayLetters[i] === ' ') {
              arrayLetters.splice(i, 1);
              i--;
              continue;
            }

            newResult = arrayLetters.slice(0).join('');
            break;
          }
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
