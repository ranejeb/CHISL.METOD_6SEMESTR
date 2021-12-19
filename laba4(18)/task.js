function matrix() {
    // return [[11, -9, -21],
    // [-4, 15, 22],
    // [2, 0, 4]]

    // return [[-16, -100, -190],
    // [96, 380, 704],
    // [-48, -182, -336]]

    return [[9, 11, 6],
    [-10, -14, -8],
    [3, 5.5, 3]]
}

function generate_vector(size) {
    let vector = []
    for (let i = 0; i < size; i++) {
        vector.push(0)
    }
    return vector;
}

function multiplyVectors(V1, V2) {
    const n = V1.length
    const m = V2.length

    const M = new Array(n)

    for (let i = 0; i < n; i++) {
        M[i] = new Array(m)
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            M[i][j] = V1[i] * V2[j]
        }
    }

    return M
}

function multiply_matrix_on_scalar(matrix, scalar) {
    const result = clone(matrix)
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            result[i][j] *= scalar
        }
    }
    return result;
}

function generate_identity_matrix(size) {
    const matrix = generate_square_matrix(size);
    for (let i = 0; i < matrix.length; i++) {
        matrix[i][i] = 1;
    }
    return matrix
}

function generate_square_matrix(size) {
    let matrix = []
    for (let i = 0; i < size; i++) {
        matrix.push(generate_vector(size));
    }
    return matrix;
}

function clone(matrix) {
    return JSON.parse(JSON.stringify(matrix))
}

function print_matrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        let row = ``
        for (let j = 0; j < matrix.length; j++) {
            row += (` ${matrix[i][j]}` + ` `)
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
                product[i][j] += a[i][k] * b[k][j]
            }
        }
    }
    return product;
}

function DiffMatrixs(A, B) {
    let m = A.length,
        n = A[0].length,
        C = []
    for (let i = 0; i < m; i++) {
        C[i] = []
        for (let j = 0; j < n; j++) {
            C[i][j] = A[i][j] - B[i][j]
        }
    }
    return C
}

function vector_w(matrix, k, S, n, M) {
    const w = new Array(n)

    for (let i = 0; i < matrix.length; i++) {
        if (i < k) {
            w[i] = 0
        } else if (i === k) {
            w[i] = matrix[i][k] - S
        } else {
            w[i] = matrix[i][k]
        }
    }

    return w.map((item) => item * M)
}

function methodQR(matrix, e) {
    let count = 1
    let A = clone(matrix)
    let Q = generate_identity_matrix(matrix.length)
    let R = generate_identity_matrix(matrix.length)
    while (6) {
        console.log("Итерация №", count)

        for (let i = 0; i < A.length - 1; i++) {

            let s = 0
            for (let j = i; j < A.length; j++) {
                s += Math.pow(A[j][i], 2)
            }
            s = Math.sqrt(s)
            console.log("s =", s)

            let m = (2 * s * (s - A[i][i])) ** (-1 / 2)
            console.log("m =", m)
            let w = vector_w(A, i, s, A.length, m)
            console.log("w =", w)

            let E = generate_identity_matrix(w.length)
            let h = multiplyVectors(w, w)
            h = multiply_matrix_on_scalar(h, 2)
            h = DiffMatrixs(E, h)
            console.log("Matrix h")
            print_matrix(h)

            A = multiplyMatrices(h, A)

            Q = multiplyMatrices(Q, h)
        }

        R = clone(A)

        A = multiplyMatrices(R, Q)

        console.log("Matrix R")
        print_matrix(R)
        console.log("Matrix Q")
        print_matrix(Q)
        console.log("Matrix A")
        print_matrix(A)
        count++

        let sum = 0
        for (let i = 0; i < A.length; i++) {
            for (let j = 0; j < A.length; j++) {
                if (j < i) {
                    sum += A[i][j] ** 2
                }
            }
        }

        if (Math.sqrt(sum) < e) {
            break
        }

        Q = generate_identity_matrix(matrix.length)
    }
}


module.exports = { methodQR, matrix }