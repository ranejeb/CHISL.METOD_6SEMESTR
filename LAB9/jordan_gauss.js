const {
  swap_rows,
  print_matrix,
  clone,
  generate_square_matrix,
  extend_matrix,
  extract_last_column_from,
  reverse,
  extract_last_n_columns,
  extract_square_matrix_from,
} = require("./utils");

const DEBUG_INFO = true;

function resolve(matrix) {

  const height = matrix.length;
  const width = matrix[0].length;

  // 1 шаг
  for (
    let foundation_row_index = 0;
    foundation_row_index < height;
    foundation_row_index++
  ) {
    // 2 шаг
    if (matrix[foundation_row_index][foundation_row_index] === 0) {
      for (let i = 1; i < height; i++) {
        if (matrix[i][foundation_row_index] !== 0) {
          swap_rows(matrix, foundation_row_index, i);
          break;
        }
      }
    }

    // 3 шаг
    let not_zero_element_index = -1;
    for (let i = 0; i < width; i++) {
      if (matrix[foundation_row_index][i] !== 0) {
        not_zero_element_index = i;
        break;
      }
    }

    const normalizer = matrix[foundation_row_index][not_zero_element_index];
    for (let i = 0; i < width; i++) {
      matrix[foundation_row_index][i] /= normalizer;
    }
    print_matrix(matrix);
    // 4 шаг
    for (let i = foundation_row_index + 1; i < height; i++) {
      const foundation_row_multiplier = matrix[i][foundation_row_index];
      for (let j = 0; j < width; j++) {
        matrix[i][j] -=
          matrix[foundation_row_index][j] * foundation_row_multiplier;
      }
    }
  }

  if (DEBUG_INFO) {
    print_matrix(matrix);
  }
  return matrix;
}

function jordan_gauss(matrix) {
  console.log('GORDAN-GAUSS')
  print_matrix(matrix);
  resolve(matrix);
  // ШАГ 7 обратный ход
  //что бы не переписывать код, инверсируем матрицу
  let temp_matrix = generate_square_matrix(matrix.length);
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      temp_matrix[matrix.length - i - 1][matrix.length - j - 1] = matrix[i][j];
    }
  }

  temp_matrix = extend_matrix(
    temp_matrix,
    reverse(extract_last_n_columns(matrix, matrix.length))
  );

  if (DEBUG_INFO) {
//    console.log("после прямого прохода");
    print_matrix(temp_matrix);
  }
  resolve(temp_matrix);

  const result = extend_matrix(
    extract_square_matrix_from(temp_matrix),
    reverse(extract_last_n_columns(temp_matrix, matrix.length))
  )
  if (DEBUG_INFO) {
    print_matrix(result);
  }

    const height = result.length;
  for (let i = 0;i < height; i++) {
            console.log(result[i][result[i].length - 1])
        }

  return result
}

module.exports = {
  jordan_gauss,
}