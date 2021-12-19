function matrix() {
    // let matrix = [[1, 0.5, 1.2, -1],
    // [0.5, 2, -0.5, 0],
    // [1.2, -0.5, -1, 1.4],
    // [-1, 0, 1.4, 1]]

    // return [[2.2, 1, 0.5, 2],
    // [1, 1.3, 2, 1],
    // [0.5, 2, 0.5, 1.6],
    // [2, 1, 1.6, 2]]
    return [[2, 1, 1],
    [1, 2.5, 1],
    [1, 1, 3]]
}

function print_matrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        let row = ``
        for (let j = 0; j < matrix.length; j++) {
            row += (` ${matrix[i][j].toFixed(4)}` + ` `)
        }
        console.log(row)
    }
}

function multiplyMatrices(a, b) {
    let x = a.length,
        z = a[0].length,
        y = b[0].length;
    let productRow = Array.apply(null, new Array(y)).map(Number.prototype.valueOf, 0);
    let product = new Array(x);
    for (let p = 0; p < x; p++) {
        product[p] = productRow.slice();
    }
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            for (let k = 0; k < z; k++) {
                product[i][j] += a[i][k] * b[k][j];
            }
        }
    }
    return product;
}

// function methodD(matrix) {
//     let count = 1

//     let matrix_A = matrix

//     while (count < matrix.length) {
//         let matrix_M = [[1, 0, 0, 0],
//         [0, 1, 0, 0],
//         [0, 0, 1, 0],
//         [0, 0, 0, 1]]

//         let matrix_M1 = [[1, 0, 0, 0],
//         [0, 1, 0, 0],
//         [0, 0, 1, 0],
//         [0, 0, 0, 1]]

//         for (let i = 0; i < matrix_A.length; i++) {
//             for (let j = 0; j < matrix_A.length; j++) {
//                 let value = matrix_A.length
//                 if (i == matrix_A.length - count - 1) {
//                     if (i == j) {
//                         matrix_M[i][value - count - 1] = 1 / matrix_A[value - count][value - count - 1]
//                     }
//                     else {
//                         matrix_M[i][j] = -(matrix_A[value - count][j]) / matrix_A[value - count][value - count - 1]
//                     }
//                 }
//             }
//         }
//         console.log(count, "\n\t\tMatrix M\n", "===========================================")
//         print_matrix(matrix_M)
//         console.log(" ===========================================")

//         for (let i = 0; i < matrix_A.length; i++) {
//             for (let j = 0; j < matrix_A.length; j++) {
//                 let value = matrix_A.length
//                 if (i == matrix_A.length - count - 1) {
//                     matrix_M1[i][j] = matrix_A[value - count][j]
//                 }
//             }
//         }
//         console.log("\t\tMatrix M(-1)\n", "===========================================")
//         print_matrix(matrix_M1)
//         console.log(" ===========================================")

//         let temp = multiplyMatrices(matrix_M1, matrix_A)
//         matrix_A = multiplyMatrices(temp, matrix_M)

//         console.log("\t\tMatrix A\n", "===========================================")
//         print_matrix(matrix_A)
//         console.log(" ===========================================")
//         count++
//     }
//     return matrix_A
// }

function methodD1(matrix) {
    let count = 1

    let matrix_A = matrix
    let result = [[], [], [], []]

    while (count < matrix.length) {
        let matrix_M = [[1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]]

        let matrix_M1 = [[1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]]

        for (let i = 0; i < matrix_A.length; i++) {
            for (let j = 0; j < matrix_A.length; j++) {
                let value = matrix_A.length
                if (i == matrix_A.length - count - 1) {
                    if (i == j) {
                        matrix_M[i][value - count - 1] = 1 / matrix_A[value - count][value - count - 1]
                    }
                    else {
                        matrix_M[i][j] = -(matrix_A[value - count][j]) / matrix_A[value - count][value - count - 1]
                    }
                }
            }
        }
        console.log("Итерация №", count, "\n\t\tMatrix M\n", "===========================================")
        print_matrix(matrix_M)
        console.log(" ===========================================")

        for (let i = 0; i < matrix_A.length; i++) {
            for (let j = 0; j < matrix_A.length; j++) {
                let value = matrix_A.length
                if (i == matrix_A.length - count - 1) {
                    matrix_M1[i][j] = matrix_A[value - count][j]
                }
            }
        }
        console.log("\t\tMatrix M(-1)\n", "===========================================")
        print_matrix(matrix_M1)
        console.log(" ===========================================")

        let temp = multiplyMatrices(matrix_M1, matrix_A)
        matrix_A = multiplyMatrices(temp, matrix_M)

        console.log("\t\tMatrix A\n", "===========================================")
        print_matrix(matrix_A)
        console.log(" ===========================================")

        if (count > 1) {
            result = multiplyMatrices(result, matrix_M)
        }
        else {
            result = matrix_M
        }
        count++
    }
    return [matrix_A, result]
}

function f(x, matrix) {
    let f = Math.pow(x, 4) - matrix[0][0] * Math.pow(x, 3) - matrix[0][1] * Math.pow(x, 2) - matrix[0][2] * x - matrix[0][3]
    return f
}

//Метод хорд
function method4(x0, x1, f, e, matrix) {
    console.log("================= Метод хорд ======================")
    let q = -1
    let result = 0
    let temp = x0
    let value = f(x0, matrix)
    while (6) {
        //console.log(temp, x1)
        q++
        if (value == 0) {
            console.log("Answer -> ", x0, ", f(x) = ", value, ".")
            result = x0
            break;
        }
        else if (Math.abs(x1 - temp) <= e) {
            console.log("Answer -> ", x1, ", f(x) = ", f(x1.toFixed(3), matrix), ".")
            result = x1
            break;
        }
        else {
            temp = x1
            x1 = x1 - (f(x1, matrix) * (x1 - x0)) / (f(x1, matrix) - f(x0, matrix))
        }
    }
    return result
}

function s_vectors(matrix, tuple) {
    console.log("Собственные вектора и матрица Фробениуса")
    let vec = [[], [], [], []]
    for (let i = 0; i < matrix.length; i++) {
        let x = 3
        for (let j = 0; j < matrix.length; j++) {
            vec[j][i] = Math.pow(matrix[i], x)
            x = x - 1
        }
    }
    print_matrix(vec)

    let matrix0 = multiplyMatrices(tuple, vec)
    console.log("Собственные вектора и матрица A")
    print_matrix(matrix0)
}

function task1(matrix_A, f) {
    let matrix = []
    matrix[0] = method4(-2, -1, f, 0.001, matrix_A)
    matrix[1] = method4(0, 0.5, f, 0.001, matrix_A)
    matrix[2] = method4(1, 2, f, 0.001, matrix_A)
    matrix[3] = method4(5, 6, f, 0.001, matrix_A)

    // matrix[0] = method4(-2.5, -1.5, f, 0.001, matrix_A)
    // matrix[1] = method4(1.25, 1.3, f, 0.001, matrix_A)
    // matrix[2] = method4(1.3, 1.4, f, 0.001, matrix_A)
    // matrix[3] = method4(2, 2.5, f, 0.001, matrix_A)
    return matrix
}

function task2(matrix, e) {
    let y0 = [[1],
    [1],
    [1]]
    let y1 = multiplyMatrices(matrix, y0)
    let lymba0 = 10
    let lymba1 = 0
    let count = 0
    while (6) {
        if (Math.abs(lymba1.toFixed(3) - lymba0.toFixed(3)) < e) {
            console.log("Собственный ветор и собственное значение")
            console.log(y0)
            console.log(lymba1)
            break;
        }
        else {
            console.log(count)
            count++
            y0 = y1
            y1 = multiplyMatrices(matrix, y0)
            lymba0 = lymba1
            lymba1 = y1[0][0] / y0[0][0]
            // console.log(y0, y1, lymba0, lymba1, "*************\n")
        }
    }
}

module.exports = {
    matrix,
    print_matrix,
    multiplyMatrices,
    f,
    task1,
    s_vectors,
    methodD1,
    task2
}