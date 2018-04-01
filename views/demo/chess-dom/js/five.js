// 绘制棋盘

// 绘制棋子

// 已经绘制的棋子不能在绘制

// 生成数组

// 判断是否连成5子

// 悔棋


window.onload = function() {
    var myChess = function(canvas) {
        this.dom = document.getElementById("myDiv");
        this.a_w = 40;
        this.chessList = [];
        this.count = 0;
        this.huiqi_flag = 0;
    }

    myChess.prototype = {
        // 初始化
        init: function() {
            this.draw();
            var domTop = this.dom.offsetTop,
                domLeft = this.dom.offsetLeft;
            this.createchessList();
            chess = this;
            chess.chesslist = this.createchessList();
            chess.playChess();
            //计算位置、检查是否有棋、判断谁赢
            this.dom.onclick = function(e) {
                    chess.huiqi_flag = 0;
                    var _x = e.pageX - domLeft,
                        _y = e.pageY - domTop,
                        i = Math.round(_x / chess.a_w) - 1,
                        j = Math.round(_y / chess.a_w) - 1;
                    // console.log(i);
                    // console.log(j);
                    // console.log(chess.chessList[i][j]);
                    // console.log(test.testAll(chess.chessList, i, j));
                    if (test.testAll(chess.chessList, i, j) && (chess.chessList[i][j] != 2)) {
                        if (chess.count % 2 == 0) {
                            alert("白棋胜！");
                        } else alert("黑棋胜！");
                    }
                    chess.memory(i, j);
                    chess.cancle(i, j);
                }
                // };
        },

        // 绘制棋盘
        draw: function() {
            for (i = 0; i < 196; i++) {
                var myContainer = document.getElementById("child-container");
                var child = document.createElement("div");
                myContainer.appendChild(child);
            }
        },

        // 创建数组
        createchessList: function() {
            for (var i = 0; i < 15; i++) {
                this.chessList[i] = [];
                for (var j = 0; j < 15; j++) {
                    this.chessList[i][j] = 2;
                }
            }
        },
        // 初始化棋子、绘制棋子
        playChess: function(i, j) {
            var chess = this;
            for (k = 0; k < 225; k++) {
                var myCircle = document.getElementById("circle-container");
                var circle = document.createElement("div");
                circle.setAttribute("class", "circle");
                myCircle.appendChild(circle);
                i = k % 15;
                j = parseInt(k / 15);
                circle.setAttribute("x", i);
                circle.setAttribute("y", j);
                circle.onclick = function() {
                    ((chess.count % 2) == 0) ? type = 0: type = 1;
                    i = this.getAttribute("x");
                    j = this.getAttribute("y");
                    if (chess.chessList[i][j] == 2) {
                        if (type == 0) {
                            this.style.opacity = 1;
                            this.style.backgroundColor = "#000000";
                            chess.chessList[i][j] = 1;
                        }
                        if (type == 1) {
                            this.style.opacity = 1;
                            this.style.backgroundColor = "#FFFFFF";
                            chess.chessList[i][j] = 0;
                        }
                        chess.count++;
                    } else {
                        alert("此处已有棋")
                    }
                };
            }
        },

        // 撤销悔棋
        cancle: function(i, j) {
            var chess = this;
            cancle_back();

            function cancle_back() {
                var cancle_button = document.getElementById("cancle-back");
                cancle_button.onclick = function(e) {
                        if (chess.huiqi_flag == 1) {
                            var k = i + j * 15;
                            var circle = document.getElementsByClassName("circle");
                            chess.huiqi_flag = 0;
                            ((chess.count % 2) == 0) ? type = 0: type = 1;
                            if (chess.chessList[i][j] == 2) {
                                if (type == 0) {
                                    circle[k].style.opacity= 1;
                                    circle[k].style.backgroundColor = "#000000";
                                    chess.chessList[i][j] = 1;
                                }
                                if (type == 1) {
                                    circle[k].style.opacity = 1;
                                    circle[k].style.backgroundColor = "#FFFFFF";
                                    chess.chessList[i][j] = 0;
                                }
                                chess.count++;
                            }
                        } else {
                            alert("您上一步没有悔棋！");
                        }
                    }
                    // } else {
                    //     alert("您没有悔棋");
            }
        },

        // 悔棋去掉棋子
        memory: function(i, j) {
            var chess = this;
            backward(); // 悔棋
            function backward() {
                var back_button = document.getElementById("backward");
                back_button.onclick = function(e) {
                    // var ctx = chess.ctx;
                    chess.huiqi_flag = 1;
                    chess.count--;
                    chess.chessList[i][j] = 2;
                    var k = i + j * 15;
                    var circle = document.getElementsByClassName("circle");
                    circle[k].style.backgroundColor = " ";
                    circle[k].style.opacity = 0;
                }
            }
        }
    }





    var test = {
        // 横向
        vertical: function(list, i, j) {
            var k = list[i][j],
                sum = 1,
                type = 0,
                n = i + 1;
            for (var n = i + 1; n < 15; n++) {
                if (list[n][j] == k) {
                    sum++;
                } else if (list[n][j] == 2) {
                    break;
                } else {
                    type++;
                    break;
                }
            }

            for (var n = i - 1; n >= 0; n--) {
                if (list[n][j] == k) {
                    sum++;
                } else if (list[n][j] == 2) {
                    break;
                } else {
                    type++;
                    break;
                }
            }

            return [sum, type];
        },
        // 纵向
        horizontal: function(list, i, j) {
            var k = list[i][j],
                sum = 1,
                type = 0;
            for (var n = j + 1; n < 15; n++) {
                if (list[i][n] == k) {
                    sum++;
                } else if (list[i][n] == 2) {
                    break;
                } else {
                    type++;
                    break;
                }
            }
            for (var n = j - 1; n >= 0; n--) {
                if (list[i][n] == k) {
                    sum++;
                } else if (list[i][n] == 2) {
                    break;
                } else {
                    type++;
                    break;
                }
            }
            return [sum, type];
        },
        //反斜线
        inclined1: function(list, i, j) {
            var k = list[i][j],
                type = 0,
                sum = 1,
                z = (i > j) ? i : j,
                w = (i < j) ? i : j;
            for (var v = 1; v <= 15 - z; v++) {
                if (list[i + v][j + v] == k) {
                    sum++;
                } else if (list[i + v][j + v] == 2) {
                    break;
                } else {
                    type++;
                    break;
                }
            }
            for (var v = 1; v <= w; v++) {
                if (list[i - v][j - v] == k) {
                    sum++;
                } else if (list[i - v][j - v] == 2) {
                    break;
                } else {
                    type++;
                    break;
                }
            }
            return [sum, type];

        },
        // 正斜线
        inclined2: function(list, i, j) {
            var k = list[i][j],
                sum = 1,
                type = 0;
            var z = (i > (15 - j)) ? i : (15 - j);
            var w = (i < (15 - j)) ? i : (15 - j);

            for (var v = 1; v <= 15 - z; v++) {
                if (list[i + v][j - v] == k) {
                    sum++;
                } else if (list[i + v][j - v] == 2) {
                    break;
                } else {
                    type++;
                    break;
                }
            }
            for (var v = 1; v <= w; v++) {
                if (list[i - v][j + v] == k) {
                    sum++;
                } else if (list[i - v][j + v] == 2) {
                    break;
                } else {
                    type++;
                    break;
                }
            }
            return [sum, type];

        },

        testAll: function(list, i, j) {
            if (this.vertical(list, i, j)[0] >= 5 || this.horizontal(list, i, j)[0] >= 5 || this.inclined1(list, i, j)[0] >= 5 || this.inclined2(list, i, j)[0] >= 5) {
                return true;
            } else {
                return false;
            }

        }
    };

    // 初始化
    preparePage();
    reset();

    function preparePage() {
        var board = new myChess("myChess");
        board.init();
    }

    function reset() {
        var re_button = document.getElementById("reset");
        re_button.onclick = function(e) {
                // preparePage();
                //    chess.draw();
                // var domTop = this.dom.offsetTop,
                //     domLeft = this.dom.offsetLeft;
                chess.createchessList();
                // for (k = 0; k < 225; k++) {
                var circle = document.getElementsByClassName("circle");
                for (k = 0; k < 225; k++) {
                    circle[k].style.backgroundColor = " ";
                    circle[k].style.opacity = 0;
                    // var circle = document.createElement("div");
                    // circle.setAttribute("class", "circle");
                    // myCircle.appendChild(circle);
                    // i = k % 15;
                    // j = parseInt(k / 15);
                    // circle.setAttribute("x", i);
                    // circle.setAttribute("y", j);
                    // circle.onclick = function() {
                    //     ((chess.count % 2) == 0) ? type = 0: type = 1;
                    //     i = this.getAttribute("x");
                    //     j = this.getAttribute("y");
                    //     if (chess.chessList[i][j] == 2) {
                    //         if (type == 0) {
                    //             this.style.opacity = 1;
                    //             this.style.backgroundColor = "#000000";
                    //             chess.chessList[i][j] = 1;
                    //         }
                    //         if (type == 1) {
                    //             this.style.opacity = 1;
                    // this.style.backgroundColor = "#FFFFFF";
                    //     chess.chessList[i][j] = 0;
                    // }
                    //     chess.count++;
                    // } else {
                    //     alert("此处已有棋")
                    // }
                };
                // chess.playChess();
                //计算位置、检查是否有棋、判断谁赢
                // this.dom.onclick = function(e) {
                //         chess.huiqi_flag = 0;
                //         var _x = e.pageX - domLeft,
                //             _y = e.pageY - domTop,
                //             i = Math.round(_x / chess.a_w) - 1,
                //             j = Math.round(_y / chess.a_w) - 1;
                //         console.log(test.testAll(chess.chessList, i, j));
                //         if (test.testAll(chess.chessList, i, j)) {
                //             if (chess.count % 2 == 0) {
                //                 alert("白棋胜！");
                //             } else alert("黑棋胜！");
                //         }
            }
            // chess.memory(i, j);
            // chess.cancle(i, j);
            // };
    }

};
