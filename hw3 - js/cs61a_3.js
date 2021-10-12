
function num_sevens(n){
    /*
    */
    if (n == 0) {
        return 0;
    } else if (n % 10 == 7) {
        return 1 + num_sevens(Math.floor(n / 10));
    } else {
        return num_sevens(Math.floor(n / 10));
    }
}

function pingpong(n){
    return pingpongHelper(1, n, 1, true)
}

function pingpongHelper(index, n, amt, adds) {
    if (index == n) {
        return amt;
    }
    if (adds) {
        return pingpongHelper(index + 1, n, amt + 1, !(num_sevens(index) > 0 || index % 7 == 0));
    } else {
        return pingpongHelper(index + 1, n, amt - 1, num_sevens(index) > 0 || index % 7 == 0);
    }
}

function count_change(amount){
    /*
    */
    // *** YOUR CODE HERE ***
    return helper_change(change, [1, 5, 10, 25]);
}

function helper_change(change, coins) {
    if (change < 0) {
        return 0;
    } else if (change == 0) {
        return 1;
    }
    let total = 0;
    for (var item in coins) {
        total += helper_change(change - coins[item], coins.slice(item));
    }
    return total;

}
