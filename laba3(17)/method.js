function getcos(z) {
	let cos = Math.sqrt((1 + z) / 2)
	return cos
}

function getsin(z, e) {
	let sin = e * Math.sqrt((1 - z) / 2)
	return sin
}

function getEps(matrix, i, k) {
	let e = 0
	if (matrix[i][i] == matrix[k][k]) {
		if (matrix[i][k] > 0) e = 1
		else e = -1
	} else {
		if (((matrix[i][i] - matrix[k][k]) / matrix[i][k]) > 0) e = 1
		else e = (-1)
	}
	return e
}

function getZ(matrix, i, k) {
	let z = Math.sqrt(1 - (Math.pow(2 * matrix[i][k], 2)) / (Math.pow((matrix[i][i] - matrix[k][k]), 2) + Math.pow(2 * matrix[i][k], 2)))
	return z
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

function print_matrix(matrix) {
	for (let i = 0; i < matrix.length; i++) {
		let row = ``
		for (let j = 0; j < matrix.length; j++) {
			row += (` ${matrix[i][j]}` + ` `)
		}
		console.log(row)
	}
}

function clone(matrix) {
	return JSON.parse(JSON.stringify(matrix))
}

function matrixB(matrix, cos, sin, i, k) {
	let B = clone(matrix)

	B[i][i] = Math.pow(cos, 2) * matrix[i][i] + Math.pow(sin, 2) * matrix[k][k] + 2 * cos * sin * matrix[i][k]
	B[k][k] = Math.pow(sin, 2) * matrix[i][i] + Math.pow(cos, 2) * matrix[k][k] - 2 * cos * sin * matrix[i][k]
	B[i][k] = 0
	B[k][i] = 0

	for (let j = 0; j < matrix.length; j++) {
		if (j == i || j == k) continue
		B[i][j] = cos * matrix[j][i] + sin * matrix[j][k]
		B[j][i] = cos * matrix[j][i] + sin * matrix[j][k]
		B[k][j] = -1 * sin * matrix[j][i] + cos * matrix[j][k]
		B[j][k] = -1 * sin * matrix[j][i] + cos * matrix[j][k]
	}
	return B
}

function matrixT(cos, sin, i, k) {
	let T = [[1, 0, 0, 0],
	[0, 1, 0, 0],
	[0, 0, 1, 0],
	[0, 0, 0, 1]]

	T[i][i] = cos
	T[i][k] = -1 * sin
	T[k][i] = sin
	T[k][k] = cos

	return T
}

function method(matrix, eps) {
	let count = 1

	let matrix1 = [[1, 0, 0, 0],
	[0, 1, 0, 0],
	[0, 0, 1, 0],
	[0, 0, 0, 1]]

	let B = clone(matrix)
	let T1 = clone(matrix1)

	while (count < 100) {
		let sum = 0
		for (let i = 0; i < B.length; i++) {
			for (let j = i + 1; j < B.length; j++) {
				sum = sum + Math.pow(B[i][j], 2)
			}
		}

		if (Math.sqrt(sum) > eps) {
			console.log("sum =", Math.sqrt(sum))
			console.log("Итерация №", count)

			let max = -1
			let l = -1
			let k = -1
			for (let i = 0; i < B.length; i++) {
				for (let j = i + 1; j < B.length; j++) {
					if (Math.abs(B[i][j]) > max) {
						max = Math.abs(B[i][j])
						l = i
						k = j
					}
				}
			}
			console.log("i =", l + 1, "k =", k + 1)

			let z = getZ(B, l, k)
			let e = getEps(B, l, k)
			let cos = getcos(z)
			let sin = getsin(z, e)

			let T = matrixT(cos, sin, l, k)
			T1 = multiplyMatrices(T1, T)
			B = matrixB(B, cos, sin, l, k)

			console.log("\t\tMatrix B")
			print_matrix(B)
			console.log("\t\tMatrix T")
			print_matrix(T)
			count++
			console.log("***********************************")
		}
		else {
			console.log("sum =", Math.sqrt(sum))
			break
		}
	}

	console.log("Матрица собственных векторов")
	print_matrix(T1)
	console.log("----------------------------")
	console.log("Matrix B")
	print_matrix(B)
}

module.exports = method