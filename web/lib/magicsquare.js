(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', 'kotlin'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('kotlin'));
  else {
    if (typeof kotlin === 'undefined') {
      throw new Error("Error loading module 'magicsquare'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'magicsquare'.");
    }
    root.magicsquare = factory(typeof magicsquare === 'undefined' ? {} : magicsquare, kotlin);
  }
}(this, function (_, Kotlin) {
  'use strict';
  var throwUPAE = Kotlin.throwUPAE;
  var Unit = Kotlin.kotlin.Unit;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var throwCCE = Kotlin.throwCCE;
  var removeClass = Kotlin.kotlin.dom.removeClass_hhb33f$;
  var addClass = Kotlin.kotlin.dom.addClass_hhb33f$;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  function Controller() {
    this.score_hc6rn3$_0 = 1;
    this.last_0 = 0;
    this.array_91o2a0$_0 = this.array_91o2a0$_0;
    this.next_r0f8w0$_0 = this.next_r0f8w0$_0;
    this.reset();
  }
  Object.defineProperty(Controller.prototype, 'score', {
    get: function () {
      return this.score_hc6rn3$_0;
    },
    set: function (score) {
      this.score_hc6rn3$_0 = score;
    }
  });
  Object.defineProperty(Controller.prototype, 'array_0', {
    get: function () {
      if (this.array_91o2a0$_0 == null)
        return throwUPAE('array');
      return this.array_91o2a0$_0;
    },
    set: function (array) {
      this.array_91o2a0$_0 = array;
    }
  });
  Object.defineProperty(Controller.prototype, 'next_0', {
    get: function () {
      if (this.next_r0f8w0$_0 == null)
        return throwUPAE('next');
      return this.next_r0f8w0$_0;
    },
    set: function (next) {
      this.next_r0f8w0$_0 = next;
    }
  });
  Controller.prototype.reset = function () {
    this.score = 1;
    this.last_0 = 0;
    this.array_0 = new Int32Array(100);
    this.array_0[0] = this.score;
    this.next_0 = this.getNextForPosition_za3lpa$(this.last_0);
  };
  Controller.prototype.getNextForPosition_za3lpa$ = function (position) {
    return this.getNextForPosition_wmnbas$(this.array_0, position);
  };
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  Controller.prototype.getNextForPosition_wmnbas$ = function (array, position) {
    var $receiver = ArrayList_init();
    var col = position % 10;
    var row = position / 10 | 0;
    if (row > 2) {
      this.addIfPositionEmpty_0($receiver, array, position - 30 | 0);
    }
    if (row < 7) {
      this.addIfPositionEmpty_0($receiver, array, position + 30 | 0);
    }
    if (col > 2) {
      this.addIfPositionEmpty_0($receiver, array, position - 3 | 0);
    }
    if (col < 7) {
      this.addIfPositionEmpty_0($receiver, array, position + 3 | 0);
    }
    if (row > 0 && col > 1 && position > 21) {
      this.addIfPositionEmpty_0($receiver, array, position - 22 | 0);
    }
    if (row < 9 && col < 8 && position < 78) {
      this.addIfPositionEmpty_0($receiver, array, position + 22 | 0);
    }
    if (col < 8 && row > 0 && position > 17) {
      this.addIfPositionEmpty_0($receiver, array, position - 18 | 0);
    }
    if (col > 1 && row < 9 && position < 82) {
      this.addIfPositionEmpty_0($receiver, array, position + 18 | 0);
    }
    return $receiver;
  };
  Controller.prototype.addIfPositionEmpty_0 = function ($receiver, array, position) {
    if (this.get_isNotSelected_0(array[position])) {
      $receiver.add_11rb$(position);
    }
  };
  Controller.prototype.isPositionValidAsNext_za3lpa$ = function (position) {
    return this.isPositionValidAsNext_3xqfrq$(position, this.next_0);
  };
  Controller.prototype.isPositionValidAsNext_3xqfrq$ = function (position, next) {
    return next.contains_11rb$(position);
  };
  Controller.prototype.setAsNext_za3lpa$ = function (position) {
    return this.setAsNext_3xqfrq$(position, this.next_0);
  };
  Controller.prototype.setAsNext_3xqfrq$ = function (position, next) {
    if (this.isPositionValidAsNext_3xqfrq$(position, next)) {
      this.array_0[position] = (this.score = this.score + 1 | 0, this.score);
      this.last_0 = position;
      this.next_0 = this.getNextForPosition_za3lpa$(this.last_0);
      return true;
    }
     else {
      return false;
    }
  };
  Controller.prototype.isLast_za3lpa$ = function (i) {
    return i === this.last_0;
  };
  Controller.prototype.valueForPosition_za3lpa$ = function (i) {
    return this.array_0[i];
  };
  Controller.prototype.hasNextMove = function () {
    return !this.next_0.isEmpty();
  };
  Controller.prototype.get_isNotSelected_0 = function ($receiver) {
    return $receiver === 0;
  };
  Controller.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Controller',
    interfaces: []
  };
  function MagicSquare() {
    MagicSquare$Companion_getInstance();
    this.logic_0 = new Controller();
    this.elements_0 = document.getElementsByTagName('td');
    this.restart_0 = document.getElementById('restart');
    this.score_0 = document.getElementById('current_score');
    this.best_0 = document.getElementById('best_score');
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4;
    this.cheatToggle_0 = (tmp$ = document.getElementById('cheat')) == null || Kotlin.isType(tmp$, HTMLInputElement) ? tmp$ : throwCCE();
    this.cheat_0 = false;
    this.nextCheat_0 = null;
    tmp$_0 = this.elements_0.length;
    for (var i = 0; i < tmp$_0; i++) {
      (tmp$_1 = this.elements_0[i]) != null ? (tmp$_1.addEventListener('click', MagicSquare_init$lambda(i, this), true), Unit) : null;
      (tmp$_2 = this.elements_0[i]) != null ? (tmp$_2.addEventListener('mouseover', MagicSquare_init$lambda_0(i, this), true), Unit) : null;
    }
    (tmp$_3 = this.restart_0) != null ? (tmp$_3.addEventListener('click', MagicSquare_init$lambda_1(this), true), Unit) : null;
    (tmp$_4 = this.cheatToggle_0) != null ? (tmp$_4.addEventListener('click', MagicSquare_init$lambda_2(this), true), Unit) : null;
  }
  var toDoubleOrNull = Kotlin.kotlin.text.toDoubleOrNull_pdl1vz$;
  MagicSquare.prototype.onElementClicked_0 = function (position) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    if (this.logic_0.setAsNext_za3lpa$(position)) {
      this.nextCheat_0 = null;
      this.display();
      if (!this.logic_0.hasNextMove()) {
        if (this.logic_0.score === 100) {
          alert('You won !');
        }
        var previousBest = (tmp$_1 = (tmp$_0 = (tmp$ = this.best_0) != null ? tmp$.textContent : null) != null ? toDoubleOrNull(tmp$_0) : null) != null ? tmp$_1 : 0.0;
        if (previousBest < this.logic_0.score) {
          (tmp$_2 = this.best_0) != null ? (tmp$_2.textContent = this.logic_0.score.toString()) : null;
        }
      }
    }
  };
  MagicSquare.prototype.onElementHover_0 = function (position) {
    if (this.cheat_0) {
      if (this.logic_0.isPositionValidAsNext_za3lpa$(position)) {
        this.nextCheat_0 = this.logic_0.getNextForPosition_za3lpa$(position);
      }
       else {
        this.nextCheat_0 = null;
      }
      this.display();
    }
  };
  MagicSquare.prototype.onRestartClicked_0 = function () {
    this.logic_0.reset();
    this.display();
  };
  MagicSquare.prototype.onCheatToggle_0 = function () {
    var tmp$;
    this.cheat_0 = ((tmp$ = this.cheatToggle_0) != null ? tmp$.checked : null) === true;
    if (!this.cheat_0) {
      this.nextCheat_0 = null;
      this.display();
    }
  };
  function MagicSquare$display$lambda(this$MagicSquare, closure$i) {
    return function ($receiver) {
      var tmp$;
      $receiver.textContent = '';
      removeClass($receiver, [MagicSquare$Companion_getInstance().NEXT]);
      removeClass($receiver, [MagicSquare$Companion_getInstance().CHEAT]);
      removeClass($receiver, [MagicSquare$Companion_getInstance().FILLED]);
      removeClass($receiver, [MagicSquare$Companion_getInstance().LAST]);
      if (this$MagicSquare.logic_0.isPositionValidAsNext_za3lpa$(closure$i)) {
        addClass($receiver, [MagicSquare$Companion_getInstance().NEXT]);
      }
      if ((tmp$ = this$MagicSquare.nextCheat_0) != null) {
        if (tmp$.contains_11rb$(closure$i)) {
          addClass($receiver, [MagicSquare$Companion_getInstance().CHEAT]);
        }
      }
      var position = this$MagicSquare.logic_0.valueForPosition_za3lpa$(closure$i);
      if (position !== 0) {
        $receiver.textContent = position.toString();
        addClass($receiver, [MagicSquare$Companion_getInstance().FILLED]);
        if (this$MagicSquare.logic_0.isLast_za3lpa$(closure$i)) {
          addClass($receiver, [MagicSquare$Companion_getInstance().LAST]);
        }
      }
      return Unit;
    };
  }
  MagicSquare.prototype.display = function () {
    var tmp$, tmp$_0, tmp$_1;
    (tmp$ = this.score_0) != null ? (tmp$.textContent = this.logic_0.score.toString()) : null;
    tmp$_0 = this.elements_0.length;
    for (var i = 0; i < tmp$_0; i++) {
      MagicSquare$display$lambda(this, i)(Kotlin.isType(tmp$_1 = this.elements_0[i], HTMLTableCellElement) ? tmp$_1 : throwCCE());
    }
  };
  function MagicSquare$Companion() {
    MagicSquare$Companion_instance = this;
    this.LAST = 'last';
    this.FILLED = 'filled';
    this.NEXT = 'next';
    this.CHEAT = 'cheat';
  }
  MagicSquare$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var MagicSquare$Companion_instance = null;
  function MagicSquare$Companion_getInstance() {
    if (MagicSquare$Companion_instance === null) {
      new MagicSquare$Companion();
    }
    return MagicSquare$Companion_instance;
  }
  function MagicSquare_init$lambda(closure$i, this$MagicSquare) {
    return function (it) {
      this$MagicSquare.onElementClicked_0(closure$i);
      return Unit;
    };
  }
  function MagicSquare_init$lambda_0(closure$i, this$MagicSquare) {
    return function (it) {
      this$MagicSquare.onElementHover_0(closure$i);
      return Unit;
    };
  }
  function MagicSquare_init$lambda_1(this$MagicSquare) {
    return function (it) {
      this$MagicSquare.onRestartClicked_0();
      return Unit;
    };
  }
  function MagicSquare_init$lambda_2(this$MagicSquare) {
    return function (it) {
      this$MagicSquare.onCheatToggle_0();
      return Unit;
    };
  }
  MagicSquare.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'MagicSquare',
    interfaces: []
  };
  function main(args) {
    (new MagicSquare()).display();
  }
  var package$be = _.be || (_.be = {});
  var package$xzan = package$be.xzan || (package$be.xzan = {});
  var package$magicsquare = package$xzan.magicsquare || (package$xzan.magicsquare = {});
  var package$common = package$magicsquare.common || (package$magicsquare.common = {});
  package$common.Controller = Controller;
  Object.defineProperty(MagicSquare, 'Companion', {
    get: MagicSquare$Companion_getInstance
  });
  package$magicsquare.MagicSquare = MagicSquare;
  package$magicsquare.main_kand9s$ = main;
  main([]);
  Kotlin.defineModule('magicsquare', _);
  return _;
}));

//# sourceMappingURL=magicsquare.js.map
