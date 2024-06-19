
const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
function rotateMatrix(matrix) {
    //Tally to segment array into 3 seperate rows and remember which index was left off at
    let tally = 0;
    let newArray = [];
    let newMatrix = [];
    //Break piece matrix into a single array
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix.length; col++) {
            newArray.push(matrix[col][row]);
        }
    }
    for (let row = 0; row < Math.sqrt(newArray.length); row++) {
        // Create new row for rotated matrix
        newMatrix.push([]);

        //Loop through matrix by column
        for (let col = 0; col < Math.sqrt(newArray.length); col++) {
            newMatrix[row].push(newArray[tally]);
            tally++
        }
    }
     //reverse each row in matrix                               
    for (let i = 0; i < newMatrix.length; i++) {
        newMatrix[i] = newMatrix[i].reverse();
    }
    return newMatrix;
}

/*OUTPUT:
[
[7, 4, 1],
[8, 5, 2],
[9, 6, 3]
]
*/

