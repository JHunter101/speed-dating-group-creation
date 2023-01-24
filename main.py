import os
import random
import pandas as pd

os.chdir(os.path.dirname(os.path.realpath(__file__)))

with open("heads.txt") as file:
    heads = [line.rstrip() for line in file]

# INPUT #
roundCount = 8
groupSize = 8
headCount = len(heads)
groupCount = int(headCount / groupSize)

# Append empty values to the list if the division is not exact
if headCount % groupSize != 0:
    for _ in range(groupSize-(headCount%groupSize)):
        heads.append("Empty")
    headCount = len(heads)   
    groupCount = int(headCount / groupSize)

# SAVES #
if ((groupSize - 1) * roundCount) > (headCount - 1):
    exit()

if groupCount not in [2, 3, 4, 5, 7, 8, 9, 11, 13, 16, 17, 19, 23, 25, 27, 29, 31, 32, 37, 41, 43, 47, 49, 53, 59, 61, 64, 67, 71, 73, 79, 81, 83, 89, 97, 101, 103, 107, 109, 113, 121, 125, 127, 128, 131, 137, 139, 149, 151, 157, 163, 167, 169, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 243, 251]:
    exit()

# RUN #
heads = random.shuffle(heads)
output = []

# iterate rounds
for cRoundID in range(roundCount):
    cRound = []
    
    if cRoundID == 0:
        cRound = [heads[x:x+groupSize] for x in range(0, headCount, groupSize)]
    
    else:
        chunks = [heads[x:x+groupCount] for x in range(0, headCount, groupCount)]
        for cGroupID in range(groupCount):
            cGroup = []
            cGroup.append(chunks[0][cGroupID])
            
            for x in range(1, groupSize):
                ID = (cGroupID + x * (cRoundID - 1)) % groupCount
                cGroup.append(chunks[x][ID])
            
            cRound.append(cGroup)
            
    output.append(cRound)
    
outputDF = pd.DataFrame(output)
print(outputDF)
outputDF.to_excel('output.xlsx', columns = range(groupCount))