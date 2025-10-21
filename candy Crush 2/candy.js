var candies=['Red','Yellow','Orange','Green','Blue','Purple'];
var board=[];
var score=0;
var rows=9;
var cols=9;
var curtile;
var othertile;

var turn=20;
var gameover=false;

window.onload=function(){
    startgame();
    window.setInterval(function(){
        crushcandy();
        slidecandy();
        generatecandy();
    },100);
}
 
function randomcandy(){
    return candies[Math.floor(Math.random()*candies.length)];
}

function dragstart()
{
    curtile=this;
}
function dragover(e)
{
    e.preventDefault();
}
function dragenter(e)
{
    e.preventDefault(e);
}
function dragleave()
{

}

function startgame(){
    for(let r=0;r<rows;r++){
        let row=[];
        for(let c=0;c<cols;c++){
            let tile=document.createElement('img');
            tile.id=r.toString()+ "-" + c.toString();
            tile.src="./images/"+randomcandy()+".png";
            
            tile.addEventListener("dragstart",dragstart);//click on a candy
            tile.addEventListener("dragover",dragover);//after clicking,hover over another candy
            tile.addEventListener("dragenter",dragenter);//while hovering
            tile.addEventListener("dragleave",dragleave);//dagging candy on another candy
            tile.addEventListener("drop",dragdrop);
            tile.addEventListener("dragend",dragend);
            
            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }
    console.log(board);
}

function dragdrop()
{
    othertile=this;
}
function dragend()
{   
    if(gameover)
    {
        return;
    }

    if(curtile.src.includes("blank")||othertile.src.includes("blank"))
    {
        return;
    }

    let curcords=curtile.id.split("-");
    let r=parseInt(curcords[0]);
    let c=parseInt(curcords[1]);

    let othercords=othertile.id.split("-");
    let r2=parseInt(othercords[0]);
    let c2=parseInt(othercords[1]);


    let moveleft=c2==c-1 && r==r2;
    let moveright=c2==c+1 && r==r2;

    let moveup= r2==r-1 && c==c2;
    let movedown= r2=r+1 && c==c2;

    let isAdjacent= moveleft|| moveright|| moveup||movedown;

    if(isAdjacent)
    {
        let curimg=curtile.src;
        let otherimg=othertile.src;
        curtile.src=otherimg;
        othertile.src=curimg;

        let validmove=checkvalid();
        if(!validmove)
        {
            let curimg=curtile.src;
            let otherimg=othertile.src;
            curtile.src=otherimg;
            othertile.src=curimg;
        }
        else
        {
            turn--;
            document.getElementById("turn").innerText=turn;
            if(turn<=0)
            {
                gameover=true;
                setTimeout(()=>{
                    alert("Game Over!!! Final Score: "+score);
                },200);
            }
        }
    }
}

function crushcandy()
{
    crushthree();
    document.getElementById("score").innerText=score;
}

function crushthree()
{
    for(let r=0; r<rows;r++)
    {
        for(let c=0;c<cols-2;c++)
        {
            let candy1=board[r][c];
            let candy2=board[r][c+1];
            let candy3=board[r][c+2];

            if(candy1.src==candy2.src && candy2.src==candy3.src && !candy1.src.includes("blank"))
            {
                candy1.src="./images/blank.png";
                candy2.src="./images/blank.png";
                candy3.src="./images/blank.png";
                score=score+30;
            }

        }
    }


    for(let c=0; c<cols;c++)
    {
        for(let r=0;r<rows-2;r++)
        {
            let candy1=board[r][c];
            let candy2=board[r+1][c];
            let candy3=board[r+2][c];

            if(candy1.src==candy2.src && candy2.src==candy3.src && !candy1.src.includes("blank"))
            {
                candy1.src="./images/blank.png";
                candy2.src="./images/blank.png";
                candy3.src="./images/blank.png";
                score=score+30;
            }

        }
    }
}

function checkvalid()
{
    for(let r=0; r<rows;r++)
    {
        for(let c=0;c<cols-2;c++)
        {
            let candy1=board[r][c];
            let candy2=board[r][c+1];
            let candy3=board[r][c+2];

            if(candy1.src==candy2.src && candy2.src==candy3.src && !candy1.src.includes("blank"))
            {
                return true;
            }

        }
    }


    for(let c=0; c<cols;c++)
    {
        for(let r=0;r<rows-2;r++)
        {
            let candy1=board[r][c];
            let candy2=board[r+1][c];
            let candy3=board[r+2][c];

            if(candy1.src==candy2.src && candy2.src==candy3.src && !candy1.src.includes("blank"))
            {
                return true;
            }

        }
    }
    return false;
}

function slidecandy()
{
    for(let c=0;c<cols;c++)
    {
        let ind=rows-1;
        for(let r=cols-1;r>=0;r--)
        {
            if(!board[r][c].src.includes("blank"))
            {
                board[ind][c].src=board[r][c].src;
                ind-=1;
            }
        }

        for(let r=ind;r>=0;r--)
        {
            board[r][c].src="./images/blank.png";
        }
    }
}
function generatecandy()
{
    for(let c=0;c<cols;c++)
    {
        if(board[0][c].src.includes("blank"))
        {
            board[0][c].src="./images/"+randomcandy()+".png";
        }
    }
}