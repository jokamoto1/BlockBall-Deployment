
import React, { useRef, useEffect, useState } from 'react'
import io from 'socket.io-client';
import { useParams } from 'react-router';
import { set } from 'mongoose';
import { Link, useHistory } from 'react-router-dom';
const Canvas = props => {
    const [start, setStart] = useState(false)
    const [winner, setWinner] = useState()
    const [over, setOver] = useState(false)
    const [socket] = useState(() => io(':8000'));
    const { accesscode } = useParams('accesscode')

    const history = useHistory()
    const [socketArr, setScoketArr] = useState([])
    let socketArr2
    useEffect(() => {
        
        console.log(accesscode)
   
        socket.on('startGameFromServer', () => {
            game()
        })
        socket.on('leave', () => {
            history.push('/')
            alert("Room Full!")
        })

        socket.emit('roomFromClient', accesscode)
        socket.emit('connectionFromClient', accesscode)
        socket.on('socketArrFromServer', arr => {

            socketArr2 = arr.sort()
            console.log(socketArr2)
            setScoketArr(arr.sort())
        })

        socket.on('leaverFromServer', data => {
            console.log("leaver")
            for (let i = 0; i < 2; i++) {
                console.log(data)
                console.log(socketArr2[i])
                if (socketArr2[i] === data) {
                    console.log("HERE")
                    var index = socketArr.indexOf(socketArr[i]);
                    let newVar = socketArr.splice(index, 1)
                    setScoketArr(newVar)
                    socketArr2 = newVar
                    alert("Other player left!")
                }
            }
        })
        return () => {
            socket.disconnect(true)

        };


    }, [])
    const canvasRef = useRef(null)

    const game = () => {
        // console.log(socketArr)
        setOver(false)

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        var loop
        context.canvas.height = 400;
        context.canvas.width = 800;

        const rectangle = {

            height: 32,
            jumping: true,
            width: 32,
            x: 50, // center of the canvas
            x_velocity: 0,
            y: 350,
            y_velocity: 0

        };
        const rectangle2 = {

            height: 32,
            jumping: true,
            width: 32,
            x: 750, // center of the canvas
            x_velocity: 0,
            y: 350,
            y_velocity: 0

        };
        const net = {
            height: 300,
            width: 30,
            x: 385,
            y: 245

        }
        const sand = {
            height: 30,
            width: 800,
            x: 0,
            y: 390
        }
        const Ball = function (x, y) {
            this.color = "white"


            this.direction = 5;
            this.radius = 20;
            this.speed = 3;
            this.x = x;
            this.y = y;

        };
        Ball.prototype = {

            updatePosition: function (width, height) {

                this.x += Math.cos(this.direction) * this.speed;
                this.y += Math.sin(this.direction) * this.speed;

                if (this.x - this.radius < 0) {

                    this.x = this.radius;

                    this.direction = Math.atan2(Math.sin(this.direction), Math.cos(this.direction) * -1);

                } else if (this.x + this.radius > width) {

                    this.x = width - this.radius;

                    this.direction = Math.atan2(Math.sin(this.direction), Math.cos(this.direction) * -1);

                }

                if (this.y - this.radius < 0) {

                    this.y = this.radius;

                    this.direction = Math.atan2(Math.sin(this.direction) * -1, Math.cos(this.direction));
                } else if (this.y + this.radius > height) {
                    this.y = height - this.radius;

                    this.direction = Math.atan2(Math.sin(this.direction) * -1, Math.cos(this.direction));
                }
            }
        };
        let ball = new Ball(0, 0)
        var controller = {
            left: false,
            right: false,
            up: false,
            keyListener: function (event) {
                var key_state = (event.type == "keydown") ? true : false
                switch (event.keyCode) {
                    case 65:// left key
                        controller.left = key_state;
                        break;
                    case 87:// up key
                        controller.up = key_state;
                        break;
                    case 68:// right key
                        controller.right = key_state;
                        break;
                }
            }
        };
        var controller2 = {
            left: false,
            right: false,
            up: false,
            keyListener: function (event) {
                var key_state2 = (event.type == "keydown") ? true : false;
                switch (event.keyCode) {
                    case 65:// left key
                        controller2.left = key_state2;
                        break;
                    case 87:// up key
                        controller2.up = key_state2;
                        break;
                    case 68:// right key
                        controller2.right = key_state2;
                        break;
                }
            }
        };
        loop = function () {
            socket.on('spectatorFromServer', data => {
                if (socket.id != socketArr2[0] && socket.id != socketArr2[1]) {
                    rectangle.x = data[0]
                    rectangle.y = data[1]
                    rectangle2.x = data[2]
                    rectangle2.y = data[3]
                    ball.x = data[4]
                    ball.y = data[5]
                    ball.speed = data[6]
                    ball.direction = data[7]

                }
            })
            socket.on('positionFromServer', data => {
                if (socket.id === socketArr2[0]) {
                    rectangle2.x = data[0]
                    rectangle2.y = data[1]
                }
                if (socket.id === socketArr2[1]) {
                    rectangle.x = data[0]
                    rectangle.y = data[1]
                    ball.x = data[2]
                    ball.y = data[3]
                    ball.speed = data[4]
                    ball.direction = data[5]
                }

            })
            if (socket.id === socketArr2[0]) {
                if (controller.up && rectangle.jumping == false) {
                    // socket.emit('moveFromClient', ['rectangle', 'up'])
                    rectangle.y_velocity -= 30;
                    rectangle.jumping = true;

                }

                if (controller.left) {
                  

                    rectangle.x_velocity -= 0.5;
                }

                if (controller.right) {

                    

                    rectangle.x_velocity += 0.5;
                }
                rectangle.y_velocity += 1;// gravity
                rectangle.x += rectangle.x_velocity;
                rectangle.y += rectangle.y_velocity;
                rectangle.x_velocity *= 0.9;// friction
                rectangle.y_velocity *= 0.9;// friction
                if (rectangle.y > 358) {

                    rectangle.jumping = false;
                    rectangle.y = 358;
                    rectangle.y_velocity = 0;

                }

                // if rectangle is going off the left of the screen
                if (rectangle.x < 0) {

                    rectangle.x = 0;
                    //350
                } else if (rectangle.x > 350) {// if rectangle goes past right boundary

                    rectangle.x = 350;


                }
            }
            //player2
            if (socket.id === socketArr2[1]) {
                if (controller2.up && rectangle2.jumping == false) {

                    rectangle2.y_velocity -= 30;
                    rectangle2.jumping = true;

                }

                if (controller2.left) {

                    rectangle2.x_velocity -= 0.5;

                }

                if (controller2.right) {

                    rectangle2.x_velocity += 0.5;

                }
                rectangle2.y_velocity += 1;// gravity
                rectangle2.x += rectangle2.x_velocity;
                rectangle2.y += rectangle2.y_velocity;
                rectangle2.x_velocity *= 0.9;// friction
                rectangle2.y_velocity *= 0.9;// friction
                if (rectangle2.y > 358) {

                    rectangle2.jumping = false;
                    rectangle2.y = 358;
                    rectangle2.y_velocity = 0;

                }

                // if rectangle is going off the left of the screen
                if (rectangle2.x < 420 - 2) {

                    rectangle2.x = 420 - 2;

                } else if (rectangle2.x > 770) {// if rectangle goes past right boundary

                    rectangle2.x = 770;

                }
            }



            // if rectangle is falling below floor line

            if (rectangle.x < ball.x + ball.radius &&
                rectangle.x + rectangle.width > ball.x - ball.radius &&
                rectangle.y < ball.y + (ball.radius) &&
                rectangle.y + rectangle.height > ball.y) {
                ball.direction = Math.atan2(Math.random() * (-2 - -1) + -1, 1)
                // ball.direction = Math.atan2(-1, 1)
                // ball.speed = 5 
                ball.speed += .1
            }
            // if rectangle is falling below floor line

            if (rectangle2.x < ball.x + (ball.radius) &&
                rectangle2.x + rectangle2.width > ball.x - ball.radius &&
                rectangle2.y < ball.y + (ball.radius) &&
                rectangle2.y + rectangle2.height > ball.y) {
                // ball.direction = Math.atan2(-1, -1)
                ball.direction = Math.atan2(Math.random() * (-2 - -1) + -1, -1)
                ball.speed += .1
            }

            if (net.x < ball.x + (ball.radius * 2) &&
                net.x + net.width > ball.x &&
                net.y < ball.y + (ball.radius * 2) &&
                net.y + net.height > ball.y) {
                // console.log("ball has hit net")
                ball.direction = Math.atan2(Math.sin(ball.direction), Math.cos(ball.direction) * -1);
            }

            if (sand.x < ball.x + (ball.radius * 2) &&
                sand.x + sand.width > ball.x &&
                sand.y + 17 < ball.y + (ball.radius * 2) &&
                sand.y + 17 + sand.height > ball.y) {
                // console.log("GAME OVER")
                ball.speed = 0
            }




            ball.y += 1 //gracity






            context.fillStyle = "#03acc3"; // canvas
            context.fillRect(0, 0, 800, 400);


            context.fillStyle = "#0000FF";// player 1
            context.beginPath();
            context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
            context.fill();

            context.fillStyle = "#00FF00";// player 2
            context.beginPath();
            context.rect(rectangle2.x, rectangle2.y, rectangle.width, rectangle.height);
            context.fill();

            context.fillStyle = "#f4a460";// sand 2
            context.beginPath();
            context.rect(sand.x, sand.y, sand.width, sand.height);
            context.fill();

            context.fillStyle = "#808080";// net 2
            context.beginPath();
            context.rect(net.x, net.y, net.width, net.height);
            context.fill();

            context.strokeStyle = "#f9d71c"; //sun
            context.lineWidth = 1000;
            context.beginPath();
            context.moveTo(800, 0);
            context.lineTo(750, 50)
            context.stroke();


            context.fillStyle = ball.color;
            context.beginPath();
            context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            context.fill();

            let height = 400
            let width = 800
            ball.updatePosition(width, height);
            if (ball.speed === 0) {
                if (ball.x < 400) {
                    setWinner(socketArr2[1])
         
                } else {

              
                    setWinner(socketArr2[0])
              


                }
                setOver(true)
                setStart(false)
                return
            }
            if (socket.id == socketArr2[0]) {

                let data = [rectangle.x, rectangle.y, ball.x, ball.y, ball.speed, ball.direction, accesscode]
                socket.emit('positionFromClient', data)
            }
            if (socket.id === socketArr2[1]) {

                let data = [rectangle2.x, rectangle2.y, "x", "y", "speed", "direction", accesscode]
                socket.emit('positionFromClient', data)

            }
            socket.emit('spectatorFromClient', [rectangle.x, rectangle.y, rectangle2.x, rectangle2.y, ball.x, ball.y, ball.speed, ball.direction, accesscode])

            // call update when the browser is ready to draw again
            window.requestAnimationFrame(loop);
        };


        window.requestAnimationFrame(loop);
        window.addEventListener("keydown", controller.keyListener);
        window.addEventListener("keydown", controller2.keyListener);
        window.addEventListener("keyup", controller.keyListener);
        window.addEventListener("keyup", controller2.keyListener);

        setStart(true)
    }


    return (
        <div className="bg-primary d-flex flex-column w-50 m-auto">
            <h1 className="text-center align-middle bg-dark rounded p-2 mt-3"><span className="text-warning">Block</span><span className="text-danger">Ball</span><span className="text-info">.js</span></h1>

            <canvas className="border border-dark border-3" ref={canvasRef} {...props} />
            {socketArr ?
                (over ?
                    (winner === socketArr[0] ?
                        <div className="text-primary bg-dark text-center rounded p-2 mt-3" ><p>{winner} </p><h3>Scored!</h3></div>
                        : <div className="text-success bg-dark text-center rounded p-2 mt-3" ><p>{winner} </p><h3>Scored!</h3></div>)
                    : "") : ""}


            {start ? ""
                : ((socket.id === socketArr[0] || socket.id === socketArr[1])) && socketArr.length === 2 ? <button id="start" onClick={(e) => socket.emit('startGameFromClient', accesscode)} className="btn btn-success mt-3">Play</button> : ""}
            <div className="bg-dark text-warning rounded text-center pt-2 pb-2 mt-3 mb-3">
                <h1>Your Name:</h1>
                {socketArr ?
                    socket.id === socketArr[0] ? <p className="text-primary">{socket.id}</p> : "" : ""}
                {socketArr ?
                    socket.id === socketArr[1] ? <p className="text-success">{socket.id}</p> : "" : ""}
                {socketArr ?
                    socket.id != socketArr[1] && socket.id != socketArr[0] ? <p className="text-danger">{socket.id}</p> : "" : ""}

                <h1 >Players:</h1>
                {socketArr ?
                    socketArr.map((player) => {
                        if (player === socketArr[0]) {
                            return <p className="text-primary">{player}</p>
                        } else if (player === socketArr[1]) {
                            return <p className="text-success">{player}</p>

                        } else {
                            return <p className="text-danger">{player}</p>
                        }

                    })

                    : ""}
                <h1 >Controls:</h1>
                <p>Jump: <kbd>W</kbd></p>
                <p>Left: <kbd>A</kbd></p>
                <p>Right: <kbd>D</kbd></p>
                <h1 >Rules:</h1>
                <p className="w-50 m-auto">The ball cannot touch the sand on your side of the court!</p>
                <Link to="/"><button className="btn btn-danger  w-50 m-auto">Exit Game Room</button></Link>
            </div>
        </div >
    )
}

export default Canvas