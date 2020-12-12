
var firstNum,secNum;
const operands = ['÷','x','+','-'];
var calcComplete = false;

disp = document.getElementById("current");
hist = document.getElementById("history");
err = document.getElementById("error_msg");



document.querySelectorAll(".number").forEach(box => box.addEventListener('click', upDisp));

document.getElementById("all_clear").addEventListener("click", function()  {
    disp.innerHTML='';
    hist.innerHTML='';
    calcComplete=false;

});

/*document.getElementById("clear").addEventListener("click", function()  {
    disp.innerHTML='';
});*/

document.querySelectorAll(".operation").forEach(box => box.addEventListener('click', upDisp));



function appendNumber(num){
    disp.textContent = disp.textContent + num;
}

function clear(){
    disp.innerHTML='';
}

function all_clear(){

}

function histOp(operand){
    if(calcComplete){
        
        hist.textContent = disp.textContent.substring(1) + ' ' + operand;
        disp.textContent='';
        calcComplete = false;
    }
    else {
    hist.textContent = hist.textContent + ' ' + disp.textContent + ' ' + operand;
    firstNum = parseFloat(disp.textContent);
    clear();
    }
}

function calculate(){
    

    let calculation = (hist.textContent + ' ' + disp.textContent).split(' ');
    let operrations = calculation.filter(operator => operands.includes(operator));
    console.log(operrations);

    var res1 = 0;
    var indexOp;
    hist.textContent = hist.textContent + ' ' + disp.textContent;

    for(let i=0;i<operrations.length;i++){
        if(calculation.includes('x')){
            indexOp = calculation.indexOf('x');
            disp.textContent = calculation[indexOp-1]*calculation[indexOp+1];
            res1=disp.textContent;
            calcComplete = true;
            calculation.splice(indexOp-1,3,res1);  
        }
        else if (calculation.includes('÷')) {
            indexOp = calculation.indexOf('÷');
            disp.textContent = calculation[indexOp-1]/calculation[indexOp+1];
            res1=disp.textContent;
            calcComplete = true;
            console.log(res1);
            calculation.splice(indexOp-1,3,res1); 
        }
        /*else if(calculation.includes('+') || calculation.includes('-')){
            indexOp = Math.max(calculation.indexOf('÷'),calculation.indexOf('÷'))
        }*/
        else if (calculation.includes('-')) {
            indexOp = calculation.indexOf('-');
            disp.textContent = parseFloat(calculation[indexOp-1])-parseFloat(calculation[indexOp+1]);
            res1=disp.textContent;
            calcComplete = true;
            console.log(res1);
            calculation.splice(indexOp-1,3,res1); 
        }
        else if (calculation.includes('+')) {
            indexOp = calculation.indexOf('+');
            disp.textContent = parseFloat(calculation[indexOp-1])+parseFloat(calculation[indexOp+1]);
            res1=disp.textContent;
            calcComplete = true;
            console.log(res1);
            calculation.splice(indexOp-1,3,res1); 
        }
    

    }
    if(parseFloat(disp.textContent)%1==0){
        disp.textContent = '=' + disp.textContent;
    }
    else{
        disp.textContent = '=' + +parseFloat(disp.textContent).toFixed(4);
    }

    /*if(operrations.includes('x')){
        indexOp = calculation.indexOf('x');
        disp.textContent = calculation[indexOp+1]*calculation[indexOp-1];
        calcComplete = true;
        console.log(calculation);
        calculation.splice(indexOp-1,3);
        console.log(calculation);
        
    }*/
    

}


function upDisp(){

    if(Number.isInteger(parseInt(this.textContent)) && !calcComplete){
        if(disp.textContent=='0' && this.textContent=='0'){
            return;
        }
        if(disp.textContent=='0'){
            disp.textContent= this.textContent;
        }
        else{
        appendNumber(this.textContent);
        }
    }

    if(this.textContent == '+/-' && !calcComplete && !disp.textContent == ''){
        
        if(!disp.textContent.includes('-')){
            disp.textContent = '-' + disp.textContent;
        }
        else{
            disp.innerHTML = disp.innerHTML.replace('-','');
        }
    }
    
    if(this.textContent == 'C' && !calcComplete){
        
        if(!disp.textContent==''){
            disp.textContent = disp.textContent.slice(0,-1);
        }
        else{
            return;
        }
    }

    if(this.textContent == '%' && !calcComplete){
        
        disp.textContent = parseFloat(disp.textContent) / 100;
    }

    if(this.textContent == '.' && !calcComplete){
        
        if(disp.textContent.includes('.')){
            return;
        }
        else{
            disp.innerHTML = disp.innerHTML + '.';
        }
    }

    if (this.className == 'operation' && operands.includes(this.textContent)) {

        if((!operands.includes(hist.textContent.slice(hist.textContent.length-1)) || !disp.textContent=='')&& !disp.textContent==''){
        histOp(this.textContent);
        }
    }
    
    if(this.textContent=='=' && calcComplete==false){
        if(!isNaN(parseFloat(disp.textContent))){
            calculate();
        }
    }
}
