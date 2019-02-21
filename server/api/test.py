import matplotlib.pyplot as plt
experienced = 10
delta = 0.9
# This function use a sliding window to plot the score change of a given user
def analyze(all_history):
    lens = len(all_history)
    # Only analyze the experience user 
    if lens <= experienced:
        return
    score,scoreList = recalculate(all_history,0)
    graph_y = [scoreList[experienced-1]]
    for i in range(experienced,lens):
        temp_score = scoreList[i]
        temp_score -= scoreList[i-experienced]
        graph_y.append(temp_score)
    #plot graph_y
    graph_y = [item/10.0 for item in scoreList]
    print(graph_y)
    print(len(graph_y))
    plt.plot(graph_y)
    plt.ylabel('score change history')
    plt.show()    
# Return the change of score once add this history
def addOneHistory(score,article_stance,response):
    sign = [-1,1][score >= 0]
    stance = [1,-1][article_stance== 'L']
    if article_stance == 'C':
        stance = 0
        if score == 0:
            return 0
    if stance == 0:
        change = response * sign
    else:
        change = response * stance
    return change
# Given a start score and a list of history, it will return the final score if this list of history has been added to start scpre.
def recalculate(all_history,score):
    scoreList = [score]
    for i,history in enumerate(all_history):
        response = history[1]
        stance = history[0]
        score =score*0.7 + addOneHistory(score,stance,response)
        scoreList.append(score)
    return score,scoreList 
his = [("L",1),("L",1),("L",1),("C",0),("L",1),("L",1),("R",1),("C",1),("L",1),("R",1),("R",1),("R",1),("R",1),("L",1),("R",1),("C",1)]
analyze(his)