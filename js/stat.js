'use strict';

var getRandomColor = function (min, max) {
  var randomOpacity = Math.random() * (max - min) + min;

  return 'rgba(0, 0, 255, ' + randomOpacity + ')';
};

var getMaxNumber = function (objName) {
  var max = -1;

  for (var i = 0; i < objName.length; i++) {
    if (objName[i] > max) {
      max = objName[i];
    }
  }

  return max;
};

var drawScreen = function (ctx) {
  var DATE_SCREEN = {
    'x': 100,
    'y': 10,
    'width': 520,
    'halfWidth': 260,
    'height': 280,
    'partHeight': 300,
    'backgroundColor': 'rgba(255, 255, 255, 1)',
    'colorShadow': 'rgba(0, 0, 0, 0.7)',
    'shadowOffset': 10,
    'colorShadowIn': 'rgba(0, 0, 0, 0)'
  };

  ctx.beginPath();
  ctx.moveTo(DATE_SCREEN.x, DATE_SCREEN.y);
  ctx.bezierCurveTo(DATE_SCREEN.x, DATE_SCREEN.y, DATE_SCREEN.halfWidth, DATE_SCREEN.y, DATE_SCREEN.width, DATE_SCREEN.y);
  ctx.bezierCurveTo(DATE_SCREEN.width, DATE_SCREEN.height, DATE_SCREEN.width, DATE_SCREEN.height, DATE_SCREEN.width, DATE_SCREEN.height);
  ctx.bezierCurveTo(DATE_SCREEN.width, DATE_SCREEN.height, DATE_SCREEN.halfWidth, DATE_SCREEN.partHeight, DATE_SCREEN.x, DATE_SCREEN.height);
  ctx.fillStyle = DATE_SCREEN.backgroundColor;

  ctx.shadowColor = DATE_SCREEN.colorShadow;
  ctx.shadowOffsetX = DATE_SCREEN.shadowOffset;
  ctx.shadowOffsetY = DATE_SCREEN.shadowOffset;

  ctx.fill();
  ctx.closePath();

  ctx.shadowColor = DATE_SCREEN.colorShadowIn;
};

var drawText = function (ctx) {
  var DATE_TEXT = {
    'fillStyle': 'rgba(0, 0, 0, 1)',
    'font': '16px PT Mono',
    'fillTextOne': 'Ура вы победили!',
    'fillTextX': 110,
    'fillTextOneY': 60,
    'fillTextTwo': 'Список результатов:',
    'fillTextTwoY': 80
  };

  ctx.fillStyle = DATE_TEXT.fillStyle;
  ctx.font = DATE_TEXT.font;
  ctx.fillText(DATE_TEXT.fillTextOne, DATE_TEXT.fillTextX, DATE_TEXT.fillTextOneY);
  ctx.fillText(DATE_TEXT.fillTextTwo, DATE_TEXT.fillTextX, DATE_TEXT.fillTextTwoY);
};

window.renderStatistics = function (ctx, names, times) {
  var maxNumber = getMaxNumber(times);
  var histogramHeight = 150;
  var step = histogramHeight / (maxNumber - 0);
  var barWidth = 40;
  var indent = 90;
  var initialX = 110;
  var initialY = 260;
  var lineHeightTime = 5;
  var lineHeightName = 16;

  drawScreen(ctx);

  drawText(ctx);

  for (var i = 0; i < times.length; i++) {
    var colorStart = 0.2;
    var colorEnd = 0.9;
    var randomColor = getRandomColor(colorStart, colorEnd);
    var time = times[i];
    var name = names[i];

    if (name === 'Вы') {
      randomColor = 'rgba(255, 0, 0, 1)';
    }

    ctx.fillStyle = randomColor;
    ctx.fillRect(initialX + indent * i, initialY, barWidth, time * step * -1);

    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillText(name, initialX + indent * i, initialY + lineHeightName);
    ctx.fillText(Math.round(time), initialX + indent * i, initialY - lineHeightTime - time * step);
  }
};
