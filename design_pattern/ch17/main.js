function Publisher (name) {
  this.name = name;
  this.registers = [];
}

Publisher.prototype.add = function(register) {  
  if (this.registers.indexOf(register) === -1) {
    this.registers.push(register);
    console.log(this.name + ":" + register.name + "已注册");
  }
};

Publisher.prototype.dele = function(register) {
  if (this.registers.indexOf(register) !== -1) {
    this.registers.splice(this.registers.indexOf(register), 1);
    console.log(this.name + ":" + register.name + "已删除");
  }
}

Publisher.prototype.fire = function (msg) {
  for (var i = 0; i < this.registers.length; i++) {
    this.registers[i].recvMsg(msg);
  }
}

function Register (name) {
  this.name = name
}

Register.prototype.regist = function(publish){
  publish.add(this);
};

Register.prototype.unregist = function(publish){
  publish.dele(this);
};

Register.prototype.recvMsg = function(msg){
  console.log(this.name + '收到数据：' + msg);
}

var pub = new Publisher("pub1");
var pub2 = new Publisher("pub2");
var reg1 = new Register("reg1");
var reg2 = new Register("reg2");
var reg3 = new Register("reg3");
var reg4 = new Register("reg4");
var reg5 = new Register("reg5");

reg1.regist(pub);
reg2.regist(pub);
reg3.regist(pub);
reg4.regist(pub2);
reg5.regist(pub2);

reg1.unregist(pub);
reg2.unregist(pub2);

pub.fire('come from pub1');
pub2.fire('come from pub2');