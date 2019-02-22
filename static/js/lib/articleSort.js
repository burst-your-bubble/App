var linq = require('linq');

export function sortArticles(score, articles, topicID) {
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
        //far left: Distribution: 2R-2C-1L
        if (score <= -0.75)
            sorted = [].concat(L[0]).concat(R.slice(0,2)).concat(C.slice(0,2));
        //liberal: Distribution: 3R-1C-1L
        else if (score > -0.75 && score < -0.25) {
            sorted = [].concat(L[0]).concat(R).concat(C[0]);
        }
        // central / swing
        // Randomly choose 5 of the 8 articles to display, save indices
        // to session storage so that order persists through page reload
        else if (score >= -0.25 && score <= 0.25) {
            var distribution = JSON.parse(window.sessionStorage.getItem(`dist-${topicID}`));
            if(!distribution) {
                distribution = [0, 1, 2, 3, 4, 5, 6, 7];
                distribution = shuffle(distribution).slice(0, 6);
                window.sessionStorage.setItem(`dist-${topicID}`, JSON.stringify(distribution));
            }
            sorted = distribution.map(i => articles[i]);
        }
        // conservatives Distribution: 3L-1C-1R
        else if (score > 0.25 && score < 0.75) {
            sorted = [].concat(L).concat(R[0]).concat(C[0]);
        }
        // far right: Distribution: 2L-2C-1R
        else {
            sorted = [].concat(L.slice(0,2)).concat(R[0]).concat(C);
        }
    }
    else {
        sorted = shuffle(L.concat(C).concat(R));
    }

    return sorted;
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