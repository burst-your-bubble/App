var linq = require('linq');

export function sortArticles(score, articles) {
    let L = linq.from(articles)
        .where(article => article.stance == "L")
        .select(item => item)
        .toArray();
    let R = linq.from(articles)
        .where(article => article.stance == "R")
        .select(item => item)
        .toArray();
    let C = linq.from(articles)
        .where(article => article.stance == "C")
        .select(item => item)
        .toArray();

    let sorted;

    if (L.length >= 3 && R.length >= 3 && C.length >= 2) {
        //far left
        if (score <= -0.75)
            sorted = getArticles(L, 1, R, 2, C, 2);
        //liberal
        else if (score > -0.75 && score < -0.25)
            sorted = getArticles(L, 1, R, 3, C, 1);
        // central / swing
        else if (score >= -0.25 && score <= 0.25) {
            var distribution = [2,2,1];
            distribution = shuffle(distribution);
            sorted = getArticles(L, distribution[0], R, distribution[1], C, distribution[2]);
        }
        // conservatives
        else if (score > 0.25 && score < 0.75)
            sorted = getArticles(L, 3, R, 1, C, 1);
        // far right
        else
            sorted = getArticles(L, 2, R, 1, C, 2);
    }

    else {
        sorted = shuffle(L.concat(C).concat(R));
    }

    //console.log(sorted);
    return sorted;
}

function getArticles(left, l, right, r, center, c) {
    var sortedL, sortedR, sortedC;
    sortedL = (getNArticles(left, l));
    sortedR = (getNArticles(right, r));
    sortedC = (getNArticles(center, c));

    return shuffle(sortedL.concat(sortedR).concat(sortedC));
}

function getNArticles(articles, n) {
    var result = new Array(n),
        len = articles.length,
        taken = new Array(len);

    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");

    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = articles[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }

    return result;
}

//using Fisher–Yates Shuffle
function shuffle(array) {
    var elements = array.length, shuffleElement, remainingElement;

    while (elements) {
        remainingElement = Math.floor(Math.random() * elements--);

        shuffleElement = array[elements];
        array[elements] = array[remainingElement];
        array[remainingElement] = shuffleElement
    }

    return array;
}