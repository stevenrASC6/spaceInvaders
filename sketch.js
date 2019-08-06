var updateCount;

var canvasWidth = 500;
var canvasHeight = 500;

var enemy = [];
var projectile = [];

var miniNum = 20;
var miniLayer = 20;
var miniWidth = 10;

var player;

var waveFlag = false;

var playerPic;
var enemyPic;

function setup()
{
    createCanvas(canvasWidth, canvasWidth);
    player = new Player(width/2, (height - height/10), 20, 20);
    playerPic=loadImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRclsjgM6C2uu1GS9UtwiKAyhoDAjnjerZskeq_WOm_QKMR24OdSA');
    enemyPic=loadImage('data:image/jpeg;base64,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');

    setEntity();
}
function draw()
{
    updateCount++;
    clear();
    background(0);


    enemyAI();
    drawEntity();

    playerControl();
    drawPlayer();

    projectileAI();
    drawProjectile();
}
function playerControl()
{
    var normSpeed = 10;
    var shiftSpeed = 3;
    var useSpeed;
    if(keyIsDown(SHIFT))
    {
        useSpeed = shiftSpeed;
    }
    else
    {
        useSpeed = normSpeed;
    }

    if (keyIsDown(RIGHT_ARROW) && player.posX < canvasWidth - player.w)
    {
        player.posX += useSpeed;
    }
    if (keyIsDown(LEFT_ARROW) && player.posX > 0)
    {
        player.posX += useSpeed * -1;
    }
    if(keyIsDown(32)) //press space
    {
        projectile.push(new Projectile(player.posX + (player.w/2), player.posY, 0, -20, 3, 30, "playerProjectile", true));
    }
}
function keyPressed()
{
    if(keyIsDown(32)) //press space
    {
        projectile.push(new Projectile(player.posX + (player.w/2), player.posY, 0, -20, 3, 30, "playerProjectile", true));
    }

}
function mouseClicked()
{

}
function drawPlayer()
{

    fill("white");
    rect(player.posX, player.posY, player.w, player.h);
    image(playerPic,player.posX, player.posY, player.w, player.h);

}

function enemyAI()
{
    for(let i = 0; i < enemy.length; i++)
    {
        if(enemy[i].type == "mini")
        {
            if(checkSide(enemy[i].posX, enemy[i].posY, enemy[i].w, enemy[i].h))
            {
                enemy[i].velX *= -1;
                enemy[i].posY += 50;
            }
        }

        enemy[i].posX += enemy[i].velX;
        enemy[i].posY += enemy[i].velY;

        if(enemy[i].hp <= 0)
        {
            enemy.splice(i, 1); //get delet
        }
    }
}
function drawEntity()
{
    for(let i = 0; i < enemy.length; i++)
    {
        fill("red");
        rect(enemy[i].posX, enemy[i].posY, enemy[i].h, enemy[i].w);
        image(enemyPic,enemy[i].posX, enemy[i].posY, enemy[i].h, enemy[i].w);
    }
}
function setEntity()
{
    if(!waveFlag)
    {
        for(let i = 0; i < miniNum; i++)
        {
            const x = (miniWidth*i) + 10;
            for(let j = 0; j < miniLayer; j++)
            {
                const y = (miniWidth*j) + 10;

                enemy.push(new Entity(x, y, 2, 0, miniWidth, miniWidth, "mini", 1));
            }
        }
    }
}
function projectileAI()
{
    for(let i = 0; i < projectile.length; i++)
    {
        if(projectile[i].type = "playerProjectile")
        {
            projectile[i].velY++;;

            for(let j = 0; j < enemy.length; j++)
            {
                if(checkHitbox(projectile[i].posX, projectile[i].posY, projectile[i].w, projectile[i].h, enemy[j].posX, enemy[j].posY, enemy[j].w, enemy[j].h))
                {
                    projectile[i].alive = false;
                    enemy[j].hp--;
                }
            }    
        }
        projectile[i].posX += projectile[i].velX;
        projectile[i].posY += projectile[i].velY;

        if(!projectile[i].alive)
        {
            projectile.splice(i, 1);
        }
    }
}
function drawProjectile()
{
    for(let i = 0; i < projectile.length; i++)
    {
        if(projectile[i].friendlyBool)
        {
            fill(26, 255, 0);
        }
        else
        {
            fill(255, 112, 0);
        }
        rect(projectile[i].posX, projectile[i].posY, projectile[i].w, projectile[i].h)
    }
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
function checkHitbox(rect1X, rect1Y, rect1W, rect1H, rect2X, rect2Y, rect2W, rect2H) //
{
    var istrue = (rect1X < rect2X + rect2W) && (rect1X + rect1W > rect2X) && (rect1Y < rect2Y + rect2H) && (rect1Y + rect1H > rect2Y); //thanks internet
    return istrue;
}
function checkSide(positionX, positionY, w, h)
{
    var istouching = (positionX > canvasWidth - w) || (positionX < 0) || (positionY > canvasHeight - h) || (positionY < 0);
    return istouching;
}




//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~calvins thing~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// var canvasWidth = 600;
// var canvasHeight = 600;
// var px=canvasWidth/2;
// var py=550;
// var pWidth=15;
// var pHeight=15;

// function setup(){
//    createCanvas(canvasWidth,canvasHeight);
//    background(0,0,0);
   
// }

// function draw(){
//    fill(191, 18, 6),
//    rect (px,py,5,10);
//    fill ('white')
//    rect (px,py,pWidth,pHeight);

//    if (keyIsDown(RIGHT_ARROW)){
//        px= px+5;
//        fill ('black');
//        rect(0,py,canvasWidth,pHeight);
//    }
//    else if (keyIsDown(LEFT_ARROW)){
//        px= px-5;
//        fill ('black');
//        rect(0,py,canvasWidth,pHeight);
//    }
//    fill ('white')
//    rect (px,py,pWidth,pHeight);
// }
// function keyPressed(){
//     if (keyCode == SPACE)
//     lazerHight = py + 10
// }