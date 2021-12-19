function f(x) {
    let f = Math.tan(0.5 * x + 0.1) - Math.pow(x, 2)
    //let f = Math.pow(x, 3) - 3 * x - 0.4
    return f
}

function fi(x) {
    let fi = x - Math.cos(x)
    return fi
}

function fi1(x) {
    let fi1 = Math.cos(x)
    return fi1
}

function g(x) {
    let g = 0.5 / (Math.pow(Math.cos(0.5 * x + 0.1), 2)) - 2 * x
    return g
}

//Табличный метод
function table(a, b) {
    console.log("================= Табличный метод ======================")
    let h = 0.1
    console.log("|    x     |   f(x)    |")
    for (let i = a; i <= b; i = i + h) {
        console.log("| ", a.toFixed(4), "| ", f(a).toFixed(4), " |")
        a = a + h
    }
}

//Метод половинного деления
function method1(f, a, b, e) {
    console.log("================= Метод половинного деления ======================")
    let q = -1
    while (6) {
        q++
        let c = (a + b) / 2   //step 1
        let count = (b - a) / 2
        let value = f(c.toFixed(3))

        // console.log(q, "[", a, ";", b, "]")
        if (value.toFixed(4) == 0) {
            console.log("Answer -> ", c, ", f(x) = ", value, ".") //step 2
            break;
        }
        else if (count.toFixed(4) <= e) { //step 3
            console.log("Answer -> ", c, ", f(x) = ", value, ".")
            break;
        }
        else {
            //step 4
            if ((f(a) < 0 && f(c) > 0) || (f(a) > 0 && f(c) < 0)) {
                a = a
                b = c
            }
            else if ((f(c) < 0 && f(b) > 0) || (f(c) > 0 && f(b) < 0)) {
                a = c
                b = b
            }
        }
    }
}

//Метод Ньютона
function method2(x0, f, g, e) {
    console.log("================= Метод Ньютона ======================")
    let q = -1
    let value = f(x0)
    let x1 = x0 + 10
    while (6) {
        q++
        if (value == 0) {
            console.log("Answer -> ", x0, ", f(x) = ", value, ".")
            break;
        }
        else if (Math.abs(x1 - x0) <= e) {
            console.log("Answer -> ", x1, ", f(x) = ", f(x1.toFixed(3)), ".")
            break;
        }
        else {
            a = x0
            x0 = x1
            x1 = a - f(a) / g(a)
            // console.log(x0, x1)
        }
    }
}

//Метод секущих
function method3(x0, x1, f, e) {
    console.log("================= Метод секущих ======================")
    let q = -1
    let value = f(x0)
    while (6) {
        //console.log(x0, x1)
        q++
        if (value == 0) {
            console.log("Answer -> ", x0, ", f(x) = ", value, ".")
            break;
        }
        else if (Math.abs(x1 - x0) <= e) {
            console.log("Answer -> ", x1, ", f(x) = ", f(x1.toFixed(3)), ".")
            break;
        }
        else {
            a = x0
            x0 = x1
            x1 = x1 - (f(x1) * (x1 - a)) / (f(x1) - f(a))
        }
    }
}

//Метод хорд
function method4(x0, x1, f, e) {
    console.log("================= Метод хорд ======================")
    let q = -1
    let temp = x0
    let value = f(x0)
    while (6) {
        //console.log(temp, x1)
        q++
        if (value == 0) {
            console.log("Answer -> ", x0, ", f(x) = ", value, ".")
            break;
        }
        else if (Math.abs(x1 - temp) <= e) {
            console.log("Answer -> ", x1, ", f(x) = ", f(x1.toFixed(3)), ".")
            break;
        }
        else {
            temp = x1
            x1 = x1 - (f(x1) * (x1 - x0)) / (f(x1) - f(x0))
        }
    }
}

//Метод простой итерации
function method5(x0, fi, fi1, e) {
    console.log("================= Метод простой итерации ======================")
    let q = -1
    let x1 = fi(x0)
    let value = fi(x0)
    let temp = x0
    while (6) {
        //console.log(temp, x1)
        q++
        if (value == 0) {
            console.log("Answer -> ", x0, ", f(x) = ", value, ".")
            break;
        }
        else if (Math.abs(x1 - temp) <= e) {
            console.log("Answer -> ", x1, ", f(x) = ", fi(x1.toFixed(3)), ".")
            break;
        }
        else {
            temp = x1
            x1 = fi1(temp)
        }
    }
}

module.exports = {
    table,
    f,
    fi,
    fi1,
    g,
    method1,
    method2,
    method3,
    method4,
    method5
}