let myAccountBalance = 0;
let highLowNumber = 0;
let highLowCount = 0;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('ranGenBtn').addEventListener('click', rollDie);
    document.getElementById('checkbookBtnDeposit').addEventListener('click', checkbookDeposit);
    document.getElementById('checkbookBtnWithdraw').addEventListener('click', checkbookWithdraw);
    document.getElementById('comparisonBtnNames').addEventListener('click', compareNames);
    document.getElementById('comparisonBtnNumbers').addEventListener('click', compareNumbers);
    document.getElementById('comparisonBtnReset').addEventListener('click', resetComparisons);
    document.getElementById('loopStartBtn').addEventListener('click', loopFormOpen);
    document.getElementById('loopAddBtn').addEventListener('click', loopFormAdd);
    document.getElementById('loopEndBtn').addEventListener('click', loopFormEnd);
    document.getElementById('highLowGuessBtn').addEventListener('click', highLowGuess);
    document.getElementById('highLowPlayAgainBtn').addEventListener('click', highLowPlayAgain);
    setHighLowNumber();
});

function rollDie(){
    let myRoll = getRandomNumber(20).toString();
    if (myRoll == undefined ||
        myRoll == null ||
        myRoll == "NaN" ||
        parseInt(myRoll) <= 0
        ){
        myRoll = "ERROR: number must be a positive integer";
    }
    document.getElementById('ranGenTextNumber').innerHTML = myRoll;
}

function getRandomNumber(maxNumber){
    let thisRoll = Math.floor(Math.random() * (maxNumber))+1;
    // console.log(thisRoll);
    return thisRoll;
}

function checkbookDeposit(){
    event.preventDefault();
    let myDeposit = getCheckbookTransactionAmount();
    console.log(myDeposit);
    if (myDeposit <= 0 || isNaN(myDeposit)){
        console.log("throw error - subZero")
        checkbookError();
    }
    else{
        console.log("Updating balance...")
        updateBalance(myDeposit)
    }
}

function checkbookWithdraw(){
    event.preventDefault();
    let myWithdrawal = getCheckbookTransactionAmount();
    if (myWithdrawal <= 0 || isNaN(myWithdrawal)){
        console.log("throw error - subZero")
        checkbookError();
    }
    else{
        console.log("Updating balance...")
        updateBalance(-myWithdrawal)
    }
}

function getCheckbookTransactionAmount(){
    return parseInt(document.getElementById('checkbookAmountInput').value);
}

function updateBalance(amount){
    myAccountBalance += amount;
    myFormattedBalance = formatNumber(myAccountBalance);
    if (myFormattedBalance.substring(0,1) == "-"){
        myFormattedBalance = myFormattedBalance.substring(1,myFormattedBalance.length);
        myFormattedCurrency = "-$" + myFormattedBalance;
    }
    else{
        myFormattedCurrency = "$" + myFormattedBalance;
    }
    document.getElementById('checkbookBalance').innerHTML = myFormattedCurrency;
}

function checkbookError(){
    document.getElementById('checkbookWarning').innerHTML = "Transaction amount must be positive.";
    document.getElementById('checkbookWarning').style.display = "inline-block";
    hideWarningTimeout(2000);
}

function hideWarningTimeout(ms){
    setTimeout(function(){
        hideCheckbookWarning();
    }, ms);
}

function hideCheckbookWarning(){
    document.getElementById('checkbookWarning').style.display = "none";
}

 function formatNumber(int){
    let myShrinkingNumber = int.toString();
    let myLength = myShrinkingNumber.length;
    let myFormattedNumber = "";
    let count = 0;
    for (i = 0; i < myLength; i++){
        let myNewNumber = myShrinkingNumber.substring(0,myShrinkingNumber.length-1);
        let myTempNumber = myShrinkingNumber.substring(myShrinkingNumber.length-1);
        myFormattedNumber = myTempNumber + myFormattedNumber;
        myShrinkingNumber = myNewNumber;
        
        ++count
        if (count % 3 == 0 && myShrinkingNumber.length > 0){
            if (myShrinkingNumber.substring(0,1) != "-"){
                myFormattedNumber = "," + myFormattedNumber;
            }
        }
        console.log(myFormattedNumber);
    }
    
    return myFormattedNumber;
 }

 function compareNames(){
    event.preventDefault();
    let name1 = document.getElementById('comparisonName1Input').value;
    let name2 = document.getElementById('comparisonName2Input').value;
    if (name1 === name2){
        declareComparison("names", "the same");
    }
    else{
        declareComparison("names", "distinct");
    }
 }

 function compareNumbers(){
    event.preventDefault();
    let number1 = document.getElementById('comparisonNumber1Input').value;
    let number2 = document.getElementById('comparisonNumber2Input').value;
    if (number1 === number2){
        declareComparison("numbers", "the same")
    }
    else{
        declareComparison("numbers", "distinct")
    }
 }

 function declareComparison(typeStr, sameStr){
    document.getElementById('comparisonResult').innerHTML = "The " + typeStr + " you entered are " + sameStr + ".";
    document.getElementById('comparisonResult').style.display = "inline-block";
    hideComparisonResultTimeout(2000);
 }

 function hideComparisonResultTimeout(ms){
    setTimeout(function(){
        hideComparisonResult();
    }, ms);
}

function hideComparisonResult(){
    document.getElementById('comparisonResult').style.display = "none";
}

function resetComparisons(){
    document.getElementById('comparisonName1Input').value = "";
    document.getElementById('comparisonName2Input').value = "";
    document.getElementById('comparisonNumber1Input').value = "";
    document.getElementById('comparisonNumber2Input').value = "";
}

let loopAdditionTotal = 0;
let loopAdditionClicks = 0;

function loopFormOpen(){
    event.preventDefault();
    // reset totals and totals displays
    loopAdditionTotal = 0;
    loopAdditionClicks = 0;
    document.getElementById('loopTotal').innerHTML = loopAdditionTotal;
    document.getElementById('loopCount').innerHTML = loopAdditionClicks;
    // show form and move results display
    document.getElementById('loopResultsContainer').style.transform = "translate(4.5em, 0.5em)";
    document.getElementById('loopForm').style.display = "inline-block";
}

function loopFormAdd(){
    event.preventDefault();
    let tempNumberString = document.getElementById('loopInput').value;
    if (tempNumberString == ""){
        loopAdditionError();
    }
    else{
        // get and format number
        loopAdditionTotal += parseInt(tempNumberString);
        let myFormattedTotal = formatNumber(loopAdditionTotal);
        // update form and show notification
        document.getElementById('loopTotal').innerHTML = myFormattedTotal;
        showLoopNotification(tempNumberString);
        // reset form
        document.getElementById('loopInput').value = "";
        // increment and display loop count
        ++loopAdditionClicks;
        document.getElementById('loopCount').innerHTML = loopAdditionClicks;
    }
}

function showLoopNotification(myStr){
    document.getElementById('loopNotification').textContent = myStr + " has been added.";
    document.getElementById('loopNotification').style.display = "inline-block";
    setTimeout(function(){
        hideLoopNotification();
    }, 2000);
}

function hideLoopNotification(){
    document.getElementById('loopNotification').style.display = "none";
}

function loopFormEnd(){
    event.preventDefault();
    document.getElementById('loopForm').style.display = "none";
    document.getElementById('loopForm').value = "";
    document.getElementById('loopResultsContainer').style.transform = "translate(-5em, -3em)";
}


function setHighLowNumber(){
    highLowNumber = (Math.floor(Math.random() * 10))+1;
}

function highLowGuess(){
    event.preventDefault();
    let yourGuessText = document.getElementById('highLowInput').value;
    let yourGuess = parseInt(yourGuessText);
    highLowCount += 1;
    document.getElementById('highLowResultCount').innerHTML = highLowCount;
    if (yourGuess > 10 || yourGuess < 1){
        highLowError()
    }
    else{
        if (yourGuess > highLowNumber){
            document.getElementById('highLowResultFeedback').innerHTML = "Over";
            document.getElementById('highLowResultFeedback').style.color = "rgb(241, 68, 15)";
        }
        else if (yourGuess < highLowNumber){
            document.getElementById('highLowResultFeedback').innerHTML = "Under";
            document.getElementById('highLowResultFeedback').style.color = "rgb(15, 215, 241)";
        }
        else{
            document.getElementById('highLowResultFeedback').innerHTML = "Congratulations! " + yourGuess + " is the number!";
            document.getElementById('highLowResultFeedback').style.color = "silver";
            document.getElementById('highLowFieldset').style.background = "linear-gradient(-45deg, red, orange, yellow, green, blue, indigo, violet)";
            document.getElementById('highLowResultLabel').style.background = "rgb(40, 68, 68)";
            document.getElementById('highLowCountLabel').style.background = "rgb(40, 68, 68)";
        }
    }
}

function highLowError(){
    // throw error msg
}

function highLowPlayAgain(){
    event.preventDefault();
    setHighLowNumber();
    document.getElementById('highLowFieldset').style.background = "rgb(40, 68, 68)";
    document.getElementById('highLowResultFeedback').innerHTML = "";
    document.getElementById('highLowResultFeedback').style.color = "silver";
    highLowCount = 0;
    document.getElementById('highLowResultCount').innerHTML = highLowCount;
}