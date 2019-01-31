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
    if(score > 0) {
         sorted = L.concat(C).concat(R);
    }
    else if (score < 0) {
        sorted = R.concat(C).concat(L);
    }
    else {
        sorted = R.concat(L).concat(C);
    }

    console.log(sorted);
    return sorted;
}

// articles = [
//     {
//       "id": 1, 
//       "read": false, 
//       "response": null, 
//       "stance": "R", 
//       "summary": "Several likely Democratic candidates in the 2020 presidential race were among those on the left who reacted swiftly and sharply to President Trump\u2019s prime-time address about a border wall.", 
//       "title": "2020 Democratic Hopefuls React to Trump\u2019s Speech", 
//       "topicID": 1
//     }, 
//     {
//       "id": 2, 
//       "read": false, 
//       "response": null, 
//       "stance": "R", 
//       "summary": "Hundreds of workers contacted the Guardian to describe the impact on their lives, including anxiety over family finances and worries for the future. Here are some of their stories I am a seasonal Forest Service employee and making plans for next season and be\u2026", 
//       "title": "'We're being held hostage': federal workers describe life without pay", 
//       "topicID": 1
//     }, 
//     {
//       "id": 3, 
//       "read": false, 
//       "response": null, 
//       "stance": "C", 
//       "summary": "The first new \u201cSaturday Night Live\u201d of 2019, hosted by Rachel Brosnahan, featured Alec Baldwin as President Trump and the welcome return of Pete Davidson.", 
//       "title": "On \u2018S.N.L.,\u2019 a Game of \u2018Deal or No Deal\u2019 to End the Government Shutdown", 
//       "topicID": 1
//     }, 
//     {
//       "id": 4, 
//       "read": false, 
//       "response": null, 
//       "stance": "R", 
//       "summary": "Nancy Pelosi said Democrats will still vote on Thursday despite impasse at \u2018border security briefing\u2019 Donald Trump and top congressional leaders failed to resolve a partial government shutdown that has stretched well into a second week as the president refuse\u2026", 
//       "title": "Trump and top lawmakers fail to resolve shutdown after meeting", 
//       "topicID": 1
//     }, 
//     {
//       "id": 5, 
//       "read": false, 
//       "response": null, 
//       "stance": "R", 
//       "summary": "Rep. Alexandria Ocasio-Cortez rebuked President Donald Trump over the government shutdown in her first speech on the House floor. She claimed that the shutdown was not about Trump's demands for a border wall but the \"erosion of American democracy.\" Ocasio-Cor\u2026", 
//       "title": "Alexandria Ocasio-Cortez used her first speech on the House floor to rip Trump over the shutdown and 'the erosion of American democracy'", 
//       "topicID": 1
//     }, 
//     {
//       "id": 6, 
//       "read": false, 
//       "response": null, 
//       "stance": "C", 
//       "summary": "Donald Trump has warned that the government shutdown could last for more than a year as he doubled down on a pledge to block any deal that does not include US-Mexico border wall funding. The US president confirmed during a press conference after closed doors \u2026", 
//       "title": "Donald Trump warns US government shutdown could last more than a year", 
//       "topicID": 1
//     }, 
//     {
//       "id": 7, 
//       "read": false, 
//       "response": null, 
//       "stance": "L", 
//       "summary": "WASHINGTON (AP) \u2014 President Donald Trump has done something remarkable in the government shutdown: He's unified the diverse new House Democratic majority firmly behind Speaker Nancy Pelosi.", 
//       "title": "Trump's shutdown gift to Pelosi: A unified Democratic caucus", 
//       "topicID": 1
//     }, 
//     {
//       "id": 8, 
//       "read": false, 
//       "response": null, 
//       "stance": "L", 
//       "summary": "Commerce Secretary Wilbur Ross and President Donald Trump's daughter-in-law Lara Trump had some encouraging comments for furloughed workers.", 
//       "title": "Wilbur Ross, Lara Trump are so out of touch, it's embarrassing: Today's talker", 
//       "topicID": 1
//     }, 
//     {
//       "id": 9, 
//       "read": false, 
//       "response": null, 
//       "stance": "R", 
//       "summary": "Because of the government shutdown, President Trump's approval rating has fallen to 34 percent, according to the results of a new poll.", 
//       "title": "Shutdown Drags President Trump\u2019s Approval Rating Down to 34%: Poll", 
//       "topicID": 1
//     }, 
//     {
//       "id": 10, 
//       "read": false, 
//       "response": null, 
//       "stance": "R", 
//       "summary": "President Trump addressed the nation from the Oval Office, pressing Congress again to provide funding for a border wall. House Speaker Nancy Pelosi and Senate Minority Leader Chuck Schumer refused.", 
//       "title": "Transcript: Trump's Address On Border Security And Democrats' Response", 
//       "topicID": 1
//     }
//   ];

// score = 1;

// sortArticles(score, articles);

