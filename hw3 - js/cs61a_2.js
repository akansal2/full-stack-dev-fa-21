function make_repeater(func, n){
    /*
		Return the function that computes the nth application of func.

    >>> add_three = make_repeater(increment, 3)
    >>> add_three(5)
    8
    >>> make_repeater(triple, 5)(1) # 3 * 3 * 3 * 3 * 3 * 1
    243
    >>> make_repeater(square, 2)(5) # square(square(5))
    625
    >>> make_repeater(square, 4)(5) # square(square(square(square(5))))
    152587890625
    >>> make_repeater(square, 0)(5) # Yes, it makes sense to apply the function zero times!
    5
    */
    var lambda = function (x) {
        let total = n;
        for (let i = 0; i < x; i++) {
            total = func(total);
        }
        return total;
    }
    return lambda;
}

function num_eights(pos){
    /* Returns the number of times 8 appears as a digit of pos.

    >>> num_eights(3)
    0
    >>> num_eights(8)
    1
    >>> num_eights(88888888)
    8
    >>> num_eights(2638)
    1
    >>> num_eights(86380)
    2
    >>> num_eights(12345)
    0
    >>> from construct_check import check
    >>> # ban all assignment statements
    >>> check(HW_SOURCE_FILE, 'num_eights',
    ...       ['Assign', 'AugAssign'])
    True
    */
    let total = 0;
    let num = pos;
    while (num > 0) {
        if (num % 10 == 8) {
            total += 1;
        }
        num = Math.floor(num / 10);
    }
    return total;
}

function pingpong(n){
    /*
		Return the nth element of the ping-pong sequence.

    >>> pingpong(8)
    8
    >>> pingpong(10)
    6
    >>> pingpong(15)
    1
    >>> pingpong(21)
    -1
    >>> pingpong(22)
    -2
    >>> pingpong(30)
    -2
    >>> pingpong(68)
    0
    >>> pingpong(69)
    -1
    >>> pingpong(80)
    0
    >>> pingpong(81)
    1
    >>> pingpong(82)
    0
    >>> pingpong(100)
    -6
    >>> from construct_check import check
    >>> # ban assignment statements
    >>> check(HW_SOURCE_FILE, 'pingpong', ['Assign', 'AugAssign'])
    True
    */
    let total = 0;
    let additions = true;
    for (let i = 1; i <= n; i++) {
        if (additions) {
            total += 1;
        } else {
            total -= 1;
        }
        let change = num_eights(i) > 0 || i % 8 == 0;
        if (change) {
            additions = !additions;
        }
    }
    return total;
}

function missing_digits(n){
    /* Given a number a that is in sorted, increasing order,
    return the number of missing digits in n. A missing digit is
    a number between the first and last digit of a that is not in n.
    >>> missing_digits(1248) # 3, 5, 6, 7
    4
    >>> missing_digits(19) # 2, 3, 4, 5, 6, 7, 8
    7
    >>> missing_digits(1122) # No missing numbers
    0
    >>> missing_digits(123456) # No missing numbers
    0
    >>> missing_digits(3558) # 4, 6, 7
    3
    >>> missing_digits(35578) # 4, 6
    2
    >>> missing_digits(12456) # 3
    1
    >>> missing_digits(16789) # 2, 3, 4, 5
    4

    >>> missing_digits(4) # No missing numbers between 4 and 4
    0
    >>> from construct_check import check
    >>> # ban while or for loops
    >>> check(HW_SOURCE_FILE, 'missing_digits', ['While', 'For'])
    True
    */
    let upper = n % 10;
    let num = n;
    let missing = 0;
    while (num > 0) {
        if (num % 10 == upper) {
            upper -= 1;
            num = Math.floor(num / 10);
        } else if (num % 10 < upper) {
            missing += 1;
            upper -= 1;
        } else {
            num = Math.floor(num / 10);
        }
    }
    return missing;
}

function get_next_coin(coin){
    /* Return the next coin. 
    >>> get_next_coin(1)
    5
    >>> get_next_coin(5)
    10
    >>> get_next_coin(10)
    25
    >>> get_next_coin(2) # Other values return None
    */
    const arr = [1, 5, 10, 25];
    let index = arr.findIndex(function findVal (x) {return x == coin});
    if (index == -1 || index == arr.length - 1) {
        return null;
    } else {
        return arr[index + 1];
    }
}

function count_coins(change){
    /* Return the number of ways to make change using coins of value of 1, 5, 10, 25.
    >>> count_coins(15)
    6
    >>> count_coins(10)
    4
    >>> count_coins(20)
    9
    >>> count_coins(100) # How many ways to make change for a dollar?
    242
    >>> from construct_check import check
    >>> # ban iteration
    >>> check(HW_SOURCE_FILE, 'count_coins', ['While', 'For'])                                          
    True
    */
    return helper_coin(change, [1, 5, 10, 25]);
}

function helper_coin(change, coins) {
    if (change < 0) {
        return 0;
    } else if (change == 0) {
        return 1;
    }
    let total = 0;
    for (var item in coins) {
        total += helper_coin(change - coins[item], coins.slice(item));
    }
    return total;

}
