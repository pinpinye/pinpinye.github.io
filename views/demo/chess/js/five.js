// 绘制棋盘

// 绘制棋子

// 已经绘制的棋子不能在绘制

// 生成数组

// 判断是否连成5子

// 悔棋


window.onload = function() {
    var myChess = function(canvas) {
        this.dom = document.getElementById(canvas);
        this.ctx = this.dom.getContext("2d");
        // this.ctx.scale(2, 2);
        this.a_w = 40;
        this.chessList = [];
        this.count = 0;
        this.huiqi_flag = 0;
    }

    myChess.prototype = {
        // 初始化
        init: function() {
            this.draw();
            this.createchessList();
            var domTop = this.dom.offsetTop,
                domLeft = this.dom.offsetLeft,
                self = this;
                console.log(domTop);
                console.log(domLeft);
            self.playChess(7, 7, 0);
            //计算位置、检查是否有棋、判断谁赢
            this.dom.onclick = function(e) {
                self.huiqi_flag = 0;
                var _x = (e.pageX - domLeft) ,
                    _y = (e.pageY - domTop) ,
                    i = Math.round(_x / self.a_w) - 1,
                    j = Math.round(_y / self.a_w) - 1;
                if (!self.checkIf(i, j)) {
                    self.playChess(i, j);
                    if (test.testAll(self.chessList, i, j)) {
                        if (self.count % 2 == 0) {
                            alert(" 白棋胜！");
                        } else alert("黑棋胜！");
                    }
                }
                self.memory(i, j);
                self.cancle(i, j);
            };

        },

        // 绘制棋盘
        draw: function() {
            var ctx = this.ctx;
            ctx.clearRect(0, 0, 620, 620);
            for (var i = 0; i < 15; i++) {
                ctx.beginPath();
                ctx.moveTo(30, 30 + this.a_w * i);
                ctx.lineTo(590, 30 + this.a_w * i);
                ctx.moveTo(30 + this.a_w * i, 30);
                ctx.lineTo(30 + this.a_w * i, 590);
                ctx.lineWidth = 2;
                ctx.strokeStyle = "#000";
                ctx.stroke();
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
        // 绘制棋子
        playChess: function(i, j) {
            var ctx = this.ctx;
            ((this.count % 2) == 0) ? type = 0: type = 1;
            if (type == 1) {
                // 白棋
                ctx.fillStyle = "#fff";
                this.chessList[i][j] = 0;
            }
            if (type == 0) {
                // 黑棋
                ctx.fillStyle = "#000000";
                this.chessList[i][j] = 1;
            }
            this.count++;
            ctx.beginPath();
            ctx.arc(30 + i * this.a_w, 30 + j * this.a_w, 15, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
        },

        // 此处已有棋不能再下棋
        checkIf: function(i, j) {
            if (this.chessList[i][j] != 2) {
                alert("此处已有棋");
                return true;
            } else return false;

        },
        // 撤销悔棋
        cancle: function(i, j) {
            var chess = this;
            cancle_back();

            function cancle_back() {
                var cancle_button = document.getElementById("cancle-back");
                cancle_button.onclick = function(e) {
                        if (chess.huiqi_flag == 1) {
                            chess.playChess(i, j);
                            chess.huiqi_flag = 0;
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
                    var ctx = chess.ctx;
                    chess.huiqi_flag = 1;
                    chess.count--;
                    chess.chessList[i][j] = 2;
                    var x = 30 + i * chess.a_w - chess.a_w / 2;
                    var y = 30 + j * chess.a_w - chess.a_w / 2;
                    ctx.clearRect(x, y, 40, 40);
                    if (x == 10 && y == 10) {
                        ctx.beginPath();
                        ctx.moveTo(x + 20, y + 20);
                        ctx.lineTo(x + 40, y + 20);
                        ctx.moveTo(x + 20, y + 20);
                        ctx.lineTo(x + 20, y + 40);
                        ctx.closePath();
                        ctx.stroke();
                    } else if (x == 570 && y == 10) {
                        ctx.beginPath();
                        ctx.moveTo(x, y + 20);
                        ctx.lineTo(x + 20, y + 20);
                        ctx.moveTo(x + 20, y + 20);
                        ctx.lineTo(x + 20, y + 40);
                        ctx.closePath();
                        ctx.stroke();
                    } else if (x == 10 && y == 570) {
                        ctx.beginPath();
                        ctx.moveTo(x + 20, y + 20);
                        ctx.lineTo(x + 40, y + 20);
                        ctx.moveTo(x + 20, y);
                        ctx.lineTo(x + 20, y + 20);
                        ctx.closePath();
                        ctx.stroke();
                    } else if (x == 570 && y == 570) {
                        ctx.beginPath();
                        ctx.moveTo(x, y + 20);
                        ctx.lineTo(x + 20, y + 20);
                        ctx.moveTo(x + 20, y);
                        ctx.lineTo(x + 20, y + 20);
                        ctx.closePath();
                        ctx.stroke();
                    } else if (y == 10) {
                        ctx.beginPath();
                        ctx.moveTo(x, y + 20);
                        ctx.lineTo(x + 40, y + 20);
                        ctx.moveTo(x + 20, y + 20);
                        ctx.lineTo(x + 20, y + 40);
                        ctx.closePath();
                        ctx.stroke();
                    } else if (x == 10) {
                        ctx.beginPath();
                        ctx.moveTo(x + 20, y + 20);
                        ctx.lineTo(x + 40, y + 20);
                        ctx.moveTo(x + 20, y);
                        ctx.lineTo(x + 20, y + 40);
                        ctx.closePath();
                        ctx.stroke();
                    } else if (y == 570) {
                        ctx.beginPath();
                        ctx.moveTo(x, y + 20);
                        ctx.lineTo(x + 40, y + 20);
                        ctx.moveTo(x + 20, y);
                        ctx.lineTo(x + 20, y + 20);
                        ctx.closePath();
                        ctx.stroke();
                    } else {
                        ctx.beginPath();
                        ctx.moveTo(x, y + 20);
                        ctx.lineTo(x + 40, y + 20);
                        ctx.moveTo(x + 20, y);
                        ctx.lineTo(x + 20, y + 40);
                        ctx.closePath();
                        ctx.stroke();
                    }
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
        // 正斜线
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
        // 反斜线
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
        var board = new myChess("myCanvas");
        board.init();
    }

    function reset() {
        var re_button = document.getElementById("reset");
        re_button.onclick = function(e) {
            var board = new myChess("myCanvas");
            // board.ctx.scale(0.5, 0.5);
            board.init();
        }
    }
};
