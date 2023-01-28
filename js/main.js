function run() {
	document.getElementById('grid').innerHTML="";
	var input=document.getElementById("input").value;
	var heads=input.split("\n");
	// INPUT #
	var roundCount=document.getElementById("roundCount").value;
	var groupSize=document.getElementById("groupSize").value;
	var headCount=heads.length;
	var groupCount=Math.floor(headCount / groupSize);

	// Append empty values to the list if the division is not exact
	if (headCount % groupSize !=0) {
		for (var i=0; i < groupSize - (headCount % groupSize); i++) {
			heads.push("Empty");
		}

		headCount=heads.length;
		groupCount=Math.floor(headCount / groupSize);
	}

	// SAVES #
	if ((groupSize - 1) * roundCount > (headCount - 1)) {
		alert("Invalid input");
		return;
	}

	if (groupCount !=[2, 3, 4, 5, 7, 8, 9, 11, 13, 16, 17, 19, 23, 25, 27, 29, 31, 32, 37, 41, 43, 47, 49, 53, 59, 61, 64, 67, 71, 73, 79, 81, 83, 89, 97, 101, 103, 107, 109, 113, 121, 125, 127, 128, 131, 137, 139, 149, 151, 157, 163, 167, 169, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 243, 251].indexOf(groupCount)==-1) {
		alert("Invalid input");
		return;
	}

	// RUN #
	heads=shuffleArray(heads);
	var output=[];

	// iterate rounds
	for (var cRoundID=0; cRoundID < roundCount; cRoundID++) {
		var cRound=[];
		var roundGrid=document.createElement("div");
		roundGrid.className="round-grid";

		if (cRoundID===0) {
			cRound=[];

			for (var x=0; x < groupCount; x++) {
			cRound.push(heads.slice(x*groupSize, (x+1)*groupSize));
		}
		
		
			// iterate groups in round
			for (var i=0; i < cRound.length; i++) {
				console.log(cRound[i].length);
				var group=document.createElement("table");
				group.innerHTML="<tr><th>Group "+(i + 1)+"</th>";

				for (var j=0; j < cRound[i].length; j++) {
					group.innerHTML+="<td>"+cRound[i][j]+"</td>";
				}

				group.innerHTML+="</tr>";
				roundGrid.appendChild(group);
			}
		}

		else {
			var chunks=[];

			for (var x=0; x < headCount; x +=groupCount) {
				chunks.push(heads.slice(x, x + groupCount));
			}

			for (var cGroupID=0; cGroupID < groupCount; cGroupID++) {
				var cGroup=[];
				cGroup.push(chunks[0][cGroupID]);

				for (var x=1; x < groupSize; x++) {
					var ID=(cGroupID + x * (cRoundID - 1)) % groupCount;
					cGroup.push(chunks[x][ID]);
				}

				cRound.push(cGroup);
				// iterate groups in round
				var group=document.createElement("table");
				group.innerHTML="<tr><th>Group "+(cGroupID + 1)+"</th>";

				for (var j=0; j < cGroup.length; j++) {
					group.innerHTML+="<td>"+cGroup[j]+"</td>";
				}

				group.innerHTML+="</tr>";
				roundGrid.appendChild(group);
			}
		}

		document.getElementById("grid").appendChild(roundGrid);
		document.getElementById("grid").style.gridTemplateColumns = "repeat(" + groupCount + ", 1fr)";
	}
}

	function shuffleArray(array) {
		for (let i=array.length - 1; i > 0; i--) {
			let j=Math.floor(Math.random() * (i + 1));
			[array[i],
			array[j]]=[array[j],
			array[i]];
		}

		return array;
	}